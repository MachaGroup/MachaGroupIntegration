import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StudentLeadershipFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStudentLeadershipImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Leadership', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Leadership', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Leadership', buildingId);
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
                <h1>Student Leadership Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Student Leadership</h2>
                    {[
                        { name: "engagingStudentLeaders", label: "How do student leaders actively engage their peers in promoting safety awareness and implementing initiatives within the school or educational institution?" },
                        { name: "successfulSafetyInitiatives", label: "Can you provide examples of successful peer-to-peer safety initiatives led by students, and how they have positively impacted safety culture or behavior among peers?" },
                        { name: "studentLeadersCollaboratingSupportingSafety", label: "In what ways do student leaders collaborate with school staff, administrators, or external organizations to support and amplify their peer-to-peer safety efforts?" },
                        { name: "leadershipRoles", label: "What leadership roles and responsibilities are entrusted to student leaders in driving peer-to-peer safety initiatives?" },
                        { name: "selectingStudentLeaders", label: "How are student leaders selected or recruited for leadership roles related to safety education, and what criteria are used to identify potential candidates?" },
                        { name: "providedTraining", label: "Can you describe the training, mentorship, or support provided to student leaders to enhance their leadership skills and effectiveness in promoting safety among peers?" },
                        { name: "developmentOpportunities", label: "What opportunities are available for student leaders to develop essential skills and competencies related to promoting safety and emergency preparedness among their peers?" },
                        { name: "studentLeaderstrainingPrograms", label: "Are training programs or workshops specifically designed to equip student leaders with communication, collaboration, problem-solving, and decision-making skills relevant to safety leadership roles?" },
                        { name: "applyingKnowledge", label: "How do student leaders apply the knowledge and skills gained through training to effectively communicate safety messages, influence peer behavior, and respond to safety concerns within the school community?" },
                        { name: "studentLeadersCollaboratingAligningSafety", label: "How do student leaders collaborate with school staff, administrators, or safety personnel to align peer-to-peer safety initiatives with institutional goals and priorities?" },
                        { name: "successfulPartnerships", label: "Can you provide examples of successful partnerships or joint initiatives between student leaders and adult stakeholders in advancing safety education and preparedness within the school community?" },
                        { name: "staffSupportingStudentLeaders", label: "In what ways do school staff and administrators support and empower student leaders to take ownership of safety initiatives and drive positive change among their peers?" },
                        { name: "evaluatingStudentLedInitiatives", label: "How are student-led safety initiatives evaluated for their effectiveness and impact on safety culture, behavior change, and incident prevention within the school community?" },
                        { name: "establishingMetrics", label: "Are specific metrics, indicators, or benchmarks established to assess the success of peer-to-peer safety initiatives led by student leaders?" },
                        { name: "recognizingStudentLeaders", label: "How are student leaders recognized, celebrated, or rewarded for their contributions to promoting safety and fostering a culture of responsibility and preparedness among their peers?" },
                        { name: "sustainableMeasures", label: "What measures are in place to ensure the sustainability and continuity of peer-to-peer safety initiatives beyond the tenure of current student leaders?" },
                        { name: "implentingSuccessionPlans", label: "Are succession plans or leadership transition processes implemented to facilitate the seamless transfer of knowledge, skills, and responsibilities to incoming student leaders?" },
                        { name: "mentoringFutureLeaders", label: "How do student leaders mentor, empower, and inspire younger students to become future safety leaders and continue the legacy of peer-to-peer safety initiatives within the school community?" },
                        { name: "engagingStudentLeadersRasingAwareness", label: "How do student leaders engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?" },
                        { name: "collaborativeStudentLedExamples", label: "Can you provide examples of collaborative projects, events, or campaigns led by student leaders that have extended the reach and impact of safety education beyond the school campus?" },
                        { name: "leveragingPlatforms", label: "In what ways do student leaders leverage digital platforms, social media, or other communication channels to amplify their safety messages and mobilize collective action among peers and community members?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "studentLeaderstrainingPrograms" ? (
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

export default StudentLeadershipFormPage;