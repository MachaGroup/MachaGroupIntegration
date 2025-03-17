import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function AcceptableUsePolicyTrainingFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  // Function to handle back button
  const handleBack = async () => {
            if (formData && buildingId) { // Check if formData and buildingId exist
              try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Personnel Training and Awareness/Acceptable Use Policy Training');
                await addDoc(formsRef, {
                  building: buildingRef,
                  formData: formData,
                });
                console.log('Form Data submitted successfully on back!');
                alert('Form data saved before navigating back!');
              } catch (error) {
                console.error('Error saving form data:', error);
                alert('Failed to save form data before navigating back. Some data may be lost.');
              }
            }
            navigate(-1);
          };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Acceptable Use Policy Training');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
    }
};

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Acceptable Use Policy (AUP) Training Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.4.3.1 Acceptable Use Policy (AUP) Training */}
                <div className="form-section">
                    <label>What activities are restricted under the Acceptable Use Policy (AUP)?</label>
                    <div>
                        <input type="text" name="restrictedActivities" placeholder="List the activities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees handle personal device usage in the workplace (e.g., BYOD policies)?</label>
                    <div>
                        <input type="text" name="deviceHandling" placeholder="Describe how they handle usage" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What are the consequences of violating the AUP?</label>
                    <div>
                        <input type="text" name="violatingConsequences" placeholder="List the consequences" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How can employees report potential AUP violations or issues?</label>
                    <div>
                        <input type="text" name="violationReport" placeholder="Describe how they report" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>When and how are employees required to complete AUP training?</label>
                    <div>
                        <input type="text" name="requiredCompletion" placeholder="Describe when/how they're required" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default AcceptableUsePolicyTrainingFormPage;