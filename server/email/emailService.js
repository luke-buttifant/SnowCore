var nodemailer = require('nodemailer');
const Resorts = require('../model/resortModelv2')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const axios = require('axios')

function mailSender(emailList,resorts){
  console.log(emailList)
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'snowcoreofficial@outlook.com',
    pass: 'Snowcore'
  }
});

var mailOptions = {
  from: 'SnowCoreOfficial@outlook.com',
  bcc: emailList,
  subject: 'Snowfall Alert',
  text: `There was snowfall today at ${resorts}. Please pay attention as it may be dangerous. This message was generated automatically. If necessary, please contact our Snowcore team.`
};

//const emailService = async () => {
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
} 
//}

async function getWeather(resort_id) {
  const request = `https://api.weatherunlocked.com/api/resortforecast/${resort_id}?hourly_interval=12&app_id=${process.env.API_APP_ID}&app_key=${process.env.API_APP_KEY}`
  const weather = await axios.get(request)
  return [weather.data.forecast[0].mid.freshsnow_cm,weather.data.name]

}

const checkForSnowFall = async() => {
  const resorts =["333005","333020","333012","333031","54883577","54885193","333014"]
  resortDataList=[]
  emailList=[]

  for(let i = 0;i < resorts.length; i++){
    var response = await getWeather([resorts[i]])
    var name = response[1]
    var snowfall= response[0]
    if(snowfall >0){
      const emails = await Resorts.findOne({resort_Title:name});
      for(let i = 0;i < emails.snowAlerts.length; i++){
        emailList.push(emails.snowAlerts[i])
        
      }
      resortDataList.push(name+" ("+snowfall+"cm)")
      console.log(resortDataList)
      console.log(emailList)
    }
    

} 

console.log(emailList.length)
if(emailList.length==0){
  console.log("Today it wasn't snowing at any of the resorts.")
  }
  else{
    console.log(emailList)
    mailSender(emailList,resortDataList)
  }


}
module.exports = checkForSnowFall
