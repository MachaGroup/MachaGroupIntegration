import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const scenarioTrainingQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "scenariosDevelopedRealistically", label: "Are scenarios developed based on realistic/relevant emergency situations?" },
    { name: "scenarioSpecificity", label: "Are scenarios tailored to address specific threats or hazards?" },
     // Adapted from text input
    { name: "scenarioDesignConsiderations", label: "Are key considerations (objectives, safety) included in scenario design?" },
     // Adapted from text input
    { name: "scenarioCategorization", label: "Are scenarios categorized (e.g., by severity, type)?" },
    // Adapted from text input
    { name: "scenarioDocumentationProcess", label: "Is the scenario development process documented and reviewed?" },
    // Adapted from text input
    { name: "scenarioSessionConductEffective", label: "Are sessions conducted using effective methods/tools (simulations, exercises)?" },
    { name: "scenarioIntegration", label: "Are scenarios integrated into tabletop exercises, simulations, or drills?" },
    // Adapted from text input
    { name: "scenarioResourcesProvided", label: "Are adequate resources/support provided for safe execution?" },
    { name: "scenarioContingencyPlans", label: "Are contingency plans in place during scenario implementation?" },
    // Adapted from text input
    { name: "scenarioUpdatesRegular", label: "Are scenarios modified/updated over time based on feedback/changes?" },
    { name: "participantEngagement", label: "Are staff engaged actively in scenario-based training exercises?" },
    { name: "activeParticipation", label: "Are participants encouraged to make decisions, act, and communicate?" },
     // Adapted from text input
    { name: "participantConcernsMeasures", label: "Are measures taken to address participant concerns/anxieties?" },
    { name: "scenarioTeamwork", label: "Are scenarios designed to promote teamwork and communication?" },
     // Adapted from text input
    { name: "feedbackIntegrationDesign", label: "Is participant feedback incorporated into scenario design/improvement?" },
    // Adapted from text input
    { name: "learningObjectivesTargeted", label: "Are specific learning objectives targeted by the scenarios?" },
    { name: "reinforceKeyConcepts", label: "Are scenarios designed to reinforce key concepts/procedures?" }, // Simplified
     // Adapted from text input
    { name: "outcomesEvaluationConducted", label: "Are learning outcomes assessed post-training?" },
    { name: "performanceMetrics", label: "Are performance metrics used to measure training effectiveness?" },
    // Adapted from text input
    { name: "knowledgeAssessmentConducted", label: "Is participant knowledge assessed before/after training?" },
    { name: "debriefingSessions", label: "Is there a structured debriefing process post-training?" },
    { name: "constructiveFeedback", label: "Are participants provided with constructive feedback?" },
     // Adapted from text input
    { name: "lessonsLearnedDocumented", label: "Are lessons learned documented and used for improvement?" },
    { name: "debriefingImprovement", label: "Are debriefing sessions used to identify improvement areas?" },
     // Adapted from text input
    { name: "feedbackEnhancementMechanisms", label: "Are mechanisms used to ensure feedback enhances training?" },
     // Adapted from text input
    { name: "scenarioVariation", label: "Are scenarios varied (complexity, duration, intensity)?" },
    { name: "scenarioAdjustment", label: "Are scenarios adjusted based on participant skill level/roles?" }, // Simplified
     // Adapted from text input
    { name: "complexityStrategiesUsed", label: "Are strategies used to increase scenario complexity over time?" },
     // Adapted from text input
    { name: "realisticSimulations", label: "Are realistic stressors and environmental factors simulated?" },
     // Adapted from text input
    { name: "considerationMeasuresAddressed", label: "Are ethical, legal, and psychological considerations addressed?" },
    { name: "integrationEmergencyPlans", label: "Are scenarios aligned with emergency response plans?" },
    { name: "testEmergencyComponents", label: "Are scenarios designed to test specific components of emergency plans?" },
     // Adapted from text input
    { name: "trainingLessonsIncorporated", label: "Are lessons from scenarios incorporated into planning?" },
    { name: "emergencyTeamInvolvement", label: "Are emergency teams involved in scenario development/implementation?" },
     // Adapted from text input
    { name: "outcomesValidationProcess", label: "Are training outcomes used to validate emergency plans?" }
];


function ScenarioBasedTrainingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadScenarioBasedTrainingImage = httpsCallable(functions, 'uploadScenarioBasedTrainingImage');

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Adjusted imageUrl fetch
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                     // Fetch imageUrl from within formData
                    setImageUrl(existingData.imageUrl || null);
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

    // handleChange saves data immediately with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
                // Avoid alerting on every change
            }
        }
    };

    // handleImageChange using base64 - Looks good
    const handleImageChange = (e) => {
       const file = e.target.files[0];
       if (file) {
           const reader = new FileReader();
           reader.onloadend = () => {
               setImageData(reader.result);
               setImageUrl(null);
               setImageUploadError(null);
           };
           reader.readAsDataURL(file);
       } else {
           setImageData(null);
       }
    };

    // handleBack - Looks good
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc with correct structure
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true);
        let finalImageUrl = formData.imageUrl || null;
        let submissionError = null;

        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                // Use correct function variable name
                const uploadResult = await uploadScenarioBasedTrainingImage({
                    imageData: imageData,
                    buildingId: buildingId
                 });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                 finalImageUrl = formData.imageUrl || null;
            }
        }

        // Prepare final data object including definitive image URL
        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
             // Removed buildingRef here, added below
             // updatedAt: serverTimestamp() // Add timestamp if needed here or server-side
        };
        setFormData(finalFormData); // Update state to final version

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
             // Save final data with correct structure, including building ref INSIDE formData
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError);
            }
            navigate('/Form');
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    // Loading/Error Display - Looks good
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Scenario-Based Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Scenario Training Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {scenarioTrainingQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label>{question.label}</label>
                            {/* Div for radio buttons */}
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_yes`}>Yes</label>
                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_no`}>No</label>
                            </div>
                            {/* Input for comments */}
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                        <label htmlFor="imageUploadScenarioTrain">Upload Image (Optional):</label>
                        <input id="imageUploadScenarioTrain" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Scenario Training related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Scenario Training related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default ScenarioBasedTrainingFormPage;