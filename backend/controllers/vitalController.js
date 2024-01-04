const asyncHandler = require('express-async-handler')
const PatVital = require('../models/vitalModel')
const Patient = require('../models/patModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get patients vitals result
// @route   GET /api/patvitals
// @access  Private
const getPatVitals = asyncHandler(async (req, res) => {
  const patVital = await PatVital.find()

  res.status(200).json(patVital)
})

// @desc    Get patient Lab result
// @route   GET /api/patvital/:id
// @access  Private
const getPatVital = asyncHandler(async (req, res) => {
  const patVital = await PatVital.findById(req.params.id)

  if (!patVital) {
    res.status(404)
    throw new Error('Patient Result not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  res.status(200).json(patVital)
})


// using Aggregate function
const getVitalsDetails = asyncHandler(async(req, res) =>{
  const patVital= await PatVital.aggregate([{
      $lookup: {
          from: 'Patients',
          localField: 'patId',
          foreignField: 'patID',
          as: 'vitalsdetails'
      }
  }])
  res.status(200).json(patVital)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})


// @desc    Create new patient vitals result
// @route   POST /api/createpatvital
// @access  Private
const createPatVital = asyncHandler(async (req, res) => {
  const { patID, temperature, bloodpressurerate, bloodgroup, 
  genenotype, heartrate, respiratoryrate, oxygensaturation, weight, height, 
  painscale, nursenotes} = req.body

  if (!patID) {
    res.status(400)
    throw new Error('Ensure the patient Id is enterred')
  }

  const patVital = await PatVital.create({
    patID, temperature, bloodpressurerate, bloodgroup, genenotype,
    heartrate, respiratoryrate, oxygensaturation, weight, height, 
    painscale, nursenotes, status: 'new',
  })

  res.status(201).json(patVital)
})

// @desc    Delete patient vitals result
// @route   DELETE /api/patvital/:id
// @access  Private
const deletePatVital = asyncHandler(async (req, res) => {
  const patVital = await PatVital.findById(req.params.id)

  if (!patLab) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  await patVital.remove()

  res.status(200).json({ success: true })
})

// @desc    Update patient vitals result
// @route   PUT /api/patvital/:id
// @access  Private
const updatePatVital = asyncHandler(async (req, res) => {
  const patVital = await PatVital.findById(req.params.id)

  if (!patVital) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  const updatedPatVital = await PatVital.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPatLab)
})

module.exports = {
  getPatVitals,
  getPatVital,
  getVitalsDetails,
  createPatVital,
  deletePatVital,
  updatePatVital,
}
