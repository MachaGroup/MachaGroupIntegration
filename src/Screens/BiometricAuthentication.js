import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BiometricAuthenticationPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadBiometricAuthenticationImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Biometric Authentication', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
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
                                 
                try {
                const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Biometric Authentication', buildingId);
                    await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
                    console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
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
        navigate(-1);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Biometric Authentication', buildingId);
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
                <h1>Biometric Authentication Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Biometric Authentication Assessment</h2>
                    {[
                        { name: "biometricUtilization", label: "What percentage of systems and applications within the organization utilize biometric authentication?" },
                        { name: "criticalAccessPoints", label: "Are biometric authentication methods deployed across all critical access points?" },
                        { name: "adoptionMonitoring", label: "How is the adoption of biometric authentication monitored?" },
                        { name: "accuracyAssessment", label: "How does the organization assess the accuracy and reliability of the biometric authentication methods used?" },
                        { name: "unauthorizedAccessIncidents", label: "Are there any documented incidents of unauthorized access despite the use of biometric authentication?" },
                        { name: "dataProtection", label: "How are biometric data and authentication processes protected from potential security threats?" },
                        { name: "userPerception", label: "How do users perceive the ease of use and convenience of the biometric authentication methods currently in place?" },
                        { name: "enrollmentChallenges", label: "Are there any reported challenges or issues faced by users when enrolling their biometric data?" },
                        { name: "userAccommodations", label: "What accommodations are made for users who may have difficulty with biometric authentication?" },
                        { name: "privacyProtection", label: "How does the organization ensure the privacy and protection of biometric data collected from users?" },
                        { name: "unauthorizedAccessProtection", label: "What measures are in place to secure biometric data from unauthorized access?" },
                        { name: "handlingPolicies", label: "Are there clear policies and procedures for handling biometric data?" },
                        { name: "backupOptions", label: "What backup or recovery options are available if users are unable to use their biometric authentication method?" },
                        { name: "failureScenarios", label: "How does the organization handle scenarios where biometric authentication fails?" },
                        { name: "backupGuidelines", label: "Are there guidelines for securely managing and storing backup authentication methods?" },
                        { name: "systemIntegration", label: "How well does the biometric authentication system integrate with other security measures?" },
                        { name: "compatibilityIssues", label: "Are there any compatibility issues with specific devices?" },
                        { name: "enhancementPlans", label: "Does the organization have plans to enhance or expand its biometric authentication capabilities?" },
                        { name: "policyGuidelines", label: "Are there documented policies and guidelines outlining the use and management of biometric authentication?" },
                        { name: "complianceProcess", label: "How does the organization ensure compliance with biometric authentication policies?" },
                        { name: "auditReviews", label: "Are there regular audits or reviews to ensure that biometric authentication practices remain in line with industry standards?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea
                                name={question.name}
                                value={formData[question.name] || ''}
                                onChange={handleChange}
                                placeholder={question.label}
                            />
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

export default BiometricAuthenticationPage;