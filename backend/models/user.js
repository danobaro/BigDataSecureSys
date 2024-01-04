const mongoose = require('mongoose');

const user2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User2 = mongoose.model('User2', user2Schema);
module.exports = {User2};
