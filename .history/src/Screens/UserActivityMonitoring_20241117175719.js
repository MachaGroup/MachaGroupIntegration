import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed and used for navigation

function UserActivityMonitoringPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    
    // Example logic for navigation based on the button clicked
    switch (section) {
      case 'User Behavior Analytics (UBA)':
        navigate('/UserBehaviorAnalytics'); // Navigate to UBA page
        break;
      case 'Anomaly Detection':
        navigate('/AnomalyDetection'); // Navigate to Anomaly Detection page
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

      {/* User Activity Monitoring Section */}
      <main className="form-container">
        <h2>User Activity Monitoring</h2>
        <form>
          {/* User Activity Monitoring Buttons */}
          {['User Behavior Analytics (UBA)', 'Anomaly Detection'].map((section, index) => (
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

export default UserActivityMonitoringPage;
