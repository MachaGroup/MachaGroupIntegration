import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function RecognizingSecurityBreachesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadRecognizingSecurityBreachesImage = httpsCallable(functions, 'uploadRecognizingSecurityBreachesImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recognizing Security Breaches', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recognizing Security Breaches', buildingId);
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
                const uploadResult = await uploadRecognizingSecurityBreachesImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recognizing Security Breaches', buildingId);
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

    const questions = [
        { name: "securityVulnerabilityTraining", label: "Are staff members trained to identify and recognize common security vulnerabilities, weaknesses, or gaps in physical security measures, access controls, or surveillance systems that could be exploited by intruders or unauthorized individuals?", type: "radio" },
        { name: "securityIndicators", label: "What specific indicators or warning signs are emphasized during training as potential evidence of security breaches, such as unauthorized access points, tampered locks, broken windows, or unexplained disruptions to normal operations? (Describe the indicators/warning signs)", type: "text" },
        { name: "proactiveEducation", label: "How are staff members educated on the importance of maintaining a proactive and vigilant stance towards security, actively monitoring their surroundings, and promptly reporting any deviations from established security protocols or procedures? (Describe how they're educated)", type: "text" },
        { name: "responseProtocols", label: "Are clear response protocols and procedures established for staff members to follow in the event of a suspected security breach, unauthorized access attempt, or breach of perimeter security? (Describe the protocols/procedures)", type: "text" },
        { name: "responseTraining", label: "How are staff members trained to respond effectively and decisively to security breaches, including actions such as initiating lockdown procedures, activating alarm systems, alerting security personnel or law enforcement authorities, and directing occupants to safe locations? (Describe how they're trained)", type: "text" },
        { name: "roleCoordination", label: "What measures are in place to ensure that staff members understand their roles and responsibilities during security incidents, coordinate their actions with other team members, and communicate critical information to facilitate a prompt and coordinated response? (Describe the measures)", type: "text" },
        { name: "deviceFamiliarization", label: "Are staff members provided with training on the proper use, operation, and troubleshooting of security devices, such as access control systems, surveillance cameras, intrusion detection sensors, or alarm systems?", type: "radio" },
        { name: "deviceMalfunctionRecognition", label: "How are staff members instructed to recognize abnormal behavior or indications of malfunction in security devices that could signal a potential security breach or technical issue requiring immediate attention? (Describe how they're instructed)", type: "text" },
        { name: "troubleshootingResources", label: "What resources or reference materials are available to staff members to assist them in troubleshooting common security device issues, interpreting system alerts or error messages, and taking appropriate corrective actions to restore functionality? (List the resources/reference materials)", type: "text" },
        { name: "incidentReportingTraining", label: "Are staff members trained on the importance of documenting and reporting security breaches or unauthorized access incidents in a timely and accurate manner to support investigation, analysis, and corrective action?", type: "radio" },
        { name: "incidentDocumentation", label: "How are staff members instructed to document relevant details and observations regarding security breaches, including the location, time, nature of the incident, individuals involved, and any additional contextual information that may aid in understanding the situation? (Describe how they're instructed)", type: "text" },
        { name: "reportingProtocols", label: "What protocols are in place for reporting security breaches to designated authorities, security personnel, or administrative staff members, and how are staff members informed of their obligations and responsibilities in this regard? (Describe the protocols)", type: "text" },
        { name: "continuousImprovement", label: "How does the organization promote a culture of continuous improvement in security awareness and breach recognition capabilities among staff members through ongoing training, reinforcement activities, and feedback mechanisms? (Describe how they promote)", type: "text" },
        { name: "feedbackEncouragement", label: "Are staff members encouraged to provide feedback on security protocols, procedures, or training materials based on their real-world experiences, insights, or suggestions for enhancing security awareness and breach recognition effectiveness?", type: "radio" },
        { name: "breachAnalysisMechanisms", label: "What mechanisms are in place to review and analyze reported security breaches, identify root causes or contributing factors, and implement corrective actions or procedural enhancements to prevent recurrence and strengthen overall security posture? (Describe the mechanisms)", type: "text" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>3.4.2.1.2 Recognizing Security Breaches Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.substring(question.label.indexOf('(') +1, question.label.lastIndexOf(')'))} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
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

export default RecognizingSecurityBreachesFormPage;