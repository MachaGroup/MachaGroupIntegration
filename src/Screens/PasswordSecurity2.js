import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PasswordSecurity2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPasswordSecurity2FormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Password Security', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Password Security', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Password Security', buildingId);
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
                <h1>3.1.1.4.2.2 Password Security Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>3.1.1.4.2.2.1 Password Creation Best Practices:</h2>
                    {[
                        { name: "passwordCreationTraining", label: "Are staff members trained on best practices for creating strong, complex passwords that are resistant to dictionary attacks, brute-force attempts, and other common password cracking techniques?" },
                        { name: "passwordSelectionGuidelines", label: "What specific guidelines or criteria are provided to staff members for selecting secure passwords, such as minimum length requirements, the use of a combination of uppercase and lowercase letters, numbers, and special characters, and avoidance of easily guessable or commonly used phrases?" },
                        { name: "passwordEducationOnReuse", label: "How are staff members educated on the importance of selecting unique passwords for each account or system, avoiding password reuse across multiple platforms, and regularly updating passwords to mitigate the risk of unauthorized access due to credential compromise?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "passwordSelectionGuidelines" || question.name === "passwordEducationOnReuse" ? (
                                <input type="text" name={question.name} placeholder={question.label.includes('guidelines') ? "Describe the guidelines/criteria" : "Describe how they're educated"} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                    <input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.2.2 Password Management Tools and Techniques:</h2>
                    {[
                        { name: "passwordManagementToolsIntroduction", label: "Are staff members introduced to password management tools or utilities designed to facilitate the generation, storage, and retrieval of strong, complex passwords across multiple accounts or devices securely?" },
                        { name: "passwordManagementTrainingResources", label: "What training resources or instructional materials are provided to staff members to familiarize them with the features and functionality of password management solutions, including password generation, encryption, synchronization, and multi-factor authentication capabilities?" },
                        { name: "passwordManagementBestPractices", label: "How are staff members encouraged to incorporate password management best practices into their daily workflows, such as using passphrase-based authentication, enabling two-factor authentication (2FA), or implementing biometric authentication methods where available?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "passwordManagementTrainingResources" || question.name === "passwordManagementBestPractices" ? (
                                <input type="text" name={question.name} placeholder={question.label.includes('resources') ? "Describe the resources/materials" : "Describe how they're encouraged"} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                    <input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.2.3 Password Hygiene and Maintenance:</h2>
                    {[
                        { name: "passwordHygieneEducation", label: "Are staff members educated on the importance of practicing good password hygiene, including avoiding common pitfalls such as sharing passwords with others, writing down passwords on physical or digital notes, or storing passwords in easily accessible locations?" },
                        { name: "passwordStorageProtocols", label: "What procedures or protocols are in place to guide staff members in securely storing and protecting passwords from unauthorized disclosure or theft, such as encrypted password vaults, secure cloud storage solutions, or physical security measures for sensitive information?" },
                        { name: "passwordReviewReminders", label: "How are staff members reminded of the necessity of periodically reviewing and updating their passwords, conducting password audits, and revoking access for inactive or compromised accounts to maintain a robust and resilient password security posture?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "passwordStorageProtocols" || question.name === "passwordReviewReminders" ? (
                                <input type="text" name={question.name} placeholder="Describe the procedures" value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                    <input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.2.4 Social Engineering Awareness:</h2>
                    {[
                        { name: "socialEngineeringTraining", label: "Are staff members trained to recognize social engineering tactics commonly employed by attackers to trick individuals into divulging their passwords or sensitive information through manipulation, deception, or coercion?" },
                        { name: "socialEngineeringResources", label: "What educational resources or awareness materials are provided to staff members to increase their awareness of phishing scams, pretexting schemes, or other social engineering techniques aimed at exploiting human vulnerabilities to compromise password security?" },
                        { name: "socialEngineeringVigilance", label: "How are staff members encouraged to remain vigilant and skeptical of unsolicited requests for password information, particularly via email, phone calls, or other communication channels, and to verify the legitimacy of requests before disclosing sensitive credentials?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "socialEngineeringResources" || question.name === "socialEngineeringVigilance" ? (
                                <input type="text" name={question.name} placeholder="Describe the resources/materials" value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                    <input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>3.1.1.4.2.2.5 Password Policy Compliance:</h2>
                    {[
                        { name: "passwordPolicyCompliance", label: "Are staff members informed of the organization's password policy requirements, including expectations for password complexity, expiration, history retention, and enforcement mechanisms for non-compliance?" },
                        { name: "passwordPolicyMonitoring", label: "How are staff members monitored or assessed for adherence to password policy guidelines, and what measures are in place to provide feedback, guidance, or enforcement actions in cases of policy violations or security breaches related to password management?" },
                        { name: "passwordSecurityAccountability", label: "What strategies are employed to promote a culture of accountability and responsibility among staff members regarding password security, emphasizing the shared responsibility of all individuals in safeguarding sensitive information and protecting against unauthorized access or data breaches?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "passwordPolicyMonitoring" || question.name === "passwordSecurityAccountability" ? (
                                <input type="text" name={question.name} placeholder="Describe how they're monitored" value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div>
                            )}
                        </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PasswordSecurity2FormPage;