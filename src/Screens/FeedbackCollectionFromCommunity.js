import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function FeedbackCollectionFromCommunityPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadFeedbackCollectionFromCommunityPageImage = httpsCallable(functions, 'uploadFeedbackCollectionFromCommunityPageImage');

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
        const formDocRef = doc(db, 'forms', 'Community Partnership', 'Feedback Collection from Community', buildingId);
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
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formDocRef = doc(db, 'forms', 'Community Partnership', 'Feedback Collection from Community', buildingId);
      await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
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
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    if (imageData) {
      try {
        const uploadResult = await uploadFeedbackCollectionFromCommunityPageImage({ imageData: imageData });
        setImageUrl(uploadResult.data.imageUrl);
        setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
        setImageUploadError(null);
      } catch (error) {
        console.error('Error uploading image:', error);
        setImageUploadError(error.message);
      }
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formDocRef = doc(db, 'forms', 'Community Partnership', 'Feedback Collection from Community', buildingId);
      await setDoc(formDocRef, { formData: formData }, { merge: true });
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Feedback Collection from Community</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>6.3.2.3.1. Feedback Collection from Community</h2>
          {[
            { name: "collectingFeedback", label: "What methods are used to collect feedback from the community regarding school safety and emergency preparedness?" },
            { name: "conductedSurveys", label: "How often are community engagement surveys conducted to gather input from parents and local stakeholders?" },
            { name: "questionsInSurveys", label: "What types of questions are included in the surveys to assess community perceptions of safety?" },
            { name: "analyzingSurveys", label: "How is the feedback from community surveys analyzed and used to inform safety policies and practices?" },
            { name: "FollowUpActions", label: "What follow-up actions are taken to communicate the results of the surveys back to the community?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              <textarea
                name={question.name}
                value={formData[question.name] || ''}
                onChange={handleChange}
                placeholder={question.label}
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

export default FeedbackCollectionFromCommunityPage;