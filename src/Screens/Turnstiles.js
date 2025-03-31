import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function TurnstilesPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadTurnstilesImage');

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
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);
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
        const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);
        await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
        console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Turnstiles', buildingId);
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
        <h1>Turnstiles Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Turnstiles</h2>
          {[
            { name: "turnstilesOperational", label: "Are the turnstiles operational and functioning as intended?" },
            { name: "turnstilesSmooth", label: "Do the turnstiles rotate smoothly without any mechanical issues?" },
            { name: "turnstilesDamage", label: "Are there any signs of wear or damage that could affect the turnstiles' functionality?" },
            { name: "backupSystemsTurnstiles", label: "Are there backup systems in place in case of power outages or malfunctions?" },
            { name: "accessControlTurnstiles", label: "How is access to the turnstiles controlled?" },
            { name: "authMechanismsTurnstiles", label: "Are there authentication mechanisms, such as RFID card readers, barcode scanners, or biometric systems, to restrict entry?" },
            { name: "integratedSystemsTurnstiles", label: "Are access control systems integrated with other security measures, such as surveillance cameras or alarm systems?" },
            { name: "logEntriesTurnstiles", label: "Is there a log of entries and exits through the turnstiles for monitoring and auditing purposes?" },
            { name: "safetyFeaturesTurnstiles", label: "Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?" },
            { name: "antiTailgating", label: "Are the turnstiles equipped with anti-tailgating features to prevent unauthorized entry by multiple individuals?" },
            { name: "safetySignageTurnstiles", label: "Are there clear instructions or signage to inform users about safety procedures and precautions when using the turnstiles?" },
            { name: "complianceRegulationsTurnstiles", label: "Do the turnstiles comply with relevant safety and security regulations, codes, and standards?" },
            { name: "regulatoryRequirementsTurnstiles", label: "Are there any specific requirements or guidelines for turnstiles outlined by regulatory authorities or industry associations that need to be met?" },
            { name: "inspectionsCertificationsTurnstiles", label: "Have the turnstiles undergone any inspections or certifications to verify compliance with applicable standards?" },
            { name: "maintenanceScheduleTurnstiles", label: "Is there a regular maintenance schedule in place for the turnstiles?" },
            { name: "maintenanceTasksTurnstiles", label: "Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?" },
            { name: "maintenanceRecordsTurnstiles", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
            { name: "userTrainingTurnstiles", label: "Have users, such as security personnel, staff, and visitors, received training on how to use the turnstiles safely and effectively?" },
            { name: "instructionsGuidelinesTurnstiles", label: "Are there instructions or guidelines available to users regarding proper turnstile usage and emergency procedures?" },
            { name: "reportingProcessTurnstiles", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the turnstiles?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {question.name === "turnstilesOperational" || question.name === "turnstilesSmooth" || question.name === "backupSystemsTurnstiles" || question.name === "authMechanismsTurnstiles" || question.name === "integratedSystemsTurnstiles" || question.name === "logEntriesTurnstiles" || question.name === "safetyFeaturesTurnstiles" || question.name === "antiTailgating" || question.name === "safetySignageTurnstiles" || question.name === "complianceRegulationsTurnstiles" || question.name === "inspectionsCertificationsTurnstiles" || question.name === "maintenanceScheduleTurnstiles" || question.name === "maintenanceTasksTurnstiles" || question.name === "maintenanceRecordsTurnstiles" || question.name === "userTrainingTurnstiles" || question.name === "instructionsGuidelinesTurnstiles" || question.name === "reportingProcessTurnstiles" ? (
                <><div>
                  <input
                    type="radio"
                    name={question.name}
                    value="yes"
                    checked={formData[question.name] === "yes"}
                    onChange={handleChange} /> Yes
                  <input
                    type="radio"
                    name={question.name}
                    value="no"
                    checked={formData[question.name] === "no"}
                    onChange={handleChange} /> No

                </div><input
                    type="text"
                    name={`${question.name}Comment`}
                    placeholder="Comments"
                    value={formData[`${question.name}Comment`] || ''}
                    onChange={handleChange} /></>
              ) : (
                <input
                  type="text"
                  name={question.name}
                  value={formData[question.name] || ''}
                  onChange={handleChange}
                  placeholder={question.label}
                />
              )}
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

export default TurnstilesPage;