import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom';

function AccessibilityCompliancePage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    switch (section) {
      case 'ADA Compliance':
        navigate('/ADACompliance');
        break;
      case 'Web Content Accessibility Guidelines (WCAG)':
        navigate('/WebContentAccessibilityGuidelines');
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

      {/* Accessibility Compliance Section */}
      <main className="form-container">
        <h2>Accessibility Compliance</h2>
        <form>
          {/* Accessibility Compliance Buttons */}
          {['ADA Compliance', 'Web Content Accessibility Guidelines (WCAG)'].map((section, index) => (
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

export default AccessibilityCompliancePage;