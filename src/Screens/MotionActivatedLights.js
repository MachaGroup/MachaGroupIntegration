import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const motionLightsQuestions = [
    // Placement and Coverage
    { name: "strategicPlacement", label: "Are motion-activated lights strategically placed around the perimeter for adequate coverage?" }, // Simplified
    { name: "keyAreasIllumination", label: "Do lights illuminate key areas susceptible to unauthorized access (entry points, blind spots)?" }, // Simplified
    // Adapted from text input
    { name: "insufficientCoverageIdentified", label: "Are any areas identified where lighting coverage is insufficient?" },
    // Sensor Sensitivity and Range
    { name: "sensorConfiguration", label: "Are motion sensors configured to detect movement effectively within the designated range?" },
    { name: "movementDifferentiation", label: "Do sensors differentiate between legitimate movement and potential intrusions?" }, // Simplified
    { name: "sensorAdjustments", label: "Are sensor sensitivity/range adjustments available and optimized?" }, // Simplified
    // Timing and Duration
    { name: "lightProgramming", label: "Are lights programmed for prompt activation and sufficient illumination duration?" }, // Simplified
    { name: "timingAdjustments", label: "Is timing/duration adjusted for varying conditions (day/night)?" }, // Simplified
    { name: "customizableSettings", label: "Are timing/duration settings customizable based on security requirements?" }, // Simplified
    // Brightness and Visibility
    { name: "brightness", label: "Are the lights sufficiently bright for effective illumination?" }, // Simplified
    { name: "visibilityWithoutGlare", label: "Do they provide clear visibility without causing glare or obscuring shadows?" },
    { name: "tamperingPrevention", label: "Are measures in place to prevent tampering/vandalism of light fixtures?" }, // Simplified
    // Integration with Security Systems
    { name: "integrationSecuritySystems", label: "Are lights integrated with other security systems (cameras, IDS)?" }, // Simplified
    { name: "triggerAlert", label: "Do motion activations trigger recording or alerting mechanisms?" }, // Simplified
    { name: "lightingCoordination", label: "Is there coordination between lighting controls and security personnel response?" }, // Simplified
    // Energy Efficiency
    { name: "energyEfficiency", label: "Are the lights energy-efficient (e.g., LED)?" }, // Simplified
    { name: "optimizeEnergy", label: "Are controls available to optimize energy consumption?" }, // Simplified
    { name: "monitorEnergy", label: "Is energy usage monitored for efficiency improvements?" }, // Simplified
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for the lights?" }, // Simplified
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, bulb replacement, inspection) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
];


function MotionActivatedLightsPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadMotionActivatedLightsPageImage = httpsCallable(functions, 'uploadMotionActivatedLightsPageImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);
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
        const uploadResult = await uploadMotionActivatedLightsPageImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);
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
        {/* Title might need adjustment */}
        <h1>1.1.2.2.1. Motion-Activated Lights Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Motion-Activated Lights Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {motionLightsQuestions.map((question, index) => (
            // Using question.name as key assumes names are unique and stable
            <div key={question.name} className="form-section">
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
               <label htmlFor="imageUploadMotionLights">Upload Image (Optional):</label>
               <input id="imageUploadMotionLights" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Motion Light" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Motion Light" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default MotionActivatedLightsPage;