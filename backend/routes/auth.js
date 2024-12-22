const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController'); // Make sure this import is correct

// Define the POST route for login
router.post('/login', login);  // Ensure 'login' function is passed here

module.exports = router;
