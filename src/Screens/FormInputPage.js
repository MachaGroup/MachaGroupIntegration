import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { useBuilding } from '../Context/BuildingContext'; // Import the custom hook for BuildingContext
import './FormInputPage.css'; // CSS file for styling
import Navbar from "./Navbar"; // Import the Navbar
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function FormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const { buildingId } = useBuilding(); // Access the buildingId from context

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted for Building ID:', buildingId);
    // Add logic for handling form submission associated with the current buildingId
  };

  const handleButtonClick = (section) => {
    if (!buildingId) {
      alert('No building selected. Please start from the Building Info page.');
      navigate('/BuildingandAddress'); // Redirect if no buildingId is set
      return;
    }

    // Navigate to the selected section while maintaining building context
    switch (section) {
      case 'Physical Security':
        navigate('/Physical', { state: { buildingId } });
        break;
      case 'Emergency Preparedness':
        navigate('/emergency-preparedness', { state: { buildingId } });
        break;
      case 'Personnel Training and Awareness':
        navigate('/personnel-training', { state: { buildingId } });
        break;
      case 'Cybersecurity':
        navigate('/cybersecurity', { state: { buildingId } });
        break;
      case 'Policy and Compliance':
        navigate('/policy-compliance', { state: { buildingId } });
        break;
      case 'Community Partnership':
        navigate('/community-partnership', { state: { buildingId } });
        break;
      case 'Continuous Improvement - Safety and Security':
        navigate('/continuous-improvement', { state: { buildingId } });
        break;
      default:
        console.log('Unknown section');
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Form Section */}
      <main className="form-container">
        <h2>Create a Form</h2>
        <p>Building ID: {buildingId}</p> {/* Display the current building ID */}

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
