import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; 
import Navbar from "./Navbar";

function CommunicationChannelsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Communication Channels and Protocols');
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
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1>Communication Channels and Protocols</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.4.2.1.2 Communication Channels and Protocols</h2>

                    {/* Channel Selection */}
                    <h3>4.4.2.1.2.1 Channel Selection</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.1.1. What communication channels are designated for incident response?</label>
                        <textarea name="designatedChannels" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.1.2. How are these channels selected to ensure they meet security and confidentiality requirements?</label>
                        <textarea name="channelSecurity" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.1.3. Are there alternative channels identified in case primary ones become unavailable?</label>
                        <div>
                            <input type="radio" name="alternativeChannels" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="alternativeChannels" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Communication Protocols */}
                    <h3>4.4.2.1.2.2 Communication Protocols</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.2.1. What protocols are established for internal communication?</label>
                        <textarea name="internalCommunicationProtocols" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.2.2. How is sensitive information protected during communication?</label>
                        <textarea name="sensitiveInfoProtection" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.2.3. Are there predefined procedures for escalating communication?</label>
                        <div>
                            <input type="radio" name="communicationEscalation" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="communicationEscalation" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Incident Reporting */}
                    <h3>4.4.2.1.2.3 Incident Reporting</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.3.1. How are incidents reported within the organization?</label>
                        <textarea name="incidentReporting" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.3.2. What information is required in incident reports?</label>
                        <textarea name="incidentReportContent" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.3.3. How are reports documented and stored for compliance purposes?</label>
                        <textarea name="reportDocumentation" onChange={handleChange}></textarea>
                    </div>

                    {/* External Communication */}
                    <h3>4.4.2.1.2.4 External Communication</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.4.1. What guidelines are in place for communicating with external parties?</label>
                        <textarea name="externalCommunicationGuidelines" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.4.2. How is consistency maintained in external communications?</label>
                        <textarea name="externalCommunicationConsistency" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.4.3. What protocols are followed to manage media inquiries?</label>
                        <textarea name="mediaManagementProtocols" onChange={handleChange}></textarea>
                    </div>

                    {/* Response Coordination */}
                    <h3>4.4.2.1.2.5 Response Coordination</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.5.1. How is coordination managed during an incident?</label>
                        <textarea name="responseCoordination" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.5.2. What tools facilitate real-time communication?</label>
                        <textarea name="realTimeTools" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.5.3. How are communication responsibilities divided?</label>
                        <textarea name="communicationResponsibilities" onChange={handleChange}></textarea>
                    </div>

                    {/* Information Security */}
                    <h3>4.4.2.1.2.6 Information Security</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.6.1. How are channels secured to prevent interception?</label>
                        <textarea name="channelSecurityMeasures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.6.2. What measures protect communication devices?</label>
                        <textarea name="deviceProtection" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.6.3. How is the integrity of communication ensured?</label>
                        <textarea name="communicationIntegrity" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Drills */}
                    <h3>4.4.2.1.2.7 Training and Drills</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.7.1. How is training provided on communication protocols?</label>
                        <textarea name="trainingProtocols" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.7.2. Are regular drills conducted to practice communication?</label>
                        <div>
                            <input type="radio" name="communicationDrills" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="communicationDrills" value="No" onChange={handleChange} /> No
                        </div>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.7.3. How is feedback from drills used to refine practices?</label>
                        <textarea name="drillFeedback" onChange={handleChange}></textarea>
                    </div>

                    {/* Post-Incident Review */}
                    <h3>4.4.2.1.2.8 Post-Incident Review</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.8.1. How are communication channels evaluated post-incident?</label>
                        <textarea name="channelEvaluation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.8.2. What feedback is collected regarding communication challenges?</label>
                        <textarea name="communicationChallengesFeedback" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.8.3. How are lessons learned from communication incidents incorporated?</label>
                        <textarea name="communicationLessonsLearned" onChange={handleChange}></textarea>
                    </div>

                    {/* Documentation and Reporting */}
                    <h3>4.4.2.1.2.9 Documentation and Reporting</h3>
                    <div className="form-section">
                        <label>4.4.2.1.2.9.1. What documentation is required during an incident?</label>
                        <textarea name="incidentDocumentation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.9.2. How are communication records maintained?</label>
                        <textarea name="recordMaintenance" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.1.2.9.3. What procedures are in place for analyzing communication records?</label>
                        <textarea name="recordAnalysis" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default CommunicationChannelsPage;
