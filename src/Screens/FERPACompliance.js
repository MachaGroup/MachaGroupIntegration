import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom';

function FERPACompliancePage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    switch (section) {
      case 'Student Privacy Rights':
        navigate('/StudentPrivacyRights');
        break;
      case 'Data Security Requirements':
        navigate('/DataSecurityRequirements')
        break;
      case 'Student Data Privacy Policies':
        navigate('/StudentDataPrivacyPolicies');
        break;
      case 'Data Breach Notification Procedures':
        navigate('/DataBreachNotificationProcedures');
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

      {/* FERPA Compliance Section */}
      <main className="form-container">
        <h2>FERPA Compliance</h2>
        <form>
          {/* FERPA Compliance Buttons */}
          {['Student Privacy Rights', 'Data Security Requirements', 'Student Data Privacy Policies', 'Data Breach Notification Procedures'].map((section, index) => (
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

export default FERPACompliancePage;