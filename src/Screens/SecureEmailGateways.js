import React, { useState } from 'react';
import './FormQuestions.css'; // Adjust as necessary
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import logo from '../assets/MachaLogo.png'; // Adjust the path
import Navbar from "./Navbar";

function SecureEmailGatewaysPage() {
  const navigate = useNavigate();
  const db = getFirestore();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formsRef = collection(db, 'forms/Cybersecurity/SecureEmailGateways');
      await addDoc(formsRef, { formData });
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <header className="header">
            <Navbar />
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Secure Email Gateways Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.2.1.2.1 Secure Email Gateways (e.g., encrypting email in transit)</h2>

          {/* Implementation and Coverage */}
          <h3>4.2.1.2.1.1 Implementation and Coverage:</h3>

          <div className="form-section">
            <label>4.2.1.2.1.1.1. How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?</label>
            <textarea name="fileEncryptionImplementation" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.1.2. Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?</label>
            <div>
              <label>
                <input type="radio" name="encryptionConsistency" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="encryptionConsistency" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.1.3. What tools or software are used for file-level encryption, and how are they integrated into existing workflows?</label>
            <textarea name="toolsForEncryption" onChange={handleChange}></textarea>
          </div>

          {/* Encryption Standards and Configuration */}
          <h3>4.2.1.2.1.2 Encryption Standards and Configuration:</h3>

          <div className="form-section">
            <label>4.2.1.2.1.2.1. What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?</label>
            <textarea name="encryptionStandards" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.2.2. How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?</label>
            <textarea name="encryptionConfiguration" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.2.3. Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?</label>
            <div>
              <label>
                <input type="radio" name="keyManagementSecure" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="keyManagementSecure" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          {/* Access Controls and Permissions */}
          <h3>4.2.1.2.1.3 Access Controls and Permissions:</h3>

          <div className="form-section">
            <label>4.2.1.2.1.3.1. How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?</label>
            <textarea name="accessControls" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.3.2. Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?</label>
            <div>
              <label>
                <input type="radio" name="permissionsReviewed" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="permissionsReviewed" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.3.3. How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?</label>
            <textarea name="sharedEnvironmentControl" onChange={handleChange}></textarea>
          </div>

          {/* Compliance and Monitoring */}
          <h3>4.2.1.2.1.4 Compliance and Monitoring:</h3>

          <div className="form-section">
            <label>4.2.1.2.1.4.1. How is compliance with file-level encryption policies monitored and enforced within the organization?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.4.2. Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?</label>
            <div>
              <label>
                <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="regularAudits" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.4.3. What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?</label>
            <textarea name="detectionMechanisms" onChange={handleChange}></textarea>
          </div>

          {/* Recovery and Management */}
          <h3>4.2.1.2.1.5 Recovery and Management:</h3>

          <div className="form-section">
            <label>4.2.1.2.1.5.1. What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?</label>
            <textarea name="recoveryProcedures" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.5.2. How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?</label>
            <textarea name="keyPasswordManagement" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.2.1.2.1.5.3. Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?</label>
            <textarea name="contingencyPlans" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecureEmailGatewaysPage;
