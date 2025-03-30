import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function PatchManagementPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPatchManagementImage = httpsCallable(functions, 'uploadPatchManagementImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Patch Management', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Patch Management', buildingId);
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
                const uploadResult = await uploadPatchManagementImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Response Patch Management', buildingId);
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
                <h1>Incident Response Patch Management</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Incident Response Patch Management</h2>
                    {[
                        { name: "patchIdentification", label: "How are security patches identified and prioritized for deployment?" },
                        { name: "patchSources", label: "What sources are used to stay informed about available patches?" },
                        { name: "criticalPatchesCriteria", label: "Are there specific criteria for determining which patches are critical?" },
                        { name: "patchDeploymentProcedures", label: "What procedures are followed for deploying patches?" },
                        { name: "minimalDisruption", label: "How is patch deployment managed to ensure minimal disruption?" },
                        { name: "predefinedRolloutSteps", label: "Are there predefined steps for rolling out patches?" },
                        { name: "patchTestingValidation", label: "What testing is conducted to validate that patches do not negatively impact system functionality?" },
                        { name: "riskAssessmentMitigation", label: "How are potential risks assessed and mitigated before applying patches to live systems?" },
                        { name: "patchVerification", label: "Are there procedures for verifying that patches have been successfully applied?" },
                        { name: "patchDocumentationProcess", label: "How is the patch management process documented?" },
                        { name: "patchHistoryTracking", label: "What information is included to track patch history and compliance?" },
                        { name: "patchAuditUsage", label: "How is documentation used for auditing patch management?" },
                        { name: "reportingMechanisms", label: "What reporting mechanisms are in place to track patch deployments?" },
                        { name: "reportReview", label: "How are reports reviewed to identify gaps?" },
                        { name: "reportingIssues", label: "Are there established procedures for reporting patch deployment issues?" },
                        { name: "patchTools", label: "What tools are used to automate patching?" },
                        { name: "toolsMaintenance", label: "How are tools maintained to ensure effectiveness?" },
                        { name: "integrationRequirements", label: "Are there integration requirements with existing infrastructure?" },
                        { name: "rollbackProcedures", label: "What rollback procedures are in place?" },
                        { name: "rollbackDecision", label: "How is the decision made to roll back a patch?" },
                        { name: "rollbackIssues", label: "How are rollback issues communicated?" },
                        { name: "patchPolicy", label: "What policies govern the patch management process?" },
                        { name: "policyCommunication", label: "How are policies communicated to stakeholders?" },
                        { name: "policyReview", label: "Are policies periodically reviewed to ensure effectiveness?" },
                        { name: "trainingOnPatch", label: "What training is provided on patch management?" },
                        { name: "staffAwareness", label: "How is staff awareness of patch management importance ensured?" },
                        { name: "refresherTraining", label: "Are there refresher training sessions for staff?" },
                        { name: "incidentIntegration", label: "How is patch management integrated with incident response?" },
                        { name: "incidentRecoveryRole", label: "What role does patch management play in incident recovery?" },
                        { name: "quickPatchDeployment", label: "Are there protocols for quick patch deployment during incidents?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "patchIdentification" || question.name === "patchSources" || question.name === "patchDeploymentProcedures" || question.name === "minimalDisruption" || question.name === "patchTestingValidation" || question.name === "riskAssessmentMitigation" || question.name === "patchDocumentationProcess" || question.name === "patchHistoryTracking" || question.name === "patchAuditUsage" || question.name === "reportingMechanisms" || question.name === "reportReview" || question.name === "patchTools" || question.name === "toolsMaintenance" || question.name === "rollbackProcedures" || question.name === "rollbackDecision" || question.name === "rollbackIssues" || question.name === "patchPolicy" || question.name === "policyCommunication" || question.name === "policyReview" || question.name === "trainingOnPatch" || question.name === "staffAwareness" || question.name === "refresherTraining" || question.name === "incidentIntegration" || question.name === "incidentRecoveryRole" || question.name === "quickPatchDeployment" ? (
                                    <textarea
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
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
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
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

export default PatchManagementPage;