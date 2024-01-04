const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const Patient = require('../models/patModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get notes for a patient
// @route   GET /api/patients/:patientId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId)

  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ patient: req.params.patientId })

  res.status(200).json(notes)
})

// @desc    Create patient note
// @route   POST /api/patients/:patientId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId)

  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    patient: req.params.patientId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
