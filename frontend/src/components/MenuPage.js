import React, { useState } from 'react';
import './MenuPage.css'; // Import CSS
import { Link } from 'react-router-dom';

function MenuPage() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleCameraClick = () => {
    document.getElementById('cameraInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
    }
  };

  return (
    <div className="container">
      <div className="menu-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={`menu ${menuVisible ? 'show' : ''}`}>
          <Link to="/about">About</Link>
          <Link to="/history">History</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/settings">Settings</Link>
          <Link to="#" onClick={handleCameraClick}>Scan & Upload</Link>
        </div>
        <div className="camera-icon" onClick={handleCameraClick}>
          📷
        </div>
      </div>
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="camera"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="content">
        <p><center>Welcome to Pill Perfect!!</center></p>
        <p><center>Your perfect pill partner...</center></p>
      </div>
    </div>
  );
}

export default MenuPage;
