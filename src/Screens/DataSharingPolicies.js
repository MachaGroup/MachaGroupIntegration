import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataSharingPoliciesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataSharingPoliciesFormPageImage = httpsCallable(functions, 'uploadDataSharingPoliciesFormPageImage');

    const [formData, setFormData, ] = useState({});
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Sharing Policies');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Sharing Policies');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Sharing Policies', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Sharing Policies');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Sharing Policies', docId);
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
                <h1>5.1.1.2.2 Data Sharing Policies Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.1.2.2 Data Sharing Policies</h2>
                    {[
                        { name: "approvingRequests", label: "5.1.1.2.2.1. Approval and Authorization: What is the process for approving data sharing requests with third parties?", type: "text", securityGatesFormat: true },
                        { name: "authorizingAgreements", label: "5.1.1.2.2.1. Approval and Authorization: Who has the authority to authorize data sharing agreements or contracts?", type: "text", securityGatesFormat: true },
                        { name: "approvedData", label: "5.1.1.2.2.1. Approval and Authorization: Are there specific criteria that must be met before data sharing is approved?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "keyComponents", label: "5.1.1.2.2.2. Data Sharing Agreements: What are the key components of data sharing agreements with third parties (e.g., terms, conditions, data protection clauses)?", type: "text", securityGatesFormat: true },
                        { name: "documentedAgreements", label: "5.1.1.2.2.2. Data Sharing Agreements: How are data sharing agreements documented and maintained?", type: "text", securityGatesFormat: true },
                        { name: "standardGuidelines", label: "5.1.1.2.2.2. Data Sharing Agreements: Are there standard templates or guidelines used for drafting data sharing agreements?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "securityMeasures", label: "5.1.1.2.2.3. Data Security Measures: What security measures are required for data shared with third parties (e.g., encryption, secure transmission)?", type: "text", securityGatesFormat: true },
                        { name: "ensuredSecurity", label: "5.1.1.2.2.3. Data Security Measures: How is data security ensured during the transfer and handling by third parties?", type: "text", securityGatesFormat: true },
                        { name: "thirdpartyRequirements", label: "5.1.1.2.2.3. Data Security Measures: Are there specific requirements for third parties regarding data protection and security controls?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "relevantRegulations", label: "5.1.1.2.2.4. Compliance with Regulations: How does the organization ensure that data sharing complies with relevant regulations and legal requirements (e.g., GDPR, CCPA)?", type: "text", securityGatesFormat: true },
                        { name: "verifyingProcedures", label: "5.1.1.2.2.4. Compliance with Regulations: What procedures are in place to verify that third parties comply with data protection regulations?", type: "text", securityGatesFormat: true },
                        { name: "regularReviews", label: "5.1.1.2.2.4. Compliance with Regulations: Are there regular reviews or audits to ensure compliance with data sharing policies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "useRestrictions", label: "5.1.1.2.2.5. Data Use and Restrictions: What restrictions are placed on the use of shared data by third parties (e.g., limitations on data usage or further sharing)?", type: "text", securityGatesFormat: true },
                        { name: "ensuredRestrictions", label: "5.1.1.2.2.5. Data Use and Restrictions: How is it ensured that third parties adhere to these restrictions?", type: "text", securityGatesFormat: true },
                        { name: "enforcedCompliance", label: "5.1.1.2.2.5. Data Use and Restrictions: Are there mechanisms in place to monitor and enforce compliance with data use restrictions?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "retentionGuidelines", label: "5.1.1.2.2.6. Data Retention and Disposal: What guidelines are in place for the retention and disposal of data shared with third parties?", type: "text", securityGatesFormat: true },
                        { name: "disposedData", label: "5.1.1.2.2.6. Data Retention and Disposal: How is data securely disposed of or returned once the purpose of sharing has been fulfilled?", type: "text", securityGatesFormat: true },
                        { name: "verifyingPractices", label: "5.1.1.2.2.6. Data Retention and Disposal: Are there procedures for verifying that third parties follow proper data disposal practices?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "followedProcedures", label: "5.1.1.2.2.7. Incident Response and Breach Notification: What procedures are followed in the event of a data breach involving shared data?", type: "text", securityGatesFormat: true },
                        { name: "reportingBreaches", label: "5.1.1.2.2.7. Incident Response and Breach Notification: How are third parties required to report data breaches or security incidents?", type: "text", securityGatesFormat: true },
                        { name: "mitigatingBreaches", label: "5.1.1.2.2.7. Incident Response and Breach Notification: What steps are taken to address and mitigate the impact of breaches involving shared data?", type: "text", securityGatesFormat: true },
                        { name: "employeeTraining", label: "5.1.1.2.2.8. Training and Awareness: What training is provided to employees regarding data sharing policies and procedures?", type: "text", securityGatesFormat: true },
                        { name: "awarenessGuidelines", label: "5.1.1.2.2.8. Training and Awareness: How is awareness of data sharing guidelines maintained among staff involved in data sharing?", type: "text", securityGatesFormat: true },
                        { name: "availableGuidelines", label: "5.1.1.2.2.8. Training and Awareness: Are there resources or guidelines available to help employees understand and comply with data sharing policies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "monitoredPolicies", label: "5.1.1.2.2.9. Monitoring and Auditing: How is compliance with data sharing policies monitored and enforced?", type: "text", securityGatesFormat: true },
                        { name: "regularAudits", label: "5.1.1.2.2.9. Monitoring and Auditing: Are there regular audits conducted to review data sharing practices and agreements?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "noncomplianceAudits", label: "5.1.1.2.2.9. Monitoring and Auditing: What processes are in place to address any non-compliance identified during audits?", type: "text", securityGatesFormat: true },
                        { name: "reviewedPolicies", label: "5.1.1.2.2.10. Policy Review and Updates: How frequently are data sharing policies reviewed and updated to reflect changes in regulations or organizational needs?", type: "text", securityGatesFormat: true },
                        { name: "updatingPolicies", label: "5.1.1.2.2.10. Policy Review and Updates: Who is responsible for reviewing and updating the data sharing policies?", type: "text", securityGatesFormat: true },
                        { name: "communicatingUpdates", label: "5.1.1.2.2.10. Policy Review and Updates: How are updates to data sharing policies communicated to relevant stakeholders?", type: "text", securityGatesFormat: true },
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

export default DataSharingPoliciesFormPage;