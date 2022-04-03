
const axios = require('axios')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const express = require('express');


const request = `https://api.weatherunlocked.com/api/resortforecast/333005?app_id=${process.env.API_APP_ID}&app_key=${process.env.API_APP_KEY}`

// Get users
// Route: /api/users
const getWeather = async (req, res) => { 
    const weather = await axios.get(request)
    console.log(weather.data)
    res.status(200).json(weather.data)
}

module.exports = {getWeather}