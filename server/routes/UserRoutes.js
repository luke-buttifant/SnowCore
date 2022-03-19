const express = require('express')
const router = express.Router()
const {getUsers} = require('../controllers/userController')


//User Controller
router.get('/', getUsers)



module.exports = router