import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const accessControlQuestions = [
    { name: "accessControlOperational", label: "Are the Access Control Systems operational and functioning as intended?" },
    { name: "authAccurate", label: "Do the systems accurately authenticate and authorize individuals' access rights?" },
    // Adapted from text input
    { name: "malfunctionSignsObserved", label: "Are there any signs of malfunction or system errors observed that could compromise security?" },
    // Adapted from text input
    { name: "authMechanismsImplemented", label: "Are appropriate authentication mechanisms (e.g., RFID, PIN, biometric) implemented and utilized?" },
    { name: "mechanismsReliable", label: "Are these mechanisms reliable and secure for verifying individuals' identities?" },
    { name: "multiFactor", label: "Is multi-factor authentication implemented to enhance security?" }, // Simplified label
    // Adapted from text input
    { name: "accessRightsProcessDefined", label: "Is there a defined process for assigning and managing access rights based on roles/responsibilities?" },
    { name: "processDefined", label: "Is there a defined process for granting, modifying, or revoking access permissions?" }, // Simplified label
    { name: "accessReviewed", label: "Are access rights regularly reviewed and updated?" }, // Simplified label
    { name: "systemsIntegrated", label: "Are the Access Control Systems integrated with other security systems (cameras, alarms)?" }, // Simplified label
    // Adapted from text input
    { name: "integrationEffective", label: "Does the integration with other systems enhance overall security effectively?" },
    // Adapted from text input
    { name: "integrationIssuesIdentified", label: "Are any compatibility issues or gaps in integration identified that need addressing?" },
    { name: "monitoringSystem", label: "Is there a centralized monitoring system in place for access control events?" }, // Simplified label
    { name: "accessLogsGenerated", label: "Are access logs generated and maintained to track user activity?" }, // Simplified label
    { name: "logsReviewProcess", label: "Is there a process for reviewing access logs and investigating suspicious incidents?" }, // Simplified label
    { name: "complianceRegs", label: "Do the systems comply with relevant regulations and standards (e.g., GDPR, HIPAA, ISO 27001)?" }, // Simplified label
    { name: "auditsConducted", label: "Have the systems undergone audits or assessments to verify compliance?" }, // Simplified label
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place?" }, // Simplified label
    { name: "maintenanceTasksPerformed", label: "Are scheduled maintenance tasks (updates, inspections, backups) performed?" }, // Simplified label
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "userTraining", label: "Have users (security, admins, end-users) received training on system usage?" }, // Simplified label
    { name: "instructionsGuidelinesAvailable", label: "Are instructions/guidelines available regarding procedures, password management, and security awareness?" }, // Simplified label
    { name: "reportingProcess", label: "Is there a process for reporting system errors, suspicious activities, or security incidents?" } // Simplified label
];


function AccessControlSystemsPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadAccessControlSystemsImage = httpsCallable(functions, 'uploadAccessControlSystemsImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);

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

  // handleChange saves data immediately with correct structure
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (buildingId) {
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);
            const dataToSave = {
                 ...newFormData,
                 building: buildingRef,
                 ...(imageUrl && { imageUrl: imageUrl })
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
        const uploadResult = await uploadAccessControlSystemsImage({
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
    setFormData(finalFormData);

    try {
      console.log("Saving final form data to Firestore...");
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);
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
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Access Control Systems Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Access Control Systems Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {accessControlQuestions.map((question, index) => (
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
              <label htmlFor="imageUploadAccessControl">Upload Image (Optional):</label>
              <input id="imageUploadAccessControl" type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Access Control System" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Access Control System" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default AccessControlSystemsPage;