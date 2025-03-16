import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import Navbar from "./Navbar"; // Import the Navbar
/**/
function EmergencyPreparednessPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
        case 'Emergency Response':
            navigate('/emergency-response');
            break;
        case 'Emergency Response Plans':
            navigate('/emergency-response-plan');
            break;
        case 'Drills and Training**':
            navigate('/drills-and-training');
            break;
        case 'Communication Systems':
            navigate('/communication-systems');
            break;
        default:
            console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={() => window.history.back()}>←</button> {/* Use window.history.back for navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Emergency Preparedness Section */}
      <main className="form-container">
        <h2>Emergency Preparedness</h2>
        <form>
          {/* Emergency Preparedness Buttons */}
          {['Emergency Response', 'Emergency Response Plans', 'Drills and Training**', 'Communication Systems'].map((section, index) => (
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

export default EmergencyPreparednessPage;