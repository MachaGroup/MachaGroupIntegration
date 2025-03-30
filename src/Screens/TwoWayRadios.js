import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

function TwoWayRadiosFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadTwoWayRadiosImage');

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
        const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
        const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
      const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Two-way Radios', buildingId);
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
        <h1>Two-Way Radios Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Two-Way Radios</h2>
          {[
            { name: "Radios Provided", label: "Are two-way radios provided to staff members who require them for communication during emergencies or daily operations?" },
            { name: "Adequate Radios", label: "Are there an adequate number of two-way radios available to ensure that all relevant staff members are equipped for communication?" },
            { name: "Sufficient Coverage", label: "Do two-way radios provide sufficient coverage and range to facilitate communication across the entire facility or campus?" },
            { name: "deadZoneMeasures", label: "Are there measures in place to address potential dead zones or areas with poor radio reception?" },
            { name: "Channel Assignment", label: "Are specific radio channels assigned for different purposes, such as emergency communication, general staff communication, or coordination between departments?" },
            { name: "channelManagement", label: "Is there a protocol for managing radio channels to prevent interference and ensure clear communication during emergencies?" },
            { name: "Radio Training", label: "Are staff members trained on how to use two-way radios effectively, including proper radio etiquette, channel selection, and basic troubleshooting?" },
            { name: "Drill Familiarization", label: "Are practice sessions or drills conducted to familiarize staff members with radio communication procedures and simulate emergency scenarios?" },
            { name: "emergencyProtocols", label: "Are protocols established for using two-way radios during emergencies, specifying roles, responsibilities, and procedures for initiating, receiving, and relaying critical information?" },
            { name: "Emergency Role Training", label: "Are staff members trained on emergency communication protocols and aware of their roles and responsibilities in using two-way radios during different types of emergencies?" },
            { name: "Battery Inspection", label: "Are batteries for two-way radios regularly inspected, charged, and replaced as needed to ensure that radios remain operational during emergencies?" },
            { name: "storageProtocols", label: "Is there a protocol for storing and maintaining two-way radios to prolong their lifespan and minimize the risk of malfunctions or equipment failures?" },
            { name: "Radio Integration", label: "Are two-way radios integrated into broader emergency communication and response plans, ensuring seamless coordination with other communication systems and protocols?" },
            { name: "drillIntegrationProcedures", label: "Are there designated procedures for incorporating two-way radio communication into emergency drills, exercises, and simulations to assess effectiveness and identify areas for improvement?" },
            { name: "feedbackMechanisms", label: "Are feedback mechanisms in place to gather input from staff members regarding the usability, reliability, and effectiveness of two-way radios for communication during emergencies?" },
            { name: "Improvement Recommendations", label: "Are recommendations for enhancing two-way radio communication protocols and equipment considered and implemented as part of ongoing improvement efforts?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {question.name === "Radios Provided" || question.name === "Adequate Radios" || question.name === "Sufficient Coverage" || question.name === "Channel Assignment" || question.name === "Radio Training" || question.name === "Drill Familiarization" || question.name === "Emergency Role Training" || question.name === "Battery Inspection" || question.name === "Radio Integration" || question.name === "Improvement Recommendations" ? (
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

export default TwoWayRadiosFormPage;