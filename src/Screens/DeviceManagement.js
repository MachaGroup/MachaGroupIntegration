import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png'; // Adjust the path relative to the current file location
/**/
function DeviceManagementPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Navigate to corresponding pages based on the section
    switch (section) {
      case 'Patch Management':
        navigate('/PatchManagement'); // Adjust route as per your routing setup
        break;
      case 'Device Encryption':
        navigate('/DeviceEncryption'); // Adjust route as per your routing setup
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Navigate back */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Device Management Section */}
      <main className="form-container">
        <h2>Device Management</h2>
        <form>
          {/* Device Management Buttons */}
          {['Patch Management', 'Device Encryption'].map((section, index) => (
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

export default DeviceManagementPage;
