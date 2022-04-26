const monthlyModel = require('../model/monthlyModel')
const Resorts = require('../model/resortModelv2')
const User = require('../model/userModel')

const asyncHandler = require('express-async-handler');
const { collection } = require('../model/favouriteModel');
require("dotenv").config();


// Route: /api/dashboard


// Get all favourites likes
const getAllFavouriteData = asyncHandler(async (req, res) => {
   
     // monthlyModel.findByIdAndRemove("626729f8f50799bed0131e5b").exec()
    try{
    collectionData= await Resorts.find()
    //Showing only first 4 months
    monthlyData= await monthlyModel.find().sort({$natural:-1}).limit(4)
    console.log("KOK",monthlyData)
    var allValues= 0
    //console.log(collectionData)
    for(var i = 0; i <collectionData.length; i++) {
        //console.log(collectionData[i].favouriteCount)
        allValues+=collectionData[i].favouriteCount
    }
    res.send({[monthlyData[3].month]:monthlyData[3].favourites ,[monthlyData[2].month]:monthlyData[2].favourites ,[monthlyData[1].month]:monthlyData[1].favourites ,[monthlyData[0].month]:monthlyData[0].favourites , "allValues":allValues})
    }catch(err){
        console.log(err);
    }
});

// Get favourites from each resort
const getEachFavouriteData = asyncHandler(async (req, res) => {
    try{
    collectionData= await (await Resorts.find())
    var eachValue= {}
    var maxLike=0
    var maxLikeResort=""
     //console.log(collectionData)
    for(var i = 0; i <collectionData.length; i++) {
        if(maxLike<collectionData[i].favouriteCount){
            maxLikeResort= collectionData[i].resort_Title 
            maxLike=collectionData[i].favouriteCount
        }
      //  var name=collectionData[i].resort_name 
        //console.log(collectionData[i].favouriteCount)
       eachValue[ collectionData[i].resort_name ] = collectionData[i].favouriteCount

       
       
    }
    eachValue["maxLikeResort"]=maxLikeResort
    eachValue["maxLike"]=maxLike

   // console.log(eachValue[0])
    console.log(maxLike)
    res.send(eachValue)
    }catch(err){
        console.log(err);
    }
});

const getAllUserData = asyncHandler(async (req, res) => {
   
    // monthlyModel.findByIdAndRemove("626729f8f50799bed0131e5b").exec()
   try{
   collectionData= await (await User.find()).length
   //Showing only first 4 months
   monthlyData= await monthlyModel.find().sort({$natural:-1}).limit(4)
   res.send({[monthlyData[3].month]:monthlyData[3].users ,[monthlyData[2].month]:monthlyData[2].users ,[monthlyData[1].month]:monthlyData[1].users ,[monthlyData[0].month]:monthlyData[0].users , "currentNrUsers":collectionData})
   }catch(err){
       console.log(err);
   }
});



module.exports = { getAllFavouriteData,getEachFavouriteData,getAllUserData}