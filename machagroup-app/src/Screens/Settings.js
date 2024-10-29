import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Settings.css';  // Ensure this links to your CSS file
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function Settings() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [profilePic, setProfilePic] = useState(null); // Start with no picture, null by default

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  // Handle logout navigation
  const handleLogout = () => {
    navigate('/login');  // Navigate to the login page after logging out
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Set the preview to the uploaded image
      };
      reader.readAsDataURL(file); // Convert file to a data URL for preview
    }
  };

  return (
    <div className="settings-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1 className="title">The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Settings Section */}
      <main className="settings-container">
        <h2>Settings</h2>

        {/* Profile Picture */}
        <div className="profile-pic-container">
          <img
            src={profilePic || 'https://via.placeholder.com/100'} // Use a placeholder when no profilePic is available
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {/* Settings Options */}
        <div className="settings-options">
          <button className="settings-button">Edit Profile</button>
          <button className="settings-button">Notifications</button>
          <button className="settings-button">Privacy & Security</button>
          <button className="settings-button">Contact Us</button>
        </div>

        {/* Log out Link */}
        <a href="#logout" className="logout-link" onClick={handleLogout}>Log out</a>
      </main>
    </div>
  );
}

export default Settings;
