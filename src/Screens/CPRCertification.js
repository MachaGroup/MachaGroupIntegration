import React, { useState, useEffect } from 'react';
// Removed storage imports, added getDoc
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";
// Removed unused query/where/getDocs/addDoc imports

function CPRCertificationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable and updated function name string per user request pattern
    const uploadImage = httpsCallable(functions, 'uploadCPRCertificationImage');

    const [formData, setFormData] = useState({});
    // Added imageData (for base64), replaced image (File obj)
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    // Renamed uploadError to imageUploadError for consistency
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    // Added loadError state
    const [loadError, setLoadError] = useState(null);
    // Removed unused storage state: uploadProgress

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        // Renamed loadFormData to fetchFormData for consistency
        const fetchFormData = async () => {
            setLoading(true);
            // Reset loadError on fetch attempt
            setLoadError(null);

            try {
                // Target specific document path, like securitygates
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'CPR Certification', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const loadedData = docSnapshot.data().formData || {};
                    setFormData(loadedData);
                     // Set existing image URL if present
                    if (loadedData.imageUrl) {
                       setImageUrl(loadedData.imageUrl);
                    }
                } else {
                    setFormData({}); // Initialize empty if no doc exists
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                // Set loadError state
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [buildingId, db, navigate]);

    // Updated handleChange to save on change, like securitygates
    const handleChange = async (e) => {
        const { name, value } = e.target;
        // Update local state first
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Save changes automatically to Firestore
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'CPR Certification', buildingId);
             // Ensure imageUrl from state is included if it exists
            const dataToSave = { ...newFormData, building: buildingRef };
            if (imageUrl) {
                dataToSave.imageUrl = imageUrl;
            }
            // Use setDoc with merge:true to save/update the specific document
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            console.log("Form data saved to Firestore:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            // Optional: Revert state if save fails
            // setFormData(formData);
        }
    };

    // Updated handleImageChange for base64, like securitygates
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            // Store base64 data in imageData state
            setImageData(reader.result);
            // Clear previous image URL if a new file is selected
            // setImageUrl(null); // Optional: depends on desired UX
        };
        reader.readAsDataURL(file);
    };

    // Simplified handleBack, like securitygates (data saved on change)
    const handleBack = () => {
        navigate(-1);
    };

    // Updated handleSubmit for Cloud Function upload and final save, like securitygates
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        setLoading(true); // Indicate submission process start
        setImageUploadError(null); // Clear previous errors

        let finalImageUrl = formData.imageUrl || null; // Start with existing or previously saved URL

        // 1. Upload image via Cloud Function if new one is selected (imageData has base64)
        if (imageData) {
            try {
                console.log("Uploading new image via Cloud Function...");
                // Use the uploadImage Cloud Function
                const uploadResult = await uploadImage({ imageData: imageData }); // Pass base64 data
                finalImageUrl = uploadResult.data.imageUrl; // Get the URL from the function response
                setImageUrl(finalImageUrl); // Update display URL state
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                setLoading(false); // Stop loading on upload error
                alert("Error uploading image. Please try again.");
                return; // Stop submission if image upload fails
            }
        }

        // 2. Save final form data (to the specific doc path)
        try {
            console.log("Saving final form data...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'CPR Certification', buildingId);

            // Prepare final data, ensuring the latest image URL and building ref are included
            const finalFormData = {
                ...formData,
                ...(finalImageUrl && { imageUrl: finalImageUrl }), // Add/update imageUrl if it exists
                building: buildingRef
            };

            // Use setDoc with merge:true on the specific document
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

    // Use loading state for initial fetch and final submit
    if (loading && !loadError) { // Show loading only if no error occurred during load
        return <div>Loading...</div>;
    }

    // Display load error if fetching failed
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Consolidate and simplify question definitions
    const questions = [
        // Section 1 Questions
        { name: "cpr-certification-standards", label: "What certification standards or guidelines are followed for CPR training, such as those set by recognized organizations like the American Heart Association (AHA), American Red Cross (ARC), or similar accredited institutions?" },
        { name: "cpr-standards-alignment", label: "Are CPR certification courses aligned with the latest industry standards, guidelines, and best practices for adult, child, and infant CPR techniques, as well as automated external defibrillator (AED) use and choking relief procedures?" },
        { name: "cpr-techniques-addressed", label: "How do certification programs address specific CPR techniques, compression-to-ventilation ratios, rescuer fatigue management, and other factors that may impact the effectiveness of CPR interventions?" },
        // Section 2 Questions
        { name: "cpr-instructor-qualifications", label: "What qualifications, credentials, and experience do CPR instructors possess to deliver high-quality training and ensure participant competency?" },
        { name: "instructor-certification", label: "Are CPR instructors certified by recognized CPR training organizations and accredited to teach CPR courses to school staff members?" },
        { name: "certifying-organizations", label: "List the organizations" }, // Assuming this needs a text comment field like others
        { name: "instructor-updates", label: "How do instructors stay updated on changes in CPR protocols, instructional methodologies, and training techniques to deliver relevant and effective CPR certification programs?" },
        // Section 3 Questions
        { name: "course-delivery-methods", label: "How are CPR certification courses delivered to accommodate diverse learning styles, preferences, and scheduling constraints of school staff members?" },
        { name: "training-delivery-modes", label: "Are training sessions conducted in-person, online, or through blended learning approaches that combine both classroom instruction and self-paced online modules?" },
        { name: "training-resources-utilized", label: "What training resources, materials, and technologies are utilized to enhance participant engagement, skills acquisition, and knowledge retention during CPR certification courses?" },
        // Section 4 Questions
        { name: "cpr-skills-assessment", label: "How are CPR skills assessed and evaluated to ensure staff members achieve and maintain proficiency in performing CPR techniques effectively?" },
        { name: "hands-on-practice-opportunities", label: "Are participants provided with opportunities for hands-on practice, skills demonstrations, and scenario-based simulations to apply CPR skills in simulated emergency situations?" },
        { name: "competency-criteria", label: "What criteria or performance standards are used to measure participant competency, and how are assessments conducted to verify skill mastery and readiness to respond to cardiac arrest events?" },
        // Section 5 Questions
        { name: "recertification-requirements", label: "What are the recertification requirements and intervals for maintaining CPR certification among school staff members, as recommended by CPR training organizations or regulatory agencies?" },
        { name: "recertification-course-availability", label: "Are recertification courses offered regularly to ensure staff members renew their CPR certification within the specified timeframe and stay updated on CPR protocols and techniques?" },
        { name: "recertification-communication", label: "How are staff members informed about recertification deadlines, renewal procedures, and opportunities for continuing education to sustain their CPR skills and knowledge over time?" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                {/* Simplified Title */}
                <h1>CPR Certification Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Single H2 Title */}
                    <h2>CPR Certification Questions</h2>

                    {/* Single map loop for all questions */}
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div> {/* Container for radio buttons */}
                                <input
                                    type="radio"
                                    id={`${question.name}-yes`}
                                    name={question.name}
                                    value="yes"
                                    // Check against string "yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-yes`}> Yes</label>

                                <input
                                    type="radio"
                                    id={`${question.name}-no`}
                                    name={question.name}
                                    value="no"
                                     // Check against string "no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}-no`}> No</label>
                            </div>
                            {/* Consistent text input for comments */}
                            <input
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments" // Consistent placeholder
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className="comment-input"
                            />
                        </div>
                    ))}

                    {/* Image Upload Section - Consistent with securitygates */}
                     <div className="form-section">
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

export default CPRCertificationFormPage;