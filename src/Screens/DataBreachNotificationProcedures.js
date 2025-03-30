import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataBreachNotificationProceduresFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataBreachNotificationProceduresFormPageImage = httpsCallable(functions, 'uploadDataBreachNotificationProceduresFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Breach Notification Procedures');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Breach Notification Procedures');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Breach Notification Procedures', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Breach Notification Procedures');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Breach Notification Procedures', docId);
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
                <h1>5.2.1.1.4 Data Breach Notification Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.2.1.1.4.1 Notification Triggers:</h2>
                    {[
                        { name: "determiningBreaches", label: "5.2.1.1.4.1.1. What criteria are used to determine if a data breach has occurred and requires notification (e.g., unauthorized access, loss of data)?", type: "text", securityGatesFormat: true },
                        { name: "assessedBreaches", label: "5.2.1.1.4.1.2. How are potential data breaches assessed to confirm their validity and severity?", type: "text", securityGatesFormat: true },
                        { name: "determinationResponsibility", label: "5.2.1.1.4.1.3. Who is responsible for making the determination that a data breach has occurred?", type: "text", securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.2 Notification Timeliness:</h2>
                    {[
                        { name: "notifyingTimeframe", label: "5.2.1.1.4.2.1. What is the timeframe for notifying affected individuals after a data breach is identified (e.g., within 72 hours, immediately)?", type: "text", securityGatesFormat: true },
                        { name: "determinedTimeframe", label: "5.2.1.1.4.2.2. How is this timeframe determined and communicated within the organization?", type: "text", securityGatesFormat: true },
                        { name: "sentNotifications", label: "5.2.1.1.4.2.3. Are there processes in place to ensure that notifications are sent promptly and accurately?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.3 Notification Content:</h2>
                    {[
                        { name: "notificationLetters", label: "5.2.1.1.4.3.1. What information is included in breach notification letters or messages (e.g., nature of the breach, types of data affected, potential impacts)?", type: "text", securityGatesFormat: true },
                        { name: "tailoredContent", label: "5.2.1.1.4.3.2. How is the notification content tailored to ensure clarity and understanding for affected individuals?", type: "text", securityGatesFormat: true },
                        { name: "consistencyGuidelines", label: "5.2.1.1.4.3.3. Are there templates or guidelines used to ensure consistency in notifications?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.4 Affected Parties:</h2>
                    {[
                        { name: "notifyingWho", label: "5.2.1.1.4.4.1. Who must be notified in the event of a data breach (e.g., individuals whose data was compromised, regulatory authorities)?", type: "text", securityGatesFormat: true },
                        { name: "maintainedLists", label: "5.2.1.1.4.4.2. How are notification lists maintained and updated to ensure that all affected parties are contacted?", type: "text", securityGatesFormat: true },
                        { name: "handlingNotifications", label: "5.2.1.1.4.4.3. What procedures are followed to handle notifications for individuals who may be difficult to reach?", type: "text", securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.5 Regulatory Compliance:</h2>
                    {[
                        { name: "governingRequirements", label: "5.2.1.1.4.5.1. What regulatory requirements govern data breach notifications (e.g., GDPR, CCPA, FERPA), and how does the organization ensure compliance?", type: "text", securityGatesFormat: true },
                        { name: "notificationRequirements", label: "5.2.1.1.4.5.2. How is the organization prepared to meet specific notification requirements set forth by different regulations?", type: "text", securityGatesFormat: true },
                        { name: "reportingBreaches", label: "5.2.1.1.4.5.3. Are there procedures in place for reporting breaches to regulatory authorities, and what information must be included in such reports?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.6 Communication Channels:</h2>
                    {[
                        { name: "notifyingIndividuals", label: "5.2.1.1.4.6.1. What methods are used to notify affected individuals (e.g., email, postal mail, phone calls)?", type: "text", securityGatesFormat: true },
                        { name: "chosenChannels", label: "5.2.1.1.4.6.2. How are communication channels chosen based on the nature and severity of the breach?", type: "text", securityGatesFormat: true },
                        { name: "backupMethods", label: "5.2.1.1.4.6.3. Are there backup communication methods in case primary channels are unavailable or ineffective?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.7 Support and Guidance:</h2>
                    {[
                        { name: "affectedIndividuals", label: "5.2.1.1.4.7.1. What support is provided to individuals affected by a data breach (e.g., credit monitoring, identity theft protection)?", type: "text", securityGatesFormat: true },
                        { name: "communicatedResources", label: "5.2.1.1.4.7.2. How is information about available resources and support services communicated to affected individuals?", type: "text", securityGatesFormat: true },
                        { name: "addressingQuestions", label: "5.2.1.1.4.7.3. Are there procedures for addressing questions and concerns from affected individuals?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.8 Internal Notification and Reporting:</h2>
                    {[
                        { name: "notifiedStakeholders", label: "5.2.1.1.4.8.1. How are internal stakeholders notified about the data breach (e.g., senior management, IT department)?", type: "text", securityGatesFormat: true },
                        { name: "internalProcedures", label: "5.2.1.1.4.8.2. What internal reporting procedures are followed to ensure that all relevant parties are informed and involved in the response?", type: "text", securityGatesFormat: true },
                        { name: "documentedBreaches", label: "5.2.1.1.4.8.3. How is information about the breach documented and shared within the organization?", type: "text", securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.9 Post-Breach Review and Improvement:</h2>
                    {[
                        { name: "reviewingProcesses", label: "5.2.1.1.4.9.1. What processes are in place to review and analyze the breach and notification process after an incident?", type: "text", securityGatesFormat: true },
                        { name: "procedureFeedback", label: "5.2.1.1.4.9.2. How is feedback from the breach notification process used to improve procedures and policies?", type: "text", securityGatesFormat: true },
                        { name: "updatingProcedures", label: "5.2.1.1.4.9.3. Are there mechanisms for updating notification procedures based on lessons learned from previous breaches?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

                    <h2>5.2.1.1.4.10 Legal and Public Relations:</h2>
                    {[
                        { name: "notificationConsiderations", label: "5.2.1.1.4.10.1. What legal considerations are taken into account when preparing breach notifications (e.g., potential legal liabilities, compliance issues)?", type: "text", securityGatesFormat: true },
                        { name: "managedRelations", label: "5.2.1.1.4.10.2. How is public relations managed to address the breach and maintain trust with affected individuals and stakeholders?", type: "text", securityGatesFormat: true },
                        { name: "handlingMedia", label: "5.2.1.1.4.10.3. Are there guidelines for handling media inquiries and public statements related to the breach?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

export default DataBreachNotificationProceduresFormPage;