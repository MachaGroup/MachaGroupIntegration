import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function NaturalDisasterDrillsPage() {
  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>←</button> {/* Use window.history.back for navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* NaturalDisasterDrills Section */}
      <main className="form-container">
        <h2>Natural Disaster Drills</h2>
        <form>
          {/* Natural Disaster Drills Buttons */}
          {['Tornado Drills', 'Earthquake Drills', 'Fire Drill'].map((section, index) => (
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

export default NaturalDisasterDrillsPage;