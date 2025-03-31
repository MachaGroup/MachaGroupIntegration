import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function IncidentResponseTeamRolesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadIncidentResponseTeamRolesImage = httpsCallable(functions, 'uploadIncidentResponseTeamRolesImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Team Roles and Responsibilities', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({});
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [buildingId, db, navigate]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Team Roles and Responsibilities', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
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

        if (imageData) {
            try {
                const uploadResult = await uploadIncidentResponseTeamRolesImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Team Roles and Responsibilities', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Incident Response Team Roles and Responsibilities</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Incident Response Team Roles and Responsibilities</h2>
                    {[
                        { name: "roleDefinition", label: "What specific roles are defined within the incident response team (e.g., Incident Commander, Lead Analyst, Communications Coordinator)?" },
                        { name: "roleAssignment", label: "How are these roles determined and assigned based on the team's expertise and the organization's needs?" },
                        { name: "clearRoleDescriptions", label: "Are there clear descriptions of responsibilities for each role to ensure effective incident management?" },
                        { name: "trainingRequirements", label: "What training or certification requirements are established for each role within the incident response team?" },
                        { name: "ongoingTraining", label: "How is ongoing training provided to keep team members updated on the latest incident response practices and technologies?" },
                        { name: "periodicEvaluations", label: "Are there periodic evaluations or drills to assess the team's preparedness and proficiency in their roles?" },
                        { name: "incidentProcedures", label: "What procedures are outlined for each role during different phases of an incident (e.g., detection, containment, eradication, recovery)?" },
                        { name: "roleCoordination", label: "How are roles coordinated to ensure a seamless response, including communication and decision-making processes?" },
                        { name: "predefinedChecklists", label: "Are there predefined checklists or guidelines to assist team members in fulfilling their responsibilities during an incident?" },
                        { name: "communicationManagement", label: "How is communication managed among team members during an incident, and what tools or systems are used (e.g., secure messaging platforms)?" },
                        { name: "coordinationProtocols", label: "What protocols are in place to ensure effective coordination between roles and timely information sharing?" },
                        { name: "externalCommunications", label: "How are external communications handled, including interactions with stakeholders, regulatory bodies, or the public?" },
                        { name: "roleFlexibility", label: "How is flexibility incorporated into role assignments to accommodate different types or scales of incidents (e.g., overlapping roles or additional resources)?" },
                        { name: "backupPersonnel", label: "Are there backup or alternate personnel designated for key roles to ensure continuity if primary members are unavailable?" },
                        { name: "roleAdaptation", label: "How is role adaptation managed in response to evolving incident dynamics or changes in the organization's structure?" },
                        { name: "roleTools", label: "What tools, resources, or access privileges are assigned to each role to facilitate their responsibilities during an incident?" },
                        { name: "softwareHardware", label: "Are there specific software or hardware resources required for different roles (e.g., forensic tools, communication equipment)?" },
                        { name: "toolsAccessManagement", label: "How is access to these tools and resources managed and secured to support effective incident response?" },
                        { name: "roleEvaluation", label: "How are the roles and responsibilities of the incident response team evaluated after an incident (e.g., debriefings, performance reviews)?" },
                        { name: "feedbackMechanisms", label: "What feedback mechanisms are in place to gather insights from team members and improve role definitions and procedures?" },
                        { name: "lessonsLearned", label: "How are lessons learned from past incidents used to refine role assignments and enhance the overall effectiveness of the response team?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "roleDefinition" || question.name === "roleAssignment" || question.name === "trainingRequirements" || question.name === "ongoingTraining" || question.name === "incidentProcedures" || question.name === "roleCoordination" || question.name === "communicationManagement" || question.name === "coordinationProtocols" || question.name === "externalCommunications" || question.name === "roleFlexibility" || question.name === "roleAdaptation" || question.name === "roleTools" || question.name === "softwareHardware" || question.name === "toolsAccessManagement" || question.name === "roleEvaluation" || question.name === "feedbackMechanisms" || question.name === "lessonsLearned" ? (
                                    <textarea
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange}
                                        /> No
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default IncidentResponseTeamRolesPage;