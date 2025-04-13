import React, { useState, useEffect } from 'react';
// Added useLocation import
import { useNavigate, useLocation } from 'react-router-dom';
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
    { name: "malfunctionSignsObserved", label: "Are there any signs of malfunction or system errors observed that could compromise security?" },
    { name: "authMechanismsImplemented", label: "Are appropriate authentication mechanisms (e.g., RFID, PIN, biometric) implemented and utilized?" },
    { name: "mechanismsReliable", label: "Are these mechanisms reliable and secure for verifying individuals' identities?" },
    { name: "multiFactor", label: "Is multi-factor authentication implemented to enhance security?" },
    { name: "accessRightsProcessDefined", label: "Is there a defined process for assigning and managing access rights based on roles/responsibilities?" },
    { name: "processDefined", label: "Is there a defined process for granting, modifying, or revoking access permissions?" },
    { name: "accessReviewed", label: "Are access rights regularly reviewed and updated?" },
    { name: "systemsIntegrated", label: "Are the Access Control Systems integrated with other security systems (cameras, alarms)?" },
    { name: "integrationEffective", label: "Does the integration with other systems enhance overall security effectively?" },
    { name: "integrationIssuesIdentified", label: "Are any compatibility issues or gaps in integration identified that need addressing?" },
    { name: "monitoringSystem", label: "Is there a centralized monitoring system in place for access control events?" },
    { name: "accessLogsGenerated", label: "Are access logs generated and maintained to track user activity?" },
    { name: "logsReviewProcess", label: "Is there a process for reviewing access logs and investigating suspicious incidents?" },
    { name: "complianceRegs", label: "Do the systems comply with relevant regulations and standards (e.g., GDPR, HIPAA, ISO 27001)?" },
    { name: "auditsConducted", label: "Have the systems undergone audits or assessments to verify compliance?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place?" },
    { name: "maintenanceTasksPerformed", label: "Are scheduled maintenance tasks (updates, inspections, backups) performed?" },
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" },
    { name: "userTraining", label: "Have users (security, admins, end-users) received training on system usage?" },
    { name: "instructionsGuidelinesAvailable", label: "Are instructions/guidelines available regarding procedures, password management, and security awareness?" },
    { name: "reportingProcess", label: "Is there a process for reporting system errors, suspicious activities, or security incidents?" }
];


function AccessControlSystemsPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Added hook call
  const { buildingId: contextBuildingId } = useBuilding(); // Renamed context variable
  const db = getFirestore();
  const functions = getFunctions();
  // Use consistent variable name 'uploadImage' and correct function string
  const uploadImage = httpsCallable(functions, 'uploadAccessControlSystemsImage');

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentBuildingId, setCurrentBuildingId] = useState(null); // Added state for effective ID

  // Define Firestore path for this form
  const formDocPath = 'forms/Physical Security/Access Control Systems';

  // useEffect updated to handle URL params and context
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlBuildingId = queryParams.get('buildingId');
    const effectiveBuildingId = urlBuildingId || contextBuildingId;

    if (!effectiveBuildingId) {
        console.error("AccessControlSystemsPage: Building ID is missing from context and URL params.");
        alert('No building selected. Redirecting to Building Info...');
        navigate('/BuildingandAddress'); // Ensure path is correct
        return;
    }

    setCurrentBuildingId(effectiveBuildingId); // Set state
    console.log(`AccessControlSystemsPage: Using Building ID: ${effectiveBuildingId}`);

    const fetchFormData = async () => {
        setLoading(true);
        setLoadError(null);
        setImageUrl(null); // Reset image URL

        try {
            // Use effectiveBuildingId here
            const formDocRef = doc(db, formDocPath, effectiveBuildingId);
            const docSnapshot = await getDoc(formDocRef);
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setFormData(data.formData || {});
              // Set existing image URL from fetched data
              if (data.formData && data.formData.imageUrl) {
                 setImageUrl(data.formData.imageUrl);
              }
            } else {
              setFormData({}); // Start fresh
            }
        } catch (error) {
            console.error("Error fetching form data:", error);
            setLoadError("Failed to load form data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    fetchFormData();

  // Corrected dependency array
  }, [location.search, contextBuildingId, db, navigate, formDocPath]);

  // handleChange updated to use currentBuildingId
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Use currentBuildingId from state
    if (currentBuildingId) {
        try {
            const buildingRef = doc(db, 'Buildings', currentBuildingId); // Use state variable
            const formDocRef = doc(db, formDocPath, currentBuildingId); // Use state variable
            const dataToSave = {
                 ...newFormData,
                 building: buildingRef,
                 imageUrl: imageUrl // Persist current known image URL
            };
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            // console.log("Form data updated:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            // Avoid alerting on every change
        }
    } else {
         console.warn("handleChange called but currentBuildingId is not set.");
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

  // handleSubmit updated to use currentBuildingId
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use currentBuildingId from state
    if (!currentBuildingId) {
      alert('Building ID is missing. Cannot submit.');
      return;
    }

    setLoading(true);
    let finalImageUrl = imageUrl; // Start with current URL
    let submissionError = null;

    if (imageData) {
      try {
        console.log("Uploading image via Cloud Function...");
        // Use correct function variable name 'uploadImage' and pass currentBuildingId
        const uploadResult = await uploadImage({
          imageData: imageData,
          buildingId: currentBuildingId, // Pass state variable
          formType: 'AccessControlSystems' // Specify form type if needed
         });
        finalImageUrl = uploadResult.data.imageUrl;
        setImageUrl(finalImageUrl); // Update state with new URL
        setImageUploadError(null);
        console.log("Image uploaded successfully:", finalImageUrl);
      } catch (error) {
        console.error('Error uploading image via function:', error);
        setImageUploadError(`Image upload failed: ${error.message}`);
        submissionError = "Image upload failed. Form data saved without new image.";
         finalImageUrl = imageUrl || null; // Revert on failure
      }
    }

    // Prepare final data
    const finalFormData = {
        ...formData,
        imageUrl: finalImageUrl,
    };
    setFormData(finalFormData); // Update state before final save

    try {
      console.log("Saving final form data to Firestore...");
      // Use currentBuildingId from state
      const buildingRef = doc(db, 'Buildings', currentBuildingId);
      const formDocRef = doc(db, formDocPath, currentBuildingId);
      // Save final data under 'formData' key
      await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

      console.log('Form data submitted successfully!');
      if (!submissionError) {
          alert('Form submitted successfully!');
      } else {
          alert(submissionError);
      }
      navigate('/Form'); // Adjust as needed
    } catch (error) {
      console.error("Error saving final form data to Firestore:", error);
      alert("Failed to save final form data. Please check connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Updated Loading/Error Display check
  if (loading || !currentBuildingId) {
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
              <label htmlFor={`${question.name}_yes`}>{question.label}</label> {/* Point label to an input */}
              {/* Div for radio buttons */}
              <div>
                <input
                  type="radio"
                  id={`${question.name}_yes`} // Unique ID
                  name={question.name}
                  value="yes"
                  checked={formData[question.name] === "yes"}
                  onChange={handleChange}
                /> <label htmlFor={`${question.name}_yes`} style={{ marginRight: '10px' }}>Yes</label> {/* Label next to input */}
                <input
                  type="radio"
                  id={`${question.name}_no`} // Unique ID
                  name={question.name}
                  value="no"
                  checked={formData[question.name] === "no"}
                  onChange={handleChange}
                /> <label htmlFor={`${question.name}_no`}>No</label> {/* Label next to input */}
              </div>
              {/* Input for comments */}
              <input
                className='comment-box' // Use consistent class name
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
              <label htmlFor="imageUploadAccessControl">Upload Supporting Image (Optional):</label>
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