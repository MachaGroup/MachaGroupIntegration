import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const ptzCameraQuestions = [
    { name: "operational", label: "Are the PTZ cameras operational and functioning as intended?" },
    { name: "flexibleMonitoring", label: "Do cameras provide flexible monitoring (pan, tilt, zoom)?" }, // Simplified
    { name: "malfunction", label: "Are there signs of malfunction in camera movements or zoom?" }, // Simplified
    { name: "backupSystems", label: "Are backup systems in place for power outages or camera malfunctions?" },
    { name: "coverage", label: "Do PTZ cameras cover desired areas comprehensively?" }, // Simplified
    { name: "strategicPositioning", label: "Are they positioned strategically to monitor critical areas and respond effectively?" }, // Simplified
    { name: "presetPositions", label: "Are preset positions or patrol patterns programmed for efficiency?" }, // Simplified
    { name: "imageQuality", label: "Do cameras capture high-quality images with sufficient resolution?" }, // Simplified
    { name: "imageAdjustments", label: "Are settings available to optimize image quality for lighting/environment?" }, // Simplified
    { name: "zoomQuality", label: "Are images clear and detailed, even when zoomed in?" },
    { name: "integrationSurveillance", label: "Are PTZ cameras integrated with the overall surveillance system?" }, // Simplified
    { name: "seamlessCommunication", label: "Do they communicate seamlessly with surveillance software/monitoring stations?" },
    { name: "realTimeMonitoring", label: "Is real-time monitoring/recording available with remote PTZ control?" }, // Simplified
    { name: "durabilityWeatherResistance", label: "Are cameras designed to withstand environmental factors (moisture, temp, dust)?" },
    { name: "durableMaterials", label: "Are they constructed from durable materials suitable for outdoor conditions?" },
    { name: "protectiveEnclosures", label: "Are protective enclosures/housings used to shield cameras?" }, // Simplified
    { name: "remoteControl", label: "Is remote access and control functionality available?" }, // Simplified
    { name: "remoteAdjustments", label: "Can personnel adjust angles, zoom, and settings remotely?" }, // Simplified
    { name: "secureAuthentication", label: "Are secure authentication/encryption protocols in place for remote control?" }, // Simplified
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for PTZ cameras?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, inspection, testing PTZ) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
];


function PTZCamerasPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Correct httpsCallable definition - Assuming name matches file
  const uploadPTZCamerasImage = httpsCallable(functions, 'uploadPTZCamerasImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);
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
        const uploadResult = await uploadPTZCamerasImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);
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
        <h1>PTZ Cameras Assessment</h1> {/* Simplified title */}
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>PTZ Camera Assessment Questions</h2> {/* Added main heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {ptzCameraQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadPTZ">Upload Image (Optional):</label>
               <input id="imageUploadPTZ" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded PTZ Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview PTZ Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default PTZCamerasPage;