// routes/calculator_routes.js
const express = require('express');
const CalculatorControllers = require('../controllers/calculator_controllers');
const auth = require('../middleware/authMiddleware'); // Import auth middleware

const CalculatorRoute = express.Router();

// Protected routes
CalculatorRoute.post('/save', auth, CalculatorControllers.SaveCalculations);
CalculatorRoute.get('/saveCalculations', auth, CalculatorControllers.GetSaveCalculations);

module.exports = CalculatorRoute;
