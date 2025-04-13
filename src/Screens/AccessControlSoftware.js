import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const accessControlSoftwareQuestions = [
    // Functionality and Features
    { name: "comprehensiveFunctionality", label: "Does the access control software provide comprehensive functionality for managing access?" }, // Simplified label
    { name: "centralManagement", label: "Can it centrally manage permissions for individuals, groups, and access points?" }, // Simplified label
    { name: "authenticationMethods", label: "Does it support various authentication methods (cards, biometrics, PINs)?" }, // Simplified label
    { name: "realTimeMonitoring", label: "Are there features for real-time monitoring, reporting, and auditing of access events?" },
    // Integration with Hardware
    { name: "hardwareCompatibility", label: "Is the software compatible with required hardware (readers, scanners, locks)?" }, // Simplified label
    { name: "integrationInfrastructure", label: "Does it seamlessly integrate with existing security infrastructure (cameras, alarms)?" },
    // Adapted from standalone text input
    { name: "compatibilityIssuesIdentified", label: "Are any compatibility issues or limitations identified that need addressing?" },
    // Security and Encryption
    { name: "encryptionSecurity", label: "Does the software employ robust encryption and security protocols?" }, // Simplified label
    { name: "securePoliciesStorage", label: "Are access policies and credentials securely stored and transmitted?" }, // Simplified label - Renamed 'securePolicies'
    { name: "multiFactorAuthSupport", label: "Is there support for multi-factor authentication?" }, // Simplified label - Renamed 'multiFactorAuth'
    // Scalability and Flexibility
    { name: "scalability", label: "Can the software scale to accommodate organizational growth?" }, // Simplified label
    { name: "flexibility", label: "Does it offer flexibility in configuring access rules and permissions?" }, // Simplified label
    { name: "adaptability", label: "Is it adaptable to changes in policies, personnel, and protocols?" }, // Simplified label
    // User Interface and Ease of Use
    { name: "userInterfaceIntuitive", label: "Is the user interface intuitive and easy to navigate?" }, // Simplified label - Renamed 'userInterface'
    { name: "customization", label: "Are there features for customizing dashboards, reports, and workflows?" },
    { name: "userDocumentation", label: "Does the software provide comprehensive user documentation and training resources?" },
    // Compliance with Regulations
    { name: "compliance", label: "Does the software comply with relevant regulations, standards, and best practices?" },
     // Adapted from standalone text input
    { name: "regulatoryRequirementsMet", label: "Are specific requirements/guidelines for access control software being met?" },
    { name: "testingCertification", label: "Has the software undergone testing or certification for compliance?" },
    // Maintenance and Support
    { name: "supportSystem", label: "Is there a reliable support system for troubleshooting and updates?" }, // Simplified label
    { name: "sla", label: "Are maintenance agreements or SLAs in place for timely support?" }, // Simplified label
    { name: "disasterRecovery", label: "Are regular backups and disaster recovery plans in place for access control data?" },
];


function AccessControlSoftwarePage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadAccessControlSoftwareImage = httpsCallable(functions, 'uploadAccessControlSoftwareImage');

  // State variables look good
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // useEffect for fetching data - Looks good
  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress'); // Ensure path is correct
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
      // Correct Firestore path
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);

      try {
        const docSnapshot = await getDoc(formDocRef);
        if (docSnapshot.exists()) {
          const existingData = docSnapshot.data().formData || {};
          setFormData(existingData);
           if (existingData.imageUrl) { // Load existing image URL
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

  // handleChange saves data immediately with correct structure
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (buildingId) {
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);
            const dataToSave = {
                 ...newFormData,
                 building: buildingRef,
                 ...(imageUrl && { imageUrl: imageUrl }) // Include existing imageUrl
             };
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            // console.log("Form data updated:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            // Avoid alerting on every change
        }
    }
  };

  // handleImageChange using base64 - Looks good
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

  // handleBack - Looks good
  const handleBack = () => {
    navigate(-1);
  };

  // handleSubmit uses Cloud Function and setDoc with correct structure
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
        // Use correct function variable name
        const uploadResult = await uploadAccessControlSoftwareImage({
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
         imageUrl: finalImageUrl,
    };
    setFormData(finalFormData); // Update state to final version

    try {
      console.log("Saving final form data to Firestore...");
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);
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
    } finally {
      setLoading(false);
    }
  };

  // Loading/Error Display - Looks good
  if (loading) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return <div>Error: {loadError}</div>;
  }

  return (
    // Removed extra outer div
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        {/* Title might need adjustment if the number prefix is not desired */}
        <h1>1.1.1.2.3. Access Control Software Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Access Control Software Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {accessControlSoftwareQuestions.map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {/* Div for radio buttons */}
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
              {/* Input for comments */}
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

          {/* Image upload section - Looks good */}
          <div className="form-section">
              <label htmlFor="imageUploadAccessSoftware">Upload Image (Optional):</label>
              <input id="imageUploadAccessSoftware" type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Access Control Software related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Access Control Software related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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
 export default AccessControlSoftwarePage;