const express = require('express')
const router = express.Router()
const {
    registerStaff, 
    loginStaff,
    getUsers,
    getUser,
} = require('../controllers/userControllers')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerStaff)
router.route('/:id')
router.post('/login',  loginStaff)
router.get('/getusers', getUsers)
router.get('/getuser', getUser)


module.exports = router