import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Correct imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

function EmergencyCommunicationTrainingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEmergencyCommunicationTrainingImage = httpsCallable(functions, 'uploadEmergencyCommunicationTrainingImage');
    const storage = getStorage();

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [image, setImage] = useState(null);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication Training', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication Training', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
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
                const uploadResult = await uploadEmergencyCommunicationTrainingImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication Training', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }

        if (image) {
            const imageRef = ref(storage, `images/EmergencyCommunicationTraining/${buildingId}/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    setImageUploadError(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        setFormData((prevData) => ({
                            ...prevData,
                            imageUrl: downloadURL,
                        }));
                    });
                }
            );
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
                <h1>Emergency Communication Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Emergency Communication Training Assessment</h2>
                    {[
                        { name: "Training Programs Exist", label: "Are formal training programs established to provide staff members with the necessary knowledge and skills for effective emergency communication?" },
                        { name: "Training Content Scope", label: "Do training programs encompass various aspects of emergency communication, including procedures, protocols, equipment operation, and communication strategies?" },
                        { name: "EmergencyCommunicationTrainingSessions", label: "How frequently are emergency communication training sessions conducted for staff members?" },
                        { name: "Training Schedule Set", label: "Is there a schedule or calendar for recurring training sessions, and are sessions held at regular intervals throughout the year?" },
                        { name: "Drills Included", label: "Do emergency communication training programs incorporate practical exercises, drills, or simulations to simulate real-world emergency scenarios?" },
                        { name: "Drill Effectiveness", label: "Are communication drills designed to assess staff members' ability to effectively communicate critical information, follow established protocols, and coordinate response efforts?" },
                        { name: "Scenario Variety", label: "Are training scenarios diversified to cover a wide range of emergency situations, including natural disasters, security incidents, medical emergencies, and other relevant scenarios?" },
                        { name: "Scenario Complexity", label: "Do scenarios vary in complexity and severity to challenge staff members and enhance their preparedness for different types of emergencies?" },
                        { name: "Role-Specific Focus", label: "Are training sessions tailored to address the specific communication needs and responsibilities of different staff roles or departments?" },
                        { name: "Role Preparedness", label: "Are staff members trained on their roles and responsibilities in initiating, receiving, and relaying emergency communication messages during various emergency scenarios?" },
                        { name: "Feedback Provided", label: "Are feedback mechanisms incorporated into training sessions to provide staff members with constructive feedback on their performance during communication drills?" },
                        { name: "Debrief Sessions", label: "Are debriefing sessions conducted after drills to review strengths, areas for improvement, and lessons learned, with recommendations for enhancement discussed and documented?" },
                        { name: "Plan Integration", label: "Are emergency communication training programs aligned with broader emergency preparedness and response plans and protocols?" },
                        { name: "Plan Reinforcement", label: "Are training scenarios and exercises designed to reinforce and validate emergency communication procedures outlined in emergency plans?" },
                        { name: "Training Records", label: "Are records maintained to document staff participation in emergency communication training sessions, including attendance, training materials used, and performance evaluations?" },
                        { name: "Records Accessible", label: "Are training records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "EmergencyCommunicationTrainingSessions" || question.name === "trainingProgramsExist" ? (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={question.name === "EmergencyCommunicationTrainingSessions" ? "How frequent" : "Describe the training programs"}
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
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange}></textarea>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default EmergencyCommunicationTrainingFormPage;