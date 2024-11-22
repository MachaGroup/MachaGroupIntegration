import React, { useState } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function OffSiteBackupStoragePage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding(); // Access buildingId from context
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

    if (!buildingId) {
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/Offsite Backup Storage');
      await addDoc(formsRef, {
        building: buildingRef,
        formData,
      });

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
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <h2>Offsite Backup Storage (e.g., cloud backups)</h2>
        <form onSubmit={handleSubmit}>

          <h3>4.2.2.1.2.1 Selection and Security of Offsite Locations:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.1.1. What criteria are used to select offsite backup storage locations, such as cloud providers or physical sites, to ensure data security and accessibility?</label>
            <textarea name="criteriaForSelection" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.1.2. How is the security of the offsite backup location maintained, including physical security measures and data encryption protocols?</label>
            <textarea name="securityOfLocation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.1.3. Are there regular audits or assessments of the offsite storage location to ensure compliance with security standards and policies?</label>
            <div>
              <label><input type="radio" name="auditsOfStorage" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="auditsOfStorage" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>

          <h3>4.2.2.1.2.2 Data Transfer and Encryption:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.2.1. What methods are used to securely transfer backup data to the offsite location, and are these methods protected against data interception or breaches?</label>
            <textarea name="dataTransferMethods" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.2.2. Is the data encrypted during transfer and storage, and what encryption standards are applied (e.g., AES-256)?</label>
            <div>
              <label><input type="radio" name="dataEncryption" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="dataEncryption" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.2.3. How are encryption keys managed, and who has access to these keys to ensure data can be securely accessed when needed?</label>
            <textarea name="keyManagement" onChange={handleChange}></textarea>
          </div>

          <h3>4.2.2.1.2.3 Accessibility and Recovery Time Objectives (RTOs):</h3>
          <div className="form-section">
            <label>4.2.2.1.2.3.1. How quickly can data be retrieved from the offsite backup location in the event of a disaster or data loss incident?</label>
            <textarea name="recoveryTime" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.3.2. Are there clear recovery time objectives (RTOs) established for accessing and restoring data from offsite backups?</label>
            <div>
              <label><input type="radio" name="recoveryObjectives" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="recoveryObjectives" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.3.3. What procedures are in place to ensure data integrity and completeness when backups are restored from offsite storage?</label>
            <textarea name="dataIntegrity" onChange={handleChange}></textarea>
          </div>

          <h3>4.2.2.1.2.4 Redundancy and Geographic Distribution:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.4.1. Is there redundancy in the offsite backup storage solutions, such as multiple cloud providers or geographically distributed storage sites, to mitigate risk?</label>
            <div>
              <label><input type="radio" name="redundancy" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="redundancy" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.4.2. How are backups distributed geographically to prevent data loss due to regional disasters or outages at a single location?</label>
            <textarea name="geographicDistribution" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.4.3. Are backup locations chosen to minimize latency and maximize data recovery speeds for the organization's primary operational regions?</label>
            <textarea name="latencyConsiderations" onChange={handleChange}></textarea>
          </div>

          <h3>4.2.2.1.2.5 Compliance and Data Sovereignty:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.5.1. How does the offsite backup storage solution comply with legal and regulatory requirements for data protection, privacy, and data sovereignty (e.g., GDPR, HIPAA)?</label>
            <textarea name="compliance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.5.2. Are there specific contractual agreements in place with the cloud provider or offsite storage facility regarding data protection, access controls, and compliance standards?</label>
            <div>
              <label><input type="radio" name="contractualAgreements" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="contractualAgreements" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.5.3. What measures are taken to ensure that data stored offsite does not violate any cross-border data transfer regulations or data residency requirements?</label>
            <textarea name="crossBorderCompliance" onChange={handleChange}></textarea>
          </div>

          <h3>4.2.2.1.2.6 Monitoring and Reporting:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.6.1. What monitoring tools or systems are in place to track the status and health of offsite backups to ensure they are successfully completed and stored?</label>
            <textarea name="monitoringTools" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.6.2. Are there automated alerts or notifications for issues related to offsite backup storage, such as failed backups or storage capacity limits?</label>
            <div>
              <label><input type="radio" name="alerts" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="alerts" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.6.3. How is backup performance reported, and what metrics are used to evaluate the effectiveness and reliability of offsite storage?</label>
            <textarea name="performanceMetrics" onChange={handleChange}></textarea>
          </div>

          <h3>4.2.2.1.2.7 Cost Management and Scalability:</h3>
          <div className="form-section">
            <label>4.2.2.1.2.7.1. How is the cost of offsite backup storage managed, and what pricing models are in place (e.g., pay-as-you-go, fixed rate)?</label>
            <textarea name="costManagement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.7.2. Are there scalability options to increase storage capacity as needed, and how does this impact the cost and management of offsite backups?</label>
            <div>
              <label><input type="radio" name="scalability" value="Yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="scalability" value="No" onChange={handleChange} /> No</label>
            </div>
          </div>
          <div className="form-section">
            <label>4.2.2.1.2.7.3. What measures are in place to regularly review and optimize the cost-effectiveness of offsite backup storage solutions?</label>
            <textarea name="costOptimization" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default OffSiteBackupStoragePage;
