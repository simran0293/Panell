const express = require('express');
const registerUser = require('../controller/registerUser');
const { loginUser } = require('../controller/loginUser');
const userDetails = require('../controller/userDetails');
const logoutUser = require('../controller/logoutUser');
const { getAllUsers, getUserById, updateUser, deleteUser, createUser } = require('../controller/userController');


const router= express.Router()

//create user API
router.post('/register',registerUser);
//for login functionality
router.post('/login',loginUser);
//get user details
router.get('/me',userDetails)
//log out
router.post('/logout',logoutUser)
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);   // Fetch user by ID
router.put('/users/:id', updateUser);   // Update user
router.delete('/users/:id', deleteUser); // Delete user

router.post('/newuser', createUser); // Added route for admin to add users

module.exports = router