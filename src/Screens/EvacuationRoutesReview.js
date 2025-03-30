import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function EvacuationRoutesReviewFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadEvacuationRoutesReviewFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Routes Review', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Routes Review', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Routes Review', buildingId);
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
                <h1>Evacuation Routes Review Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Evacuation Routes Review Assessment</h2>
                    {[
                        { name: "reviewedEvacuationRoutes", label: "How often are evacuation routes reviewed and updated within the facility?" },
                        { name: "Regular Interval", label: "Are reviews conducted at regular intervals to ensure that evacuation routes remain current and effective?" },
                        { name: "Schedule Procedure", label: "Is there a schedule or procedure in place for conducting routine reviews of evacuation routes?" },
                        { name: "structuredProcess", label: "Is there a structured process for reviewing evacuation routes, including designated personnel responsible for conducting reviews?" },
                        { name: "Comprehensive Coverage", label: "Are reviews comprehensive, covering all areas of the facility, including primary and alternative evacuation routes?" },
                        { name: "Obstacle Assessment", label: "Do reviews include assessments of signage, lighting, obstacles, and other factors that may impact the usability of evacuation routes?" },
                        { name: "Regulation Compliance", label: "Are evacuation routes reviewed to ensure compliance with relevant regulations, codes, and standards, such as building codes and fire safety regulations?" },
                        { name: "Knowledgeable Reviewers", label: "Are reviews conducted by individuals knowledgeable about regulatory requirements and best practices for evacuation route design and signage?" },
                        { name: "Disability Access", label: "Are evacuation routes reviewed to ensure accessibility for individuals with disabilities or mobility limitations?" },
                        { name: "Occupant Provisions", label: "Are there provisions in place to accommodate the needs of all occupants, including those who may require assistance during evacuations?" },
                        { name: "Sign Inspection", label: "Are evacuation route signs inspected as part of the review process to ensure they are clear, visible, and properly positioned?" },
                        { name: "Sign Updates", label: "Are signs updated or replaced as needed to maintain legibility and compliance with standards?" },
                        { name: "Wayfinding Review", label: "Are wayfinding aids, such as floor plans or maps, reviewed to ensure they accurately depict evacuation routes and assembly areas?" },
                        { name: "Plan Alignment", label: "Are evacuation routes reviewed in conjunction with broader emergency response plans to ensure alignment and consistency?" },
                        { name: "Response Integration", label: "Do reviews consider how evacuation routes integrate with other emergency preparedness and response measures, such as sheltering procedures and communication protocols?" },
                        { name: "Outcome Records", label: "Are records maintained to document the outcomes of evacuation route reviews, including any identified issues, recommended changes, and actions taken?" },
                        { name: "Accessible Records", label: "Are review records accessible to relevant stakeholders for reference and follow-up?" },
                        { name: "Trend Tracking", label: "Are review findings used to track trends, monitor compliance, and inform future updates to evacuation routes and emergency plans?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "reviewedEvacuationRoutes" || question.name === "scheduleProcedure" || question.name === "structuredProcess" || question.name === "occupantProvisions"? (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={question.name === "reviewedEvacuationRoutes" ? "How often" : question.name === "scheduleProcedure" ? "Describe the schedule or procedure" : question.name === "structuredProcess" ? "Describe the process" : "Describe the provisions"}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <>
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
                                        <input
                                            type="text"
                                            name={`${question.name}-comment`}
                                            placeholder="Additional comments"
                                            value={formData[`${question.name}-comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default EvacuationRoutesReviewFormPage;