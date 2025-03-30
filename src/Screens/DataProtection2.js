import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataProtection2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataProtection2FormPageImage = httpsCallable(functions, 'uploadDataProtection2FormPageImage');

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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Protection');
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
                const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Protection');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Data Protection', docId);
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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Protection');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Data Protection', docId);
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
                <h1>Data Protection Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Data Protection Assessment</h2>
                    {[
                        { name: "sensitiveInformationTraining", label: "3.4.2.2.3.1. Are staff members trained on identifying and handling sensitive information, including personally identifiable information (PII), financial data, medical records, and other confidential or proprietary data?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "sensitiveInformationTypes", label: "3.4.2.2.3.2. What types of sensitive information are emphasized during training sessions, and how are staff members educated on the potential risks associated with mishandling or disclosing such information to unauthorized parties?", type: "text", securityGatesFormat: true },
                        { name: "sensitiveDataRolesResponsibilities", label: "3.4.2.2.3.3. How are staff members made aware of their roles and responsibilities in safeguarding sensitive data, including compliance with relevant laws, regulations, and organizational policies governing data protection and privacy?", type: "text", securityGatesFormat: true },
                        { name: "dataClassificationGuidelines", label: "3.4.2.2.3.4. Are staff members provided with guidelines or procedures for classifying data based on its sensitivity, criticality, and access controls, distinguishing between public, internal, confidential, and restricted information categories?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "dataHandlingTraining", label: "3.4.2.2.3.5. How are staff members trained on the appropriate methods and tools for securely handling, storing, transmitting, and disposing of sensitive data, including encryption, access controls, secure file transfer protocols, and data retention policies?", type: "text", securityGatesFormat: true },
                        { name: "dataConfidentialityMeasures", label: "3.4.2.2.3.6. What measures are in place to ensure that staff members understand the importance of maintaining the confidentiality, integrity, and availability of data throughout its lifecycle, from creation and processing to storage and disposal?", type: "text", securityGatesFormat: true },
                        { name: "securityThreatEducation", label: "3.4.2.2.3.7. Are staff members educated on common data security threats and vulnerabilities, such as malware infections, phishing attacks, insider threats, and social engineering techniques, that could compromise the confidentiality or integrity of sensitive information?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "incidentRecognitionTraining", label: "3.4.2.2.3.8. How are staff members trained to recognize indicators of suspicious activity or potential data breaches, such as unusual file access patterns, unauthorized system modifications, or unexpected data transmissions, and to report such incidents promptly to designated IT or security personnel?", type: "text", securityGatesFormat: true },
                        { name: "securityAwarenessCulture", label: "3.4.2.2.3.9. What strategies are employed to foster a culture of security awareness and vigilance among staff members, encouraging them to remain alert, proactive, and responsive to emerging data security risks and evolving threat landscapes?", type: "text", securityGatesFormat: true },
                        { name: "dataPrivacyPrinciples", label: "3.4.2.2.3.10. Are staff members briefed on fundamental data privacy principles, such as the need-to-know principle, least privilege principle, data minimization principle, and purpose limitation principle, to guide their handling of sensitive information?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "privacyRightsTraining", label: "3.4.2.2.3.11. How are staff members trained to respect individual privacy rights, maintain confidentiality, and obtain appropriate consent or authorization before accessing, collecting, using, or disclosing personal data for legitimate business purposes?", type: "text", securityGatesFormat: true },
                        { name: "privacyLawsResources", label: "3.4.2.2.3.12. What educational resources or reference materials are provided to staff members to reinforce their understanding of data privacy laws, regulations, and industry standards governing the collection, processing, and sharing of personal information?", type: "text", securityGatesFormat: true },
                        { name: "incidentResponseTraining", label: "3.4.2.2.3.13. Are staff members equipped with knowledge and skills for responding to data security incidents, breaches, or unauthorized disclosures, including immediate containment measures, evidence preservation, and incident reporting protocols?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "incidentReportingProcedures", label: "3.4.2.2.3.14. How are staff members instructed on the procedures for reporting suspected data breaches or security incidents to designated authorities, such as IT helpdesk, data protection officer, or regulatory bodies, and for communicating with affected individuals or stakeholders in a timely and transparent manner?", type: "text", securityGatesFormat: true },
                        { name: "postIncidentMechanisms", label: "3.4.2.2.3.15. What mechanisms are in place to facilitate post-incident analysis, root cause identification, lessons learned, and corrective actions to prevent recurrence of data security incidents and strengthen overall data protection measures?", type: "text", securityGatesFormat: true },
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

export default DataProtection2FormPage;