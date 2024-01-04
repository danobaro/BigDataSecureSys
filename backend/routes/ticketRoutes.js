const express = require('express')
const router = express.Router()
const {
  getAllTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getAllTickets).post(createTicket)

router
  .route('/:id')
  .get(getTicket)
  .delete(deleteTicket)
  .put(updateTicket)

module.exports = router
