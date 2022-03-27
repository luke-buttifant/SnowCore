const express = require('express')
const router = express.Router()
const {favouriteResorts,resortData,createResort,setFavouriteResort} = require('../controllers/favouriteController')
const verify = require('../middlewares/verifyToken')


//favourite Controller
router.get('/getFavouriteResorts',verify, favouriteResorts)
router.get('/getResorts', resortData)
router.get('/createResorts', createResort)
router.post('/addFavourite', setFavouriteResort)





module.exports = router