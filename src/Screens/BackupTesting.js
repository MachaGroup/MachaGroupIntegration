// BackupTestingPage.js
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BackupTestingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadBackupTestingImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Backup Testing', buildingId);
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
                        const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Backup Testing', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Backup Testing', buildingId);
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
                <h1>Backup Testing Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Backup Testing Assessment</h2>
                    {[
                        { name: "frequencyPreparedness", label: "How often are backup recovery drills conducted, and is the frequency sufficient to ensure preparedness and data integrity?" },
                        { name: "scheduledTimes", label: "Are there specific times of the year when testing is scheduled to align with organizational needs or periods of lower activity?" },
                        { name: "plannedUnplannedDrills", label: "Does the schedule for backup testing include both planned and unplanned drills to evaluate real-time response capabilities?" },
                        { name: "testingScenarios", label: "What types of scenarios are covered during backup testing to simulate various types of data loss events (e.g., cyberattacks, hardware failure, natural disasters)?" },
                        { name: "fullPartialRecovery", label: "Are both full-scale and partial recovery processes tested to ensure comprehensive preparedness?" },
                        { name: "complexScenarios", label: "How are complex scenarios, such as multi-site recoveries or cross-functional dependencies, incorporated into the testing process?" },
                        { name: "evaluationCriteria", label: "What criteria are used to evaluate the success or failure of a backup test, including recovery time objectives (RTOs) and recovery point objectives (RPOs)?" },
                        { name: "documentTestResults", label: "Are the results of each backup test thoroughly documented, including any issues encountered and the steps taken to resolve them?" },
                        { name: "lessonsLearned", label: "How are lessons learned from backup testing used to improve disaster recovery plans and backup processes?" },
                        { name: "responsibilityRoles", label: "Who is responsible for initiating, overseeing, and evaluating backup tests within the organization?" },
                        { name: "definedRoles", label: "Are there clearly defined roles for each team member involved in the backup testing process, including IT staff, recovery coordinators, and external vendors?" },
                        { name: "responsibilityCommunication", label: "How are responsibilities assigned and communicated to ensure effective coordination during a backup test?" },
                        { name: "feedbackProcesses", label: "What processes are in place to gather feedback from participants in backup tests to identify areas for improvement?" },
                        { name: "communicatingChanges", label: "How are changes to backup testing procedures or disaster recovery plans communicated to relevant stakeholders?" },
                        { name: "updateMechanisms", label: "Are there mechanisms to regularly review and update testing strategies based on new risks, technology changes, or organizational shifts?" },
                        { name: "planIntegration", label: "How does backup testing integrate with the overall disaster recovery plan, including coordination with other recovery strategies?" },
                        { name: "metricsKPIs", label: "Are there specific metrics or KPIs that link backup testing results with broader disaster recovery goals and objectives?" },
                        { name: "evaluatePlanEffectiveness", label: "How is the effectiveness of the entire disaster recovery plan evaluated through the lens of backup testing outcomes?" },
                        { name: "toolsUsed", label: "What tools or software are used to facilitate backup testing, and are they regularly updated to support the latest backup and recovery technologies?" },
                        { name: "automatedTools", label: "Are automated testing tools utilized to increase the frequency and reliability of backup testing?" },
                        { name: "toolConfiguration", label: "How are these tools configured to simulate realistic disaster scenarios and provide accurate results?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "plannedUnplannedDrills" || question.name === "fullPartialRecovery" || question.name === "documentTestResults" || question.name === "definedRoles" || question.name === "updateMechanisms" || question.name === "automatedTools" ? (
                                <><div>
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

                          </div><textarea
                              name={`${question.name}Comment`}
                              placeholder="Comment (Optional)"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange} /></>
                            ) : (
                                <textarea
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                />
                            )}
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

export default BackupTestingPage;