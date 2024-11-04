import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './SurveillanceSystems.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function MainEntrancePage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
      case 'Security Gates':
        navigate('/SecurityGates');
        break;
      case 'Turnstiles':
        navigate('/Turnstiles');
        break;
      case 'Access Control Systems':
        navigate('/AccessControlSystems');
        break;
      case 'Security Guards':
        navigate('/SecurityG');
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

      {/* Physical Security Section */}
      <main className="form-container">
        <h2>Main Entrance</h2>
        <form>
          {/* Physical Security Buttons */}
          {['Security Gates','Turnstiles', 'Access Control Systems', 'Security Guards'].map((section, index) => (
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

export default MainEntrancePage;

