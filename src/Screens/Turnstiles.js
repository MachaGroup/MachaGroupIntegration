import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Ensure useLocation is imported
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Removed unused collection import
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const turnstilesQuestions = [
    { name: "turnstilesOperational", label: "Are the turnstiles operational and functioning as intended?" },
    { name: "turnstilesSmooth", label: "Do the turnstiles rotate smoothly without any mechanical issues?" },
    { name: "turnstilesDamage", label: "Are there any signs of wear or damage that could affect functionality or safety?" },
    { name: "backupSystemsTurnstiles", label: "Are there backup systems in place in case of power outages or malfunctions?" },
    { name: "accessControlImplemented", label: "Is access control (e.g., credentials, supervision) effectively implemented for the turnstiles?" },
    { name: "authMechanismsTurnstiles", label: "Are authentication mechanisms (RFID, barcode, biometric) used to restrict entry?" },
    { name: "integratedSystemsTurnstiles", label: "Are access control systems integrated with other security measures (cameras, alarms)?" },
    { name: "logEntriesTurnstiles", label: "Is there a log of entries and exits through the turnstiles for monitoring/auditing?" },
    { name: "safetyFeaturesTurnstiles", label: "Are safety features present (e.g., obstruction sensors, emergency stop)?" },
    { name: "antiTailgating", label: "Are the turnstiles equipped with anti-tailgating features?" },
    { name: "safetySignageTurnstiles", label: "Is there clear signage for safety procedures and precautions?" },
    { name: "complianceRegulationsTurnstiles", label: "Do the turnstiles comply with relevant safety and security regulations/standards?" },
    { name: "regulatoryRequirementsMet", label: "Are specific regulatory requirements or guidelines for turnstiles being met?" },
    { name: "inspectionsCertificationsTurnstiles", label: "Have the turnstiles undergone inspections or certifications for compliance?" },
    { name: "maintenanceScheduleTurnstiles", label: "Is there a regular maintenance schedule in place?" },
    { name: "maintenanceTasksTurnstiles", label: "Are scheduled maintenance tasks (lubrication, inspection, testing) performed?" },
    { name: "maintenanceRecordsTurnstiles", label: "Are records documenting maintenance activities, repairs, and issues kept?" },
    { name: "userTrainingTurnstiles", label: "Have users (staff, visitors) received training on safe and effective turnstile use?" },
    { name: "instructionsGuidelinesTurnstiles", label: "Are instructions or guidelines available to users regarding proper usage and emergency procedures?" },
    { name: "reportingProcessTurnstiles", label: "Is there a process for reporting malfunctions, damage, or security incidents?" },
];


function TurnstilesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { buildingId: contextBuildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Correct callable function name for Turnstiles
  const uploadImage = httpsCallable(functions, 'uploadTurnstilesImage'); // Corrected variable name to uploadImage

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentBuildingId, setCurrentBuildingId] = useState(null);

  // Define Firestore path for Turnstiles
  const formDocPath = 'forms/Physical Security/Turnstiles';

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlBuildingId = queryParams.get('buildingId');
    const effectiveBuildingId = urlBuildingId || contextBuildingId;

    if (!effectiveBuildingId) {
        console.error("TurnstilesPage: Building ID is missing from context and URL params.");
        alert('No building selected. Redirecting to Building Info...');
        navigate('/BuildingandAddress'); // Ensure this route exists and is correct
        return;
    }

    setCurrentBuildingId(effectiveBuildingId); // Set the state
    console.log(`TurnstilesPage: Using Building ID: ${effectiveBuildingId}`);

    const fetchFormData = async () => {
        setLoading(true);
        setLoadError(null);
        setImageUrl(null); // Reset image URL on data fetch

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
                setFormData({}); // Start with empty form if no data exists
            }
        } catch (error) {
            console.error("Error fetching form data:", error);
            setLoadError("Failed to load form data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    fetchFormData(); // Call the fetch function

  // Corrected dependency array
  }, [location.search, contextBuildingId, db, navigate, formDocPath]);

  // handleChange saves data immediately, using currentBuildingId
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Use currentBuildingId from state here
    if (currentBuildingId) {
        try {
            // Use currentBuildingId
            const buildingRef = doc(db, 'Buildings', currentBuildingId);
            // Use currentBuildingId and formDocPath
            const formDocRef = doc(db, formDocPath, currentBuildingId);
            // Include existing imageUrl in auto-save unless a new one is being uploaded
            // Note: Image handling primarily occurs in handleSubmit
            const dataToSave = {
                 ...newFormData,
                 building: buildingRef,
                 imageUrl: imageUrl // Persist the current known image URL
            };
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            // console.log("Form data updated:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            // Avoid alerting on every change for better UX
        }
    } else {
        console.warn("handleChange called but currentBuildingId is not set.");
    }
  };

  // handleImageChange using base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result); // Base64 data for upload
            setImageUrl(null); // Clear existing final URL
            setImageUploadError(null); // Clear previous errors
        };
        reader.readAsDataURL(file);
    } else {
        setImageData(null); // Clear image data if no file selected
    }
  };

  // handleBack - Navigates back
  const handleBack = () => {
    navigate(-1);
  };

  // handleSubmit uses Cloud Function and setDoc with correct structure and currentBuildingId
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use currentBuildingId from state here
    if (!currentBuildingId) {
      alert('Building ID is missing. Cannot submit.');
      return;
    }

    setLoading(true); // Indicate submission start
    let finalImageUrl = imageUrl; // Assume current URL unless new image uploaded successfully
    let submissionError = null;

    // Upload new image if imageData (base64) exists
    if (imageData) {
      try {
        console.log("Uploading image via Cloud Function...");
        // Use the correct callable function variable 'uploadImage'
        const uploadResult = await uploadImage({
          imageData: imageData,
          buildingId: currentBuildingId, // Pass currentBuildingId
          formType: 'Turnstiles' // Add formType if needed by function
        });
        finalImageUrl = uploadResult.data.imageUrl;
        setImageUrl(finalImageUrl); // Update state with new URL
        setImageUploadError(null);
        console.log("Image uploaded successfully:", finalImageUrl);
      } catch (error) {
        console.error('Error uploading image via function:', error);
        setImageUploadError(`Image upload failed: ${error.message}`);
        submissionError = "Image upload failed. Form data saved without new image.";
         finalImageUrl = imageUrl || null; // Revert to original URL on failure
      }
    }

    // Prepare final data including the correct image URL
    const finalFormData = {
        ...formData, // Include latest form data
        imageUrl: finalImageUrl, // Use the determined final image URL
    };
    // Update state one last time before saving (optional, but reflects final data)
    setFormData(finalFormData);

    try {
      console.log("Saving final form data to Firestore...");
      // Use currentBuildingId
      const buildingRef = doc(db, 'Buildings', currentBuildingId);
      // Use currentBuildingId and formDocPath
      const formDocRef = doc(db, formDocPath, currentBuildingId);
      // Save the final data under the 'formData' key, including the building reference
      await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

      console.log('Form data submitted successfully!');
      if (!submissionError) {
          alert('Form submitted successfully!');
      } else {
          alert(submissionError); // Inform user if image failed but data saved
      }
      navigate('/Form'); // Navigate after successful submission
    } catch (error) {
      console.error("Error saving final form data to Firestore:", error);
      alert("Failed to save final form data. Please check connection and try again.");
    } finally {
      setLoading(false); // Ensure loading indicator stops
    }
  };

  // Corrected Loading/Error Display check
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
        <h1>Turnstiles Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Turnstiles Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {turnstilesQuestions.map((question, index) => (
            <div key={index} className="form-section">
              <label htmlFor={`${question.name}_yes`}>{question.label}</label> {/* Point label to an input for accessibility */}
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
              <label htmlFor="imageUploadTurnstile">Upload Supporting Image (Optional):</label>
              <input id="imageUploadTurnstile" type="file" onChange={handleImageChange} accept="image/*" />
              {/* Display logic for existing or preview image */}
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Turnstile" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Turnstile" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default TurnstilesPage;