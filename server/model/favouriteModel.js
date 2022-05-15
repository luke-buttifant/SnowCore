const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema(
  {
    user_ID: {
      type: String,
    },
    courchevel: {
      type: Boolean,
    },
    val_Thorens: {
      type: Boolean,
    },
    les_Menuires: {
      type: Boolean,
    },
    saint_Martin_De_Belleville: {
      type: Boolean,
    },
    orelle: {
      type: Boolean,
    },
    brides_Les_Bains: {
      type: Boolean,
    },
    meribel: {
      type: Boolean,
    },

   
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('Favourite', favouriteSchema)
