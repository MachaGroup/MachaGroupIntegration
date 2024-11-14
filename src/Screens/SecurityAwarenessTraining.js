import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function SecurityAwarenessTrainingPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
        case 'Threat Recognition':
            navigate('/threat-recognition');
            break;
        case 'Cybersecurity Training':
            navigate('/cybersecurity-training');
            break;
        case 'Security Policies and Procedures':
            navigate('/security-policies-and-procedures')
            break;
        case 'Security Policies and Procedures':
            navigate('/security-policies-and-procedures')
            break;
        default:
          console.log('Unknown section');
  }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>←</button> {/* Use window.history.back for navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Security Awareness Training Section */}
      <main className="form-container">
        <h2>Security Awareness Training</h2>
        <form>
          {/* Security Awareness Training Buttons */}
          {['Threat Recognition', 'Cybersecurity Training', 'Security Policies and Procedures'].map((section, index) => (
          {['Threat Recognition', 'Cybersecurity Training', 'Security Policies and Procedures'].map((section, index) => (
            <div key={index} className="form-section">
              <label>{section}</label>
              <button type="button" className="form-button" onClick={() => handleButtonClick(section)}>
                Enter Here
              </button>
            </div>
          ))}
        </form>
      </main>
    </div>
  );
}

export default SecurityAwarenessTrainingPage;