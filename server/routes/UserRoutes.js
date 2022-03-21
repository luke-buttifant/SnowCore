const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const {getUsers, postUser} = require('../controllers/userController')


//User Controller
router.get('/', getUsers)
router.post('/', (req, res) => {
    const user = new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        is_admin: req.body.is_admin
      });
    
      user.save()
        .then(data =>{
        res.json(data);
      })
      .catch(err => {
        res.json({message: err});
    
      });




});





module.exports = router