const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Create a patient
router.post('/', patientController.createPatient);

module.exports = router;
