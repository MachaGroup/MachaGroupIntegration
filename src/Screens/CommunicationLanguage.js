import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CommunicationLanguageFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCommunicationLanguageFormPageImage = httpsCallable(functions, 'uploadCommunicationLanguageFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'communication language', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'communication language', buildingId);
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
                const uploadResult = await uploadCommunicationLanguageFormPageImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'communication language', buildingId);
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
                <h1>Communication Language Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Language Diversity Assessment:</h2>
                    {[
                        { name: "LanguageAssessConducted", label: "Has an assessment been conducted to identify the language diversity among parents/guardians within the community?", type: "radio" },
                        { name: "LanguagePrevalenceIdentified", label: "Are there multiple languages spoken among the parent population, and if so, which languages are most prevalent?", type: "radio" },
                        { name: "languagePrevalanceIdentified", label: "List the languages", type: "text", condition: formData.LanguagePrevalenceIdentified === "yes" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <h2>Multilingual Notification Capability:</h2>
                    {[
                        { name: "MultiLangNotifyCapable", label: "Does the communication system have the capability to send notifications in multiple languages?", type: "radio" },
                        { name: "NotifyLangCustomizable", label: "Are there features or settings within the system that allow for the customization of notification language based on recipient preferences or profile information?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Translation Services:</h2>
                    {[
                        { name: "TranslationServicesAvail", label: "Are translation services or resources available to facilitate the translation of emergency notifications into different languages?", type: "radio" },
                        { name: "TranslationProcessDefined", label: "Is there a process in place for obtaining professional translation services or engaging bilingual staff members to assist with translation efforts?", type: "radio" },
                        { name: "translationProcessDefined", label: "Describe the process", type: "text", condition: formData.TranslationProcessDefined === "yes" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <h2>Standardized Message Templates:</h2>
                    {[
                        { name: "TemplatesMultiLangReady", label: "Are standardized message templates developed for various types of emergencies, and do these templates include translations in multiple languages?", type: "radio" },
                        { name: "TranslationAccuracyMaintained", label: "Do translated messages maintain consistency and accuracy with the original message content?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Accessibility and Inclusivity:</h2>
                    {[
                        { name: "LimitedEnglishAccessibility", label: "Are efforts made to ensure that emergency notifications are accessible and inclusive for parents/guardians with limited English proficiency?", type: "radio" },
                        { name: "AltCommunicationMethods", label: "Are alternative communication methods or formats provided for parents/guardians who may require assistance with understanding notifications in a non-primary language?", type: "radio" },
                        { name: "altCommunicationMethods", label: "Describe the alternative methods", type: "text", condition: formData.AltCommunicationMethods === "yes" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <h2>Community Engagement:</h2>
                    {[
                        { name: "ParentsInformedMultilang", label: "Are parents/guardians informed about the availability of multilingual notifications, and are they encouraged to indicate their language preferences?", type: "radio" },
                        { name: "CommunityEngagementEfforts", label: "Are efforts made to engage with community organizations, cultural liaisons, or parent advisory groups to gather input and feedback on language accessibility and inclusivity?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Testing and Verification:</h2>
                    {[
                        { name: "MultiLangTestingDone", label: "Are multilingual notification capabilities tested and verified periodically to ensure their functionality and effectiveness?", type: "radio" },
                        { name: "TranslationTestScenarios", label: "Are test scenarios conducted to assess the clarity, comprehensibility, and appropriateness of translated messages across different languages?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Continuous Improvement:</h2>
                    {[
                        { name: "FeedbackMechanismsExist", label: "Are feedback mechanisms in place to gather input from parents/guardians regarding the accessibility and effectiveness of multilingual notifications?", type: "radio" },
                        { name: "feedbackMechansismsExist", label: "Describe the feedback mechanisms", type: "text", condition: formData.FeedbackMechanismsExist === "yes" },
                        { name: "EnhancementFeedbackUsed", label: "Are recommendations for enhancing multilingual notification protocols and practices considered and implemented based on feedback received?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            ) : null}
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

export default CommunicationLanguageFormPage;