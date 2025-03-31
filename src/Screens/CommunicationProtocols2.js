import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CommunicationProtocols2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCommunicationProtocols2FormPageImage = httpsCallable(functions, 'uploadCommunicationProtocols2FormPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        } else {
            fetchFormData();
        }
    }, [buildingId, navigate]);

    const fetchFormData = async () => {
        setLoading(true);
        try {
            const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2');
            const buildingRef = doc(db, 'Buildings', buildingId);
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error fetching form data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (buildingId && formData) {
            const saveFormData = async () => {
                try {
                    const buildingRef = doc(db, 'Buildings', buildingId);
                    const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2');
                    const q = query(formsRef, where('building', '==', buildingRef));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        await addDoc(formsRef, { building: buildingRef, formData: formData });
                    } else {
                        const docId = querySnapshot.docs[0].id;
                        await doc(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2', docId);
                        await addDoc(formsRef, { building: buildingRef, formData: formData });
                    }
                } catch (error) {
                    console.error('Error saving form data:', error);
                }
            };
            const timerId = setTimeout(saveFormData, 1000); // Autosave every second

            return () => clearTimeout(timerId); // Cleanup on unmount/update
        }
    }, [formData, buildingId, db]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = async () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>7.2.1.1.2. Communication Protocols</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>7.2.1.1.2. Communication Protocols:</h2>
                    {[
                        { name: "communicationMethods", label: "What communication methods are established for the Emergency Response Team during an incident?", type: "text" },
                        { name: "disseminatedNotifications", label: "How are emergency notifications disseminated to staff, students, and parents in a crisis situation?", type: "text" },
                        { name: "communicationProcedures", label: "What procedures are in place to ensure accurate and timely communication with external agencies (e.g., police, fire department)?", type: "text" },
                        { name: "incidentDocumentation", label: "How is information about the incident documented and shared with relevant stakeholders after an emergency?", type: "text" },
                        { name: "backupCommunicationSystems", label: "Are there backup communication systems in place if primary methods fail? If so, what are they?", type: "text" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="text"
                                    name={question.name}
                                    placeholder={question.label}
                                    onChange={handleChange}
                                    value={formData[question.name] || ''}
                                />
                                
                            </div>
                            <textarea
                                    className='comment-box'
                                    name={`${question.name}Comment`}
                                    placeholder="Comment (Optional)"
                                    onChange={handleChange}
                                    value={formData[`${question.name}Comment`] || ''}
                                ></textarea>
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default CommunicationProtocols2FormPage;