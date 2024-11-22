import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function FileLevelEncryptionPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/File Level Encryption');
      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });

      console.log('Form data submitted successfully!');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>File-Level Encryption Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.2.1.1.2 File-Level Encryption (e.g., encrypted files/folders)</h2>

          {/* Implementation and Coverage */}
          <h3>4.2.1.1.2.1 Implementation and Coverage:</h3>
          <div className="form-section">
            <label>4.2.1.1.2.1.1. How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?</label>
            <textarea name="fileEncryptionImplementation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.1.2. Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?</label>
            <div>
              <input type="radio" id="consistencyYes" name="encryptionConsistency" value="Yes" onChange={handleChange} />
              <label htmlFor="consistencyYes">Yes</label>
              <input type="radio" id="consistencyNo" name="encryptionConsistency" value="No" onChange={handleChange} />
              <label htmlFor="consistencyNo">No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.1.3. What tools or software are used for file-level encryption, and how are they integrated into existing workflows?</label>
            <textarea name="encryptionTools" onChange={handleChange}></textarea>
          </div>

          {/* Encryption Standards and Configuration */}
          <h3>4.2.1.1.2.2 Encryption Standards and Configuration:</h3>
          <div className="form-section">
            <label>4.2.1.1.2.2.1. What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?</label>
            <textarea name="encryptionStandards" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.2.2. How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?</label>
            <textarea name="encryptionSettings" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.2.3. Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?</label>
            <textarea name="keyManagement" onChange={handleChange}></textarea>
          </div>

          {/* Access Controls and Permissions */}
          <h3>4.2.1.1.2.3 Access Controls and Permissions:</h3>
          <div className="form-section">
            <label>4.2.1.1.2.3.1. How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?</label>
            <textarea name="accessControls" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.3.2. Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?</label>
            <div>
              <input type="radio" id="permissionsYes" name="permissionsReview" value="Yes" onChange={handleChange} />
              <label htmlFor="permissionsYes">Yes</label>
              <input type="radio" id="permissionsNo" name="permissionsReview" value="No" onChange={handleChange} />
              <label htmlFor="permissionsNo">No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.3.3. How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?</label>
            <textarea name="sharedAccessControl" onChange={handleChange}></textarea>
          </div>

          {/* Compliance and Monitoring */}
          <h3>4.2.1.1.2.4 Compliance and Monitoring:</h3>
          <div className="form-section">
            <label>4.2.1.1.2.4.1. How is compliance with file-level encryption policies monitored and enforced within the organization?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.4.2. Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?</label>
            <div>
              <input type="radio" id="auditsYes" name="auditsRegular" value="Yes" onChange={handleChange} />
              <label htmlFor="auditsYes">Yes</label>
              <input type="radio" id="auditsNo" name="auditsRegular" value="No" onChange={handleChange} />
              <label htmlFor="auditsNo">No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.4.3. What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?</label>
            <textarea name="detectionMechanisms" onChange={handleChange}></textarea>
          </div>

          {/* Recovery and Management */}
          <h3>4.2.1.1.2.5 Recovery and Management:</h3>
          <div className="form-section">
            <label>4.2.1.1.2.5.1. What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?</label>
            <textarea name="recoveryProcedures" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.5.2. How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?</label>
            <textarea name="keyManagementStrategies" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.1.1.2.5.3. Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?</label>
            <textarea name="contingencyPlans" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FileLevelEncryptionPage;
