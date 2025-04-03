import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function RecertificationScheduleFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadRecertificationScheduleImage = httpsCallable(functions, 'uploadRecertificationScheduleImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);
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
                const uploadResult = await uploadRecertificationScheduleImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef } }, { merge: true });
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

    const questions = [
        { name: "recertificationFrequency", label: "What is the established frequency for recertifying staff members in First Aid/CPR training (e.g., every two years, annually)? (Describe the method for recertifying)", type: "text" },
        { name: "recertificationScheduleDetermination", label: "How is the recertification schedule determined, and are there specific factors or regulations guiding this decision? (Describe how the schedule is determined)", type: "text" },
        { name: "recertificationVariations", label: "Are there variations in recertification requirements based on job roles, departmental needs, or regulatory standards?", type: "radio" },
        { name: "notificationMethods", label: "How are staff members notified of upcoming recertification deadlines for First Aid/CPR training? (Describe how the staff is notified)", type: "text" },
        { name: "reminderSystem", label: "Is there a reminder system in place to alert staff members well in advance of their recertification expiration dates?", type: "radio" },
        { name: "communicationChannels", label: "What communication channels are utilized to ensure that staff members receive timely reminders about recertification requirements? (List the communication channels)", type: "text" },
        { name: "recertificationProcess", label: "What is the process for staff members to recertify in First Aid/CPR training, and are there specific steps or procedures they need to follow? (Describe the process)", type: "text" },
        { name: "recertificationOptions", label: "Are recertification courses offered on-site, online, or through external training providers, and how are these options determined?", type: "radio" },
        { name: "recertificationSupport", label: "How are staff members supported in completing recertification requirements, such as scheduling flexibility or financial assistance? (Describe how the staff is supported to complete requirements)", type: "text" },
        { name: "recertificationRecords", label: "How are records of staff members' recertification status and completion maintained, and are these records kept up to date? (Describe how the records are maintained)", type: "text" },
        { name: "certificateDistribution", label: "Are recertification certificates or credentials issued to staff members upon successful completion, and how are these documents distributed or stored? (Describe how they are distributed or stored)", type: "text" },
        { name: "recordsIntegrity", label: "What measures are in place to ensure the accuracy and integrity of recertification records, including verification of course completion and instructor credentials? (Describe the measures)", type: "text" },
        { name: "evaluationFeedback", label: "How is the effectiveness of the recertification process evaluated, and are there mechanisms for gathering feedback from staff members? (Describe the mechanisms)", type: "text" },
        { name: "staffFeedback", label: "Are staff members given the opportunity to provide input on the recertification courses, instructors, or content to identify areas for improvement?", type: "radio" },
        { name: "lessonsLearned", label: "How are lessons learned from previous recertification cycles used to refine and enhance the recertification process for future iterations? (Describe how lessons are learned)", type: "text" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Recertification Schedule Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.substring(question.label.indexOf('(') +1, question.label.lastIndexOf(')'))} value={formData[question.name] || ''} onChange={handleChange} />
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

export default RecertificationScheduleFormPage;