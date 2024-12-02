import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function EmailEncryptionPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    switch (section) {
      case 'Secure Email Gateways':
        navigate('/SecureEmailGateways');
        break;
      case 'End-to-End Encryption':
        navigate('/EndToEndEncryption');
        break;
      default:
        console.log('Unknown section:', section);
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Email Encryption Section */}
      <main className="form-container">
        <h2>Email Encryption</h2>
        <form>
          {/* Email Encryption Buttons */}
          {['Secure Email Gateways', 'End-to-End Encryption'].map((section, index) => (
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

export default EmailEncryptionPage;
