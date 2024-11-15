import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function DrillExecutionPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
      case 'Natural Disaster Drills':
          navigate('/natural-disaster-drills');
          break;
      case 'Lockdown Drills':
          navigate('/lockdown-drills');
          break;
      case 'Staff Roles and Responsibilities':
          navigate('/staff-roles-and-responsibilities');
          break;
      case 'Debriefing and Feedback':
          navigate('/debriefing-and-feedback');
          break;
      case 'Evacuation Routes Review':
          navigate('/evacuation-routes-review');
          break;
      case 'Drill Frequency':
            navigate('/drill-frequency');
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

      {/* Drill Execution Section */}
      <main className="form-container">
        <h2>Drill Execution</h2>
        <form>
          {/* Drill Execution Buttons */}
          {['Natural Disaster Drills', 'Lockdown Drills', 'Staff Roles and Responsibilities', 'Debriefing and Feedback', 'Evacuation Routes Review', 'Drill Frequency'].map((section, index) => (
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

export default DrillExecutionPage;