const asyncHandler = require('express-async-handler')
const Patient = require('../models/patModel')
const CryptoJS = require('crypto-js')
const { json } = require('express');

// @desc    Get patients
// @route   GET /api/patients
// @access  Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find()

  res.status(200).json(patients)
})


// @desc    Get patient
// @route   GET /api/patients/:id
// @access  Private
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  res.status(200).json(patient)
})

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
const createPatient = asyncHandler(async (req, res) => {
  const {patId, name, dob, age, email, address, sex, phone, marital, image  } = req.body

  if (!patId) {
    res.status(400)
    throw new Error('Ensure the patient Id is enterred')
  }

  const patient = await Patient.create({ patId, name, dob, age, email, 
    address, sex, phone, marital, image,  status: 'new',
  })

  res.status(201).json(patient)
})

/* const createPatient = asyncHandler(async (req, res) => {
  // Extract patient data from request body
  const { patId, name, dob, age, email, address, sex, phone, marital, image } = req.body;

  // Validate required fields
  if (!patId || !name) {
    return res.status(400).json({ error: 'Please provide a patient name and ID.' });
  }

  // Hash sensitive data
  const hash1 = crypto.createHash('sha256');
  const hash2 = crypto.createHash('sha256');
  const hashedName = hash1.update(name).digest('hex');
  const hashedemail = hash2.update(email).digest('hex');  

  var encrypted = CryptoJS.AES.encrypt(hashedname1, "Secret Passphrase");
​
var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

  // Create a new patient record
  const patient = await Patient.create({
    patId,
    name: hashedname1,
    dob,
    age,
    email,
    address,
    sex,
    phone,
    marital,
    image,
    status: 'new',
  });

  // Verify data integrity using HMAC
  const hmac = crypto.createHmac('sha256', 'mysecretkey');
  const verifiedHash = hmac.update(hashedName)

  if (verifiedHash !== json(patient.name)) {
    return res.status(400).json({ error: 'Data integrity check failed.' });
  }

  // Return the created patient data
  res.status(201).json(patient);
}); */


/* const createPatient = asyncHandler(async (req, res) => {
  // Extract patient data from request body
  const { patId, name, dob, age, email, address, sex, phone, marital, image } = req.body;

  // Validate required fields
  if (!patId || !name) {
    return res.status(400).json({ error: 'Please provide a patient name and ID.' });
  }

  // Hash sensitive data using SHA256
  const crypto = require('crypto');

  // Encrypt sensitive data using AES
  const secretKey = '1234abcd'; // Replace with your actual secret key
  const encryptedName = CryptoJS.AES.encrypt(name, secretKey);
  const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey);

  // Decrypt sensitive data for verification
  const decryptedName = CryptoJS.AES.decrypt(encryptedName, secretKey).toString(CryptoJS.enc.Utf8);
  const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);

  // Verify if decrypted data matches original input
  if (name !== decryptedName || email !== decryptedEmail) {
    return res.status(400).json({ error: 'Data decryption failed.' });
  }

  // Create a new patient record
  const patient = await Patient.create({
    patId,
    name: encryptedName, // Store encrypted name
    dob,
    age,
    email: encryptedEmail, // Store encrypted email
    address,
    sex,
    phone,
    marital,
    image,
    status: 'new',
  });

  // Verify data integrity using HMAC
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(encryptedName); // Update HMAC with encrypted name
  hmac.update(encryptedEmail); // Update HMAC with encrypted email
  const verifiedHash = hmac.digest('hex');

   // Return the created patient data
   if(patient){
    res.status(201).json({
        _id: user._id,
        patId: patient.patId,
        name: patient.name,
        dob: patient.dob,
        age: patient.age,
        email: patient.email,
        address: patient.address,
        sex: patient.sex,
        phone:patient.phone,
        marital: patient.marital,
        image: patient.image,
    })
}else{
    res.status(400)
    throw new Error('Invalid Patient data')
}
}); 
  */

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  await patient.remove()

  res.status(200).json({ success: true })
})

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }

 /*  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  } */

  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPatient)
})

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
}
