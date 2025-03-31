import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function LawEnforcementPartnershipFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadLawEnforcementPartnershipImage = httpsCallable(functions, 'uploadLawEnforcementPartnershipImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Law Enforcement Partnerships', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Law Enforcement Partnerships', buildingId);
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
                const uploadResult = await uploadLawEnforcementPartnershipImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Law Enforcement Partnerships', buildingId);
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
                <h1>Law Enforcement Partnership Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Law Enforcement Partnership Assessment</h2>
                    {[
                        { name: "partnershipEstablishment", label: "How is the partnership between the school or educational institution and local law enforcement agencies established, formalized, and maintained?" },
                        { name: "partnershipGoals", label: "What specific goals, objectives, or areas of collaboration are outlined in the partnership agreement or memorandum of understanding (MOU) between the school and law enforcement?" },
                        { name: "rolesResponsibilities", label: "Are roles, responsibilities, and expectations clearly defined for both parties regarding their respective contributions to enhancing school safety, emergency preparedness, and response efforts?" },
                        { name: "trainingFrequency", label: "How frequently do school staff, administrators, and law enforcement personnel participate in joint training exercises, drills, or simulations to prepare for various emergency scenarios?" },
                        { name: "trainingActivities", label: "What types of training activities are conducted collaboratively, such as active shooter drills, tabletop exercises, or scenario-based simulations, to improve coordination and communication between school and law enforcement personnel?" },
                        { name: "trainingTailoring", label: "Are training sessions tailored to address specific needs, challenges, or vulnerabilities identified through risk assessments, security audits, or incident debriefs?" },
                        { name: "communicationMethods", label: "How do school administrators and law enforcement agencies communicate and share information regarding potential threats, safety concerns, or suspicious activities identified within the school community?" },
                        { name: "reportingProtocols", label: "Are protocols established for reporting, documenting, and responding to security incidents, behavioral indicators, or other warning signs that may pose a risk to school safety?" },
                        { name: "privacyMeasures", label: "What measures are in place to protect the privacy, confidentiality, and legal rights of students and staff while facilitating information sharing and collaboration between the school and law enforcement?" },
                        { name: "resourcesSupport", label: "What resources, support services, or technical assistance are provided by law enforcement agencies to augment school safety initiatives, emergency response capabilities, or crime prevention efforts?" },
                        { name: "securityPersonnelTraining", label: "Are school security personnel, administrators, or designated staff members trained to interface with law enforcement during emergencies, incidents, or law enforcement interventions on campus?" },
                        { name: "collaborationStrategies", label: "How does the school administration collaborate with law enforcement agencies to leverage community policing strategies, crime prevention programs, or outreach initiatives aimed at enhancing school security and fostering positive relationships with students and families?" },
                        { name: "effectivenessEvaluation", label: "How is the effectiveness of the partnership with local law enforcement agencies evaluated, monitored, and assessed over time?" },
                        { name: "feedbackMechanisms", label: "Are mechanisms in place to solicit feedback from school stakeholders, law enforcement personnel, and community members regarding the impact, strengths, and areas for improvement in the collaboration between the school and law enforcement?" },
                        { name: "partnershipRefinement", label: "What strategies or measures are implemented to address challenges, adapt to changing circumstances, and refine partnership approaches based on lessons learned, best practices, or emerging trends in school safety and security?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "trainingTailoring" || question.name === "securityPersonnelTraining" ? (
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

export default LawEnforcementPartnershipFormPage;