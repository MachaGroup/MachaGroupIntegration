import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ContactInformationDatabaseFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadContactInformationDatabaseFormPageImage = httpsCallable(functions, 'uploadContactInformationDatabaseFormPageImage');

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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Emergency Preparedness/Drill Frequency', docId);
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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Emergency Preparedness/Drill Frequency', docId);
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
                <h1>2.4.1.1.4 Contact Information Database Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Existence of Contact Information Database:</h2>
                    {[
                        { name: "centralizedSystem", label: "Is there a centralized database or system in place to store contact information for individuals who will receive text/email alerts during emergencies?", type: "radio", options: ["yes", "no"] },
                        { name: "includingContactDetails", label: "Does the database include up-to-date contact details, such as phone numbers, email addresses, and preferred communication methods, for all relevant stakeholders?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Data Accuracy and Currency:</h2>
                    {[
                        { name: "reviewedDatabase", label: "How frequently is the contact information database reviewed and updated to ensure accuracy and currency?", type: "text" },
                        { name: "verifyingContactDetails", label: "Are procedures established to verify contact details periodically or in response to changes, such as staff turnover, new enrollments, or updates to contact preferences?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Inclusion of Key Stakeholders:</h2>
                    {[
                        { name: "contactInformationDatabaseList", label: "Does the contact information database encompass a comprehensive list of key stakeholders, including staff members, students, parents/guardians, contractors, and external partners?", type: "radio", options: ["yes", "no"] },
                        { name: "categorizingContactDetails", label: "Are contact details categorized or segmented based on roles, responsibilities, or affiliations to facilitate targeted communication during emergencies?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Accessibility and Security:</h2>
                    {[
                        { name: "authorizedDatabaseManaging", label: "Is the contact information database accessible to authorized personnel responsible for managing and disseminating emergency alerts?", type: "radio", options: ["yes", "no"] },
                        { name: "implementedSecurityMeasures", label: "Are appropriate security measures implemented to protect the confidentiality, integrity, and availability of contact information stored in the database?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Integration with Alerting Systems:</h2>
                    {[
                        { name: "integratedAlertingSystems", label: "Is the contact information database integrated with text/email alerting systems to facilitate rapid and automated distribution of emergency notifications?", type: "radio", options: ["yes", "no"] },
                        { name: "synchronizingProcedures", label: "Are procedures established for synchronizing or synchronizing contact information between the database and alerting systems to ensure consistency and reliability?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Opt-In/Opt-Out Mechanisms:</h2>
                    {[
                        { name: "optInOptOutMechanisms", label: "Are mechanisms in place for individuals to opt in or opt out of receiving text/email alerts, and are these preferences documented and honored?", type: "radio", options: ["yes", "no"] },
                        { name: "updatingContactInformation", label: "Is there a process for individuals to update their contact information or communication preferences, and are changes promptly reflected in the database and alerting systems?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Training and User Support:</h2>
                    {[
                        { name: "accessingDatabaseTraining", label: "Are staff members trained on how to access and use the contact information database for sending emergency alerts?", type: "radio", options: ["yes", "no"] },
                        { name: "userSupport", label: "Is user support provided to assist personnel in navigating the database, troubleshooting issues, and managing contact lists effectively?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>Compliance with Privacy Regulations:</h2>
                    {[
                        { name: "applicablePrivacyRegulations", label: "Does the management of contact information adhere to applicable privacy regulations, such as the Family Educational Rights and Privacy Act (FERPA) or the Health Insurance Portability and Accountability Act (HIPAA)?", type: "radio", options: ["yes", "no"] },
                        { name: "safeguardingPersonalData", label: "Are protocols established for safeguarding personal data and obtaining consent for the collection and use of contact information for emergency communication purposes?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </React.Fragment>
                                ))}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
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

export default ContactInformationDatabaseFormPage;