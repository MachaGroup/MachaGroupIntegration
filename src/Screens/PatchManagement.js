import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PatchManagementPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Variable name and function name string already match the desired pattern
    const uploadImage = httpsCallable(functions, 'uploadPatchManagementPageImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Consistent Firestore path definition
    const formDocPath = 'forms/Cybersecurity/Patch Management';

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Adjust if route differs
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null); // Reset image URL on load

            try {
                // Use direct doc path with buildingId
                const formDocRef = doc(db, formDocPath, buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                     // Load existing image URL
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

    // handleChange with auto-save
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, formDocPath, buildingId);
                // Persist current imageUrl along with other form data
                await setDoc(formDocRef, {
                     formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl }
                     }, { merge: true });
                console.log("Form data auto-saved:", { ...newFormData, building: buildingRef, imageUrl: imageUrl });
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Consider less intrusive error handling for auto-save
                // alert("Failed to save changes. Please check your connection and try again.");
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
                setImageUrl(null); // Clear existing final URL
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

    // handleSubmit using httpsCallable and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        let finalImageUrl = imageUrl; // Start with current URL

        // Upload new image if present
        if (imageData) {
            setLoading(true);
            setImageUploadError(null);
            try {
                // Pass necessary identifiers if Cloud Function needs them
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: buildingId, formType: 'PatchManagement' });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update state with the confirmed URL
                console.log('Image uploaded successfully:', finalImageUrl);
                // Update formData state locally immediately after successful upload
                // setFormData(prev => ({ ...prev, imageUrl: finalImageUrl }));
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false);
                return; // Prevent form submission if image upload fails
            } finally {
                 setLoading(false);
            }
        }

        // Save final form data
        try {
            setLoading(true);
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, formDocPath, buildingId);
            // Ensure the final data includes the correct image URL
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Navigate on success
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit form. Please check your connection and try again.");
            setLoading(false); // Stop loading indicator on error
        }
    };

    // Conditional Loading/Error display
    if (loading && !Object.keys(formData).length) { // Refined loading condition
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Consolidate all questions into one array
    const questions = [
         // 4.1.2.2.1.1 Timeliness and Efficiency
        { name: "patchesAppliedQuickly", label: "Are patches and security updates applied to devices quickly once released by vendors?" },
        { name: "automatedPatchSystemsInPlace", label: "Are there automated systems to regularly check for and deploy patches across all devices?" },
        { name: "criticalPatchProcessExists", label: "Are processes in place to ensure critical patches are prioritized and installed without delay?" },
         // 4.1.2.2.1.2 Coverage and Scope
        { name: "patchStrategyCoversAll", label: "Does the patch management strategy cover all OS, applications, and firmware?" },
        { name: "thirdPartyAppsManaged", label: "Are third-party applications effectively managed with a comprehensive inventory for updates?" },
        { name: "remoteDevicesUpdatedTimely", label: "Are there mechanisms ensuring timely updates for both on-premises and remote devices?" },
        // 4.1.2.2.1.3 Testing and Validation
        { name: "patchesTestedBeforeDeployment", label: "Is there a procedure for testing patches in a controlled environment before deployment?" },
        { name: "patchValidationSuccessful", label: "Are patches validated to confirm successful installation, with steps for failures?" },
        { name: "rollbackPlansExist", label: "Are rollback plans in place if a patch causes unforeseen issues?" },
        // 4.1.2.2.1.4 Compliance and Reporting
        { name: "processEnsuresCompliance", label: "Does the patch management process ensure compliance with relevant regulations (e.g., GDPR, HIPAA, PCI-DSS)?" },
        { name: "auditTrailsDocumentStatus", label: "Are there audit trails and reporting mechanisms documenting patch status for all devices?" },
        { name: "reportsReviewedRegularly", label: "Are patch management reports reviewed regularly by responsible parties to ensure compliance?" },
        // 4.1.2.2.1.5 Security and Risk Management
        { name: "patchesPrioritizedByRisk", label: "Are patches prioritized based on vulnerability severity and system criticality?" },
        { name: "patchManagementIntegratedCybersecurity", label: "Is patch management integrated into the broader cybersecurity strategy?" },
        { name: "emergencyPatchProceduresExist", label: "Are there procedures for handling emergency/out-of-band patches (e.g., zero-days)?" },
    ];


    return (
        <div className="form-page"> {/* Consider removing outer div if not needed */}
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Patch Management Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Single heading for the form */}
                    <h2>Patch Management Questions</h2>
                    {questions.map((question, index) => (
                        // Standard question block rendering
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
                                className="comment-box" // Standard class for comments
                            />
                        </div>
                    ))}

                    {/* Image Upload Section */}
                    <div className="form-section">
                        <label>Upload Supporting Image (Optional):</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                         {/* Display logic for existing or preview image */}
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
    );
}

export default PatchManagementPage;