import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const tornadoShelterQuestions = [
    // Corrected names to camelCase
    { name: "shelterIdentified", label: "Have designated tornado shelter areas been identified throughout the facility?" },
    { name: "structuralSoundness", label: "Are shelter areas located in structurally sound spaces offering protection?" }, // Simplified
    { name: "accessibilityCheck", label: "Are shelter areas easily accessible to all occupants (incl. disabilities)?" }, // Simplified
    { name: "signagePresence", label: "Are shelter areas clearly marked with signage or visual indicators?" },
    { name: "signageDirections", label: "Do signs include directions and instructions for seeking refuge?" }, // Simplified
    { name: "shelterOnMaps", label: "Are shelter locations identified on building maps/evacuation plans?" },
    { name: "occupancyAssessment", label: "Have shelter areas been assessed for maximum occupancy capacity?" }, // Simplified
    { name: "spaceSufficiency", label: "Is there sufficient space for occupants during extended sheltering?" }, // Simplified
    { name: "overcrowdingMeasures", label: "Are measures in place to minimize overcrowding and ensure orderly entry?" },
    { name: "structuralEvaluation", label: "Have shelter areas been evaluated for structural integrity against tornado winds?" }, // Simplified
    { name: "hazardMinimization", label: "Are shelters in interior/reinforced areas to minimize hazard exposure?" }, // Simplified
    { name: "safetyFeatures", label: "Are additional safety features (reinforced walls, sturdy furniture) present?" }, // Simplified
    { name: "disabilityAccess", label: "Are shelter areas accessible to individuals with disabilities/mobility devices?" }, // Simplified
    { name: "accommodationsMade", label: "Have accommodations been made to ensure equal access for all occupants?" },
    { name: "assistanceProcedures", label: "Are designated personnel/procedures in place to assist individuals with disabilities?" },
    { name: "warningProtocol", label: "Is there a protocol for notifying occupants of warnings and directing them to shelter?" },
    { name: "communicationSystems", label: "Are communication systems used to alert occupants and provide instructions?" }, // Simplified
    { name: "drillFamiliarity", label: "Are shelter locations included in communication/drills for familiarization?" }, // Simplified
    { name: "inspectionRegularity", label: "Are shelter areas inspected regularly for condition/obstructions?" }, // Simplified
    { name: "maintenanceDone", label: "Is maintenance conducted to address issues compromising shelter safety?" }, // Simplified
    { name: "drillTesting", label: "Are shelter areas tested periodically during drills for suitability/readiness?" } // Simplified
];

function TornadoShelterLocationsFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadTornadoShelterLocationsImage = httpsCallable(functions, 'uploadTornadoShelterLocationsImage');

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
      const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);
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
        const uploadResult = await uploadTornadoShelterLocationsImage({
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
      const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Tornado Shelter Locations', buildingId);
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
        <h1>Tornado Shelter Locations Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
           <h2>Tornado Shelter Assessment Questions</h2> {/* Added main heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {tornadoShelterQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadTornadoShelter">Upload Image (Optional):</label>
               <input id="imageUploadTornadoShelter" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Tornado Shelter" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Tornado Shelter" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default TornadoShelterLocationsFormPage;