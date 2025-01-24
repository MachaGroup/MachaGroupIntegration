import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PhysicalHazardsAssessmentFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/CPR Certification');
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
            <h1>7.1.1.1.1. Physical Hazards Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.1.1.1.1. Physical Hazards Assessment */}
                <h2>7.1.1.1.1. Physical Hazards Assessment:</h2>
                <div className="form-section">
                    <label>Has a Physical Hazards assessment been conducted? If so, when was it last performed?</label>
                    <div>
                        <input type="text" name="conductedPhysicalHazardsAssessment" placeholder="Describe if and when was the last time" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to identify physical hazards within the school environment?</label>
                    <div>
                        <input type="text" name="identifyingPhysicalHazards" placeholder="Describe the criteria" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often is the physical hazards assessment conducted?</label>
                    <div>
                        <input type="text" name="oftenConductingPhysicalHazards" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or methods are utilized to assess physical hazards?</label>
                    <div>
                        <input type="text" name="utilizedTools" placeholder="Describe the tools" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there any known physical hazards present in the school's vicinity?</label>
                    <div>
                        <input type="text" name="presentPhysicalHazards" placeholder="Describe if there are any physical hazards" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are the results of the physical hazards assessment communicated to staff and stakeholders?</label>
                    <div>
                        <input type="text" name="communicatedResults" placeholder="Describe how results are communicated" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>
                
            </form>
        </main>
    </div>

  )
}

export default PhysicalHazardsAssessmentFormPage;