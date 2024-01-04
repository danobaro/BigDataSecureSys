const mongoose = require('mongoose');

const medicalLabResultsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient2',
    
  },
  testName: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const MedicalLabResults = mongoose.model('MedicalLabResults', medicalLabResultsSchema);

module.exports = MedicalLabResults;
