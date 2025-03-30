import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DocumentationOfPolicyChangesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDocumentationOfPolicyChangesImage = httpsCallable(functions, 'uploadDocumentationOfPolicyChangesImage');

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
                const formsRef = collection(db, 'forms/Policy and Compliance/Documentation Of Policy Changes');
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
            const formsRef = collection(db, 'forms/Policy and Compliance/Documentation Of Policy Changes');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });
            console.log('Form Data submitted successfully!');
            alert('Form Submitted successfully!');
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
                <h1>Documentation of Policy Changes Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.4.2.1.2 Documentation Of Policy Changes</h2>
                    {[
                        { name: "documentFormat", label: "5.4.2.1.2. Documentation Of Policy Changes: What format is used for documenting changes made to policies?", type: "text", placeholder: "Describe the format used for documenting changes", securityGatesFormat: true },
                        { name: "reasonDocumentation", label: "5.4.2.1.2. Documentation Of Policy Changes: How are the reasons for each policy change recorded?", type: "text", placeholder: "Describe how reasons for changes are documented", securityGatesFormat: true },
                        { name: "documentationResponsibility", label: "5.4.2.1.2. Documentation Of Policy Changes: Who is responsible for maintaining the documentation of policy changes?", type: "text", placeholder: "Describe the person or team responsible for maintaining documentation", securityGatesFormat: true },
                        { name: "historicalRecordAccess", label: "5.4.2.1.2. Documentation Of Policy Changes: How is the historical record of policy changes accessible to stakeholders?", type: "text", placeholder: "Describe how the historical record of policy changes is accessed", securityGatesFormat: true },
                        { name: "documentationUpdateProcedure", label: "5.4.2.1.2. Documentation Of Policy Changes: What procedures are in place to ensure that documentation is up-to-date and accurate?", type: "text", placeholder: "Describe procedures for keeping documentation up-to-date", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="text" name={question.name} placeholder={question.placeholder} onChange={handleChange} />
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

export default DocumentationOfPolicyChangesPage;