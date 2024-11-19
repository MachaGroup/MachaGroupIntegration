import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function MultiFactorAuthenticationPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    // Navigate to the appropriate page based on the section
    switch (section) {
      case 'Two-Factor Authentication':
        navigate('/TwoFactorAuthentication');
        break;
      case 'Biometric Authentication':
        navigate('/BiometricAuthentication');
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use navigate(-1) for navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Multi-Factor Authentication Section */}
      <main className="form-container">
        <h2>Multi-Factor Authentication</h2>
        <form>
          {/* Multi-Factor Authentication Buttons */}
          {['Two-Factor Authentication', 'Biometric Authentication'].map((section, index) => (
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

export default MultiFactorAuthenticationPage;
