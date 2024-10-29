import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function UserAwarenessAndTrainingPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
        case 'Phishing Awareness':
            navigate('/phishing-awareness');
            break;
        case 'Password Management':
            navigate('/password-management');
            break;
        case 'Incident Identification':
            navigate('/incident-identification');
            break;
        case 'Incident Response Planning':
            navigate('/incident-response-planning');
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

      {/* User Awareness and Training** Section */}
      <main className="form-container">
        <h2>User Awareness and Training**</h2>
        <form>
          {/* User Awareness and Training** Buttons */}
          {['Phishing Awareness', 'Password Management', 'Incident Identification', 'Incident Response Planning'].map((section, index) => (
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

export default UserAwarenessAndTrainingPage;