import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function PhysicalSecurityMeasuresPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
        case 'Access Control Systems':
            navigate('/access-control-systems2');
            break;
        case 'Surveillance Systems':
            navigate('/surveillance-systems2');
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

      {/* Physical Security Measures */}
      <main className="form-container">
        <h2>Physical Security Measures</h2>
        <form>
          {/* Physical Security Measures Buttons */}
          {['Access Control Systems', 'Surveillance Systems'].map((section, index) => (
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

export default PhysicalSecurityMeasuresPage;