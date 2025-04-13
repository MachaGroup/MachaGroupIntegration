import React, { useState, useEffect } from 'react';
// Updated Firestore imports for simpler get/set pattern
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
// Removed unused Storage imports and complex query imports
import { getFunctions, httpsCallable } from "firebase/functions";

function DeviceEncryptionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable, kept function name string as it matches the rule
    const uploadImage = httpsCallable(functions, 'uploadDeviceEncryptionPageImage');

    const [formData, setFormData] = useState({});
    // Adapted image state
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    // Added loading/error state
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError state

    // Simplified Firestore document path
    const formDocPath = 'forms/Cybersecurity/Device Encryption'; // Path structure

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Adjust route as needed
            return;
        }

        // Integrated fetch logic directly, using getDoc
        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null);

            try {
                const formDocRef = doc(db, formDocPath, buildingId); // Direct doc reference
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    if (data.formData && data.formData.imageUrl) {
                       setImageUrl(data.formData.imageUrl);
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
    }, [buildingId, db, navigate, formDocPath]); // Added formDocPath dependency

    // handleChange with auto-saving
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, formDocPath, buildingId);
                await setDoc(formDocRef, {
                    formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl } // Persist current imageUrl
                }, { merge: true });
                console.log("Form data auto-saved:", { ...newFormData, building: buildingRef, imageUrl: imageUrl });
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Handle error silently or alert user
            }
        }
    };

    // handleImageChange using FileReader
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

    // handleBack simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using httpsCallable for image and setDoc for data
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        let finalImageUrl = imageUrl;

        if (imageData) {
            setLoading(true);
            setImageUploadError(null);
            try {
                // Pass relevant identifiers to the Cloud Function if needed
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: buildingId, formType: 'DeviceEncryption' });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log('Image uploaded successfully:', finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false);
                return;
            } finally {
                setLoading(false);
            }
        }

        try {
            setLoading(true);
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, formDocPath, buildingId);
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Adjust route as needed
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit form. Please check your connection and try again.");
            setLoading(false);
        }
    };

    if (loading && !formData) { // Show loading only initially or during submission
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Consolidated questions array
    const questions = [
        // Section 4.1.2.2.2.1 Encryption Standards and Protocols
        { name: "algorithmsMeetStandards", label: "Are specific encryption algorithms and protocols (e.g., AES-256) used to secure data on laptops, and do they meet industry standards?" },
        { name: "policiesDictateStandards", label: "Are there specific policies dictating the minimum encryption standards for different data types on laptops?" },
        { name: "keysManagedSecurely", label: "Are encryption keys managed, stored, and rotated securely to prevent compromise?" },
        // Section 4.1.2.2.2.2 Implementation and Coverage
        { name: "encryptionAutoEnabled", label: "Is encryption automatically enabled on all laptops (vs. manual activation)?" },
        { name: "allStorageEncrypted", label: "Are all storage devices, including external/USB drives, encrypted by default?" },
        { name: "uniformEncryptionProcess", label: "Are processes in place to ensure encryption is uniformly applied across all devices (new and reissued)?" },
        // Section 4.1.2.2.2.3 User Awareness and Training
        { name: "usersTrainedOnEncryption", label: "Are users trained on the importance of encryption and how to verify it?" },
        { name: "usersInformedBestPractices", label: "Are users informed about best practices for handling encrypted devices (e.g., strong passwords, avoiding unauthorized software)?" },
        { name: "periodicRefreshersProvided", label: "Are periodic refreshers or updates provided for ongoing user compliance and awareness?" },
        // Section 4.1.2.2.2.4 Compliance and Monitoring
        { name: "complianceMonitoredEnforced", label: "Is compliance with device encryption policies monitored and enforced?" },
        { name: "auditToolsUsed", label: "Are tools or systems used to regularly audit devices for correct encryption functioning?" },
        { name: "nonComplianceStepsDefined", label: "Are steps defined for handling non-compliant devices or disabled encryption?" },
        // Section 4.1.2.2.2.5 Data Recovery and Contingency Planning
        { name: "dataRecoveryProceduresExist", label: "Are procedures in place for data recovery from lost or damaged encrypted devices?" },
        { name: "secureDecommissioningHandled", label: "Is encryption handled securely during device decommissioning/repurposing to prevent data access?" },
        { name: "contingencyPlansForAccess", label: "Are there contingency plans to access encrypted data if users lose passwords/keys?" },
    ];


    return (
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Device Encryption Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Single title for the form section */}
                        <h2>Device Encryption Questions</h2>
                        {questions.map((question, index) => (
                             // Standard rendering block from securitygates
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
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
                                </div>
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                    className="comment-box"
                                />
                            </div>
                        ))}

                        {/* Image Upload Section */}
                        <div className="form-section">
                            <label>Upload Supporting Image (Optional):</label>
                            <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && !imageData && <img src={imageUrl} alt="Current" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                             {imageData && <img src={imageData} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                            {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default DeviceEncryptionPage;