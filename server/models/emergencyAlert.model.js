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
  }
});

module.exports = mongoose.model('emergencyAlert', emergencyAlertSchema);
