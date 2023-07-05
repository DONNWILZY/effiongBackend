const express = require('express');
const router = express.Router();
const createError = require('../../utility/createError');
const User = require('../../models/user/User');
const mailer = require('../../utility/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../../models/user/token.js')
const verificationCode = require('../../models/user/ResetPasswordComfirmationCode.js')
const currentUrl = 'http://127.0.0.1:8080';

// Request password reset
const requestPasswordReset = async (req, res, next) => {
  try {
    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Update user with the verification code
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { passwordResetCode: code },
      { new: true }
    );

    // Send the verification code to the user's email
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: 'Password Reset Verification',
      html: `
        <p>Dear ${user.username},</p>
        <p>You have requested to reset your password. Please use the following verification code to proceed:</p>
        <p><strong>${code}</strong></p>
        <p>Alternatively, you can click on the following link to reset your password:</p>
        <a href="${currentUrl}/api/user/confirmPassword/${code}"> Reset Password</a>
        <p>If you did not initiate this request, please ignore this email.</p>
      `,
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        next(error);
      } else {
        console.log('Password reset email sent successfully');
        res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    next(error);
  }
};

// Confirm password reset
const confirmPasswordReset = async (req, res, next) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    // Find the user by email and check if the verification code is valid
    const user = await User.findOne({
      email,
      passwordResetCode: code,
      passwordResetExpiry: { $gt: Date.now() }, // Check if the code is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and remove the verification code fields
    user.password = hashedPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpiry = undefined;

    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error confirming password reset:', error);
    next(error);
  }
};

module.exports = {
  requestPasswordReset,
  confirmPasswordReset,
};
