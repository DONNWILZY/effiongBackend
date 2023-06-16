const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const createError = require('../../utility/createError');
const User = require('../../models/user/User.js');
const mailer = require('../../utility/mailer.js');
const path = require('path');
const VerificationToken = require('../../models/user/VerificationToken');
const OtpCode = require('../../models/user/OtpCode');


const sendVerificationEmail = async (user) => {
  const { _id, email } = user;
  const currentUrl = 'http://127.0.0.1:8080';
  const uniqueString = uuidv4() + _id;
  const verificationCode = generateOTPCode();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Email Verification</h1>
      <p>Thank you for signing up. Please click the following link to verify your email:</p>
    <a href="${currentUrl}/api/auth/verifyEmail/${_id}/${uniqueString}">Verify Email</a> 
      <p>Alternatively, you can use the following verification code:</p>
      <p><strong>${verificationCode}</strong></p>
      <p>Please enter the verification code in your account settings to verify your email.</p>
    `,
  };

  try {
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
    const newVerificationToken = new VerificationToken({
      userId: _id,
      token: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newVerificationToken.save();
    await mailer.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.log('Failed to send verification email');
    console.log(error);
  }
};

const generateOTPCode = () => {
  const digits = '0123456789';
  let otpCode = '';
  for (let i = 0; i < 6; i++) {
    otpCode += digits[Math.floor(Math.random() * 10)];
  }
  return otpCode;
};

const sendVerificationOTP = async (user) => {
  const { _id, email } = user;
  const otpCode = generateOTPCode();

  const otpCodeRecord = new OtpCode({
    userId: _id,
    code: otpCode,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000, // 10 minutes
  });

/*
  
  try {
    await otpCodeRecord.save();
    
    
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Account',
      html: `
        <h1>Account Verification</h1>
        <p>Thank you for signing up. Your verification code is:</p>
        <p><strong>${otpCode}</strong></p>
        <p>Please enter the verification code in your account settings to verify your account.</p>
      `,
    };
    await mailer.sendMail(mailOptions);
    console.log('Verification OTP sent');
  } catch (error) {
    console.log('Failed to send verification OTP');
    console.log(error);
  }
*/

};



const register = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      //const vvv = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'failed',
          message: 'Email or User is already registered.',
        });
      }

       // Password requirements
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a special character.',
      });
    }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      // Send verification email and OTP
      sendVerificationEmail(savedUser);
      sendVerificationOTP(savedUser);

      return res.status(200).json({
        status: 'success',
        message: 'Signup successful. Please check your email for verification.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while signing up.',
      });
    }
  },

  // Rest of the code...
};


const verifyEmail = async (req, res) => {
    // Extract the userId and verificationString from the request parameters
    const { userId, verificationString } = req.params;
  
    try {
      const verificationToken = await VerificationToken.findOne({ userId });
  
      if (!verificationToken) {
        // No verification token found for the user
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid verification link.',
        });
      }
  
      // Check if the verification token has expired
      if (verificationToken.expiresAt < Date.now()) {
        // If the verification link has expired, delete the verification token and the user
        await VerificationToken.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
  
        return res.status(400).json({
          status: 'failed',
          message: 'Verification link has expired. Please sign up again.',
        });
      }
  
      // Compare the verification string with the hashed token
      const isMatch = await bcrypt.compare(verificationString, verificationToken.token);
  
      if (!isMatch) {
        // Incorrect verification details
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid verification link.',
        });
      }
  
      // Mark the user as verified
      await User.updateOne({ _id: userId }, { verified: true });
  
      // Delete the verification token
      await VerificationToken.deleteOne({ userId });
     
        
      return res.status(200).json({
        status: 'success',
        message: 'Email verification successful.',
        
      });

  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while verifying the email.',
      });
    }
  };
  

  
  const login = async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
  
      if (!username && !email) {
        return res.status(400).json({
          status: 'failed',
          message: 'Username or email field is required',
        });
      }
  
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) {
        return res.status(500).json({
          status: 'failed',
          message: 'Wrong username or email',
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(500).json({
          status: 'failed',
          message: 'Wrong password',
        });
      }
  
      if (!user.verified) {
        return res.status(400).json({
          status: 'failed',
          message: 'Please verify your email before signing in',
        });
      }
      
    
      

      const token = jwt.sign({ userId: user._id }, process.env.PASS_SEC, { expiresIn: '1h' });
      const { isAdmin, ...otherDetails } = user._doc;

      
  
      return res.status(200).json({
        status: 'success',
        message: 'Successfully signed in',
        token,
        user: otherDetails,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });
    }
  };
  















  const authController = {
    // Other controller methods
    register, 
    login,
    verifyEmail,
  };

module.exports = {
    register, 
    login,
    verifyEmail};

   

