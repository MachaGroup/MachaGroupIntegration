import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function NetworkAnomalyDetectionPage() {
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

    // Function to handle back button
    const handleBack = async () => {
        if (formData && buildingId) { // Check if formData and buildingId exist
          try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Network Anomaly Detection');
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
            const formsRef = collection(db, 'forms/Cybersecurity/Network Anomaly Detection');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
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
            <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Network Anomaly Detection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Detection Capabilities */}
                    <h2>4.1.1.2.1.1 Detection Capabilities:</h2>
                    <div className="form-section">
                        <label>What types of network anomalies are the Intrusion Detection Systems (IDS) configured to detect (e.g., unusual traffic volume, protocol misuse, unauthorized port access)?</label>
                        <textarea name="idsDetectionTypes" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How are baseline traffic patterns established for anomaly detection, and what criteria are used to define what constitutes "normal" network behavior?</label>
                        <textarea name="baselinePatterns" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How quickly can the IDS detect and alert on abnormal traffic patterns, and what is the average time from detection to alert generation?</label>
                        <textarea name="alertTime" onChange={handleChange}></textarea>
                    </div>

                    {/* Configuration and Customization */}
                    <h2>4.1.1.2.1.2 Configuration and Customization:</h2>
                    <div className="form-section">
                        <label>Are the anomaly detection parameters customizable to fit the specific needs of the organization, such as different thresholds for various network segments or user groups?</label>
                        <div>
                            <input type="radio" name="customizableParameters" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="customizableParameters" value="No" onChange={handleChange} /> No
                            <textarea className='comment-box' name="customizableParametersComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How often are detection algorithms and rules updated to adapt to new types of network threats or changes in network architecture?</label>
                        <textarea name="updateFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Is there flexibility in the IDS to incorporate machine learning or artificial intelligence to improve detection accuracy over time?</label>
                        <div>
                            <input type="radio" name="mlAiFlexibility" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="mlAiFlexibility" value="No" onChange={handleChange} /> No
                            <textarea className='comment-box' name="mlAiFlexibilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Alerting and Response */}
                    <h2>4.1.1.2.1.3 Alerting and Response:</h2>
                    <div className="form-section">
                        <label>What is the process for responding to alerts generated by the IDS, and who is responsible for managing these alerts (e.g., network security team, IT operations)?</label>
                        <textarea name="alertResponseProcess" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are alerts prioritized based on the severity of the anomaly or the potential impact on the network, and how is this prioritization determined?</label>
                        <textarea name="alertPrioritization" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How are false positives minimized to prevent alert fatigue, and what measures are in place to ensure critical alerts are not missed?</label>
                        <textarea name="falsePositives" onChange={handleChange}></textarea>
                    </div>

                    {/* Integration and Compatibility */}
                    <h2>4.1.1.2.1.4 Integration and Compatibility:</h2>
                    <div className="form-section">
                        <label>How well does the IDS integrate with other security tools and systems, such as firewalls, SIEM (Security Information and Event Management) systems, and antivirus software?</label>
                        <textarea name="integrationWithTools" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there any compatibility issues when deploying IDS across different network environments (e.g., cloud-based networks, on-premises infrastructure)?</label>
                        <textarea name="compatibilityIssues" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How is data from the IDS used in conjunction with other security tools to provide a comprehensive view of network security?</label>
                        <textarea name="dataUsage" onChange={handleChange}></textarea>
                    </div>

                    {/* Testing and Evaluation */}
                    <h3>Testing and Evaluation:</h3>
                    <div className="form-section">
                        <label>How frequently is the effectiveness of the IDS tested, and what methods are used for testing (e.g., simulated attacks, penetration testing, red teaming)?</label>
                        <textarea name="testingFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Is there a regular review process for the performance of the IDS, including an assessment of its ability to detect new or evolving threats?</label>
                        <textarea name="performanceReview" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How is feedback from testing and real-world incidents used to refine and improve the IDS's anomaly detection capabilities?</label>
                        <textarea name="feedbackIncorporation" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default NetworkAnomalyDetectionPage;
