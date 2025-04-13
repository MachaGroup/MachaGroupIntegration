import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const turnstilesQuestions = [
    { name: "turnstilesOperational", label: "Are the turnstiles operational and functioning as intended?" },
    { name: "turnstilesSmooth", label: "Do the turnstiles rotate smoothly without any mechanical issues?" },
    // Adapted from text input
    { name: "turnstilesDamage", label: "Are there any signs of wear or damage that could affect functionality or safety?" },
    { name: "backupSystemsTurnstiles", label: "Are there backup systems in place in case of power outages or malfunctions?" },
    // Adapted from text input
    { name: "accessControlImplemented", label: "Is access control (e.g., credentials, supervision) effectively implemented for the turnstiles?" },
    { name: "authMechanismsTurnstiles", label: "Are authentication mechanisms (RFID, barcode, biometric) used to restrict entry?" }, // Simplified label
    { name: "integratedSystemsTurnstiles", label: "Are access control systems integrated with other security measures (cameras, alarms)?" }, // Simplified label
    { name: "logEntriesTurnstiles", label: "Is there a log of entries and exits through the turnstiles for monitoring/auditing?" }, // Simplified label
    { name: "safetyFeaturesTurnstiles", label: "Are safety features present (e.g., obstruction sensors, emergency stop)?" }, // Simplified label
    { name: "antiTailgating", label: "Are the turnstiles equipped with anti-tailgating features?" }, // Simplified label
    { name: "safetySignageTurnstiles", label: "Is there clear signage for safety procedures and precautions?" }, // Simplified label
    { name: "complianceRegulationsTurnstiles", label: "Do the turnstiles comply with relevant safety and security regulations/standards?" },
     // Adapted from text input
    { name: "regulatoryRequirementsMet", label: "Are specific regulatory requirements or guidelines for turnstiles being met?" },
    { name: "inspectionsCertificationsTurnstiles", label: "Have the turnstiles undergone inspections or certifications for compliance?" }, // Simplified label
    { name: "maintenanceScheduleTurnstiles", label: "Is there a regular maintenance schedule in place?" }, // Simplified label
    { name: "maintenanceTasksTurnstiles", label: "Are scheduled maintenance tasks (lubrication, inspection, testing) performed?" }, // Simplified label
    { name: "maintenanceRecordsTurnstiles", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "userTrainingTurnstiles", label: "Have users (staff, visitors) received training on safe and effective turnstile use?" }, // Simplified label
    { name: "instructionsGuidelinesTurnstiles", label: "Are instructions or guidelines available to users regarding proper usage and emergency procedures?" },
    { name: "reportingProcessTurnstiles", label: "Is there a process for reporting malfunctions, damage, or security incidents?" }, // Simplified label
];


function TurnstilesPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity, matches function name string
  const uploadTurnstilesImage = httpsCallable(functions, 'uploadTurnstilesImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);
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
        const uploadResult = await uploadTurnstilesImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);
      // Save the final data under the 'formData' key, including the building reference
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
        <h1>Turnstiles Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Turnstiles Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {turnstilesQuestions.map((question, index) => (
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
              <label htmlFor="imageUploadTurnstile">Upload Image (Optional):</label>
              <input id="imageUploadTurnstile" type="file" onChange={handleImageChange} accept="image/*" />
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