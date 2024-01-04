const asyncHandler = require('express-async-handler')
const User2 = require('../models/user')
const Patient = require('../models/patModel')

// @desc    Get patients NOK result
// @route   GET /api/patNOK
// @access  Private
const getkins = asyncHandler(async (req, res) => {
  const patNOKs = await User2.find()

  res.status(200).json(patNOKs)
})

// @desc    Get patient NOK result
// @route   GET /api/patnok/:id
// @access  Private
const getkin = asyncHandler(async (req, res) => {
  const patNOK = await User2.findById(req.params.id)

  if (!patNOK) {
    res.status(404)
    throw new Error('Patient Result not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  res.status(200).json(patNOK)
})


// using Aggregate function
const getkindetails = asyncHandler(async(req, res) =>{
  const patNOK= await User2.aggregate([{
   
      $lookup: {
          from: 'patients',
          localField: 'patId',
          foreignField: 'patID',
          as: 'nokdetails'
      },
  }])
  res.status(200).json(patNOK)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})


// @desc    Create new patient NOK result
// @route   POST /api/createpatNOK
// @access  Private
const createkin = asyncHandler(async (req, res) => {
  const { name, email,  password} = req.body

  if (!name) {
    res.status(400)
    throw new Error('Ensure the patient Id is enterred')
  }

  const patVital = await User2.create({
    name, email,  password
  })

  res.status(201).json(patVital)
})

// @desc    Delete patient NOK result
// @route   DELETE /api/patNOK/:id
// @access  Private
const deletekin = asyncHandler(async (req, res) => {
  const patNOK = await User2.findById(req.params.id)

  if (!patNOK) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  await patNOK.remove()

  res.status(200).json({ success: true })
})

// @desc    Update patient NOK result
// @route   PUT /api/patNOK/:id
// @access  Private
/* const updateUser2 = asyncHandler(async (req, res) => {
  const patNOK = await User2.findById(req.params.id)

  if (!patNOK) {
    res.status(404)
    throw new Error('Patient not found')
  }

   if (patNOK.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } 

  const updatedUser2 = await User2.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedUser2)
}) */

const updatekin = asyncHandler(async (req, res) => {
  const patient = await User2.findById(req.params.id)

  if (!patient) {
    res.status(404).json({
      error: 'Patient not found'
    })
    return
  }

  // Check if the user is authorized to update the patient's kin
  if (patient.user.toString() !== req.user.id) {
    res.status(401).json({
      error: 'Not Authorized'
    })
    return
  }

  const updatekin = await User2.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatekin)
})

module.exports = {
  getkins,
  getkin,
  getkindetails,
  createkin,
  deletekin,
  updatekin,
}
