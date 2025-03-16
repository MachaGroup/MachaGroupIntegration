import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function AccessControlSystems2Page() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
        case 'Keycard Access Systems':
            navigate('/KeycardAccessSystems');
            break;
        case 'Biometric Access Control Systems':
            navigate('/BiometricAccessControlSystems');
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

      {/* Access Control Systems */}
      <main className="form-container">
        <h2>Access Control Systems</h2>
        <form>
          {/* Access Control Systems Buttons */}
          {['Keycard Access Systems', 'Biometric Access Control Systems'].map((section, index) => (
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
/**/
export default AccessControlSystems2Page;