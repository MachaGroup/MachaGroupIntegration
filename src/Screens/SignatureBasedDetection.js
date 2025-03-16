import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function SignatureBasedDetectionPage() {
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

    const handleBack = async () => {
        if (formData && buildingId) { // Check if formData and buildingId exist
          try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Signature-Based Detection');
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
            const formsRef = collection(db, 'forms/Cybersecurity/Signature-Based Detection');
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
                <h1>Signature-Based Detection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Signature Database Management */}
                    <h2>4.1.1.2.2.1 Signature Database Management:</h2>
                    <div className="form-section">
                        <label>How frequently is the signature database updated to include the latest known attack patterns and vulnerabilities?</label>
                        <textarea name="databaseUpdateFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>What sources are used to gather new signatures for the IDS, and how is the credibility and reliability of these sources ensured?</label>
                        <textarea name="signatureSources" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there mechanisms in place to create custom signatures based on specific threats faced by the organization?</label>
                        <div>
                            <input type="radio" name="customSignatures" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="customSignatures" value="No" onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="customSignaturesComment" placeholder="Comments" onChange={handleChange}/>
                        </div>
                    </div>

                    {/* Detection Accuracy and Coverage */}
                    <h2>4.1.1.2.2.2 Detection Accuracy and Coverage:</h2>
                    <div className="form-section">
                        <label>How comprehensive is the IDS in detecting a wide range of known attack patterns, including zero-day vulnerabilities and emerging threats?</label>
                        <textarea name="detectionCoverage" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>What measures are in place to balance detection accuracy with performance, ensuring the IDS does not overly tax network resources?</label>
                        <textarea name="performanceBalance" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there any gaps in signature coverage for specific types of attacks or network protocols, and how are these addressed?</label>
                        <textarea name="coverageGaps" onChange={handleChange}></textarea>
                    </div>

                    {/* Alerting and Incident Response */}
                    <h2>4.1.1.2.2.3 Alerting and Incident Response:</h2>
                    <div className="form-section">
                        <label>How are alerts generated by signature-based detections prioritized, and what criteria determine the severity of an alert?</label>
                        <textarea name="alertPrioritization" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>What is the standard operating procedure for responding to alerts triggered by known attack patterns, and who is responsible for initiating the response?</label>
                        <textarea name="responseProcedure" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there measures in place to reduce the occurrence of false positives, and how is the accuracy of alerts verified?</label>
                        <textarea name="falsePositiveReduction" onChange={handleChange}></textarea>
                    </div>

                    {/* System Integration and Scalability */}
                    <h2>4.1.1.2.2.4 System Integration and Scalability:</h2>
                    <div className="form-section">
                        <label>How well does the signature-based IDS integrate with other cybersecurity tools, such as SIEM (Security Information and Event Management) systems, firewalls, and endpoint protection solutions?</label>
                        <textarea name="integrationWithTools" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Can the IDS scale effectively with the network, accommodating increases in traffic and changes in network architecture without a loss of detection capability?</label>
                        <div>
                            <input type="radio" name="scalability" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="scalability" value="No" onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="scalabilityComment" placeholder="Comments" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How is the IDS configured to handle encrypted traffic, ensuring visibility into potential threats without compromising data privacy?</label>
                        <textarea name="encryptedTrafficHandling" onChange={handleChange}></textarea>
                    </div>

                    {/* Testing and Continuous Improvement */}
                    <h2>4.1.1.2.2.5 Testing and Continuous Improvement:</h2>
                    <div className="form-section">
                        <label>How regularly is the effectiveness of signature-based detection tested, and what methods (e.g., penetration testing, red teaming) are used to evaluate its capabilities?</label>
                        <textarea name="effectivenessTesting" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Is there a process for reviewing and refining detection signatures based on feedback from incident investigations and threat intelligence updates?</label>
                        <div>
                            <input type="radio" name="signatureRefinement" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="signatureRefinement" value="No" onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="signatureRefinementComment" placeholder="Comments" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How are lessons learned from past incidents and detected threats incorporated into the ongoing development and improvement of the signature database?</label>
                        <textarea name="lessonsLearned" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SignatureBasedDetectionPage;
