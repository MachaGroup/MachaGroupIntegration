import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function EmergencySheltersFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadEmergencySheltersImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Shelters', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Shelters', buildingId);
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
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Shelters', buildingId);
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
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Emergency Shelters Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Emergency Shelters Assessment</h2>
                    {[
                        { name: "shelterAgreements", label: "Are there agreements or partnerships established with local emergency shelters to provide assistance in the event of community-wide emergencies, disasters, or evacuations?" },
                        { name: "shelterIdentificationCriteria", label: "How are emergency shelters identified, selected, and vetted as suitable resources for providing temporary housing, support services, and basic necessities to individuals or families affected by emergencies or disasters?" },
                        { name: "shelterAccessibilityCriteria", label: "What criteria are considered when assessing the accessibility, capacity, and readiness of emergency shelters to accommodate diverse populations, including individuals with disabilities, medical needs, or language barriers?" },
                        { name: "emergencyCoordination", label: "How do schools coordinate with local emergency management agencies, government entities, or nonprofit organizations to incorporate emergency sheltering plans into broader community preparedness efforts?" },
                        { name: "emergencyDrills", label: "Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of emergency sheltering protocols, logistics, and communication procedures between schools and community partners?" },
                        { name: "communicationCoordinationMechanisms", label: "What mechanisms are in place to ensure ongoing communication, coordination, and mutual aid agreements between schools, emergency shelters, and other stakeholders involved in emergency response and recovery operations?" },
                        { name: "resourceAllocationMechanisms", label: "How are resources allocated and mobilized to support emergency sheltering operations, including staffing, supplies, equipment, and facilities management?" },
                        { name: "contingencyPlans", label: "Are contingency plans developed to address potential challenges or gaps in resources, such as shortages of shelter space, specialized medical equipment, or essential supplies during prolonged emergencies or mass evacuations?" },
                        { name: "shelterSupportServices", label: "What support services or accommodations are available at emergency shelters to meet the diverse needs of evacuees, including access to food, water, sanitation facilities, medical care, mental health support, and social services?" },
                        { name: "communityShelterInformation", label: "How are community members informed about the availability, location, and operational status of emergency shelters during emergencies or disasters?" },
                        { name: "shelterAwarenessOutreach", label: "Are outreach efforts conducted to raise awareness, provide guidance, and encourage individuals and families to make informed decisions about seeking shelter, evacuation, or other protective actions in response to imminent threats or hazards?" },
                        { name: "shelterInclusivityStrategies", label: "What strategies are employed to promote inclusivity, cultural competence, and accessibility in emergency sheltering services to ensure equitable access and support for vulnerable populations?" },
                        { name: "shelterEffectivenessEvaluation", label: "How is the effectiveness of emergency sheltering operations evaluated, monitored, and reviewed after incidents or exercises to identify lessons learned, best practices, and areas for improvement?" },
                        { name: "feedbackMechanisms", label: "Are feedback mechanisms in place to solicit input from evacuees, shelter staff, volunteers, and other stakeholders to assess the quality, responsiveness, and satisfaction with emergency sheltering services?" },
                        { name: "shelterImprovementActions", label: "What steps are taken to incorporate feedback, address identified challenges, and enhance the resilience, efficiency, and effectiveness of emergency sheltering systems within the community?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "emergencyDrills" || question.name === "shelterAwarenessOutreach" ? (
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
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            {question.name === "emergencyDrills" || question.name === "shelterAwarenessOutreach" ? (
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                />
                            ) : null}
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

export default EmergencySheltersFormPage;