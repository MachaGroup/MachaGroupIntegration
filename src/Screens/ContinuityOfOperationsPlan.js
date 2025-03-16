import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function ContinuityOfOperationsPlanPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
        case 'Critical Function Identification':
            navigate('/critical-function-identification');
            break;
        case 'Backup Systems and Redundancies':
            navigate('/backup-systems-and-redundancies');
            break;
        case 'Safety and Security Training':
            navigate('/SafetyAndSecurityTraining');
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

      {/* Continuity of Operations Plan (COOP) */}
      <main className="form-container">
        <h2>Continuity of Operations Plan (COOP)</h2>
        <form>
          {/* Continuity of Operations Plan (COOP) Buttons */}
          {['Critical Function Identification', 'Backup Systems and Redundancies', 'Safety and Security Training'].map((section, index) => (
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

export default ContinuityOfOperationsPlanPage;