import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function FamilyEngagementEventsPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
        case 'Back-to-School Nights':
            navigate('/back-to-school-nights');
            break;
        case 'Parent Workshops on Student Safety':
            navigate('/parent-workshops-on-student-safety');
            break;
        case 'Parent-Teacher Conferences':
            navigate('/parent-teacher-conferences');
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

      {/* Family Engagement Events Section */}
      <main className="form-container">
        <h2>Family Engagement Events</h2>
        <form>
          {/* Family Engagement Events Buttons */}
          {['Back-to-School Nights', 'Parent Workshops on Student Safety', 'Parent-Teacher Conferences'].map((section, index) => (
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

export default FamilyEngagementEventsPage;