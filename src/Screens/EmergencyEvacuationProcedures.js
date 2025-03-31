import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Correct imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EvacuationProcedures2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEvacuationProcedures2Image = httpsCallable(functions, 'uploadEvacuationProcedures2Image');
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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Evacuation Procedures', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Evacuation Procedures', buildingId);
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
                const uploadResult = await uploadEvacuationProcedures2Image({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Evacuation Procedures', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }

        if (image) {
            const imageRef = ref(storage, `images/EvacuationProcedures2/${buildingId}/${image.name}`);
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
                <h1>Evacuation Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Evacuation Procedures Assessment</h2>
                    {[
                        { name: "evacuationProceduresDevelopment", label: "How are evacuation procedures developed, documented, and communicated to staff members, students, and visitors within the school community?" },
                        { name: "evacuationPlanAssessment", label: "Are evacuation plans based on thorough assessments of building layouts, occupancy characteristics, fire protection systems, and potential hazards to ensure safe and efficient evacuation routes and assembly areas?" },
                        { name: "evacuationPlanConsiderations", label: "What considerations are given to factors such as building occupancy, accessibility requirements, special needs populations, and coordination with local emergency responders in the development of evacuation plans?" },
                        { name: "floorPlansVisibility", label: "Are floor plans and evacuation routes prominently displayed, clearly marked, and readily accessible in key locations throughout the school premises?" },
                        { name: "evacuationMapDetails", label: "Do evacuation maps include detailed floor layouts, exit locations, primary and secondary evacuation routes, assembly areas, and designated muster points for accountability and headcount purposes?" },
                        { name: "evacuationRoutesCustomization", label: "How are evacuation routes tailored to different areas of the school campus, such as classrooms, offices, gymnasiums, auditoriums, laboratories, or specialized facilities, to accommodate varying occupant loads and mobility considerations?" },
                        { name: "staffTrainingEvacuation", label: "How are staff members trained on evacuation procedures, route navigation, assembly area assignments, and roles and responsibilities during evacuation drills and real emergencies?" },
                        { name: "evacuationTrainingFrequency", label: "Are evacuation training sessions conducted regularly to familiarize staff members with evacuation routes, exit procedures, emergency equipment locations, and communication protocols?" },
                        { name: "staffReadinessMeasures", label: "What measures are in place to ensure staff members are equipped with the knowledge, skills, and confidence to lead and assist occupants during evacuations and account for individuals with special needs or mobility challenges?" },
                        { name: "drillFrequencyCriteria", label: "How frequently are evacuation drills conducted, and what criteria are used to assess the effectiveness, realism, and compliance of drill exercises with established evacuation procedures?" },
                        { name: "drillScenarioCustomization", label: "Are evacuation drills tailored to simulate different scenarios, challenges, and contingencies to test the responsiveness, coordination, and decision-making capabilities of staff members and occupants?" },
                        { name: "drillOutcomeEvaluation", label: "How are evacuation drill outcomes evaluated, debriefed, and used to identify areas for improvement, reinforce best practices, and enhance the overall readiness and resilience of the school community?" },
                        { name: "evacuationIntegration", label: "How are evacuation procedures integrated into broader emergency response plans, protocols, and coordination efforts within the school environment?" },
                        { name: "evacuationSynchronization", label: "Are evacuation procedures synchronized with other emergency response actions, such as lockdowns, sheltering, medical response, or reunification processes, to ensure a comprehensive and coordinated approach to emergency management?" },
                        { name: "evacuationCommunicationMechanisms", label: "What mechanisms are in place to communicate evacuation orders, monitor evacuation progress, and coordinate with external agencies, such as fire departments, law enforcement, or emergency management authorities, during evacuation operations?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name.endsWith("Development") || question.name.endsWith("Considerations") || question.name.endsWith("Customization") || question.name.endsWith("Measures") || question.name.endsWith("Criteria") || question.name.endsWith("Evaluation") || question.name.endsWith("Integration") || question.name.endsWith("Mechanisms") ? (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={`Describe ${question.label.toLowerCase()}`}
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
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
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

export default EvacuationProcedures2FormPage;