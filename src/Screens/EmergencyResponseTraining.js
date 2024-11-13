import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function EmergencyResponseTrainingPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add logic for handling button click, e.g., open a modal or navigate

    switch (section) {
      case 'Scenerio-based Training':
        navigate('/scenerio-based-training');
        break;
      case 'Response Protocols':
        navigate('/response-protocols');
        break;
      case 'Post-Incident Support':
        navigate('/post-incident-support');
        break;
      case 'First Aid/CPR Training':
        navigate('/first-aid-CPR-training2');
        break;
      case 'Basic First Aid Techniques':
        navigate('/basic-first-aid-techniques');
        break;
      case 'CPR Certification':
        navigate('/CPR-certification');
        break;
      case 'AED Training':
        navigate('/AED-training');
        break;
      case 'Active Shooter Response':
        navigate('/active-shooter-response');
        break;
      case 'Response Protocols':
        navigate('/response-protocols2');
        break;
      case 'Evacuation Procedures':
        navigate('/evacuation-procedures2');
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

      {/* Emergency Response Training Section */}
      <main className="form-container">
        <h2>Emergency Response Training</h2>
        <form>
          {/* Emergency Response Training Buttons */}
          {['Scenerio-based Training', 'Response Protocols', 'Post-Incident Support', 'First Aid/CPR Training', 'Basic First Aid Techniques', 'CPR Certification', 'AED Training', 'Active Shooter Response', 'Response Protocols', 'Evacuation Procedures'].map((section, index) => (
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

export default EmergencyResponseTrainingPage;