import React, { useState, useEffect, useCallback } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce';
function SafetyDemonstrationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const storage = getStorage();
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [saveError, setSaveError] = useState(null);
    const saveFormData = useCallback(async (updatedFormData, currentImageUrl) => {
        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
            await setDoc(formDocRef, { formData: updatedFormData, imageUrl: currentImageUrl, updatedAt: serverTimestamp() }, { merge: true });
            setSaveError(null);
            console.log("Form data saved:", updatedFormData);
        } catch (error) {
            console.error("Error saving form data:", error);
            setSaveError("Failed to save form data. Please try again.");
        }
    }, [db, buildingId]);
    const debouncedSaveFormData = useCallback(debounce(saveFormData, 500), [saveFormData]);
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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No form data for this building");
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
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === 'radio') {
            newValue = checked ? value : '';
        }
        setFormData(prevFormData => ({ ...prevFormData, [name]: newValue }));
        debouncedSaveFormData({ ...formData, [name]: newValue }, imageUrl);
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImage(imageFile);
            uploadImageToFirebase(imageFile);
        }
    };
    const uploadImageToFirebase = async (imageFile) => {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Error uploading image:", error);
                setUploadError("Failed to upload image. Please try again.");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL);
                    handleInputChange({ target: { name: 'imageUrl', value: downloadURL } });
                });
            }
        );
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
        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
            await setDoc(formDocRef, { formData: formData, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Failed to submit the form. Please try again.');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }
    if (saveError) {
        return <div>Error: {saveError}</div>;
    }
    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Safety Demonstrations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Frequency and Scope:</h2>
                    <div className="form-section">
                        <label>How frequently are safety demonstrations conducted within the school or educational institution, and which safety topics are covered?</label>
                        <input style={{maxWidth:'800px'}} type="text" name="safetyDemonstrationsFrequency" placeholder="Describe how frequent" value={formData.safetyDemonstrationsFrequency || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are safety demonstrations integrated into regular classroom instruction, special assemblies, or designated safety awareness events?</label>
                        <div>
                            <input type="radio" name="safetyDemonstrationsIntegration" value="yes" checked={formData.safetyDemonstrationsIntegration === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="safetyDemonstrationsIntegration" value="no" checked={formData.safetyDemonstrationsIntegration === "no"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="safetyDemonstrationsIntegrationComment" placeholder="Comments" value={formData.safetyDemonstrationsIntegrationComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>What range of safety topics are addressed in the demonstrations, such as fire safety, first aid basics, personal safety, or disaster preparedness?</label>
                        <input type="text" name="safetyDemonstrationsTopics" placeholder="Describe the range" value={formData.safetyDemonstrationsTopics || ''} onChange={handleInputChange} />
                    </div>
                    <h2>Demonstration Techniques:</h2>
                    <div className="form-section">
                        <label>What techniques or methods are used to deliver safety demonstrations to students, staff, and other stakeholders?</label>
                        <input type="text" name="demonstrationTechniques" placeholder="Describe the techniques/methods" value={formData.demonstrationTechniques || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are live demonstrations, video presentations, interactive simulations, or hands-on activities employed to engage participants in learning about safety practices?</label>
                        <div>
                            <input type="radio" name="demonstrationTechniquesMethods" value="yes" checked={formData.demonstrationTechniquesMethods === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="demonstrationTechniquesMethods" value="no" checked={formData.demonstrationTechniquesMethods === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="demonstrationTechniquesMethodsComment" placeholder="Comments" value={formData.demonstrationTechniquesMethodsComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How are safety demonstrations adapted to accommodate different learning styles, age groups, and cultural backgrounds of participants?</label>
                        <input type="text" name="safetyDemonstrationsAdaptation" placeholder="Describe how it adapts" value={formData.safetyDemonstrationsAdaptation || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are demonstrations facilitated by qualified instructors or safety professionals with expertise in the specific safety topics being covered?</label>
                        <div>
                            <input type="radio" name="qualifiedInstructors" value="yes" checked={formData.qualifiedInstructors === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="qualifiedInstructors" value="no" checked={formData.qualifiedInstructors === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="qualifiedInstructorsComment" placeholder="Comments" value={formData.qualifiedInstructorsComment || ''} onChange={handleInputChange} />
                    </div>
                    <h2>Practical Skills and Applications:</h2>
                    <div className="form-section">
                        <label>Do safety demonstrations include opportunities for participants to practice and apply safety skills in simulated or real-life scenarios?</label>
                        <div>
                            <input type="radio" name="practicalSafetySkills" value="yes" checked={formData.practicalSafetySkills === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="practicalSafetySkills" value="no" checked={formData.practicalSafetySkills === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="practicalSafetySkillsComment" placeholder="Comments" value={formData.practicalSafetySkillsComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are participants actively involved in performing tasks such as operating fire extinguishers, administering basic first aid, or evacuating buildings during drills?</label>
                        <div>
                            <input type="radio" name="activeParticipantInvolvement" value="yes" checked={formData.activeParticipantInvolvement === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="activeParticipantInvolvement" value="no" checked={formData.activeParticipantInvolvement === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="activeParticipantInvolvementComment" placeholder="Comments" value={formData.activeParticipantInvolvementComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How are safety demonstrations structured to promote skill development, confidence building, and retention of safety knowledge among participants?</label>
                        <input type="text" name="demonstrationStructure" placeholder="Describe how it's structured" value={formData.demonstrationStructure || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are follow-up activities or assessments conducted to reinforce learning and assess participants' mastery of safety concepts and skills demonstrated?</label>
                        <input type="text" name="followUpActivities" placeholder="Describe the activities/assessments" value={formData.followUpActivities || ''} onChange={handleInputChange} />
                    </div>
                    <h2>Reinforcement and Review:</h2>
                    <div className="form-section">
                        <label>How are safety demonstrations reinforced and reviewed beyond the initial presentation to ensure long-term retention and application of safety knowledge?</label>
                        <input type="text" name="demonstrationReinforcement" placeholder="Describe how it's reinforced" value={formData.demonstrationReinforcement || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are review sessions, quizzes, or interactive discussions conducted to revisit key safety concepts and reinforce learning points covered in the demonstrations?</label>
                        <div>
                            <input type="radio" name="reviewSessions" value="yes" checked={formData.reviewSessions === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="reviewSessions" value="no" checked={formData.reviewSessions === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="reviewSessionsComment" placeholder="Comments" value={formData.reviewSessionsComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>What strategies are employed to encourage participants to incorporate safety practices into their daily routines and habits following the demonstrations?</label>
                        <input type="text" name="safetyPracticesIncorporation" placeholder="Describe the strategies" value={formData.safetyPracticesIncorporation || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are refresher courses or ongoing training opportunities provided to maintain and update participants' proficiency in safety procedures over time?</label>
                        <div>
                            <input type="radio" name="refresherCourses" value="yes" checked={formData.refresherCourses === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="refresherCourses" value="no" checked={formData.refresherCourses === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="refresherCoursesComment" placeholder="Comments" value={formData.refresherCoursesComment || ''} onChange={handleInputChange} />
                    </div>
                    <h2>Feedback and Improvement:</h2>
                    <div className="form-section">
                        <label>Are mechanisms in place to gather feedback from participants regarding their experience and effectiveness of safety demonstrations?</label>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" value={formData.feedbackMechanisms || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How are suggestions or concerns raised by participants regarding safety demonstrations addressed and incorporated into future presentations?</label>
                        <input type="text" name="suggestionsIncorporation" placeholder="Describe how they're incorporated" value={formData.suggestionsIncorporation || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are periodic evaluations or assessments conducted to measure the impact of safety demonstrations on participants' safety awareness, behavior, and preparedness?</label>
                        <div>
                            <input  type="radio" name="periodicEvaluations" value="yes" checked={formData.periodicEvaluations === "yes"} onChange={handleInputChange} /> Yes
                            <input  type="radio" name="periodicEvaluations" value="no" checked={formData.periodicEvaluations === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="periodicEvaluationsComment" placeholder="Comments" value={formData.periodicEvaluationsComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>What measures are taken to continuously improve the content, delivery methods, and overall quality of safety demonstrations based on feedback and evaluation findings?</label>
                        <input type="text" name="continuousImprovementMeasures" placeholder="Describe the measures" value={formData.continuousImprovementMeasures || ''} onChange={handleInputChange} />
                    </div>
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
export default SafetyDemonstrationsFormPage;
