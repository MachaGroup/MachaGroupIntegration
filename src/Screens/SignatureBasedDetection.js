import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SignatureBasedDetectionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSignatureBasedDetectionImage');


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
                const formDocRef = doc(db, 'forms','Cybersecurity','Signature-Based Detection', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
            const formDocRef = doc(db, 'forms','Cybersecurity','Signature-Based Detection', buildingId);
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
            const formDocRef = doc(db, 'forms','Cybersecurity','Signature-Based Detection', buildingId);
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
                <h1>Signature-Based Detection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.1.2.2.1 Signature Database Management:</h2>
                    {[
                        { name: "databaseUpdateFrequency", label: "How frequently is the signature database updated to include the latest known attack patterns and vulnerabilities?" },
                        { name: "signatureSources", label: "What sources are used to gather new signatures for the IDS, and how is the credibility and reliability of these sources ensured?" },
                        { name: "customSignatures", label: "Are there mechanisms in place to create custom signatures based on specific threats faced by the organization?" },
                        { name: "detectionCoverage", label: "How comprehensive is the IDS in detecting a wide range of known attack patterns, including zero-day vulnerabilities and emerging threats?" },
                        { name: "performanceBalance", label: "What measures are in place to balance detection accuracy with performance, ensuring the IDS does not overly tax network resources?" },
                        { name: "coverageGaps", label: "Are there any gaps in signature coverage for specific types of attacks or network protocols, and how are these addressed?" },
                        { name: "alertPrioritization", label: "How are alerts generated by signature-based detections prioritized, and what criteria determine the severity of an alert?" },
                        { name: "responseProcedure", label: "What is the standard operating procedure for responding to alerts triggered by known attack patterns, and who is responsible for initiating the response?" },
                        { name: "falsePositiveReduction", label: "Are there measures in place to reduce the occurrence of false positives, and how is the accuracy of alerts verified?" },
                        { name: "integrationWithTools", label: "How well does the signature-based IDS integrate with other cybersecurity tools, such as SIEM (Security Information and Event Management) systems, firewalls, and endpoint protection solutions?" },
                        { name: "scalability", label: "Can the IDS scale effectively with the network, accommodating increases in traffic and changes in network architecture without a loss of detection capability?" },
                        { name: "encryptedTrafficHandling", label: "How is the IDS configured to handle encrypted traffic, ensuring visibility into potential threats without compromising data privacy?" },
                        { name: "effectivenessTesting", label: "How regularly is the effectiveness of signature-based detection tested, and what methods (e.g., penetration testing, red teaming) are used to evaluate its capabilities?" },
                        { name: "signatureRefinement", label: "Is there a process for reviewing and refining detection signatures based on feedback from incident investigations and threat intelligence updates?" },
                        { name: "lessonsLearned", label: "How are lessons learned from past incidents and detected threats incorporated into the ongoing development and improvement of the signature database?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "customSignatures" || question.name === "scalability" || question.name === "signatureRefinement" ? (
                                    <><>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange} /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange} /> No

                                    </><div>
                                            <input
                                                type="text"
                                                name={`${question.name}Comment`}
                                                placeholder="Comments"
                                                value={formData[`${question.name}Comment`] || ''}
                                                onChange={handleChange} />
                                        </div></>
                                ) : (
                                    <textarea
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

export default SignatureBasedDetectionPage;
