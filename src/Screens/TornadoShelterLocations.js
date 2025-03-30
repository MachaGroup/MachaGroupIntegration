import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function TornadoShelterLocationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadTornadoShelterLocationsImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);
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
                <h1>Tornado Shelter Locations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Tornado Shelter Locations</h2>
                    {[
                        { name: "Shelter Identified", label: "Have designated tornado shelter areas been identified throughout the facility?" },
                        { name: "Structural Soundness", label: "Are shelter areas located in structurally sound spaces that provide protection from flying debris and structural collapse?" },
                        { name: "Accessibility Check", label: "Are shelter areas easily accessible to all occupants, including individuals with disabilities or mobility limitations?" },
                        { name: "Signage Presence", label: "Are tornado shelter areas clearly marked with signage or visual indicators to guide occupants during emergencies?" },
                        { name: "Signage Directions", label: "Do signs include directions to shelter areas and instructions for seeking refuge during tornado warnings?" },
                        { name: "Shelter on Maps", label: "Are shelter locations identified on building maps and evacuation plans distributed to occupants?" },
                        { name: "Occupancy Assessment", label: "Have shelter areas been assessed to ensure they can accommodate the facility's maximum occupancy load?" },
                        { name: "Space Sufficiency", label: "Is there sufficient space within shelter areas to provide comfortable seating or standing room for occupants during extended sheltering periods?" },
                        { name: "Overcrowding Measures", label: "Have measures been taken to minimize overcrowding and facilitate orderly entry into shelter areas?" },
                        { name: "Structural Evaluation", label: "Have shelter areas been evaluated for structural integrity and resistance to tornado-force winds?" },
                        { name: "Hazard Minimization", label: "Are shelter areas located in interior spaces or reinforced areas of the building to minimize exposure to external hazards?" },
                        { name: "Safety Features", label: "Are there additional safety features in place, such as reinforced walls, sturdy furniture, or protective barriers, to enhance occupant safety?" },
                        { name: "Disability Access", label: "Are shelter areas accessible to individuals with disabilities, including those who use mobility devices or require assistance?" },
                        { name: "Accommodations Made", label: "Have accommodations been made to ensure equal access to shelter areas for all occupants, regardless of physical or cognitive abilities?" },
                        { name: "Assistance Procedures", label: "Are there designated personnel or procedures in place to assist individuals with disabilities during tornado evacuations?" },
                        { name: "Warning Protocol", label: "Is there a protocol for notifying occupants of tornado warnings and directing them to seek shelter?" },
                        { name: "Communication Systems", label: "Are communication systems, such as public address announcements or emergency notifications, used to alert occupants to tornado threats and provide instructions?" },
                        { name: "Drill Familiarity", label: "Are shelter locations included in communication materials and drills to familiarize occupants with sheltering procedures?" },
                        { name: "Inspection Regularity", label: "Are shelter areas inspected regularly to ensure they remain in good condition and free from obstructions?" },
                        { name: "Maintenance Done", label: "Is maintenance conducted to address any issues or damage that may compromise the safety and effectiveness of shelter areas?" },
                        { name: "Drill Testing", label: "Are shelter areas tested periodically during drills to verify their suitability and readiness for use during tornado emergencies?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "Shelter Identified" || question.name === "Structural Soundness" || question.name === "Accessibility Check" || question.name === "Signage Presence" || question.name === "Signage Directions" || question.name === "Shelter on Maps" || question.name === "Occupancy Assessment" || question.name === "Space Sufficiency" || question.name === "Overcrowding Measures" || question.name === "Structural Evaluation" || question.name === "Hazard Minimization" || question.name === "Safety Features" || question.name === "Disability Access" || question.name === "Accommodations Made" || question.name === "Assistance Procedures" || question.name === "Warning Protocol" || question.name === "Communication Systems" || question.name === "Drill Familiarity" || question.name === "Inspection Regularity" || question.name === "Maintenance Done" || question.name === "Drill Testing" ? (
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

export default TornadoShelterLocationsFormPage;