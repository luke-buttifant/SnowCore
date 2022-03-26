const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateJWT');
require("dotenv").config();
const multer = require('multer')
const express = require('express');
const {normalize} = require('path')

 









// Get users
// Route: /api/users
const getUsers = async (req, res) => { 
    const users = await User.find()
    res.status(200).json(users)
}

const registerUser = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, password, gender,dob, is_admin} = req.body;

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
        const user = await User.findById(req.userId);
        // console.log(user);
        res.send(user)
    }catch(err){
        console.log(err);
    }
})

const updateUserInfo = asyncHandler(async (req, res) => {
    const {_id, first_name, last_name, email, gender,dob,pic} = req.body;
    try{
        await User.findByIdAndUpdate(_id,{
            first_name: first_name,
            last_name: last_name,
            gender: gender, 
            dob: dob, 
            pic: pic
        } );
    }catch(err){
        console.log(err);
    }
})

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) =>{
         callback(null, normalize('./client/public/images'));

    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`);
    }
});

const isImage = (req, file, callback) =>{
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    }
    else{
        callback(new Error('Only images are allowed...'));
    }
}


const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
});

const uploadImage = upload.single('photo')

const uploadReq = async (req, res) => {
    console.log(req.file);
    var filename = req.file.filename;
    const _id = req.body._id;

    await User.findByIdAndUpdate(_id,{
            pic: `images/${filename}`
    }),
    res.status(200).json({
        success: 'success',
        filename: filename
    })
    
}



module.exports = { getUsers, registerUser, authUser, currentUserInfo, uploadImage, uploadReq, updateUserInfo}