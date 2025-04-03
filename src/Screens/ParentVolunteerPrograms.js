import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ParentVolunteerProgramsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadParentVolunteerProgramsImage = httpsCallable(functions, 'uploadParentVolunteerProgramsImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Volunteer Programs', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Volunteer Programs', buildingId);
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
                const uploadResult = await uploadParentVolunteerProgramsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Volunteer Programs', buildingId);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Parent Volunteer Programs Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Program Structure and Organization:</h2>
                        {[
                            { name: "programStructureAndOrganization", label: "How are parent volunteer programs, particularly those focused on emergency response or safety, structured and organized within the school or educational institution?" },
                            { name: "rolesAndResponsibilities", label: "What roles and responsibilities do parent volunteers assume within emergency response teams or safety committees, and how are these roles defined and communicated?" },
                            { name: "programsIntegratedWithPlans", label: "Are parent volunteer programs integrated into broader school safety plans, emergency protocols, or community engagement strategies?" },
                            { name: "parentRecruitmentProcess", label: "How are parents recruited or solicited to participate in volunteer programs related to emergency response or safety initiatives?" },
                            { name: "selectionCriteriaForVolunteers", label: "What criteria or qualifications are used to select parent volunteers for specific roles or responsibilities, such as training, availability, skills, or expertise?" },
                            { name: "volunteerTrainingProvided", label: "Are parent volunteers provided with training, orientation, or resources to prepare them for their roles and responsibilities within emergency response teams or safety committees?" },
                            { name: "collaborationWithStaff", label: "How do parent volunteer programs collaborate with school staff, administrators, or safety personnel to support and enhance school safety efforts?" },
                            { name: "successfulPartnershipsExamples", label: "Can you provide examples of successful partnerships or joint initiatives between parent volunteer programs and school stakeholders in addressing safety concerns, implementing safety protocols, or organizing emergency drills?" },
                            { name: "volunteerContributionsToSafety", label: "In what ways do parent volunteers contribute to the development, implementation, or evaluation of school safety policies, procedures, or initiatives?" },
                            { name: "specificRolesInEmergencies", label: "What specific roles or functions do parent volunteers fulfill within emergency response teams or safety committees during various types of emergencies or crisis situations?" },
                            { name: "volunteerEmergencyTraining", label: "How are parent volunteers trained and prepared to effectively respond to emergencies, assist with evacuation procedures, provide first aid support, or facilitate communication and coordination efforts?" },
                            { name: "integrationWithEmergencyPlans", label: "Are parent volunteers integrated into broader emergency response plans, incident command structures, or communication protocols to ensure a coordinated and effective response?" },
                            { name: "communityEngagementEfforts", label: "How do parent volunteer programs engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?" },
                            { name: "collaborativeProjectsExamples", label: "Can you provide examples of collaborative projects, events, or campaigns led by parent volunteers that have extended the reach and impact of safety education beyond the school campus?" },
                            { name: "volunteersMobilizingCommunity", label: "In what ways do parent volunteers leverage their networks, expertise, or resources to mobilize collective action, build community resilience, and foster a culture of safety within the school community?" }
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "programsIntegratedWithPlans" || question.name === "volunteerTrainingProvided" || question.name === "integrationWithEmergencyPlans" ? (
                                        <>
                                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        </>
                                    ) : (
                                        <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                    )}
                                </div>
                            </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default ParentVolunteerProgramsFormPage;