import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ActiveShooterResponseFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // This callable function setup is correct.
    const uploadImage = httpsCallable(functions, 'uploadActiveShooterResponseImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);


    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
             // Use absolute path for clarity
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const loadedData = docSnapshot.data().formData || {};
                    setFormData(loadedData);
                    // Load existing image URL
                    if (loadedData.imageUrl) {
                       setImageUrl(loadedData.imageUrl);
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



    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Auto-save logic is correct
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);
             // Include existing imageUrl if present
            const dataToSave = { ...newFormData, building: buildingRef };
             if (imageUrl) {
                dataToSave.imageUrl = imageUrl;
            }
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            console.log("Form data saved to Firestore:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
         if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleBack = () => {
        navigate(-1); // Correct: Just navigate back
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        // Set loading state for submission process
        setLoading(true);
        setImageUploadError(null);

        // Use state imageUrl as the starting point (could be from load or previous upload)
        let finalImageUrl = imageUrl;

        // 1. Upload image via Cloud Function if new one selected
        if (imageData) {
            try {
                console.log("Uploading new image via Cloud Function...");
                const uploadResult = await uploadImage({ imageData: imageData });
                finalImageUrl = uploadResult.data.imageUrl; // Update finalImageUrl
                setImageUrl(finalImageUrl); // Update state for display
                // Update formData state immediately with the new URL for consistency before final save
                setFormData(prevData => ({ ...prevData, imageUrl: finalImageUrl }));
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                setLoading(false); // Stop loading on error
                alert("Error uploading image. Please try again.");
                return; // Stop submission
            }
        }

        // 2. Save final form data (explicitly including buildingRef and finalImageUrl)
        try {
            console.log("Saving final form data...");
            const buildingRef = doc(db, 'Buildings', buildingId); // Define buildingRef
            const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);

            // Prepare final data using state (formData might not have updated imageUrl yet if setFormData is async)
             const finalFormData = {
                ...formData, // Include latest form field values
                ...(finalImageUrl && { imageUrl: finalImageUrl }), // Ensure the correct final image URL
                building: buildingRef // Ensure building reference is included
            };

            // Use setDoc with merge:true on the specific document
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');

        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final changes. Please check your connection and try again.");
        } finally {
             // Ensure loading is set to false after completion or error
            setLoading(false);
        }
    };

    // Loading indicator during fetch
    if (loading && !loadError) { // Check loadError to prevent showing loading indicator over error message
        return <div>Loading...</div>;
    }

    // Error display during fetch
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }


    // Define questions array
     const questions = [
        { name: "asrTrainingTopics", label: "What topics and skills are covered in active shooter response training programs, such as situational awareness, threat recognition, decision-making under stress, and survival tactics?" },
        { name: "asrMaterialsAlignment", label: "Are training materials and resources based on recognized active shooter response protocols, guidelines, and recommendations from law enforcement agencies, security experts, or government agencies?" },
        { name: "asrKeyConcepts", label: "How do active shooter response training programs address key concepts such as the 'Run, Hide, Fight' protocol, evacuation procedures, barricading techniques, and communication strategies during an active shooter incident?" },
        { name: "asrScenarioSimulations", label: "To what extent do active shooter response training sessions incorporate scenario-based simulations, tabletop exercises, and live drills to prepare staff members for real-life emergencies?" },
        { name: "asrScenarioPractice", label: "Are staff members provided with opportunities to practice response options, decision-making skills, and coordinated actions in simulated active shooter scenarios?" },
        { name: "asrDrillConduction", label: "How are active shooter drills conducted to simulate various threat scenarios, test emergency communication systems, and evaluate staff readiness and response effectiveness?" },
        { name: "asrCommunicationTraining", label: "How are staff members trained to communicate effectively with colleagues, students, and emergency responders during an active shooter incident?" },
        { name: "asrCommunicationProtocols", label: "Are communication protocols established to relay critical information, issue alerts, and coordinate response efforts across different areas of the school campus?" },
        { name: "asrExternalCommunication", label: "What mechanisms are in place to facilitate communication with law enforcement agencies, emergency dispatch centers, and other external stakeholders during an active shooter crisis?" },
        { name: "asrDecisionTraining", label: "How are staff members trained to assess the situation, make rapid decisions, and implement appropriate response strategies based on the evolving threat environment during an active shooter incident?" },
        { name: "asrDecisionFrameworks", label: "Are decision-making frameworks, decision trees, or decision support tools provided to guide staff members in determining the most effective course of action in different scenarios?" },
        { name: "asrActionProvisions", label: "What provisions are in place to empower staff members to take decisive action to protect themselves and others, including options for evacuation, lockdown, sheltering, or countermeasures?" },
        { name: "asrSupportResources", label: "What resources and support services are available to staff members following an active shooter incident, including psychological first aid, counseling, and debriefing sessions?" },
        { name: "asrDebriefings", label: "Are post-incident debriefings conducted to review response actions, identify lessons learned, address concerns, and implement improvements to emergency preparedness plans and procedures?" },
        { name: "asrFeedbackContribution", label: "How are staff members encouraged to share their experiences, provide feedback on training effectiveness, and contribute to the continuous improvement of active shooter response protocols?" }
    ];


    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Active Shooter Response Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Consistent H2 */}
                    <h2>Active Shooter Response Questions</h2>

                    {/* Map questions using the corrected securitygates format */}
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div> {/* Radio button container */}
                                <input
                                    type="radio"
                                    id={`${question.name}-yes`}
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-yes`}> Yes</label>

                                <input
                                    type="radio"
                                    id={`${question.name}-no`}
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-no`}> No</label>
                            </div>
                             {/* Consistent comment input (type="text") */}
                            <input
                                type="text" // Changed from textarea
                                name={`${question.name}Comment`}
                                placeholder="Additional comments" // Consistent placeholder
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className="comment-input" // Optional class for styling
                            />
                        </div>
                    ))}

                    {/* Image Upload Section - Consistent style */}
                     <div className="form-section">
                        <label htmlFor="imageUpload">Upload Supporting Image (Optional):</label>
                        <input id="imageUpload" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && <img src={imageUrl} alt="Uploaded evidence" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                     </div>

                    <button type="submit" disabled={loading}>
                         {/* Show loading text on button when submitting */}
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default ActiveShooterResponseFormPage;