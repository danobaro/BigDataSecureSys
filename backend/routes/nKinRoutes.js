const express = require('express')
const router = express.Router()
const {
  getkins,
  getkin,
  getkindetails,
  createkin,
  deletekin,
  updatekin,
} = require('../controllers/nKinController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getkin).post(createkin)

router
  .route('/:id')
  .get(getkins)
  .get(getkindetails)
  .delete(deletekin)
  .put(updatekin)

module.exports = router
