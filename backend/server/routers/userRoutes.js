const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for getting all user details
router.get('/users', userController.getAllUsers);

module.exports = router;