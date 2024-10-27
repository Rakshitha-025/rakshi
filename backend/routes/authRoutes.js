const express = require('express');
const { signup, login } = require('../controllers/authController'); // Adjust import

const router = express.Router();

// Sign Up
router.post('/signup', signup);

// Login
router.post('/login', login);

module.exports = router;
