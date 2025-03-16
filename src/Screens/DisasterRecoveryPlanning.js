import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png'; // Adjust the path relative to the current file location
/**/
function DisasterRecoveryPlanningPage() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    // Navigate to corresponding section based on button clicked
    switch (section) {
      case 'Backup Testing':
        navigate('/BackupTesting');
        break;
      case 'Continuity of Operations':
        navigate('/ContinuityOfOperations');
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use useNavigate for navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Disaster Recovery Planning Section */}
      <main className="form-container">
        <h2>Disaster Recovery Planning</h2>
        <form>
          {/* Disaster Recovery Planning Buttons */}
          {['Backup Testing', 'Continuity of Operations'].map((section, index) => (
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

export default DisasterRecoveryPlanningPage;
