const monthlyData = require('../model/monthlyModel')
const Resorts = require('../model/resortModelv2')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateJWT');
require("dotenv").config();




const creataDataSet = asyncHandler(async (req, res) => {
    collectionDataFav= await Resorts.find()

    var favourites= 0
    for(var i = 0; i <collectionDataFav.length; i++) {
        favourites+=collectionDataFav[i].favouriteCount
    
    }

    //get total number of users
    var users=(await User.find()).length
    
    //Get current month
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = new Date();
    let month = months[day.getMonth()];
   // const dataSet = await monthlyData.create({month,users,favourites})
   // console.log(dataSet)
    console.log("Favourites: ",favourites,"Users: ",users,"Month:",month)
    console.log("NANANAANN")
    
        
});
module.exports = { creataDataSet}