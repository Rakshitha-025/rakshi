// controllers/calculator_controllers.js
const CalculatorModel = require('../models/calculatorModel'); // Import your model

// Function to save calculations
const SaveCalculations = async (req, res) => {
    try {
        const { calculatorName, inputs, result } = req.body;

        // Validation
        if (!calculatorName || !inputs || !result) {
            return res.status(400).json({ message: "Calculator name, inputs, and result are required." });
        }

        // Logic to save calculations
        const calculation = new CalculatorModel({
            userId: req.userId, // Attach user ID from auth middleware
            calculatorName,
            inputs,
            result
        });

        await calculation.save();
        return res.status(201).json({ message: "Calculations saved successfully." });
    } catch (error) {
        console.error('Error saving calculations:', error);
        return res.status(500).json({ message: "Error saving calculations", error });
    }
};

// Function to retrieve saved calculations
const GetSaveCalculations = async (req, res) => {
    try {
        // Fetch calculations from the database for the authenticated user
        const calculations = await CalculatorModel.find({ userId: req.userId });
        return res.status(200).json(calculations);
    } catch (error) {
        console.error('Error fetching calculations:', error);
        return res.status(500).json({ message: "Error fetching saved calculations", error });
    }
};

module.exports = {
    SaveCalculations,
    GetSaveCalculations,
};
