const express = require('express')
const router = express.Router()
const {favouriteResorts,resortData,createResort,addFavouriteResort,getFavouriteData,removeFavouriteResort, getAllFavourites} = require('../controllers/favouriteController')
const verify = require('../middlewares/verifyToken')


//favourite Controller
router.get('/getFavouriteResorts',verify, favouriteResorts)
router.get('/getResorts', resortData)
router.get('/createResorts', createResort)
router.post('/addResort',verify, addFavouriteResort)
router.post('/removeResort',verify, removeFavouriteResort)
router.get('/getFavouriteData',verify, getFavouriteData)
router.get('/getAllFavourites', getAllFavourites)






module.exports = router