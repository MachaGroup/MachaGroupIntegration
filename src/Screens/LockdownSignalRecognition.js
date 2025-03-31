import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function LockdownSignalRecognitionFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadLockdownSignalRecognitionImage = httpsCallable(functions, 'uploadLockdownSignalRecognitionImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Signal Recognition', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Signal Recognition', buildingId);
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
                const uploadResult = await uploadLockdownSignalRecognitionImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Signal Recognition', buildingId);
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
                <h1>Lockdown Signal Recognition Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Lockdown Signal Recognition Assessment</h2>
                    {[
                        { name: "Signal Training", label: "Are occupants trained to recognize the specific signals or alerts used to indicate a lockdown drill?" },
                        { name: "Distinct Alerts", label: "Are these signals clearly distinct from other emergency signals or alarms used within the facility?" },
                        { name: "standardizedMethod", label: "Is there a standardized method for signaling the start and end of lockdown drills to minimize confusion?" },
                        { name: "Protocol Established", label: "Are communication protocols established to inform occupants and staff members about upcoming lockdown drills?" },
                        { name: "Advance Notice", label: "Do these protocols include advance notice of drill schedules and procedures to prevent misunderstandings?" },
                        { name: "multiChannelSystem", label: "Is there a system in place for disseminating information about drill signals through multiple channels, such as emails, announcements, or signage?" },
                        { name: "Distinguish Signals", label: "Are occupants and staff members educated on the importance of distinguishing between drill signals and real threats?" },
                        { name: "Training Materials", label: "Are training materials provided to clarify the differences in response actions between drills and actual emergencies?" },
                        { name: "Drill Practice", label: "Are drills used as opportunities to reinforce signal recognition skills and practice appropriate responses?" },
                        { name: "Realistic Scenarios", label: "Are efforts made to simulate realistic scenarios during lockdown drills, including the use of authentic signals and procedures?" },
                        { name: "Mimic Challenges", label: "Are drills designed to mimic the conditions and challenges that occupants may encounter during real lockdown situations?" },
                        { name: "lockdownFeedbackMechanisms", label: "Are feedback mechanisms in place to assess the effectiveness of drill simulations in promoting signal recognition?" },
                        { name: "Feedback Gathered", label: "Is feedback gathered from occupants and staff members after each lockdown drill to assess signal recognition performance?" },
                        { name: "Debrief Sessions", label: "Are debriefing sessions conducted to discuss any confusion or errors in identifying drill signals and provide corrective guidance?" },
                        { name: "Feedback Improvements", label: "Are recommendations from feedback and evaluations used to improve signal recognition training and procedures?" },
                        { name: "Varying Conditions", label: "Are lockdown drills conducted under varying conditions to test occupants' ability to recognize signals in different contexts?" },
                        { name: "Unexpected Challenges", label: "Are drills designed to challenge occupants with unexpected changes or complexities to assess their adaptability and response capabilities?" },
                        { name: "Procedure Deviations", label: "Are deviations from standard drill procedures introduced occasionally to gauge occupants' alertness and readiness?" },
                        { name: "Drill Records", label: "Are records maintained to document the execution and outcomes of lockdown drills, including observations related to signal recognition?" },
                        { name: "Periodic Review", label: "Are drill records reviewed periodically to identify trends or recurring issues in signal recognition performance?" },
                        { name: "Corrective Actions", label: "Are corrective actions implemented based on review findings to address deficiencies and enhance signal recognition effectiveness?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "Signal Training" || question.name === "Distinct Alerts" || question.name === "Protocol Established" || question.name === "Advance Notice" || question.name === "Distinguish Signals" || question.name === "Training Materials" || question.name === "Drill Practice" || question.name === "Realistic Scenarios" || question.name === "Mimic Challenges" || question.name === "Feedback Gathered" || question.name === "Debrief Sessions" || question.name === "Feedback Improvements" || question.name === "Varying Conditions" || question.name === "Unexpected Challenges" || question.name === "Procedure Deviations" || question.name === "Drill Records" || question.name === "Periodic Review" || question.name === "Corrective Actions" ? (
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
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
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

export default LockdownSignalRecognitionFormPage;