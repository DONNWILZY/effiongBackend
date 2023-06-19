const express = require ("express");
const router = express.Router();
const jwt = require ("jsonwebtoken");
const authControllers = require('../../controllers/user/birtthdayController.js');
const birthdayController = require('../../controllers/user/birtthdayController.js')
const emailAllUsers = require('../../controllers/user/emailUsersController.js');
const PasswordReset = require('../../controllers/user/resetPassword.js')
//const {} = require('../../')


///// IMPORT CONTROLLERS FROM userController.js
const { 
    createUser, updateUser, deleteUser, getUser, getAllUsers, getActiveUsers} = require("../../controllers/user/userController");
///// Import User from  ../models/User.js
const User = require ("../../models/user/User");
///// verify token
const {verifyToken,
    verifyUser,
    verifyAdmin,
    verifyVendor} = require ("../../utility/verifytoken");




// Create a new user
router.post('/create', verifyUser, verifyAdmin, createUser);

// Update a user
router.put('/:id', verifyUser, verifyAdmin, updateUser);

// Delete a user
router.delete('/:id', verifyUser, verifyAdmin, deleteUser);

// Get a user by ID
router.get('/:id', getUser);

// Get all users
router.get('/', getAllUsers);

// Get active users sorted by moment
router.get('/active', getActiveUsers);

// Get Online users sorted by moment
//router.get('/active', getActiveUsers);

// Get Online users by last seen
//router.get('/active', getActiveUsers);

//update Birthday
router.patch('/birthday/:userId/', birthdayController.updateBirthday);

//send email to all users
router.post('/email/:userId', verifyAdmin, emailAllUsers.emailUsers);
//router.post('/email', emailUsersController );

//reset password
router.post('/reset-password/request', verifyUser, PasswordReset);

module.exports = router;