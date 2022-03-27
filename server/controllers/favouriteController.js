const Favourite = require('../model/favouriteModel')
const Resorts = require('../model/resortModelv2')

const asyncHandler = require('express-async-handler');
require("dotenv").config();

// Get favourites resorts
// Route: /api/favourites
const favouriteResorts = asyncHandler(async (req, res) => {
    try{
        listOfFavourites=[];
        //const favourites = await Favourite.findOne({user_ID:req.userId});
        const favourites = await Favourite.findOne({user_ID:req.userId}).lean();
        for(var x = 0; x <Object.keys(favourites).length-1; x++) {
            if (Object.values(favourites)[x]==true)
            {
                let resortName=Object.keys(favourites)[x];
                resortName=resortName.replace(/_/g, ' ');
                resortName=resortName.charAt(0).toLocaleUpperCase() + resortName.slice(1);
                const resort = await Resorts.findOne({resort_Title:resortName});
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
    }catch(err){
        console.log(err);
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

const setFavouriteResort = asyncHandler(async (req, res) => {
    try{
        const {favouriteResortTrue} = req.body;
        const favourites = await Favourite.updateOne({favouriteResortTrue},{$set:true})
        console.log("DZIALA HURA");
         res.send("WORKS")
    }catch(err){
        console.log(err);
    }
})


module.exports = { favouriteResorts, resortData,createResort,setFavouriteResort}