import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const keypadQuestions = [
    // Functionality and Reliability
    { name: "operational", label: "Are the access control keypads operational and functioning as intended?" },
    { name: "reliablyAuthenticate", label: "Do the keypads reliably authenticate users and grant access?" }, // Simplified
    { name: "malfunction", label: "Are there any signs of malfunction or errors in the keypad operation?" },
    { name: "backupSystems", label: "Are backup systems in place for power outages or malfunctions?" }, // Simplified
    // Security of Access Codes
    { name: "secureCodes", label: "Are access codes sufficiently secure (e.g., complexity, length)?" }, // Simplified
    { name: "instructions", label: "Are users instructed not to share codes and keep them confidential?" },
    { name: "changeCodes", label: "Is there a process for periodically changing access codes?" },
    // Integration with Access Control Systems
    { name: "integrated", label: "Are the keypads integrated with the overall access control system?" }, // Simplified
    { name: "communicateSeamlessly", label: "Do they communicate seamlessly with access control software/databases?" }, // Simplified
    { name: "realTimeMonitoring", label: "Is there real-time monitoring and logging of access events from keypads?" }, // Simplified
    { name: "accessRightsManaged", label: "Are access rights managed centrally and synchronized with the keypad system?" },
    // Durability and Resistance to Tampering
    { name: "durableMaterials", label: "Are keypads made from durable materials resistant to force/tampering?" }, // Simplified
    { name: "tamperAlarms", label: "Are additional security features (tamper alarms, anti-tamper enclosures) present?" }, // Simplified
    { name: "testedReliability", label: "Have keypads been tested for reliability and environmental resistance?" }, // Simplified
    // Accessibility and Ease of Use
    { name: "accessible", label: "Are keypads easily accessible and operable for authorized users?" }, // Simplified
    { name: "clearInstructions", label: "Do they provide clear instructions for entering codes?" }, // Simplified
    { name: "disabilityAccessibility", label: "Are there accessibility features/considerations for individuals with disabilities?" },
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for the keypads?" }, // Simplified
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, inspection, replacement) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
    // User Training and Awareness
    { name: "userTraining", label: "Have users received training on proper keypad usage?" }, // Simplified
    { name: "instructionsAvailable", label: "Are instructions/guidelines available regarding code usage and security protocols?" }, // Simplified
    { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents?" } // Simplified
];

function AccessControlKeypadsPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadAccessControlKeypadsImage = httpsCallable(functions, 'uploadAccessControlKeypadsImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);
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
        const uploadResult = await uploadAccessControlKeypadsImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);
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
        <h1>Access Control Keypads Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Keypad Assessment Questions</h2> {/* Simplified main heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {keypadQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadKeypad">Upload Image (Optional):</label>
               <input id="imageUploadKeypad" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Keypad" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Keypad" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default AccessControlKeypadsPage;