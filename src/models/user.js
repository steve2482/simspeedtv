const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
  name: String,
  userName: String,
  password: String,
  favoriteChannels: Array
});

const User = mongoose.model('Channel', userSchema);

module.exports = {User};