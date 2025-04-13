import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const vehicleBarrierQuestions = [
    { name: "barriersOperational", label: "Are the vehicle barriers operational and functioning as intended?" },
    { name: "barriersBlockAccess", label: "Do the barriers effectively block vehicle access to restricted areas?" },
    // Adapted from text input
    { name: "barriersDamage", label: "Are there any signs of damage, wear, or malfunction in the barrier mechanisms?" },
    { name: "barriersBackup", label: "Are there backup systems in place for power outages or mechanical failures?" }, // Simplified label
    { name: "barriersWithstandImpact", label: "Are the barriers designed and constructed to withstand vehicle impact?" }, // Simplified label
    { name: "barriersCrashRated", label: "Do they meet relevant crash-rated standards or certifications?" }, // Simplified label
    { name: "barriersDesignFeatures", label: "Are design features present to minimize vehicle bypass or circumvention?" }, // Simplified label
    // Adapted from text input
    { name: "barriersIntegrationEffective", label: "Are the vehicle barriers effectively integrated with access control systems?" },
    { name: "barriersRemoteActivation", label: "Are mechanisms available for remote or automatic barrier activation?" }, // Simplified label
    { name: "barriersRestrictedAccess", label: "Is access to the barrier controls restricted to authorized personnel?" }, // Simplified label
    { name: "barriersSafetyFeatures", label: "Are safety features in place to prevent accidents or injuries?" }, // Simplified label - Renamed 'barriersSafety'
    { name: "barriersWarningSignals", label: "Are barriers equipped with warning lights, sirens, or other signals?" }, // Simplified label
    { name: "barriersPhysicalSignage", label: "Are physical barriers or signage present to prevent pedestrian entry to the barrier zone?" },
    { name: "barriersMaintenanceSchedule", label: "Is there a regular maintenance schedule in place?" }, // Simplified label
    { name: "barriersMaintenanceTasks", label: "Are scheduled maintenance tasks (lubrication, inspection, testing) performed?" }, // Simplified label
    { name: "barriersMaintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "barriersCompliance", label: "Do the barriers comply with relevant regulations, standards, and best practices?" }, // Simplified label
    // Adapted from text input
    { name: "barriersRegulatoryRequirementsMet", label: "Are specific requirements or guidelines for vehicle barriers being met?" },
    { name: "barriersTesting", label: "Have the barriers undergone testing or certification for compliance?" }, // Simplified label
    { name: "barriersEmergencyPlan", label: "Is there a contingency plan for emergencies (e.g., vehicle attacks)?" }, // Simplified label
    { name: "barriersEmergencyTraining", label: "Are personnel trained on emergency procedures for barrier activation/deactivation?" }, // Simplified label
    { name: "barriersEmergencyResponseCoord", label: "Is there coordination with responders for security incidents involving barriers?" }, // Simplified label - Renamed 'barriersEmergencyResponse'
];


function VehicleBarriersPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadVehicleBarriersImage = httpsCallable(functions, 'uploadVehicleBarriersImage');

  // State variables look good
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // useEffect fetching data - Corrected path (assuming plural)
  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress'); // Ensure path is correct
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
      // Corrected Firestore path to 'Vehicle Barriers' (plural) - VERIFY THIS PATH
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barriers', buildingId);

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

  // handleChange saves data immediately with correct structure and path
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (buildingId) {
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Corrected Firestore path to 'Vehicle Barriers' (plural) - VERIFY THIS PATH
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barriers', buildingId);
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

  // handleSubmit uses Cloud Function and setDoc with correct structure and path
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
        const uploadResult = await uploadVehicleBarriersImage({
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
       // Corrected Firestore path to 'Vehicle Barriers' (plural) - VERIFY THIS PATH
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barriers', buildingId);
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
        <h1>1.1.2.1.2. Vehicle Barriers Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Vehicle Barriers Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {vehicleBarrierQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadVehicleBarrier">Upload Image (Optional):</label>
               <input id="imageUploadVehicleBarrier" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Vehicle Barrier" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Vehicle Barrier" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default VehicleBarriersPage;