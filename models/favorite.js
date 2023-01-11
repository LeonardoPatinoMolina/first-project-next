"use strict"
import mongoose, {Schema, model, models} from 'mongoose'

const favoriteSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})
module.exports = models.Favorite ? models.Favorite : model('Favorite', favoriteSchema)