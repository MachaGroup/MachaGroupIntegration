import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function LockdownDrills2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadLockdownDrills2Image = httpsCallable(functions, 'uploadLockdownDrills2Image');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Lockdown Drills', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Lockdown Drills', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
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
                const uploadResult = await uploadLockdownDrills2Image({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Lockdown Drills', buildingId);
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

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Lockdown Drills Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Lockdown Drills Assessment</h2>
                    {[
                        { name: "lockdownEducation", label: "How are students educated on the purpose and importance of lockdown drills, including the concept of sheltering in place and securing classrooms or designated safe areas during a perceived threat or security incident?" },
                        { name: "lockdownInstructions", label: "Are students provided with clear and concise instructions on the specific actions to take during a lockdown, such as moving away from doors and windows, remaining silent, and following teacher or staff directives to maintain safety and minimize visibility to potential threats?" },
                        { name: "signalRecognition", label: "Are students trained to recognize the signals or announcements that initiate a lockdown, such as coded alerts, audible alarms, visual cues, or digital notifications, and to differentiate them from other routine announcements or drills?" },
                        { name: "responsePreparation", label: "How are students prepared to respond quickly and decisively to lockdown signals, including the importance of taking immediate shelter, staying out of sight, and remaining quiet to avoid drawing attention to their location?" },
                        { name: "classroomFortification", label: "What strategies are employed to instruct students on fortifying their classroom or shelter area during a lockdown, such as locking doors, barricading entry points, closing blinds or curtains, and turning off lights or electronic devices to minimize visibility and enhance security?" },
                        { name: "resourceUtilization", label: "How are students encouraged to utilize available resources and improvised tools, such as heavy furniture, bookshelves, or classroom supplies, to reinforce doorways, create physical barriers, or shield themselves from potential threats while awaiting further instructions or assistance?" },
                        { name: "communicationBriefing", label: "How are students briefed on the importance of communication and cooperation during a lockdown, including the need to remain calm, follow teacher or staff directives, and assist classmates who may require support or reassurance during a stressful situation?" },
                        { name: "activityReporting", label: "Are students encouraged to report any suspicious activity, unusual noises, or signs of danger discreetly to designated adults or authorities, using predetermined signals or communication methods to convey information without compromising their safety or alerting potential intruders?" },
                        { name: "debriefingParticipation", label: "Are students given the opportunity to participate in debriefing sessions or discussions following lockdown drills, allowing them to share their observations, experiences, and feedback on the effectiveness of lockdown procedures and protocols?" },
                        { name: "studentInput", label: "How are student perspectives and insights from lockdown drills incorporated into ongoing safety planning, risk assessments, and emergency preparedness efforts, informing revisions or enhancements to lockdown procedures, communication protocols, or staff training initiatives?" },
                        { name: "concernsAddressed", label: "What measures are in place to address any concerns, questions, or misconceptions raised by students during post-drill debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of a real lockdown situation?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "lockdownInstructions" || question.name === "signalRecognition" || question.name === "activityReporting" || question.name === "debriefingParticipation" ? (
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
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
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
    );
}

export default LockdownDrills2FormPage;