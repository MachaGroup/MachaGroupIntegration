import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function ContinuousImprovementPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
      case 'Risk Assessment and Mitigation':
        navigate('/risk-assessment-and-mitigation');
        break;
      case 'Emergency Preparedness Planning**':
        navigate('/emergency-preparedness-planning');
        break;
      case 'Security Infrastructure Enhancement**':
        navigate('/security-infrastructure-enhancement');
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

      {/* Continuous Improvement - Safety and Security Section */}
      <main className="form-container">
        <h2>Continuous Improvement - Safety and Security</h2>
        <form>
          {/* Continuous Improvement - Safety and Security Buttons */}
          {['Risk Assessment and Mitigation', 'Emergency Preparedness Planning**', 'Security Infrastructure Enhancement**'].map((section, index) => (
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

export default ContinuousImprovementPage;