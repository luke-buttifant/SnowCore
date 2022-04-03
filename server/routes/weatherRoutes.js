const express = require('express')
const router = express.Router()
const {getWeather} = require('../controllers/weatherController')
const verify = require('../middlewares/verifyToken')


//favourite Controller
router.get('/getWeather', getWeather)

module.exports = router