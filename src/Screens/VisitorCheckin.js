import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function VisitorCheckInPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadVisitorCheckInImage');

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);
        const docSnapshot = await getDoc(formDocRef);

        if (docSnapshot.exists()) {
          setFormData(docSnapshot.data().formData || {});
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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    try {
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);
      await setDoc(formDocRef, { formData: newFormData }, { merge: true });
      console.log("Form data saved to Firestore:", newFormData);
    } catch (error) {
      console.error("Error saving form data to Firestore:", error);
      alert("Failed to save changes. Please check your connection and try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    if (imageData) {
      try {
        const uploadResult = await uploadImage({ imageData: imageData });
        setImageUrl(uploadResult.data.imageUrl);
        setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
        setImageUploadError(null);
      } catch (error) {
        console.error('Error uploading image:', error);
        setImageUploadError(error.message);
      }
    }

    try {
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Visitor Check-In', buildingId);
      await setDoc(formDocRef, { formData: formData }, { merge: true });
      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error("Error saving form data to Firestore:", error);
      alert("Failed to save changes. Please check your connection and try again.");
    }
  };

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
          <h2>Visitor Check-in</h2>
          {[
            { name: "validId", label: "Are visitors required to present valid identification upon check-in?" },
            { name: "verifyAuthenticity", label: "Do staff members verify the authenticity of the identification presented by visitors?" },
            { name: "idMatchProcess", label: "Is there a process in place to ensure that the identification matches the information provided during pre-registration or scheduling?" },
            { name: "standardRegistration", label: "Is there a standardized process for registering visitors upon check-in?" },
            { name: "provideInfo", label: "Are visitors required to provide relevant information such as name, affiliation, purpose of visit, and contact details?" },
            { name: "recordInfo", label: "Is visitor information recorded accurately and legibly for future reference and tracking?" },
            { name: "accessGranted", label: "Are visitors granted access to the premises only after successful check-in and verification of identification?" },
            { name: "predeterminedCriteria", label: "Is access authorization based on predetermined criteria such as scheduled appointments, visitor type, or security clearance levels?" },
            { name: "accessPrivileges", label: "Are visitor access privileges clearly communicated to security personnel and other relevant staff members?" },
            { name: "issuedBadges", label: "Are visitors issued with temporary badges or passes upon check-in?" },
            { name: "badgeInfo", label: "Do badges or passes prominently display relevant information such as visitor name, date of visit, and authorized areas or restrictions?" },
            { name: "reclaimBadges", label: "Are there protocols in place for reclaiming badges or passes upon visitor departure to prevent unauthorized access?" },
            { name: "dataProtection", label: "Is visitor information handled and stored securely to maintain confidentiality and protect sensitive data?" },
            { name: "staffTraining", label: "Are staff members trained to handle visitor information in compliance with data protection regulations and organizational policies?" },
            { name: "disposeRecords", label: "Is there a process for securely disposing of visitor records or data once they are no longer needed?" },
            { name: "staffAssistance", label: "Are staff members trained to provide assistance and guidance to visitors during the check-in process?" },
            { name: "visitorGreeting", label: "Do they greet visitors in a friendly and professional manner, making them feel welcome and valued?" },
            { name: "inquiriesResponse", label: "Are staff members responsive to visitor inquiries and requests for assistance, providing accurate information and support as needed?" },
            { name: "emergencyResponse", label: "Are staff members trained to respond appropriately to security incidents, medical emergencies, or other crises that may occur during the check-in process?" },
            { name: "emergencyProcedures", label: "Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?" },
            { name: "alertSystem", label: "Is there a system in place to alert security personnel or initiate emergency response procedures if necessary?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              <div>
                <input
                  type="radio"
                  name={question.name}
                  value="yes"
                  checked={formData[question.name] === "yes"}
                  onChange={handleChange}
                /> Yes
                <input
                  type="radio"
                  name={question.name}
                  value="no"
                  checked={formData[question.name] === "no"}
                  onChange={handleChange}
                /> No
                
              </div>
              <input
                  type="text"
                  name={`${question.name}Comment`}
                  placeholder="Comments"
                  value={formData[`${question.name}Comment`] || ''}
                  onChange={handleChange}
                />
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default VisitorCheckInPage;