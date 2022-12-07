import {Schema, model, models} from 'mongoose'

const customheroSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: Blob,
    required: true,
  },
})

module.exports = models.Customhero ? models.Customhero : model('Customhero', customheroSchema)