import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const cardReaderQuestions = [
    { name: "operationalCardReader", label: "Are the card readers operational and functioning as intended?" },
    { name: "authentication", label: "Do the card readers accurately read and authenticate access credentials?" }, // Simplified label
    { name: "malfunction", label: "Are there any signs of malfunction or errors in card reader operations?" },
    { name: "backupSystems", label: "Are there backup systems in place in case of power outages or malfunctions?" },
    // Adapted from text input
    { name: "accessControlMethodsImplemented", label: "Are appropriate access control methods (e.g., card issuance, credential validation) used with the card readers?" },
    { name: "issuedCards", label: "Are access credentials (e.g., cards) issued to authorized personnel and visitors?" }, // Simplified label
    { name: "restrictedAccess", label: "Is access restricted to individuals with valid/authorized credentials?" }, // Simplified label
    { name: "deactivationProcess", label: "Is there a process to deactivate lost/stolen credentials promptly?" }, // Simplified label
    { name: "integration", label: "Are the card readers integrated with the overall access control system?" },
    { name: "communication", label: "Do they communicate seamlessly with access control software/databases?" }, // Simplified label
    { name: "monitoring", label: "Is there real-time monitoring and logging of access events from card readers?" }, // Simplified label
    { name: "centralManagement", label: "Are access rights managed centrally and synchronized with the card reader system?" },
    { name: "securityFeatures", label: "Are the card readers equipped with security features against tampering?" }, // Simplified label
    { name: "encryption", label: "Do they support encryption and secure communication protocols?" }, // Simplified label
    { name: "physicalSecurity", label: "Are physical security measures in place to protect reader components/wiring?" }, // Simplified label
    { name: "compliance", label: "Do the card readers comply with relevant regulations, standards, and best practices?" },
    // Adapted from text input
    { name: "regulatoryRequirementsMet", label: "Are specific regulatory requirements or guidelines for card reader systems being met?" },
    { name: "testingCertification", label: "Have the card readers undergone testing or certification for compliance?" }, // Simplified label
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place?" }, // Simplified label
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, calibration, updates) performed?" }, // Simplified label
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "userTraining", label: "Have users (security, staff, cardholders) received training on proper card reader usage?" }, // Simplified label
    { name: "instructions", label: "Are instructions or guidelines available regarding proper card usage and access procedures?" },
    { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents?" }, // Simplified label
];


function CardReadersPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity
  const uploadCardReadersImage = httpsCallable(functions, 'uploadCardReadersImage');

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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);
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
        const uploadResult = await uploadCardReadersImage({
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);
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
        <h1>Card Readers Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Card Readers Assessment Questions</h2>

          {/* Single .map call for all questions with standardized rendering */}
          {cardReaderQuestions.map((question, index) => (
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
              <label htmlFor="imageUploadCardReader">Upload Image (Optional):</label>
              <input id="imageUploadCardReader" type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Card Reader" style={{ maxWidth: '200px', marginTop: '10px' }} />}
              {imageData && <img src={imageData} alt="Preview Card Reader" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default CardReadersPage;