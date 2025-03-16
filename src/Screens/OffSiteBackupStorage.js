import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function OffSiteBackupStoragePage() {
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
        const formsRef = collection(db, 'forms/Cybersecurity/Off Site Backup Storage');
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
      const formsRef = collection(db, 'forms/Cybersecurity/Off Site Backup Storage');
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
        <h1>Offsite Backup Storage Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.2.2.1.2.1 Selection and Security of Offsite Locations:</h2>
          <div className="form-section">
            <label>What criteria are used to select offsite backup storage locations, such as cloud providers or physical sites, to ensure data security and accessibility?</label>
            <textarea name="criteriaForSelection" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the security of the offsite backup location maintained, including physical security measures and data encryption protocols?</label>
            <textarea name="securityOfLocation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there regular audits or assessments of the offsite storage location to ensure compliance with security standards and policies?</label>
            <div>
              <input type="radio" name="auditsOfStorage" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="auditsOfStorage" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="auditsOfStorageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <h2>4.2.2.1.2.2 Data Transfer and Encryption:</h2>
          <div className="form-section">
            <label>What methods are used to securely transfer backup data to the offsite location, and are these methods protected against data interception or breaches?</label>
            <textarea name="dataTransferMethods" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is the data encrypted during transfer and storage, and what encryption standards are applied (e.g., AES-256)?</label>
            <div>
              <input type="radio" name="dataEncryption" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="dataEncryption" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="dataEncryptionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are encryption keys managed, and who has access to these keys to ensure data can be securely accessed when needed?</label>
            <textarea name="keyManagement" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.2.3 Accessibility and Recovery Time Objectives (RTOs):</h2>
          <div className="form-section">
            <label>How quickly can data be retrieved from the offsite backup location in the event of a disaster or data loss incident?</label>
            <textarea name="recoveryTime" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there clear recovery time objectives (RTOs) established for accessing and restoring data from offsite backups?</label>
            <div>
              <input type="radio" name="recoveryObjectives" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="recoveryObjectives" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="recoveryObjectivesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>What procedures are in place to ensure data integrity and completeness when backups are restored from offsite storage?</label>
            <textarea name="dataIntegrity" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.2.4 Redundancy and Geographic Distribution:</h2>
          <div className="form-section">
            <label>Is there redundancy in the offsite backup storage solutions, such as multiple cloud providers or geographically distributed storage sites, to mitigate risk?</label>
            <div>
              <input type="radio" name="redundancy" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="redundancy" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="redundancyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are backups distributed geographically to prevent data loss due to regional disasters or outages at a single location?</label>
            <textarea name="geographicDistribution" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup locations chosen to minimize latency and maximize data recovery speeds for the organization's primary operational regions?</label>
            <textarea name="latencyConsiderations" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.2.5 Compliance and Data Sovereignty:</h2>
          <div className="form-section">
            <label>How does the offsite backup storage solution comply with legal and regulatory requirements for data protection, privacy, and data sovereignty (e.g., GDPR, HIPAA)?</label>
            <textarea name="compliance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific contractual agreements in place with the cloud provider or offsite storage facility regarding data protection, access controls, and compliance standards?</label>
            <div>
              <input type="radio" name="contractualAgreements" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="contractualAgreements" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="contractualAgreementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>What measures are taken to ensure that data stored offsite does not violate any cross-border data transfer regulations or data residency requirements?</label>
            <textarea name="crossBorderCompliance" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.2.6 Monitoring and Reporting:</h2>
          <div className="form-section">
            <label>What monitoring tools or systems are in place to track the status and health of offsite backups to ensure they are successfully completed and stored?</label>
            <textarea name="monitoringTools" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there automated alerts or notifications for issues related to offsite backup storage, such as failed backups or storage capacity limits?</label>
            <div>
              <input type="radio" name="alerts" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="alerts" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="alertsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is backup performance reported, and what metrics are used to evaluate the effectiveness and reliability of offsite storage?</label>
            <textarea name="performanceMetrics" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.2.7 Cost Management and Scalability:</h2>
          <div className="form-section">
            <label>How is the cost of offsite backup storage managed, and what pricing models are in place (e.g., pay-as-you-go, fixed rate)?</label>
            <textarea name="costManagement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there scalability options to increase storage capacity as needed, and how does this impact the cost and management of offsite backups?</label>
            <div>
              <input type="radio" name="scalability" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="scalability" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="scalabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>What measures are in place to regularly review and optimize the cost-effectiveness of offsite backup storage solutions?</label>
            <textarea name="costOptimization" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default OffSiteBackupStoragePage;
