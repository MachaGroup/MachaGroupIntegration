import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DomeCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDomeCamerasImage = httpsCallable(functions, 'uploadDomeCamerasImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        }
    }, [buildingId, navigate]);

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
                const formsRef = collection(db, 'forms/Physical Security/Dome Cameras');
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
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
            const formsRef = collection(db, 'forms/Physical Security/Dome Cameras');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Dome Cameras Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Placement and Coverage:</h2>
                    {[
                        { name: "strategicPlacement", label: "2.1.2.1. Dome Cameras: Are the dome cameras strategically placed in hallways to provide comprehensive surveillance coverage?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "coverage", label: "2.1.2.1. Dome Cameras: Do they cover all critical areas and potential blind spots within the hallways?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "insufficientCoverage", label: "2.1.2.1. Dome Cameras: Are there any areas where camera coverage is insufficient, posing potential security risks?", type: "text", placeholder: "Describe areas with insufficient coverage", securityGatesFormat: true },
                    ]}

                    <h2>Mounting and Installation:</h2>
                    {[
                        { name: "secureMounting", label: "2.1.2.1. Dome Cameras: Are the dome cameras securely mounted and installed to prevent tampering or vandalism?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "protectiveHousing", label: "2.1.2.1. Dome Cameras: Are there protective enclosures or housings to shield the cameras from damage?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "concealedWiring", label: "2.1.2.1. Dome Cameras: Are cables and wiring concealed to maintain a neat and unobtrusive appearance?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Image Quality and Resolution:</h2>
                    {[
                        { name: "imageQuality", label: "2.1.2.1. Dome Cameras: Do the dome cameras capture high-quality images with sufficient resolution for identification and analysis?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "imageSettings", label: "2.1.2.1. Dome Cameras: Are there adjustments or settings available to optimize image quality based on lighting conditions in the hallways?", type: "text", placeholder: "Describe available settings", securityGatesFormat: true },
                        { name: "imageClarity", label: "2.1.2.1. Dome Cameras: Are images clear and detailed, allowing for easy identification of individuals and activities?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Integration with Surveillance Systems:</h2>
                    {[
                        { name: "systemIntegration", label: "2.1.2.1. Dome Cameras: Are the dome cameras integrated with the overall surveillance system?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "communicationSeamless", label: "2.1.2.1. Dome Cameras: Do they communicate seamlessly with surveillance software and monitoring stations?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "realTimeMonitoring", label: "2.1.2.1. Dome Cameras: Is there real-time monitoring and recording of camera feeds from the hallways?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Remote Control and Management:</h2>
                    {[
                        { name: "remoteControl", label: "2.1.2.1. Dome Cameras: Is there remote access and control functionality for the dome cameras?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "remoteAdjustments", label: "2.1.2.1. Dome Cameras: Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "encryptionProtocols", label: "2.1.2.1. Dome Cameras: Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Durability and Weather Resistance:</h2>
                    {[
                        { name: "durability", label: "2.1.2.1. Dome Cameras: Are the dome cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "durableMaterials", label: "2.1.2.1. Dome Cameras: Are they constructed from durable materials capable of withstanding indoor conditions?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "damageProtection", label: "2.1.2.1. Dome Cameras: Are there measures in place to protect the cameras from accidental damage or tampering?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>Maintenance and Upkeep:</h2>
                    {[
                        { name: "maintenanceSchedule", label: "2.1.2.1. Dome Cameras: Is there a regular maintenance schedule in place for the dome cameras?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "maintenanceTasks", label: "2.1.2.1. Dome Cameras: Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "maintenanceRecords", label: "2.1.2.1. Dome Cameras: Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
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

export default DomeCamerasPage;