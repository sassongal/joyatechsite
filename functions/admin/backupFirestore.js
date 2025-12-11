/**
 * Cloud Function for Firestore backups
 * 
 * Scheduled to run daily at 2:00 AM UTC
 * Backs up collections to Firebase Storage
 */

// Use v1 API to access pubsub.schedule in firebase-functions v6
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

// Initialize admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const storage = admin.storage();

// Collections to backup
const COLLECTIONS_TO_BACKUP = [
  'articles',
  'tools',
  'testimonials',
  'portfolio',
  'carousels',
  'settings',
  'activityLogs',
];

/**
 * Scheduled backup function
 * Runs daily at 2:00 AM UTC
 */
exports.scheduledBackup = functions.pubsub
  .schedule('0 2 * * *') // Every day at 2:00 AM UTC
  .timeZone('Asia/Jerusalem')
  .onRun(async (context) => {
    console.log('Starting scheduled Firestore backup...');
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const backupData = {};
      
      // Fetch all collections
      for (const collectionName of COLLECTIONS_TO_BACKUP) {
        const snapshot = await db.collection(collectionName).get();
        backupData[collectionName] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(`Backed up ${snapshot.size} documents from ${collectionName}`);
      }
      
      // Save to Storage
      const bucket = storage.bucket();
      const fileName = `backups/firestore-${timestamp}.json`;
      const file = bucket.file(fileName);
      
      await file.save(JSON.stringify(backupData, null, 2), {
        metadata: {
          contentType: 'application/json',
        },
      });
      
      console.log(`Backup saved to ${fileName}`);
      
      // Log the backup activity
      await db.collection('activityLogs').add({
        action: 'backup',
        collection: 'system',
        documentTitle: `Backup ${timestamp}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        userEmail: 'system',
      });
      
      // Cleanup old backups (keep last 30 days)
      await cleanupOldBackups(bucket, 30);
      
      return { success: true, fileName };
    } catch (error) {
      console.error('Backup error:', error);
      throw error;
    }
  });

/**
 * Manual backup trigger (callable function)
 */
exports.manualBackup = functions.https.onCall(async (data, context) => {
  // Check if caller is admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can trigger backups'
    );
  }
  
  console.log('Starting manual Firestore backup...');
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupData = {};
    
    for (const collectionName of COLLECTIONS_TO_BACKUP) {
      const snapshot = await db.collection(collectionName).get();
      backupData[collectionName] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
    
    const bucket = storage.bucket();
    const fileName = `backups/manual-${timestamp}.json`;
    const file = bucket.file(fileName);
    
    await file.save(JSON.stringify(backupData, null, 2), {
      metadata: {
        contentType: 'application/json',
      },
    });
    
    // Log activity
    await db.collection('activityLogs').add({
      action: 'backup',
      collection: 'system',
      documentTitle: `Manual Backup`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userEmail: context.auth.token.email || 'admin',
    });
    
    return { 
      success: true, 
      message: 'Backup created successfully',
      fileName 
    };
  } catch (error) {
    console.error('Manual backup error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Clean up old backups
 */
async function cleanupOldBackups(bucket, daysToKeep) {
  try {
    const [files] = await bucket.getFiles({ prefix: 'backups/' });
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    for (const file of files) {
      const [metadata] = await file.getMetadata();
      const fileDate = new Date(metadata.timeCreated);
      
      if (fileDate < cutoffDate) {
        await file.delete();
        console.log(`Deleted old backup: ${file.name}`);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

/**
 * List available backups
 */
exports.listBackups = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can list backups'
    );
  }
  
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({ prefix: 'backups/' });
    
    const backups = await Promise.all(files.map(async (file) => {
      const [metadata] = await file.getMetadata();
      return {
        name: file.name,
        size: metadata.size,
        created: metadata.timeCreated,
      };
    }));
    
    return backups.sort((a, b) => new Date(b.created) - new Date(a.created));
  } catch (error) {
    console.error('List backups error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
