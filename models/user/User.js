const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      unique: true
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isVip: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
