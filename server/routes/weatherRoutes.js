const express = require('express')
const router = express.Router()
const {getWeather, BestTimeToSki, HistoricalData} = require('../controllers/weatherController')
const verify = require('../middlewares/verifyToken')


//favourite Controller
router.get('/getWeather', getWeather)
router.get('/bestTimeToSki', BestTimeToSki)
router.get('/historicalData', HistoricalData)

module.exports = router