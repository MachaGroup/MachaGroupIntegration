import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function TrainingMaterialsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadTrainingMaterialsImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);
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
                <h1>Training Materials Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Training Materials</h2>
                    {[
                        { name: "materialsAvailability", label: "Are appropriate training materials, such as first aid kits, AEDs (Automated External Defibrillators), and CPR manikins, readily available during training sessions?" },
                        { name: "materialsStorage", label: "How are training materials stored and organized to ensure easy access and retrieval during training sessions?" },
                        { name: "storageAreaDescription", label: "Is there a designated area or storage facility for training materials, and is it easily accessible to trainers and participants?" },
                        { name: "backupMaterials", label: "Are backup supplies of essential training materials maintained to ensure availability in case of emergencies or high demand?" },
                        { name: "materialsCommunication", label: "How are participants informed about the location and availability of training materials before and during training sessions?" },
                        { name: "inspectionFrequency", label: "How often are training materials inspected to ensure they are in working condition and compliant with safety standards?" },
                        { name: "maintenanceSchedule", label: "Is there a documented maintenance schedule for training materials, including routine checks and servicing?" },
                        { name: "issueResolutionDetails", label: "Are there protocols in place for promptly addressing any issues or deficiencies identified during inspections?" },
                        { name: "maintenanceRecords", label: "Are maintenance and inspection records maintained for each training material, documenting dates of inspection, repairs, and replacements?" },
                        { name: "staffTrainingMaintenance", label: "How are staff members trained on proper handling and maintenance procedures for training materials?" },
                        { name: "materialsStocking", label: "Are training materials regularly stocked with necessary supplies, such as bandages, gloves, and medication?" },
                        { name: "inventoryManagement", label: "How is the inventory of training materials managed, and are there processes in place for replenishing expended or expired items?" },
                        { name: "stockMonitoring", label: "Are stock levels of training materials monitored in real-time or through periodic audits to ensure adequate supply?" },
                        { name: "replenishmentDetails", label: "Are there established criteria or thresholds for determining when to reorder or replenish training materials?" },
                        { name: "supplierSelection", label: "How are suppliers or vendors selected for purchasing training materials, and are there agreements in place to ensure timely delivery and quality assurance?" },
                        { name: "materialsQuality", label: "Are training materials selected based on their quality, durability, and suitability for the intended training purposes?" },
                        { name: "guidelinesDetails", label: "Are there guidelines or criteria for selecting and procuring training materials, taking into account factors such as brand reputation and user feedback?" },
                        { name: "participantFeedback", label: "Are participant feedback and preferences considered when choosing training materials to ensure they meet the diverse needs of learners?" },
                        { name: "materialsEvaluation", label: "How are training materials evaluated for effectiveness and relevance to the training objectives and curriculum?" },
                        { name: "monitoringDetails", label: "Are there mechanisms in place for monitoring and addressing any issues or concerns raised regarding the quality or suitability of training materials?" },
                        { name: "usageTraining", label: "Are participants trained on how to use and apply various items in the training materials effectively during practical exercises and simulations?" },
                        { name: "materialsIntegration", label: "How are training materials integrated into training sessions to facilitate hands-on learning and skill development?" },
                        { name: "usabilityFeedback", label: "Are there opportunities for participants to provide feedback on the usability and effectiveness of training materials, and are any improvements or adjustments made based on this feedback?" },
                        { name: "storageProtocols", label: "Are there guidelines or protocols for storing, handling, and disposing of training materials safely and responsibly?" },
                        { name: "materialsCustomization", label: "How are training materials adapted or customized to accommodate the specific needs or preferences of different participant groups?" },
                        { name: "materialsRecords", label: "Are records maintained for each training material, including purchase receipts, maintenance logs, and usage reports?" },
                        { name: "inventoryDocumentation", label: "How are training material inventories documented and updated, and are these records easily accessible for reference?" },
                        { name: "trackingProcedures", label: "Are there procedures in place for tracking the movement and usage of training materials, including transfers between locations or departments?" },
                        { name: "inventoryDiscrepancies", label: "How are discrepancies in training material inventories identified and resolved?" },
                        { name: "incidentProtocols", label: "Are there protocols for documenting incidents or accidents involving training materials and conducting investigations or corrective actions as needed?" },
                        { name: "securityMeasures", label: "Are measures in place to secure training materials against theft, loss, or unauthorized access?" },
                        { name: "securityProcedures", label: "How are training materials secured during non-training hours or when not in use, such as overnight or during weekends?" },
                        { name: "accessControls", label: "Are access controls or restricted areas implemented to prevent unauthorized individuals from accessing training materials?" },
                        { name: "sensitiveMaterialsProtection", label: "How are sensitive or valuable training materials protected against damage or tampering, such as by using locks or surveillance cameras?" },
                        { name: "staffSecurityTraining", label: "Are staff members trained on security protocols and procedures for safeguarding training materials against potential risks or threats?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "materialsAvailability" || question.name === "backupMaterials" || question.name === "maintenanceSchedule" || question.name === "maintenanceRecords" || question.name === "materialsStocking" || question.name === "stockMonitoring" || question.name === "materialsQuality" || question.name === "participantFeedback" || question.name === "usageTraining" || question.name === "usabilityFeedback" || question.name === "materialsRecords" || question.name === "securityMeasures" || question.name === "accessControls" || question.name === "staffSecurityTraining" ? (
                                <><div>
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


                          </div><div>
                              <input
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange} />
                            </div></>
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
                            )}
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

export default TrainingMaterialsFormPage;