import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PerimeterFencingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPerimeterFencingPageImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);
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
                <h1>1.1.2.1.1. Perimeter Fencing Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Physical Integrity:</h2>
                    {[
                        { name: "structuralSoundness", label: "Is the perimeter fencing structurally sound and in good condition?" },
                        { name: "fencingDamage", label: "Are there any signs of damage, corrosion, or deterioration in the fencing material?" },
                        { name: "securePosts", label: "Are fence posts securely anchored, and are there any signs of leaning or instability?" },
                        { name: "gapsBreaches", label: "Are there any gaps or breaches in the fencing that could compromise security?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Height and Coverage:</h2>
                    {[
                        { name: "fencingHeight", label: "Is the height of the perimeter fencing sufficient to deter unauthorized entry or climbing?" },
                        { name: "fencingCoverage", label: "Does the fencing provide adequate coverage to secure the perimeter of the facility or property?" },
                        { name: "additionalMeasures", label: "Are there additional measures in place to prevent access over or under the fencing, such as barbed wire or concrete barriers?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Access Control:</h2>
                    {[
                        { name: "securedAccessPoints", label: "Are access points in the perimeter fencing properly secured with gates or barriers?" },
                        { name: "gatesEquipment", label: "Are gates equipped with locks, hinges, and latches to control access effectively?" },
                        { name: "restrictedAccess", label: "Is access to the fenced area restricted to authorized personnel only, with proper authentication mechanisms in place?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Visibility and Surveillance:</h2>
                    {[
                        { name: "visibility", label: "Does the perimeter fencing allow for clear visibility of the surrounding area, both from inside and outside the fenced area?" },
                        { name: "blindSpots", label: "Are there measures in place to minimize blind spots or obscured views along the perimeter?" },
                        { name: "strategicSurveillance", label: "Are surveillance cameras or other monitoring systems positioned strategically to monitor activity along the fencing?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Durability and Maintenance:</h2>
                    {[
                        { name: "durableMaterials", label: "Is the perimeter fencing made from durable materials that can withstand environmental factors and wear over time?" },
                        { name: "maintenanceInspection", label: "Are there regular maintenance and inspection procedures in place to address any issues with the fencing promptly?" },
                        { name: "repairProvisions", label: "Are there provisions for repairing or replacing damaged sections of fencing as needed?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Compliance with Regulations:</h2>
                    {[
                        { name: "regulatoryCompliance", label: "Does the perimeter fencing comply with relevant regulations, codes, and standards for security fencing?" },
                        { name: "regulatoryRequirements", label: "Are there any specific requirements or guidelines for perimeter fencing outlined by regulatory authorities or industry associations?" },
                        { name: "inspectionsCompliance", label: "Have inspections or assessments been conducted to verify compliance with applicable standards?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        {question.name === "regulatoryRequirements" ? (
                          <input type="text" name={question.name} placeholder="Enter any regulatory requirements" onChange={handleChange} />
                        ) : (
                          <div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div>
                        )}
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Integration with Security Measures:</h2>
                    {[
                        { name: "integratedSecurityMeasures", label: "Is the perimeter fencing integrated with other security measures, such as surveillance cameras, lighting, or intrusion detection systems?" },
                        { name: "securityEffectiveness", label: "Do these security measures complement the effectiveness of the fencing in deterring and detecting security threats?" },
                        { name: "coordinationResponse", label: "Is there coordination between security personnel and monitoring systems to respond to perimeter breaches effectively?" },
                    ].map((question, index) => (
                        <><div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PerimeterFencingPage;