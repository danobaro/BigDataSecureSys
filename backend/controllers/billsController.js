const asyncHandler = require('express-async-handler')
const PatBills = require('../models/billsModel')
const Patient = require('../models/patModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get patients Bill result
// @route   GET /api/patBill
// @access  Private
const getPatBills = asyncHandler(async (req, res) => {
  const patBills = await PatBills.find()

  res.status(200).json(patBills)
})

// @desc    Get patient Bill result
// @route   GET /api/patients/:id
// @access  Private
const getPatBill = asyncHandler(async (req, res) => {
  const patBill = await PatBills.findById(req.params.id)

  if (!patBill) {
    res.status(404)
    throw new Error('Patient Result not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  res.status(200).json(patBill)
})


// using Aggregate function
const getBillDetails = asyncHandler(async(req, res) =>{
  const patBill= await PatBills.aggregate([{
      $lookup: {
          from: 'Patients',
          localField: 'patId',
          foreignField: 'patID',
          as: 'billdetails'
      }
  }])
  res.status(200).json(patBill)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})


// @desc    Create new patient Bill result
// @route   POST /api/createpatbill
// @access  Private
const createPatBill = asyncHandler(async (req, res) => {
  const { patId, TypeOfPatient, ListOfItems, TotalBill, Discount, AccNote} = req.body

  if (!patId) {
    res.status(400)
    throw new Error('Ensure the patient Id and type of test is enterred')
  }

  const patBill = await PatBills.create({
    patId, TypeOfPatient, ListOfItems, TotalBill, Discount, AccNote, status: 'new',
  })

  res.status(201).json(patBill)
})

// @desc    Delete patient Bill result
// @route   DELETE /api/patbill/:id
// @access  Private
const deletePatBill = asyncHandler(async (req, res) => {
  const patBill = await PatBills.findById(req.params.id)

  if (!patBill) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  await patBill.remove()

  res.status(200).json({ success: true })
})

// @desc    Update patient Bill result
// @route   PUT /api/patbill/:id
// @access  Private
const updatePatBill = asyncHandler(async (req, res) => {
  const patBill = await PatBills.findById(req.params.id)

  if (!patBill) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  const updatedPatBill = await PatBills.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPatBill)
})

module.exports = {
  getPatBills,
  getPatBill,
  getBillDetails,
  createPatBill,
  deletePatBill,
  updatePatBill,
}
