import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Correct imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EmergencyContactsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEmergencyContactsImage = httpsCallable(functions, 'uploadEmergencyContactsImage');
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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Contacts', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Contacts', buildingId);
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
                const uploadResult = await uploadEmergencyContactsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Contacts', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }

        if (image) {
            const imageRef = ref(storage, `images/EmergencyContacts/${buildingId}/${image.name}`);
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
                <h1>Emergency Contact Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Emergency Contact Assessment</h2>
                    {[
                        { name: "contactInfoCollection", label: "How does the school or educational institution collect, manage, and update emergency contact information for students and their families?" },
                        { name: "contactInfoSystems", label: "What systems, databases, or platforms are utilized to maintain accurate and up-to-date contact details, including phone numbers, email addresses, and alternative emergency contacts?" },
                        { name: "contactInfoVerification", label: "Are parents provided with opportunities and mechanisms to review, verify, and update their contact information regularly, such as through online portals, forms, or designated communication channels?" },
                        { name: "emergencyProtocols", label: "What protocols or procedures are in place to initiate and facilitate communication with parents in the event of emergencies, incidents, or critical situations occurring at the school?" },
                        { name: "contactListAccess", label: "How are emergency contact lists accessed, activated, or utilized by school staff, administrators, or safety personnel to notify parents of safety alerts, school closures, or other urgent messages?" },
                        { name: "communicationChannels", label: "Are communication channels diversified to accommodate varying preferences, needs, or circumstances of parents, such as text messages, emails, phone calls, or automated alerts?" },
                        { name: "identityVerification", label: "How does the school verify the identity and authority of individuals contacting or requesting information about students during emergency situations or crises?" },
                        { name: "authenticationProcedures", label: "Are procedures established to authenticate the identity of parents, guardians, or authorized emergency contacts before disclosing sensitive information or providing updates regarding student safety or well-being?" },
                        { name: "privacyMeasures", label: "What measures are implemented to protect the privacy, confidentiality, and security of student and parent information during emergency communications and interactions?" },
                        { name: "accessibilityInclusivity", label: "How does the school ensure that emergency contact information and communication methods are accessible and inclusive to all parents, regardless of language, literacy, or technological proficiency?" },
                        { name: "disabilityAccommodations", label: "Are accommodations provided for parents with disabilities, communication barriers, or unique needs to ensure they receive timely and relevant emergency notifications and updates?" },
                        { name: "outreachSupportServices", label: "What outreach efforts or support services are available to assist parents in updating or verifying their contact information, especially those facing challenges or limitations in accessing school resources?" },
                        { name: "feedbackMechanisms", label: "Are mechanisms in place to gather feedback from parents regarding their experiences, preferences, and satisfaction with emergency communication processes and protocols?" },
                        { name: "feedbackUtilization", label: "How does the school utilize feedback from parents to identify areas for improvement, address communication gaps, or enhance the effectiveness of emergency contact procedures?" },
                        { name: "parentParticipation", label: "Are opportunities provided for parents to participate in collaborative discussions, focus groups, or surveys aimed at evaluating and refining emergency communication strategies and practices?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name.endsWith("Collection") || question.name.endsWith("Systems") || question.name.endsWith("Protocols") || question.name.endsWith("Access") || question.name.endsWith("Verification") || question.name.endsWith("Procedures") || question.name.endsWith("Measures") || question.name.endsWith("Inclusivity") || question.name.endsWith("Services") || question.name.endsWith("Mechanisms") || question.name.endsWith("Utilization") || question.name.endsWith("Participation") ? (
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

export default EmergencyContactsFormPage;