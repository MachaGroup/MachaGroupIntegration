import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function IntrusionDetectionSystems2Page() {
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

    // Function to handle back button
    const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Cybersecurity/Intrusion Detection System2');
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
          navigate(-1);  // Navigates to the previous page
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
          const formsRef = collection(db, 'forms/Cybersecurity/Intrusion Detection System2');
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
        <h1>Intrusion Detection Systems (IDS)</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* System Deployment and Configuration */}
          <h2>System Deployment and Configuration:</h2>
          <div className="form-section">
            <label>How are IDS solutions deployed across the network (e.g., inline, passive, distributed) and what areas or segments do they cover?</label>
            <textarea name="idsDeployment" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What are the key configuration settings for the IDS, and how are they tuned to match the organization’s security requirements?</label>
            <textarea name="idsConfigSettings" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there any known limitations or blind spots in the IDS deployment that need to be addressed?</label>
            <div>
              <input type="radio" name="idsBlindSpots" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="idsBlindSpots" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="idsBlindSpots" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Detection Capabilities */}
          <h2>Detection Capabilities:</h2>
          <div className="form-section">
            <label>What types of intrusions and attacks does the IDS aim to detect (e.g., network-based attacks, host-based attacks, zero-day exploits)?</label>
            <textarea name="idsDetectionTypes" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How does the IDS differentiate between legitimate and malicious activities to minimize false positives and false negatives?</label>
            <textarea name="idsFalsePositivesHandling" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific signatures, heuristics, or anomaly detection methods used to identify potential threats?</label>
            <textarea name="idsDetectionMethods" onChange={handleChange}></textarea>
          </div>

          {/* Real-time Monitoring and Alerting */}
          <h2>Real-time Monitoring and Alerting:</h2>
          <div className="form-section">
            <label>Does the IDS provide real-time monitoring of network and system activities to identify suspicious or malicious behavior?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="realTimeMonitoring" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="realTimeMonitoring" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are alerts generated and managed, and what processes are in place to ensure timely response to detected threats?</label>
            <textarea name="idsAlertManagement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What is the procedure for escalating alerts to the appropriate response teams or individuals?</label>
            <textarea name="alertEscalationProcedure" onChange={handleChange}></textarea>
          </div>

          {/* Incident Response Integration */}
          <h2>Incident Response Integration:</h2>
          <div className="form-section">
            <label>How is the IDS integrated with incident response processes and tools, such as SIEM systems or ticketing systems?</label>
            <textarea name="idsIncidentIntegration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there predefined incident response protocols for handling alerts and incidents detected by the IDS?</label>
            <div>
              <input type="radio" name="incidentProtocols" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="incidentProtocols" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="incidentProtocols" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are the effectiveness and accuracy of the IDS in supporting incident response efforts evaluated?</label>
            <textarea name="idsIncidentEffectiveness" onChange={handleChange}></textarea>
          </div>

          {/* Data Logging and Analysis */}
          <h2>Data Logging and Analysis:</h2>
          <div className="form-section">
            <label>What types of data and logs are collected by the IDS, and how are they stored and managed?</label>
            <textarea name="idsLogCollection" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are IDS logs analyzed to identify trends, patterns, or recurring issues related to security incidents?</label>
            <textarea name="idsLogAnalysis" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there tools or processes in place to correlate IDS data with other security logs or events?</label>
            <div>
              <input type="radio" name="logCorrelation" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="logCorrelation" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="logCorrelation" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* System Maintenance and Updates */}
          <h2>System Maintenance and Updates:</h2>
          <div className="form-section">
            <label>What is the process for updating and maintaining IDS signatures, rules, and configurations to stay current with emerging threats?</label>
            <textarea name="idsMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How often are system updates and patches applied to the IDS, and how is the impact on system performance and security assessed?</label>
            <textarea name="idsUpdatesFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there procedures for testing and validating updates to ensure they do not disrupt normal operations?</label>
            <div>
              <input type="radio" name="updateValidation" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="updateValidation" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="uploadValidation" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Performance and Effectiveness Evaluation */}
          <h2>Performance and Effectiveness Evaluation:</h2>
          <div className="form-section">
            <label>How is the performance of the IDS monitored, and are there metrics or benchmarks used to assess its effectiveness?</label>
            <textarea name="idsPerformanceMonitoring" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there periodic reviews or assessments conducted to evaluate the IDS’s ability to detect and respond to threats?</label>
            <div>
              <input type="radio" name="periodicAssessment" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="periodicAssessment" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="periodicAssessment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are feedback and lessons learned from past incidents incorporated into the IDS configuration and deployment strategy?</label>
            <textarea name="feedbackIncorporation" onChange={handleChange}></textarea>
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

export default IntrusionDetectionSystems2Page;
