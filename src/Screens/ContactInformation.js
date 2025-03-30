import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ContactInformationPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadContactInformationPageImage = httpsCallable(functions, 'uploadContactInformationPageImage');

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
            const formsRef = collection(db, 'forms/Cybersecurity/Contact Information');
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
                const formsRef = collection(db, 'forms/Cybersecurity/Contact Information');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Cybersecurity/Contact Information', docId);
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
            const formsRef = collection(db, 'forms/Cybersecurity/Contact Information');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Cybersecurity/Contact Information', docId);
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
                <h1>4.3.1.2.2 Contact Information Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.3.1.2.2.1 Accessibility of Contact Information:</h2>
                    {[
                        { name: "contactInfoAccessible", label: "Is the IT support contact information readily accessible to all employees, including those working remotely or in different time zones?", type: "radio", options: ["yes", "no"] },
                        { name: "communicationChannels", label: "Are multiple communication channels provided for employees to contact IT support (e.g., phone, email, chat)?", type: "text" },
                        { name: "contactInfoReviewFrequency", label: "How frequently is the contact information reviewed and updated to ensure accuracy and availability?", type: "text" },
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
                                
                            </div>
                            <div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>4.3.1.2.2.2 Clarity and Visibility:</h2>
                    {[
                        { name: "contactInfoVisibility", label: "Is the contact information for IT support prominently displayed in key areas, such as the company intranet, employee handbooks, or near workstations?", type: "radio", options: ["yes", "no"] },
                        { name: "instructionsForContact", label: "Are there clear instructions provided on when and how to contact IT support for different types of cybersecurity incidents or technical issues?", type: "text" },
                        { name: "understandingITRole", label: "How does the organization ensure that employees understand the role and responsibilities of IT support regarding incident reporting and response?", type: "text" },
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
                          
                            </div>
                            <div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    ))}

                    <h2>4.3.1.2.2.3 Response Time and Effectiveness:</h2>
                    {[
                        { name: "responseTime", label: "What are the expected response times for IT support when contacted regarding cybersecurity incidents or technical issues?", type: "text" },
                        { name: "effectivenessITSupport", label: "How is the effectiveness of IT support in resolving issues and providing guidance measured and evaluated?", type: "text" },
                        { name: "escalationProcedures", label: "Are there escalation procedures in place if the initial IT support contact is unable to resolve an issue promptly?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>

                      </div><div>
                          {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div></>
                    ))}

                    <h2>4.3.1.2.2.4 Training and Awareness:</h2>
                    {[
                        { name: "employeeReminders", label: "Are employees regularly reminded of the importance of knowing how to contact IT support and when to do so in the event of a cybersecurity threat?", type: "radio", options: ["yes", "no"] },
                        { name: "trainingForContact", label: "Is there training provided to employees on what information to provide when contacting IT support to facilitate a quicker response?", type: "text" },
                        { name: "onboardingITAwareness", label: "How does the organization ensure that new employees are aware of IT support contact information and procedures as part of their onboarding process?", type: "text" },
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
                               
                            </div>
                            <div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>

                            </div>
                        </div>
                    ))}

                    <h2>4.3.1.2.2.5 Integration with Security Policies:</h2>
                    {[
                        { name: "integrationIntoPolicies", label: "How is the contact information for IT support integrated into broader cybersecurity policies and procedures, such as incident response plans?", type: "text" },
                        { name: "guidelinesForIT", label: "Are there specific guidelines for IT support on how to handle different types of cybersecurity incidents and communicate with employees?", type: "text" },
                        { name: "feedbackToImprovePolicies", label: "How does the organization use feedback from IT support interactions to refine and improve cybersecurity policies and contact procedures?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>

                      </div><div>
                          {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div></>
                    ))}

                    <h2>4.3.1.2.2.6 Availability and Continuity:</h2>
                    {[
                        { name: "availabilityOfSupport", label: "Is IT support available 24/7 for cybersecurity incidents, or are there specific hours of operation?", type: "text" },
                        { name: "afterHoursSupport", label: "What provisions are in place for after-hours or emergency support, particularly during critical incidents or cybersecurity threats?", type: "text" },
                        { name: "supportContinuity", label: "How does the organization ensure continuity of IT support services during holidays, weekends, or in the event of a large-scale incident?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>

                      </div><div>
                          {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div></>
                    ))}

                    <h2>4.3.1.2.2.7 Feedback and Improvement:</h2>
                    {[
                        { name: "feedbackToImprove", label: "Are employees encouraged to provide feedback on their experiences with IT support, and how is this feedback used to improve services?", type: "text" },
                        { name: "reviewsAudits", label: "Are there regular reviews or audits of IT support contact procedures to identify areas for enhancement?", type: "text" },
                        { name: "staffingAndTraining", label: "How does the organization ensure that IT support is adequately staffed and trained to handle the volume and variety of cybersecurity incidents reported by employees?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>

                      </div><div>
                          {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div></>
                    ))}

                    <h2>4.3.1.2.2.8 Communication Strategy:</h2>
                    {[
                        { name: "frequencyOfUpdates", label: "How frequently does the organization communicate changes or updates to IT support contact information to employees?", type: "text" },
                        { name: "emergencyStrategies", label: "Are there emergency communication strategies in place if IT support contact information changes suddenly (e.g., during a cyber incident)?", type: "text" },
                        { name: "reinforceImportance", label: "How does the organization reinforce the importance of maintaining updated contact information in all communication materials?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>

                      </div><div>
                          {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div></>
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

export default ContactInformationPage;