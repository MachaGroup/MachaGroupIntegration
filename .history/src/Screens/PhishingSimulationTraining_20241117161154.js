import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from '../assets/MachaLogo.png'; // Adjust the path relative to the current file location

function PhishingSimulationTrainingPage() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Add navigation logic here
    switch (section) {
      case 'Simulated Phishing Campaigns':
        navigate('/SimulatedPhishingCampaigns');
        break;
      case 'Phishing Awareness Training':
        navigate('/PhishingAwarenessTraining');
        break;
      case 'Phishing Simulation Exercises':
        navigate('/PhishingSimulationExercises');
        break;
      case 'Educating Users on Phishing Red Flags':
        navigate('/EducatingUsersOnPhishingRedFlags');
        break;
      default:
        console.log('Section not found');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use navigate(-1) for back navigation */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Phishing Simulation Training Section */}
      <main className="form-container">
        <h2>Phishing Simulation Training</h2>
        <form>
          {/* Phishing Simulation Training Buttons */}
          {['Simulated Phishing Campaigns', 'Phishing Awareness Training', 'Phishing Simulation Exercises', 'Educating Users on Phishing Red Flags'].map((section, index) => (
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

export default PhishingSimulationTrainingPage;
