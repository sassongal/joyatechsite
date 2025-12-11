// Main Cloud Functions entry point

// Contact form functions
const sendLead = require("./sendLead");

// Admin functions
const { setAdminClaim, removeAdminClaim } = require("./admin/setAdminClaim");
const { scheduledBackup, manualBackup, listBackups } = require("./admin/backupFirestore");

// Export all functions
module.exports = {
  // Contact form
  ...sendLead,
  
  // Admin management
  setAdminClaim,
  removeAdminClaim,
  
  // Backups
  scheduledBackup,
  manualBackup,
  listBackups,
};
