import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function RazorWirePage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadRazorWireImage = httpsCallable(functions, 'uploadRazorWireImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Razor Wire', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Razor Wire', buildingId);
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
                const uploadResult = await uploadRazorWireImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Razor Wire', buildingId);
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
        { name: "razorWireInstalled", label: "Is razor wire installed at strategic locations atop perimeter fences to deter unauthorized access?", type: "radio" },
        { name: "razorWireCoverage", label: "Does the razor wire provide sufficient coverage to prevent climbing or scaling of the fence?", type: "radio" },
        { name: "razorWireGaps", label: "Are there any gaps or areas where razor wire is missing or damaged, compromising security? (Describe any gaps or damage)", type: "text" },
        { name: "warningSigns", label: "Are there warning signs or markers indicating the presence of razor wire to prevent accidental contact?", type: "radio" },
        { name: "razorWireSafety", label: "Is the razor wire installed at a height and angle that minimizes the risk of accidental injury to personnel or wildlife?", type: "radio" },
        { name: "razorWireRestrictions", label: "Are there measures in place to prevent unauthorized access to areas where razor wire is installed?", type: "radio" },
        { name: "razorWireEffectiveness", label: "Has razor wire proven effective in deterring unauthorized access or intrusions in the past?", type: "radio" },
        { name: "documentedInstances", label: "Are there documented instances of individuals attempting to breach the perimeter being deterred by the presence of razor wire? (Describe instances)", type: "text" },
        { name: "additionalMeasures", label: "Are there additional security measures in place to complement the effectiveness of razor wire in perimeter defense?", type: "radio" },
        { name: "compliance", label: "Does the installation of razor wire comply with relevant regulations, codes, and standards for security fencing?", type: "radio" },
        { name: "guidelines", label: "Are there any specific requirements or guidelines for the use of razor wire outlined by regulatory authorities or industry associations? (Enter regulatory requirements)", type: "text" },
        { name: "inspections", label: "Has the installation undergone inspections or assessments to verify compliance with applicable standards?", type: "radio" },
        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for razor wire installations?", type: "radio" },
        { name: "maintenanceTasks", label: "Are maintenance tasks, such as inspection for damage or corrosion, repair of any loose or damaged sections, and replacement of worn-out wire, performed according to schedule?", type: "radio" },
        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio" },
        { name: "alternativesConsidered", label: "Has consideration been given to alternative perimeter security measures that may provide similar or enhanced security without the risks associated with razor wire?", type: "radio" },
        { name: "hazardousAlternatives", label: "Are there cost-effective and less hazardous alternatives that could achieve the same deterrent effect? (Describe any alternatives)", type: "text" },
        { name: "stakeholdersInformed", label: "Has the presence of razor wire been communicated transparently to stakeholders, including neighboring properties or the local community?", type: "radio" },
        { name: "mitigationEfforts", label: "Are there efforts to mitigate any negative perceptions or concerns related to the use of razor wire, such as landscaping or architectural design elements to conceal or soften its appearance?", type: "radio" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Razor Wire Assessment</h1>
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

export default RazorWirePage;