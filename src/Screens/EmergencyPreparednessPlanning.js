import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './PhysicalSecurity.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function EmergencyPreparednessPlanningPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    // Navigate to specific routes based on section
    switch (section) {
        case 'Emergency Response Plan Development':
            navigate('/emergency-response-plan-development');
            break;
        case 'Crisis Management Procedures':
            navigate('/crisis-management-procedures');
            break;
        case 'Staff Training Programs':
            navigate('/staff-training-programs');
            break;
        case 'Student Safety Education':
            navigate('/student-safety-education');
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

      {/* Emergency Preparedness Planning** Section */}
      <main className="form-container">
        <h2>Emergency Preparedness Planning**</h2>
        <form>
          {/* Emergency Preparedness Planning** Buttons */}
          {['Emergency Response Plan Development', 'Crisis Management Procedures', 'Staff Training Programs', 'Student Safety Education'].map((section, index) => (
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

export default EmergencyPreparednessPlanningPage;