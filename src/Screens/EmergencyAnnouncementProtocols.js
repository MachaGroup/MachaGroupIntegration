import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Corrected import
import { getFunctions, httpsCallable } from 'firebase/functions'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

function EmergencyAnnouncementProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEmergencyAnnouncementProtocolsImage = httpsCallable(functions, 'uploadEmergencyAnnouncementProtocolsImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
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
                const uploadResult = await uploadEmergencyAnnouncementProtocolsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Emergency Announcement Protocols Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Emergency Announcement Protocols Assessment</h2>
                        {[
                            { name: "standardizedMessageTemplates", label: "Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?" },
                            { name: "essentialInfo", label: "Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?" },
                            { name: "scriptedEmergencyAnnouncements", label: "Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?" },
                            { name: "scriptsAvoidingConfusion", label: "Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?" },
                            { name: "appropriateAnnouncements", label: "Are announcements tailored to the intended audience, considering factors such as age, language proficiency, and cognitive ability?" },
                            { name: "structuredScriptedMessages", label: "Do scripted messages follow a structured format that includes key elements such as the type of emergency, location or affected area, recommended actions, and any follow-up instructions?" },
                            { name: "messagesProvidingGuidance", label: "Are messages designed to provide actionable guidance to occupants, helping them make informed decisions and respond effectively to the emergency situation?" },
                            { name: "reviewedScripts", label: "Are emergency announcement scripts reviewed and approved by appropriate authorities, such as safety officers, emergency management personnel, or legal advisors?" },
                            { name: "ensuringConsistency", label: "Is there a process for ensuring consistency and accuracy in scripted messages, including periodic updates to reflect changes in procedures, regulations, or best practices?" },
                            { name: "trainedIndividuals", label: "Are individuals responsible for delivering emergency announcements trained on the use of scripted messages and communication protocols?" },
                            { name: "trainingPrograms", label: "Do training programs include practice sessions to familiarize operators with different types of emergencies and associated message templates?" },
                            { name: "deliveringMessagesResources", label: "Are operators provided with resources, such as cue cards or reference guides, to assist them in delivering scripted messages accurately and confidently?" },
                            { name: "adaptableScriptedMessages", label: "Are scripted messages adaptable to accommodate variations in emergency scenarios, such as the scale, severity, or duration of the event?" },
                            { name: "FlexibilityInTemplates", label: "Is there flexibility built into message templates to allow for real-time updates or modifications based on evolving circumstances or new information?" },
                            { name: "evaluatedEffectiveness", label: "Are scripted messages evaluated for their effectiveness in conveying critical information and guiding appropriate responses during drills and actual emergencies?" },
                            { name: "solicitedFeedback", label: "Is feedback solicited from occupants and stakeholders to assess the clarity, comprehensibility, and usefulness of scripted messages?" },
                            { name: "recommendationsRefineMessages", label: "Are recommendations from evaluations used to refine scripted messages and improve their efficacy in future emergency situations?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "ensuringConsistency" ? (
                                        <>
                                            <input
                                                type="radio"
                                                name={question.name}
                                                value="yes"
                                                checked={formData[question.name] === "yes"}
                                                onChange={handleChange}
                                            /> Yes
                                            <input
                                                type="radio"
                                                name={question.name}
                                                value="no"
                                                checked={formData[question.name] === "no"}
                                                onChange={handleChange}
                                            /> No
                                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                            <input
                                                type="text"
                                                name={`${question.name}Process`}
                                                placeholder="Describe the process"
                                                value={formData[`${question.name}Process`] || ''}
                                                onChange={handleChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="radio"
                                                name={question.name}
                                                value="yes"
                                                checked={formData[question.name] === "yes"}
                                                onChange={handleChange}
                                            /> Yes
                                            <input
                                                type="radio"
                                                name={question.name}
                                                value="no"
                                                checked={formData[question.name] === "no"}
                                                onChange={handleChange}
                                            /> No
                                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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
        </div>
    );
}

export default EmergencyAnnouncementProtocolsFormPage;