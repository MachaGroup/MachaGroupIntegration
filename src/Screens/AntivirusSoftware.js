import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function AntivirusSoftwarePage() {
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
            const formsRef = collection(db, 'forms/Cybersecurity/Antivirus Software');
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
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Antivirus Software Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.2.1.1 Antivirus Software (e.g., real-time scanning)</h2>

                    {/* Detection and Prevention Effectiveness */}
                    <h3>4.1.2.1.1.1 Detection and Prevention Effectiveness:</h3>
                    <div className="form-section">
                        <label>4.1.2.1.1.1.1. How effective is the antivirus software at detecting and removing both known and zero-day threats, including viruses, malware, ransomware, and spyware?</label>
                        <textarea name="detectionEffectiveness" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.1.2. Does the software utilize heuristic and behavior-based detection methods to identify potentially harmful activity, even if a specific threat signature is not available?</label>
                        <div>
                            <input type="radio" name="heuristicDetection" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="heuristicDetection" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.1.3. How frequently is the threat database updated, and does the software receive automatic updates to ensure protection against the latest threats?</label>
                        <textarea name="databaseUpdateFrequency" onChange={handleChange}></textarea>
                    </div>

                    {/* Performance and Usability */}
                    <h3>4.1.2.1.1.2 Performance and Usability:</h3>
                    <div className="form-section">
                        <label>4.1.2.1.1.2.1. What is the impact of real-time scanning on system performance, including CPU and memory usage, during both idle and active states?</label>
                        <textarea name="performanceImpact" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.2.2. Does the antivirus software allow for scheduling of scans and setting exclusions to reduce the impact on critical operations or high-performance applications?</label>
                        <div>
                            <input type="radio" name="scanScheduling" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="scanScheduling" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.2.3. How user-friendly is the software interface, and are there customizable settings for different user roles or security levels?</label>
                        <textarea name="userInterface" onChange={handleChange}></textarea>
                    </div>

                    {/* Management and Reporting */}
                    <h3>4.1.2.1.1.3 Management and Reporting:</h3>
                    <div className="form-section">
                        <label>4.1.2.1.1.3.1. What kind of centralized management features does the antivirus software offer for administrators to monitor and control security settings across all endpoints?</label>
                        <textarea name="centralizedManagement" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.3.2. Are there comprehensive reporting tools that provide insights into detected threats, scan results, and overall security status?</label>
                        <textarea name="reportingTools" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.3.3. Can alerts and notifications be customized to inform relevant personnel about potential security incidents in real time?</label>
                        <div>
                            <input type="radio" name="customizableAlerts" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="customizableAlerts" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Integration with Other Security Solutions */}
                    <h3>4.1.2.1.1.4 Integration with Other Security Solutions:</h3>
                    <div className="form-section">
                        <label>4.1.2.1.1.4.1. How well does the antivirus software integrate with other security measures, such as firewalls, intrusion prevention systems (IPS), and security information and event management (SIEM) systems?</label>
                        <textarea name="integrationWithTools" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.4.2. Does the software support automated workflows for incident response, such as isolating compromised devices or initiating remediation actions?</label>
                        <textarea name="automatedWorkflows" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.4.3. Can the antivirus software share threat intelligence with other network security tools to enhance overall threat detection and response capabilities?</label>
                        <div>
                            <input type="radio" name="threatIntelligenceSharing" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="threatIntelligenceSharing" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Compliance and Regulatory Requirements */}
                    <h3>4.1.2.1.1.5 Compliance and Regulatory Requirements:</h3>
                    <div className="form-section">
                        <label>4.1.2.1.1.5.1. Does the antivirus software meet relevant industry standards and compliance requirements, such as GDPR, HIPAA, or PCI-DSS?</label>
                        <textarea name="complianceStandards" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.5.2. Are there features in place to ensure that security logs and incident reports are retained in compliance with regulatory guidelines?</label>
                        <textarea name="logRetention" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.1.1.5.3. How does the software handle data privacy and protection, especially in relation to scanning and monitoring sensitive files or information?</label>
                        <textarea name="dataPrivacy" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AntivirusSoftwarePage;
