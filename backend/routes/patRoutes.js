const express = require('express')
const router = express.Router()
const {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
} = require('../controllers/patController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getPatients).post(createPatient)

router
  .route('/:id')
  .get(getPatient)
  .delete(deletePatient)
  .put(updatePatient)

module.exports = router
