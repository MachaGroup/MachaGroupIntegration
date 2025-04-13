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
const biometricScannerQuestions = [
    { name: "biometricScannersOperational", label: "Are the biometric scanners operational and functioning as intended?" },
    { name: "biometricCapture", label: "Do the scanners accurately capture and authenticate biometric data (e.g., fingerprints)?" },
    { name: "malfunction", label: "Are there any signs of malfunction or errors in scanner operations?" },
    { name: "backupSystems", label: "Are there backup systems in place in case of power outages or malfunctions?" },
    { name: "accessControlMethodsImplemented", label: "Are appropriate access control methods (enrollment, template management) used with biometric scanners?" },
    { name: "biometricEnrollment", label: "Are individuals required to enroll their biometric data for access?" },
    { name: "restrictedAccess", label: "Is access restricted to individuals whose biometric data matches stored records?" },
    { name: "updateRecordsProcess", label: "Is there a process to update/remove biometric records as needed (e.g., personnel changes)?" },
    { name: "integration", label: "Are the biometric scanners integrated with the overall access control system?" },
    { name: "communication", label: "Do they communicate seamlessly with access control software and databases?" },
    { name: "monitoring", label: "Is there real-time monitoring and logging of access events from scanners?" },
    { name: "centralManagement", label: "Are access rights managed centrally and synchronized with the biometric system?" },
    { name: "securityFeatures", label: "Are the scanners equipped with security features to prevent tampering or spoofing?" },
    { name: "antiSpoofing", label: "Do they employ anti-spoofing measures to detect fraudulent authentication attempts?" },
    { name: "physicalSecurity", label: "Are physical security measures in place to protect scanner components?" },
    { name: "compliance", label: "Do the biometric scanners comply with relevant regulations, standards, and best practices?" },
    { name: "regulatoryRequirementsMet", label: "Are specific regulatory requirements (e.g., privacy, data storage) for biometric systems being met?" },
    { name: "testingCertification", label: "Have the scanners undergone testing or certification for compliance?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, calibration, updates) performed?" },
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" },
    { name: "userTraining", label: "Have users (security, staff, individuals) received training on proper scanner usage?" },
    { name: "instructions", label: "Are instructions available regarding enrollment and access procedures?" },
    { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents?" },
];


function BiometricScannersPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Added hook call
  const { buildingId: contextBuildingId } = useBuilding(); // Renamed context variable
  const db = getFirestore();
  const functions = getFunctions();
  // Use consistent variable name 'uploadImage' and derive function string from filename
  const uploadImage = httpsCallable(functions, 'uploadBiometricScannersPageImage');

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentBuildingId, setCurrentBuildingId] = useState(null); // Added state for effective ID

  // Define Firestore path for this form
  const formDocPath = 'forms/Physical Security/Biometric Scanners'; // Correct path used

  // useEffect updated to handle URL params and context
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlBuildingId = queryParams.get('buildingId');
    const effectiveBuildingId = urlBuildingId || contextBuildingId;

    if (!effectiveBuildingId) {
        console.error("BiometricScannersPage: Building ID is missing from context and URL params.");
        alert('No building selected. Redirecting to Building Info...');
        navigate('/BuildingandAddress'); // Ensure path is correct
        return;
    }

    setCurrentBuildingId(effectiveBuildingId); // Set state
    console.log(`BiometricScannersPage: Using Building ID: ${effectiveBuildingId}`);

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
        const uploadResult = await uploadImage({ // Use 'uploadImage' variable
          imageData: imageData,
          buildingId: currentBuildingId, // Pass state variable
          formType: 'BiometricScanners' // Specify form type if needed
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
        ...formData, // Include latest form data
        imageUrl: finalImageUrl, // Use the determined final image URL
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
        <h1>Biometric Scanners Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Biometric Scanners Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {biometricScannerQuestions.map((question, index) => (
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
              <label htmlFor="imageUploadBiometric">Upload Supporting Image (Optional):</label>
              <input id="imageUploadBiometric" type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Biometric Scanner" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Biometric Scanner" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default BiometricScannersPage;