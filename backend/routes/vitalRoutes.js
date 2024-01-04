const express = require('express')
const router = express.Router()
const {
  getPatVitals,
  getPatVital,
  getVitalsDetails,
  createPatVital,
  deletePatVital,
  updatePatVital,
} = require('../controllers/vitalController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getPatVitals).post(createPatVital)

router
  .route('/:id')
  .get(getPatVital)
  .get(getVitalsDetails)
  .delete(deletePatVital)
  .put(updatePatVital)

module.exports = router
