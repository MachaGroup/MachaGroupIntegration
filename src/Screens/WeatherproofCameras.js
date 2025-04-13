import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const weatherproofCameraQuestions = [
    { name: "weatherProofDesign", label: "Are cameras designed to withstand relevant outdoor environmental factors?" }, // Simplified
    { name: "durableMaterials", label: "Are they constructed from durable materials suitable for harsh outdoor conditions?" }, // Simplified
    { name: "certificationTesting", label: "Have cameras undergone testing/certification for weatherproofing/durability?" }, // Simplified
    { name: "secureMounting", label: "Are weatherproof cameras securely mounted and installed outdoors?" }, // Simplified
    { name: "optimalPositioning", label: "Are they positioned at optimal angles for effective outdoor coverage?" }, // Simplified
    { name: "protectedWiring", label: "Are cables and wiring adequately protected from weather/tampering?" }, // Simplified
    { name: "imageQuality", label: "Do cameras capture high-quality images with sufficient resolution?" }, // Simplified
    { name: "imageAdjustments", label: "Are settings available to optimize image quality for outdoor lighting?" }, // Simplified
    { name: "imageClarity", label: "Are images clear and detailed for easy identification in outdoor areas?" }, // Simplified
    { name: "integrationSurveillance", label: "Are weatherproof cameras integrated with the overall surveillance system?" },
    { name: "softwareCommunication", label: "Do they communicate seamlessly with surveillance software/monitoring stations?" }, // Simplified
    { name: "realTimeMonitoring", label: "Is there real-time monitoring and recording of feeds from outdoor areas?" }, // Simplified
    { name: "remoteControl", label: "Is remote access and control functionality available?" }, // Simplified
    { name: "adjustableCameraSettings", label: "Can personnel adjust settings (angle, zoom) remotely?" }, // Simplified
    { name: "secureProtocols", label: "Are secure authentication/encryption protocols in place for remote control?" }, // Simplified
    { name: "comprehensiveCoverage", label: "Do cameras provide comprehensive surveillance coverage for desired outdoor areas?" }, // Simplified
    { name: "strategicPositioning", label: "Are they positioned strategically for critical outdoor spaces (perimeter, parking, docks)?" }, // Simplified
    // Adapted from textarea input
    { name: "blindSpotsIdentified", label: "Are any blind spots or areas identified where outdoor camera coverage is insufficient?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for weatherproof cameras?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, inspection, testing) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
];


function WeatherproofCamerasPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadWeatherproofCamerasImage = httpsCallable(functions, 'uploadWeatherproofCamerasImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Weatherproof Cameras', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Weatherproof Cameras', buildingId);
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
        const uploadResult = await uploadWeatherproofCamerasImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Weatherproof Cameras', buildingId);
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
        <h1>Weatherproof Cameras Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Weatherproof Camera Assessment Questions</h2> {/* Simplified heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {weatherproofCameraQuestions.map((question, index) => (
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
                name={`${question.name}Comment`} // Corrected name format (singular Comment)
                placeholder="Additional comments"
                value={formData[`${question.name}Comment`] || ''}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Image upload section - Looks good */}
          <div className="form-section">
              <label htmlFor="imageUploadWeatherproof">Upload Image (Optional):</label>
              <input id="imageUploadWeatherproof" type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Weatherproof Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Weatherproof Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default WeatherproofCamerasPage;