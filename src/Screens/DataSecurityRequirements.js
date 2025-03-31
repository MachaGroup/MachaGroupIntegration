import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataSecurityRequirementsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataSecurityRequirementsFormPageImage = httpsCallable(functions, 'uploadDataSecurityRequirementsFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Security Requirements');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Security Requirements');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Security Requirements', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Security Requirements');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Security Requirements', docId);
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
                <h1>5.2.1.1.2 Data Security Requirements Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.2.1.1.2 Data Security Requirements</h2>
                    {[
                        { name: "dataEncryption", label: "5.2.1.1.2.1. Data Encryption: What types of encryption are used to protect student data both at rest and in transit?", type: "text", securityGatesFormat: true },
                        { name: "encryptionStandards", label: "5.2.1.1.2.1. Data Encryption: How are encryption standards selected and implemented to ensure they meet current security best practices?", type: "text", securityGatesFormat: true },
                        { name: "managingProcess", label: "5.2.1.1.2.1. Data Encryption: What is the process for managing and updating encryption keys?", type: "text", securityGatesFormat: true },
                        { name: "restrictionMeasures", label: "5.2.1.1.2.2. Access Control: What access control measures are in place to restrict access to student data to authorized personnel only?", type: "text", securityGatesFormat: true },
                        { name: "managedPermissions", label: "5.2.1.1.2.2. Access Control: How are access permissions managed and reviewed to ensure that only those with a legitimate need have access to sensitive data?", type: "text", securityGatesFormat: true },
                        { name: "verifyingMethods", label: "5.2.1.1.2.2. Access Control: What authentication methods are used to verify the identity of individuals accessing student data?", type: "text", securityGatesFormat: true },
                        { name: "backupProcedures", label: "5.2.1.1.2.3. Data Backup and Recovery: What are the procedures for backing up student data, and how frequently are backups performed?", type: "text", securityGatesFormat: true },
                        { name: "securedFiles", label: "5.2.1.1.2.3. Data Backup and Recovery: How are backup files secured to prevent unauthorized access or data breaches?", type: "text", securityGatesFormat: true },
                        { name: "dataRecovery", label: "5.2.1.1.2.3. Data Backup and Recovery: What is the process for testing data recovery from backups to ensure that data can be restored effectively in the event of a loss?", type: "text", securityGatesFormat: true },
                        { name: "networkMeasures", label: "5.2.1.1.2.4. Network Security: What network security measures are in place to protect student data from unauthorized access and cyberattacks?", type: "text", securityGatesFormat: true },
                        { name: "securityTools", label: "5.2.1.1.2.4. Network Security: How are firewalls, intrusion detection systems, and other network security tools configured to safeguard data?", type: "text", securityGatesFormat: true },
                        { name: "monitoringThreats", label: "5.2.1.1.2.4. Network Security: What protocols are followed to monitor and respond to potential network security threats?", type: "text", securityGatesFormat: true },
                        { name: "protectingServers", label: "5.2.1.1.2.5. Physical Security: What physical security measures are in place to protect servers, computers, and other devices storing student data?", type: "text", securityGatesFormat: true },
                        { name: "physicalAccessControl", label: "5.2.1.1.2.5. Physical Security: How is access to physical locations where data is stored or processed controlled and monitored?", type: "text", securityGatesFormat: true },
                        { name: "maintenanceProcedures", label: "5.2.1.1.2.5. Physical Security: What procedures are followed to secure data during maintenance or when equipment is being replaced?", type: "text", securityGatesFormat: true },
                        { name: "transmittingData", label: "5.2.1.1.2.6. Data Handling and Transmission: How is student data securely transmitted between systems and organizations, such as during data exchanges or remote access?", type: "text", securityGatesFormat: true },
                        { name: "dataEntry", label: "5.2.1.1.2.6. Data Handling and Transmission: What protocols are used to ensure secure data handling during data entry, processing, and storage?", type: "text", securityGatesFormat: true },
                        { name: "disposingGuidelines", label: "5.2.1.1.2.6. Data Handling and Transmission: Are there guidelines for securely disposing of or decommissioning hardware and media containing student data?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "complianceEnsured", label: "5.2.1.1.2.7. Compliance and Auditing: How does the organization ensure compliance with data security regulations and standards, such as FERPA, GDPR, or other relevant laws?", type: "text", securityGatesFormat: true },
                        { name: "auditingPractices", label: "5.2.1.1.2.7. Compliance and Auditing: What auditing practices are in place to regularly review and assess data security measures?", type: "text", securityGatesFormat: true },
                        { name: "addressedFindings", label: "5.2.1.1.2.7. Compliance and Auditing: How are audit findings addressed, and what corrective actions are taken to resolve identified issues?", type: "text", securityGatesFormat: true },
                        { name: "incidentProcedures", label: "5.2.1.1.2.8. Incident Response: What procedures are in place for responding to data breaches or security incidents involving student data?", type: "text", securityGatesFormat: true },
                        { name: "reportedIncidents", label: "5.2.1.1.2.8. Incident Response: How are incidents reported, investigated, and documented to ensure timely and effective resolution?", type: "text", securityGatesFormat: true },
                        { name: "notifyingIndividuals", label: "5.2.1.1.2.8. Incident Response: What steps are taken to notify affected individuals and regulatory authorities in the event of a data breach?", type: "text", securityGatesFormat: true },
                        { name: "staffTraining", label: "5.2.1.1.2.9. Training and Awareness: What training is provided to staff regarding data security best practices and their responsibilities in protecting student data?", type: "text", securityGatesFormat: true },
                        { name: "maintainedAwareness", label: "5.2.1.1.2.9. Training and Awareness: How is awareness maintained among staff about emerging threats and security updates?", type: "text", securityGatesFormat: true },
                        { name: "staffGuidelines", label: "5.2.1.1.2.9. Training and Awareness: Are there resources or guidelines available to assist staff in understanding and implementing data security measures?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "governPractices", label: "5.2.1.1.2.10. Policy and Procedure Documentation: What policies and procedures are in place to govern data security practices related to student data?", type: "text", securityGatesFormat: true },
                        { name: "documentedPolicies", label: "5.2.1.1.2.10. Policy and Procedure Documentation: How are these policies documented, and how often are they reviewed and updated?", type: "text", securityGatesFormat: true },
                        { name: "communicatedPolicies", label: "5.2.1.1.2.10. Policy and Procedure Documentation: How are changes to data security policies communicated to staff and other stakeholders?", type: "text", securityGatesFormat: true },
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

export default DataSecurityRequirementsFormPage;