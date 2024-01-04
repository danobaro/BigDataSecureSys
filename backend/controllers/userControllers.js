const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Staff = require('../models/userModel')
const { Error } = require('mongoose')

//@desc register a new user
//@route /api/users
//@access public
const registerStaff = asyncHandler (async(req, res) => {
    const {name, dob, age, designature, level, email, address, 
        sex, phone, marital, nationality, state, lga, 
        image, password} = req.body

    //validation
    if(!name || !email || !password){
        return res.status(400)
        throw new console.error(
            'please include all fields'
        )
    }

    //Find if a user already exist
    const userExists = await Staff.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

//Create user
const user = await Staff.create({
    name, dob, age, designature, level, email, address, sex, 
    phone, marital, nationality, state, lga, image, password: hashedPassword
})

if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        dob: user.dob,
        age: user.age,
        designature: user.designature,
        level: user.level,
        email: user.email,
        address: user.address,
        sex: user.sex,
        phone:user.phone,
        marital: user.marital,
        nationality: user.nationality,
        state: user.state,
        lga: user.lga,
        image: user.image,
        password: user.password,
        token: generateToken(user._id)
    })
}else{
    res.status(400)
    throw new Error('Invalid user data')
}
})


//@desc login a user
//@route /api/users/login
//@access public

const loginStaff =asyncHandler (async (req, res) => {
    const {email, password} = req.body

   const user = await Staff.findOne({email})

   //Check user and passwords match
   if(user && bcrypt.compare(password, user.password)){
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        level: user.level,
        token: generateToken(user._id)
    })
   }else{
    res.status(401)
    throw new Error('Invalid credentials')
   }

})

// @desc    Get users
// @route   GET /api/users/getusers
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const user = await Staff.find()
    res.status(200).json(user)
  })
  
  // @desc    Get user
  // @route   GET /api/users/:id
  // @access  Private
  const getUser = asyncHandler(async (req, res) => {
    const user = await Staff.findById(req.params.id)
  
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
  
    if (user.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  
    res.status(200).json(user)
  })

//genrate token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    } )
}

module.exports = {
    registerStaff,
    getUser,
    getUsers,
    loginStaff,
}