// token.js

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h', // Token expires after 1 hour
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
