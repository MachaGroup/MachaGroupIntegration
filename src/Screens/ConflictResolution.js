import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ConflictResolutionFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadConflictResolutionFormPageImage = httpsCallable(functions, 'uploadConflictResolutionFormPageImage');

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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Conflict Resolution');
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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Conflict Resolution');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Emergency Preparedness/Conflict Resolution', docId);
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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Conflict Resolution');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Emergency Preparedness/Conflict Resolution', docId);
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
                <h1>Conflict Resolution Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Training and Skills:</h2>
                    {[
                        { name: "conflictResolution", label: "Are security personnel trained in conflict resolution techniques, including de-escalation strategies?", type: "radio", options: ["yes", "no"] },
                        { name: "specializedTraining", label: "Have they received specialized training to handle diverse conflict scenarios effectively?", type: "radio", options: ["yes", "no"] },
                        { name: "securityPersonnelSkills", label: "Do security personnel possess the necessary communication and interpersonal skills to manage conflicts professionally and calmly?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Recognition and Assessment:</h2>
                    {[
                        { name: "trainedSecurity", label: "Are security personnel trained to recognize early signs of potential conflicts or escalating situations?", type: "radio", options: ["yes", "no"] },
                        { name: "assessingSeverityOfConflicts", label: "Do they assess the nature and severity of conflicts quickly and accurately?", type: "radio", options: ["yes", "no"] },
                        { name: "appropiateResponseProtocols", label: "Are there protocols in place for security personnel to determine appropriate responses based on the level of conflict and potential risks involved?", type: "radio", options: ["yes", "no"] },
                        { name: "appropiateResponseProtocolsText", label: "Describe the protocols", type: "text" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>De-escalation Techniques:</h2>
                    {[
                        { name: "de-escalationTechinques", label: "Do security personnel employ de-escalation techniques to defuse tensions and reduce the intensity of conflicts?", type: "radio", options: ["yes", "no"] },
                        { name: "composedTraining", label: "Are they trained to remain calm and composed while interacting with individuals involved in conflicts?", type: "radio", options: ["yes", "no"] },
                        { name: "securityAddressingIssues", label: "Do security personnel use active listening, empathy, and effective communication to address underlying issues and resolve conflicts peacefully?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Physical Restraint and Intervention:</h2>
                    {[
                        { name: "restraintTechniquesTraining", label: "Are security personnel trained in safe and effective physical restraint techniques, if necessary?", type: "radio", options: ["yes", "no"] },
                        { name: "physicalInterventionLastResort", label: "Do they use physical intervention as a last resort, only when other de-escalation strategies have been exhausted?", type: "radio", options: ["yes", "no"] },
                        { name: "physicalInterventionProtocols", label: "Are there protocols in place to ensure that physical intervention is performed in a manner that minimizes the risk of injury to all parties involved?", type: "radio", options: ["yes", "no"] },
                        { name: "physicalInterventionProtocolsText", label: "Describe the protocols", type: "text" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Teamwork and Collaboration:</h2>
                    {[
                        { name: "collaborateSecurityTraining", label: "Are security personnel trained to work collaboratively with colleagues, emergency responders, and other stakeholders during crisis situations?", type: "radio", options: ["yes", "no"] },
                        { name: "coordinatingEffortsEffectively", label: "Do they coordinate their efforts effectively to manage conflicts and ensure the safety of individuals and property?", type: "radio", options: ["yes", "no"] },
                        { name: "clearCommunication", label: "Is there clear communication and coordination between security personnel and other teams involved in emergency response?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Documentation and Reporting:</h2>
                    {[
                        { name: "conflictResolutionDocumentation", label: "Are incidents involving conflict resolution documented accurately and promptly?", type: "radio", options: ["yes", "no"] },
                        { name: "standardizedReportingProcess", label: "Is there a standardized reporting process for documenting details of conflicts, interventions, and outcomes?", type: "radio", options: ["yes", "no"] },
                        { name: "standardizedReportingProcessText", label: "Describe the reporting process", type: "text" },
                        { name: "reviewingReports", label: "Are reports reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Continuous Improvement:</h2>
                    {[
                        { name: "conflictResolutionTraining", label: "Is there ongoing training and development for security personnel to enhance their conflict resolution skills?", type: "radio", options: ["yes", "no"] },
                        { name: "conductedDebriefings", label: "Are debriefings conducted after incidents to evaluate responses, identify lessons learned, and implement corrective actions?", type: "radio", options: ["yes", "no"] },
                        { name: "feedbackImprovingStrategies", label: "Is feedback from security personnel and stakeholders used to improve conflict resolution strategies and procedures over time?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
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

export default ConflictResolutionFormPage;