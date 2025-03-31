import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function VehicleBarriersPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadVehicleBarriersImage');

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
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barrier', buildingId);
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
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barrier', buildingId);
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Vehicle Barrier', buildingId);
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
        <h1>1.1.2.1.2. Vehicle Barriers Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Vehicle Barriers</h2>
          {[
            { name: "barriersOperational", label: "Are the vehicle barriers operational and functioning as intended?" },
            { name: "barriersBlockAccess", label: "Do the barriers effectively block vehicle access to restricted areas?" },
            { name: "barriersDamage", label: "Are there any signs of damage, wear, or malfunction in the barrier mechanisms?" },
            { name: "barriersBackup", label: "Are there backup systems in place in case of power outages or mechanical failures?" },
            { name: "barriersWithstandImpact", label: "Are the vehicle barriers designed and constructed to withstand vehicle impact?" },
            { name: "barriersCrashRated", label: "Do they meet relevant crash-rated standards or certifications for vehicle mitigation?" },
            { name: "barriersDesignFeatures", label: "Are there any design features to minimize the risk of vehicle bypass or circumvention?" },
            { name: "barriersIntegration", label: "How are the vehicle barriers integrated with access control systems?" },
            { name: "barriersRemoteActivation", label: "Are there mechanisms to activate the barriers remotely or automatically based on access permissions?" },
            { name: "barriersRestrictedAccess", label: "Is access to the barrier controls restricted to authorized personnel only?" },
            { name: "barriersSafety", label: "Are there safety features in place to prevent accidents or injuries caused by the barriers?" },
            { name: "barriersWarningSignals", label: "Are barriers equipped with warning lights, sirens, or other visual and audible signals to alert approaching vehicles?" },
            { name: "barriersPhysicalSignage", label: "Are there physical barriers or signage to prevent pedestrians from approaching the barrier zone?" },
            { name: "barriersMaintenanceSchedule", label: "Is there a regular maintenance schedule in place for the vehicle barriers?" },
            { name: "barriersMaintenanceTasks", label: "Are maintenance tasks, such as lubrication, inspection of mechanisms, and testing of safety features, performed according to schedule?" },
            { name: "barriersMaintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
            { name: "barriersCompliance", label: "Do the vehicle barriers comply with relevant regulations, standards, and industry best practices?" },
            { name: "barriersRegulatoryRequirements", label: "Are there any specific requirements or guidelines for vehicle barriers outlined by regulatory authorities or industry associations?" },
            { name: "barriersTesting", label: "Have the barriers undergone testing or certification to verify compliance with applicable standards?" },
            { name: "barriersEmergencyPlan", label: "Is there a contingency plan in place for emergency situations, such as vehicle attacks or security breaches?" },
            { name: "barriersEmergencyTraining", label: "Are security personnel trained on emergency procedures for activating and deactivating the barriers?" },
            { name: "barriersEmergencyResponse", label: "Is there coordination with law enforcement or emergency responders for rapid response to security incidents involving the barriers?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {question.name === "barriersOperational" || question.name === "barriersBlockAccess" || question.name === "barriersBackup" || question.name === "barriersWithstandImpact" || question.name === "barriersCrashRated" || question.name === "barriersDesignFeatures" || question.name === "barriersRemoteActivation" || question.name === "barriersRestrictedAccess" || question.name === "barriersSafety" || question.name === "barriersWarningSignals" || question.name === "barriersPhysicalSignage" || question.name === "barriersMaintenanceSchedule" || question.name === "barriersMaintenanceTasks" || question.name === "barriersMaintenanceRecords" || question.name === "barriersCompliance" || question.name === "barriersTesting" || question.name === "barriersEmergencyPlan" || question.name === "barriersEmergencyTraining" || question.name === "barriersEmergencyResponse" ? (
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

                </div>
                <input
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

export default VehicleBarriersPage;