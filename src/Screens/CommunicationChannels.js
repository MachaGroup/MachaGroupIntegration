import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CommunicationChannelsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCommunicationChannelsImage = httpsCallable(functions, 'uploadCommunicationChannelsImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadCommunicationChannelsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
                <h1>Communication Channels Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Designation of Communication Channels:</h2>
                    {[
                        { name: "designatedCommunicationChannels", label: "Are specific communication channels designated for different types of communication needs, such as emergency communication, general staff communication, or coordination between departments?" },
                        { name: "clearDelineation", label: "Is there a clear delineation of the purpose and usage guidelines for each communication channel?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Emergency Communication Frequency:</h2>
                    {[
                        { name: "reservedFrequency", label: "Is there a designated frequency or channel specifically reserved for emergency communication purposes?" },
                        { name: "trainedStaffEmergency", label: "Are staff members trained on how to access and utilize the designated emergency communication channel during emergencies?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Channel Management and Coordination:</h2>
                    {[
                        { name: "managingProtocol", label: "Is there a protocol for managing and coordinating communication channels to prevent interference and ensure clear communication during emergencies?" },
                        { name: "reallocatingProcedures", label: "Are procedures established for reallocating or reassigning communication channels as needed to adapt to changing circumstances or address technical issues?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Compatibility with Equipment:</h2>
                    {[
                        { name: "compatibleChannels", label: "Are communication channels selected or configured to be compatible with the communication equipment used by staff members, such as two-way radios or mobile devices?" },
                        { name: "compatibilityTesting", label: "Is there compatibility testing conducted to verify interoperability and functionality across different devices and communication channels?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Redundancy and Contingency Planning:</h2>
                    {[
                        { name: "redundantCommunicationChannels", label: "Are redundant communication channels or backup options available to mitigate the risk of channel failure or disruption during emergencies?" },
                        { name: "contingencyPlan", label: "Is there a contingency plan in place for switching to alternative communication channels if primary channels become unavailable or compromised?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Training and Familiarization:</h2>
                    {[
                        { name: "trainedStaffTraining", label: "Are staff members trained on how to access, select, and utilize communication channels effectively, particularly during emergencies?" },
                        { name: "practiceSessions", label: "Are practice sessions or drills conducted to familiarize staff members with communication channel protocols and simulate emergency scenarios?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Integration with Emergency Plans:</h2>
                    {[
                        { name: "integratedCommunicationChannels", label: "Are designated communication channels integrated into broader emergency communication and response plans, ensuring alignment with overall emergency protocols?" },
                        { name: "incorporatingChannelProcedures", label: "Are there designated procedures for incorporating communication channel usage into emergency drills, exercises, and simulations to assess effectiveness and identify areas for improvement?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Continuous Improvement:</h2>
                    {[
                        { name: "feedbackMechanisms", label: "Are feedback mechanisms in place to gather input from staff members regarding the usability, reliability, and effectiveness of communication channels during emergencies?" },
                        { name: "enhancingRecommendations", label: "Are recommendations for enhancing communication channel protocols and infrastructure considered and implemented as part of ongoing improvement efforts?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default CommunicationChannelsFormPage;