const Favourite = require('../model/favouriteModel')
const Resorts = require('../model/resortModelv2')

const asyncHandler = require('express-async-handler');
const { collection } = require('../model/favouriteModel');
require("dotenv").config();


// Route: /api/dashboard


// Get all favourites likes
const getAllFavouriteData = asyncHandler(async (req, res) => {
    try{
    collectionData= await (await Resorts.find())
    var allValues= 0
    //console.log(collectionData)
    for(var i = 0; i <collectionData.length; i++) {
        //console.log(collectionData[i].favouriteCount)
        allValues+=collectionData[i].favouriteCount
    }
    res.send({"allValues":allValues})
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




module.exports = { getAllFavouriteData,getEachFavouriteData }