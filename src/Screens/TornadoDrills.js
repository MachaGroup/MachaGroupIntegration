import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function TornadoDrillsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadTornadoDrillsImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);
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
                <h1>Tornado Drills Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Tornado Drills</h2>
                    {[
                        { name: "conductedTornadoDrills", label: "How often are tornado drills conducted within the facility?" },
                        { name: "Drill Scheduling Regularity", label: "Are tornado drills scheduled regularly to ensure all occupants are familiar with tornado procedures?" },
                        { name: "Drill Timing Variability", label: "Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?" },
                        { name: "Drill Initiation Protocol", label: "Is there a protocol for initiating tornado drills, including how and when occupants are notified?" },
                        { name: "Notification Method Testing", label: "Are notification methods tested during drills to ensure timely dissemination of tornado warnings?" },
                        { name: "Absent Individuals System", label: "Is there a system in place to account for individuals who may not be present during scheduled drills?" },
                        { name: "Defined Drill Procedures", label: "Are tornado drill procedures clearly defined and communicated to all occupants?" },
                        { name: "Occupant Action Procedures", label: "Do drills include specific actions to be taken by occupants, such as seeking shelter in designated areas or following evacuation routes?" },
                        { name: "Scenario Simulation Drills", label: "Are drills conducted to simulate different scenarios, such as daytime vs. nighttime, or varying severity levels of tornadoes?" },
                        { name: "Shelter Area Marking", label: "Are designated tornado shelter areas identified and clearly marked throughout the facility?" },
                        { name: "Shelter Access Knowledge", label: "Do occupants know how to access shelter areas quickly and safely during tornado drills?" },
                        { name: "Mobility Shelter Options", label: "Are there alternative sheltering options available for individuals with mobility limitations or disabilities?" },
                        { name: "Occupant Accountability Process", label: "Is there a process for accounting for all occupants during tornado drills?" },
                        { name: "Assigned Staff Roles", label: "Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?" },
                        { name: "Participant Feedback Gathering", label: "Is feedback gathered from participants after drills to identify any issues or concerns with procedures?" },
                        { name: "Drill Evaluation Mechanism", label: "Is there a mechanism for evaluating the effectiveness of tornado drills and identifying areas for improvement?" },
                        { name: "Post-Drill Debriefing", label: "Are debriefing sessions held after drills to review performance and discuss lessons learned?" },
                        { name: "Evaluation Recommendations Implementation", label: "Are recommendations from drill evaluations implemented to enhance tornado preparedness and response procedures?" },
                        { name: "Drill Records Maintenance", label: "Are records maintained for all tornado drills, including dates, times, participants, and observations?" },
                        { name: "Periodic Records Review", label: "Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?" },
                        { name: "Deficiency Documentation Actions", label: "Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "Drill Scheduling Regularity" || question.name === "Drill Timing Variability" || question.name === "Drill Initiation Protocol" || question.name === "Notification Method Testing" || question.name === "Absent Individuals System" || question.name === "Defined Drill Procedures" || question.name === "Occupant Action Procedures" || question.name === "Scenario Simulation Drills" || question.name === "Shelter Area Marking" || question.name === "Shelter Access Knowledge" || question.name === "Mobility Shelter Options" || question.name === "Occupant Accountability Process" || question.name === "Assigned Staff Roles" || question.name === "Participant Feedback Gathering" || question.name === "Drill Evaluation Mechanism" || question.name === "Post-Drill Debriefing" || question.name === "Evaluation Recommendations Implementation" || question.name === "Drill Records Maintenance" || question.name === "Periodic Records Review" || question.name === "Deficiency Documentation Actions" ? (
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

                                </div>
                                <div>
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

export default TornadoDrillsFormPage;