import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom';
/**/
function DataCollectionAndRetentionPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    switch (section) {
      case 'Data Minimization':
        navigate('/DataMinimization');
        break;
      case 'Data Retention Periods':
        navigate('/DataRetentionPeriods');
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

      {/* Data Collection and Retention Section */}
      <main className="form-container">
        <h2>Data Collection and Retention</h2>
        <form>
          {/* Data Colletion and Retention Buttons */}
          {['Data Minimization', 'Data Retention Periods'].map((section, index) => (
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

export default DataCollectionAndRetentionPage;