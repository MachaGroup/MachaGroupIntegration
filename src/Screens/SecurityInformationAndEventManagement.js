import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function SIEMSolutionsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


    useEffect(() => {
      if(!buildingId) {
        alert('No builidng selected. Redirecting to Building Info...');
        navigate('BuildingandAddress');
      }
    }, [buildingId, navigate]);

    
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
          const formsRef = collection(db, 'forms/Cybersecurity/Security Information and Event Management');
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
          // Create a document reference to the building in the 'Buildings' collection
          const buildingRef = doc(db, 'Buildings', buildingId); 

          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Cybersecurity/Security Information and Event Management');
          await addDoc(formsRef, {
              building: buildingRef, // Reference to the building document
              formData: formData, // Store the form data as a nested object
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
        <h1>Security Information and Event Management (SIEM) Solutions</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Deployment and Integration */}
          <h2>Deployment and Integration:</h2>
          <div className="form-section">
            <label>How is the SIEM solution integrated with other security systems and tools within the organization (e.g., firewalls, intrusion detection systems)?</label>
            <textarea name="siemIntegration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What is the scope of the SIEM deployment, and does it cover all critical systems, applications, and network segments?</label>
            <textarea name="siemScope" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there any gaps in coverage or areas where SIEM integration is lacking?</label>
            <div>
              <input type="radio" name="siemCoverageGaps" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="siemCoverageGaps" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="siemCoverageGapComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Event Collection and Correlation */}
          <h2>Event Collection and Correlation:</h2>
          <div className="form-section">
            <label>What types of security events and logs are collected by the SIEM solution (e.g., network traffic, system logs, application logs)?</label>
            <textarea name="eventLogs" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How does the SIEM solution correlate events from different sources to identify potential security incidents or threats?</label>
            <textarea name="eventCorrelation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific rules or algorithms used to prioritize and filter events based on their severity or relevance?</label>
            <textarea name="eventPrioritizationRules" onChange={handleChange}></textarea>
          </div>

          {/* Real-time Monitoring and Alerts */}
          <h2>Real-time Monitoring and Alerts:</h2>
          <div className="form-section">
            <label>Does the SIEM solution provide real-time monitoring and alerting capabilities for detected security events and incidents?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="realTimeMonitoring" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="realTimeMonitoringComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>
          <div className="form-section">
            <label>How are alerts configured and managed to minimize false positives and ensure timely detection of genuine threats?</label>
            <textarea name="alertConfiguration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What is the process for responding to and investigating alerts generated by the SIEM solution?</label>
            <textarea name="alertInvestigation" onChange={handleChange}></textarea>
          </div>

          {/* Incident Detection and Response */}
          <h2>Incident Detection and Response:</h2>
          <div className="form-section">
            <label>How effective is the SIEM solution in detecting and identifying various types of security incidents (e.g., malware infections, unauthorized access)?</label>
            <textarea name="incidentDetectionEffectiveness" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there predefined incident response procedures and workflows integrated with the SIEM solution to guide the response to detected incidents?</label>
            <div>
              <input type="radio" name="incidentWorkflowsIntegrated" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="incidentWorkflowsIntegrated" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="incidentWorkflowsIntegratedComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>
          <div className="form-section">
            <label>How is the effectiveness of incident detection and response measured and evaluated?</label>
            <textarea name="incidentResponseEffectiveness" onChange={handleChange}></textarea>
          </div>

          {/* Data Storage and Retention */}
          <h2>Data Storage and Retention:</h2>
          <div className="form-section">
            <label>What is the policy for data storage and retention within the SIEM solution, including the duration for retaining logs and security events?</label>
            <textarea name="dataRetentionPolicy" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the integrity and confidentiality of stored data maintained to prevent unauthorized access or tampering?</label>
            <textarea name="dataIntegrityMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there processes in place for securely archiving or deleting outdated or obsolete data?</label>
            <div>
              <input type="radio" name="dataArchivingProcess" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="dataArchivingProcess" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="dataArchivingProcessComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Reporting and Analysis */}
          <h2>Reporting and Analysis:</h2>
          <div className="form-section">
            <label>What types of reports and dashboards are available through the SIEM solution, and how are they used for security analysis and decision-making?</label>
            <textarea name="siemReports" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How often are reports generated, and are they reviewed by security personnel or management to assess the overall security posture?</label>
            <textarea name="reportFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there capabilities for customizing reports and analysis to address specific security concerns or requirements?</label>
            <textarea name="customReports" onChange={handleChange}></textarea>
          </div>

          {/* Maintenance and Improvement */}
          <h2>Maintenance and Improvement</h2>
          <div className="form-section">
            <label>What is the process for maintaining and updating the SIEM solution, including applying patches, updates, and new threat intelligence feeds?</label>
            <textarea name="siemMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the SIEM solution evaluated for effectiveness, and are there regular assessments or audits to ensure its continued relevance and performance?</label>
            <textarea name="siemEffectivenessAudit" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there plans for upgrading or expanding the SIEM solution to enhance its capabilities or address emerging security threats?</label>
            <div>
              <input type="radio" name="siemUpgradePlans" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="siemUpgradePlans" value="No" onChange={handleChange} /> No
            </div>
            <div>
              <input type="text" name="siemUpgradePlansComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SIEMSolutionsPage;
