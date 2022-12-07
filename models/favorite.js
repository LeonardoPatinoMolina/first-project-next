import {Schema, model, models} from 'mongoose'

const favoriteSchema = new Schema({
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