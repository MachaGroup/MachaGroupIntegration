import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './FormInputPage.css'; // CSS file for styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function FormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    // Add logic for handling form submission
  };

  // Modify handleButtonClick to navigate to different routes
  const handleButtonClick = (section) => {
    switch(section) {
      case 'Physical Security':
        navigate('/Physical');
        break;
      case 'Emergency Preparedness':
        navigate('/emergency-preparedness');
        break;
      case 'Personnel Training and Awareness':
        navigate('/personnel-training');
        break;
      case 'Cybersecurity':
        navigate('/cybersecurity');
        break;
      case 'Policy and Compliance':
        navigate('/policy-compliance');
        break;
      case 'Community Partnership':
        navigate('/community-partnership');
        break;
      case 'Continuous Improvement - Safety and Security':
        navigate('/continuous-improvement');
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Form Section */}
      <main className="form-container">
        <h2>Create a Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Buttons */}
          {[
            'Physical Security',
            'Emergency Preparedness',
            'Personnel Training and Awareness',
            'Cybersecurity',
            'Policy and Compliance',
            'Community Partnership',
            'Continuous Improvement - Safety and Security'
          ].map((section, index) => (
            <div key={index} className="form-section">
              <label>{section}</label>
              <button
                type="button"
                className="form-button"
                onClick={() => handleButtonClick(section)}
              >
                Enter Here
              </button>
            </div>
          ))}

          {/* Save and Submit Buttons */}
          <button type="button" className="save-button">Save</button>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FormPage;