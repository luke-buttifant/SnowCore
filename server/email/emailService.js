var nodemailer = require('nodemailer');
const Resorts = require('../model/resortModelv2')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const axios = require('axios')


var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'snowcoreofficial@outlook.com',
    pass: 'Snowcore'
  }
});

var mailOptions = {
  from: 'SnowCoreOfficial@outlook.com, ',
  to: 'SnowCoreOfficial@outlook.com, ',
  subject: 'Snowfall Alert',
  text: 'Freshly snow today fell in the villages of: Please pay attention as it may be dangerous. This message was generated automatically. If necessary, please contact our Snowcore team.'
};

const emailService = async () => {
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
} 

const emails = asyncHandler(async (req, res) => {
  const request = `https://api.weatherunlocked.com/api/resortforecast/${333005}?hourly_interval=&app_id=${process.env.API_APP_ID}&app_key=${process.env.API_APP_KEY}`
  const weather = await axios.get(request)

  const emails = await Resorts.findOne({resort_name:"courchevel"});
  console.log(emails.snowAlerts)
  console.log(weather.data.forecast)
})

module.exports = emails
