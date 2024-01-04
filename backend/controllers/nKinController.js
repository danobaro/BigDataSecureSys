const asyncHandler = require('express-async-handler')
const PatNOK = require('../models/nKinModel')
const Patient = require('../models/patModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get patients NOK result
// @route   GET /api/patNOK
// @access  Private
const getkins = asyncHandler(async (req, res) => {
  const patNOKs = await PatNOK.find()

  res.status(200).json(patNOKs)
})

// @desc    Get patient NOK result
// @route   GET /api/patnok/:id
// @access  Private
const getkin = asyncHandler(async (req, res) => {
  const patNOK = await PatNOK.findById(req.params.id)

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
  const patNOK= await PatNOK.aggregate([{
   
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
  const { patID, NName, NAddress, NSex, NPhone, NEmail,  NRelationship,} = req.body

  if (!NName) {
    res.status(400)
    throw new Error('Ensure the patient Id is entered')
  }

  const patNOK = await PatNOK.create({
    patID, NName, NAddress, NSex,  NPhone, NEmail,  NRelationship, status: 'new',
  })

  res.status(201).json(patNOK)
})

// @desc    Delete patient NOK result
// @route   DELETE /api/patNOK/:id
// @access  Private
const deletekin = asyncHandler(async (req, res) => {
  const patNOK = await PatNOK.findById(req.params.id)

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
/* const updatePatNOK = asyncHandler(async (req, res) => {
  const patNOK = await PatNOK.findById(req.params.id)

  if (!patNOK) {
    res.status(404)
    throw new Error('Patient not found')
  }

   if (patNOK.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } 

  const updatedPatNOK = await PatNOK.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPatNOK)
}) */

const updatekin = asyncHandler(async (req, res) => {
  const patient = await PatNOK.findById(req.params.id)

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

  const updatekin = await PatNOK.findByIdAndUpdate(
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
