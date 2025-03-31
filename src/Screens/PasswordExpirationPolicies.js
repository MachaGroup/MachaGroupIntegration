import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, getFunctions, httpsCallable } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PasswordExpirationPoliciesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPasswordExpirationPoliciesPageImage');

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
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Expiration Policies', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Expiration Policies', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Expiration Policies', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef } }, { merge: true });
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
                <h1>Password Expiration Policies Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Password Expiration Policies Assessment</h2>
                    {[
                        { name: "employeeAwareness", label: "Are all employees aware of the password expiration policy, including how often passwords must be changed?" },
                        { name: "policyCommunication", label: "How is the password expiration policy communicated to new employees during onboarding and existing employees as policies update?" },
                        { name: "automatedReminders", label: "Are there automated reminders or notifications in place to alert employees when their passwords are nearing expiration?" },
                        { name: "enforcementMechanisms", label: "What mechanisms are in place to enforce password expiration policies across all organizational systems and applications?" },
                        { name: "nonComplianceConsequences", label: "Are there consequences for non-compliance with password expiration policies, and if so, what are they?" },
                        { name: "complianceMonitoring", label: "How does the organization monitor compliance with password expiration policies, and are there reports generated for IT or security teams?" },
                        { name: "policyEffectiveness", label: "How does the organization assess the effectiveness of password expiration policies in reducing the risk of unauthorized access or security breaches?" },
                        { name: "impactMetrics", label: "Are there metrics or key performance indicators (KPIs) used to evaluate the impact of regular password changes on overall cybersecurity?" },
                        { name: "incidentResponse", label: "Has the organization experienced any security incidents that were attributed to expired or unchanged passwords? What measures were taken in response?" },
                        { name: "employeePerception", label: "How do employees perceive the password expiration policy in terms of convenience and practicality? Does it lead to frequent reset requests or difficulties?" },
                        { name: "supportMechanisms", label: "Are there any support mechanisms in place (e.g., IT helpdesk) to assist employees who have trouble complying with password expiration policies?" },
                        { name: "securityBalance", label: "How does the organization balance the need for security through regular password changes with the potential burden on employees?" },
                        { name: "policyIntegration", label: "How do password expiration policies integrate with other security measures, such as multi-factor authentication (MFA) or single sign-on (SSO) systems?" },
                        { name: "authGuidelines", label: "Are there specific guidelines or recommendations for password changes when other authentication methods are in use to enhance overall security?" },
                        { name: "additionalSecurity", label: "Does the organization encourage or require additional security measures, such as MFA, when a password has expired or been recently changed?" },
                        { name: "policyReviewFrequency", label: "How often does the organization review and update its password expiration policies to align with industry best practices and emerging security threats?" },
                        { name: "feedbackProcess", label: "Is there a process for collecting and incorporating feedback from employees on the password expiration policy to improve its effectiveness and user-friendliness?" },
                        { name: "policyAdjustments", label: "Are adjustments to the policy made based on technological advancements or changes in the threat landscape?" },
                        { name: "employeeTraining", label: "Are employees provided with training on the importance of regular password changes and how to manage them effectively?" },
                        { name: "multiSystemSupport", label: "How does the organization support employees in adhering to the password expiration policy, especially those with access to multiple systems?" },
                        { name: "passwordManagementTools", label: "Are there resources or tools available to help employees manage their passwords more efficiently, such as password managers?" }
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input
                            type="radio"
                            name={question.name}
                            value="yes"
                            checked={formData[question.name] === "yes"}
                            onChange={handleChange} /> Yes
                          <input
                            type="radio"
                            name={question.name}
                            value="no"
                            checked={formData[question.name] === "no"}
                            onChange={handleChange} /> No

                        </div>
                      </div><input
                          type="text"
                          name={`${question.name}Comment`}
                          placeholder="Additional comments"
                          value={formData[`${question.name}Comment`] || ''}
                          onChange={handleChange} /></>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PasswordExpirationPoliciesPage;