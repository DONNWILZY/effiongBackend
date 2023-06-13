// userAuth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../../utility/createError.js');
const User = require('../../models/user/User');

const register = async (req, res, next) => {
  try {
    // Extract user registration data from req.body

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(createError(409, 'Username or email already exists'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json(savedUser);
  } catch (error) {
    next(createError(500, 'Internal server error'));
  }
};

const login = async (req, res, next) => {
  try {
    // Extract user login data from req.body

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(401, 'Invalid username or password'));
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid username or password'));
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a response
    res.status(200).json({ token });
  } catch (error) {
    next(createError(500, 'Internal server error'));
  }
};

module.exports = {
  register,
  login,
};
