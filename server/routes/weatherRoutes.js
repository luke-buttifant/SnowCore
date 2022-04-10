const express = require('express')
const router = express.Router()
const {getWeather, BestTimeToSki} = require('../controllers/weatherController')
const verify = require('../middlewares/verifyToken')


//favourite Controller
router.get('/getWeather', getWeather)
router.get('/bestTimeToSki', BestTimeToSki)

module.exports = router