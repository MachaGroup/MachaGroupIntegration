import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataAccessControlsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataAccessControlsFormPageImage = httpsCallable(functions, 'uploadDataAccessControlsFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Access Controls');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Access Controls');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Access Controls', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Access Controls');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Access Controls', docId);
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
                <h1>5.1.2.2.2 Data Access Controls Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.2.2.2.1 Access Control Policies:</h2>
                    {[
                        { name: "accessData", label: "5.1.2.2.2.1.1. What policies are in place to define who can access sensitive data and under what conditions?", type: "text", securityGatesFormat: true },
                        { name: "communicatedPolicies", label: "5.1.2.2.2.1.2. How are access control policies communicated to and enforced among staff?", type: "text", securityGatesFormat: true },
                        { name: "updatingPolicies", label: "5.1.2.2.2.1.3. Are there procedures for updating access control policies to reflect changes in organizational needs or regulations?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.2 Role-Based Access Control (RBAC):</h2>
                    {[
                        { name: "definedRoles", label: "5.1.2.2.2.2.1. How are roles defined within the organization, and what criteria determine role-based access permissions?", type: "text", securityGatesFormat: true },
                        { name: "assignedRoles", label: "5.1.2.2.2.2.2. How are roles assigned to individuals, and how is access to sensitive data managed based on these roles?", type: "text", securityGatesFormat: true },
                        { name: "reviewedDefinitions", label: "5.1.2.2.2.2.3. Are role definitions reviewed and updated periodically to ensure they reflect current job responsibilities?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.3 Access Approval Processes:</h2>
                    {[
                        { name: "grantingProcesses", label: "5.1.2.2.2.3.1. What processes are in place for granting, modifying, or revoking access to sensitive data?", type: "text", securityGatesFormat: true },
                        { name: "approvingResponsibility", label: "5.1.2.2.2.3.2. Who is responsible for approving access requests, and how is the approval process documented?", type: "text", securityGatesFormat: true },
                        { name: "auditingApprovals", label: "5.1.2.2.2.3.3. Are there mechanisms for auditing and reviewing access approvals to ensure compliance with access control policies?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.4 Authentication and Authorization:</h2>
                    {[
                        { name: "userAuthentication", label: "5.1.2.2.2.4.1. What methods are used to authenticate users before granting access to sensitive data (e.g., passwords, multi-factor authentication)?", type: "text", securityGatesFormat: true },
                        { name: "managedAuthorization", label: "5.1.2.2.2.4.2. How is authorization managed to ensure that users only access data that is necessary for their role?", type: "text", securityGatesFormat: true },
                        { name: "authenticationHandling", label: "5.1.2.2.2.4.3. Are there procedures for handling authentication and authorization failures or issues?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.5 Access Logging and Monitoring:</h2>
                    {[
                        { name: "loggedData", label: "5.1.2.2.2.5.1. How is access to sensitive data logged, and what information is captured in access logs?", type: "text", securityGatesFormat: true },
                        { name: "monitoringMechanisms", label: "5.1.2.2.2.5.2. What monitoring mechanisms are in place to detect and respond to unauthorized access attempts or anomalies?", type: "text", securityGatesFormat: true },
                        { name: "reviewedLogs", label: "5.1.2.2.2.5.3. How are access logs reviewed and analyzed to identify potential security incidents or policy violations?", type: "text", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.6 Data Access Reviews:</h2>
                    {[
                        { name: "reviewedRights", label: "5.1.2.2.2.6.1. How frequently are access rights reviewed to ensure they are still appropriate for each user's role?", type: "text", securityGatesFormat: true },
                        { name: "validatingPermissions", label: "5.1.2.2.2.6.2. What processes are used to validate that access permissions are aligned with current job responsibilities?", type: "text", securityGatesFormat: true },
                        { name: "handlingDiscrepancies", label: "5.1.2.2.2.6.3. Are there procedures for handling discrepancies or issues identified during access reviews?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.7 Least Privilege Principle:</h2>
                    {[
                        { name: "privilegePrinciple", label: "5.1.2.2.2.7.1. How is the principle of least privilege applied to limit access to sensitive data to only those who need it?", type: "text", securityGatesFormat: true },
                        { name: "reviewedProcesses", label: "5.1.2.2.2.7.2. What processes are in place to ensure that access permissions are regularly reviewed and adjusted based on changing roles?", type: "text", securityGatesFormat: true },
                        { name: "safegaurdPreventions", label: "5.1.2.2.2.7.3. Are there safeguards to prevent the accumulation of excessive access rights over time?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.8 Access Control for External Parties:</h2>
                    {[
                        { name: "managedData", label: "5.1.2.2.2.8.1. How is access to sensitive data managed for external parties, such as contractors or vendors?", type: "text", securityGatesFormat: true },
                        { name: "policiyControls", label: "5.1.2.2.2.8.2. What controls are in place to ensure that external parties adhere to the organization's access policies?", type: "text", securityGatesFormat: true },
                        { name: "governAccess", label: "5.1.2.2.2.8.3. Are there agreements or contracts in place to govern access to sensitive data by external parties?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.9 Incident Response for Access Violations:</h2>
                    {[
                        { name: "accessProcedures", label: "5.1.2.2.2.9.1. What procedures are followed when unauthorized access to sensitive data is detected?", type: "text", securityGatesFormat: true },
                        { name: "reportedBreaches", label: "5.1.2.2.2.9.2. How are incidents involving access control breaches reported, investigated, and resolved?", type: "text", securityGatesFormat: true },
                        { name: "documentingMechanisms", label: "5.1.2.2.2.9.3. Are there mechanisms for documenting and addressing lessons learned from access violations?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>5.1.2.2.2.10 Training and Awareness:</h2>
                    {[
                        { name: "employeeTraining", label: "5.1.2.2.2.10.1. What training is provided to employees regarding data access controls and policies?", type: "text", securityGatesFormat: true },
                        { name: "maintainedAwareness", label: "5.1.2.2.2.10.2. How is awareness of access control best practices maintained among staff?", type: "text", securityGatesFormat: true },
                        { name: "employeeResources", label: "5.1.2.2.2.10.3. Are there resources or guidelines available to assist employees in understanding and adhering to access control requirements?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
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

export default DataAccessControlsFormPage;