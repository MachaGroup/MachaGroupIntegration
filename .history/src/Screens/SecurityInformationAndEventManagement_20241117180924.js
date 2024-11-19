import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function SIEMSolutionsPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState();

    useEffect(() => {
        const fetchBuildingIdFromBuildings = async () => {
            if (!buildingId) {
                try {
                    // Replace 'BuildingDocumentID' with your actual document ID in the Buildings collection
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID'); 
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId); // Set buildingId from the fetched document
                    } else {
                        alert('Building information not found. Redirecting...');
                        navigate('/BuildingandAddress');
                    }
                } catch (error) {
                    console.error('Error fetching building ID:', error);
                    alert('Error fetching building information.');
                }
            }
        };

        fetchBuildingIdFromBuildings();
    }, [buildingId, navigate, setBuildingId, db]);

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
          // Create a document reference to the building in the 'Buildings' collection
          const buildingRef = doc(db, 'Buildings', buildingId); 

          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Physical Security/Security Gates');
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
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Security Information and Event Management (SIEM) Solutions</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.4.1.1.1 SIEM Solutions</h2>

          {/* Deployment and Integration */}
          <h3>4.4.1.1.1.1 Deployment and Integration</h3>
          <div className="form-section">
            <label>4.4.1.1.1.1.1. How is the SIEM solution integrated with other security systems and tools within the organization (e.g., firewalls, intrusion detection systems)?</label>
            <textarea name="siemIntegration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.1.2. What is the scope of the SIEM deployment, and does it cover all critical systems, applications, and network segments?</label>
            <textarea name="siemScope" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.1.3. Are there any gaps in coverage or areas where SIEM integration is lacking?</label>
            <div>
              <input type="radio" name="siemCoverageGaps" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="siemCoverageGaps" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Event Collection and Correlation */}
          <h3>4.4.1.1.1.1.4 Event Collection and Correlation</h3>
          <div className="form-section">
            <label>4.4.1.1.1.1.5. What types of security events and logs are collected by the SIEM solution (e.g., network traffic, system logs, application logs)?</label>
            <textarea name="eventLogs" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.1.6. How does the SIEM solution correlate events from different sources to identify potential security incidents or threats?</label>
            <textarea name="eventCorrelation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.1.7. Are there specific rules or algorithms used to prioritize and filter events based on their severity or relevance?</label>
            <textarea name="eventPrioritizationRules" onChange={handleChange}></textarea>
          </div>

          {/* Real-time Monitoring and Alerts */}
          <h3>4.4.1.1.1.2 Real-time Monitoring and Alerts</h3>
          <div className="form-section">
            <label>4.4.1.1.1.2.1. Does the SIEM solution provide real-time monitoring and alerting capabilities for detected security events and incidents?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="realTimeMonitoring" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.2.2. How are alerts configured and managed to minimize false positives and ensure timely detection of genuine threats?</label>
            <textarea name="alertConfiguration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.2.3. What is the process for responding to and investigating alerts generated by the SIEM solution?</label>
            <textarea name="alertInvestigation" onChange={handleChange}></textarea>
          </div>

          {/* Incident Detection and Response */}
          <h3>4.4.1.1.1.3 Incident Detection and Response</h3>
          <div className="form-section">
            <label>4.4.1.1.1.3.1. How effective is the SIEM solution in detecting and identifying various types of security incidents (e.g., malware infections, unauthorized access)?</label>
            <textarea name="incidentDetectionEffectiveness" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.3.2. Are there predefined incident response procedures and workflows integrated with the SIEM solution to guide the response to detected incidents?</label>
            <div>
              <input type="radio" name="incidentWorkflowsIntegrated" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="incidentWorkflowsIntegrated" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.3.3. How is the effectiveness of incident detection and response measured and evaluated?</label>
            <textarea name="incidentResponseEffectiveness" onChange={handleChange}></textarea>
          </div>

          {/* Data Storage and Retention */}
          <h3>4.4.1.1.1.4 Data Storage and Retention</h3>
          <div className="form-section">
            <label>4.4.1.1.1.4.1. What is the policy for data storage and retention within the SIEM solution, including the duration for retaining logs and security events?</label>
            <textarea name="dataRetentionPolicy" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.4.2. How is the integrity and confidentiality of stored data maintained to prevent unauthorized access or tampering?</label>
            <textarea name="dataIntegrityMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.4.3. Are there processes in place for securely archiving or deleting outdated or obsolete data?</label>
            <div>
              <input type="radio" name="dataArchivingProcess" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="dataArchivingProcess" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Reporting and Analysis */}
          <h3>4.4.1.1.1.5 Reporting and Analysis</h3>
          <div className="form-section">
            <label>4.4.1.1.1.5.1. What types of reports and dashboards are available through the SIEM solution, and how are they used for security analysis and decision-making?</label>
            <textarea name="siemReports" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.5.2. How often are reports generated, and are they reviewed by security personnel or management to assess the overall security posture?</label>
            <textarea name="reportFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.5.3. Are there capabilities for customizing reports and analysis to address specific security concerns or requirements?</label>
            <textarea name="customReports" onChange={handleChange}></textarea>
          </div>

          {/* Maintenance and Improvement */}
          <h3>4.4.1.1.1.6 Maintenance and Improvement</h3>
          <div className="form-section">
            <label>4.4.1.1.1.6.1. What is the process for maintaining and updating the SIEM solution, including applying patches, updates, and new threat intelligence feeds?</label>
            <textarea name="siemMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.6.2. How is the SIEM solution evaluated for effectiveness, and are there regular assessments or audits to ensure its continued relevance and performance?</label>
            <textarea name="siemEffectivenessAudit" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.4.1.1.1.6.3. Are there plans for upgrading or expanding the SIEM solution to enhance its capabilities or address emerging security threats?</label>
            <div>
              <input type="radio" name="siemUpgradePlans" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="siemUpgradePlans" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SIEMSolutionsPage;
