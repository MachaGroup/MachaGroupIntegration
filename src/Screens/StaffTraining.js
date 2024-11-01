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
          navigate('/emergency-communication');
          break;
        case 'Security Policies and Procedures':
          navigate('/security-policies-and-procedures');
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
          {['First Aid/CPR Training', 'Emergency Response Training', 'Emergency Communication', 'Security Policies and Procedures', 'Incident Response Training'].map((section, index) => (
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