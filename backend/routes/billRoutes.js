const express = require('express')
const router = express.Router()
const {
 getPatBills,
 getPatBill,
  getBillDetails,
  createPatBill,
  deletePatBill,
  updatePatBill,
} = require('../controllers/billsController')

//const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:patientId/notes', noteRouter)

router.route('/').get(getPatBills).post(createPatBill)

router
  .route('/:id')
  .get(getPatBill)
  .get(getBillDetails)
  .delete(deletePatBill)
  .put(updatePatBill)

module.exports = router
