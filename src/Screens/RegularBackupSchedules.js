import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function RegularBackupSchedulesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadRegularBackupSchedulesImage = httpsCallable(functions, 'uploadRegularBackupSchedulesImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Regular Backup Schedules', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Regular Backup Schedules', buildingId);
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
                const uploadResult = await uploadRegularBackupSchedulesImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Regular Backup Schedules', buildingId);
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

    const questions = [
        { name: "backupFrequency", label: "What is the frequency of your backup schedules (e.g., daily, weekly), and does it align with the criticality of the data being backed up?", type: "text" },
        { name: "criticalDataIncluded", label: "Are all critical data and systems included in the backup schedule, and are there specific types of data (e.g., databases, configuration files) that are prioritized?", type: "radio" },
        { name: "scheduleAdjustments", label: "How are backup schedules adjusted for different types of data, such as high-frequency transactional data versus less frequently updated data?", type: "text" },
        { name: "reliableBackupProcedures", label: "What procedures are followed to ensure that backups are performed reliably and consistently according to the established schedule?", type: "text" },
        { name: "automatedBackupSystems", label: "Are there automated systems in place to handle backups, and how are manual backups managed and verified?", type: "radio" },
        { name: "backupIntegrityValidation", label: "How is backup integrity validated, and what steps are taken if a backup fails or encounters errors during the process?", type: "text" },
        { name: "backupStorageSolutions", label: "How is backup data stored, and what storage solutions are used (e.g., cloud storage, on-premises storage, off-site storage)?", type: "text" },
        { name: "retentionPolicies", label: "What are the retention policies for backup data, and how long is backup data kept before being archived or deleted?", type: "text" },
        { name: "secureBackupStorage", label: "Are backup storage solutions secure and protected from unauthorized access or tampering?", type: "radio" },
        { name: "monitoringSystems", label: "What monitoring systems are in place to track the status of backups and ensure that they are completed as scheduled?", type: "text" },
        { name: "backupAlerts", label: "Are there alert mechanisms to notify administrators of backup failures, delays, or issues, and how are these alerts handled?", type: "radio" },
        { name: "backupPerformanceMonitoring", label: "How is the performance of backup processes monitored to ensure that they do not negatively impact system performance or operations?", type: "text" },
        { name: "restorationTestsFrequency", label: "How frequently are backup restoration tests conducted to ensure that backup data can be successfully restored when needed?", type: "text" },
        { name: "backupVerificationProcedures", label: "What procedures are in place to verify the completeness and accuracy of backups, and how are discrepancies addressed?", type: "text" },
        { name: "backupTestsDocumentation", label: "Are backup tests documented and reviewed, and what is the process for updating backup procedures based on test results?", type: "text" },
        { name: "backupCompliance", label: "How does your backup schedule comply with relevant regulatory and industry standards for data protection and retention?", type: "text" },
        { name: "backupProceduresDocumented", label: "Are backup procedures and schedules documented, and is there a clear process for updating documentation as needed?", type: "radio" },
        { name: "backupAuditsReviews", label: "What audits or reviews are conducted to ensure compliance with backup policies and procedures?", type: "text" },
        { name: "disasterRecoveryIntegration", label: "How are backup schedules integrated into the overall disaster recovery plan, and what role do they play in ensuring business continuity?", type: "text" },
        { name: "recoveryFromBackups", label: "What are the procedures for initiating recovery from backups during a disaster or major incident, and how is recovery prioritized?", type: "text" },
        { name: "backupRecoveryTested", label: "Are backup and recovery processes tested together to ensure that they function effectively as part of the disaster recovery plan?", type: "radio" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Regular Backup Schedules Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.substring(question.label.indexOf('(') +1, question.label.lastIndexOf(')'))} value={formData[question.name] || ''} onChange={handleChange} />
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

export default RegularBackupSchedulesPage;