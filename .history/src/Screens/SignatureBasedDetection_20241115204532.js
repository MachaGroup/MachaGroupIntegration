import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function SignatureBasedDetectionPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState();

    useEffect(() => {
        const fetchBuildingIdFromBuildings = async () => {
            if (!buildingId) {
                try {
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID'); 
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId); 
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Signature-Based Detection');
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
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Signature-Based Detection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.1.2.2 Signature-Based Detection (e.g., known attack patterns)</h2>

                    {/* Signature Database Management */}
                    <h3>4.1.1.2.2.1 Signature Database Management:</h3>
                    <div className="form-section">
                        <label>4.1.1.2.2.1.1. How frequently is the signature database updated to include the latest known attack patterns and vulnerabilities?</label>
                        <textarea name="databaseUpdateFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.1.2. What sources are used to gather new signatures for the IDS, and how is the credibility and reliability of these sources ensured?</label>
                        <textarea name="signatureSources" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.1.3. Are there mechanisms in place to create custom signatures based on specific threats faced by the organization?</label>
                        <textarea name="customSignatures" onChange={handleChange}></textarea>
                    </div>

                    {/* Detection Accuracy and Coverage */}
                    <h3>4.1.1.2.2.2 Detection Accuracy and Coverage:</h3>
                    <div className="form-section">
                        <label>4.1.1.2.2.2.1. How comprehensive is the IDS in detecting a wide range of known attack patterns, including zero-day vulnerabilities and emerging threats?</label>
                        <textarea name="detectionCoverage" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.2.2. What measures are in place to balance detection accuracy with performance, ensuring the IDS does not overly tax network resources?</label>
                        <textarea name="performanceBalance" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.2.3. Are there any gaps in signature coverage for specific types of attacks or network protocols, and how are these addressed?</label>
                        <textarea name="coverageGaps" onChange={handleChange}></textarea>
                    </div>

                    {/* Alerting and Incident Response */}
                    <h3>4.1.1.2.2.3 Alerting and Incident Response:</h3>
                    <div className="form-section">
                        <label>4.1.1.2.2.3.1. How are alerts generated by signature-based detections prioritized, and what criteria determine the severity of an alert?</label>
                        <textarea name="alertPrioritization" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.3.2. What is the standard operating procedure for responding to alerts triggered by known attack patterns, and who is responsible for initiating the response?</label>
                        <textarea name="responseProcedure" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.3.3. Are there measures in place to reduce the occurrence of false positives, and how is the accuracy of alerts verified?</label>
                        <textarea name="falsePositiveReduction" onChange={handleChange}></textarea>
                    </div>

                    {/* System Integration and Scalability */}
                    <h3>4.1.1.2.2.4 System Integration and Scalability:</h3>
                    <div className="form-section">
                        <label>4.1.1.2.2.4.1. How well does the signature-based IDS integrate with other cybersecurity tools, such as SIEM (Security Information and Event Management) systems, firewalls, and endpoint protection solutions?</label>
                        <textarea name="integrationWithTools" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.4.2. Can the IDS scale effectively with the network, accommodating increases in traffic and changes in network architecture without a loss of detection capability?</label>
                        <textarea name="scalability" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.4.3. How is the IDS configured to handle encrypted traffic, ensuring visibility into potential threats without compromising data privacy?</label>
                        <textarea name="encryptedTrafficHandling" onChange={handleChange}></textarea>
                    </div>

                    {/* Testing and Continuous Improvement */}
                    <h3>4.1.1.2.2.5 Testing and Continuous Improvement:</h3>
                    <div className="form-section">
                        <label>4.1.1.2.2.5.1. How regularly is the effectiveness of signature-based detection tested, and what methods (e.g., penetration testing, red teaming) are used to evaluate its capabilities?</label>
                        <textarea name="effectivenessTesting" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.5.2. Is there a process for reviewing and refining detection signatures based on feedback from incident investigations and threat intelligence updates?</label>
                        <textarea name="signatureRefinement" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.2.2.5.3. How are lessons learned from past incidents and detected threats incorporated into the ongoing development and improvement of the signature database?</label>
                        <textarea name="lessonsLearned" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SignatureBasedDetectionPage;
