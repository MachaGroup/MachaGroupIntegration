import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StudentDataPrivacyPoliciesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStudentDataPrivacyPoliciesImage');

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
                const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Data Privacy Policies', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Data Privacy Policies', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
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
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Data Privacy Policies', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
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
                <h1>Student Data Privacy Policies Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Student Data Privacy Policies</h2>
                    {[
                        { name: "privacyPolicies", label: "What policies are in place to ensure the privacy and security of student data (e.g., data protection policies, FERPA compliance policies)?" },
                        { name: "developedPolicies", label: "How are these policies developed and reviewed to align with FERPA requirements and other relevant regulations?" },
                        { name: "scopePolicies", label: "What is the scope of the privacy policies in terms of the types of data covered (e.g., educational records, personal information)?" },
                        { name: "dataAccess", label: "Who has access to student data within the organization (e.g., administrators, teachers, support staff), and how is access controlled?" },
                        { name: "managingProcedures", label: "What procedures are in place to manage and review access permissions to ensure that only authorized personnel can view or handle student data?" },
                        { name: "documentedPermissions", label: "How are permissions documented and updated, particularly when staff roles or responsibilities change?" },
                        { name: "sharedData", label: "Under what circumstances can student data be shared or disclosed to third parties (e.g., parents, other educational institutions, law enforcement)?" },
                        { name: "obtainingConsent", label: "What procedures are followed to obtain consent before sharing student data, and how is consent recorded?" },
                        { name: "complyingRequirements", label: "How does the organization ensure that third parties comply with FERPA requirements when handling student data?" },
                        { name: "securityMeasures", label: "What security measures are implemented to protect student data from unauthorized access, breaches, or loss (e.g., encryption, access controls)?" },
                        { name: "securingStorage", label: "How are physical and electronic data storage methods secured to prevent unauthorized access or data breaches?" },
                        { name: "reviewingProcess", label: "What is the process for regularly reviewing and updating data security measures?" },
                        { name: "retainedData", label: "How long is student data retained, and what criteria are used to determine retention periods (e.g., educational record retention policies)?" },
                        { name: "disposalProcedures", label: "What procedures are in place for the secure disposal of student data that is no longer needed (e.g., shredding physical documents, securely deleting digital files)?" },
                        { name: "monitoredPolicies", label: "How is compliance with data retention and disposal policies monitored and enforced?" },
                        { name: "studentRights", label: "How are students and parents informed about their rights under FERPA, including the right to access and amend educational records?" },
                        { name: "requestHandling", label: "What procedures are in place for handling requests from parents or students to access or correct their records?" },
                        { name: "individualAwareness", label: "How is the organization ensuring that individuals are aware of and can exercise their rights under FERPA?" },
                        { name: "complianceTraining", label: "What training is provided to staff regarding FERPA compliance and student data privacy (e.g., regular training sessions, informational resources)?" },
                        { name: "staffAwareness", label: "How is staff awareness of FERPA requirements maintained and updated?" },
                        { name: "trainingPrograms", label: "Are there specific training programs for new staff members or those in roles with access to student data?" },
                        { name: "reportingBreaches", label: "What procedures are in place for responding to and reporting data breaches or privacy incidents involving student data?" },
                        { name: "documentingIncidents", label: "How are incidents documented and investigated, and what actions are taken to address and mitigate the impact?" },
                        { name: "notifyingIndividuals", label: "How is the organization prepared to notify affected individuals and regulatory authorities if required?" },
                        { name: "monitoringData", label: "How is compliance with student data privacy policies monitored and enforced within the organization?" },
                        { name: "auditProcesses", label: "What audit processes are in place to assess the effectiveness of privacy policies and procedures?" },
                        { name: "auditFindings", label: "How are audit findings used to improve and update privacy practices?" },
                        { name: "frequentlyReviewedPolicies", label: "How frequently are student data privacy policies reviewed and updated to reflect changes in regulations or organizational practices?" },
                        { name: "updatingPolicies", label: "What process is followed to ensure that updates to policies are communicated to relevant stakeholders?" },
                        { name: "incorporatingFeedback", label: "How does the organization incorporate feedback and lessons learned into policy revisions?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "trainingPrograms" ? (
                                <><div>
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="yes"
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange} /> Yes
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="no"
                                        checked={formData[question.name] === "no"}
                                        onChange={handleChange} /> No

                                </div><div>
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange} />
                                    </div></>
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
                            )}
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default StudentDataPrivacyPoliciesFormPage;