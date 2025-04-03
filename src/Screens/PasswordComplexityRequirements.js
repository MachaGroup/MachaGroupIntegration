import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc,  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PasswordComplexityRequirementsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPasswordComplexityRequirementsPageImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Complexity Requirements', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Complexity Requirements', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Password Complexity Requirements', buildingId);
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
                <h1>Password Complexity Requirements Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Password Complexity Requirements Assessment</h2>
                    {[
                        { name: "employeeAwareness", label: "Are all employees aware of the organization's password complexity requirements, including the minimum length and the use of special characters?" },
                        { name: "reminderFrequency", label: "How frequently are employees reminded of the password complexity policy, and through what channels (e.g., email, training sessions, policy documents)?" },
                        { name: "trainingMaterials", label: "Are there educational materials or training sessions provided to help employees understand the importance of using complex passwords?" },
                        { name: "enforcementMeasures", label: "What measures are in place to enforce compliance with password complexity requirements across all systems and applications?" },
                        { name: "complianceMonitoring", label: "How is compliance with password complexity requirements monitored and reported?" },
                        { name: "regularAudits", label: "Are there regular audits or checks to ensure that employees are adhering to password complexity guidelines?" },
                        { name: "evaluateEffectiveness", label: "How does the organization evaluate the effectiveness of password complexity requirements in preventing unauthorized access or breaches?" },
                        { name: "documentedIncidents", label: "Are there any documented incidents where weak passwords, despite the policy, led to security breaches? If so, what actions were taken to address the gaps?" },
                        { name: "reviewFrequency", label: "How frequently does the organization review and update its password complexity requirements to respond to emerging security threats?" },
                        { name: "userFriendliness", label: "Are the password complexity requirements user-friendly, or do they lead to difficulties in remembering passwords or frequent reset requests?" },
                        { name: "balanceComplexity", label: "How does the organization balance strong password complexity with usability to avoid negative impacts on employee productivity?" },
                        { name: "passwordTools", label: "Are there guidelines or tools provided to help employees create and remember complex passwords (e.g., password managers, mnemonic techniques)?" },
                        { name: "integrationSecurity", label: "How do password complexity requirements integrate with other security measures, such as two-factor authentication (2FA) or single sign-on (SSO)?" },
                        { name: "authGuidelines", label: "Are there specific guidelines for password complexity when used in conjunction with other authentication methods to enhance overall security?" },
                        { name: "passphraseEncourage", label: "Does the organization encourage or require the use of passphrases (longer sequences of words) in addition to traditional complex passwords?" },
                        { name: "feedbackProcess", label: "Is there a process for employees to provide feedback on the password complexity requirements, particularly if they encounter issues?" },
                        { name: "feedbackUse", label: "How is employee feedback used to adjust password policies to better meet security needs without creating undue burden?" },
                        { name: "policyReview", label: "Are there periodic reviews of the password complexity policy to ensure it remains effective against evolving cyber threats?" },
                        { name: "employeeTraining", label: "Are employees provided with training on how to create strong, memorable passwords that meet complexity requirements?" },
                        { name: "transitionSupport", label: "How does the organization support employees in transitioning to more complex passwords (e.g., phased implementation, support from IT)?" },
                        { name: "assistanceResources", label: "Are there resources available for employees who need assistance or have questions about creating or managing complex passwords?" }
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

export default PasswordComplexityRequirementsPage;