import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ConsentManagementFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadConsentManagementFormPageImage = httpsCallable(functions, 'uploadConsentManagementFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Consent Management');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Consent Management');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Consent Management', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Consent Management');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Consent Management', docId);
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
                <h1>5.2.1.2.2 Consent Management Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.2.1.2.2.1 Consent Collection Methods:</h2>
                    {[
                        { name: "collectingConsent", label: "What methods are used to collect consent from individuals (e.g., online forms, paper consent forms, verbal agreements)?", type: "text" },
                        { name: "obtainingConsent", label: "How is consent obtained for different types of data processing activities (e.g., marketing, data sharing, profiling)?", type: "text" },
                        { name: "verifyingAuthenticity", label: "Are there mechanisms in place to verify the authenticity of consent (e.g., email confirmation, identity verification)?", type: "radio", options: ["yes", "no"] },
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

                    <h2>5.2.1.2.2.2 Consent Records and Documentation:</h2>
                    {[
                        { name: "maintaingDocumentation", label: "How is consent documentation maintained and stored (e.g., digital records, physical files)?", type: "text" },
                        { name: "recordedInformation", label: "What information is recorded as part of the consent process (e.g., date of consent, scope of consent, consent method)?", type: "text" },
                        { name: "accessibleDocumentation", label: "How is consent documentation made accessible for auditing and compliance purposes?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>

                        </div><div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div></>
                    ))}

                    <h2>5.2.1.2.2.3 Consent Renewal and Reaffirmation:</h2>
                    {[
                        { name: "reviewedConsent", label: "How often is consent reviewed and renewed to ensure it remains valid (e.g., periodic renewals, triggered by changes in processing activities)?", type: "text" },
                        { name: "reaffirmingConsent", label: "What procedures are in place for reaffirming consent if there are significant changes to data processing practices?", type: "text" },
                        { name: "notifiedIndividuals", label: "How are individuals notified about the need to renew or reaffirm their consent?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>

                        </div><div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div></>
                    ))}

                    <h2>5.2.1.2.2.4 Consent Withdrawal Procedures:</h2>
                    {[
                        { name: "withdrawingConsent", label: "What processes are in place for individuals to withdraw their consent (e.g., opt-out options, contact methods)?", type: "text" },
                        { name: "managingWithdrawal", label: "How is consent withdrawal managed and recorded to ensure that data processing ceases promptly?", type: "text" },
                        { name: "informedConsequences", label: "Are individuals informed about the consequences of withdrawing consent (e.g., loss of access to certain services)?", type: "radio", options: ["yes", "no"] },
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

                    <h2>5.2.1.2.2.5 Consent Management Tools and Systems:</h2>
                    {[
                        { name: "managingTools", label: "What tools or systems are used to manage consent (e.g., consent management platforms, CRM systems)?", type: "text" },
                        { name: "integratingTools", label: "How do these tools integrate with other systems to ensure consistent application of consent policies?", type: "text" },
                        { name: "securityMeasures", label: "What measures are taken to ensure the security and integrity of consent management systems?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>

                        </div><div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div></>
                    ))}

                    <h2>5.2.1.2.2.6 Compliance with Regulations:</h2>
                    {[
                        { name: "ensuringCompliance", label: "How does your organization ensure compliance with relevant data protection regulations related to consent (e.g., GDPR, CCPA)?", type: "text" },
                        { name: "consentPractices", label: "What steps are taken to align consent practices with legal requirements and industry standards?", type: "text" },
                        { name: "incorporatedRegulations", label: "How are changes in regulations incorporated into consent management practices?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>

                        </div><div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div></>
                    ))}

                    <h2>5.2.1.2.2.7 Transparency and Communication:</h2>
                    {[
                        { name: "communicatedPractices", label: "How is information about consent practices communicated to individuals (e.g., privacy notices, consent forms)?", type: "text" },
                        { name: "clearConsentingInformation", label: "Are individuals provided with clear and understandable information about what they are consenting to and their rights?", type: "radio", options: ["yes", "no"] },
                        { name: "assessibleInformation", label: "What methods are used to ensure that consent information is accessible and comprehensible to all individuals, including those with disabilities?", type: "text" },
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

                    <h2>5.2.1.2.2.8 Data Subject Rights:</h2>
                    {[
                        { name: "protectedConsent", label: "How are individuals' rights related to consent protected (e.g., right to access, right to rectification)?", type: "text" },
                        { name: "exercisingRights", label: "What procedures are in place for individuals to exercise their rights regarding their consent and personal data?", type: "text" },
                        { name: "monitoredRights", label: "How is compliance with data subject rights monitored and enforced?", type: "text" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                            <label>{question.label}</label>

                        </div><div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />}
                                <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                            </div></>
                    ))}

                    <h2>5.2.1.2.2.9 Training and Awareness:</h2>
                    {[
                        { name: "staffTraining", label: "What training is provided to staff involved in consent management (e.g., understanding consent requirements, handling consent requests)?", type: "text" },
                        { name: "staffAwareness", label: "How is staff awareness of consent policies and procedures maintained and updated?", type: "text" },
                        { name: "supportResources", label: "Are there resources available to support staff in managing consent effectively (e.g., guidelines, templates)?", type: "radio", options: ["yes", "no"] },
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

                    <h2>5.2.1.2.2.9 Audit and Review:</h2>
                    {[
                        { name: "auditedPractices", label: "How frequently are consent management practices audited to ensure compliance and effectiveness (e.g., internal audits, external reviews)?", type: "text" },
                        { name: "accessingEffectiveness", label: "What criteria are used to assess the effectiveness of consent management practices and make improvements?", type: "text" },
                        { name: "auditFindings", label: "How are audit findings and recommendations used to enhance consent management processes?", type: "text" },
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

export default ConsentManagementFormPage;