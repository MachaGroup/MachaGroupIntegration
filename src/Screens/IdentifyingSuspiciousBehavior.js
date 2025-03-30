import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function IdentifyingSuspiciousBehaviorFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadIdentifyingSuspiciousBehaviorImage = httpsCallable(functions, 'uploadIdentifyingSuspiciousBehaviorImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Identifying Suspicious Behaivor', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Identifying Suspicious Behaivor', buildingId);
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
                const uploadResult = await uploadIdentifyingSuspiciousBehaviorImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Identifying Suspicious Behaivor', buildingId);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>3.1.1.4.1.1 Identifying Suspicious Behavior Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>3.1.1.4.1.1 Identifying Suspicious Behavior</h2>
                        {[
                            { name: "recognizing-suspicious-behavior", label: "Are staff members trained to recognize and identify indicators of suspicious behavior, unusual activity, or potential threats within the school environment?" },
                            { name: "warning-sign-training", label: "What specific behaviors or actions are emphasized during training as potential warning signs of security concerns, such as aggression, hostility, erratic movements, or attempts to conceal weapons or contraband?" },
                            { name: "maintaining-vigilance", label: "How are staff members educated on the importance of maintaining vigilance, situational awareness, and proactive observation to detect and report suspicious incidents promptly?" },
                            { name: "reporting-procedures", label: "Are clear reporting procedures established and communicated to staff members for documenting and reporting observations of suspicious behavior or security-related concerns?" },
                            { name: "response-training", label: "How are staff members trained to initiate timely and appropriate responses, such as notifying school administrators, security personnel, or law enforcement authorities, when encountering suspicious individuals or activities?" },
                            { name: "confidentiality-measures", label: "What measures are in place to ensure confidentiality, anonymity, and protection from retaliation for staff members who report security-related incidents or raise concerns about potential threats?" },
                            { name: "collaborating-with-colleagues", label: "How are staff members encouraged to communicate and collaborate with colleagues, security personnel, and other stakeholders to share information, insights, and observations related to security threats or suspicious behavior?" },
                            { name: "information-sharing", label: "Are mechanisms in place to facilitate information sharing, debriefings, or post-incident discussions among staff members to analyze and learn from past experiences, identify emerging trends, and enhance threat recognition capabilities?" },
                            { name: "threat-assessment-protocols", label: "What protocols are followed to coordinate threat assessment efforts, validate reported concerns, and determine appropriate follow-up actions or interventions based on the severity and credibility of identified threats?" },
                            { name: "training-exercises", label: "Are staff members provided with scenario-based training exercises, simulations, or case studies to practice identifying and responding to various types of security threats or suspicious situations?" },
                            { name: "simulate-realistic-scenarios", label: "How do scenario-based training sessions simulate realistic scenarios, challenge decision-making abilities, and test staff members' capacity to assess threats, evaluate risks, and implement appropriate security measures?" },
                            { name: "evaluating-performance", label: "What feedback mechanisms are utilized to evaluate staff members' performance during scenario-based training exercises, reinforce key concepts, and address areas for improvement in threat recognition and response skills?" },
                            { name: "recognizing-potential-biases", label: "Are staff members trained to recognize potential biases, stereotypes, or cultural factors that may influence their perceptions of suspicious behavior or threat indicators?" },
                            { name: "cultural-sensitivity-programs", label: "How do training programs promote cultural sensitivity, inclusivity, and equity in threat assessment practices, ensuring that staff members avoid making assumptions based on race, ethnicity, religion, or other personal characteristics?" },
                            { name: "open-dialogue-strategies", label: "What strategies are implemented to foster open dialogue, mutual respect, and trust among staff members, students, and community members, enhancing the effectiveness of threat recognition efforts and promoting a safe and supportive school environment for all?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "warning-sign-training" || question.name === "maintaining-vigilance" || question.name === "response-training" || question.name === "confidentiality-measures" || question.name === "collaborating-with-colleagues" || question.name === "simulate-realistic-scenarios" || question.name === "evaluating-performance" || question.name === "cultural-sensitivity-programs" || question.name === "open-dialogue-strategies" || question.name === "threat-assessment-protocols" || question.name === "information-sharing-mechanisms" ? (
                                        <input
                                            type="text"
                                            name={question.name}
                                            placeholder={question.label}
                                            value={formData[question.name] || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <><>
                                                <input
                                                    type="radio"
                                                    name={question.name}
                                                    value="yes"
                                                    checked={formData[question.name] === "yes"}
                                                    onChange={handleChange} /> Yes
                                                <input
                                                    type="radio"
                                                    name={question.name}
                                                    value="no"
                                                    checked={formData[question.name] === "no"}
                                                    onChange={handleChange} /> No

                                            </><textarea
                                                    className='comment-box'
                                                    name={`${question.name}Comment`}
                                                    placeholder="Comment (Optional)"
                                                    value={formData[`${question.name}Comment`] || ''}
                                                    onChange={handleChange} /></>
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
        </div>
    );
}

export default IdentifyingSuspiciousBehaviorFormPage;