// models/calculatorModel.js
const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calculatorName: { type: String, required: true },
  inputs: { type: Object, required: true },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Calculator', calculatorSchema);
