import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function CommunityEngagementSurveysPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
        case 'Feedback Collection from Community':
            navigate('/feedback-collection-from-community');
            break;
        case 'Assessing Community Needs and Priorities':
            navigate('/assessing-community-needs-and-priorities');
            break;
        case 'Planning Community Outreach Strategies':
            navigate('/planning-community-outreach-strategies');
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

      {/* Community Engagement Surveys */}
      <main className="form-container">
        <h2>Community Engagement Surveys</h2>
        <form>
          {/* Community Engagement Surveys Buttons */}
          {['Feedback Collection from Community', 'Assessing Community Needs and Priorities', 'Planning Community Outreach Strategies'].map((section, index) => (
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

export default CommunityEngagementSurveysPage;