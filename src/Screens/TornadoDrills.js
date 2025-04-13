import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const tornadoDrillQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "conductedTornadoDrillsRegularly", label: "Are tornado drills conducted regularly?" },
    { name: "drillSchedulingRegularity", label: "Are drills scheduled regularly for occupant familiarity?" }, // Simplified
    { name: "drillTimingVariability", label: "Are drills conducted at different times to account for varying occupancy/shifts?" }, // Simplified
    { name: "drillInitiationProtocol", label: "Is there a protocol for initiating drills and notifying occupants?" }, // Simplified
    { name: "notificationMethodTesting", label: "Are notification methods tested during drills for timely dissemination?" },
    { name: "absentIndividualsSystem", label: "Is there a system to account for individuals absent during drills?" },
    { name: "definedDrillProcedures", label: "Are tornado drill procedures clearly defined and communicated?" },
    { name: "occupantActionProcedures", label: "Do drills include specific actions (seeking shelter, evacuation routes)?" }, // Simplified
    { name: "scenarioSimulationDrills", label: "Are drills conducted simulating different scenarios (time, severity)?" }, // Simplified
    { name: "shelterAreaMarking", label: "Are designated tornado shelter areas clearly marked?" },
    { name: "shelterAccessKnowledge", label: "Do occupants know how to access shelter areas quickly/safely?" }, // Simplified
    { name: "mobilityShelterOptions", label: "Are alternative sheltering options available for individuals with mobility limitations?" },
    { name: "occupantAccountabilityProcess", label: "Is there a process for accounting for occupants during drills?" }, // Simplified
    { name: "assignedStaffRoles", label: "Are staff assigned roles for accountability/monitoring during drills?" }, // Simplified
    { name: "participantFeedbackGathering", label: "Is feedback gathered from participants after drills?" }, // Simplified
    { name: "drillEvaluationMechanism", label: "Is there a mechanism for evaluating drill effectiveness?" }, // Simplified
    { name: "postDrillDebriefing", label: "Are debriefing sessions held after drills to review performance/lessons learned?" }, // Simplified
    { name: "evaluationRecommendationsImplementation", label: "Are recommendations from evaluations implemented to enhance preparedness?" }, // Simplified
    { name: "drillRecordsMaintenance", label: "Are records maintained for all tornado drills (date, time, participants, observations)?" },
    { name: "periodicRecordsReview", label: "Are drill records reviewed periodically for compliance/trends?" }, // Simplified
    { name: "deficiencyDocumentationActions", label: "Are deficiencies identified during drills documented and corrective actions taken?" } // Simplified
];

function TornadoDrillsFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadTornadoDrillsImage = httpsCallable(functions, 'uploadTornadoDrillsImage');

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
      const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);
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
        const uploadResult = await uploadTornadoDrillsImage({
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
      const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Drills', buildingId);
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
        <h1>Tornado Drills Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Tornado Drill Assessment Questions</h2> {/* Added main heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {tornadoDrillQuestions.map((question, index) => (
            <div key={question.name} className="form-section"> {/* Use name for key */}
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
               <label htmlFor="imageUploadTornadoDrill">Upload Image (Optional):</label>
               <input id="imageUploadTornadoDrill" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Tornado Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Tornado Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default TornadoDrillsFormPage;