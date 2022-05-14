const express = require('express')
const router = express.Router()
const {getAllFavouriteData,getEachFavouriteData,getAllUserData} = require('../controllers/adminDashBoardController')
const verify = require('../middlewares/verifyToken')


//Routes for emails alerts
router.get('/getAllFavourites', getAllFavouriteData)
router.get('/getEachFavourites', getEachFavouriteData)
router.get('/getAllUsers', getAllUserData)







module.exports = router