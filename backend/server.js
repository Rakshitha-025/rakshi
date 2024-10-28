// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Make sure this connects to your MongoDB
const authRoutes = require('./routes/authRoutes'); // Ensure this is defined
const calculatorRoutes = require('./routes/calculator_routes'); // Import calculator routes
const dotenv = require('dotenv');

dotenv.config();
connectDB(); // Connect to your MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/calculator', calculatorRoutes); // Calculator routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
