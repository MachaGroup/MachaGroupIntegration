import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DataProtectionImpactAssessmentsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDataProtectionImpactAssessmentsFormPageImage = httpsCallable(functions, 'uploadDataProtectionImpactAssessmentsFormPageImage');

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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Protection Impact Assessments');
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
                const formsRef = collection(db, 'forms/Policy and Compliance/Data Protection Impact Assessments');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Policy and Compliance/Data Protection Impact Assessments', docId);
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Data Protection Impact Assessments');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Policy and Compliance/Data Protection Impact Assessments', docId);
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
                <h1>5.2.1.2.1 Data Protection Impact Assessments (DPIA) Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.2.1.2.1 Data Protection Impact Assessments (DPIA)</h2>
                    {[
                        { name: "conductingProcess", label: "5.2.1.2.1.1. What is the process for conducting Data Protection Impact Assessments (DPIAs) within your organization (e.g., step-by-step methodology)?", type: "text", securityGatesFormat: true },
                        { name: "overseeingDPIAs", label: "5.2.1.2.1.2. Who is responsible for initiating and overseeing DPIAs (e.g., Data Protection Officer, compliance team)?", type: "text", securityGatesFormat: true },
                        { name: "documentedResults", label: "5.2.1.2.1.3. How are the results of a DPIA documented and communicated to relevant stakeholders?", type: "text", securityGatesFormat: true },
                        { name: "identifyingRisks", label: "5.2.1.2.1.4. How does your organization identify and assess risks associated with personal data processing activities (e.g., risk assessment frameworks, threat modeling)?", type: "text", securityGatesFormat: true },
                        { name: "evaluatingRisks", label: "5.2.1.2.1.5. What criteria are used to evaluate the potential impact of these risks on individuals' privacy and data protection (e.g., severity of impact, likelihood of occurrence)?", type: "text", securityGatesFormat: true },
                        { name: "mitigationStrategies", label: "5.2.1.2.1.6. How are risk mitigation strategies developed and implemented based on the DPIA findings?", type: "text", securityGatesFormat: true },
                        { name: "stakeholderInvolvement", label: "5.2.1.2.1.7. How are stakeholders involved in the DPIA process (e.g., consultation with affected individuals, engagement with legal or compliance experts)?", type: "text", securityGatesFormat: true },
                        { name: "gatheringFeedback", label: "5.2.1.2.1.8. What methods are used to gather feedback from stakeholders and incorporate it into the DPIA findings (e.g., surveys, interviews)?", type: "text", securityGatesFormat: true },
                        { name: "informingStakeholders", label: "5.2.1.2.1.9. How are stakeholders informed about the outcomes of the DPIA and any actions taken as a result?", type: "text", securityGatesFormat: true },
                        { name: "integratedPlanning", label: "5.2.1.2.1.10. How are DPIAs integrated into the project planning and development lifecycle (e.g., early identification of data protection requirements, incorporation into project milestones)?", type: "text", securityGatesFormat: true },
                        { name: "addressedRecommendations", label: "5.2.1.2.1.11. What steps are taken to ensure that DPIA recommendations are addressed during the implementation of new projects or systems?", type: "text", securityGatesFormat: true },
                        { name: "monitoredRecommendations", label: "5.2.1.2.1.12. How is compliance with DPIA recommendations monitored and enforced throughout the project lifecycle?", type: "text", securityGatesFormat: true },
                        { name: "requiredDocumentation", label: "5.2.1.2.1.13. What documentation is required for a DPIA, and how is it maintained (e.g., assessment reports, risk mitigation plans)?", type: "text", securityGatesFormat: true },
                        { name: "storedRecords", label: "5.2.1.2.1.14. How are DPIA records stored and protected to ensure they are accessible and secure (e.g., digital records, physical storage)?", type: "text", securityGatesFormat: true },
                        { name: "reviewingDocumentation", label: "5.2.1.2.1.15. What procedures are in place for reviewing and updating DPIA documentation as needed?", type: "text", securityGatesFormat: true },
                        { name: "reviewedDPIAs", label: "5.2.1.2.1.16. How often are DPIAs reviewed and updated to reflect changes in data processing activities or regulatory requirements (e.g., annual reviews, periodic audits)?", type: "text", securityGatesFormat: true },
                        { name: "monitoringEffectiveness", label: "5.2.1.2.1.17. What mechanisms are in place to monitor the effectiveness of DPIA measures and their impact on data protection (e.g., performance metrics, feedback loops)?", type: "text", securityGatesFormat: true },
                        { name: "lessonsLearned", label: "5.2.1.2.1.18. How are lessons learned from DPIA reviews used to improve future assessments and data protection practices?", type: "text", securityGatesFormat: true },
                        { name: "relatedRequirements", label: "5.2.1.2.1.19. How does your organization ensure compliance with GDPR requirements related to DPIAs (e.g., adherence to Article 35, documentation requirements)?", type: "text", securityGatesFormat: true },
                        { name: "addressingIssues", label: "5.2.1.2.1.20. What steps are taken to address any non-compliance issues identified during the DPIA process?", type: "text", securityGatesFormat: true },
                        { name: "incorporatingChanges", label: "5.2.1.2.1.21. How are changes in GDPR regulations or guidance incorporated into your organization's DPIA practices?", type: "text", securityGatesFormat: true },
                        { name: "staffTraining", label: "5.2.1.2.1.22. What training is provided to staff involved in conducting or overseeing DPIAs (e.g., data protection principles, assessment techniques)?", type: "text", securityGatesFormat: true },
                        { name: "maintainingAwareness", label: "5.2.1.2.1.23. How is staff awareness of DPIA requirements and their role in the process maintained and updated?", type: "text", securityGatesFormat: true },
                        { name: "supportResources", label: "5.2.1.2.1.24. Are there resources available to support staff in conducting effective DPIAs (e.g., guidelines, templates)?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "involvingVendors", label: "5.2.1.2.1.25. How are third-party vendors or partners involved in the DPIA process, and what is their role in ensuring data protection (e.g., third-party assessments, contracts)?", type: "text", securityGatesFormat: true },
                        { name: "evaluatingThirdPartyRisks", label: "5.2.1.2.1.26. What procedures are in place to evaluate and manage risks associated with third-party data processing activities?", type: "text", securityGatesFormat: true },
                        { name: "ensuringCompliance", label: "5.2.1.2.1.27. How is compliance with DPIA requirements ensured when working with external parties?", type: "text", securityGatesFormat: true },
                        { name: "potentialImpacts", label: "5.2.1.2.1.28. How are the potential impacts on data subjects considered and addressed during the DPIA process (e.g., data minimization, transparency)?", type: "text", securityGatesFormat: true },
                        { name: "protectingSubjects", label: "5.2.1.2.1.29. What measures are in place to inform and protect data subjects based on DPIA findings (e.g., privacy notices, consent mechanisms)?", type: "text", securityGatesFormat: true },
                        { name: "improvingPractices", label: "5.2.1.2.1.30. How is feedback from data subjects used to improve DPIA practices and data protection measures?", type: "text", securityGatesFormat: true },
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

export default DataProtectionImpactAssessmentsFormPage;