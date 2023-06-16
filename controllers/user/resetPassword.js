const express = require('express');
const router = express.Router();
const createError = require('../../utility/createError');
const User = require('../../models/user/User');
const mailer = require('../../utility/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../../models/user/token.js')
const verificationCode = require('../../models/user/ResetPasswordComfirmationCode.js')




// POST /api/reset-password/request
router.post('/request', async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a verification code record in the database
    await VerificationCode.findOneAndUpdate(
      { email },
      { code: verificationCode },
      { upsert: true }
    );

    // Generate a token with the email and verification code
    const token = jwt.sign({ email, verificationCode }, process.env.JWT_SECRET);

    // Save the token in the database
    await Token.create({ email, token });

   
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Please use the following verification code: ${verificationCode}`,
      html: `Please use the following verification code: <strong>${verificationCode}</strong>.<br><br>Click <a href="${resetPasswordLink}">here</a> to reset your password.`,
    };
    await mail.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /api/reset-password/verify?token=<token>
router.get('/verify', async (req, res, next) => {
  try {
    const { token } = req.query;

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token exists in the database
    const tokenRecord = await Token.findOne({ email: decodedToken.email, token });
    if (!tokenRecord) {
      throw createError(400, 'Invalid or expired token');
    }

    // Render a form for the user to enter the new password
    res.render('resetPasswordForm', { token });
  } catch (error) {
    next(error);
  }
});

// POST /api/reset-password/reset
router.post('/reset', async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token exists in the database
    const tokenRecord = await Token.findOne({ email: decodedToken.email, token });
    if (!tokenRecord) {
      throw createError(400, 'Invalid or expired token');
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email: decodedToken.email }, { password: hashedPassword });

    // Delete the token and verification code records
    await Token.findOneAndDelete({ email: decodedToken.email, token });
    await VerificationCode.findOneAndDelete({ email: decodedToken.email });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
