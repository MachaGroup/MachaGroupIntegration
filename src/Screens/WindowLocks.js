import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const windowLocksQuestions = [
    { name: "operationalLocks", label: "Are the window locks operational and functioning properly?" },
    { name: "secureFastening", label: "Do the locks securely fasten windows to prevent unauthorized entry?" },
    // Adapted from textarea input
    { name: "damageLocksObserved", label: "Are there any signs of damage, wear, or malfunction in the locking mechanisms?" },
    { name: "backupSystems", label: "Are backup systems or secondary locking mechanisms in place?" }, // Clarified label
    { name: "windowLockSuitability", label: "Are the locks suitable for the type of windows installed?" }, // Simplified label
    { name: "secureFit", label: "Do they provide a secure fit and effective locking mechanism for each window style?" },
    { name: "windowSizesConsidered", label: "Have considerations been made for windows of varying sizes/configurations?" }, // Simplified label - Renamed 'windowSizes'
    { name: "accessibleLocks", label: "Are locks easily accessible and operable for occupants, especially in emergencies?" }, // Simplified label
    { name: "convenientUse", label: "Do they allow quick/convenient opening/closing when needed?" }, // Simplified label
    { name: "accessibilityFeatures", label: "Are there specific accessibility features for individuals with disabilities?" },
    { name: "durableMaterials", label: "Are locks made from durable materials resistant to force/tampering?" }, // Simplified label
    { name: "additionalSecurityFeatures", label: "Are additional security features (reinforced bolts, tamper-resistant screws) present?" },
    { name: "reliabilityTesting", label: "Have locks been tested for reliability and resistance to environmental factors?" }, // Simplified label
    { name: "integrationSecuritySystem", label: "Are window locks integrated with the overall building security system?" },
    { name: "tamperAlerts", label: "Do they trigger alerts or notifications upon tampering or unauthorized entry attempt?" }, // Simplified label
    { name: "surveillanceMonitoring", label: "Are surveillance cameras positioned to monitor windows for security breaches?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for window locks?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (lubrication, inspection, replacement) performed?" }, // Simplified label
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "compliance", label: "Do window locks comply with relevant regulations, codes, and standards?" }, // Simplified label
     // Adapted from textarea input
    { name: "regulatoryRequirementsMet", label: "Are specific requirements or guidelines for window locks being met?" },
    { name: "certifications", label: "Have the locks undergone testing or certification for compliance?" }, // Simplified label
];

function WindowLocksPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadWindowLocksImage = httpsCallable(functions, 'uploadWindowLocksImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);
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
        const uploadResult = await uploadWindowLocksImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);
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
        <h1>Window Locks Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Window Locks Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {windowLocksQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadWindowLock">Upload Image (Optional):</label>
               <input id="imageUploadWindowLock" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Window Lock" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Window Lock" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default WindowLocksPage;