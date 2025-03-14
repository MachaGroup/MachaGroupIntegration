import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CriticalFunctionIdentificationFormPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Critical Function Identification');
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
          <h1>7.2.2.2.1. Critical Function Identification</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.2.2.1. Critical Function Identification */}
                <h2>7.2.2.2.1. Critical Function Identification:</h2>
                <div className="form-section">
                    <label>What criteria are used to determine which functions are considered critical to the operation of the school during an emergency?</label>
                    <div>
                        <input type="text" name="criticalFunctions" placeholder="Describe the criteria" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are essential staff and their roles identified for maintaining critical functions during a disruption?</label>
                    <div>
                        <input type="text" name="identifiedRoles" placeholder="Describe how they're identified" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are in place to ensure that critical functions can be sustained during a crisis or emergency situation?</label>
                    <div>
                        <input type="text" name="sustainedCriticalFunctions" placeholder="Describe the processes" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are the critical functions reviewed and updated to reflect changes in school operations or community needs?</label>
                    <div>
                        <input type="text" name="reviewedFunctions" placeholder="Describe how frequent" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific resources allocated to support the continuity of critical functions, and how are these resources monitored and managed?</label>
                    <div>
                        <input type="text" name="supportResources" placeholder="Describe the resources" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>
            
            </form>
        </main>

    </div>

  )
}

export default CriticalFunctionIdentificationFormPage;