var nodemailer = require('nodemailer');
const Resorts = require('../model/resortModelv2')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const axios = require('axios');
const User = require("../model/userModel")
const favouriteSchema = require("../model/favouriteModel")
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

function mailSender(emailList,snowfall, resorts){
  console.log(emailList)
var transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 100,
  service: 'outlook',
  auth: {
    user: 'snowcoreofficial@outlook.com',
    pass: 'Snowcore'
  }
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve(__dirname + '/views/'),
      defaultLayout: false,
  },
  viewPath: path.resolve(__dirname + '/views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

var mailOptions = {
  attachments: [{
    filename: 'snowcore.png',
    path: __dirname + '/images/snowcore.png',
    cid: 'image@snowcore1234'
  }],
  from: 'SnowCoreOfficial@outlook.com',
  bcc: emailList,
  subject: 'Snowfall Alert',
  text: `There was ${snowfall}cm of snowfall today at ${resorts}. Please pay attention as it may be dangerous. This message was generated automatically. If necessary, please contact our Snowcore team.`,
  template: "email",
  context:{
    snowfall: snowfall,
    resorts: resorts 
}
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
  var meribel = []
  const users = await User.find({});
  const favourites = await favouriteSchema.find({});
  var usersWFavs = [];
  for(let i = 0; i < users.length; i++){
    for(let f = 0; f < favourites.length; f++){
      if(users[i]._id == favourites[f].user_ID){
        usersWFavs.push(favourites[f].user_ID)
      }
    }
  }
  var courchevel = []
  var meribel = []
  var valThorens = []
  var lesMenuires = []
  var stMartin = []
  var orelle = []
  var bridesLesBains = []

  for(let u = 0; u< usersWFavs.length; u++){
    var usersFav = await favouriteSchema.findOne({user_ID: usersWFavs[u]})
    if(usersFav.courchevel == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      courchevel.push(usersEmail)
    }
    if(usersFav.meribel == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      meribel.push(usersEmail)
    }
    if(usersFav.val_Thorens == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      valThorens.push(usersEmail)
    }
    if(usersFav.les_Menuires == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      lesMenuires.push(usersEmail)
    }
    if(usersFav.saint_Martin_de_Belleville == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      stMartin.push(usersEmail)
    }
    if(usersFav.orelle == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      orelle.push(usersEmail)
    }
    if(usersFav.brides_les_Bains == true){
      var user = await User.findById(usersFav.user_ID)
      var usersEmail = user.email;
      bridesLesBains.push(usersEmail)
    }
  }

  for(let i = 0;i < resorts.length; i++){
      var response = await getWeather([resorts[i]])
      var name = response[1]
      var snowfall= response[0]
      if(snowfall > 0){
        if(name == "Courchevel"){
          console.log(courchevel)
          if(courchevel.length > 0){mailSender(courchevel,snowfall, name)}
        }
        if(name == "Val Thorens"){
          if(valThorens.length > 0) {mailSender(valThorens,snowfall, name)}
        }
        if(name == "Saint Martin De Belleville"){
          if(stMartin.length > 0) {mailSender(stMartin,snowfall, name)}
        }
        if(name == "Brides Les Bains"){
          if(bridesLesBains.length > 0){mailSender(bridesLesBains, snowfall, name)}
        }
        if(name == "Orelle"){
          if(orelle.length > 0){mailSender(orelle, snowfall, name)}
        }
        if(name == "Meribel"){
         if(meribel.length > 0){mailSender(meribel, snowfall, name)}
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      else{console.log(`There was no snowfall at ${name} today`)}
  }


}
module.exports = checkForSnowFall
