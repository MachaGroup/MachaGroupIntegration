import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SafetyWorkshopsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadSafetyWorkshopsImage = httpsCallable(functions, 'uploadSafetyWorkshopsImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No form data for this building");
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
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
                const uploadResult = await uploadSafetyWorkshopsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef }, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Failed to submit the form. Please try again.');
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
                <h1>Safety Workshops Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Safety Workshops Assessment</h2>
                    {[
                        { name: "workshopPlanningProcess", label: "How are safety workshops and educational events for parents planned, organized, and coordinated within the school or educational institution?" },
                        { name: "selectionCriteriaTopicsSpeakers", label: "What criteria are used to select topics, speakers, and formats for parent education events, and how are they aligned with the safety needs and concerns of the school community?" },
                        { name: "eventsIntegratedWithPrograms", label: "Are parent education events integrated into broader community engagement initiatives, school calendars, or existing parent involvement programs?" },
                        { name: "safetyTopicsCovered", label: "What specific safety topics are covered in parent education events, such as emergency preparedness, home safety, cyber safety, or substance abuse prevention?" },
                        { name: "contentDevelopmentProcess", label: "How is the content of safety workshops developed or curated to ensure relevance, accuracy, and effectiveness in addressing the information needs and concerns of parents?" },
                        { name: "materialsProvidedToParents", label: "Are materials, resources, or take-home materials provided to parents to reinforce key safety messages and facilitate ongoing learning beyond the events?" },
                        { name: "effortsToEncourageParticipation", label: "How are efforts made to encourage parent participation and engagement in safety workshops and educational events?" },
                        { name: "communicationAndOutreachChannels", label: "What communication channels, outreach methods, or incentives are used to promote parent attendance, solicit feedback, and gauge interest in specific safety topics or initiatives?" },
                        { name: "eventsAccommodateDiverseNeeds", label: "Are parent education events designed to accommodate diverse schedules, preferences, and accessibility needs of parents, such as offering multiple session times, language options, or virtual participation?" },
                        { name: "interactiveLearningStructure", label: "How are parent education events structured to facilitate interactive learning, discussion, and skill-building among participants?" },
                        { name: "handsOnActivitiesIncluded", label: "Are workshops designed to incorporate hands-on activities, group discussions, case studies, or role-playing exercises to deepen understanding and retention of safety concepts?" },
                        { name: "practicalSkillsStrategiesForParents", label: "What strategies are employed to empower parents with practical skills, resources, and strategies they can implement at home to enhance family safety and emergency preparedness?" },
                        { name: "externalCollaborationMethods", label: "How do schools collaborate with external partners, such as community organizations, local agencies, or subject matter experts, to enhance the quality and impact of parent education events?" },
                        { name: "successfulCollaborationsExamples", label: "Can you provide examples of successful collaborations or joint initiatives that have enriched the content, reach, or engagement of safety workshops for parents?" },
                        { name: "partnershipContributionToEducation", label: "In what ways do partnerships with external stakeholders contribute to the sustainability, diversity, and cultural relevance of parent education efforts within the school community?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "eventsIntegratedWithPrograms" || question.name === "handsOnActivitiesIncluded" || question.name === "eventsAccommodateDiverseNeeds" ? (
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
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SafetyWorkshopsFormPage;