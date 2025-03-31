import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataClassificationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataClassificationFormPageImage = httpsCallable(functions, 'uploadDataClassificationFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Classification');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Classification');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Classification', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Classification');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Classification', docId);
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
                <h1>5.1.1.2.1 Data Classification Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.1.2.1.1 Classification Criteria:</h2>
                    {[
                        { name: "classifyingData", label: "5.1.1.2.1.1.1. What criteria are used to classify data into different categories (e.g., sensitive, confidential, public)?", type: "text", securityGatesFormat: true },
                        { name: "definedLevels", label: "5.1.1.2.1.1.2. How are data classification levels defined and documented?", type: "text", securityGatesFormat: true },
                        { name: "sensitivityGuidelines", label: "5.1.1.2.1.1.3. Are there specific guidelines for determining the sensitivity of data based on its content, context, and intended use?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.2 Data Labeling and Marking:</h2>
                    {[
                        { name: "labelingData", label: "5.1.1.2.1.2.1. What procedures are in place for labeling and marking data according to its classification level?", type: "text", securityGatesFormat: true },
                        { name: "labelingImplementation", label: "5.1.1.2.1.2.2. How is data labeling implemented across various data storage and communication platforms?", type: "text", securityGatesFormat: true },
                        { name: "standardizedLabels", label: "5.1.1.2.1.2.3. Are there standardized labels or markings used to clearly indicate data classification levels?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.3 Access Controls:</h2>
                    {[
                        { name: "accessImplementation", label: "5.1.1.2.1.3.1. How are access controls implemented based on data classification levels (e.g., restricting access to sensitive data)?", type: "text", securityGatesFormat: true },
                        { name: "authorizedPersonnel", label: "5.1.1.2.1.3.2. What measures are in place to ensure that only authorized personnel have access to classified data?", type: "text", securityGatesFormat: true },
                        { name: "managedPermissions", label: "5.1.1.2.1.3.3. How are access permissions managed and reviewed for different classification levels?", type: "text", securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.4 Data Handling Procedures:</h2>
                    {[
                        { name: "handlingData", label: "5.1.1.2.1.4.1. What procedures are followed for handling and processing data based on its classification level (e.g., encryption for sensitive data)?", type: "text", securityGatesFormat: true },
                        { name: "storingData", label: "5.1.1.2.1.4.2. Are there specific protocols for storing, transmitting, and disposing of classified data?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "handlingProcedures", label: "5.1.1.2.1.4.3. How are data handling procedures communicated to and followed by employees?", type: "text", securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.5 Training and Awareness:</h2>
                    {[
                        { name: "trainingPrograms", label: "5.1.1.2.1.5.1. What training programs are provided to employees regarding data classification and handling practices?", type: "text", securityGatesFormat: true },
                        { name: "maintainedAwareness", label: "5.1.1.2.1.5.2. How is awareness of data classification policies maintained among staff members?", type: "text", securityGatesFormat: true },
                        { name: "assistingGuidelines", label: "5.1.1.2.1.5.3. Are there resources or guidelines available to assist employees in understanding and applying data classification procedures?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.6 Data Protection Measures:</h2>
                    {[
                        { name: "protectionMeasures", label: "5.1.1.2.1.6.1. What measures are in place to protect data based on its classification level (e.g., physical security for sensitive data)?", type: "text", securityGatesFormat: true },
                        { name: "protectedData", label: "5.1.1.2.1.6.2. How is sensitive data protected from unauthorized access or exposure?", type: "text", securityGatesFormat: true },
                        { name: "securityControls", label: "5.1.1.2.1.6.3. Are there specific security controls implemented for different data classification levels?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.7 Compliance and Auditing:</h2>
                    {[
                        { name: "classificationPolicies", label: "5.1.1.2.1.7.1. How is compliance with data classification policies monitored and enforced?", type: "text", securityGatesFormat: true },
                        { name: "regularAudits", label: "5.1.1.2.1.7.2. Are there regular audits conducted to ensure proper classification and handling of data?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "noncomplianceProcesses", label: "5.1.1.2.1.7.3. What processes are in place to address non-compliance with data classification policies?", type: "text", securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.8 Data Sharing and Transfer:</h2>
                    {[
                        { name: "sharingData", label: "5.1.1.2.1.8.1. What guidelines are followed for sharing or transferring data between different classification levels (e.g., secure methods for transferring sensitive data)?", type: "text", securityGatesFormat: true },
                        { name: "controlledData", label: "5.1.1.2.1.8.2. How is data sharing controlled and monitored to prevent unauthorized access?", type: "text", securityGatesFormat: true },
                        { name: "documentingProtocols", label: "5.1.1.2.1.8.3. Are there protocols for documenting and tracking data transfers?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.9 Policy Review and Updates:</h2>
                    {[
                        { name: "reviewedPolocies", label: "5.1.1.2.1.9.1. How frequently are data classification policies reviewed and updated to reflect changes in regulations or organizational needs?", type: "text", securityGatesFormat: true },
                        { name: "updatingPolocies", label: "5.1.1.2.1.9.2. Who is responsible for reviewing and updating the data classification policies?", type: "text", securityGatesFormat: true },
                        { name: "communicatedPolicies", label: "5.1.1.2.1.9.3. How are updates to data classification policies communicated to relevant stakeholders?", type: "text", securityGatesFormat: true },
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

                    <h2>5.1.1.2.1.10 Incident Management:</h2>
                    {[
                        { name: "dataExposure", label: "5.1.1.2.1.10.1. What procedures are followed in the event of a data breach or exposure involving classified data?", type: "text", securityGatesFormat: true },
                        { name: "managedData", label: "5.1.1.2.1.10.2. How are incidents involving misclassification or mishandling of data managed and investigated?", type: "text", securityGatesFormat: true },
                        { name: "dataBreaches", label: "5.1.1.2.1.10.3. What steps are taken to mitigate the impact of data breaches and prevent future occurrences?", type: "text", securityGatesFormat: true },
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

export default DataClassificationFormPage;