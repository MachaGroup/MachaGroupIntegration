import React from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png'; // Adjust the path relative to the current file location

function ReportingProcedures2Page() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Navigate to specific pages based on the button clicked
    if (section === 'Incident Reporting') {
      navigate('/IncidentReporting'); // Replace with the actual path for Incident Reporting
    } else if (section === 'Contact Information') {
      navigate('/ContactInformation'); // Replace with the actual path for Contact Information
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use navigate for back button */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Reporting Procedures Section */}
      <main className="form-container">
        <h2>Reporting Procedures</h2>
        <form>
          {/* Reporting Procedures Buttons */}
          {['Incident Reporting', 'Contact Information'].map((section, index) => (
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

export default ReportingProcedures2Page;
