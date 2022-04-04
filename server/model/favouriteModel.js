const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema(
  {
    user_ID: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    courchevel: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    val_Thorens: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    les_Menuires: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    saint_Martin_De_Belleville: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    orelle: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    brides_Les_Bains: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },
    meribel: {
      type: Boolean,
      required: [true, 'Please add a first name'],
    },

   
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('Favourite', favouriteSchema)
