import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SIEMSolutionsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadSIEMSolutionsImage = httpsCallable(functions, 'uploadSIEMSolutionsImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No form data for this building");
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
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
                const uploadResult = await uploadSIEMSolutionsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef }, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Failed to submit the form. Please try again.');
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
                <h1>Security Information and Event Management (SIEM) Solutions</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Security Information and Event Management (SIEM) Solutions</h2>
                    {[
                        { name: "siemIntegration", label: "How is the SIEM solution integrated with other security systems and tools within the organization (e.g., firewalls, intrusion detection systems)?" },
                        { name: "siemScope", label: "What is the scope of the SIEM deployment, and does it cover all critical systems, applications, and network segments?" },
                        { name: "siemCoverageGaps", label: "Are there any gaps in coverage or areas where SIEM integration is lacking?" },
                        { name: "eventLogs", label: "What types of security events and logs are collected by the SIEM solution (e.g., network traffic, system logs, application logs)?" },
                        { name: "eventCorrelation", label: "How does the SIEM solution correlate events from different sources to identify potential security incidents or threats?" },
                        { name: "eventPrioritizationRules", label: "Are there specific rules or algorithms used to prioritize and filter events based on their severity or relevance?" },
                        { name: "realTimeMonitoring", label: "Does the SIEM solution provide real-time monitoring and alerting capabilities for detected security events and incidents?" },
                        { name: "alertConfiguration", label: "How are alerts configured and managed to minimize false positives and ensure timely detection of genuine threats?" },
                        { name: "alertInvestigation", label: "What is the process for responding to and investigating alerts generated by the SIEM solution?" },
                        { name: "incidentDetectionEffectiveness", label: "How effective is the SIEM solution in detecting and identifying various types of security incidents (e.g., malware infections, unauthorized access)?" },
                        { name: "incidentWorkflowsIntegrated", label: "Are there predefined incident response procedures and workflows integrated with the SIEM solution to guide the response to detected incidents?" },
                        { name: "incidentResponseEffectiveness", label: "How is the effectiveness of incident detection and response measured and evaluated?" },
                        { name: "dataRetentionPolicy", label: "What is the policy for data storage and retention within the SIEM solution, including the duration for retaining logs and security events?" },
                        { name: "dataIntegrityMaintenance", label: "How is the integrity and confidentiality of stored data maintained to prevent unauthorized access or tampering?" },
                        { name: "dataArchivingProcess", label: "Are there processes in place for securely archiving or deleting outdated or obsolete data?" },
                        { name: "siemReports", label: "What types of reports and dashboards are available through the SIEM solution, and how are they used for security analysis and decision-making?" },
                        { name: "reportFrequency", label: "How often are reports generated, and are they reviewed by security personnel or management to assess the overall security posture?" },
                        { name: "customReports", label: "Are there capabilities for customizing reports and analysis to address specific security concerns or requirements?" },
                        { name: "siemMaintenance", label: "What is the process for maintaining and updating the SIEM solution, including applying patches, updates, and new threat intelligence feeds?" },
                        { name: "siemEffectivenessAudit", label: "How is the SIEM solution evaluated for effectiveness, and are there regular assessments or audits to ensure its continued relevance and performance?" },
                        { name: "siemUpgradePlans", label: "Are there plans for upgrading or expanding the SIEM solution to enhance its capabilities or address emerging security threats?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "siemCoverageGaps" || question.name === "realTimeMonitoring" || question.name === "incidentWorkflowsIntegrated" || question.name === "dataArchivingProcess" || question.name === "siemUpgradePlans" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange}
                                        /> No
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SIEMSolutionsPage;