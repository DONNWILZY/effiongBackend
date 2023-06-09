


























/*const router = require('express').Router();
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require("../../utility/createError.js");
const { verifyToken, verifyUser, verifyAdmin, verifyVendor } = require("../../utility/verifytoken.js");


// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Wrong credentials' });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    // Remove the password from the user object
    const { password: _, ...userWithoutPassword } = user._doc;

    // Send the response with the user and access token
    res.status(200).json({ user: userWithoutPassword, accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;




*/