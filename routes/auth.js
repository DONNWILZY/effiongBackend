// auth.js
const router = require('express').Router();
const authController = require('../controllers/user/authControllers');
const { verifyToken } = require('../utility/verifyToken');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
