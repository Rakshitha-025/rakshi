import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
  // State variables for BMI Calculator
  const [bmiHeight, setBMIHeight] = useState('');
  const [bmiWeight, setBMIWeight] = useState('');
  const [bmiCategory, setBMICategory] = useState('');
  const [bmiResult, setBMIResult] = useState('');

  // State variables for BMR Calculator
  const [bmrGender, setBMRGender] = useState('male');
  const [bmrAge, setBMRAge] = useState('');
  const [bmrWeight, setBMRWeight] = useState('');
  const [bmrHeight, setBMRHeight] = useState('');
  const [bmrResult, setBMRResult] = useState('');

  // State variables for Calorie Calculator
  const [calGender, setCalGender] = useState('male');
  const [calAge, setCalAge] = useState('');
  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calActivityLevel, setCalActivityLevel] = useState('sedentary');
  const [caloriesResult, setCaloriesResult] = useState('');

  // State variables for Body Fat Calculator
  const [bodyFatGender, setBodyFatGender] = useState('male');
  const [bodyFatAge, setBodyFatAge] = useState('');
  const [bodyFatWaist, setBodyFatWaist] = useState('');
  const [bodyFatNeck, setBodyFatNeck] = useState('');
  const [bodyFatResult, setBodyFatResult] = useState('');

  // State variables for Ideal Weight Calculator
  const [idealWeightGender, setIdealWeightGender] = useState('male');
  const [idealWeightHeight, setIdealWeightHeight] = useState('');
  const [idealWeightAge, setIdealWeightAge] = useState('');
  const [idealWeightFrameSize, setIdealWeightFrameSize] = useState('medium');
  const [idealWeightResult, setIdealWeightResult] = useState('');

  const token = localStorage.getItem('token');

  // Function to calculate BMI
  const calculateBMI = async () => {
    if (!bmiHeight || !bmiWeight) {
      alert('Please enter both height and weight.');
      return;
    }

    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight);
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    setBMIResult(bmi);

    try {
      await axios.post('http://localhost:5000/api/calculator/save', {
        calculatorName: 'BMI',
        inputs: { height: bmiHeight, weight: bmiWeight },
        result: bmi,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBMICategory('BMI: ' + bmi);
      alert('BMI calculated and saved successfully!');
    } catch (error) {
      console.error('Error calculating BMI:', error.response ? error.response.data : error.message);
      alert('Failed to calculate BMI. Please check your inputs and try again.');
    }
  };

  // Function to calculate BMR
  const calculateBMR = async () => {
    if (!bmrAge || !bmrWeight || !bmrHeight) {
      alert('Please enter age, weight, and height.');
      return;
    }

    const age = parseInt(bmrAge);
    const weight = parseFloat(bmrWeight);
    const height = parseFloat(bmrHeight);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
      alert('Please enter valid age, weight, and height values.');
      return;
    }

    let bmr;
    if (bmrGender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    setBMRResult(bmr.toFixed(2));

    try {
      await axios.post('http://localhost:5000/api/calculator/save', {
        calculatorName: 'BMR',
        inputs: { gender: bmrGender, age: bmrAge, weight: bmrWeight, height: bmrHeight },
        result: bmr.toFixed(2),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('BMR calculated and saved successfully!');
    } catch (error) {
      console.error('Error calculating BMR:', error.response ? error.response.data : error.message);
      alert('Failed to calculate BMR. Please check your inputs and try again.');
    }
  };

  // Function to calculate Calorie Needs
  const calculateCalories = async () => {
    if (!calAge || !calWeight || !calHeight) {
      alert('Please enter age, weight, and height.');
      return;
    }

    const age = parseInt(calAge);
    const weight = parseFloat(calWeight);
    const height = parseFloat(calHeight);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
      alert('Please enter valid age, weight, and height values.');
      return;
    }

    let bmr;
    if (calGender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let activityMultiplier;
    switch (calActivityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightlyActive':
        activityMultiplier = 1.375;
        break;
      case 'moderatelyActive':
        activityMultiplier = 1.55;
        break;
      case 'veryActive':
        activityMultiplier = 1.725;
        break;
      case 'extraActive':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    const calories = (bmr * activityMultiplier).toFixed(2);
    setCaloriesResult(calories);

    try {
      await axios.post('http://localhost:5000/api/calculator/save', {
        calculatorName: 'Calories',
        inputs: { gender: calGender, age: calAge, weight: calWeight, height: calHeight, activityLevel: calActivityLevel },
        result: calories,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Calories needed calculated and saved successfully!');
    } catch (error) {
      console.error('Error calculating calories:', error.response ? error.response.data : error.message);
      alert('Failed to calculate calories. Please check your inputs and try again.');
    }
  };

  // Function to calculate Body Fat Percentage
  const calculateBodyFat = async () => {
    if (!bodyFatAge || !bodyFatWaist || !bodyFatNeck || !bmrHeight) {
      alert('Please enter age, waist, neck circumference, and height.');
      return;
    }

    const waist = parseFloat(bodyFatWaist);
    const neck = parseFloat(bodyFatNeck);
    const age = parseInt(bodyFatAge);
    const height = parseFloat(bmrHeight); // Get height from state

    if (isNaN(waist) || isNaN(neck) || isNaN(age) || isNaN(height) || waist <= 0 || neck <= 0 || age <= 0 || height <= 0) {
      alert('Please enter valid age, waist, neck, and height values.');
      return;
    }

    let bodyFatValue;
    if (bodyFatGender === 'male') {
      bodyFatValue = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bodyFatValue = 163.205 * Math.log10(waist + neck) - 97.684 * Math.log10(height) - 78.387;
    }

    setBodyFatResult(bodyFatValue.toFixed(2));

    try {
      await axios.post('http://localhost:5000/api/calculator/save', {
        calculatorName: 'Body Fat',
        inputs: { gender: bodyFatGender, age: bodyFatAge, waist: bodyFatWaist, neck: bodyFatNeck, height: height }, // Include height in the inputs
        result: bodyFatValue.toFixed(2),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Body Fat Percentage calculated and saved successfully!');
    } catch (error) {
      console.error('Error calculating body fat:', error.response ? error.response.data : error.message);
      alert('Failed to calculate body fat percentage. Please check your inputs and try again.');
    }
  };

  // Function to calculate Ideal Weight
  const calculateIdealWeight = async () => {
    if (!idealWeightHeight || !idealWeightAge) {
      alert('Please enter height and age.');
      return;
    }

    const height = parseFloat(idealWeightHeight);
    const age = parseInt(idealWeightAge);

    if (isNaN(height) || isNaN(age) || height <= 0 || age <= 0) {
      alert('Please enter valid height and age values.');
      return;
    }

    let idealWeight;
    if (idealWeightGender === 'male') {
      idealWeight = 50 + 0.91 * (height - 152.4);
    } else {
      idealWeight = 45.5 + 0.91 * (height - 152.4);
    }

    if (idealWeightFrameSize === 'small') {
      idealWeight *= 0.95; // 5% less for small frame
    } else if (idealWeightFrameSize === 'large') {
      idealWeight *= 1.05; // 5% more for large frame
    }

    setIdealWeightResult(idealWeight.toFixed(2));

    try {
      await axios.post('http://localhost:5000/api/calculator/save', {
        calculatorName: 'Ideal Weight',
        inputs: { gender: idealWeightGender, height: idealWeightHeight, age: idealWeightAge, frameSize: idealWeightFrameSize },
        result: idealWeight.toFixed(2),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Ideal weight calculated and saved successfully!');
    } catch (error) {
      console.error('Error calculating ideal weight:', error.response ? error.response.data : error.message);
      alert('Failed to calculate ideal weight. Please check your inputs and try again.');
    }
  };

  return (
    <div className="calculator">
      <h1>Health Calculator</h1>

      <h2>BMI Calculator</h2>
      <input type="number" placeholder="Height (cm)" value={bmiHeight} onChange={(e) => setBMIHeight(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={bmiWeight} onChange={(e) => setBMIWeight(e.target.value)} />
      <button onClick={calculateBMI}>Calculate BMI</button>
      <div>{bmiCategory}</div>
      <div>BMI Result: {bmiResult}</div>

      <h2>BMR Calculator</h2>
      <select value={bmrGender} onChange={(e) => setBMRGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" placeholder="Age (years)" value={bmrAge} onChange={(e) => setBMRAge(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={bmrWeight} onChange={(e) => setBMRWeight(e.target.value)} />
      <input type="number" placeholder="Height (cm)" value={bmrHeight} onChange={(e) => setBMRHeight(e.target.value)} />
      <button onClick={calculateBMR}>Calculate BMR</button>
      <div>BMR Result: {bmrResult}</div>

      <h2>Calorie Needs Calculator</h2>
      <select value={calGender} onChange={(e) => setCalGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" placeholder="Age (years)" value={calAge} onChange={(e) => setCalAge(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={calWeight} onChange={(e) => setCalWeight(e.target.value)} />
      <input type="number" placeholder="Height (cm)" value={calHeight} onChange={(e) => setCalHeight(e.target.value)} />
      <select value={calActivityLevel} onChange={(e) => setCalActivityLevel(e.target.value)}>
        <option value="sedentary">Sedentary</option>
        <option value="lightlyActive">Lightly Active</option>
        <option value="moderatelyActive">Moderately Active</option>
        <option value="veryActive">Very Active</option>
        <option value="extraActive">Extra Active</option>
      </select>
      <button onClick={calculateCalories}>Calculate Calories</button>
      <div>Calories Needed: {caloriesResult}</div>

      <h2>Body Fat Calculator</h2>
      <select value={bodyFatGender} onChange={(e) => setBodyFatGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" placeholder="Age (years)" value={bodyFatAge} onChange={(e) => setBodyFatAge(e.target.value)} />
      <input type="number" placeholder="Waist Circumference (cm)" value={bodyFatWaist} onChange={(e) => setBodyFatWaist(e.target.value)} />
      <input type="number" placeholder="Neck Circumference (cm)" value={bodyFatNeck} onChange={(e) => setBodyFatNeck(e.target.value)} />
      <button onClick={calculateBodyFat}>Calculate Body Fat</button>
      <div>Body Fat Percentage: {bodyFatResult}</div>

      <h2>Ideal Weight Calculator</h2>
      <select value={idealWeightGender} onChange={(e) => setIdealWeightGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" placeholder="Height (cm)" value={idealWeightHeight} onChange={(e) => setIdealWeightHeight(e.target.value)} />
      <input type="number" placeholder="Age (years)" value={idealWeightAge} onChange={(e) => setIdealWeightAge(e.target.value)} />
      <select value={idealWeightFrameSize} onChange={(e) => setIdealWeightFrameSize(e.target.value)}>
        <option value="small">Small Frame</option>
        <option value="medium">Medium Frame</option>
        <option value="large">Large Frame</option>
      </select>
      <button onClick={calculateIdealWeight}>Calculate Ideal Weight</button>
      <div>Ideal Weight: {idealWeightResult}</div>
    </div>
  );
};

export default Calculator;
