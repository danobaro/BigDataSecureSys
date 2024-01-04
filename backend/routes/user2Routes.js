const express = require('express')
const router = express.Router()
const {
    getkin,
    createkin,
    deletekin,
    updatekin,
} = require('../controllers/user2Controller')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getkin).post(createkin)

router
  .route('/:id')
  .delete( deletekin)
  .put( updatekin)

module.exports = router
