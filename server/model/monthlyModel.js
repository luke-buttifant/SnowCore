const mongoose = require('mongoose')

const monthlySchema = mongoose.Schema(
  {
   month : {
      type: String,
      required: [true, 'Please add a first name'],
    },
    users: {
      type: Number,
      required: [true, 'Please add a first name'],
    },
    favourites: {
      type: Number,
      required: [true, 'Please add a first name'],
    },
   
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('monthlyModel', monthlySchema)
