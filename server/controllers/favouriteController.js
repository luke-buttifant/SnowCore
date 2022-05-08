const Favourite = require('../model/favouriteModel')
const Resorts = require('../model/resortModelv2')

const asyncHandler = require('express-async-handler');
require("dotenv").config();

// Get favourites resorts
// Route: /api/favourites

const getFavouriteData = asyncHandler(async (req, res) => {
    try{
    const favourites = await Favourite.findOne({user_ID:req.userId});
    res.send(favourites)
    }catch(err){
        console.log(err);
    }
});

const favouriteResorts = asyncHandler(async (req, res) => {
    try{
        listOfFavourites=[];
        //const favourites = await Favourite.findOne({user_ID:req.userId});
        const favourites = await Favourite.findOne({user_ID:req.userId}).lean();
        for(var x = 0; x <Object.keys(favourites).length-1; x++) {
            if (Object.values(favourites)[x]==true)
            {
                let resortName=Object.keys(favourites)[x];
               // resortName=resortName.replace(/_/g, ' ');
                //resortName=resortName.charAt(0).toLocaleUpperCase() + resortName.slice(1);
                const resort = await Resorts.findOne({resort_name:resortName});
                console.log(resort,"resort")
                listOfFavourites.push(resort);
                        }
           
        }
        res.send(listOfFavourites)
    }catch(err){
        console.log(err);
    }
})


const resortData = asyncHandler(async (req, res) => {
    try{
        const resort = await Resorts.find();
        res.send(resort)
        }
    catch{
        res.send("failed")
    }
})



const createResort = asyncHandler(async (req, res) => {
    try{
        const [ resort_Title, resort_name, favouriteCount ,degrees,wind ,rain ,src] = ["Test","test1",1,2,3,4,"false"]

        const resort = await Resorts.create({resort_Title, resort_name, favouriteCount ,degrees,wind ,rain ,src})       
         res.send("Created Resort")
    }catch(err){
        console.log(err);
    }
})

const addFavouriteResort = asyncHandler(async (req, res) => {
    try{
       
        const favouriteResortTrue = req.body;
        //Add resort to favourites
        const favourites = await Favourite.updateOne(
            {user_ID: req.userId},
             {$set: {[favouriteResortTrue.star] : true}});

        //Find number of likes
         const likes = await Resorts.findOne({resort_name:favouriteResortTrue.star});

        //Add one like to resort
        const resorts = await Resorts.updateOne(
            {"resort_name":favouriteResortTrue.star},
             {$set: {"favouriteCount" : likes.favouriteCount+1}});

        console.log(favourites)
        console.log(resorts)
        res.send(favourites)
    }catch(err){
        console.log(err);
    }
})

const removeFavouriteResort = asyncHandler(async (req, res) => {
    try{
       
        const favouriteResortTrue = req.body;
        //Add resort to favourites
        const favourites = await Favourite.updateOne(
            {user_ID: req.userId},
             {$set: {[favouriteResortTrue.star] : false}});

        //Find number of likes
         const likes = await Resorts.findOne({resort_name:favouriteResortTrue.star});

        //Add one like to resort
        const resorts = await Resorts.updateOne(
            {"resort_name":favouriteResortTrue.star},
             {$set: {"favouriteCount" : likes.favouriteCount-1}});

        console.log(favourites)
        console.log(resorts)
        res.send(favourites)
    }catch(err){
        console.log(err);
    }
})


module.exports = { favouriteResorts, resortData,createResort,addFavouriteResort,getFavouriteData,removeFavouriteResort}