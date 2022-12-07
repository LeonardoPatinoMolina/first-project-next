import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  hashpass: {
    type: String,
    required: true,
  },
})

module.exports = models.User ? models.User : model('User', userSchema)