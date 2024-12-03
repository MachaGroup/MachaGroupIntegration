import React, { useState, useEffect } from 'react';
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
                    <h2>4.4.1.2.1 User Behavior Analytics</h2>

                    {/* Data Collection and Analysis */}
                    <h3>4.4.1.2.1.1 Data Collection and Analysis</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.1.1. What types of user activity data are collected and analyzed (e.g., login times, access patterns, application usage)?</label>
                        <textarea name="userActivityData" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.1.2. How is user behavior data collected, and are there any privacy considerations or limitations in the data collection process?</label>
                        <textarea name="dataCollectionProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.1.3. What methods are used to analyze user behavior data to identify deviations from normal patterns?</label>
                        <textarea name="analysisMethods" onChange={handleChange}></textarea>
                    </div>

                    {/* Baseline Behavior Establishment */}
                    <h3>4.4.1.2.1.2 Baseline Behavior Establishment</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.2.1. How are baseline behaviors for users or user groups established, and how are these baselines maintained and updated?</label>
                        <textarea name="baselineEstablishment" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.2.2. What criteria or metrics are used to define normal versus anomalous behavior?</label>
                        <textarea name="criteriaMetrics" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.2.3. Are there mechanisms in place to account for changes in user behavior due to legitimate reasons (e.g., role changes, seasonal variations)?</label>
                        <textarea name="mechanismsForChanges" onChange={handleChange}></textarea>
                    </div>

                    {/* Anomaly Detection */}
                    <h3>4.4.1.2.1.3 Anomaly Detection</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.3.1. How does UBA identify deviations from established baseline behaviors, and what algorithms or techniques are used for anomaly detection?</label>
                        <textarea name="anomalyDetection" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.3.2. What thresholds or criteria trigger alerts for anomalous behavior, and how are these thresholds set?</label>
                        <textarea name="thresholdsForAlerts" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.3.3. How are false positives and false negatives managed to minimize disruptions and ensure accurate detection?</label>
                        <textarea name="falsePositivesHandling" onChange={handleChange}></textarea>
                    </div>

                    {/* Alerting and Response */}
                    <h3>4.4.1.2.1.4 Alerting and Response</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.4.1. How are alerts generated for detected anomalies, and what is the process for investigating and responding to these alerts?</label>
                        <textarea name="alertingProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.4.2. Are there predefined response protocols or escalation procedures for different types of anomalies detected by UBA?</label>
                        <textarea name="responseProtocols" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.4.3. How are alerts prioritized and managed to ensure timely and appropriate response to potential security incidents?</label>
                        <textarea name="alertPrioritization" onChange={handleChange}></textarea>
                    </div>

                    {/* Integration with Other Security Systems */}
                    <h3>4.4.1.2.1.5 Integration with Other Security Systems</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.5.1. How is UBA integrated with other security systems, such as Security Information and Event Management (SIEM) solutions or Intrusion Detection Systems (IDS)?</label>
                        <textarea name="ubaIntegration" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.5.2. Are there mechanisms in place to correlate UBA data with other security events or incidents for a comprehensive view of potential threats?</label>
                        <textarea name="correlationMechanisms" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.5.3. How is information from UBA used to enhance overall security posture and incident response capabilities?</label>
                        <textarea name="ubaEnhancements" onChange={handleChange}></textarea>
                    </div>

                    {/* Privacy and Compliance */}
                    <h3>4.4.1.2.1.6 Privacy and Compliance</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.6.1. How does UBA ensure user privacy and comply with relevant regulations and policies (e.g., GDPR, CCPA)?</label>
                        <textarea name="privacyCompliance" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.6.2. What measures are in place to anonymize or protect user data during collection and analysis?</label>
                        <textarea name="dataAnonymization" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.6.3. How are users informed about the monitoring of their behavior, and how are their consent and privacy rights managed?</label>
                        <textarea name="userConsent" onChange={handleChange}></textarea>
                    </div>

                    {/* Effectiveness and Performance Evaluation */}
                    <h3>4.4.1.2.1.7 Effectiveness and Performance Evaluation</h3>
                    <div className="form-section">
                        <label>4.4.1.2.1.7.1. How is the effectiveness of UBA assessed, and what metrics or benchmarks are used to evaluate its performance?</label>
                        <textarea name="performanceMetrics" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.7.2. Are there regular reviews or assessments of UBA systems to ensure they are functioning as expected and adapting to evolving threats?</label>
                        <textarea name="regularReviews" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.2.1.7.3. How are feedback and lessons learned from previous incidents incorporated into the UBA strategy to improve detection and response?</label>
                        <textarea name="feedbackIncorporation" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default UserBehaviorAnalyticsPage;
