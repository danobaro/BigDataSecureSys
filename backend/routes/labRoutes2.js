const express = require('express');
const router = express.Router();
const patientController = require('../controllers/labController3');

// Create a patient
router.post('/', patientController.createMedicalLabResult);

// Insert medical lab results for a patient
router.post('/:patientId/medicalLabResults', patientController.insertMedicalLabResult);

// Update medical lab results for a patient
router.put('/:patientId/medicalLabResults/:resultId', patientController.updateMedicalLabResult);

// Delete medical lab results for a patient
router.delete('/:patientId/medicalLabResults/:resultId', patientController.deleteMedicalLabResult);

module.exports = router;
