import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SecurityGuardsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSecurityGuardsImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
                <h1>Security Guards Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Security Guards Assessment</h2>
                    {[
                        { name: "training", label: "Have security guards received adequate training in security procedures, emergency response, and conflict resolution?" },
                        { name: "certified", label: "Are they certified or licensed to work as security personnel in your jurisdiction?" },
                        { name: "ongoingTraining", label: "Do they receive ongoing training to stay updated on security protocols and best practices?" },
                        { name: "professionalism", label: "Do security guards demonstrate professionalism, courtesy, and respect when interacting with students, staff, and visitors?" },
                        { name: "uniformed", label: "Are they properly uniformed and equipped to perform their duties effectively?" },
                        { name: "codesOfConduct", label: "Do they adhere to established codes of conduct and ethical standards?" },
                        { name: "vigilant", label: "Are security guards vigilant and observant of their surroundings, identifying and reporting any suspicious activities or security concerns?" },
                        { name: "patrols", label: "Do they conduct regular patrols and inspections of the premises to deter unauthorized access and monitor for potential threats?" },
                        { name: "incidentReports", label: "Are incident reports accurately documented and promptly submitted following security incidents or breaches?" },
                        { name: "emergencyResponse", label: "Are security guards trained to respond effectively to emergencies, such as medical emergencies, fires, or security breaches?" },
                        { name: "lockdownProcedures", label: "Do they know how to initiate lockdown procedures, evacuate occupants, and coordinate with emergency services?" },
                        { name: "communicationProtocols", label: "Are there established communication protocols for security guards to report emergencies and request assistance?" },
                        { name: "accessControl", label: "Do security guards enforce access control measures, verifying the identity of individuals and ensuring they have proper authorization to enter?" },
                        { name: "visitorManagement", label: "Are visitor management procedures in place, including registration, issuance of visitor badges, and monitoring of visitor activities?" },
                        { name: "confrontationalSituations", label: "Are security guards trained to handle confrontational situations or unauthorized entry attempts diplomatically and assertively?" },
                        { name: "collaboration", label: "Do security guards collaborate effectively with other stakeholders, such as school administrators, law enforcement, and emergency responders?" },
                        { name: "communicationDevices", label: "Are they able to communicate clearly and efficiently using two-way radios, phones, or other communication devices?" },
                        { name: "meetings", label: "Are there regular meetings or debriefings to discuss security issues, share information, and coordinate activities?" },
                        { name: "compliance", label: "Do security guards comply with relevant regulations, laws, and industry standards governing security operations?" },
                        { name: "regulatoryRequirements", label: "Are there specific requirements or guidelines for security guards outlined by regulatory authorities or industry associations that need to be met?" },
                        { name: "audits", label: "Are security guard services subject to audits, inspections, or certifications to verify compliance with applicable standards?" },
                        { name: "performanceEvaluation", label: "Is there a process for evaluating the performance of security guards, providing feedback, and addressing any areas for improvement?" },
                        { name: "incentives", label: "Are security guard contracts or agreements structured to incentivize high performance and accountability?" },
                        { name: "feedback", label: "Are there mechanisms for receiving feedback from students, staff, and visitors regarding the effectiveness and professionalism of security guards?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
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
                            </div>
                            <div>
                              <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                               />
                            </div>
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SecurityGuardsPage;