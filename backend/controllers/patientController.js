const Patient = require('../models/patientModel');

// Create a patient
exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, address } = req.body;
    const patient = new Patient({ name, age, gender, contact, address });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};