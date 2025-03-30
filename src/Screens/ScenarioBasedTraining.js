import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ScenarioBasedTrainingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadScenarioBasedTrainingImage = httpsCallable(functions, 'uploadScenarioBasedTrainingImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
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
                const uploadResult = await uploadScenarioBasedTrainingImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
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
                <h1>Scenario-Based Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Scenario-Based Training Assessment</h2>
                    {[
                        { name: "scenarioDevelopmentDescription", label: "How are scenarios for scenario-based training developed, and are they based on realistic and relevant emergency situations?" },
                        { name: "scenarioSpecificity", label: "Are scenarios tailored to address specific threats or hazards that staff may encounter?" },
                        { name: "scenarioDesignConsiderations", label: "What considerations are taken into account when designing scenarios?" },
                        { name: "scenarioCategorization", label: "Are scenarios categorized based on severity levels or types of emergencies?" },
                        { name: "scenarioDocumentationProcess", label: "How are scenario development processes documented and reviewed?" },
                        { name: "scenarioSessionConduct", label: "How are scenario-based training sessions conducted, and what methods or tools are used?" },
                        { name: "scenarioIntegration", label: "Are scenarios integrated into tabletop exercises, simulations, or full-scale drills?" },
                        { name: "scenarioResources", label: "What resources or support are provided for safe and effective execution?" },
                        { name: "scenarioContingencyPlans", label: "Are contingency plans in place during scenario implementation?" },
                        { name: "scenarioUpdates", label: "How are scenarios modified or updated over time?" },
                        { name: "participantEngagement", label: "How are staff engaged in scenario-based training exercises?" },
                        { name: "activeParticipation", label: "Are participants encouraged to make decisions, take actions, and communicate?" },
                        { name: "participantConcernsMeasures", label: "What measures address any concerns or anxieties of staff?" },
                        { name: "scenarioTeamwork", label: "Are scenarios designed to promote teamwork and communication?" },
                        { name: "feedbackIntegration", label: "How is participant feedback incorporated into scenario design?" },
                        { name: "learningObjectives", label: "What specific learning objectives are targeted?" },
                        { name: "reinforceKeyConcepts", label: "Are scenarios designed to reinforce key concepts, procedures, or protocols?" },
                        { name: "outcomesEvaluation", label: "How are learning outcomes assessed?" },
                        { name: "performanceMetrics", label: "Are performance metrics used to measure training effectiveness?" },
                        { name: "knowledgeAssessment", label: "How is participant knowledge assessed before and after training?" },
                        { name: "debriefingSessions", label: "Is there a structured debriefing process post-training?" },
                        { name: "constructiveFeedback", label: "Are participants provided with constructive feedback?" },
                        { name: "lessonsLearnedDocumentation", label: "How are lessons learned documented and used for improvement?" },
                        { name: "debriefingImprovement", label: "Are debriefing sessions used to identify improvement areas?" },
                        { name: "feedbackEnhancementMechanisms", label: "What mechanisms ensure feedback is used to enhance training?" },
                        { name: "scenarioVariation", label: "How are scenarios varied by complexity, duration, and intensity?" },
                        { name: "scenarioAdjustment", label: "Are scenarios adjusted based on participant skill level and roles?" },
                        { name: "complexityStrategies", label: "What strategies increase scenario complexity over time?" },
                        { name: "realisticSimulations", label: "Are realistic stressors and environmental factors simulated?" },
                        { name: "considerationMeasures", label: "How are ethical, legal, and psychological considerations addressed?" },
                        { name: "integrationEmergencyPlans", label: "How are scenarios aligned with emergency response plans?" },
                        { name: "testEmergencyComponents", label: "Are scenarios designed to test specific components of emergency plans?" },
                        { name: "trainingLessonsMeasures", label: "How are lessons from scenarios incorporated into planning?" },
                        { name: "emergencyTeamInvolvement", label: "Are emergency teams involved in scenario development and implementation?" },
                        { name: "outcomesValidation", label: "How are training outcomes used to validate emergency plans?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "scenarioSpecificity" || question.name === "scenarioIntegration" || question.name === "scenarioContingencyPlans" || question.name === "activeParticipation" || question.name === "scenarioTeamwork" || question.name === "reinforceKeyConcepts" || question.name === "performanceMetrics" || question.name === "constructiveFeedback" || question.name === "debriefingImprovement" || question.name === "scenarioAdjustment" || question.name === "realisticSimulations" || question.name === "testEmergencyComponents" || question.name === "emergencyTeamInvolvement" ? (
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

export default ScenarioBasedTrainingFormPage;