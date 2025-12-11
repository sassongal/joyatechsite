# Firestore Database Rules for Joya-Tech Site

## Collection: contactMessages

### Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users (admin panel)
    match /contactMessages/{document} {
      allow read, write: if request.auth != null;
      allow create: if request.auth == null; // Allow public to create messages
    }
    
    // Allow public to create contact messages
    match /contactMessages/{document} {
      allow create: if 
        request.resource.data.name is string &&
        request.resource.data.email is string &&
        request.resource.data.message is string &&
        request.resource.data.timestamp is timestamp;
    }
  }
}
```

### Data Structure
```javascript
{
  name: string,          // Required: שם הפונה
  email: string,         // Required: אימייל
  phone: string,         // Optional: טלפון
  service_interest: string, // Optional: השירות המבוקש
  message: string,       // Required: תוכן ההודעה
  language: string,      // Required: שפה (he/en)
  timestamp: timestamp,  // Required: זמן שליחה
  status: string,        // Required: סטטוס (new/in_progress/done)
  read: boolean,         // Required: האם נקרא
  ipAddress: string      // Optional: כתובת IP (ניתן להוסיף)
}
```

## Collection: users (for future admin panel)
```javascript
{
  email: string,
  displayName: string,
  role: string, // admin/editor/viewer
  createdAt: timestamp,
  lastLogin: timestamp
}
```

## Indexes Needed
1. `contactMessages` collection:
   - `timestamp` DESC - for sorting messages
   - `status` ASC - for filtering by status
   - `read` ASC - for unread messages

## Firestore Setup Instructions

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: joyatech-site
3. **Navigate to Firestore Database**:
   - Click "Create Database" if not already created
   - Choose "Start in test mode" for development (then update rules later)
   - Select location (europe-west1 recommended for Israel)

4. **Set Security Rules**:
   - Go to Firestore → Rules
   - Paste the rules above
   - Click "Publish"

5. **Create Indexes**:
   - Firestore will prompt to create indexes when needed
   - Or manually create in Firestore → Indexes

6. **Test the Integration**:
   - Submit a contact form on your site
   - Check Firestore → Data to see the new document

## Optional: Add Email Notifications

For real-time email notifications when a new message arrives, you can use Firebase Functions:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

exports.sendContactNotification = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();
    
    const mailOptions = {
      from: 'noreply@joyatech.com',
      to: 'gal@joya-tech.net',
      subject: `New Contact Message from ${messageData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Phone:</strong> ${messageData.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${messageData.service_interest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${messageData.message}</p>
        <p><strong>Submitted:</strong> ${messageData.timestamp.toDate()}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
```

## Environment Variables for Production

Make sure to set these in your hosting environment:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN` 
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`