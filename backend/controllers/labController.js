const asyncHandler = require('express-async-handler')
const PatLab = require('../models/LabModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get patients Lab result
// @route   GET /api/patlab
// @access  Private
const getPatLabs = asyncHandler(async (req, res) => {
  const patLabs = await PatLab.find()

  res.status(200).json(patLabs)
})

// @desc    Get patient Lab result
// @route   GET /api/patients/:id
// @access  Private
const getPatLab = asyncHandler(async (req, res) => {
  const patLab = await PatLab.findById(req.params.id)

  if (!patLab) {
    res.status(404)
    throw new Error('Patient Result not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  res.status(200).json(patLab)
})


// using Aggregate function
const getLabDetails = asyncHandler(async(req, res) =>{
  const patLab= await PatLab.aggregate([{
      $lookup: {
          from: 'Patients',
          localField: 'patId',
          foreignField: 'patID',
          as: 'labdetails'
      }
  }])
  res.status(200).json(patLab)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})


// @desc    Create new patient Lab result
// @route   POST /api/createpatlab
// @access  Private
const createPatLab = asyncHandler(async (req, res) => {
  const { patID, TypeOfTest, SampleType, TestResult, LabNote,
  TestImage} = req.body

  if (!patID) {
    res.status(400)
    throw new Error('Ensure the patient Id is enterred')
  }

  const patLab = await PatLab.create({
    patID, TypeOfTest, SampleType, TestResult, LabNote,
  TestImage,
  })

  res.status(201).json(patLab)
})

// @desc    Delete patient lab result
// @route   DELETE /api/patlab/:id
// @access  Private
const deletePatLab = asyncHandler(async (req, res) => {
  const patLab = await PatLab.findById(req.params.id)

  if (!patLab) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  await patLab.remove()

  res.status(200).json({ success: true })
})

// @desc    Update patient lab result
// @route   PUT /api/patlab/:id
// @access  Private
const updatePatLab = asyncHandler(async (req, res) => {
  const patLab = await PatLab.findById(req.params.id)

  if (!patLab) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  const updatedPatLab = await PatLab.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPatLab)
})

module.exports = {
  getPatLabs,
  getPatLab,
  getLabDetails,
  createPatLab,
  deletePatLab,
  updatePatLab,
}
