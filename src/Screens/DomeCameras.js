import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Removed unused Storage imports, added getDoc, setDoc
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
// Added Functions imports (already present but ensure they are used correctly)
import { getFunctions, httpsCallable } from "firebase/functions";

// Consolidate all questions into one array
const domeCameraQuestions = [
    // Placement and Coverage
    { name: "strategicPlacement", label: "2.1.2.1. Dome Cameras: Are the dome cameras strategically placed in hallways to provide comprehensive surveillance coverage?" },
    { name: "coverage", label: "2.1.2.1. Dome Cameras: Do they cover all critical areas and potential blind spots within the hallways?" },
    // Adapted from text input
    { name: "insufficientCoverageIdentified", label: "2.1.2.1. Dome Cameras: Are there any areas identified where camera coverage is insufficient, posing potential security risks?" },
    // Mounting and Installation
    { name: "secureMounting", label: "2.1.2.1. Dome Cameras: Are the dome cameras securely mounted and installed to prevent tampering or vandalism?" },
    { name: "protectiveHousing", label: "2.1.2.1. Dome Cameras: Are there protective enclosures or housings to shield the cameras from damage?" },
    { name: "concealedWiring", label: "2.1.2.1. Dome Cameras: Are cables and wiring concealed to maintain a neat and unobtrusive appearance?" },
    // Image Quality and Resolution
    { name: "imageQuality", label: "2.1.2.1. Dome Cameras: Do the dome cameras capture high-quality images with sufficient resolution for identification and analysis?" },
    // Adapted from text input
    { name: "imageSettingsAdjustable", label: "2.1.2.1. Dome Cameras: Are image settings available/adjustable to optimize quality based on lighting conditions?" },
    { name: "imageClarity", label: "2.1.2.1. Dome Cameras: Are images clear and detailed, allowing for easy identification of individuals and activities?" },
    // Integration with Surveillance Systems
    { name: "systemIntegration", label: "2.1.2.1. Dome Cameras: Are the dome cameras integrated with the overall surveillance system?" },
    { name: "communicationSeamless", label: "2.1.2.1. Dome Cameras: Do they communicate seamlessly with surveillance software and monitoring stations?" },
    { name: "realTimeMonitoring", label: "2.1.2.1. Dome Cameras: Is there real-time monitoring and recording of camera feeds from the hallways?" },
    // Remote Control and Management
    { name: "remoteControl", label: "2.1.2.1. Dome Cameras: Is there remote access and control functionality for the dome cameras?" },
    { name: "remoteAdjustments", label: "2.1.2.1. Dome Cameras: Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?" },
    { name: "encryptionProtocols", label: "2.1.2.1. Dome Cameras: Are secure authentication and encryption protocols in place for remote access/control?" },
    // Durability and Weather Resistance (Assuming indoor context based on labels)
    { name: "durability", label: "2.1.2.1. Dome Cameras: Are the dome cameras designed to withstand relevant environmental factors (e.g., dust, temperature)?" },
    { name: "durableMaterials", label: "2.1.2.1. Dome Cameras: Are they constructed from durable materials suitable for indoor conditions?" },
    { name: "damageProtection", label: "2.1.2.1. Dome Cameras: Are measures in place to protect cameras from accidental damage or tampering?" },
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "2.1.2.1. Dome Cameras: Is there a regular maintenance schedule in place for the dome cameras?" },
    { name: "maintenanceTasks", label: "2.1.2.1. Dome Cameras: Are scheduled maintenance tasks (cleaning, inspection, testing) performed?" },
    { name: "maintenanceRecords", label: "2.1.2.1. Dome Cameras: Are there records documenting maintenance, repairs, and issues?" },
];


function DomeCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // This line correctly follows the pattern: upload+DomeCameras+Image
    const uploadImage = httpsCallable(functions, 'uploadDomeCamerasImage');

    const [formData, setFormData] = useState({});
    // State updated to match SecurityGatesPage format
    const [imageData, setImageData] = useState(null); // For base64
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null); // Specific for callable errors
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Dome Cameras', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    if (existingData.imageUrl) {
                        setImageUrl(existingData.imageUrl);
                    }
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

    // handleChange saves data immediately
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Dome Cameras', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                console.log("Form data updated in Firestore:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
            }
        }
    };

    // handleImageChange uses base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
                setImageUrl(null);
                setImageUploadError(null);
            };
            reader.readAsDataURL(file);
        } else {
             setImageData(null);
        }
    };

    // handleBack is simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true);
        let finalImageUrl = formData.imageUrl || null;
        let submissionError = null;

        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                const uploadResult = await uploadImage({ // Use the correct function variable name
                    imageData: imageData,
                    buildingId: buildingId
                 });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                 finalImageUrl = formData.imageUrl || null;
            }
        }

        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl
         };
         setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Dome Cameras', buildingId);
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError);
            }
            navigate('/Form');
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
            submissionError = "Failed to save final form data.";
        } finally {
             setLoading(false);
        }
    };

    // Loading/Error Display
    if (loading && !formData) {
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
                <h1>Dome Cameras Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Dome Camera Assessment Questions</h2>

                    {/* Single .map call for all questions */}
                    {domeCameraQuestions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_yes`}>Yes</label>
                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_no`}>No</label>
                            </div>
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section */}
                    <div className="form-section">
                        <label htmlFor="imageUploadDome">Upload Image (Optional):</label>
                        <input id="imageUploadDome" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Dome Camera" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                        {imageData && <img src={imageData} alt="Preview Dome Camera" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default DomeCamerasPage;