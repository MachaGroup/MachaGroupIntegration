import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function IncidentResponseTeamRolesPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding();
    const db = getFirestore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchBuildingId = async () => {
            if (!buildingId) {
                try {
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID');
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        setBuildingId(buildingSnapshot.data().buildingId);
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

        fetchBuildingId();
    }, [buildingId, navigate, setBuildingId, db]);

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
            const formsRef = collection(db, 'forms/Cybersecurity/Incident Response Team Roles');
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
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1>Incident Response Team Roles and Responsibilities</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.4.1.1.1 Incident Response Team Roles and Responsibilities</h2>

                    {/* Role Definition */}
                    <h3>4.4.1.1.1.1 Role Definition</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.1.1. What specific roles are defined within the incident response team (e.g., Incident Commander, Lead Analyst, Communications Coordinator)?</label>
                        <textarea name="roleDefinition" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.1.2. How are these roles determined and assigned based on the team's expertise and the organization's needs?</label>
                        <textarea name="roleAssignment" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.1.3. Are there clear descriptions of responsibilities for each role to ensure effective incident management?</label>
                        <div>
                            <input type="radio" name="clearRoleDescriptions" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="clearRoleDescriptions" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Role Training and Certification */}
                    <h3>4.4.1.1.1.2 Role Training and Certification</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.2.1. What training or certification requirements are established for each role within the incident response team?</label>
                        <textarea name="trainingRequirements" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.2.2. How is ongoing training provided to keep team members updated on the latest incident response practices and technologies?</label>
                        <textarea name="ongoingTraining" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.2.3. Are there periodic evaluations or drills to assess the team's preparedness and proficiency in their roles?</label>
                        <div>
                            <input type="radio" name="periodicEvaluations" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="periodicEvaluations" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Incident Handling Procedures */}
                    <h3>4.4.1.1.1.3 Incident Handling Procedures</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.3.1. What procedures are outlined for each role during different phases of an incident (e.g., detection, containment, eradication, recovery)?</label>
                        <textarea name="incidentProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.3.2. How are roles coordinated to ensure a seamless response, including communication and decision-making processes?</label>
                        <textarea name="roleCoordination" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.3.3. Are there predefined checklists or guidelines to assist team members in fulfilling their responsibilities during an incident?</label>
                        <div>
                            <input type="radio" name="predefinedChecklists" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="predefinedChecklists" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Coordination and Communication */}
                    <h3>4.4.1.1.1.4 Coordination and Communication</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.4.1. How is communication managed among team members during an incident, and what tools or systems are used (e.g., secure messaging platforms)?</label>
                        <textarea name="communicationManagement" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.4.2. What protocols are in place to ensure effective coordination between roles and timely information sharing?</label>
                        <textarea name="coordinationProtocols" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.4.3. How are external communications handled, including interactions with stakeholders, regulatory bodies, or the public?</label>
                        <textarea name="externalCommunications" onChange={handleChange}></textarea>
                    </div>

                    {/* Role Assignment Flexibility */}
                    <h3>4.4.1.1.1.5 Role Assignment Flexibility</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.5.1. How is flexibility incorporated into role assignments to accommodate different types or scales of incidents (e.g., overlapping roles or additional resources)?</label>
                        <textarea name="roleFlexibility" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.5.2. Are there backup or alternate personnel designated for key roles to ensure continuity if primary members are unavailable?</label>
                        <div>
                            <input type="radio" name="backupPersonnel" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="backupPersonnel" value="No" onChange={handleChange} /> No
                        </div>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.5.3. How is role adaptation managed in response to evolving incident dynamics or changes in the organization's structure?</label>
                        <textarea name="roleAdaptation" onChange={handleChange}></textarea>
                    </div>

                    {/* Role-Specific Tools and Resources */}
                    <h3>4.4.1.1.1.6 Role-Specific Tools and Resources</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.6.1. What tools, resources, or access privileges are assigned to each role to facilitate their responsibilities during an incident?</label>
                        <textarea name="roleTools" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.6.2. Are there specific software or hardware resources required for different roles (e.g., forensic tools, communication equipment)?</label>
                        <textarea name="softwareHardware" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.6.3. How is access to these tools and resources managed and secured to support effective incident response?</label>
                        <textarea name="toolsAccessManagement" onChange={handleChange}></textarea>
                    </div>

                    {/* Evaluation and Improvement */}
                    <h3>4.4.1.1.1.7 Evaluation and Improvement</h3>
                    <div className="form-section">
                        <label>4.4.1.1.1.7.1. How are the roles and responsibilities of the incident response team evaluated after an incident (e.g., debriefings, performance reviews)?</label>
                        <textarea name="roleEvaluation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.7.2. What feedback mechanisms are in place to gather insights from team members and improve role definitions and procedures?</label>
                        <textarea name="feedbackMechanisms" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.1.1.1.7.3. How are lessons learned from past incidents used to refine role assignments and enhance the overall effectiveness of the response team?</label>
                        <textarea name="lessonsLearned" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default IncidentResponseTeamRolesPage;
