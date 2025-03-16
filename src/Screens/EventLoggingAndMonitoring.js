import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed and used for navigation
/**/
function EventLoggingAndMonitoringPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    // Example logic for navigation based on the button clicked
    switch (section) {
      case 'Security Information and Event Management (SIEM) Solutions':
        navigate('/SecurityInformationAndEventManagement'); // Navigate to SIEM Solutions page
        break;
      case 'Intrusion Detection Systems (IDS)':
        navigate('/IntrusionDetectionSystems2'); // Navigate to IDS Systems page
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use useNavigate for back navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Event Logging and Monitoring Section */}
      <main className="form-container">
        <h2>Event Logging and Monitoring</h2>
        <form>
          {/* Event Logging and Monitoring Buttons */}
          {['Security Information and Event Management (SIEM) Solutions', 'Intrusion Detection Systems (IDS)'].map((section, index) => (
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

export default EventLoggingAndMonitoringPage;
