const mongoose = require('mongoose')

const resortModel = mongoose.Schema(
  {
    resort_Title: {
      type: String,
      required: [true, ''],
    },
    resort_name: {
      type: String,
      required: [true, ''],
    },
    favouriteCount: {
      type: Number,
      required: [true, ''],
    },
    degrees: {
      type: Number,
      required: [true, ''],
    },
    rain: {
      type: Number,
      required: [true, ''],
    },
    wind: {
      type: Number,
      required: [true, ''],
    },
    src: {
      type: String,
      required: [true, ''],
    },
    snowAlerts: {
      type: [
      

      ],
      required: [true, ''],
    },
    

   
  },
  {
  }
)


module.exports = mongoose.model('ResortTest', resortModel)
