const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    last_name: {
        type: String,
        required: [true, 'Please add a  last name'],
      },

    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    gender: {
        type: String,
        required: [true, 'Please add a  gender'],
    },
    dob: {
      type: String,
      required: [true, "Please provide your date of birth."]
    },
    pic:{
      type: String,
      default: "https://www.perfecttutor.in/images/student2.png"
    },
    is_admin: {
        type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema)
