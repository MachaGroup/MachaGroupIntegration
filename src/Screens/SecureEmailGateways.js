import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SecureEmailGatewaysPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

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

  // Function to handle back button
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Cybersecurity/Secure Email Gateways');
        await addDoc(formsRef, {
          building: buildingRef,
          formData: formData,
        });
        console.log('Form Data submitted successfully on back!');
        alert('Form data saved before navigating back!');
      } catch (error) {
        console.error('Error saving form data:', error);
        alert('Failed to save form data before navigating back. Some data may be lost.');
      }
    }
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Cybersecurity/Secure Email Gateways');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
      alert('Form Submitted successfully!');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Secure Email Gateways Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Implementation and Coverage */}
          <h2>4.2.1.2.1.1 Implementation and Coverage:</h2>

          <div className="form-section">
            <label>How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?</label>
            <textarea name="fileEncryptionImplementation" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?</label>
            <div>
              <input type="radio" name="encryptionConsistency" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="encryptionConsistency" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="encryptionConsistencyComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What tools or software are used for file-level encryption, and how are they integrated into existing workflows?</label>
            <textarea name="toolsForEncryption" onChange={handleChange}></textarea>
          </div>

          {/* Encryption Standards and Configuration */}
          <h2>4.2.1.2.1.2 Encryption Standards and Configuration:</h2>

          <div className="form-section">
            <label>What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?</label>
            <textarea name="encryptionStandards" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?</label>
            <textarea name="encryptionConfiguration" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="keyManagementSecure" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="keyManagementSecure" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="keyManagementSecureComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Access Controls and Permissions */}
          <h2>4.2.1.2.1.3 Access Controls and Permissions:</h2>

          <div className="form-section">
            <label>How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?</label>
            <textarea name="accessControls" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?</label>
            <div>
              <input type="radio" name="permissionsReviewed" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="permissionsReviewed" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="permissionsReviewedComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?</label>
            <textarea name="sharedEnvironmentControl" onChange={handleChange}></textarea>
          </div>

          {/* Compliance and Monitoring */}
          <h2>4.2.1.2.1.4 Compliance and Monitoring:</h2>

          <div className="form-section">
            <label>How is compliance with file-level encryption policies monitored and enforced within the organization?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?</label>
            <div>
              <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="regularAudits" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="regularAuditsComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?</label>
            <textarea name="detectionMechanisms" onChange={handleChange}></textarea>
          </div>

          {/* Recovery and Management */}
          <h2>4.2.1.2.1.5 Recovery and Management:</h2>

          <div className="form-section">
            <label>What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?</label>
            <textarea name="recoveryProcedures" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?</label>
            <textarea name="keyPasswordManagement" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?</label>
            <textarea name="contingencyPlans" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecureEmailGatewaysPage;
