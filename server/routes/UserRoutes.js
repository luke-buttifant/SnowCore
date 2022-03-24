const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const {getUsers, authUser, registerUser, currentUserInfo} = require('../controllers/userController')
const verify = require('../middlewares/verifyToken')


//User Controller
router.get('/', getUsers)
router.post('/', registerUser)
router.post('/login', authUser)
router.get('/currentUser',verify, currentUserInfo)





module.exports = router