const User = require('../model/userModel')
const Favourite = require('../model/favouriteModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateJWT');
require("dotenv").config();
const multer = require('multer')
const express = require('express');
const {normalize} = require('path')
const bcrypt = require('bcrypt')

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
        const favourite = await Favourite.create({user_ID, courchevel,val_Thorens,les_Menuires,saint_Martin_De_Belleville, orelle, brides_Les_Bains,meribel})
        
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
    const {_id, first_name, last_name, email, gender,dob,pic, password} = req.body;
    console.log(password)
    try{
        await User.findByIdAndUpdate(_id,{
            first_name: first_name,
            last_name: last_name,
            gender: gender, 
            dob: dob, 
            pic: pic,
            password: password
        } );
    }catch(err){
        console.log(err);
    }
})

const DataGridUpdate = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, gender, dob} = req.body;
    console.log(req.body)
    try{
        await User.findOneAndUpdate({email: email}, {
            first_name: first_name,
            last_name: last_name, 
            gender: gender,
            dob: dob
        })
        console.log("succesfully Updated Row")
        res.send("success")
    }
    catch(err){
        console.log("failed...")
        res.send(err)
    }
})

const adminDataUpdate = asyncHandler(async (req, res) => {
    const {_id, first_name, last_name, email, gender,dob,pic, is_admin} = req.body;
    try{
        await User.findByIdAndUpdate(_id,{
            first_name: first_name,
            last_name: last_name,
            gender: gender, 
            dob: dob, 
            pic: pic,
            is_admin: is_admin
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
    try{
        var filename = req.file.filename;
        const _id = req.body._id;
        const first_name = req.body.first_name
        const last_name = req.body.last_name;
        const gender = req.body.gender
        const dob = req.body.dob

        await User.findByIdAndUpdate(_id,{
                pic: `images/${filename}`,
                first_name: first_name,
                last_name: last_name,
                gender: gender, 
                dob: dob, 

        }),
        res.status(200).json({
            success: 'success',
            filename: filename
        })
    }
    catch{
        const _id = req.body._id;
        const first_name = req.body.first_name
        const last_name = req.body.last_name;
        const gender = req.body.gender
        const dob = req.body.dob

        await User.findByIdAndUpdate(_id,{
            first_name: first_name,
            last_name: last_name,
            gender: gender, 
            dob: dob, 

    }),
    res.status(200).json({
        success: 'success'
    })
    }

    
}

const updatePassword = async (req, res) => {
    console.log(req.body)
    const {id, password} = req.body
    await User.findByIdAndUpdate(id, {
        password: password
    })
    console.log(password)
    res.sendStatus(200)
}



module.exports = { getUsers, registerUser, authUser, currentUserInfo, uploadImage, uploadReq, updateUserInfo, adminDataUpdate, updatePassword, DataGridUpdate}