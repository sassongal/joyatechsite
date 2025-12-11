const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const {google} = require("googleapis");
const nodemailer = require("nodemailer");

admin.initializeApp();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const sheetsRange = process.env.SHEETS_RANGE || "Leads!A1";
const leadsCollection = process.env.LEADS_COLLECTION || "contactMessages";

function withCors(res) {
  return res.set(corsHeaders);
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return fwd.split(",")[0].trim();
  }
  if (Array.isArray(fwd) && fwd.length > 0) {
    return fwd[0];
  }
  return req.ip || "unknown";
}

function getRateLimitConfig() {
  return {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
    max: Number(process.env.RATE_LIMIT_MAX || 5),
    collection: process.env.RATE_LIMIT_COLLECTION || "rateLimits",
  };
}

async function checkRateLimit(ip) {
  if (!ip) return {allowed: true};
  const {windowMs, max, collection} = getRateLimitConfig();
  if (!windowMs || !max) return {allowed: true};

  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const docId = `${ip}-${windowStart}`;
  const ref = admin.firestore().collection(collection).doc(docId);

  try {
    const result = await admin.firestore().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const count = snap.exists ? (snap.data().count || 0) : 0;
      if (count >= max) {
        return {
          allowed: false,
          retryAfter: Math.ceil((windowStart + windowMs - now) / 1000),
        };
      }
      tx.set(ref, {
        count: count + 1,
        windowStart,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expireAt: new Date(windowStart + windowMs * 2),
      }, {merge: true});
      return {allowed: true};
    });
    return result;
  } catch (error) {
    console.error("Rate limit check failed", error);
    // Fail open to avoid blocking legitimate traffic if Firestore errors.
    return {allowed: true, error: error.message};
  }
}

function normalizePayload(body = {}) {
  return {
    name: (body.name || "").toString().trim(),
    email: (body.email || "").toString().trim(),
    message: (body.message || "").toString().trim(),
    phone: (body.phone || "").toString().trim(),
    service_interest: (body.service_interest || "").toString().trim(),
    language: body.language || "he",
  };
}

function validatePayload(payload) {
  if (!payload.name) return "Missing name";
  if (!payload.email) return "Missing email";
  if (!payload.message) return "Missing message";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) return "Invalid email";
  return null;
}

async function persistToFirestore(payload) {
  try {
    const docRef = await admin.firestore().collection(leadsCollection).add({
      ...payload,
      status: "new",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    return {status: "ok", id: docRef.id};
  } catch (error) {
    console.error("Firestore write failed", error);
    return {status: "error", error: error.message};
  }
}

function getSheetsCredentials() {
  const spreadsheetId = process.env.SHEETS_ID;
  const clientEmail = process.env.SHEETS_CLIENT_EMAIL;
  const privateKeyRaw = process.env.SHEETS_PRIVATE_KEY;
  const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, "\n") : undefined;
  return {spreadsheetId, clientEmail, privateKey};
}

async function appendToSheet(payload) {
  const {spreadsheetId, clientEmail, privateKey} = getSheetsCredentials();
  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.warn("Sheets config missing; skipping append");
    return {status: "skipped", reason: "missing_config"};
  }

  try {
    const jwt = new google.auth.JWT(
        clientEmail,
        null,
        privateKey,
        ["https://www.googleapis.com/auth/spreadsheets"],
    );
    const sheets = google.sheets({version: "v4", auth: jwt});
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetsRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          payload.name,
          payload.email,
          payload.phone,
          payload.service_interest,
          payload.message,
          payload.language,
          new Date().toISOString(),
        ]],
      },
    });
    return {status: "ok"};
  } catch (error) {
    console.error("Sheet append failed", error);
    return {status: "error", error: error.message};
  }
}

function buildEmailText(payload) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Service interest: ${payload.service_interest || "-"}`,
    `Language: ${payload.language || "-"}`,
    "",
    "Message:",
    payload.message || "-",
  ].join("\n");
}

async function sendEmail(payload) {
  const to = process.env.MAIL_TO;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || 587);
  const from = process.env.MAIL_FROM || user;

  if (!to || !user || !pass || !host) {
    console.warn("Mail config missing; skipping email");
    return {status: "skipped", reason: "missing_config"};
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {user, pass},
    });

    const subject = `New website lead: ${payload.name || "Contact"}`;
    const text = buildEmailText(payload);
    const html = text.replace(/\n/g, "<br>");

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return {status: "ok"};
  } catch (error) {
    console.error("Email send failed", error);
    return {status: "error", error: error.message};
  }
}

const handler = onRequest({region: "us-central1"}, async (req, res) => {
  if (req.method === "OPTIONS") {
    return withCors(res).status(204).end();
  }

  if (req.method !== "POST") {
    return withCors(res).status(405).json({error: "Method not allowed"});
  }

  const clientIp = getClientIp(req);
  const rateResult = await checkRateLimit(clientIp);
  if (!rateResult.allowed) {
    return withCors(res).status(429).json({
      error: "Too many requests",
      retryAfter: rateResult.retryAfter,
    });
  }

  const payload = normalizePayload(req.body);
  const validationError = validatePayload(payload);
  if (validationError) {
    return withCors(res).status(400).json({error: validationError});
  }

  const [firestoreResult, sheetResult, emailResult] = await Promise.all([
    persistToFirestore(payload),
    appendToSheet(payload),
    sendEmail(payload),
  ]);

  const hasError = [sheetResult, emailResult].some((result) => result.status === "error");
  const status = hasError ? 202 : 200;

  return withCors(res).status(status).json({
    ok: !hasError,
    firestoreId: firestoreResult.id,
    sheet: sheetResult.status,
    email: emailResult.status,
    sheetError: sheetResult.error,
    emailError: emailResult.error,
  });
});

exports.sendLead = handler;
exports.contactForm = handler; // keep existing rewrite working
