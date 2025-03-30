import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function LawEnforcementCoordinationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadLawEnforcementCoordinationImage = httpsCallable(functions, 'uploadLawEnforcementCoordinationImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);
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
                const uploadResult = await uploadLawEnforcementCoordinationImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);
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
                <h1>Law Enforcement Coordination Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Law Enforcement Coordination Assessment</h2>
                    {[
                        { name: "facilityLawCommunicationChannels", label: "Are there established communication channels between the facility and local law enforcement agencies?" },
                        { name: "Facility-LawPOCs", label: "Are there designated points of contact within the facility and law enforcement for emergency coordination?" },
                        { name: "communicationProtocolsAccessible", label: "Are communication protocols documented and readily accessible to relevant personnel?" },
                        { name: "emergencyNotifyProtocol", label: "Is there a protocol in place for notifying law enforcement agencies in the event of emergencies?" },
                        { name: "lawContactMethods", label: "Are there predefined methods for contacting law enforcement, such as phone calls, emails, or dedicated emergency lines?" },
                        { name: "StaffLawComTraining", label: "Are staff members trained on when and how to initiate contact with law enforcement and what information to provide?" },
                        { name: "ResponseTimeDefined", label: "Are response time expectations clearly defined and communicated to law enforcement agencies?" },
                        { name: "ResponseTimeBenchmarks", label: "Have response time benchmarks been established based on the facility's location, size, and potential risks?" },
                        { name: "ResponseTimeTracking", label: "Is there a mechanism for tracking and evaluating law enforcement response times during emergencies?" },
                        { name: "CollabPlanningMeetings", label: "Are there regular meetings or exercises conducted with law enforcement agencies to review emergency response plans and coordination procedures?" },
                        { name: "TabletopExercises", label: "Do tabletop exercises or simulations involve law enforcement agencies to test coordination and communication during various emergency scenarios?" },
                        { name: "ExerciseFeedbackUsage", label: "Are feedback and lessons learned from joint exercises used to improve coordination and response capabilities?" },
                        { name: "informationSharingProtocol", label: "Is there a protocol for sharing relevant information with law enforcement agencies during emergencies?" },
                        { name: "InfoSharingTraining", label: "Are staff members trained to provide accurate and timely information to law enforcement responders?" },
                        { name: "secureInformationSharing", label: "Is there a secure method for sharing sensitive or confidential information with law enforcement agencies, if necessary?" },
                        { name: "MutualAidExistence", label: "Does the facility have mutual aid agreements or partnerships with neighboring law enforcement agencies?" },
                        { name: "MutualAidReview", label: "Are mutual aid agreements documented and reviewed periodically to ensure they align with current needs and resources?" },
                        { name: "mutualAidActivation", label: "Is there a process for activating mutual aid support from other agencies during large-scale emergencies or resource-intensive incidents?" },
                        { name: "PostIncidentDebriefs", label: "Are debriefing sessions conducted after emergency incidents to review the effectiveness of law enforcement coordination and response?" },
                        { name: "LawEnforcementInvolvement", label: "Are representatives from law enforcement agencies involved in post-incident debriefings to provide feedback and insights?" },
                        { name: "DebriefingRecommendations", label: "Are recommendations from debriefing sessions implemented to improve coordination and response procedures for future incidents?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "Facility-LawPOCs" || question.name === "StaffLawComTraining" || question.name === "ResponseTimeDefined" || question.name === "ResponseTimeBenchmarks" || question.name === "ResponseTimeTracking" || question.name === "CollabPlanningMeetings" || question.name === "TabletopExercises" || question.name === "ExerciseFeedbackUsage" || question.name === "InfoSharingTraining" || question.name === "MutualAidExistence" || question.name === "MutualAidReview" || question.name === "PostIncidentDebriefs" || question.name === "LawEnforcementInvolvement" || question.name === "DebriefingRecommendations" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={`${question.name.split('-')[0]}`}
                                            value="yes"
                                            checked={formData[`${question.name.split('-')[0]}`] === "yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={`${question.name.split('-')[0]}`}
                                            value="no"
                                            checked={formData[`${question.name.split('-')[0]}`] === "no"}
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

export default LawEnforcementCoordinationFormPage;