import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataMinimizationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataMinimizationFormPageImage = httpsCallable(functions, 'uploadDataMinimizationFormPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        } else {
            loadFormData();
        }
    }, [buildingId, navigate]);

    const loadFormData = async () => {
        setLoading(true);
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Minimization');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error loading form data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = async () => {
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Minimization');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Minimization', docId);
                    await setDoc(formDocRef, {
                        building: buildingRef,
                        formData: formData,
                    }, { merge: true });
                }
                console.log('Form Data submitted successfully on back!');
                alert('Form data saved before navigating back!');
            } catch (error) {
                console.error('Error saving form data:', error);
                alert('Failed to save form data before navigating back. Some data may be lost.');
            }
        }
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Minimization');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Minimization', docId);
                await setDoc(formDocRef, {
                    building: buildingRef,
                    formData: formData,
                }, { merge: true });
            }
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>5.1.2.1.1 Data Minimization Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.2.1.1 Data Minimization Assessment</h2>
                    {[
                        { name: "necessityCriteria", label: "5.1.2.1.1.1. What criteria are used to determine the necessity of data collected from individuals?", type: "text", securityGatesFormat: true },
                        { name: "reviewingRequirements", label: "5.1.2.1.1.2. Are there procedures in place to review and justify the data collection requirements for various purposes?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "minimumRequired", label: "5.1.2.1.1.3. How is it ensured that only the minimum amount of data required is collected?", type: "text", securityGatesFormat: true },
                        { name: "definedData", label: "5.1.2.1.1.4. How are the purposes for data collection clearly defined and documented?", type: "text", securityGatesFormat: true },
                        { name: "collectedData", label: "5.1.2.1.1.5. Are there mechanisms to ensure that data is collected solely for the purposes specified and no other?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "reviewingPurposes", label: "5.1.2.1.1.6. What procedures are in place to review and update the purposes for data collection as needed?", type: "text", securityGatesFormat: true },
                        { name: "dataAccess", label: "5.1.2.1.1.7. Who has access to the data collected, and how is access limited to only those with a legitimate need?", type: "text", securityGatesFormat: true },
                        { name: "restrictedData", label: "5.1.2.1.1.8. How is the use of data restricted to the purposes for which it was collected?", type: "text", securityGatesFormat: true },
                        { name: "preventingPolicies", label: "5.1.2.1.1.9. Are there policies to prevent unauthorized or unnecessary use of data?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "retentionPeriods", label: "5.1.2.1.1.10. What guidelines are in place for determining the retention periods for different types of data?", type: "text", securityGatesFormat: true },
                        { name: "monitoredPolicies", label: "5.1.2.1.1.11. How is compliance with data retention policies monitored and enforced?", type: "text", securityGatesFormat: true },
                        { name: "expiringPeriod", label: "5.1.2.1.1.12. What procedures are followed to securely dispose of or anonymize data once the retention period expires?", type: "text", securityGatesFormat: true },
                        { name: "reviewedPractices", label: "5.1.2.1.1.13. How often are data collection practices reviewed to ensure compliance with data minimization principles?", type: "text", securityGatesFormat: true },
                        { name: "regularAudits", label: "5.1.2.1.1.14. Are there regular audits conducted to assess whether data minimization is being effectively implemented?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "reviewFindings", label: "5.1.2.1.1.15. What steps are taken to address any findings from reviews or audits related to data minimization?", type: "text", securityGatesFormat: true },
                        { name: "minimizationTraining", label: "5.1.2.1.1.16. What training is provided to staff on data minimization practices and policies?", type: "text", securityGatesFormat: true },
                        { name: "maintainedAwareness", label: "5.1.2.1.1.17. How is awareness maintained among employees regarding the importance of collecting only necessary data?", type: "text", securityGatesFormat: true },
                        { name: "principleGuidelines", label: "5.1.2.1.1.18. Are there resources or guidelines available to help employees understand and apply data minimization principles?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "documentedJustifications", label: "5.1.2.1.1.19. Are there documented justifications for why specific types of data are collected?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "justifiedPractices", label: "5.1.2.1.1.20. How is it ensured that any changes in data collection practices are properly justified and documented?", type: "text", securityGatesFormat: true },
                        { name: "reviewingProcess", label: "5.1.2.1.1.21. What process is in place for reviewing and approving new data collection initiatives?", type: "text", securityGatesFormat: true },
                        { name: "enforcedMinimization", label: "5.1.2.1.1.22. How is data minimization enforced when collecting data through third parties or external vendors?", type: "text", securityGatesFormat: true },
                        { name: "contractualSafeguards", label: "5.1.2.1.1.23. What contractual or procedural safeguards are in place to ensure third parties adhere to data minimization principles?", type: "text", securityGatesFormat: true },
                        { name: "monitoredMinimization", label: "5.1.2.1.1.24. How is compliance with data minimization monitored for third-party data collection practices?", type: "text", securityGatesFormat: true },
                        { name: "obtainedConsent", label: "5.1.2.1.1.25. How is user consent obtained for data collection, and how is it ensured that users are informed about the data being collected?", type: "text", securityGatesFormat: true },
                        { name: "privacyNotices", label: "5.1.2.1.1.26. Are there clear and transparent privacy notices provided to individuals regarding the data collection practices?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "userInquiries", label: "5.1.2.1.1.27. What procedures are in place to address user inquiries or concerns about data collection?", type: "text", securityGatesFormat: true },
                        { name: "reviewedPolicies", label: "5.1.2.1.1.28. How frequently are data minimization policies reviewed and updated to reflect changes in regulations or organizational practices?", type: "text", securityGatesFormat: true },
                        { name: "reviewingResponsibility", label: "5.1.2.1.1.29. Who is responsible for reviewing and updating data minimization policies?", type: "text", securityGatesFormat: true },
                        { name: "communicatedUpdates", label: "5.1.2.1.1.30. How are updates to data minimization policies communicated to relevant stakeholders?", type: "text", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default DataMinimizationFormPage;