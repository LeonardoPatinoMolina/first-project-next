import mongoose, {Schema, model, models} from 'mongoose'

const usernameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
})

module.exports = models.Username ? models.Username : model('Username', usernameSchema)