import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './MainScreen.css';  // Assume the CSS is already updated
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function MainScreen() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const navigateTo = (path) => {
    navigate(path);  // Use navigate to navigate to the specified route
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing user session or tokens)
    navigate('/login');  // Redirect to the Login screen after logging out
  };

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div className="main-container">
      <header className="header">
      <button className="back-button" onClick={handleBack}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <div className="welcome-message">
        <h2>Welcome Back!</h2>
      </div>

      <div className="buttons-container">
        <button onClick={() => navigateTo('/form')}>Create a Form</button>
        <button onClick={() => navigateTo('/pricing')}>Pricing</button>
        <button onClick={() => navigateTo('/about')}>About Us</button>
        <button onClick={() => navigateTo('/faq')}>FAQ</button>
        <button onClick={() => navigateTo('/contactus')}>Contact Us</button>
        <button onClick={() => navigateTo('/settings')}>Settings</button>
      </div>

      <footer>
      <a href="#logout" onClick={handleLogout}>Log out</a>
      </footer>
    </div>
  );
}

export default MainScreen;