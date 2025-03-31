import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function IncidentReportingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadIncidentReportingImage = httpsCallable(functions, 'uploadIncidentReportingImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Reporting', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Reporting', buildingId);
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
                const uploadResult = await uploadIncidentReportingImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Incident Reporting', buildingId);
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

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Incident Reporting Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Incident Reporting Assessment</h2>
                    {[
                        { name: "reportingChannels", label: "What channels are available for employees to report suspicious emails or potential phishing attempts (e.g., email, dedicated reporting tool, phone line)?" },
                        { name: "accessibleReporting", label: "Are these reporting mechanisms easily accessible and user-friendly for all employees, regardless of their technical expertise?" },
                        { name: "reportingProcessClarity", label: "Is there a clear process outlined for what information employees should include when reporting suspicious emails?" },
                        { name: "regularTraining", label: "Are employees regularly trained on how to recognize suspicious emails and the importance of promptly reporting them?" },
                        { name: "reportingReminders", label: "How often are employees reminded of the reporting procedures, and is there ongoing communication to reinforce these practices?" },
                        { name: "caseStudies", label: "Are there examples or case studies used in training to illustrate successful reporting and its impact on preventing security breaches?" },
                        { name: "incidentHandlingProcess", label: "What is the process for handling reports of suspicious emails once they are submitted? Who is responsible for investigating these reports?" },
                        { name: "incidentResponseTime", label: "How quickly are reported incidents reviewed and addressed by the security team, and is this turnaround time communicated to employees?" },
                        { name: "employeeFeedback", label: "Is there feedback provided to employees who report suspicious emails, such as acknowledgment of the report and information on any actions taken?" },
                        { name: "effectivenessMetrics", label: "How is the effectiveness of the incident reporting process measured (e.g., number of reports, accuracy of reports, prevention of phishing attacks)?" },
                        { name: "reviewAuditProcess", label: "Are there regular reviews or audits of the reporting process to identify areas for improvement and ensure it remains effective?" },
                        { name: "encourageReporting", label: "How does the organization encourage employees to report incidents without fear of reprisal or judgment?" },
                        { name: "integrationWithSecurity", label: "How is the incident reporting process integrated with other security measures, such as threat intelligence sharing and security incident response?" },
                        { name: "escalationProtocols", label: "Are there established protocols for escalating reported incidents to higher-level security teams or external authorities if needed?" },
                        { name: "useOfIncidentData", label: "How does the organization use data from reported incidents to enhance overall cybersecurity strategies and awareness efforts?" },
                        { name: "reportingCulture", label: "Are there initiatives in place to promote a culture of proactive reporting and cybersecurity vigilance among employees?" },
                        { name: "recognitionForReporting", label: "Does the organization recognize or reward employees for identifying and reporting potential security threats?" },
                        { name: "emphasisOnReporting", label: "How is the importance of incident reporting emphasized within the organization's overall cybersecurity training and awareness programs?" },
                        { name: "automatedSystems", label: "Are there automated systems in place to assist in the reporting and initial analysis of suspicious emails (e.g., phishing detection tools)?" },
                        { name: "techStreamliningReporting", label: "How does technology aid in streamlining the reporting process and reducing the burden on employees?" },
                        { name: "futureTechEnhancements", label: "Are there plans to enhance reporting capabilities with new technologies or integrations to improve detection and response times?" },
                        { name: "communicationStrategy", label: "Is there a clear communication strategy to inform employees about the outcomes of their reports and the importance of their role in cybersecurity?" },
                        { name: "employeeFeedbackOnProcess", label: "Are there opportunities for employees to provide feedback on the reporting process and suggest improvements?" },
                        { name: "transparencyInReporting", label: "How does the organization ensure transparency in its handling of reported incidents, while maintaining necessary confidentiality and security?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "reportingChannels" || question.name === "reportingProcessClarity" || question.name === "reportingReminders" || question.name === "caseStudies" || question.name === "incidentHandlingProcess" || question.name === "incidentResponseTime" || question.name === "employeeFeedback" || question.name === "effectivenessMetrics" || question.name === "reviewAuditProcess" || question.name === "encourageReporting" || question.name === "integrationWithSecurity" || question.name === "escalationProtocols" || question.name === "useOfIncidentData" || question.name === "recognitionForReporting" || question.name === "emphasisOnReporting" || question.name === "techStreamliningReporting" || question.name === "futureTechEnhancements" || question.name === "communicationStrategy" || question.name === "employeeFeedbackOnProcess" || question.name === "transparencyInReporting" ? (
                                    <textarea
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange}
                                        /> No
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default IncidentReportingPage;