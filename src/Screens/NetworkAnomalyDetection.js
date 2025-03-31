import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function NetworkAnomalyDetectionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadNetworkAnomalyDetectionPageImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Network Anomaly Detection', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Network Anomaly Detection', buildingId);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Network Anomaly Detection', buildingId);
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
                <h1>Network Anomaly Detection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.1.2.1.1 Detection Capabilities:</h2>
                    {[
                        { name: "idsDetectionTypes", label: "What types of network anomalies are the Intrusion Detection Systems (IDS) configured to detect (e.g., unusual traffic volume, protocol misuse, unauthorized port access)?" },
                        { name: "baselinePatterns", label: "How are baseline traffic patterns established for anomaly detection, and what criteria are used to define what constitutes 'normal' network behavior?" },
                        { name: "alertTime", label: "How quickly can the IDS detect and alert on abnormal traffic patterns, and what is the average time from detection to alert generation?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>4.1.1.2.1.2 Configuration and Customization:</h2>
                    {[
                        { name: "customizableParameters", label: "Are the anomaly detection parameters customizable to fit the specific needs of the organization, such as different thresholds for various network segments or user groups?" },
                        { name: "updateFrequency", label: "How often are detection algorithms and rules updated to adapt to new types of network threats or changes in network architecture?" },
                        { name: "mlAiFlexibility", label: "Is there flexibility in the IDS to incorporate machine learning or artificial intelligence to improve detection accuracy over time?" },
                    ].map((question, index) => (
                        <div key={index + 3} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "updateFrequency" ? (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <><div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                    </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>
                            )}
                        </div>
                    ))}

                    <h2>4.1.1.2.1.3 Alerting and Response:</h2>
                    {[
                        { name: "alertResponseProcess", label: "What is the process for responding to alerts generated by the IDS, and who is responsible for managing these alerts (e.g., network security team, IT operations)?" },
                        { name: "alertPrioritization", label: "Are alerts prioritized based on the severity of the anomaly or the potential impact on the network, and how is this prioritization determined?" },
                        { name: "falsePositives", label: "How are false positives minimized to prevent alert fatigue, and what measures are in place to ensure critical alerts are not missed?" },
                    ].map((question, index) => (
                        <div key={index + 6} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>4.1.1.2.1.4 Integration and Compatibility:</h2>
                    {[
                        { name: "integrationWithTools", label: "How well does the IDS integrate with other security tools and systems, such as firewalls, SIEM (Security Information and Event Management) systems, and antivirus software?" },
                        { name: "compatibilityIssues", label: "Are there any compatibility issues when deploying IDS across different network environments (e.g., cloud-based networks, on-premises infrastructure)?" },
                        { name: "dataUsage", label: "How is data from the IDS used in conjunction with other security tools to provide a comprehensive view of network security?" },
                    ].map((question, index) => (
                        <div key={index + 9} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h3>Testing and Evaluation:</h3>
                    {[
                        { name: "testingFrequency", label: "How frequently is the effectiveness of the IDS tested, and what methods are used for testing (e.g., simulated attacks, penetration testing, red teaming)?" },
                        { name: "performanceReview", label: "Is there a regular review process for the performance of the IDS, including an assessment of its ability to detect new or evolving threats?" },
                        { name: "feedbackIncorporation", label: "How is feedback from testing and real-world incidents used to refine and improve the IDS's anomaly detection capabilities?" },
                    ].map((question, index) => (
                        <div key={index + 12} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default NetworkAnomalyDetectionPage;