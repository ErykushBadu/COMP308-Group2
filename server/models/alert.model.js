const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);

module.exports = EmergencyAlert;
