import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function BackupSolutionsPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Navigate based on the section clicked
    switch (section) {
      case 'Regular Backup Schedules':
        navigate('/RegularBackupSchedules'); // Replace with the correct path
        break;
      case 'OffSite Backup Storage':
        navigate('/OffSiteBackupStorage'); // Replace with the correct path
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

      {/* Backup Solutions Section */}
      <main className="form-container">
        <h2>Backup Solutions</h2>
        <form>
          {/* Backup Solutions Buttons */}
          {['Regular Backup Schedules', 'OffSite Backup Storage'].map((section, index) => (
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

export default BackupSolutionsPage;
