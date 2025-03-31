import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ActiveShooterDrillsWithPolicePage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadActiveShooterDrillsWithPoliceImage');


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
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db, 'forms', 'Community Partnership', 'Active Shooter Drills with Police', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
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
                    const formDocRef = doc(db, 'forms', 'Community Partnership', 'Active Shooter Drills with Police', buildingId);
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
        navigate(-1); // Just navigate back
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
            const formDocRef = doc(db, 'forms', 'Community Partnership', 'Active Shooter Drills with Police', buildingId);
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
            <h1>Active Shooter Drills with Police</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>6.1.2.1.1. Active Shooter Drills with Police</h2>
                {[
                    { name: "collaborationObjectives", label: "What are the objectives and goals of conducting active shooter drills in collaboration with law enforcement?" },
                    { name: "frequentlyConductedDrills", label: "How frequently are active shooter drills conducted, and what factors determine the schedule?" },
                    { name: "staffRoles", label: "What roles do school staff and law enforcement play during these drills, and how are these roles communicated?" },
                    { name: "evaluatedDrillsOutcomes", label: "How are the outcomes and effectiveness of the active shooter drills evaluated after completion?" },
                    { name: "psychologicalImpacts", label: "What measures are in place to address psychological impacts on students and staff participating in these drills?" }
                ].map((question, index) => (
                    <div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                            <input
                                type="text"
                                name={question.name}
                                value={formData[question.name] || ''}
                                onChange={handleChange}
                            />
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

export default ActiveShooterDrillsWithPolicePage;
