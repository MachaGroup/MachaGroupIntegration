import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StationedGuardsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStationedGuardsPageImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
                <h1>Stationed Guards Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Guard Presence:</h2>
                    {[
                        { name: "guards-stationed", label: "Are security guards stationed at designated entrances during all operational hours?" },
                        { name: "continuous-coverage", label: "Is there continuous coverage to ensure that entrances are monitored at all times?" },
                        { name: "backup-personnel", label: "Are there backup personnel or procedures in place to cover breaks or emergencies?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Qualifications and Training:</h2>
                    {[
                        { name: "training-security-procedures", label: "Are stationed guards properly trained in security procedures, emergency response protocols, and customer service?" },
                        { name: "certifications", label: "Do they possess necessary certifications or licenses required for security personnel?" },
                        { name: "conflict-resolution", label: "Are guards trained in conflict resolution techniques to handle various situations professionally and effectively?" },
                    ].map((question, index) => (
                        <><div key={index + 3} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Observation and Vigilance:</h2>
                    {[
                        { name: "monitor-entrances", label: "Do stationed guards actively monitor entrances for unauthorized access, suspicious behavior, or security breaches?" },
                        { name: "recognize-threats", label: "Are they trained to recognize and respond to potential threats, including individuals attempting to bypass security measures?" },
                        { name: "communication-devices", label: "Are guards equipped with communication devices to alert response teams or authorities in case of emergencies?" },
                    ].map((question, index) => (
                        <><div key={index + 6} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Access Control:</h2>
                    {[
                        { name: "enforce-access-control", label: "Do stationed guards enforce access control policies, verifying credentials and authorizing entry for authorized personnel?" },
                        { name: "challenge-unauthorized", label: "Are they trained to challenge individuals without proper identification or authorization?" },
                        { name: "inspection-conduct", label: "Do guards conduct thorough inspections of bags, packages, or vehicles entering the premises?" },
                    ].map((question, index) => (
                        <><div key={index + 9} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Customer Assistance and Interaction:</h2>
                    {[
                        { name: "assist-customers", label: "Are stationed guards trained to provide assistance to visitors, employees, and contractors entering the premises?" },
                        { name: "professional-greeting", label: "Do they greet individuals in a professional and courteous manner while maintaining security awareness?" },
                        { name: "handle-inquiries", label: "Are guards trained to handle inquiries, provide directions, and offer assistance as needed?" },
                    ].map((question, index) => (
                        <><div key={index + 12} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Emergency Response Preparedness:</h2>
                    {[
                        { name: "emergency-response", label: "Are stationed guards trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?" },
                        { name: "know-evacuation", label: "Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?" },
                        { name: "first-aid", label: "Are guards equipped with necessary first aid supplies or emergency response equipment?" },
                    ].map((question, index) => (
                        <><div key={index + 15} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Communication and Coordination:</h2>
                    {[
                        { name: "effective-communication", label: "Is there effective communication between stationed guards and other security personnel, as well as with management and staff?" },
                        { name: "coordinate-response", label: "Are guards trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?" },
                        { name: "centralized-communication", label: "Is there a centralized communication system or protocol for relaying information and coordinating responses?" },
                    ].map((question, index) => (
                        <><div key={index + 18} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

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

export default StationedGuardsPage;