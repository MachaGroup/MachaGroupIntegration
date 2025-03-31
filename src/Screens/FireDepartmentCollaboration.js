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

function FireDepartmentCollaborationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFireDepartmentCollaborationFormImage');

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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Department Collaboration', buildingId);

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
        // Standardize radio button values if necessary
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value; // Assuming values are already lowercase
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Department Collaboration', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save data using setDoc with merge: true
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data auto-saved:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error auto-saving form data:", error);
            // Optionally show a non-blocking error to the user
        }
    };

    // handleImageChange using FileReader (Standard implementation)
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

        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Fire Department Collaboration', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true
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
        // Partnership Objectives and Initiatives
        { name: "partnershipObjectives", label: "What are the primary objectives and focus areas of collaboration between the school or educational institution and the local fire department?", type: "text" },
        { name: "jointProgramsExamples", label: "Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and fire department to enhance fire safety, prevention, and preparedness within the school community?", type: "text" },
        { name: "partnershipAlignment", label: "How is the partnership with the fire department aligned with broader school safety goals, emergency planning efforts, or community resilience initiatives?", type: "text" },
        // Fire Prevention Education and Outreach
        { name: "firePreventionSupport", label: "How does the fire department support fire prevention education and outreach efforts within the school community, including students, staff, and families?", type: "text" },
        { name: "resourcesProvided", label: "What resources, materials, or presentations does the fire department provide to educate students about fire safety practices, evacuation procedures, and fire prevention measures?", type: "text" },
        { name: "handsOnLearning", label: "Are collaborative activities organized to engage students in hands-on learning experiences, demonstrations, or interactive sessions related to fire safety and emergency preparedness?", type: "radio" },
        // Inspection and Compliance
        { name: "fireInspectionCollaboration", label: "How does the fire department collaborate with the school administration to conduct fire inspections, safety audits, or compliance checks of school facilities and premises?", type: "text" },
        { name: "staffTrainingForViolations", label: "Are school staff, administrators, or designated safety personnel trained to address fire code violations, safety hazards, or deficiencies identified during inspections, and to implement corrective measures in a timely manner?", type: "radio" },
        { name: "complianceCommunication", label: "What mechanisms are in place to ensure ongoing communication, coordination, and follow-up between the school and fire department regarding compliance with fire safety regulations and standards?", type: "text" },
        // Emergency Response Planning
        { name: "emergencyPlanningCollaboration", label: "How does the school administration collaborate with the fire department to develop, review, and update emergency response plans, protocols, and procedures for addressing fire incidents or emergencies on campus?", type: "text" },
        { name: "jointExercises", label: "Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of fire response strategies, evacuation routes, and communication protocols between the school and fire department?", type: "radio" },
        { name: "fireDepartmentRole", label: "What role does the fire department play in providing guidance, expertise, or technical assistance to enhance the school's capacity to respond effectively to fire emergencies and ensure the safety of students, staff, and visitors?", type: "text" },
        // Community Engagement and Outreach
        { name: "communityEngagement", label: "How does the fire department engage with the broader school community, including parents, neighborhood residents, and local businesses, to promote fire safety awareness, preparedness, and collaboration?", type: "text" },
        { name: "communityEvents", label: "Are community events, workshops, or outreach activities organized jointly by the school and fire department to disseminate information, share resources, and foster partnerships around fire prevention and safety?", type: "radio" },
        { name: "communityStrategies", label: "What strategies are employed to leverage the expertise, credibility, and trust of the fire department in building public confidence, resilience, and support for school safety initiatives within the local community?", type: "text" }
    ];

    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Fire Department Collaboration Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Use section titles from the original code if desired */}
                                {index === 0 && <h2>Partnership Objectives and Initiatives:</h2>}
                                {index === 3 && <h2>Fire Prevention Education and Outreach:</h2>}
                                {index === 6 && <h2>Inspection and Compliance:</h2>}
                                {index === 9 && <h2>Emergency Response Planning:</h2>}
                                {index === 12 && <h2>Community Engagement and Outreach:</h2>}

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

                        {/* File Input for Image Upload (Added based on standard pattern) */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Collaboration Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FireDepartmentCollaborationFormPage;