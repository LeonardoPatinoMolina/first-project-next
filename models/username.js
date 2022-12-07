import {Schema, model, models} from 'mongoose'

const usernameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = models.Username ? models.Username : model('Username', usernameSchema)