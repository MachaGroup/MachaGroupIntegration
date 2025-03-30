import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function EndToEndEncryptionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadEndToEndEncryptionImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'End To End Encryption', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'End To End Encryption', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'End To End Encryption', buildingId);
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
                <h1>End-to-End Encryption Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.2.1.2.2.1 Implementation and Usage:</h2>
                    {[
                        { name: "implementationProtocols", label: "How is end-to-end encryption implemented in your communication and data storage systems, and what specific protocols or standards (e.g., PGP, S/MIME) are used?", type: "textarea" },
                        { name: "allChannelsEncrypted", label: "Are all communication channels (e.g., emails, messaging apps) and data exchanges that involve sensitive information covered by end-to-end encryption?", type: "radio" },
                        { name: "consistentEncryptionProcedures", label: "What procedures are in place for ensuring that end-to-end encryption is consistently applied across all relevant systems and applications?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" ? (
                                    <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                ) : question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.1.2.2.2 Encryption Standards and Configuration:</h2>
                    {[
                        { name: "encryptionAlgorithms", label: "What encryption algorithms and key lengths are used in the end-to-end encryption process (e.g., RSA, AES), and do they meet current security standards and best practices?", type: "textarea" },
                        { name: "keyManagement", label: "How are encryption keys generated, managed, and exchanged, and are they handled securely to prevent unauthorized access or misuse?", type: "textarea" },
                        { name: "specificConfigurations", label: "Are there specific configurations or settings recommended for different types of data or communication to ensure optimal security?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}

                    <h2>4.2.1.2.2.3 Access Control and Authentication:</h2>
                    {[
                        { name: "accessControlManagement", label: "How is access control managed for encrypted communications and data, and what authentication mechanisms are used to verify the identity of participants in encrypted exchanges?", type: "textarea" },
                        { name: "secureKeyManagement", label: "Are there procedures in place for securely managing and distributing encryption keys to authorized users?", type: "radio" },
                        { name: "userAccessMonitoring", label: "How is user access to encrypted data monitored and controlled to prevent unauthorized access?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" ? (
                                    <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                ) : question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}
                    <h2>4.2.1.2.2.4 Compliance and Auditing:</h2>
                    {[
                        { name: "complianceMonitoring", label: "How is compliance with end-to-end encryption policies monitored and enforced, and are there regular audits to ensure adherence to encryption standards?", type: "textarea" },
                        { name: "vulnerabilityHandling", label: "Are there documented processes for addressing potential vulnerabilities or breaches related to encryption, and how are these issues reported and resolved?", type: "textarea" },
                        { name: "regulatoryCompliance", label: "What mechanisms are in place to verify that encryption practices align with relevant legal and regulatory requirements?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}
                    <h2>4.2.1.2.2.5 Training and Awareness:</h2>
                    {[
                        { name: "employeeTraining", label: "Are employees and users trained on the importance of end-to-end encryption and how to properly use encryption tools and protocols?", type: "radio" },
                        { name: "resourcesSupport", label: "What resources or support are available to help users understand and implement end-to-end encryption effectively?", type: "textarea" },
                        { name: "ongoingTraining", label: "How is ongoing training and awareness maintained to keep up with evolving encryption technologies and best practices?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" ? (
                                    <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                ) : question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}
                    <h2>4.2.1.2.2.6 Data Recovery and Management:</h2>
                    {[
                        { name: "dataRecoveryProcedures", label: "What procedures are in place for securely recovering encrypted data in the event of loss or corruption, and how are decryption keys managed during recovery?", type: "textarea" },
                        { name: "keyDisposal", label: "How is the secure disposal of old or unused encryption keys handled to prevent potential security risks?", type: "textarea" },
                        { name: "contingencyPlans", label: "Are there contingency plans for decrypting data when necessary, such as during investigations or compliance audits, and how is data integrity maintained during these processes?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}
                    <h2>4.2.1.2.2.7 Integration and Compatibility:</h2>
                    {[
                        { name: "integrationCompatibility", label: "How does end-to-end encryption integrate with existing systems and applications, and are there any compatibility issues that need to be addressed?", type: "textarea" },
                        { name: "performanceImpact", label: "What steps are taken to ensure that encryption does not negatively impact system performance or user experience?", type: "textarea" },
                        { name: "testingValidation", label: "Are there procedures for testing and validating encryption solutions to ensure they work as intended in your specific environment?", type: "textarea" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
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

export default EndToEndEncryptionPage;