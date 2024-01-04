const Patient2 = require('../models/patientModel');
const User2 = require('../models/user');

// Create a medical lab result for a patient
exports.createMedicalLabResult = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { testName, result } = req.body;
    const user2 = new User2({ patientId, testName, result });
    await user2.save();
    res.status(201).json(user2);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert a medical lab result for a patient
exports.insertMedicalLabResult = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { testName, result } = req.body;
    const user2 = new User2({ patientId, testName, result });
    await user2.save();
    res.status(200).json(user2);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a medical lab result
exports.updateMedicalLabResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const { testName, result } = req.body;
    const updateduser2 = await User2.findByIdAndUpdate(resultId, { testName, result }, { new: true });
    res.status(200).json(updateduser2);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a medical lab result
exports.deleteMedicalLabResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    await User2.findByIdAndDelete(resultId);
    res.status(200).json({ message: 'Medical lab result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
