import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function UserBehaviorAnalyticsPage() {
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
            const formsRef = collection(db, 'forms/Cybersecurity/User Behavior Analytics');
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
            const formsRef = collection(db, 'forms/Cybersecurity/User Behavior Analytics');
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
                <h1>User Behavior Analytics (UBA)</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Data Collection and Analysis */}
                    <h2>Data Collection and Analysis:</h2>
                    <div className="form-section">
                        <label>What types of user activity data are collected and analyzed (e.g., login times, access patterns, application usage)?</label>
                        <textarea name="userActivityData" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is user behavior data collected, and are there any privacy considerations or limitations in the data collection process?</label>
                        <textarea name="dataCollectionProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What methods are used to analyze user behavior data to identify deviations from normal patterns?</label>
                        <textarea name="analysisMethods" onChange={handleChange}></textarea>
                    </div>

                    {/* Baseline Behavior Establishment */}
                    <h2>Baseline Behavior Establishment:</h2>
                    <div className="form-section">
                        <label>How are baseline behaviors for users or user groups established, and how are these baselines maintained and updated?</label>
                        <textarea name="baselineEstablishment" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What criteria or metrics are used to define normal versus anomalous behavior?</label>
                        <textarea name="criteriaMetrics" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there mechanisms in place to account for changes in user behavior due to legitimate reasons (e.g., role changes, seasonal variations)?</label>
                        <textarea name="mechanismsForChanges" onChange={handleChange}></textarea>
                    </div>

                    {/* Anomaly Detection */}
                    <h2>Anomaly Detection:</h2>
                    <div className="form-section">
                        <label>How does UBA identify deviations from established baseline behaviors, and what algorithms or techniques are used for anomaly detection?</label>
                        <textarea name="anomalyDetection" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What thresholds or criteria trigger alerts for anomalous behavior, and how are these thresholds set?</label>
                        <textarea name="thresholdsForAlerts" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are false positives and false negatives managed to minimize disruptions and ensure accurate detection?</label>
                        <textarea name="falsePositivesHandling" onChange={handleChange}></textarea>
                    </div>

                    {/* Alerting and Response */}
                    <h2>Alerting and Response:</h2>
                    <div className="form-section">
                        <label>How are alerts generated for detected anomalies, and what is the process for investigating and responding to these alerts?</label>
                        <textarea name="alertingProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there predefined response protocols or escalation procedures for different types of anomalies detected by UBA?</label>
                        <textarea name="responseProtocols" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are alerts prioritized and managed to ensure timely and appropriate response to potential security incidents?</label>
                        <textarea name="alertPrioritization" onChange={handleChange}></textarea>
                    </div>

                    {/* Integration with Other Security Systems */}
                    <h2>Integration with Other Security Systems:</h2>
                    <div className="form-section">
                        <label>How is UBA integrated with other security systems, such as Security Information and Event Management (SIEM) solutions or Intrusion Detection Systems (IDS)?</label>
                        <textarea name="ubaIntegration" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there mechanisms in place to correlate UBA data with other security events or incidents for a comprehensive view of potential threats?</label>
                        <textarea name="correlationMechanisms" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is information from UBA used to enhance overall security posture and incident response capabilities?</label>
                        <textarea name="ubaEnhancements" onChange={handleChange}></textarea>
                    </div>

                    {/* Privacy and Compliance */}
                    <h2>Privacy and Compliance:</h2>
                    <div className="form-section">
                        <label>How does UBA ensure user privacy and comply with relevant regulations and policies (e.g., GDPR, CCPA)?</label>
                        <textarea name="privacyCompliance" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What measures are in place to anonymize or protect user data during collection and analysis?</label>
                        <textarea name="dataAnonymization" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are users informed about the monitoring of their behavior, and how are their consent and privacy rights managed?</label>
                        <textarea name="userConsent" onChange={handleChange}></textarea>
                    </div>

                    {/* Effectiveness and Performance Evaluation */}
                    <h2>Effectiveness and Performance Evaluation:</h2>
                    <div className="form-section">
                        <label>How is the effectiveness of UBA assessed, and what metrics or benchmarks are used to evaluate its performance?</label>
                        <textarea name="performanceMetrics" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there regular reviews or assessments of UBA systems to ensure they are functioning as expected and adapting to evolving threats?</label>
                        <textarea name="regularReviews" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are feedback and lessons learned from previous incidents incorporated into the UBA strategy to improve detection and response?</label>
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

export default UserBehaviorAnalyticsPage;
