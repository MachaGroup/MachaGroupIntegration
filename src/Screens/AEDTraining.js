import React, { useState, useEffect } from 'react';
// Added necessary imports: getDoc, setDoc, getFunctions, httpsCallable
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// Removed storage imports, addDoc
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
// Added functions imports
import { getFunctions, httpsCallable } from "firebase/functions";

function AEDTrainingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    // Added functions initialization
    const functions = getFunctions();
    // Added httpsCallable setup for image uploads
    const uploadImage = httpsCallable(functions, 'uploadAEDTrainingImage'); // Function name derived from component

    const [formData, setFormData] = useState({});
    // Added necessary state: imageData, imageUploadError, loading, loadError
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    // Removed unused state: image, uploadProgress, uploadError

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return; // Ensure execution stops here
        }

        // Added fetchFormData function like securitygates
        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                // Target specific document path
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'AED Training', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const loadedData = docSnapshot.data().formData || {};
                    setFormData(loadedData);
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

    // Simplified handleChange and added auto-save like securitygates
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Save changes automatically
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'AED Training', buildingId);
            const dataToSave = { ...newFormData, building: buildingRef };
             if (imageUrl) {
                dataToSave.imageUrl = imageUrl;
            }
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            console.log("Form data saved to Firestore:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            // setFormData(formData); // Optional: Revert state
        }
    };

    // handleImageChange using base64 like securitygates
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result); // Store base64
        };
        reader.readAsDataURL(file);
    };

    // Simplified handleBack like securitygates
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using Cloud Function upload and final save like securitygates
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        setLoading(true);
        setImageUploadError(null);

        let finalImageUrl = formData.imageUrl || null;

        // 1. Upload image via Cloud Function if new one selected
        if (imageData) {
            try {
                console.log("Uploading new image via Cloud Function...");
                const uploadResult = await uploadImage({ imageData: imageData }); // Pass base64
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                setLoading(false);
                alert("Error uploading image. Please try again.");
                return;
            }
        }

        // 2. Save final form data
        try {
            console.log("Saving final form data...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'AED Training', buildingId);

            const finalFormData = {
                ...formData,
                ...(finalImageUrl && { imageUrl: finalImageUrl }),
                building: buildingRef
            };

            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            setLoading(false);
            navigate('/Form');
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            setLoading(false);
        }
    };

     // Loading indicator
    if (loading && !loadError) {
        return <div>Loading...</div>;
    }

    // Error display
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Define questions in an array like securitygates
    const questions = [
        // Section 1
        { name: "aed-familiarity", label: "How familiar are staff members with the location, accessibility, and operation of AEDs installed within the school premises?" },
        { name: "aed-strategic-positioning", label: "Are AED units strategically positioned in easily accessible locations, clearly marked with signage, and consistently maintained in operational condition?" },
        { name: "aed-availability-measures", label: "What measures are in place to ensure that AEDs are readily available for prompt deployment in response to sudden cardiac arrest emergencies?" },
        // Section 2
        { name: "aed-training-topics", label: "What topics and skills are covered in AED training courses to prepare staff members for effective use of AED devices during cardiac arrest emergencies?" },
        { name: "aed-training-alignment", label: "Are training materials and resources aligned with recognized AED training programs, guidelines, and recommendations from organizations such as the American Heart Association (AHA) or similar accredited institutions?" },
        { name: "aed-training-key-concepts", label: "How do AED training courses address key concepts such as AED functionality, electrode pad placement, device prompts interpretation, and hands-free CPR integration?" },
        // Section 3
        { name: "aed-practice-sessions", label: "To what extent do AED training sessions incorporate hands-on practice, skills demonstration, and scenario-based simulations to reinforce participant learning and confidence in AED use?" },
        { name: "aed-practice-opportunities", label: "Are staff members provided with opportunities to practice AED deployment, pad placement, device operation, and CPR coordination under simulated cardiac arrest scenarios?" },
        { name: "aed-simulation-scenarios", label: "How are AED training simulations tailored to simulate real-life emergency situations and challenge staff members to apply their knowledge and skills effectively?" },
        // Section 4
        { name: "aed-maintenance-procedures", label: "What procedures are in place to ensure the regular maintenance, inspection, and testing of AED equipment to verify functionality, battery readiness, and electrode pad integrity?" },
        { name: "aed-maintenance-training", label: "Are designated staff members trained to perform routine checks, replace expired components, and troubleshoot technical issues with AED devices as part of ongoing maintenance protocols?" },
        { name: "aed-maintenance-records", label: "How are AED maintenance records, usage logs, and performance indicators monitored and documented to ensure compliance with regulatory requirements and manufacturer recommendations?" },
        // Section 5
        { name: "aed-protocol-integration", label: "How are AED deployment protocols integrated into broader emergency response plans, procedures, and protocols within the school environment?" },
        { name: "sudden-cardiac-response-training", label: "Are staff members trained to recognize the signs of sudden cardiac arrest, activate the emergency response system, and initiate AED use promptly and effectively?" },
        { name: "aed-coordination-mechanisms", label: "What coordination mechanisms are in place to facilitate communication, collaboration, and teamwork among responders during AED deployment and CPR administration?" },
    ];


    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                {/* Simplified Title */}
                <h1>AED Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     {/* Simplified Title */}
                    <h2>AED Training Questions</h2>

                    {/* Map questions using the securitygates format */}
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
                             {/* Consistent comment input */}
                            <input
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className="comment-input"
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
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default AEDTrainingFormPage;