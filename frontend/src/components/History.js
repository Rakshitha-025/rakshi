// HealthHistory.js

import React, { useState } from 'react';
import './History.css';

const HealthHistory = () => {
  const [records, setRecords] = useState([]);

  const addHealthRecord = (event) => {
    event.preventDefault();

    const form = event.target;
    const date = form.date.value;
    const sugar = parseFloat(form.sugar.value); // Ensure sugar is treated as a number
    const bp = form.bp.value;
    const thyroid = parseFloat(form.thyroid.value); // Ensure thyroid is treated as a number
    const cholesterol = parseFloat(form.cholesterol.value); // Same for cholesterol

    // Check if any of the required fields are empty or invalid
    if (!date || isNaN(sugar) || !bp || isNaN(thyroid) || isNaN(cholesterol)) {
      alert('Please fill out all fields correctly');
      return;
    }

    const newRecord = {
      date: new Date(date).toLocaleDateString(),
      sugar,
      bp,
      thyroid,
      cholesterol,
    };

    setRecords([...records, newRecord]);
    form.reset();
  };

  return (
    <div className="container">
      <h1>Health History</h1>
      <div className="flex-container">
        <form id="healthForm" className="health-form" onSubmit={addHealthRecord}>
          <label>Date</label>
          <input type="date" name="date" required />
          <br />
          <label>Blood Sugar (mg/dL)</label>
          <input type="number" name="sugar" step="0.1" placeholder="Enter your sugar level" required />
          <br />
          <label>Blood Pressure (mmHg)</label>
          <input type="text" name="bp" placeholder="e.g., 120/80" required />
          <br />
          <label>Thyroid Level (uIU/mL)</label>
          <input type="number" name="thyroid" step="0.01" placeholder="Enter thyroid level" required />
          <br />
          <label>Cholesterol (mg/dL)</label>
          <input type="number" name="cholesterol" step="0.1" placeholder="Enter cholesterol level" required />
          
          <button type="submit">Add Record</button>
        </form>

        <div className="history-list">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div key={index} className="history-card">
              <h3>Health Record - {record.date}</h3>
              <p><strong>Blood Sugar:</strong> {record.sugar} mg/dL</p>
              <p><strong>Blood Pressure:</strong> {record.bp} mmHg</p>
              <p><strong>Thyroid Level:</strong> {record.thyroid} uIU/mL</p>
              <p><strong>Cholesterol:</strong> {record.cholesterol} mg/dL</p>
            </div>
          ))
        ) : (
          <p>No health records available. Please add a record.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default HealthHistory;