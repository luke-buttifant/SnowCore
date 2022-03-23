const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');

// Get users
// Route: /api/users
const getUsers = async (req, res) => { 
    const users = await User.find()


    res.status(200).json(users)
}

const registerUser = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, password, gender, is_admin} = req.body;

    const userExists = await User.findOne({email});

    if (userExists)
    {
    res.status(400);
    throw new Error('User already exists with that email.')
    }

    const user = await User.create({first_name, last_name, email, password, gender, is_admin});

    if(user){
        res.status(201).json({
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
        })}
        else{
            res.status(400)
            throw new Error("Error Occured!")
        }
});




module.exports = { getUsers, registerUser}