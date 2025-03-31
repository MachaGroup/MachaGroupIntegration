import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function MentalHealthServicesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadMentalHealthServicesFormPageImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Mental Health Services', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Mental Health Services', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Mental Health Services', buildingId);
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
                <h1>Mental Health Services Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Availability and Accessibility:</h2>
                    {[
                        { name: "mentalHealthIdentificationCriteria", label: "How are mental health services, crisis intervention resources, and support networks identified and established as essential resources for addressing mental health needs, psychological trauma, and emotional crises within the community?" },
                        { name: "mentalHealthAccessibilityCriteria", label: "What criteria are considered when assessing the availability, accessibility, and suitability of mental health services to meet the diverse needs of individuals, families, and populations affected by emergencies, disasters, or other traumatic events?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Collaborative Service Delivery:</h2>
                    {[
                        { name: "mentalHealthCollaboration", label: "How do schools collaborate with mental health professionals, counseling centers, crisis hotlines, and community-based organizations to provide coordinated and integrated mental health support services to students, staff, families, and community members?" },
                        { name: "mentalHealthPartnerships", label: "Are partnerships formed to enhance access to crisis intervention resources, psychological first aid, counseling services, and other evidence-based mental health interventions within the school setting and the broader community?" },
                    ].map((question, index) => (
                        <div key={index + 2} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "mentalHealthPartnerships" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Crisis Response and Intervention:</h2>
                    {[
                        { name: "crisisResponseProtocols", label: "What protocols, procedures, and referral mechanisms are in place to facilitate timely access to mental health services, crisis intervention resources, and specialized support for individuals experiencing emotional distress, psychological trauma, or mental health crises during emergencies or critical incidents?" },
                        { name: "mobileCrisisIntervention", label: "Are crisis response teams, mobile crisis units, or telehealth platforms utilized to provide immediate assessments, interventions, and follow-up care for individuals in need of mental health support, including students, staff, first responders, and community members?" },
                    ].map((question, index) => (
                        <div key={index + 4} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "mobileCrisisIntervention" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Resource Coordination and Capacity Building:</h2>
                    {[
                        { name: "mentalHealthResourceCoordination", label: "How are mental health resources, funding, and staffing coordinated and allocated to address the increased demand for mental health services during emergencies, disasters, or other traumatic events affecting the community?" },
                        { name: "mentalHealthCapacityBuilding", label: "Are efforts made to build capacity, enhance resilience, and expand the reach of mental health services through training, workforce development, peer support networks, and community partnerships aimed at promoting mental health literacy, awareness, and stigma reduction?" },
                    ].map((question, index) => (
                        <div key={index + 6} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "mentalHealthCapacityBuilding" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Community Outreach and Engagement:</h2>
                    {[
                        { name: "communityMentalHealthEducation", label: "How are community members informed about the availability, accessibility, and confidentiality of mental health services, crisis intervention resources, and support networks within the community?" },
                        { name: "mentalHealthAwarenessCampaigns", label: "Are educational campaigns, workshops, support groups, and community forums organized to raise awareness, provide psychoeducation, and empower individuals to seek help, self-care strategies, and coping skills for managing mental health challenges, stressors, and traumatic experiences?" },
                    ].map((question, index) => (
                        <div key={index + 8} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "mentalHealthAwarenessCampaigns" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default MentalHealthServicesFormPage;