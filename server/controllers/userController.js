const User = require('../model/userModel')
const Favourite = require('../model/favouriteModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateJWT');
require("dotenv").config();

// Get users
// Route: /api/users
const getUsers = async (req, res) => { 
    const users = await User.find()
    res.status(200).json(users)
}

const registerUser = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, password, gender,dob, is_admin} = req.body;
    const [  courchevel,meribel, brides_Les_Bains, les_Menuires, saint_Martin_De_Belleville,val_Thorens, orelle] = [true,true,false,false,false,false,false]

    const userExists = await User.findOne({email});

    if (userExists)
    {
    res.status(400);
    throw new Error('User already exists with that email.')
    }

    const user = await User.create({first_name, last_name, email, password, gender,dob, is_admin});

    if(user){
        const token = generateToken(user._id);
        res.json({auth: true, token: token, result: user})
    }
        else{
            res.status(400)
            throw new Error("Error Occured!")
        }
        user_ID=user._id;
        const favourite = await Favourite.create({user_ID, courchevel, meribel,brides_Les_Bains,les_Menuires,saint_Martin_De_Belleville,val_Thorens,orelle})
        
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);
        res.json({auth: true, token: token, result: user})
    }
    else{
        throw new Error("Invalid email or password!")
    }

});




const currentUserInfo = asyncHandler(async (req, res) => {
    try{
        console.log(req.userId)
        const user = await User.findById(req.userId);
        console.log(user);
        res.send(user)
    }catch(err){
        console.log(err);
    }
})



module.exports = { getUsers, registerUser, authUser, currentUserInfo}