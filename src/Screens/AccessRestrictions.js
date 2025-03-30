import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AccessRestrictionsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadAccessRestrictionsImage');


    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
 

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Access Restrictions', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
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

        try {
            // Persist data to Firestore on every change
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Access Restrictions', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true }); // Use merge to preserve existing fields
            console.log("Form data saved to Firestore:", newFormData);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleBack = () => {
        navigate(-1); // Just navigate back
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Access Restrictions', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');

        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }
 
    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>5.1.1.1.1 Access Restrictions Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.1.1.1.1 Recertification Frequency</h2>
                    {[
                        { name: "prohibitedWebsites", label: "What types of websites or online content are explicitly prohibited by the Acceptable Use Policy (AUP) (e.g., adult content, gambling sites)?" },
                        { name: "definedRestrictions", label: "How are these restrictions defined and categorized within the policy?" },
                        { name: "clearGuidelines", label: "Are there clear guidelines on what constitutes prohibited websites or online activities?" },
                        { name: "enforcedRestrictions", label: "How are access restrictions enforced on the network (e.g., through web filters, firewalls)?" },
                        { name: "blockedAccess", label: "What tools or technologies are used to block access to prohibited websites?" },
                        { name: "frequentUpdates", label: "How frequently are these tools updated to ensure effectiveness against new or evolving threats?" },
                        { name: "informedUsers", label: "How are users informed about the access restrictions and prohibited websites (e.g., through training, policy documents)?" },
                        { name: "notifiedUsers", label: "Are there mechanisms in place to notify users when they attempt to access a restricted site?" },
                        { name: "aupCompliance", label: "How is compliance with the AUP communicated to users to ensure they understand the restrictions?" },
                        { name: "requestingExceptions", label: "What procedures are in place for requesting exceptions to the access restrictions (e.g., for educational or research purposes)?" },
                        { name: "authorizedUser", label: "Who is authorized to review and approve requests for access to restricted websites?" },
                        { name: "handlingExpectations", label: "Are there documented processes for handling and documenting exceptions?" },
                        { name: "monitoredActivity", label: "How is user activity monitored to ensure compliance with access restrictions (e.g., logging, auditing)?" },
                        { name: "reportMethods", label: "What methods are used to track and report attempts to access prohibited websites?" },
                        { name: "addressedViolations", label: "How are violations of access restrictions addressed and managed?" },
                        { name: "reviewedPolicy", label: "How frequently is the Acceptable Use Policy reviewed and updated to reflect changes in technology and threats?" },
                        { name: "revisingPolicy", label: "Who is responsible for reviewing and revising the policy, and what criteria are used for updates?" },
                        { name: "communicatedUpdates", label: "How are updates communicated to users to ensure they are aware of any changes in access restrictions?" },
                        { name: "impactedRequirements", label: "What legal or regulatory requirements impact the development and enforcement of access restrictions (e.g., data protection laws)?" },
                        { name: "ensuredCompliance", label: "How does the policy ensure compliance with relevant laws and regulations regarding internet usage?" },
                        { name: "legalIssues", label: "Are there procedures for addressing legal or regulatory issues related to access restrictions?" },
                        { name: "trainingPrograms", label: "What training programs are in place to educate users about the Acceptable Use Policy and access restrictions?" },
                        { name: "assessedTraining", label: "How is the effectiveness of the training assessed and improved over time?" },
                        { name: "accessRestrictions", label: "Are there resources available for users to better understand the reasons for access restrictions?" },
                        { name: "violatingAccess", label: "What steps are taken when a user repeatedly attempts to access prohibited websites or violates access restrictions?" },
                        { name: "restrictionViolations", label: "How are incidents related to access restriction violations documented and managed?" },
                        { name: "disciplinaryActions", label: "What disciplinary actions are outlined in the policy for non-compliance?" },
                        { name: "collectedFeedback", label: "How is feedback collected from users regarding the effectiveness and impact of access restrictions?" },
                        { name: "relatedSuggestions", label: "Are there mechanisms for users to provide suggestions or report issues related to access restrictions?" },
                        { name: "improvementFeedback", label: "How is feedback used to make improvements to the Acceptable Use Policy and access restriction mechanisms?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "clearGuidelines" || question.name === "notifiedUsers" || question.name === "handlingExpectations" || question.name === "legalIssues" || question.name === "accessRestrictions" || question.name === "relatedSuggestions" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="yes"
                                            checked={formData[question.name] === "yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="no"
                                            checked={formData[question.name] === "no"}
                                            onChange={handleChange}
                                        /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessRestrictionsPage;