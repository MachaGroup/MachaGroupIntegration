import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore'; // Added collection import (good practice, though not strictly needed by downstream code here)
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BasicFirstAidTechniquesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // This already follows the pattern 'upload' + 'BasicFirstAidTechniques' + 'Image' derived from the component name/topic.
    const uploadImage = httpsCallable(functions, 'uploadBasicFirstAidTechniquesImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            // Using absolute path as it's generally safer
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                // Correct Firestore path for this form
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                    // Set existing image URL if present
                    if (docSnapshot.data().formData?.imageUrl) {
                       setImageUrl(docSnapshot.data().formData.imageUrl);
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
     
        // Save changes automatically, including building reference
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);
            // Ensure imageUrl from state is included if it exists
            const dataToSave = { ...newFormData, building: buildingRef };
            if (imageUrl) {
                dataToSave.imageUrl = imageUrl;
            }
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            console.log("Form data saved to Firestore:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            // Optional: revert state change if save fails?
            // setFormData(formData); // Revert state if needed
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return; // Handle case where user cancels file selection
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result); // Store base64 data for upload
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

        setLoading(true); // Indicate submission process start
        setImageUploadError(null); // Clear previous errors

        let finalImageUrl = formData.imageUrl || null; // Start with existing URL

        // 1. Upload image if new one is selected
        if (imageData) { // imageData holds the new base64 image
            try {
                console.log("Uploading new image...");
                const uploadResult = await uploadImage({ imageData: imageData });
                finalImageUrl = uploadResult.data.imageUrl; // Get the URL from the function response
                setImageUrl(finalImageUrl); // Update display URL
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                setLoading(false); // Stop loading on upload error
                alert("Error uploading image. Please try again.");
                return; // Stop submission if image upload fails
            }
        }

        // 2. Save final form data (including final image URL and building ref)
        try {
            console.log("Saving final form data...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);

            // Prepare final data, ensuring the latest image URL is included
            const finalFormData = {
                 ...formData,
                 ...(finalImageUrl && { imageUrl: finalImageUrl }), // Add/update imageUrl if it exists
                 building: buildingRef
                };


            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            setLoading(false); // Indicate submission process end
            navigate('/Form'); // Navigate after successful submission
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            setLoading(false); // Indicate submission process end even on error
        }
    };

    // Show loading indicator during fetch or submit
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error if data fetching failed
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Define questions array (consistent with securitygates)
    const questions = [
         { name: "first-aid-comprehensiveness", label: "How comprehensively are basic first aid techniques covered in staff training programs?" },
         { name: "training-modules-structure", label: "Are training modules structured to provide a balance of theoretical knowledge, practical skills demonstrations, and hands-on practice sessions?" },
         { name: "first-aid-materials-coverage", label: "To what extent do training materials and resources address the application of basic first aid techniques in various emergency scenarios encountered in the school environment?" },
         { name: "emergency-recognition-training", label: "Are staff members trained to recognize common signs and symptoms of medical emergencies and injuries that may require immediate first aid intervention?" },
         { name: "first-aid-proficiency-assessment", label: "How are staff members assessed or evaluated to ensure proficiency in applying basic first aid techniques in simulated or real-life emergency situations?" },
         { name: "skills-practice-opportunities", label: "What opportunities are provided for staff members to practice and demonstrate basic first aid techniques in simulated scenarios, role-playing exercises, or skills stations?" },
         { name: "hands-on-props-usage", label: "Are hands-on practice sessions conducted using realistic training props, medical manikins, or simulated casualties to simulate various injury types and emergency scenarios?" },
         { name: "instructor-guidance", label: "How are staff members guided and supported by certified instructors, facilitators, or subject matter experts during hands-on skills practice sessions?" },
         { name: "skills-feedback", label: "Are staff members encouraged to actively participate in skills practice activities and receive constructive feedback on their performance?" },
         { name: "learning-reinforcement-mechanisms", label: "What mechanisms are in place to reinforce learning and encourage ongoing skills development beyond initial training sessions?" },
         { name: "first-aid-integration", label: "How are basic first aid techniques integrated into broader emergency response plans, procedures, and protocols?" },
         { name: "life-threatening-priority-training", label: "Are staff members trained to recognize and prioritize life-threatening conditions and administer basic first aid interventions in accordance with established protocols and medical guidelines?" },
         { name: "responder-coordination", label: "How do staff members coordinate and communicate with other responders, emergency services, or healthcare providers when providing basic first aid assistance during emergencies?" },
         { name: "continuity-of-care-provisions", label: "What provisions are in place to ensure continuity of care and seamless transition of injured or ill individuals to higher levels of medical care?" },
         { name: "first-aid-documentation-training", label: "Are staff members trained to document and report basic first aid interventions within the school's incident reporting system or medical logbook?" },
         { name: "post-aid-management", label: "How are injured or ill individuals managed and monitored following basic first aid interventions?" },
         { name: "care-transfer-procedures", label: "What procedures are in place to ensure continuity of care and facilitate patient transport or transfer to higher levels of medical care?" },
         { name: "emotional-support-training", label: "Are staff members trained to provide emotional support, reassurance, and ongoing monitoring to individuals receiving basic first aid interventions?" },
         { name: "follow-up-procedures", label: "How are follow-up procedures implemented to document incidents, assess outcomes, and provide post-incident debriefing or support?" },
         { name: "community-resources-awareness", label: "Are staff members familiar with community resources and referral pathways for individuals requiring additional medical or psychological support beyond basic first aid?" },
         { name: "aid-intervention-documentation", label: "How are basic first aid interventions documented, recorded, and reported within the school's incident reporting system or electronic health record system?" },
         { name: "documentation-guidance", label: "What training or guidance is provided to staff members on the importance of timely and accurate documentation, confidentiality requirements, and legal considerations?" },
         { name: "clear-documentation-training", label: "Are staff members trained to document patient assessments, treatments provided, and follow-up actions taken in a clear, concise, and objective manner?" },
         { name: "record-analysis", label: "How are medical records or incident reports reviewed and analyzed to identify trends, evaluate response effectiveness, and inform continuous improvement efforts?" },
         { name: "documentation-responsibility-awareness", label: "Are staff members aware of their responsibilities regarding incident reporting, documentation protocols, and data privacy regulations when documenting basic first aid treatments?" }
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                {/* Title consistent with component purpose */}
                <h1>Basic First Aid Techniques</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Form title consistent with component purpose */}
                    <h2>Basic First Aid Techniques Assessment</h2>

                    {/* Map questions using the securitygates format */}
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div> {/* Container for radio buttons */}
                                <input
                                    type="radio"
                                    id={`${question.name}-yes`} // Add id for better accessibility
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-yes`}> Yes</label> {/* Label for radio */}

                                <input
                                    type="radio"
                                    id={`${question.name}-no`} // Add id for better accessibility
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-no`}> No</label> {/* Label for radio */}
                            </div>
                            {/* Use input type="text" for comments, like securitygates */}
                            <input
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments" // Placeholder like securitygates
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className="comment-input" // Optional: Add class for styling
                            />
                        </div>
                    ))}

                    {/* Image Upload Section */}
                    <div className="form-section"> {/* Wrap file input for consistency */}
                        <label htmlFor="imageUpload">Upload Supporting Image (Optional):</label>
                        <input id="imageUpload" type="file" onChange={handleImageChange} accept="image/*" />
                        {/* Display existing or newly uploaded image */}
                        {imageUrl && <img src={imageUrl} alt="Uploaded evidence" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {/* Display image upload error */}
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

export default BasicFirstAidTechniquesFormPage;