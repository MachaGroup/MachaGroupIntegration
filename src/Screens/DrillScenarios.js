import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Corrected import
import { getFunctions, httpsCallable } from 'firebase/functions'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

function DrillSceneriosFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDrillSceneriosImage = httpsCallable(functions, 'uploadDrillSceneriosImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenerios', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenerios', buildingId);
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
                const uploadResult = await uploadDrillSceneriosImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Scenerios', buildingId);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Drill Scenarios Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Drill Scenarios Assessment</h2>
                        {[
                            { name: "conductedLockdownDrills", label: "How often are lockdown drills conducted within the facility?", type: "text" },
                            { name: "Regular Drill Schedule", label: "Are lockdown drills scheduled regularly to ensure all occupants are familiar with lockdown procedures?" },
                            { name: "Drill Timing Variability", label: "Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?" },
                            { name: "Initiation Protocol", label: "Is there a protocol for initiating lockdown drills, including how and when occupants are notified?" },
                            { name: "Notification Methods Testing", label: "Are notification methods tested during drills to ensure timely dissemination of lockdown alerts?" },
                            { name: "Absent Individuals System", label: "Is there a system in place to account for individuals who may not be present during scheduled drills?" },
                            { name: "Scenario Planning", label: "Are lockdown drill scenarios carefully planned and communicated to participants in advance?" },
                            { name: "Simulated Threat Scenarios", label: "Do scenarios include simulated intruder situations, as well as other potential threats that may require a lockdown response?" },
                            { name: "Realistic Scenario Design", label: "Are scenarios designed to be realistic while considering the safety and well-being of participants?" },
                            { name: "Procedure Communication", label: "Are lockdown procedures clearly defined and communicated to all occupants?" },
                            { name: "Occupant Specific Actions", label: "Do drills include specific actions to be taken by occupants, such as securing doors, barricading entry points, and seeking shelter in safe areas?" },
                            { name: "Scenario Simulation Variety", label: "Are drills conducted to simulate different scenarios, such as intruders in various locations or multiple threats simultaneously?" },
                            { name: "Coordination Protocol", label: "Is there a protocol for communication and coordination between occupants, staff members, and security personnel during lockdown drills?" },
                            { name: "Communication Systems Test", label: "Are communication systems, such as two-way radios or intercoms, tested during drills to facilitate coordination efforts?" },
                            { name: "Designated Coordinators", label: "Are there designated individuals responsible for coordinating responses and providing updates during lockdown drills?" },
                            { name: "Occupant Accountability Process", label: "Is there a process for accounting for all occupants during lockdown drills?" },
                            { name: "Accountability Roles Assigned", label: "Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?" },
                            { name: "Participants Feedback Collection", label: "Is feedback gathered from participants after drills to identify any issues or concerns with procedures?" },
                            { name: "Effectiveness Evaluation", label: "Is there a mechanism for evaluating the effectiveness of lockdown drills and identifying areas for improvement?" },
                            { name: "Debriefing Sessions", label: "Are debriefing sessions held after drills to review performance and discuss lessons learned?" },
                            { name: "Implementation of Recommendations", label: "Are recommendations from drill evaluations implemented to enhance lockdown preparedness and response procedures?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.type === "text" ? (
                                        <input
                                            type="text"
                                            name={question.name}
                                            placeholder={question.name === "conductedLockdownDrills" ? "How often" : question.name === "initiationProtocol" ? "Describe the protocol" : question.name === "absentSystem" ? "Describe the system" : question.name === "coordinationProtocol" ? "Describe the protocol" : question.name === "designatedIndividuals" ? "List the individuals responsible" : question.name === "accountingProcess" ? "Describe the process" : question.name === "accountabilityRoles" ? "List the member's assigned roles" : question.name === "effectivenessEvaluationMechanism" ? "Describe the mechanism" : ""}
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
                                                placeholder="Comment (Optional)"
                                                value={formData[`${question.name}-comment`] || ''}
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
        </div>
    );
}

export default DrillSceneriosFormPage;