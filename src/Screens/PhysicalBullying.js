import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function PhysicalBullyingFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPhysicalBullyingFormPageImage = httpsCallable(functions, 'uploadPhysicalBullyingFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Physical Bullying', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Physical Bullying', buildingId);
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
                const uploadResult = await uploadPhysicalBullyingFormPageImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Physical Bullying', buildingId);
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
                <h1>Physical Bullying Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Identification and Recognition:</h2>
                    {[
                        { name: "recognizingBullying", label: "How are students educated on recognizing physical bullying behaviors, such as pushing, hitting, kicking, or other forms of physical aggression, and distinguishing them from rough play or consensual interaction?" },
                        { name: "proactiveMeasures", label: "What proactive measures are in place to empower students to identify signs of physical bullying, including changes in behavior, unexplained injuries, or reluctance to attend school, and to report incidents to trusted adults or authorities?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Prevention and Intervention:</h2>
                    {[
                        { name: "preventionStrategies", label: "What preventive strategies and intervention protocols are implemented to address physical bullying incidents promptly and effectively, including clear reporting procedures, designated staff responsibilities, and consequences for perpetrators?" },
                        { name: "bystanderSupport", label: "How are students encouraged to advocate for themselves and others when witnessing physical bullying, and what support mechanisms or bystander intervention strategies are promoted to foster a culture of collective responsibility and mutual respect?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Safety Measures and Environment Design:</h2>
                    {[
                        { name: "safetyMeasures", label: "What measures are taken to ensure the physical safety and well-being of students within the school environment, including supervision during transition periods, monitoring of high-risk areas, and implementation of proactive measures to prevent conflicts and aggression?" },
                        { name: "environmentModifications", label: "Are there physical modifications or environmental adjustments made to reduce opportunities for physical bullying, such as improved lighting, surveillance cameras, or designated safe zones, and how are these measures communicated to students and staff?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Support and Counseling Services:</h2>
                    {[
                        { name: "counselingSupport", label: "How are students affected by physical bullying provided with immediate support and access to counseling services to address their emotional and psychological well-being, including trauma-informed care, crisis intervention, and ongoing support for recovery and resilience-building?" },
                        { name: "parentProtocols", label: "Are there protocols in place for engaging with parents or guardians of students involved in physical bullying incidents, including communication about the incident, collaboration on intervention strategies, and referrals to external support services as needed?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Restorative Justice and Conflict Resolution:</h2>
                    {[
                        { name: "restorativePractices", label: "Can you describe any restorative justice practices or conflict resolution techniques employed to address physical bullying incidents, including opportunities for dialogue, mediation, and reconciliation between parties involved, and how are these approaches integrated into the school's disciplinary framework?" },
                        { name: "accountabilitySupport", label: "How are students supported in understanding the impact of their actions, taking responsibility for their behavior, and developing empathy and accountability in resolving conflicts and repairing harm caused by physical bullying incidents?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Community Partnerships and Collaboration:</h2>
                    {[
                        { name: "communityPartnerships", label: "Are there partnerships with local law enforcement agencies, community organizations, or youth-serving agencies to address issues of physical bullying comprehensively, including joint initiatives, resource-sharing, and coordination of support services for affected students and families?" },
                        { name: "stakeholderEngagement", label: "How are community stakeholders engaged in prevention efforts, awareness campaigns, and capacity-building activities to address the root causes of physical bullying and promote a culture of respect, empathy, and nonviolence within the broader community?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Evaluation and Continuous Improvement:</h2>
                    {[
                        { name: "interventionEffectiveness", label: "How is the effectiveness of interventions targeting physical bullying regularly assessed and evaluated, including data collection on incident reports, disciplinary actions, student surveys, and feedback from staff, students, and parents?" },
                        { name: "policyRefinement", label: "Are there mechanisms in place for ongoing review and refinement of anti-bullying policies, procedures, and programming based on evidence-based practices, best available research, and input from stakeholders to ensure continuous improvement in addressing physical bullying within the school community?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.includes("Describe") ? question.label.split("Describe ")[1] : ""} value={formData[question.name] || ''} onChange={handleChange} />
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

export default PhysicalBullyingFormPage;