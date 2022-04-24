const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const {getUsers, authUser, registerUser, currentUserInfo, uploadReq, uploadImage, updateUserInfo} = require('../controllers/userController')
const verify = require('../middlewares/verifyToken')


//User Controller
router.get('/', getUsers)
router.post('/', registerUser)
router.post('/login', authUser)
router.get('/currentUser',verify, currentUserInfo)
router.post('/uploadImage', uploadImage, uploadReq)
router.post('/updateUser', updateUserInfo)





module.exports = router