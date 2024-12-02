import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './SurveillanceSystems.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import Navbar from "./Navbar"; // Import the Navbar

function SecondaryEntrancesPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
      case 'Card Readers':
        navigate('/CardReaders');
        break;
      case 'Biometric Scanners':
        navigate('/BiometricScanners');
        break;
      case 'Access Control Software':
        navigate('/AccessControlSoftware');
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

      {/* Physical Security Section */}
      <main className="form-container">
        <h2>Secondary Entrances</h2>
        <form>
          {/* Physical Security Buttons */}
          {['Card Readers', 'Biometric Scanners', 'Access Control Software'].map((section, index) => (
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

export default SecondaryEntrancesPage;

