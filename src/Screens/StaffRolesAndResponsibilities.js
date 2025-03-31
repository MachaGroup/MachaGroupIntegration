import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StaffRolesAndResponsibilitiesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStaffRoles&ResponsibilitiesImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Staff Roles and Responsibilities', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Staff Roles and Responsibilities', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Staff Roles and Responsibilities', buildingId);
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
                <h1>Staff Roles and Responsibilities Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Staff Roles and Responsibilities</h2>
                    {[
                        { name: "Role Specificity", label: "Are staff members assigned specific roles and responsibilities during drills, such as evacuation team leaders, floor wardens, or first aid responders?" },
                        { name: "Role Communication", label: "Are these assignments communicated to staff members in advance, along with clear expectations for their roles and duties?" },
                        { name: "Role Training", label: "Are staff members trained on their assigned roles and responsibilities before participating in drills?" },
                        { name: "Training Materials", label: "Are training materials provided to educate staff members on their duties, procedures, and communication protocols during drills?" },
                        { name: "Practice Feedback", label: "Are staff members given opportunities to practice their roles and receive feedback on their performance?" },
                        { name: "Coordination System", label: "Is there a system in place for coordinating the actions of staff members during drills, including communication channels and protocols?" },
                        { name: "Effective Communication", label: "Are staff members instructed on how to communicate effectively with each other, as well as with occupants, emergency responders, and management personnel?" },
                        { name: "Leadership Oversight", label: "Are designated leaders or coordinators appointed to oversee the execution of staff roles and facilitate communication during drills?" },
                        { name: "Performance Monitoring", label: "Is there a process for monitoring the performance of staff members in their assigned roles during drills?" },
                        { name: "Observer Assessment", label: "Are supervisors or observers tasked with assessing staff members' adherence to procedures, teamwork, and effectiveness in carrying out their responsibilities?" },
                        { name: "Feedback Process", label: "Is feedback provided to staff members after drills to recognize commendable efforts and identify areas for improvement?" },
                        { name: "Adaptability Training", label: "Are staff members prepared to adapt to changing circumstances or unexpected events during drills?" },
                        { name: "Contingency Plans", label: "Are contingency plans established to address deviations from standard procedures or the need for improvised responses?" },
                        { name: "Creative Problem-Solving", label: "Are staff members encouraged to exercise initiative and creativity in problem-solving and decision-making during drills?" },
                        { name: "Plan Alignment", label: "Are staff roles and responsibilities aligned with the broader emergency response plans and protocols of the facility?" },
                        { name: "Framework Understanding", label: "Do staff members understand how their roles fit into the overall emergency response framework and support the safety and well-being of occupants?" },
                        { name: "Role Updates", label: "Are staff roles regularly reviewed and updated in conjunction with changes to emergency response plans or organizational structure?" },
                        { name: "Record Maintenance", label: "Are records maintained to document staff assignments, actions, and performance during drills?" },
                        { name: "Drill Review", label: "Are drill records reviewed periodically to assess the effectiveness of staff roles and identify opportunities for enhancement?" },
                        { name: "Evaluation Recommendations", label: "Are recommendations from drill evaluations used to refine staff roles and responsibilities, as well as associated training and preparation efforts?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="radio"
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> Yes
                                <input
                                    type="radio"
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> No
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                />
                            </div>
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

export default StaffRolesAndResponsibilitiesFormPage;