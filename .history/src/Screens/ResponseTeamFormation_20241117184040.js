import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function ResponseTeamFormationPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add routing logic based on the button label
    switch (section) {
      case 'Incident Response Team Roles and Responsibilities':
        navigate('/IncidentResponseTeamRolesAndResponsibilities');
        break;
      case 'Communication Channels and Protocols':
        navigate('/CommunicationChannelsAndProtocols');
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

      {/* Response Team Foundation Section */}
      <main className="form-container">
        <h2>Response Team Foundation</h2>
        <form>
          {/* Response Team Foundation Buttons */}
          {['Incident Response Team Roles and Responsibilities', 'Communication Channels and Protocols'].map((section, index) => (
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

export default ResponseTeamFormationPage;
