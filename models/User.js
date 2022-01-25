const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String
}, {timestamps: true})

const User = mongoose.model('Users', userSchema)
module.exports = User