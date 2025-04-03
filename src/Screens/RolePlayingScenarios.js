import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function RolePlayingScenariosFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadRolePlayingScenariosImage = httpsCallable(functions, 'uploadRolePlayingScenariosImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Role-Playing Scenarios', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Role-Playing Scenarios', buildingId);
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
                const uploadResult = await uploadRolePlayingScenariosImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Role-Playing Scenarios', buildingId);
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
                <h1>Role-Playing Scenarios Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Role-Playing Scenarios Assessment</h2>
                    {[
                        { name: "rolePlayingScenarioSelection", label: "How are role-playing scenarios selected or developed to address specific safety concerns or emergency situations relevant to the school or educational institution?" },
                        { name: "realLifeIncidentScenarios", label: "Are scenarios based on real-life incidents, local hazards, or common safety risks identified within the school environment?" },
                        { name: "rolePlayingCriteria", label: "What criteria are used to ensure that role-playing scenarios are age-appropriate, culturally sensitive, and aligned with the developmental needs of participants?" },
                        { name: "scenarioDesignEngagement", label: "How are role-playing scenarios designed to engage participants and simulate realistic emergency situations or safety challenges?" },
                        { name: "scenarioRolesAssignment", label: "Are scenarios scripted or improvised, and how are roles assigned or distributed among participants?" },
                        { name: "scenarioPropsAndEquipment", label: "What props, equipment, or simulated environments are used to enhance the realism and immersion of role-playing scenarios?" },
                        { name: "multipleScenarioOutcomes", label: "Are scenarios structured to allow for multiple outcomes or variations based on participant actions and decisions?" },
                        { name: "participantEngagement", label: "How are participants encouraged to actively engage and participate in role-playing scenarios?" },
                        { name: "debriefingSessions", label: "Are debriefing sessions, pre-briefings, or instructions provided to orient participants and establish expectations before engaging in scenarios?" },
                        { name: "collaborationAndTeamworkStrategies", label: "What strategies are employed to promote collaboration, communication, and teamwork among participants during role-playing exercises?" },
                        { name: "postScenarioReflection", label: "Are opportunities provided for participants to reflect on their experiences, share insights, and learn from each other's perspectives following the completion of scenarios?" },
                        { name: "learningObjectivesAndOutcomes", label: "What specific learning objectives or outcomes are targeted through role-playing scenarios, and how are they aligned with broader safety education goals?" },
                        { name: "reinforceSafetyConcepts", label: "Are scenarios designed to reinforce key safety concepts, practice emergency response procedures, or develop critical thinking and problem-solving skills?" },
                        { name: "participantPerformanceAssessment", label: "How are participant performance and learning outcomes assessed and evaluated during or after role-playing exercises?" },
                        { name: "debriefingPostScenario", label: "Are debriefing sessions or post-scenario discussions used to identify strengths, areas for improvement, and lessons learned from each scenario?" },
                        { name: "scenarioIntegrationWithTraining", label: "How are role-playing scenarios integrated into broader safety training programs or curriculum initiatives within the school or educational institution?" },
                        { name: "scenariosInClassroomOrActivities", label: "Are scenarios incorporated into existing classroom instruction, extracurricular activities, or dedicated safety training sessions?" },
                        { name: "facilitatorRolesInScenarios", label: "What role do teachers, staff members, or external facilitators play in facilitating role-playing scenarios and guiding participant learning?" },
                        { name: "followUpActivitiesAndAssignments", label: "Are follow-up activities or assignments provided to reinforce learning and encourage further exploration of safety topics addressed in role-playing exercises?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "realLifeIncidentScenarios" || question.name === "multipleScenarioOutcomes" || question.name === "debriefingSessions" || question.name === "postScenarioReflection" || question.name === "reinforceSafetyConcepts" || question.name === "debriefingPostScenario" || question.name === "scenariosInClassroomOrActivities" || question.name === "followUpActivitiesAndAssignments" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={`Enter details for ${question.label}`} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default RolePlayingScenariosFormPage;