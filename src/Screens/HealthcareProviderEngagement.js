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

function HealthcareProviderEngagementFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadHealthcareProviderEngagementFormImage');

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
             // Use current date
            alert(`No building selected (as of ${new Date().toLocaleDateString()}). Redirecting to Building Info...`);
            navigate('/BuildingandAddress'); // Ensure navigation path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore document path for this form
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Healthcare Provider Engagement', buildingId);

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
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value; // Assuming values already lowercase yes/no
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Healthcare Provider Engagement', buildingId);
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

        // Prepare final data, ensuring building ref is included
        const finalFormData = { ...formData, imageUrl: finalImageUrl };


        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Healthcare Provider Engagement', buildingId);
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

    // Define questions with standardized names and types
    const questions = [
        // Collaborative Initiatives and Objectives
        { name: "collaborativeObjectives", label: "What are the primary objectives and focus areas of collaboration between the school or educational institution and healthcare providers in the community?", type: "text" },
        { name: "jointProgramsExamples", label: "Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and healthcare providers to promote health and wellness, address medical needs, or enhance emergency medical response within the school community?", type: "text" },
        { name: "partnershipAlignment", label: "How is the partnership with healthcare providers aligned with broader school health goals, emergency preparedness efforts, or community health promotion initiatives?", type: "text" },
        // Medical Response Coordination
        { name: "medicalResponseCoordination", label: "How do healthcare providers coordinate with the school administration and designated medical personnel to support medical response efforts during emergencies, incidents, or health-related crises on campus?", type: "text" },
        { name: "medicalProtocols", label: "Are protocols established for accessing medical expertise, resources, or support services from healthcare providers in the event of medical emergencies, injuries, or illness occurring within the school community?", type: "text" },
        { name: "healthcareProviderRole", label: "What role do healthcare providers play in providing guidance, training, or medical oversight to school staff, administrators, or designated responders regarding medical response procedures and protocols?", type: "text" },
        // Health Education and Outreach
        { name: "healthEducationContribution", label: "How do healthcare providers contribute to health education and outreach efforts within the school community, including students, staff, and families?", type: "text" },
        { name: "resourcesProvidedHealth", label: "What resources, materials, or presentations does the healthcare community provide to educate students about health promotion, disease prevention, or general wellness practices?", type: "text" },
        { name: "interactiveLearning", label: "Are collaborative activities organized to engage students in interactive learning experiences, workshops, or health screenings conducted by healthcare professionals?", type: "radio" },
        // Health Services Integration
        { name: "healthcareIntegration", label: "How are healthcare services integrated into the broader support systems and resources available to students within the school setting?", type: "text" },
        { name: "accessMechanisms", label: "Are mechanisms in place to facilitate access to healthcare services, referrals, or follow-up care for students in need of medical attention or specialized treatment?", type: "text" },
        { name: "continuityOfCareStrategies", label: "What strategies are employed to promote continuity of care, communication, and collaboration between school-based health services and external healthcare providers?", type: "text" },
        // Community Health Promotion
        { name: "communityHealthEngagement", label: "How do healthcare providers engage with the broader school community, including parents, caregivers, and local residents, to promote health literacy, healthy lifestyles, and preventive healthcare practices?", type: "text" },
        { name: "communityHealthEvents", label: "Are community health fairs, wellness events, or educational workshops organized jointly by the school and healthcare providers to raise awareness about health-related issues and resources available in the community?", type: "radio" },
        { name: "healthDisparitiesEfforts", label: "What efforts are made to address health disparities, cultural competence, or social determinants of health within the school community through collaborative partnerships with healthcare providers?", type: "text" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Healthcare Provider Engagement Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                         {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Collaborative Initiatives and Objectives:</h2>}
                                {index === 3 && <h2>Medical Response Coordination:</h2>}
                                {index === 6 && <h2>Health Education and Outreach:</h2>}
                                {index === 9 && <h2>Health Services Integration:</h2>}
                                {index === 12 && <h2>Community Health Promotion:</h2>}


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
                             {imageUrl && <img src={imageUrl} alt="Uploaded Healthcare Engagement Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default HealthcareProviderEngagementFormPage;