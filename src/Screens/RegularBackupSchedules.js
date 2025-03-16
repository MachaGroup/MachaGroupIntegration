import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RegularBackupSchedulesPage() {
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
        const formsRef = collection(db, 'forms/Cybersecurity/Regular Backup Schedules');
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
      const formsRef = collection(db, 'forms/Cybersecurity/Regular Backup Schedules');
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
        <h1>Regular Backup Schedules Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.2.2.1.1.1 Frequency and Coverage:</h2>
          <div className="form-section">
            <label>What is the frequency of your backup schedules (e.g., daily, weekly), and does it align with the criticality of the data being backed up?</label>
            <textarea name="backupFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are all critical data and systems included in the backup schedule, and are there specific types of data (e.g., databases, configuration files) that are prioritized?</label>
            <div>
              <input type="radio" name="criticalDataIncluded" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="criticalDataIncluded" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="criticalDataIncludedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are backup schedules adjusted for different types of data, such as high-frequency transactional data versus less frequently updated data?</label>
            <textarea name="scheduleAdjustments" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.1.2 Backup Procedures:</h2>
          <div className="form-section">
            <label>What procedures are followed to ensure that backups are performed reliably and consistently according to the established schedule?</label>
            <textarea name="reliableBackupProcedures" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there automated systems in place to handle backups, and how are manual backups managed and verified?</label>
            <div>
              <input type="radio" name="automatedBackupSystems" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="automatedBackupSystems" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="automatedBackupSystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is backup integrity validated, and what steps are taken if a backup fails or encounters errors during the process?</label>
            <textarea name="backupIntegrityValidation" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.1.3 Storage and Retention:</h2>
          <div className="form-section">
            <label>How is backup data stored, and what storage solutions are used (e.g., cloud storage, on-premises storage, off-site storage)?</label>
            <textarea name="backupStorageSolutions" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What are the retention policies for backup data, and how long is backup data kept before being archived or deleted?</label>
            <textarea name="retentionPolicies" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup storage solutions secure and protected from unauthorized access or tampering?</label>
            <div>
              <input type="radio" name="secureBackupStorage" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="secureBackupStorage" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="secureBackupStorageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <h2>4.2.2.1.1.4 Monitoring and Alerts:</h2>
          <div className="form-section">
            <label>What monitoring systems are in place to track the status of backups and ensure that they are completed as scheduled?</label>
            <textarea name="monitoringSystems" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there alert mechanisms to notify administrators of backup failures, delays, or issues, and how are these alerts handled?</label>
            <div>
              <input type="radio" name="backupAlerts" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="backupAlerts" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="backupAlertsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is the performance of backup processes monitored to ensure that they do not negatively impact system performance or operations?</label>
            <textarea name="backupPerformanceMonitoring" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.1.5 Testing and Verification:</h2>
          <div className="form-section">
            <label>How frequently are backup restoration tests conducted to ensure that backup data can be successfully restored when needed?</label>
            <textarea name="restorationTestsFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What procedures are in place to verify the completeness and accuracy of backups, and how are discrepancies addressed?</label>
            <textarea name="backupVerificationProcedures" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup tests documented and reviewed, and what is the process for updating backup procedures based on test results?</label>
            <textarea name="backupTestsDocumentation" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.1.6 Compliance and Documentation:</h2>
          <div className="form-section">
            <label>How does your backup schedule comply with relevant regulatory and industry standards for data protection and retention?</label>
            <textarea name="backupCompliance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup procedures and schedules documented, and is there a clear process for updating documentation as needed?</label>
            <div>
              <input type="radio" name="backupProceduresDocumented" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="backupProceduresDocumented" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="backupProceduresDocumentedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>What audits or reviews are conducted to ensure compliance with backup policies and procedures?</label>
            <textarea name="backupAuditsReviews" onChange={handleChange}></textarea>
          </div>

          <h2>4.2.2.1.1.7 Disaster Recovery Integration:</h2>
          <div className="form-section">
            <label>How are backup schedules integrated into the overall disaster recovery plan, and what role do they play in ensuring business continuity?</label>
            <textarea name="disasterRecoveryIntegration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What are the procedures for initiating recovery from backups during a disaster or major incident, and how is recovery prioritized?</label>
            <textarea name="recoveryFromBackups" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup and recovery processes tested together to ensure that they function effectively as part of the disaster recovery plan?</label>
            <div>
              <input type="radio" name="backupRecoveryTested" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="backupRecoveryTested" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="backupRecoveryTestedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default RegularBackupSchedulesPage;
