import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function EncryptionRequirementsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadEncryptionRequirementsImage');

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
                const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Encryption Requirements', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Encryption Requirements', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Encryption Requirements', buildingId);
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
                <h1>5.1.2.2.1 Encryption Requirements Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Encryption Requirements Assessment</h2>
                    {[
                        { name: "encryptionStandards", label: "What encryption standards or algorithms are required for protecting sensitive data (e.g., AES-256, RSA)?" },
                        { name: "selectedStandards", label: "How are encryption standards selected and updated to address emerging security threats?" },
                        { name: "documentedStandards", label: "Are encryption standards documented and communicated to relevant stakeholders?" },
                        { name: "sensitiveData", label: "What criteria are used to define what constitutes sensitive data within the organization?" },
                        { name: "reviewedClassifications", label: "How frequently are data classifications reviewed and updated?" },
                        { name: "encryptionTools", label: "What methods or tools are used to apply encryption to sensitive data (e.g., software, hardware)?" },
                        { name: "integratedEnryption", label: "How is encryption integrated into data storage, transmission, and processing systems?" },
                        { name: "consistentPractices", label: "Are encryption practices consistent across different types of sensitive data and systems?" },
                        { name: "managingKeys", label: "What procedures are in place for generating, distributing, storing, and managing encryption keys?" },
                        { name: "accessProtected", label: "How are encryption keys protected from unauthorized access or compromise?" },
                        { name: "expirationProcesses", label: "What processes are followed for key rotation, expiration, and revocation?" },
                        { name: "complyingRegulations", label: "How does the organization's encryption approach comply with relevant regulations and standards (e.g., GDPR, HIPAA)?" },
                        { name: "regulatoryRequirements", label: "Are there specific regulatory requirements that impact encryption practices, and how are they addressed?" },
                        { name: "complianceRegulations", label: "What measures are in place to ensure ongoing compliance with encryption-related regulations?" },
                        { name: "securingData", label: "What encryption protocols are used for securing data transmitted over networks (e.g., TLS, HTTPS)?" },
                        { name: "dataIntegrity", label: "How is the integrity and confidentiality of data in transit ensured through encryption?" },
                        { name: "effectivenessValidation", label: "Are there policies and procedures for validating the effectiveness of encryption for data in transit?" },
                        { name: "storedMedia", label: "How is sensitive data encrypted when stored on physical media, such as hard drives and backup tapes?" },
                        { name: "encryptionTechniques", label: "What encryption techniques are used for cloud storage and other remote data repositories?" },
                        { name: "protectingData", label: "Are there safeguards to protect encrypted data from unauthorized access or physical theft?" },
                        { name: "authorizedPersonnel", label: "What access controls are in place to ensure that only authorized personnel can manage and use encryption keys?" },
                        { name: "reviewedPermissions", label: "How are access permissions reviewed and updated to reflect changes in personnel or roles?" },
                        { name: "monitoringMechanisms", label: "Are there logging and monitoring mechanisms to track access to encryption keys and sensitive data?" },
                        { name: "encryptionMeasures", label: "How is the effectiveness of encryption measures tested and validated?" },
                        { name: "regularAssessments", label: "Are there regular security assessments or audits to evaluate the implementation of encryption?" },
                        { name: "identifiedVulnerabilities", label: "What processes are in place to address any vulnerabilities or issues identified during testing?" },
                        { name: "employeeTraining", label: "What training is provided to employees regarding encryption practices and data protection?" },
                        { name: "awarenessRequirements", label: "How is awareness of encryption requirements and best practices maintained among staff?" },
                        { name: "employeeResources", label: "Are there resources or guidelines available to assist employees in understanding and implementing encryption?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "documentedStandards" || question.name === "consistentPractices" || question.name === "regulatoryRequirements" || question.name === "effectivenessValidation" || question.name === "protectingData" || question.name === "monitoringMechanisms" || question.name === "regularAssessments" || question.name === "employeeResources" ? (
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
                            {question.name === "documentedStandards" || question.name === "consistentPractices" || question.name === "regulatoryRequirements" || question.name === "effectivenessValidation" || question.name === "protectingData" || question.name === "monitoringMechanisms" || question.name === "regularAssessments" || question.name === "employeeResources" ? (
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                />
                            ) : null}
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

export default EncryptionRequirementsFormPage;