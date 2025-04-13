import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const visitorCheckInQuestions = [
    { name: "validId", label: "Are visitors required to present valid identification upon check-in?" },
    { name: "verifyAuthenticity", label: "Do staff verify the authenticity of visitor identification?" }, // Simplified
    { name: "idMatchProcess", label: "Is there a process to ensure ID matches pre-registration/scheduling info?" }, // Simplified
    { name: "standardRegistration", label: "Is there a standardized process for registering visitors?" }, // Simplified
    { name: "provideInfo", label: "Are visitors required to provide relevant info (name, purpose, contact)?" }, // Simplified
    { name: "recordInfo", label: "Is visitor information recorded accurately and legibly?" }, // Simplified
    { name: "accessGranted", label: "Are visitors granted access only after successful check-in/verification?" }, // Simplified
    { name: "predeterminedCriteria", label: "Is access authorization based on predetermined criteria (appointment, clearance)?" }, // Simplified
    { name: "accessPrivilegesCommunicated", label: "Are visitor access privileges clearly communicated to staff?" }, // Simplified - Renamed 'accessPrivileges'
    { name: "issuedBadges", label: "Are visitors issued temporary badges or passes?" }, // Simplified
    { name: "badgeInfo", label: "Do badges display relevant info (name, date, authorized areas)?" }, // Simplified
    { name: "reclaimBadges", label: "Are protocols in place for reclaiming badges upon departure?" },
    { name: "dataProtection", label: "Is visitor information handled and stored securely (confidentiality, data protection)?" }, // Simplified
    { name: "staffTrainingDataProtection", label: "Are staff trained on visitor info handling per regulations/policies?" }, // Simplified - Renamed 'staffTraining'
    { name: "disposeRecords", label: "Is there a process for securely disposing of visitor records when no longer needed?" },
    { name: "staffAssistance", label: "Are staff trained to provide assistance/guidance during check-in?" }, // Simplified
    { name: "visitorGreeting", label: "Do staff greet visitors professionally and courteously?" }, // Simplified
    { name: "inquiriesResponse", label: "Are staff responsive to visitor inquiries and requests?" },
    { name: "emergencyResponseTrainingCheckIn", label: "Are staff trained for emergency response during check-in (security, medical)?" }, // Simplified - Renamed 'emergencyResponse'
    { name: "emergencyProceduresKnowledge", label: "Do they know emergency procedures, evacuation routes, and how to contact services?" }, // Simplified - Renamed 'emergencyProcedures'
    { name: "alertSystem", label: "Is there a system to alert security or initiate emergency response if necessary?" },
];

function VisitorCheckInPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
   // Renamed variable for clarity
  const uploadVisitorCheckInImage = httpsCallable(functions, 'uploadVisitorCheckInImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);
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
        const uploadResult = await uploadVisitorCheckInImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);
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
        <h1>Visitor Check-in Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Visitor Check-in Questions</h2> {/* Simplified heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {visitorCheckInQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadVisitorCheckIn">Upload Image (Optional):</label>
               <input id="imageUploadVisitorCheckIn" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Visitor Check-In related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Visitor Check-In related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default VisitorCheckInPage;