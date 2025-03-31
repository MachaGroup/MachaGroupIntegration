import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CyberBullyingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCyberBullyingFormPageImage = httpsCallable(functions, 'uploadCyberBullyingFormPageImage');

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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Cyber Bullying');
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
                const formsRef = collection(db, 'forms/Personnel Training and Awareness/Cyber Bullying');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Cyber Bullying', docId);
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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Cyber Bullying');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Personnel Training and Awareness/Cyber Bullying', docId);
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
                <h1>Cyber Bullying Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Awareness and Recognition:</h2>
                    {[
                        { name: "cyberbullyingDefinition", label: "3.4.2.1.3.1. How is cyberbullying defined and distinguished from other forms of online communication within the school's policies and educational materials?", type: "text", securityGatesFormat: true },
                        { name: "reportingStrategies", label: "3.4.2.1.3.2. What strategies are in place to encourage students to report instances of cyberbullying, and how are reports handled confidentially and with sensitivity?", type: "text", securityGatesFormat: true },
                        { name: "monitoringMechanisms", label: "3.4.2.1.3.3. Are there mechanisms for monitoring online activity and social media platforms to proactively identify potential instances of cyberbullying, and how are privacy concerns addressed in this process?", type: "text", securityGatesFormat: true },
                        { name: "digitalCitizenship", label: "3.4.2.1.3.4. What curriculum resources or educational programs are utilized to teach students about digital citizenship, online safety, and responsible internet use?", type: "text", securityGatesFormat: true },
                        { name: "onlineRespect", label: "3.4.2.1.3.5. How does the school promote a culture of respect and empathy in online interactions, including discussions on cyberbullying prevention, digital footprints, and the consequences of online behavior?", type: "text", securityGatesFormat: true },
                        { name: "cyberbullyingLessons", label: "3.4.2.1.3.6. Are there specific lessons or activities designed to address the unique challenges of cyberbullying, such as the spread of rumors, online harassment, or digital identity theft?", type: "text", securityGatesFormat: true },
                        { name: "responseProtocols", label: "3.4.2.1.3.7. Can you outline the steps involved in responding to a reported case of cyberbullying, from initial investigation to resolution and follow-up support for affected students?", type: "text", securityGatesFormat: true },
                        { name: "studentResources", label: "3.4.2.1.3.8. What resources or support services are available for students who have been targeted by cyberbullying, including counseling, peer mediation, or legal assistance if necessary?", type: "text", securityGatesFormat: true },
                        { name: "externalCollaboration", label: "3.4.2.1.3.9. How does the school collaborate with external partners, such as law enforcement or mental health professionals, to address serious or persistent cases of cyberbullying and ensure a coordinated response?", type: "text", securityGatesFormat: true },
                        { name: "deviceSecurity", label: "3.4.2.1.3.10. What measures are in place to secure school-owned devices and digital platforms against cyber threats, including malware, phishing attempts, or unauthorized access?", type: "text", securityGatesFormat: true },
                        { name: "dataProtection", label: "3.4.2.1.3.11. How are students educated about the importance of protecting their personal information online, including strategies for creating secure passwords, avoiding phishing scams, and safeguarding sensitive data?", type: "text", securityGatesFormat: true },
                        { name: "socialMediaPolicies", label: "3.4.2.1.3.12. Are there policies or guidelines governing the use of social media and digital communication tools within the school community, and how are these communicated to students, staff, and parents?", type: "text", securityGatesFormat: true },
                        { name: "peerSupportPrograms", label: "3.4.2.1.3.13. Does the school facilitate peer support programs or peer mentoring initiatives aimed at fostering positive online behavior and providing support to students experiencing cyberbullying?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "bystanderEncouragement", label: "3.4.2.1.3.14. How are students encouraged to intervene as bystanders in instances of cyberbullying, and what resources or training are available to empower them to take action?", type: "text", securityGatesFormat: true },
                        { name: "restorativeJustice", label: "3.4.2.1.3.15. Are there opportunities for restorative justice practices or facilitated discussions among students involved in cyberbullying incidents to promote understanding, empathy, and resolution?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "staffTraining", label: "3.4.2.1.3.16. What training opportunities are provided to school staff members to increase their awareness of cyberbullying issues, improve their ability to recognize warning signs, and respond effectively to incidents?", type: "text", securityGatesFormat: true },
                        { name: "professionalDevelopment", label: "3.4.2.1.3.17. How is ongoing professional development integrated into staff training programs to ensure that educators stay informed about evolving trends in cyberbullying and digital safety?", type: "text", securityGatesFormat: true },
                        { name: "staffSupportProtocols", label: "3.4.2.1.3.18. Are there protocols or procedures in place for staff members to seek guidance or support when addressing cyberbullying incidents, including access to counseling services or legal advice if needed?", type: "text", securityGatesFormat: true },
                        { name: "parentEngagement", label: "3.4.2.1.3.19. How does the school involve parents or guardians in conversations about cyberbullying prevention and online safety, and what resources or materials are provided to support these discussions?", type: "text", securityGatesFormat: true },
                        { name: "parentWorkshops", label: "3.4.2.1.3.20. Are there opportunities for parents to participate in workshops, seminars, or informational sessions focused on cyberbullying awareness, digital parenting strategies, and effective communication with their children about online risks?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "communityCollaboration", label: "3.4.2.1.3.21. Does the school collaborate with community organizations, law enforcement agencies, or industry partners to enhance cyberbullying prevention efforts, share best practices, and advocate for policies that promote online safety?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
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

export default CyberBullyingFormPage;