const express = require('express')
const router = express.Router()
const {
  getPatLabs,
  getPatLab,
  getLabDetails,
  createPatLab,
  deletePatLab,
  updatePatLab,
} = require('../controllers/labController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get( getPatLabs).post( createPatLab)

router
  .route('/:id')
  .get( getPatLab)
  .get( getLabDetails)
  .delete( deletePatLab)
  .put( updatePatLab)

module.exports = router
