const express = require ("express");
const router = express.Router();
const jwt = require ("jsonwebtoken");
const authControllers = require('../../controllers/user/birtthdayController.js');
const birthdayController = require('../../controllers/user/birtthdayController')

///// IMPORT CONTROLLERS FROM userController.js
const { 
    createUser, updateUser, deleteUser, getUser, getAllUsers, getActiveUsers} = require("../../controllers/user/userController");
///// Import User from  ../models/User.js
const User = require ("../../models/user/User");
///// verify token
const {verifyAdmin} = require ("../../utility/verifytoken");




// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

// Get a user by ID
router.get('/:id', getUser);

// Get all users
router.get('/', getAllUsers);

// Get active users sorted by moment
router.get('/active', getActiveUsers);

//update Birthday
router.patch('/:userId/birthday', birthdayController.updateBirthday);

module.exports = router;