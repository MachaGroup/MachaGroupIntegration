import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StudentPrivacyRightsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStudentPrivacyRightsImage');

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
                const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Privacy Rights', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Privacy Rights', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Student Privacy Rights', buildingId);
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
                <h1>Student Privacy Rights Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Student Privacy Rights</h2>
                    {[
                        { name: "requestProcedures", label: "What procedures are in place for students and parents to request access to educational records?" },
                        { name: "verifiedRecords", label: "How is access to educational records verified to ensure that only authorized individuals receive information?" },
                        { name: "submittingRequests", label: "Are there specific forms or channels for submitting requests to access records?" },
                        { name: "reviewProcess", label: "What process is available for students and parents to review and request amendments to educational records?" },
                        { name: "documentedRequests", label: "How are requests for amendments documented and processed?" },
                        { name: "approvingRequests", label: "What are the criteria for approving or denying amendment requests, and how are decisions communicated?" },
                        { name: "disclosedConsent", label: "Under what circumstances can educational records be disclosed without consent, and how is this information communicated to students and parents?" },
                        { name: "handlingRequests", label: "What procedures are in place to handle requests for disclosure of educational records from third parties, such as law enforcement or other institutions?" },
                        { name: "recordedDisclosures", label: "How are disclosures recorded and tracked to ensure compliance with FERPA regulations?" },
                        { name: "protectingRecords", label: "What measures are in place to protect the confidentiality and security of educational records?" },
                        { name: "controlledRecords", label: "How is access to educational records controlled and monitored to prevent unauthorized access or breaches?" },
                        { name: "regularAudits", label: "Are there regular audits or assessments of data security practices related to educational records?" },
                        { name: "parentsRights", label: "How are parents informed about their rights to access their child's educational records?" },
                        { name: "grantProcedures", label: "What procedures are followed to grant or deny parental access requests in accordance with FERPA requirements?" },
                        { name: "accessLimitations", label: "Are there any limitations on parental access, and how are these limitations communicated?" },
                        { name: "studentConsent", label: "What procedures are in place to obtain student consent for the release of educational records when required?" },
                        { name: "documentedConsent", label: "How is consent documented, and what are the procedures for revoking consent?" },
                        { name: "requirementExceptions", label: "Are there any exceptions to the requirement for student consent, and how are these exceptions managed?" },
                        { name: "staffTraining", label: "What training is provided to staff regarding FERPA requirements and student privacy rights?" },
                        { name: "maintainedAwareness", label: "How is awareness maintained among staff about the importance of protecting student privacy and handling educational records appropriately?" },
                        { name: "regulationGuidelines", label: "Are there resources or guidelines available to assist staff in understanding and complying with FERPA regulations?" },
                        { name: "filingProcess", label: "What process is available for students and parents to file complaints regarding violations of privacy rights or FERPA compliance issues?" },
                        { name: "investigatedComplaints", label: "How are complaints investigated, and what procedures are followed to resolve them?" },
                        { name: "trackingIssues", label: "What mechanisms are in place to track and address recurring issues or concerns related to student privacy?" },
                        { name: "reviewedPolicies", label: "How often are policies and procedures related to FERPA compliance reviewed and updated?" },
                        { name: "updateProcesses", label: "What processes are used to ensure that updates reflect changes in regulations or best practices?" },
                        { name: "communicatedChanges", label: "How are changes communicated to students, parents, and staff?" },
                        { name: "documentingCompliance", label: "What records are maintained to document compliance with FERPA, and how are these records managed?" },
                        { name: "retainedRecords", label: "How long are records related to student privacy rights and FERPA compliance retained?" },
                        { name: "storingProcedures", label: "What procedures are in place for securely storing and disposing of records?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "submittingRequests" || question.name === "regularAudits" || question.name === "accessLimitations" || question.name === "requirementExceptions" || question.name === "regulationGuidelines" ? (
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

export default StudentPrivacyRightsFormPage;