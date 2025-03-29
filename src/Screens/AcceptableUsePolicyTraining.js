import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AcceptableUsePolicyTrainingFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadAcceptableUsePolicyTrainingImage')

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
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Acceptable Use Policy Training', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
  }, [buildingId, navigate]);

  
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
        // Persist data to Firestore on every change
        const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Acceptable Use Policy Training', buildingId);
        await setDoc(formDocRef, { formData: newFormData }, { merge: true }); // Use merge to preserve existing fields
        console.log("Form data saved to Firestore:", newFormData);
    } catch (error) {
        console.error("Error saving form data to Firestore:", error);
        alert("Failed to save changes. Please check your connection and try again.");
    }
};

  // Function to handle back button
  const handleBack = async () => {
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Acceptable Use Policy Training', buildingId);
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
        <div>
          <div className="form-page">
            <header className="header">
              <Navbar />
              <button className="back-button" onClick={handleBack}>
                ←
              </button>
              <h1>Acceptable Use Policy (AUP) Training Assessment</h1>
              <img src={logo} alt="Logo" className="logo" />
            </header>
    
            <main className="form-container">
              <form onSubmit={handleSubmit}>
                <h2>Acceptable Use Policy (AUP) Training Assessment</h2>
                {[
                  { name: "restrictedActivities", label: "What activities are restricted under the Acceptable Use Policy (AUP)?" },
                  { name: "deviceHandling", label: "How should employees handle personal device usage in the workplace (e.g., BYOD policies)?" },
                  { name: "violatingConsequences", label: "What are the consequences of violating the AUP?" },
                  { name: "violationReport", label: "How can employees report potential AUP violations or issues?" },
                  { name: "requiredCompletion", label: "When and how are employees required to complete AUP training?" },
                ].map((question, index) => (
                  <div key={index} className="form-section">
                    <label>{question.label}</label>
                    <div>
                      <input
                        type="text"
                        name={question.name}
                        placeholder="Enter your answer"
                        value={formData[question.name] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ))}
                <button type="submit">Submit</button>
              </form>
            </main>
          </div>
        </div>
      );
    }

    export default AcceptableUsePolicyTrainingFormPage;