import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataRetentionPeriodsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataRetentionPeriodsFormPageImage = httpsCallable(functions, 'uploadDataRetentionPeriodsFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Retention Periods');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Retention Periods');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Retention Periods', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Retention Periods');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Retention Periods', docId);
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
                <h1>5.1.2.1.2 Data Retention Periods Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.2.1.2 Data Retention Periods</h2>
                    {[
                        { name: "retentionSchedules", label: "5.1.2.1.2.1. Retention Schedule Creation: How are data retention schedules created and maintained?", type: "text", securityGatesFormat: true },
                        { name: "developingResponsibility", label: "5.1.2.1.2.2. Retention Schedule Creation: Who is responsible for developing and approving the data retention schedules?", type: "text", securityGatesFormat: true },
                        { name: "retentionCriteria", label: "5.1.2.1.2.3. Retention Schedule Creation: What criteria are used to determine retention periods for different types of data?", type: "text", securityGatesFormat: true },
                        { name: "complyingPeriods", label: "5.1.2.1.2.4. Compliance with Regulations: How does the organization ensure that data retention periods comply with relevant laws and regulations (e.g., GDPR, HIPAA)?", type: "text", securityGatesFormat: true },
                        { name: "industryStandards", label: "5.1.2.1.2.5. Compliance with Regulations: Are there specific regulations or industry standards that influence data retention periods?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "monitoredRequirements", label: "5.1.2.1.2.6. Compliance with Regulations: How is compliance with legal and regulatory retention requirements monitored?", type: "text", securityGatesFormat: true },
                        { name: "classifiedPurposes", label: "5.1.2.1.2.7. Data Categories and Retention: How are different categories of data classified for retention purposes (e.g., personal data, financial records)?", type: "text", securityGatesFormat: true },
                        { name: "standardPeriods", label: "5.1.2.1.2.8. Data Categories and Retention: What are the standard retention periods for each category of data?", type: "text", securityGatesFormat: true },
                        { name: "specialConsiderations", label: "5.1.2.1.2.9. Data Categories and Retention: Are there exceptions or special considerations for certain types of data?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "documentedPeriods", label: "5.1.2.1.2.10. Retention Period Documentation: How are data retention periods documented and communicated to relevant stakeholders?", type: "text", securityGatesFormat: true },
                        { name: "centralizedRecord", label: "5.1.2.1.2.11. Retention Period Documentation: Is there a centralized record of all data retention schedules and policies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "requirementChanges", label: "5.1.2.1.2.12. Retention Period Documentation: How is documentation updated to reflect changes in retention requirements?", type: "text", securityGatesFormat: true },
                        { name: "disposalProcedures", label: "5.1.2.1.2.13. Data Disposal Procedures: What procedures are in place for the disposal of data once retention periods have expired?", type: "text", securityGatesFormat: true },
                        { name: "deletedData", label: "5.1.2.1.2.14. Data Disposal Procedures: How is data securely destroyed or deleted to prevent unauthorized access or recovery?", type: "text", securityGatesFormat: true },
                        { name: "handlingGuidelines", label: "5.1.2.1.2.15. Data Disposal Procedures: Are there guidelines for handling physical versus electronic data disposal?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "reviewedPeriods", label: "5.1.2.1.2.16. Periodic Reviews and Updates: How often are data retention periods reviewed and updated to ensure they remain current?", type: "text", securityGatesFormat: true },
                        { name: "scheduleChanges", label: "5.1.2.1.2.17. Periodic Reviews and Updates: What process is followed to make changes to data retention schedules?", type: "text", securityGatesFormat: true },
                        { name: "reviewingResponsibility", label: "5.1.2.1.2.18. Periodic Reviews and Updates: Who is responsible for conducting periodic reviews of data retention practices?", type: "text", securityGatesFormat: true },
                        { name: "trainingPolicies", label: "5.1.2.1.2.19. Employee Training and Awareness: What training is provided to employees regarding data retention policies and procedures?", type: "text", securityGatesFormat: true },
                        { name: "maintainedAwareness", label: "5.1.2.1.2.20. Employee Training and Awareness: How is awareness of data retention requirements maintained among staff?", type: "text", securityGatesFormat: true },
                        { name: "employeeResources", label: "5.1.2.1.2.21. Employee Training and Awareness: Are there resources available to help employees understand and comply with retention schedules?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "monitoredCompliance", label: "5.1.2.1.2.22. Monitoring and Auditing: How is compliance with data retention schedules monitored and enforced?", type: "text", securityGatesFormat: true },
                        { name: "conductedAudits", label: "5.1.2.1.2.23. Monitoring and Auditing: Are there regular audits conducted to review adherence to retention policies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "noncomplianceAudits", label: "5.1.2.1.2.24. Monitoring and Auditing: What steps are taken to address any non-compliance identified during audits?", type: "text", securityGatesFormat: true },
                        { name: "adjustedSchedules", label: "5.1.2.1.2.25. Retention for Legal Holds: How are data retention schedules adjusted in response to legal holds or investigations?", type: "text", securityGatesFormat: true },
                        { name: "dataHolds", label: "5.1.2.1.2.26. Retention for Legal Holds: What procedures are in place to ensure that data subject to legal holds is not disposed of?", type: "text", securityGatesFormat: true },
                        { name: "communicatedHolds", label: "5.1.2.1.2.27. Retention for Legal Holds: How are legal holds communicated and managed within the organization?", type: "text", securityGatesFormat: true },
                        { name: "communicatedPolicies", label: "5.1.2.1.2.28. Data Retention Policy Communication: How are data retention policies communicated to all relevant stakeholders?", type: "text", securityGatesFormat: true },
                        { name: "updatingProcedures", label: "5.1.2.1.2.29. Data Retention Policy Communication: Are there clear procedures for updating stakeholders on changes to retention schedules?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "incorporatedFeedback", label: "5.1.2.1.2.30. Data Retention Policy Communication: How is feedback from stakeholders incorporated into data retention policy updates?", type: "text", securityGatesFormat: true },
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

export default DataRetentionPeriodsFormPage;