import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function TabletopExercisesFormPage() {
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
          <h1>Tabletop Exercises</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.1.2.1. Tabletop Exercises */}
                <h2>7.2.1.2.1. Tabletop Exercises:</h2>
                <div className="form-section">
                    <label>What scenarios are typically used during tabletop exercises to evaluate emergency response plans?</label>
                    <div>
                        <input type="text" name="tabletopExercisesScenarios" placeholder="Describe the scenarios" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are tabletop exercises conducted to ensure preparedness for various emergencies?</label>
                    <div>
                        <input type="text" name="conductedTabletopExercises" placeholder="Describe how often they're conducted" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Who participates in these tabletop exercises, and what roles do they assume during the scenarios?</label>
                    <div>
                        <input type="text" name="rolesAndParticipants" placeholder="Describe who partipicates and what are their roles" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are the outcomes of the tabletop exercises documented and used to improve emergency response plans?</label>
                    <div>
                        <input type="text" name="documentedOutcomes" placeholder="Describe how the outcomes are documented" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place to gather insights from participants after each tabletop exercise?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default TabletopExercisesFormPage;