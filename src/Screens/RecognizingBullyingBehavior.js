import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function RecognizingBullyingBehaviorPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
      case 'Verbal Bullying':
        navigate('/verbal-bullying');
        break;
      case 'Physical Bullying':
        navigate('/physical-bullying');
        break;
      case 'Cyber Bullying':
        navigate('/cyber-bullying');
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

      {/* Recognizing Bullying Behavior Section */}
      <main className="form-container">
        <h2>Recognizing Bullying Behavior</h2>
        <form>
          {/* Recognizing Bullying Behavior Buttons */}
          {['Verbal Bullying', 'Physical Bullying', 'Cyber Bullying'].map((section, index) => (
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

export default RecognizingBullyingBehaviorPage;