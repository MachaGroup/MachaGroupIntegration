import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { useNavigate } from 'react-router-dom';

function PasswordPoliciesPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Logic to navigate or open modal based on the section
    switch (section) {
      case 'Password Complexity Requirements':
        navigate('/password-complexity'); // Example navigation
        break;
      case 'Password Expiration Policies':
        navigate('/password-expiration'); // Example navigation
        break;
      default:
        console.warn('Unknown section:', section);
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

      {/* Password Policies Section */}
      <main className="form-container">
        <h2>Password Policies</h2>
        <form>
          {/* Password Policies Buttons */}
          {['Password Complexity Requirements', 'Password Expiration Policies'].map((section, index) => (
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

export default PasswordPoliciesPage;
