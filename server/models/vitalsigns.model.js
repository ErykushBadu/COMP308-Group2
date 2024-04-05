const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  bodyTemperature: {
    type: Number
  },
  heartRate: {
    type: Number
  },
  bloodPressure: {
    type: String
  },
  respiratoryRate: {
    type: Number
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);

module.exports = VitalSigns;
