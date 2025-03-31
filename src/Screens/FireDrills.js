import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Renamed component slightly to avoid conflict if FireDrillFormPage exists
function FireDrillsStudentTrainingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFireDrillsFormImage');

    // State aligned with the standard pattern
    const [formData, setFormData] = useState({}); // Initialize as empty object
    const [imageData, setImageData] = useState(null); // For base64 image data
    const [imageUrl, setImageUrl] = useState(null); // For storing uploaded image URL
    const [imageUploadError, setImageUploadError] = useState(null); // For image upload errors
    const [loading, setLoading] = useState(true); // Loading state for initial fetch
    const [loadError, setLoadError] = useState(null); // Error state for initial fetch

    // useEffect for fetching data on load
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure navigation path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore document path for this form
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Drills', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                    setImageUrl(docSnapshot.data().formData?.imageUrl || null);
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

    // handleChange saves data on every change
    const handleChange = async (e) => {
        const { name, value } = e.target;
        // Standardize radio button values
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Drills', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save data using setDoc with merge: true
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data auto-saved:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error auto-saving form data:", error);
            // Optionally show a non-blocking error to the user
        }
    };

    // handleImageChange using FileReader
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
        }
    };

    // handleBack now only navigates
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using Cloud Function for upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        let finalImageUrl = formData.imageUrl || null;

        // Upload new image if imageData exists
        if (imageData) {
            setImageUploadError(null);
            try {
                console.log("Uploading image...");
                const uploadResult = await uploadImage({ imageData: imageData });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                alert(`Image upload failed: ${error.message || "Unknown error"}`);
                // return; // Optional: Stop submission on image upload failure
            }
        }

        // Correct typo 'buildling' to 'building' and prepare final data
        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Drills', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true, ensure 'building' field is correct
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit the form. Please check your connection and try again.");
        }
    };

    // Loading and Error display
    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Define questions, specifying type ('radio' or 'text')
    const questions = [
        // Understanding of Evacuation Procedures
        { name: "fireDrillEducation", label: "Are students educated on the importance of fire drills and their role in evacuating the building safely during a fire emergency?", type: "radio" },
        { name: "evacuationInstructions", label: "How are students instructed on the specific steps to follow during a fire drill, including how to quickly and calmly exit the building via designated evacuation routes and assembly points?", type: "text" },
        { name: "comprehensionMeasures", label: "What measures are taken to ensure that students comprehend the evacuation procedures, including the use of visual aids, practice drills, and verbal instructions tailored to different age groups and learning styles?", type: "text" }, // Corrected typo
        // Recognition of Fire Alarm Signals
        { name: "alarmFamiliarization", label: "Are students familiarized with the various types of fire alarm signals used within the school, including auditory alarms, visual strobes, and digital alert systems?", type: "radio" },
        { name: "alarmRecognitionTraining", label: "How are students trained to recognize the distinct sound or visual cues of a fire alarm and differentiate them from other emergency alerts or routine announcements?", type: "text" },
        { name: "promptReactionStrategies", label: "What strategies are employed to reinforce students' ability to react promptly to fire alarm signals, emphasizing the importance of immediate evacuation without hesitation or delay?", type: "text" },
        // Response to Smoke and Fire Hazards
        { name: "fireHazardEducation", label: "Are students educated on the potential hazards posed by smoke, flames, heat, and toxic gases in the event of a fire, as well as strategies for minimizing exposure and avoiding injury?", type: "radio" },
        { name: "firePreventionEducation", label: "How are students taught to identify common sources of ignition and fire spread, such as electrical appliances, flammable materials, cooking equipment, and combustible furnishings, and to report any fire-related concerns to responsible adults?", type: "text" },
        { name: "fireSimulationExercises", label: "What practical demonstrations or simulations are conducted to simulate fire scenarios, allowing students to experience simulated smoke conditions, practice low crawling techniques, and use emergency exit aids like fire extinguishers or fire blankets under supervision?", type: "text" },
        // Role of Fire Wardens and Monitors
        { name: "fireWardenTraining", label: "Are students introduced to the concept of fire wardens or monitors, responsible individuals designated to assist with evacuation procedures, conduct headcounts, and provide guidance or assistance to classmates during fire drills?", type: "radio" },
        { name: "fireWardenSelectionAndTraining", label: "How are students selected or trained to serve as fire wardens or monitors, and what specific duties or responsibilities are assigned to them before, during, and after fire drills to ensure effective coordination and communication?", type: "text" },
        { name: "fireWardenRecognition", label: "What mechanisms are in place to recognize and commend the contributions of student fire wardens or monitors, fostering a sense of leadership, responsibility, and teamwork in promoting fire safety within the school community?", type: "text" },
        // Post-Drill Debriefing and Feedback
        { name: "postDrillDebriefing", label: "Are students given the opportunity to participate in post-drill debriefing sessions or discussions to reflect on their performance, identify areas for improvement, and share feedback or suggestions for enhancing future fire drills?", type: "radio" },
        { name: "debriefingFeedback", label: "How are student observations, concerns, or questions addressed during debriefing sessions, and what actions are taken to address any identified gaps, misconceptions, or safety concerns raised by participants?", type: "text" },
        { name: "continuousImprovementMechanisms", label: "What mechanisms are in place to document and incorporate lessons learned from fire drills into ongoing safety training and emergency preparedness initiatives, ensuring continuous improvement in the school's fire evacuation procedures and protocols?", type: "text" }
    ];

    return (
        <div> {/* Outer wrapper div */}
            {/* Changed component name slightly to avoid potential naming conflicts */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Fire Drills Assessment (Student Training)</h1> {/* Clarified title */}
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Understanding of Evacuation Procedures:</h2>}
                                {index === 3 && <h2>Recognition of Fire Alarm Signals:</h2>}
                                {index === 6 && <h2>Response to Smoke and Fire Hazards:</h2>}
                                {index === 9 && <h2>Role of Fire Wardens and Monitors:</h2>}
                                {index === 12 && <h2>Post-Drill Debriefing and Feedback:</h2>}


                                <label htmlFor={question.name}>{question.label}</label>

                                {question.type === "radio" ? (
                                    // Render Yes/No radio buttons + comment input
                                    <>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`${question.name}_yes`}
                                                name={question.name}
                                                value="yes"
                                                checked={formData[question.name] === "yes"}
                                                onChange={handleChange}
                                            />
                                             <label htmlFor={`${question.name}_yes`}> Yes</label>

                                            <input
                                                type="radio"
                                                id={`${question.name}_no`}
                                                name={question.name}
                                                value="no"
                                                checked={formData[question.name] === "no"}
                                                onChange={handleChange}
                                            />
                                             <label htmlFor={`${question.name}_no`}> No</label>
                                        </div>
                                        <input
                                            type="text" // Using input type="text" for comment consistency
                                            id={`${question.name}Comment`}
                                            name={`${question.name}Comment`}
                                            placeholder="Additional comments (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                            className='comment-box'
                                        />
                                    </>
                                ) : (
                                    // Render single text input for text-based questions
                                    <input
                                        type="text"
                                        id={question.name}
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                        placeholder="Enter details here"
                                        className='comment-box' // Reusing class, adjust if needed
                                    />
                                )}
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Fire Drills Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                             {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit">Submit Assessment</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

// Updated export name to match component name
export default FireDrillsStudentTrainingPage;