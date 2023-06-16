const User = require('../../models/user/User.js');
const EmailUsers = require('../../models/user/EmailUsers.js');
const mailer = require('../../utility/mailer.js')

const emailUsers = async (req, res, next) => {
  try {
    const { _id, subject, message } = req.body;

    const newmail = new EmailUsers({
      subject,
      message,
      _id,
    });

    const savedmail = await newmail.save();

    // Fetch all users
    const users = await User.find();

    // Send emails to all users
    const emailPromises = users.map((user) => {
      return new Promise((resolve, reject) => {
        // Configure email options
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: user.email,
          subject: savedmail.subject,
          text: savedmail.message,
        };

        // Send email
        mailer.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    });

    // Wait for all emails to be sent
    const emailResults = await Promise.all(emailPromises);

    res.status(200).json({
      status: 'success',
      message: 'Emails sent successfully',
      results: emailResults,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  emailUsers,
};
