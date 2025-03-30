import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DisasterDrillsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDisasterDrillsFormPageImage = httpsCallable(functions, 'uploadDisasterDrillsFormPageImage');

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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Disaster Drills');
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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Disaster Drills');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Emergency Preparedness/Disaster Drills', docId);
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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Disaster Drills');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Emergency Preparedness/Disaster Drills', docId);
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
                <h1>Disaster Drills Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Drill Frequency:</h2>
                    {[
                        { name: "conductedDisasterDrills", label: "2.2.1.3.1. Disaster Drills: How often are disaster drills conducted within the facility?", type: "text", securityGatesFormat: true },
                        { name: "Scheduled Drills", label: "2.2.1.3.1. Disaster Drills: Are drills scheduled regularly to ensure all occupants are familiar with emergency procedures?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Drill Rotation", label: "2.2.1.3.1. Disaster Drills: Are different types of disaster drills (e.g., tornado, earthquake, fire) rotated throughout the year?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Scenario Variety:</h2>
                    {[
                        { name: "Scenario Relevance", label: "2.2.1.3.1. Disaster Drills: Do disaster drills cover a variety of natural disaster scenarios that are relevant to the facility's geographical location and risk profile?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Realistic Scenarios", label: "2.2.1.3.1. Disaster Drills: Are drills tailored to simulate realistic scenarios, including variations in severity and impact?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Learned Lessons", label: "2.2.1.3.1. Disaster Drills: Are lessons learned from past incidents or drills used to inform future drill scenarios?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Participant Engagement:</h2>
                    {[
                        { name: "Occupant Participation", label: "2.2.1.3.1. Disaster Drills: Are all occupants, including staff members, students, visitors, and contractors, actively involved in disaster drills?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Action Practice", label: "2.2.1.3.1. Disaster Drills: Do drills engage participants in practicing specific actions and responses, such as evacuation, sheltering, or emergency communication?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Role Assignment", label: "2.2.1.3.1. Disaster Drills: Are designated individuals assigned roles and responsibilities during drills to facilitate coordination and leadership?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "roleAssignment", label: "2.2.1.3.1. Disaster Drills: List individuals and assigned roles", type: "text", securityGatesFormat: true },
                    ]}

                    <h2>Evacuation Procedures:</h2>
                    {[
                        { name: "Evacuation Practice", label: "2.2.1.3.1. Disaster Drills: Are evacuation procedures clearly communicated and practiced during disaster drills?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Route Review", label: "2.2.1.3.1. Disaster Drills: Are evacuation routes identified, marked, and regularly reviewed for safety and accessibility?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "Condition Testing", label: "2.2.1.3.1. Disaster Drills: Are drills conducted to assess the effectiveness of evacuation procedures under various conditions, such as different times of day or occupancy levels?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Sheltering Protocols:</h2>
                    {[
                        { name: "Sheltering Setup", label: "2.2.1.3.1. Disaster Drills: Are sheltering procedures established for scenarios where evacuation may not be feasible or safe, such as during severe weather events?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "shelteringSetup", label: "2.2.1.3.1. Disaster Drills: Describe the procedures", type: "text", securityGatesFormat: true },
                        { name: "Shelter Details", label: "2.2.1.3.1. Disaster Drills: Are designated shelter areas identified and equipped with necessary supplies and resources to support occupants during emergencies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "shelterDetails", label: "2.2.1.3.1. Disaster Drills: Describe the shelter areas", type: "text", securityGatesFormat: true },
                        { name: "Drill Sheltering", label: "2.2.1.3.1. Disaster Drills: Are drills conducted to practice sheltering procedures and assess the suitability of designated shelter areas?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Communication and Notification:</h2>
                    {[
                        { name: "Drill Notification", label: "2.2.1.3.1. Disaster Drills: Is there a protocol for initiating and communicating disaster drills to all occupants?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "drillNotification", label: "2.2.1.3.1. Disaster Drills: Describe the protocol", type: "text", securityGatesFormat: true },
                        { name: "System Testing", label: "2.2.1.3.1. Disaster Drills: Are communication systems, such as public address systems or emergency notifications, tested during drills?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "External Coordination", label: "2.2.1.3.1. Disaster Drills: Are drills used as opportunities to practice communication and coordination with external emergency responders or authorities?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Evaluation and Improvement:</h2>
                    {[
                        { name: "Drill Evaluation", label: "2.2.1.3.1. Disaster Drills: Is there a process for evaluating the effectiveness of disaster drills and identifying areas for improvement?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "drillEvaluation", label: "2.2.1.3.1. Disaster Drills: Describe the process", type: "text", securityGatesFormat: true },
                        { name: "Feedback Collection", label: "2.2.1.3.1. Disaster Drills: Are feedback mechanisms in place to gather input from participants and observers on drill performance?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "feedbackCollection", label: "2.2.1.3.1. Disaster Drills: Describe the feedback mechanisms", type: "text", securityGatesFormat: true },
                        { name: "Outcome Updates", label: "2.2.1.3.1. Disaster Drills: Are drill outcomes used to update and refine natural disaster plans, procedures, and training materials?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
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

export default DisasterDrillsFormPage;