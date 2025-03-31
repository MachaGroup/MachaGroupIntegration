import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CurriculumIntegrationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCurriculumIntegrationFormPageImage = httpsCallable(functions, 'uploadCurriculumIntegrationFormPageImage');

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
            loadFormData();
        }
    }, [buildingId, navigate]);

    const loadFormData = async () => {
        setLoading(true);
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Curriculum Integration');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error loading form data:', error);
        } finally {
            setLoading(false);
        }
    };

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
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Personnel Training and Awareness/Curriculum Integration');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Curriculum Integration', docId);
                    await setDoc(formDocRef, {
                        building: buildingRef,
                        formData: formData,
                    }, { merge: true });
                }
                console.log('Form Data submitted successfully on back!');
                alert('Form data saved before navigating back!');
            } catch (error) {
                console.error('Error saving form data:', error);
                alert('Failed to save form data before navigating back. Some data may be lost.');
            }
        }
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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Curriculum Integration');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Curriculum Integration', docId);
                await setDoc(formDocRef, {
                    building: buildingRef,
                    formData: formData,
                }, { merge: true });
            }
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
                <h1>Curriculum Integration Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Curriculum Integration:</h2>
                    {[
                        { name: "curriculumIntegration", label: "3.2.1.1.1. How are emergency procedures integrated into the curriculum, and in which subjects or courses are they included?", type: "text", securityGatesFormat: true },
                        { name: "lessonIntegration", label: "3.2.1.1.2. Are emergency procedures incorporated into existing lessons or taught as standalone topics within the curriculum?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "ageAppropriateStrategies", label: "3.2.1.1.3. What strategies are used to ensure that emergency procedures are age-appropriate and developmentally suitable for students?", type: "text", securityGatesFormat: true },
                        { name: "procedureReinforcement", label: "3.2.1.1.4. How often are emergency procedures revisited and reinforced throughout the academic year to promote retention and readiness?", type: "text", securityGatesFormat: true },
                        { name: "instructionalMaterials", label: "3.2.1.2.1. What instructional materials are used to teach emergency procedures to students, such as textbooks, workbooks, or multimedia resources?", type: "text", securityGatesFormat: true },
                        { name: "protocolAlignment", label: "3.2.1.2.2. Are educational materials aligned with established emergency response protocols and guidelines?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "materialAdaptation", label: "3.2.1.2.3. How are instructional materials adapted to meet the diverse learning needs and preferences of students, including those with disabilities or language barriers?", type: "text", securityGatesFormat: true },
                        { name: "supplementaryResources", label: "3.2.1.2.4. Are supplementary resources available to support student learning and reinforce key concepts related to emergency preparedness?", type: "text", securityGatesFormat: true },
                        { name: "interactiveActivities", label: "3.2.1.3.1. What interactive learning activities are employed to engage students in learning about emergency procedures?", type: "text", securityGatesFormat: true },
                        { name: "simulationExercises", label: "3.2.1.3.2. Are hands-on activities, simulations, or role-playing exercises used to simulate emergency situations and practice response skills?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "techIntegration", label: "3.2.1.3.3. How are technology tools or educational games utilized to enhance student understanding and retention of emergency procedures?", type: "text", securityGatesFormat: true },
                        { name: "collaborativeLearning", label: "3.2.1.3.4. Are collaborative learning experiences or group discussions facilitated to promote peer interaction and knowledge sharing?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "assessmentMethods", label: "3.2.1.4.1. How is student comprehension and proficiency in emergency procedures assessed and evaluated?", type: "text", securityGatesFormat: true },
                        { name: "formalAssessments", label: "3.2.1.4.2. Are formal assessments, such as quizzes, tests, or performance evaluations, used to measure student learning outcomes?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "formativeAssessments", label: "3.2.1.4.3. How are formative assessment strategies, such as observations or classroom discussions, employed to gauge student understanding and skill development?", type: "text", securityGatesFormat: true },
                        { name: "assessmentFeedback", label: "3.2.1.4.4. Are assessment results used to identify areas for improvement in emergency preparedness education and inform instructional adjustments?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "parentalCommunication", label: "3.2.1.5.1. How are parents and guardians informed about the emergency procedures being taught to their children?", type: "text", securityGatesFormat: true },
                        { name: "parentalResources", label: "3.2.1.5.2. Are resources provided to parents and guardians to support reinforcement of emergency preparedness concepts at home?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "feedbackChannels", label: "3.2.1.5.3. What communication channels are used to solicit feedback and input from parents and guardians regarding their children's learning experiences related to emergency procedures?", type: "text", securityGatesFormat: true },
                        { name: "parentalInvolvement", label: "3.2.1.5.4. Are opportunities provided for parents and guardians to participate in training or informational sessions about emergency preparedness and response?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default CurriculumIntegrationFormPage;