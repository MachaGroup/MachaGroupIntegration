import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EndToEndEncryptionPage() {
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Cybersecurity/End To End Encryption');
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
        <h1>End-to-End Encryption Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.2.1.2.2.1 Implementation and Usage:</h2>
          <div className="form-section">
            <label>How is end-to-end encryption implemented in your communication and data storage systems, and what specific protocols or standards (e.g., PGP, S/MIME) are used?</label>
            <textarea name="implementationProtocols" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are all communication channels (e.g., emails, messaging apps) and data exchanges that involve sensitive information covered by end-to-end encryption?</label>
            <div>
              <input type="radio" name="allChannelsEncrypted" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="allChannelsEncrypted" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>What procedures are in place for ensuring that end-to-end encryption is consistently applied across all relevant systems and applications?</label>
            <textarea name="consistentEncryptionProcedures" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.2 Encryption Standards and Configuration:</h2>
          <div className="form-section">
            <label>What encryption algorithms and key lengths are used in the end-to-end encryption process (e.g., RSA, AES), and do they meet current security standards and best practices?</label>
            <textarea name="encryptionAlgorithms" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are encryption keys generated, managed, and exchanged, and are they handled securely to prevent unauthorized access or misuse?</label>
            <textarea name="keyManagement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific configurations or settings recommended for different types of data or communication to ensure optimal security?</label>
            <textarea name="specificConfigurations" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.3 Access Control and Authentication:</h2>
          <div className="form-section">
            <label>How is access control managed for encrypted communications and data, and what authentication mechanisms are used to verify the identity of participants in encrypted exchanges?</label>
            <textarea name="accessControlManagement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there procedures in place for securely managing and distributing encryption keys to authorized users?</label>
            <div>
              <input type="radio" name="secureKeyManagement" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="secureKeyManagement" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How is user access to encrypted data monitored and controlled to prevent unauthorized access?</label>
            <textarea name="userAccessMonitoring" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.4 Compliance and Auditing:</h2>
          <div className="form-section">
            <label>How is compliance with end-to-end encryption policies monitored and enforced, and are there regular audits to ensure adherence to encryption standards?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there documented processes for addressing potential vulnerabilities or breaches related to encryption, and how are these issues reported and resolved?</label>
            <textarea name="vulnerabilityHandling" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What mechanisms are in place to verify that encryption practices align with relevant legal and regulatory requirements?</label>
            <textarea name="regulatoryCompliance" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.5 Training and Awareness:</h2>
          <div className="form-section">
            <label>Are employees and users trained on the importance of end-to-end encryption and how to properly use encryption tools and protocols?</label>
            <div>
              <input type="radio" name="employeeTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>What resources or support are available to help users understand and implement end-to-end encryption effectively?</label>
            <textarea name="resourcesSupport" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is ongoing training and awareness maintained to keep up with evolving encryption technologies and best practices?</label>
            <textarea name="ongoingTraining" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.6 Data Recovery and Management:</h2>
          <div className="form-section">
            <label>What procedures are in place for securely recovering encrypted data in the event of loss or corruption, and how are decryption keys managed during recovery?</label>
            <textarea name="dataRecoveryProcedures" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the secure disposal of old or unused encryption keys handled to prevent potential security risks?</label>
            <textarea name="keyDisposal" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there contingency plans for decrypting data when necessary, such as during investigations or compliance audits, and how is data integrity maintained during these processes?</label>
            <textarea name="contingencyPlans" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.1.2.2.7 Integration and Compatibility:</h2>
          <div className="form-section">
            <label>How does end-to-end encryption integrate with existing systems and applications, and are there any compatibility issues that need to be addressed?</label>
            <textarea name="integrationCompatibility" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What steps are taken to ensure that encryption does not negatively impact system performance or user experience?</label>
            <textarea name="performanceImpact" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there procedures for testing and validating encryption solutions to ensure they work as intended in your specific environment?</label>
            <textarea name="testingValidation" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default EndToEndEncryptionPage;
