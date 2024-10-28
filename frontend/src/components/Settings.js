// Settings.js

import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    push: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [name]: checked,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated successfully');
  };

  return (
    <div className="settings-container">
      <section className="section">
        <h3 style={{ color: 'white' }}><center>Profile Information</center></h3>
        <form onSubmit={handleProfileSubmit}>
          <label>
            User Name:
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </section>

      <section className="section">
        <h3 style={{ color: 'white' }}><center>Change Password</center></h3>
        <form onSubmit={handlePasswordSubmit}>
          <label>
            New Password:
            <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} required />
          </label>
          <label>
            Confirm New Password:
            <input type="password" name="confirmPassword" value={password.confirmPassword} onChange={handlePasswordChange} required />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </section>
    </div>
  );
};

export default Settings;