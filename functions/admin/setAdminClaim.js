/**
 * Cloud Function to set admin custom claim for a user
 *
 * Usage:
 *   1. Deploy: firebase deploy --only functions:setAdminClaim
 *   2. Call via Firebase Console or Admin SDK
 *
 * To set an admin:
 *   firebase functions:call setAdminClaim --data '{"email":"admin@example.com"}'
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

// Initialize admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Set admin claim for a user by email
 * Only callable by existing admins or through Firebase Console
 */
exports.setAdminClaim = onCall(async (request) => {
  // Check if caller is an admin (skip check if called from Console/Admin SDK)
  if (request.auth && !request.auth.token.admin) {
    throw new HttpsError(
      'permission-denied',
      'Only admins can set admin claims'
    );
  }

  const { email } = request.data;

  if (!email) {
    throw new HttpsError(
      'invalid-argument',
      'Email is required'
    );
  }

  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    // Also add to admins collection in Firestore
    await admin.firestore().collection('admins').doc(user.uid).set({
      email: user.email,
      isAdmin: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: `Admin claim set for ${email}`,
      uid: user.uid,
    };
  } catch (error) {
    console.error('Error setting admin claim:', error);
    throw new HttpsError(
      'internal',
      `Error setting admin claim: ${error.message}`
    );
  }
});

/**
 * Remove admin claim from a user
 */
exports.removeAdminClaim = onCall(async (request) => {
  // Check if caller is an admin
  if (!request.auth || !request.auth.token.admin) {
    throw new HttpsError(
      'permission-denied',
      'Only admins can remove admin claims'
    );
  }

  const { email } = request.data;

  if (!email) {
    throw new HttpsError(
      'invalid-argument',
      'Email is required'
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    // Remove admin claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: false });

    // Remove from admins collection
    await admin.firestore().collection('admins').doc(user.uid).delete();

    return {
      success: true,
      message: `Admin claim removed from ${email}`,
    };
  } catch (error) {
    console.error('Error removing admin claim:', error);
    throw new HttpsError(
      'internal',
      `Error removing admin claim: ${error.message}`
    );
  }
});
