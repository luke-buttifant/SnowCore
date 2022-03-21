const User = require('../model/userModel')

// Get users
// Route: /api/users
const getUsers = async (req, res) => { 
    const users = await User.find()


    res.status(200).json(users)
}




module.exports = { getUsers}