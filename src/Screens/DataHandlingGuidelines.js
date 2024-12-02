import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function DataHandlingGuidelinesFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Handling Guidelines');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Data Handling Guidelines Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.4.3.1.2 Data Handling Guidelines */}
                <div className="form-section">
                    <label>What are the key steps for securely storing and transmitting sensitive data?</label>
                    <div>
                        <input type="text" name="storingData" placeholder="Describe the key steps" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees classify data based on sensitivity (e.g., public, confidential, restricted)?</label>
                    <div>
                        <input type="text" name="classifyingData" placeholder="Describe how they classify data" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures must be followed when sharing data with external parties?</label>
                    <div>
                        <input type="text" name="sharingData" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What actions should employees take in the event of accidental data exposure or loss?</label>
                    <div>
                        <input type="text" name="accidentalExposure" placeholder="Describe the actions" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How often should employees review and update their understanding of data handling policies?</label>
                    <div>
                        <input type="text" name="employeesReviewing" placeholder="Describe how they review/update" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default DataHandlingGuidelinesFormPage;