const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/user/authControllers');
const bcrypt = require('bcrypt');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Verification
router.get('/token', (req, res) => {
  // TODO: Implement token verification logic
});

module.exports = router;
