import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function PhishingAwareness2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPhishingAwareness2FormPageImage = httpsCallable(functions, 'uploadPhishingAwareness2FormPageImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Phishing Awareness', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Phishing Awareness', buildingId);
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
                const uploadResult = await uploadPhishingAwareness2FormPageImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Phishing Awareness', buildingId);
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
                <h1>3.1.1.4.2.1 Phishing Awareness Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>3.1.1.4.2.1.1 Recognizing Phishing Attempts:</h2>
                    {[
                        { name: "phishingTrainingRecognition", label: "Are staff members trained to recognize common indicators of phishing attempts, such as unsolicited emails requesting sensitive information, urgent requests for account credentials, or messages containing suspicious links or attachments?" },
                        { name: "phishingRedFlags", label: "What specific characteristics or red flags are emphasized during training as potential signs of phishing, such as misspelled or unfamiliar sender addresses, generic greetings, grammatical errors, or requests for confidential data?" },
                        { name: "phishingCautionEducation", label: "How are staff members educated on the importance of exercising caution and skepticism when interacting with email messages, especially those prompting them to disclose personal information or take immediate action without verification?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "phishingTrainingRecognition" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the characteristics/red flags") ? "Describe the characteristics/red flags" : "Describe how they're educated"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.1.2 Response Protocols and Procedures:</h2>
                    {[
                        { name: "phishingResponseProtocols", label: "Are clear response protocols and procedures established for staff members to follow in the event of encountering a suspected phishing email or cyber threat, including steps to report the incident, mitigate risks, and safeguard sensitive information?" },
                        { name: "phishingResponseTraining", label: "How are staff members trained to respond effectively to phishing attempts, such as refraining from clicking on suspicious links or attachments, verifying the authenticity of sender identities, and forwarding suspicious emails to designated IT or security personnel for analysis?" },
                        { name: "phishingRolesAndResponsibilities", label: "What measures are in place to ensure that staff members understand their roles and responsibilities in preventing, detecting, and responding to phishing attacks, including the escalation of incidents to appropriate authorities for further investigation and remediation?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="text" name={question.name} placeholder={question.label.includes("Describe the protocols/procedures") ? "Describe the protocols/procedures" : question.label.includes("Describe how they're trained") ? "Describe how they're trained" : "Describe the measures"} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}

                    <h2>3.1.1.4.2.1.3 Phishing Simulation Exercises:</h2>
                    {[
                        { name: "phishingSimulationOpportunities", label: "Are staff members provided with opportunities to participate in simulated phishing exercises or awareness campaigns designed to mimic real-world phishing scenarios and test their ability to recognize and respond to phishing threats?" },
                        { name: "phishingSimulationDescription", label: "How do phishing simulation exercises simulate various phishing techniques and tactics, challenge staff members' ability to differentiate between legitimate and fraudulent emails, and reinforce best practices for mitigating phishing risks?" },
                        { name: "phishingSimulationFeedback", label: "What feedback mechanisms are utilized to evaluate staff members' performance during phishing simulation exercises, track their progress in identifying phishing attempts, and provide targeted guidance or training to address areas for improvement?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "phishingSimulationOpportunities" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe how they simulate") ? "Describe how they simulate" : "Describe the mechanisms"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.1.4 Educational Resources and Awareness Materials:</h2>
                    {[
                        { name: "phishingEducationalResources", label: "Are educational resources, awareness materials, or interactive modules available to staff members to enhance their understanding of phishing threats, cybersecurity best practices, and proactive measures for safeguarding sensitive information?" },
                        { name: "phishingResourceAccess", label: "How are staff members provided with access to informational resources, instructional videos, or online tutorials covering topics such as email security, password hygiene, two-factor authentication, and safe browsing habits to reinforce phishing awareness and prevention strategies?" },
                        { name: "phishingEngagementStrategies", label: "What strategies are employed to promote ongoing engagement and awareness among staff members regarding emerging phishing trends, evolving cyber threats, and recommended countermeasures to protect against phishing attacks in a dynamic threat landscape?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "phishingEducationalResources" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe how they're provided") ? "Describe how they're provided" : "Describe the strategies"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.1.5 Reporting and Incident Management:</h2>
                    {[
                        { name: "phishingReportingProcedures", label: "Are staff members informed of the procedures for reporting suspected phishing emails or cyber incidents to designated IT or security personnel for investigation and response?" },
                        { name: "phishingReportingEncouragement", label: "How are staff members encouraged to promptly report phishing attempts, security breaches, or suspicious activities through established reporting channels, incident response mechanisms, or incident management systems?" },
                        { name: "phishingIncidentManagement", label: "What mechanisms are in place to facilitate timely analysis, triage, and resolution of reported phishing incidents, including communication with affected individuals, containment of threats, and implementation of corrective actions to prevent recurrence?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "phishingReportingProcedures" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe how they're encouraged") ? "Describe how they're encouraged" : "Describe the mechanisms"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PhishingAwareness2FormPage;