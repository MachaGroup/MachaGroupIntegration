import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function FileEncryptionPage() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    console.log(`Button clicked for: ${section}`);
    // Navigate to the corresponding page based on the section
    switch (section) {
      case 'Full Disk Encryption':
        navigate('/FullDiskEncryption');
        break;
      case 'File-Level Encryption':
        navigate('/FileLevelEncryption');
        break;
      default:
        console.error('Unknown section:', section);
    }
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Navigate back using useNavigate */}
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* File Encryption Section */}
      <main className="form-container">
        <h2>File Encryption</h2>
        <form>
          {/* File Encryption Buttons */}
          {['Full Disk Encryption', 'File-Level Encryption'].map((section, index) => (
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

export default FileEncryptionPage;
