import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore'; // Import getDoc and setDoc
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ExternalThreatsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();
  const functions = getFunctions();
  const uploadExternalThreatsImage = httpsCallable(functions, 'uploadExternalThreatsImage');

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);


  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
          return;
      }

      const fetchFormData = async () => {
          setLoading(true);
          setLoadError(null);

          try {
              const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'External Threats', buildingId);
              const docSnapshot = await getDoc(formDocRef); // Corrected line 39: Used getDoc to fetch the document

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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = async (e) => {
      const { name, value } = e.target;
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);

      try {
          const buildingRef = doc(db, 'Buildings', buildingId);
          const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'External Threats', buildingId);
          await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Corrected line 75: Used setDoc to update the document
          console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
      } catch (error) {
          console.error("Error saving form data to Firestore:", error);
          alert("Failed to save changes. Please check your connection and try again.");
      }
  };

  // Function to handle back button
  const handleBack = () => {
      navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    if (imageData) {
        try {
            const uploadResult = await uploadExternalThreatsImage({ imageData: imageData });
            setImageUrl(uploadResult.data.imageUrl);
            setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
            setImageUploadError(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageUploadError(error.message);
        }
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'External Threats', buildingId);
      await setDoc(formDocRef, { formData: formData, building: buildingRef }, { merge: true }); // Corrected line 114: Used setDoc to update the document

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
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
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
          <h1>7.1.2.1.1. External Threats</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.1.2.1.1. External Threats */}
                <h2>7.1.2.1.1. External Threats:</h2>
                {[
                    { name: "conductedExternalThreatAssessment", label: "Has an External Threat assessment been conducted? If so, when was it last performed?" },

                ].map((question, index) => (
                    <div key={index} className="form-section">
                        <label>{question.label}</label>
                        <input
                            type="text"
                            name={question.name}
                            placeholder={question.label}
                            value={formData[question.name] || ''}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                <button type='submit'>Submit</button>

            </form>
        </main>
    </div>

  )
}

export default ExternalThreatsFormPage;