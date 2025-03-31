import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, getFunctions, httpsCallable } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PatchManagementPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPatchManagementPageImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Patch Management', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Patch Management', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Patch Management', buildingId);
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
                <h1>Patch Management Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.2.2.1.1 Timeliness and Efficiency:</h2>
                    {[
                        { name: "patchTimeliness", label: "How quickly are patches and security updates applied to devices once they are released by vendors?" },
                        { name: "automatedPatchSystems", label: "Are there automated systems in place to regularly check for and deploy patches across all devices in the network?" },
                        { name: "criticalPatchProcesses", label: "What processes are in place to ensure that critical patches are prioritized and installed without delay to mitigate security risks?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "patchTimeliness" || question.name === "criticalPatchProcesses" ? (
                                <textarea name={question.name} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div>
                            )}
                        </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>4.1.2.2.1.2 Coverage and Scope:</h2>
                    {[
                        { name: "patchCoverage", label: "Does the patch management strategy cover all operating systems, applications, and firmware used within the organization?" },
                        { name: "thirdPartyManagement", label: "How are third-party applications managed, and is there a comprehensive inventory to ensure all software is up-to-date?" },
                        { name: "remoteUpdateMechanisms", label: "Are there mechanisms to ensure that both on-premises and remote devices receive necessary updates in a timely manner?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "thirdPartyManagement" || question.name === "remoteUpdateMechanisms" ? (
                                <textarea name={question.name} onChange={handleChange} />
                            ) : (
                                <div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div>
                            )}
                        </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>4.1.2.2.1.3 Testing and Validation:</h2>
                    {[
                        { name: "patchTestingProcedure", label: "Is there a procedure for testing patches in a controlled environment before deployment to ensure compatibility and prevent disruption of services?" },
                        { name: "patchValidationSteps", label: "How are patches validated to confirm successful installation, and what steps are taken if a patch fails to apply correctly?" },
                        { name: "rollbackPlans", label: "Are rollback plans in place to revert changes if a patch causes unforeseen issues or incompatibility with existing systems?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>4.1.2.2.1.4 Compliance and Reporting:</h2>
                    {[
                        { name: "complianceAssurance", label: "How does the patch management process ensure compliance with regulatory requirements and industry standards, such as GDPR, HIPAA, or PCI-DSS?" },
                        { name: "auditTrails", label: "Are there audit trails and reporting mechanisms that document patch status, including deployed, pending, and failed updates, for all devices?" },
                        { name: "reportReviewFrequency", label: "How often are patch management reports reviewed, and who is responsible for ensuring that devices are fully patched and compliant?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>4.1.2.2.1.5 Security and Risk Management:</h2>
                    {[
                        { name: "patchPrioritizationStrategies", label: "What strategies are in place to prioritize patches based on the severity of vulnerabilities and the criticality of affected systems?" },
                        { name: "cybersecurityIntegration", label: "How are patch management activities integrated into the broader cybersecurity strategy to address potential risks and minimize attack surfaces?" },
                        { name: "emergencyPatchProcedures", label: "Are there procedures for handling out-of-band or emergency patches, particularly in response to zero-day vulnerabilities or active threats?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} onChange={handleChange} />
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

export default PatchManagementPage;