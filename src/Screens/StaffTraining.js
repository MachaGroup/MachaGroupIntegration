import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function StaffTrainingPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
        case 'First Aid/CPR Training':
          navigate('/first-aid');
          break;
        case 'Emergency Response Training':
          navigate('/emergency-response-training');
          break;
        case 'Emergency Communication':
          navigate('/emergency-communication2');
          break;
        case 'Security Awareness Training':
          navigate('/security-awareness-training');
          break;
        case 'Incident Response Training':
          navigate('/incident-response-training');
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

      {/* Staff Training Section */}
      <main className="form-container">
        <h2>Staff Training</h2>
        <form>
          {/* Staff Training Buttons */}
          {['First Aid/CPR Training', 'Emergency Response Training', 'Emergency Communication', 'Security Awareness Training', 'Incident Response Training'].map((section, index) => (
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

export default StaffTrainingPage;