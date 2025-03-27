import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce';

function SafetyWorkshopsFormPage() {
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

    const latestFormData = useRef(formData);

    useEffect(() => {
        latestFormData.current = formData;
    }, [formData]);

    const debouncedSave = useRef(debounce(async (dataToSave, imgUrl) => {
        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
            await setDoc(formDocRef, { formData: dataToSave, imageUrl: imgUrl, updatedAt: serverTimestamp() }, { merge: true });
            setSaveError(null);
            console.log("Form data saved:", dataToSave);
        } catch (error) {
            console.error("Error saving form data:", error);
            setSaveError("Failed to save form data. Please try again.");
        }
    }, 500)).current;

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
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

        return () => {
            debouncedSave.cancel();
        };

    }, [buildingId, db, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === 'radio') {
            newValue = checked ? value : '';
        }
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, [name]: newValue };
            debouncedSave(updatedFormData, imageUrl);
            return updatedFormData;
        });

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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Workshop', buildingId);
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
                <h1>Safety Workshops Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* 3.3.1.1.1 Safety Workshops */}
                    <h2>Event Planning and Coordination:</h2>
                    <div className="form-section">
                        <label>How are safety workshops and educational events for parents planned, organized, and coordinated within the school or educational institution?</label>
                        <input type="text" name="workshopPlanningProcess" placeholder="Describe how they're planned" value={formData.workshopPlanningProcess || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>What criteria are used to select topics, speakers, and formats for parent education events, and how are they aligned with the safety needs and concerns of the school community?</label>
                        <input type="text" name="selectionCriteriaTopicsSpeakers" placeholder="Describe the criteria" value={formData.selectionCriteriaTopicsSpeakers || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>Are parent education events integrated into broader community engagement initiatives, school calendars, or existing parent involvement programs?</label>
                        <div>
                            <input type="radio" name="eventsIntegratedWithPrograms" value="yes" checked={formData.eventsIntegratedWithPrograms === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="eventsIntegratedWithPrograms" value="no" checked={formData.eventsIntegratedWithPrograms === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="eventsIntegratedWithProgramsComment" placeholder="Comments" value={formData.eventsIntegratedWithProgramsComment || ''} onChange={handleInputChange} />
                    </div>

                    <h2>Content and Curriculum:</h2>
                    <div className="form-section">
                        <label>What specific safety topics are covered in parent education events, such as emergency preparedness, home safety, cyber safety, or substance abuse prevention?</label>
                        <input type="text" name="safetyTopicsCovered" placeholder="Describe the topics" value={formData.safetyTopicsCovered || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>How is the content of safety workshops developed or curated to ensure relevance, accuracy, and effectiveness in addressing the information needs and concerns of parents?</label>
                        <input type="text" name="contentDevelopmentProcess" placeholder="Describe how it's developed" value={formData.contentDevelopmentProcess || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>Are materials, resources, or take-home materials provided to parents to reinforce key safety messages and facilitate ongoing learning beyond the events?</label>
                        <input type="text" name="materialsProvidedToParents" placeholder="Describe which is provided" value={formData.materialsProvidedToParents || ''} onChange={handleInputChange} />
                    </div>

                    <h2>Engagement Strategies:</h2>
                    <div className="form-section">
                        <label>How are efforts made to encourage parent participation and engagement in safety workshops and educational events?</label>
                        <input type="text" name="effortsToEncourageParticipation" placeholder="Describe the efforts" value={formData.effortsToEncourageParticipation || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>What communication channels, outreach methods, or incentives are used to promote parent attendance, solicit feedback, and gauge interest in specific safety topics or initiatives?</label>
                        <input type="text" name="communicationAndOutreachChannels" placeholder="Describe the channels" value={formData.communicationAndOutreachChannels || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>Are parent education events designed to accommodate diverse schedules, preferences, and accessibility needs of parents, such as offering multiple session times, language options, or virtual participation?</label>
                        <div>
                            <input type="radio" name="eventsAccommodateDiverseNeeds" value="yes" checked={formData.eventsAccommodateDiverseNeeds === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="eventsAccommodateDiverseNeeds" value="no" checked={formData.eventsAccommodateDiverseNeeds === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="eventsAccommodateDiverseNeedsComment" placeholder="Comments" value={formData.eventsAccommodateDiverseNeedsComment || ''} onChange={handleInputChange} />
                    </div>

                    <h2>Interactive Learning and Skill-building:</h2>
                    <div className="form-section">
                        <label>How are parent education events structured to facilitate interactive learning, discussion, and skill-building among participants?</label>
                        <input type="text" name="interactiveLearningStructure" placeholder="Describe how events are structured" value={formData.interactiveLearningStructure || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>Are workshops designed to incorporate hands-on activities, group discussions, case studies, or role-playing exercises to deepen understanding and retention of safety concepts?</label>
                        <div>
                            <input type="radio" name="handsOnActivitiesIncluded" value="yes" checked={formData.handsOnActivitiesIncluded === "yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="handsOnActivitiesIncluded" value="no" checked={formData.handsOnActivitiesIncluded === "no"} onChange={handleInputChange} />
                        </div>
                        <input type="text" name="handsOnActivitiesIncludedComment" placeholder="Comments" value={formData.handsOnActivitiesIncludedComment || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>What strategies are employed to empower parents with practical skills, resources, and strategies they can implement at home to enhance family safety and emergency preparedness?</label>
                        <input type="text" name="practicalSkillsStrategiesForParents" placeholder="Describe the strategies" value={formData.practicalSkillsStrategiesForParents || ''} onChange={handleInputChange} />
                    </div>

                    <h2>Partnerships and Collaboration:</h2>
                    <div className="form-section">
                        <label>How do schools collaborate with external partners, such as community organizations, local agencies, or subject matter experts, to enhance the quality and impact of parent education events?</label>
                        <input type="text" name="externalCollaborationMethods" placeholder="Describe how they collaborate" value={formData.externalCollaborationMethods || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>Can you provide examples of successful collaborations or joint initiatives that have enriched the content, reach, or engagement of safety workshops for parents?</label>
                        <input type="text" name="successfulCollaborationsExamples" placeholder="Give examples" value={formData.successfulCollaborationsExamples || ''} onChange={handleInputChange} />
                    </div>

                    <div className="form-section">
                        <label>In what ways do partnerships with external stakeholders contribute to the sustainability, diversity, and cultural relevance of parent education efforts within the school community?</label>
                        <input type="text" name="partnershipContributionToEducation" placeholder="Describe the ways" value={formData.partnershipContributionToEducation || ''} onChange={handleInputChange} />
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

export default SafetyWorkshopsFormPage;
