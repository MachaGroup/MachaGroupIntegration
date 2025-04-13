import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const securityGuardQuestions = [
    { name: "training", label: "Have guards received adequate training (security procedures, emergency response, conflict resolution)?" }, // Simplified
    { name: "certified", label: "Are they certified or licensed as required by the jurisdiction?" }, // Simplified
    { name: "ongoingTraining", label: "Do they receive ongoing training on protocols and best practices?" }, // Simplified
    { name: "professionalism", label: "Do guards demonstrate professionalism, courtesy, and respect?" }, // Simplified
    { name: "uniformed", label: "Are they properly uniformed and equipped?" }, // Simplified
    { name: "codesOfConduct", label: "Do they adhere to established codes of conduct and ethical standards?" },
    { name: "vigilant", label: "Are guards vigilant and observant, identifying/reporting suspicious activity?" }, // Simplified
    { name: "patrols", label: "Do they conduct regular patrols and inspections?" }, // Simplified
    { name: "incidentReports", label: "Are incident reports accurately documented and promptly submitted?" },
    { name: "emergencyResponse", label: "Are guards trained for effective emergency response (medical, fire, security)?" }, // Simplified
    { name: "lockdownProcedures", label: "Do they know how to initiate lockdowns, evacuate, and coordinate with emergency services?" },
    { name: "communicationProtocols", label: "Are established communication protocols used for reporting/requesting assistance?" }, // Simplified
    { name: "accessControl", label: "Do guards enforce access control measures and verify authorization?" }, // Simplified
    { name: "visitorManagement", label: "Are visitor management procedures (registration, badges, monitoring) followed?" }, // Simplified
    { name: "confrontationalSituations", label: "Are guards trained to handle confrontational situations diplomatically/assertively?" }, // Simplified
    { name: "collaboration", label: "Do guards collaborate effectively with administrators, law enforcement, etc.?" }, // Simplified
    { name: "communicationDevices", label: "Are they able to communicate clearly via radios, phones, etc.?" }, // Simplified
    { name: "meetings", label: "Are there regular meetings/debriefings to discuss security issues?" }, // Simplified
    { name: "compliance", label: "Do guards comply with relevant regulations, laws, and standards?" }, // Simplified
    // Adapted from text input
    { name: "regulatoryRequirementsMet", label: "Are specific requirements or guidelines for security guards being met?" },
    { name: "audits", label: "Are guard services subject to audits, inspections, or certifications?" }, // Simplified
    { name: "performanceEvaluation", label: "Is there a process for evaluating guard performance and providing feedback?" }, // Simplified
    { name: "incentives", label: "Are contracts structured to incentivize high performance/accountability?" }, // Simplified
    { name: "feedback", label: "Are mechanisms in place for receiving feedback on guard effectiveness/professionalism?" }, // Simplified
];


function SecurityGuardsPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
   // Renamed variable for clarity
  const uploadSecurityGuardsImage = httpsCallable(functions, 'uploadSecurityGuardsImage');

  // State variables look good
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // useEffect for fetching data - Path checked, looks okay based on input
  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress'); // Ensure path is correct
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
      // Using the provided Firestore path
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);

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
             // Using the provided Firestore path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
        const uploadResult = await uploadSecurityGuardsImage({
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
       // Using the provided Firestore path
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Stationed Guards', buildingId);
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
        <h1>Stationed Guards Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Stationed Guard Assessment Questions</h2> {/* Simplified heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {securityGuardQuestions.map((question, index) => (
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
               <label htmlFor="imageUploadGuards">Upload Image (Optional):</label>
               <input id="imageUploadGuards" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Security Guard related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Security Guard related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default SecurityGuardsPage;