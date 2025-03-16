import React, { useState, useEffect } from 'react';
import './FormQuestions.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";
/**/
function FullDiskEncryptionPage() {
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

  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Cybersecurity/Full Disk Encryption');
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

    if (!buildingId) {
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/Full Disk Encryption');
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
            <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Full Disk Encryption Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Implementation and Coverage */}
          <h2>4.2.1.1.1.1 Implementation and Coverage:</h2>
          <div className="form-section">
            <label>Is full disk encryption enabled on all company-issued devices, including laptops and desktops, without exceptions?</label>
            <div>
              <input type="radio" name="fullDiskEncryptionEnabled" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="fullDiskEncryptionEnabled" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="fullDiskEncryptionEnabledComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How is encryption applied to ensure that it covers all types of data, including the operating system, applications, and user files?</label>
            <textarea name="encryptionCoverage" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>What procedures are in place to ensure that encryption is automatically enabled on newly issued or re-imaged devices?</label>
            <textarea name="autoEnableEncryption" onChange={handleChange}></textarea>
          </div>

          {/* Encryption Standards and Configuration */}
          <h2>4.2.1.1.1.2 Encryption Standards and Configuration:</h2>
          <div className="form-section">
            <label>What encryption standards are used (e.g., AES-256), and do they comply with industry best practices and regulatory requirements?</label>
            <textarea name="encryptionStandards" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are the encryption settings configured to balance security and performance, and are there specific configurations for different types of data or device usage?</label>
            <textarea name="encryptionSettings" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How are encryption keys managed, and what methods are used to ensure they are securely stored and protected?</label>
            <textarea name="keyManagement" onChange={handleChange}></textarea>
          </div>

          {/* User Access and Management */}
          <h2>4.2.1.1.1.3 User Access and Management:</h2>
          <div className="form-section">
            <label>How is user access to encrypted devices managed, and what authentication methods are required to unlock the devices (e.g., passwords, biometrics)?</label>
            <textarea name="userAccessManagement" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are users trained on the importance of full disk encryption and how to handle their credentials securely?</label>
            <div>
              <input type="radio" name="userTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="userTraining" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="userTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>What procedures are in place for managing encryption in cases where users forget their passwords or lose access to their accounts?</label>
            <textarea name="forgottenPasswordProcedures" onChange={handleChange}></textarea>
          </div>

          {/* Compliance and Monitoring */}
          <h2>4.2.1.1.1.4 Compliance and Monitoring:</h2>
          <div className="form-section">
            <label>How is compliance with full disk encryption policies monitored and enforced across the organization?</label>
            <textarea name="encryptionComplianceMonitoring" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there regular audits or checks to ensure that encryption is functioning correctly on all devices and that no devices are left unencrypted?</label>
            <div>
              <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="regularAudits" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>What steps are taken if a device is found to be non-compliant or if encryption fails to activate properly?</label>
            <textarea name="nonComplianceActions" onChange={handleChange}></textarea>
          </div>

          {/* Recovery and Contingency Planning */}
          <h2>4.2.1.1.1.5 Recovery and Contingency Planning:</h2>
          <div className="form-section">
            <label>What recovery procedures are in place for encrypted devices in the event of hardware failure, loss, or theft?</label>
            <textarea name="recoveryProcedures" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How does the organization handle data recovery in cases where encryption might prevent access to critical information?</label>
            <textarea name="dataRecovery" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there contingency plans to ensure that data on decommissioned or repurposed devices is securely wiped and no longer accessible?</label>
            <textarea name="contingencyPlans" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FullDiskEncryptionPage;
