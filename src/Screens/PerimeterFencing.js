import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Correct imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const perimeterFencingQuestions = [
    // Physical Integrity
    { name: "structuralSoundness", label: "Is the perimeter fencing structurally sound and in good condition?" },
    { name: "fencingDamage", label: "Are there any signs of damage, corrosion, or deterioration in the fencing material?" },
    { name: "securePosts", label: "Are fence posts securely anchored and stable?" }, // Simplified label
    { name: "gapsBreaches", label: "Are there any gaps or breaches in the fencing that could compromise security?" },
    // Height and Coverage
    { name: "fencingHeight", label: "Is the fencing height sufficient to deter unauthorized entry/climbing?" }, // Simplified label
    { name: "fencingCoverage", label: "Does the fencing provide adequate coverage to secure the perimeter?" }, // Simplified label
    { name: "additionalMeasures", label: "Are additional measures (e.g., barbed wire, barriers) in place to prevent access over/under?" }, // Simplified label
    // Access Control
    { name: "securedAccessPoints", label: "Are access points (gates) in the fencing properly secured?" }, // Simplified label
    { name: "gatesEquipment", label: "Are gates equipped with effective locks, hinges, and latches?" }, // Simplified label
    { name: "restrictedAccess", label: "Is access restricted to authorized personnel with proper authentication?" }, // Simplified label
    // Visibility and Surveillance
    { name: "visibility", label: "Does the fencing allow clear visibility of the surrounding area?" }, // Simplified label
    { name: "blindSpotsMinimized", label: "Are measures in place to minimize blind spots along the perimeter?" }, // Simplified label - Renamed 'blindSpots'
    { name: "strategicSurveillance", label: "Are surveillance cameras or monitoring systems positioned strategically along the fencing?" },
    // Durability and Maintenance
    { name: "durableMaterials", label: "Is the fencing made from durable materials resistant to environmental factors?" }, // Simplified label
    { name: "maintenanceInspection", label: "Are regular maintenance and inspection procedures in place?" }, // Simplified label
    { name: "repairProvisions", label: "Are there provisions for prompt repair or replacement of damaged sections?" }, // Simplified label
    // Compliance with Regulations
    { name: "regulatoryCompliance", label: "Does the fencing comply with relevant regulations, codes, and standards?" }, // Simplified label
     // Adapted from text input
    { name: "regulatoryRequirementsMet", label: "Are specific requirements or guidelines for perimeter fencing being met?" },
    { name: "inspectionsCompliance", label: "Have inspections or assessments verified compliance with standards?" }, // Simplified label
    // Integration with Security Measures
    { name: "integratedSecurityMeasures", label: "Is the fencing integrated with other security measures (cameras, lighting, IDS)?" },
    { name: "securityEffectiveness", label: "Do these measures complement the fencing's effectiveness?" }, // Simplified label
    { name: "coordinationResponse", label: "Is there coordination between systems/personnel to respond to breaches effectively?" }, // Simplified label
];

function PerimeterFencingPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadPerimeterFencingPageImage = httpsCallable(functions, 'uploadPerimeterFencingPageImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);
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
        const uploadResult = await uploadPerimeterFencingPageImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Perimeter Fencing', buildingId);
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
        <h1>1.1.2.1.1. Perimeter Fencing Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Perimeter Fencing Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {perimeterFencingQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadFencing">Upload Image (Optional):</label>
               <input id="imageUploadFencing" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Perimeter Fencing" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Perimeter Fencing" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default PerimeterFencingPage;