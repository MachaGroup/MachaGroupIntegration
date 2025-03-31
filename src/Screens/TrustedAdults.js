import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function TrustedAdultsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadTrustedAdultsImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Trusted Adults', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Trusted Adults', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Trusted Adults', buildingId);
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
                <h1>Trusted Adults Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Trusted Adults</h2>
                    {[
                        { name: "reportingAwareness", label: "How does the school promote awareness among students about the importance of reporting bullying incidents to trusted adults, and what strategies are used to encourage open dialogue and communication?" },
                        { name: "schoolInitiatives", label: "Are there regular school-wide initiatives, such as assemblies, presentations, or awareness campaigns, aimed at educating students about reporting procedures for bullying and the role of trusted adults in addressing these issues?" },
                        { name: "parentCommunication", label: "How are parents or guardians informed about the reporting procedures for bullying incidents, and what resources or materials are provided to support conversations at home about recognizing, reporting, and responding to bullying behavior?" },
                        { name: "staffTraining", label: "Are trusted adults trained to recognize signs of bullying and respond appropriately to reports, and how is ongoing professional development provided to ensure staff members are equipped to handle these situations effectively?" },
                        { name: "responseCoordination", label: "Are there designated individuals or teams responsible for coordinating responses to reports of bullying, and how is communication facilitated between trusted adults, administrators, and support personnel to ensure a coordinated approach?" },
                        { name: "studentSupportServices", label: "What support services are available to students who report bullying incidents, including counseling, mediation, conflict resolution strategies, or referrals to external agencies or community resources?" },
                        { name: "confidentialityMeasures", label: "How does the school maintain confidentiality and respect the privacy of students who report bullying incidents, and what measures are in place to protect individuals from retaliation or stigmatization?" },
                        { name: "documentationProcedures", label: "Are there procedures for documenting and tracking reports of bullying while safeguarding the confidentiality of those involved, and how is information shared on a need-to-know basis to maintain privacy and trust?" },
                        { name: "investigationSteps", label: "What steps are taken to ensure that investigations into reported bullying incidents are conducted discreetly and sensitively, and how are the outcomes communicated to affected parties while respecting their privacy rights?" },
                        { name: "empathyCulture", label: "How does the school foster a culture of empathy, respect, and peer support to empower students to intervene as bystanders and report bullying incidents when they occur?" },
                        { name: "peerInitiatives", label: "Are there opportunities for students to participate in peer-led initiatives, such as anti-bullying clubs, peer counseling programs, or student advisory boards, aimed at promoting positive relationships and creating a safe and inclusive school environment?" },
                        { name: "studentFeedback", label: "How are students involved in the development and review of reporting procedures for bullying incidents, and how does the school seek feedback from student stakeholders to improve the accessibility, effectiveness, and responsiveness of these processes?" },
                        { name: "monitoringEvaluation", label: "How does the school monitor and evaluate the effectiveness of reporting procedures for bullying incidents, including the frequency and types of reports received, response times, resolution outcomes, and follow-up actions taken?" },
                        { name: "dataAnalysis", label: "Are data collected on reported bullying incidents analyzed regularly to identify trends, patterns, or systemic issues that may require additional intervention or targeted prevention efforts?" },
                        { name: "continuousImprovement", label: "What mechanisms are in place for continuous improvement and refinement of reporting procedures based on feedback from students, parents, staff, and other stakeholders, and how are lessons learned incorporated into future planning and decision-making?" },
                        { name: "legalCompliance", label: "Does the school's approach to reporting procedures for bullying incidents align with relevant legal requirements, state mandates, and district policies, including provisions for reporting, investigating, and addressing instances of bullying, harassment, or intimidation?" },
                        { name: "reportingCommunication", label: "How are reporting procedures for bullying incidents communicated to staff members, students, parents, and other stakeholders, and how does the school ensure that everyone is aware of their rights, responsibilities, and available resources?" },
                        { name: "policyUpdates", label: "Are there mechanisms in place to review and update reporting procedures for bullying incidents periodically to ensure compliance with evolving legal standards, emerging best practices, and community expectations?" },
                        { name: "externalCollaboration", label: "How does the school collaborate with external partners, such as law enforcement agencies, mental health providers, nonprofit organizations, or government agencies, to enhance reporting procedures for bullying incidents and provide comprehensive support to students and families?" },
                        { name: "communityPartnerships", label: "Are there opportunities for community members, including local businesses, faith-based organizations, and civic groups, to contribute resources, expertise, or volunteer support to strengthen reporting procedures for bullying incidents and promote a culture of respect and inclusion?" },
                        { name: "outreachEfforts", label: "What outreach efforts are undertaken to engage the broader community in efforts to prevent and address bullying, including public awareness campaigns, community forums, or collaborative initiatives aimed at addressing root causes and systemic challenges?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "schoolInitiatives" || question.name === "dataAnalysis" || question.name === "legalCompliance" || question.name === "communityPartnerships" ? (
                                <><div>
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
                                </div>
                                <div>
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange} />
                                    </div></>
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
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

export default TrustedAdultsFormPage;