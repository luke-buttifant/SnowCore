const express = require('express')
const router = express.Router()
const {getAllFavouriteData,getEachFavouriteData} = require('../controllers/adminDashBoardController')
const verify = require('../middlewares/verifyToken')


//Routes for admin dashboard
router.get('/getAllFavourites', getAllFavouriteData)
router.get('/getEachFavourites', getEachFavouriteData)







module.exports = router