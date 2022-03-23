const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const {getUsers, postUser, registerUser} = require('../controllers/userController')


//User Controller
router.get('/', getUsers)
router.post('/', registerUser)





module.exports = router