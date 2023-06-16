////reset password confirmation code schema

const mongoose = require('mongoose');

const confirmationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const confirmationCode = mongoose.model('confirmationCode', confirmationCodeSchema);

module.exports = confirmationCode;
