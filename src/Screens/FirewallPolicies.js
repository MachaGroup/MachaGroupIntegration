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

function FirewallPoliciesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFirewallPoliciesImage');

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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Firewall Policies', buildingId);

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
        const standardizedValue = (value === 'Yes' || value === 'No') ? value.toLowerCase() : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);


        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Firewall Policies', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Firewall Policies', buildingId);
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

    // Define questions with types
    const questions = [
        // Policy Definition and Scope
        { name: "policyCriteria", label: "What criteria are used to define the firewall policies, and how do these criteria align with the organization's overall security objectives and regulatory requirements?", type: "text" },
        { name: "specificPolicies", label: "Are there specific policies in place for different types of network traffic (e.g., inbound, outbound, internal), and how are these tailored to the needs of various departments or user groups?", type: "radio" },
        { name: "policyReviewFrequency", label: "How frequently are firewall policies reviewed and updated to ensure they remain effective against new threats and comply with evolving security standards?", type: "text" },
        // Implementation and Configuration
        { name: "implementationProcedures", label: "What procedures are followed to implement firewall policies, and how are these policies tested for effectiveness and security before going live?", type: "text" },
        { name: "policyExceptions", label: "How are exceptions to standard firewall policies handled (e.g., temporary access needs, special cases), and what controls are in place to minimize risks associated with such exceptions?", type: "text" },
        { name: "automatedTools", label: "Are there automated tools or scripts used to manage and deploy firewall policies across different devices and network segments, and how are these tools maintained?", type: "radio" },
        // Monitoring and Incident Response
        { name: "monitoringMetrics", label: "How is firewall activity monitored to detect and respond to unauthorized access attempts or breaches, and what metrics are used to gauge the effectiveness of firewall policies?", type: "text" },
        { name: "incidentResponse", label: "Are there defined procedures for responding to incidents where firewall policies fail to prevent unauthorized access, including root cause analysis and policy adjustments?", type: "text" },
        { name: "loggingAuditing", label: "What logging and auditing mechanisms are in place to track changes to firewall policies and access attempts, and how are these logs reviewed for signs of potential threats?", type: "text" },
        // Training and Awareness
        { name: "trainingPrograms", label: "What training programs are provided to IT staff responsible for managing and configuring firewall policies, and how is their knowledge kept current with evolving security practices?", type: "text" },
        { name: "documentationGuidelines", label: "Are there clear documentation and guidelines available on how to apply and modify firewall policies, and how frequently is this information reviewed for accuracy?", type: "radio" },
        { name: "awarenessCommunication", label: "How is awareness of firewall policy importance communicated across the organization, particularly to those whose activities may impact network security?", type: "text" },
        // Compliance and Best Practices
        { name: "complianceVerification", label: "Are firewall policies aligned with industry best practices and compliance requirements (e.g., PCI-DSS, HIPAA, GDPR), and how is compliance verified?", type: "text" },
        { name: "policyAdaptation", label: "How are policies adapted to account for changes in network architecture, such as the addition of new devices or the implementation of cloud services?", type: "text" },
        { name: "benchmarkingProcess", label: "Is there a process for benchmarking firewall policies against peer organizations or security standards to ensure continuous improvement and adoption of best practices?", type: "text" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Firewall Policies Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>4.1.1.1.2.1 Policy Definition and Scope:</h2>}
                                {index === 3 && <h2>4.1.1.1.2.2 Implementation and Configuration:</h2>}
                                {index === 6 && <h2>4.1.1.1.2.3 Monitoring and Incident Response:</h2>}
                                {index === 9 && <h2>4.1.1.1.2.4 Training and Awareness:</h2>}
                                {index === 12 && <h2>4.1.1.1.2.5 Compliance and Best Practices:</h2>}


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
                                    // Render single text input for text-based questions (changed from textarea)
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
                             {imageUrl && <img src={imageUrl} alt="Uploaded Firewall Policy Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FirewallPoliciesPage;