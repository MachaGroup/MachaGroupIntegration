import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SimulatedEmergencyDrillsFormPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Simulated Emergency Drills');
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
          <h1>7.2.1.2.2. Simulated Emergency Drills</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.1.2.2. Simulated Emergency Drills */}
                <h2>7.2.1.2.2. Simulated Emergency Drills:</h2>
                <div className="form-section">
                    <label>What types of emergencies are simulated during the drills (e.g., fire, active shooter, natural disasters)?</label>
                    <div>
                        <input type="text" name="simulatedEmergencies" placeholder="Describe the types of emergencies" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are simulated emergency drills conducted to ensure staff and student preparedness?</label>
                    <div>
                        <input type="text" name="conductedSimulatedDrills" placeholder="Describe how frequent" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What roles do staff and students play during these drills, and how is their participation evaluated?</label>
                    <div>
                        <input type="text" name="staffRoles" placeholder="Describe the roles and how it's evaluated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are the results of the simulated drills analyzed to identify areas for improvement in emergency response?</label>
                    <div>
                        <input type="text" name="analyzedDrillResults" placeholder="Describe how they're analyzed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What changes or updates have been made to emergency plans as a result of insights gained from previous drills?</label>
                    <div>
                        <input type="text" name="updatedPlans" placeholder="Describe the changes/updates" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default SimulatedEmergencyDrillsFormPage;