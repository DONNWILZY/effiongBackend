const mongoose = require('mongoose');

const sendEmailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    
  },
});

const sendEmail = mongoose.model('sendEmail', sendEmailSchema);

module.exports = sendEmail;
