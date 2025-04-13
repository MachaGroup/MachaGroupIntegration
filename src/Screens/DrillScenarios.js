import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Removed unused 'collection'
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const drillScenarioQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "conductedLockdownDrillsRegularly", label: "Are lockdown drills conducted regularly?" },
    { name: "regularDrillSchedule", label: "Are lockdown drills scheduled regularly for occupant familiarity?" },
    { name: "drillTimingVariability", label: "Are drills conducted at different times (day/shifts)?" },
    // Adapted from text input (implicitly)
    { name: "initiationProtocolExists", label: "Is there a protocol for initiating lockdown drills and notifying occupants?" },
    { name: "notificationMethodsTesting", label: "Are notification methods tested during drills?" },
    // Adapted from text input (implicitly)
    { name: "absentIndividualsSystemExists", label: "Is there a system to account for individuals absent during drills?" },
    { name: "scenarioPlanning", label: "Are lockdown drill scenarios carefully planned and communicated?" },
    { name: "simulatedThreatScenarios", label: "Do scenarios include simulated intruder situations and other potential threats?" },
    { name: "realisticScenarioDesign", label: "Are scenarios designed realistically while ensuring participant safety?" },
    { name: "procedureCommunication", label: "Are lockdown procedures clearly defined and communicated?" },
    { name: "occupantSpecificActions", label: "Do drills include specific actions (securing doors, barricading, seeking shelter)?" },
    { name: "scenarioSimulationVariety", label: "Are drills conducted simulating different scenarios (intruder locations, multiple threats)?" },
     // Adapted from text input (implicitly)
    { name: "coordinationProtocolExists", label: "Is there a protocol for communication/coordination during drills?" },
    { name: "communicationSystemsTest", label: "Are communication systems (radios, intercoms) tested during drills?" },
    { name: "designatedCoordinators", label: "Are individuals designated responsible for coordinating responses?" },
     // Adapted from text input (implicitly)
    { name: "occupantAccountabilityProcessExists", label: "Is there a process for accounting for occupants during drills?" },
    { name: "accountabilityRolesAssigned", label: "Are staff assigned roles for accountability/monitoring?" },
    { name: "participantsFeedbackCollection", label: "Is feedback gathered from participants after drills?" },
    // Adapted from text input (implicitly)
    { name: "effectivenessEvaluationMechanismExists", label: "Is there a mechanism for evaluating drill effectiveness?" },
    { name: "debriefingSessions", label: "Are debriefing sessions held after drills to review performance/lessons learned?" },
    { name: "implementationOfRecommendations", label: "Are recommendations implemented to enhance preparedness?" },
];


// Renamed component
function DrillScenariosFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable and function string for consistency
    const uploadDrillScenariosImage = httpsCallable(functions, 'uploadDrillScenariosImage');

    // State aligned with the standard pattern - Looks good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data on load - Corrected path assumed
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Corrected Firestore path - VERIFY THIS PATH NAME
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenarios', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    if (existingData.imageUrl) {
                         setImageUrl(existingData.imageUrl);
                     }
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
                // Corrected Firestore path - VERIFY THIS PATH NAME
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenarios', buildingId);
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
                const uploadResult = await uploadDrillScenariosImage({
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

        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
        };
        setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Corrected Firestore path - VERIFY THIS PATH NAME
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenarios', buildingId);
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
                <h1>Drill Scenarios Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Drill Scenario Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {drillScenarioQuestions.map((question, index) => (
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
                                name={`${question.name}Comment`} // Corrected comment name format
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                        <label htmlFor="imageUploadDrillScenario">Upload Image (Optional):</label>
                        <input id="imageUploadDrillScenario" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Drill Scenario related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Drill Scenario related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

// Renamed export
export default DrillScenariosFormPage;