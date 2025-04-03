import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ParentTeacherAssociationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadParentTeacherAssociationsImage = httpsCallable(functions, 'uploadParentTeacherAssociationsImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent-Teacher Associations', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent-Teacher Associations', buildingId);
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
                const uploadResult = await uploadParentTeacherAssociationsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent-Teacher Associations', buildingId);
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
                    <h1>Parent-Teacher Associations Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Parent-Teacher Associations Assessment</h2>
                        {[
                            { name: "ptaStructureAndOperation", label: "How is the parent-teacher association (PTA) or similar organization structured, governed, and operated within the school or educational institution?" },
                            { name: "ptaRolesAndResponsibilities", label: "What roles and responsibilities do PTA members fulfill in facilitating communication, collaboration, and engagement between parents, teachers, administrators, and other stakeholders?" },
                            { name: "ptaInclusivityAndAccessibility", label: "Are PTA meetings, events, or activities inclusive and accessible to all parents, regardless of background, language, or socio-economic status?" },
                            { name: "ptaInformationDissemination", label: "How does the PTA disseminate important information, updates, announcements, or resources related to school safety, emergency preparedness, and other relevant topics to parents?" },
                            { name: "ptaCommunicationChannels", label: "What communication channels, platforms, or strategies are utilized by the PTA to reach a broad audience of parents and ensure timely and effective communication?" },
                            { name: "ptaEffortsToEngageParents", label: "Are efforts made to engage parents who may face barriers to communication, such as language barriers, limited access to technology, or lack of familiarity with school processes?" },
                            { name: "ptaCollaborationWithLeadership", label: "How does the PTA collaborate with school leadership, administrators, or safety personnel to support and enhance communication efforts related to school safety and emergency preparedness?" },
                            { name: "ptaSuccessfulPartnerships", label: "Can you provide examples of successful partnerships or joint initiatives between the PTA and school stakeholders in promoting safety awareness, organizing informational sessions, or addressing parent concerns?" },
                            { name: "ptaContributionToCommunicationStrategies", label: "In what ways does the PTA contribute to the development, implementation, or evaluation of parent communication strategies and policies within the school community?" },
                            { name: "ptaEngagementEvents", label: "What types of events, workshops, or activities does the PTA organize to engage parents in discussions, workshops, or training sessions related to school safety and emergency preparedness?" },
                            { name: "ptaLeveragingResources", label: "How does the PTA leverage its resources, networks, and expertise to create opportunities for parents to learn, collaborate, and share experiences with each other regarding safety concerns or best practices?" },
                            { name: "ptaEventDesign", label: "Are PTA-sponsored events designed to accommodate diverse preferences, interests, and schedules of parents to maximize participation and engagement?" },
                            { name: "ptaFeedbackSolicitation", label: "How does the PTA solicit feedback, suggestions, concerns, or input from parents regarding school safety, emergency planning, or other relevant issues?" },
                            { name: "ptaAnonymousFeedbackMechanisms", label: "Are mechanisms in place for parents to provide feedback anonymously, confidentially, or through designated representatives to ensure open and honest communication?" },
                            { name: "ptaFeedbackUtilization", label: "How does the PTA utilize feedback from parents to advocate for improvements, advocate for changes, or address emerging safety challenges within the school community?" }
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "ptaInclusivityAndAccessibility" || question.name === "ptaEventDesign" ? (
                                        <>
                                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        </>
                                    ) : (
                                        <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                    )}
                                </div>
                            </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

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

export default ParentTeacherAssociationsFormPage;