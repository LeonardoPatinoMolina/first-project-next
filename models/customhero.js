import mongoose, {Schema, model, models} from 'mongoose'

const customheroSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  history: {
    type: String
  }
})
module.exports = models.Customhero ? models.Customhero : model('Customhero', customheroSchema)