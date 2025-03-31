import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DebriefingAndFeedbackFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDebriefingAndFeedbackFormPageImage = httpsCallable(functions, 'uploadDebriefingAndFeedbackFormPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        } else {
            loadFormData();
        }
    }, [buildingId, navigate]);

    const loadFormData = async () => {
        setLoading(true);
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Emergency Preparedness/Debriefing and Feedback');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error loading form data:', error);
        } finally {
            setLoading(false);
        }
    };

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
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Emergency Preparedness/Debriefing and Feedback');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Emergency Preparedness/Debriefing and Feedback', docId);
                    await setDoc(formDocRef, {
                        building: buildingRef,
                        formData: formData,
                    }, { merge: true });
                }
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Emergency Preparedness/Debriefing and Feedback');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Emergency Preparedness/Debriefing and Feedback', docId);
                await setDoc(formDocRef, {
                    building: buildingRef,
                    formData: formData,
                }, { merge: true });
            }
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Debriefing and Feedback Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Debriefing Process:</h2>
                    {[
                        { name: "structuredDebriefing", label: "Is there a structured process for conducting debriefing sessions after drills, including designated timeframes and locations?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "structuredDebriefingProcess", label: "Describe the process:", type: "text", securityGatesFormat: true },
                        { name: "facilitatorTraining", label: "Are debriefing sessions facilitated by trained personnel, such as safety officers or drill coordinators, to ensure effectiveness and objectivity?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "stakeholderParticipation", label: "Are all relevant stakeholders, including staff members, occupants, and management personnel, invited to participate in debriefing sessions?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "objectiveEstablishment", label: "Are clear objectives established for debriefing sessions, such as assessing performance, identifying strengths and areas for improvement, and capturing lessons learned?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "objectiveEstablishmentDescription", label: "Describe the sessions:", type: "text", securityGatesFormat: true },
                        { name: "outcomeFocus", label: "Are debriefing sessions focused on achieving specific outcomes, such as enhancing preparedness, refining procedures, or addressing deficiencies identified during drills?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "participantContribution", label: "Are participants encouraged to actively contribute to debriefing sessions by sharing their observations, experiences, and feedback?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "feedbackSolicitation", label: "Is feedback solicited from participants on various aspects of drill execution, including communication, coordination, procedures, and individual performance?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "facilitatorSkills", label: "Are facilitators skilled in promoting open communication and constructive dialogue among participants during debriefing sessions?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "observationRecords", label: "Are detailed notes or records maintained during debriefing sessions to capture key observations, insights, and recommendations?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "structuredDocumentation", label: "Are observations documented in a structured format to facilitate analysis, follow-up actions, and integration into future planning and training efforts?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "stakeholderAccess", label: "Are records of debriefing sessions accessible to relevant stakeholders for reference and review?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "actionableItems", label: "Are actionable items identified during debriefing sessions to address deficiencies, capitalize on strengths, and implement improvements identified during drills?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "priorityAssessment", label: "Are action items prioritized based on their urgency, impact on safety, and feasibility of implementation?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "responsibilityAssignment", label: "Are responsible parties assigned to each action item, along with target completion dates and follow-up mechanisms to track progress?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "trackingProcess", label: "Is there a process for tracking the implementation of action items resulting from debriefing sessions?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "trackingProcessDescription", label: "Describe the process:", type: "text", securityGatesFormat: true },
                        { name: "accountabilityMechanism", label: "Are responsible parties held accountable for completing assigned action items within established timelines?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "progressUpdates", label: "Are progress updates provided to stakeholders on the status of action item implementation, including any challenges encountered and lessons learned?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "drivingImprovements", label: "Are recommendations from debriefing sessions used to drive continuous improvement in emergency preparedness and response capabilities?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "feedbackIntegration", label: "Are debriefing sessions integrated into a broader feedback loop to ensure that lessons learned from drills are incorporated into training, planning, and policy development?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "insightSharing", label: "Are opportunities sought to share insights and best practices identified during debriefing sessions with relevant stakeholders across the organization?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

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

export default DebriefingAndFeedbackFormPage;