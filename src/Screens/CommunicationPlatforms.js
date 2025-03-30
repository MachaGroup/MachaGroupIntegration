import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CommunicationPlatformsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCommunicationPlatformsFormPageImage = httpsCallable(functions, 'uploadCommunicationPlatformsFormPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
        }
    }, [buildingId, navigate]);

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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Communiation Platforms');
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Communiation Platforms');
            await addDoc(formsRef, {
                buildling: buildingRef,
                formData: formData,
            });
            console.log('From Data submitted successfully!');
            alert('Form Submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Communication Platforms Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Availability of Communication Platforms:</h2>
                    {[
                        { name: "CommPlatformEstablish", label: "Are designated communication platforms established to facilitate communication between the school or institution and parents/guardians during emergencies?", type: "radio" },
                        { name: "communicationPlatformEstablish", label: "Describe the designated communication platforms", type: "text", condition: formData.CommPlatformEstablish === "yes" },
                        { name: "PlatformChannelsUse", label: "Do communication platforms include various channels such as phone lines, messaging apps, email, or web portals?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <h2>Designation of Phone Lines:</h2>
                    {[
                        { name: "PhoneLineDesignate", label: "Are specific phone lines designated for parent communication during emergencies?", type: "radio" },
                        { name: "CommRedundancyAvail", label: "Is there a clear process for parents to access these designated phone lines, including published contact numbers and operating hours?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Redundancy and Backup Options:</h2>
                    {[
                        { name: "BackupOptionsDesc", label: "Are redundant communication options available in case of phone line failures or disruptions?", type: "radio" },
                        { name: "backupOptionsDesc", label: "Describe the redundant communication options", type: "text", condition: formData.BackupOptionsDesc === "yes" },
                        { name: "BackupPlatformsUse", label: "Are backup communication platforms such as messaging apps or email used to supplement phone lines and ensure reliable communication with parents?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <h2>Accessibility and Usability:</h2>
                    {[
                        { name: "PlatformAccessibility", label: "Are communication platforms accessible and user-friendly for parents of diverse backgrounds and abilities?", type: "radio" },
                        { name: "LanguageFormatsAvail", label: "Is information provided in multiple languages or formats to accommodate linguistic and accessibility needs?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Integration with Emergency Plans:</h2>
                    {[
                        { name: "IntegrationPlans", label: "Are designated communication platforms integrated into broader emergency communication and response plans?", type: "radio" },
                        { name: "EmergencyProcedures", label: "Are procedures established for using communication platforms to disseminate emergency notifications, updates, and instructions to parents during emergencies?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Testing and Verification:</h2>
                    {[
                        { name: "PlatformTesting", label: "Are communication platforms tested and verified periodically to ensure their functionality and reliability?", type: "radio" },
                        { name: "ScenarioSimulations", label: "Are test scenarios conducted to simulate emergency situations and assess the responsiveness and effectiveness of communication platforms?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Training and Familiarization:</h2>
                    {[
                        { name: "StaffTrainingComm", label: "Are staff members trained on how to use designated communication platforms for parent communication during emergencies?", type: "radio" },
                        { name: "StaffGuidelines", label: "Are resources or guidelines provided to assist staff members in effectively communicating with parents via designated communication channels?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" && (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>Feedback and Evaluation:</h2>
                    {[
                        { name: "ParentFeedback", label: "Are feedback mechanisms in place to gather input from parents regarding the usability, reliability, and effectiveness of communication platforms during emergencies?", type: "radio" },
                        { name: "parentFeedback", label: "Describe the feedback mechanisms", type: "text", condition: formData.ParentFeedback === "yes" },
                        { name: "ProtocolEnhancements", label: "Are recommendations for enhancing parent communication protocols and platforms considered and implemented based on feedback received?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                </div>
                            ) : question.condition ? (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label} onChange={handleChange} />
                                </div>
                            ) : null}
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

export default CommunicationPlatformsFormPage;