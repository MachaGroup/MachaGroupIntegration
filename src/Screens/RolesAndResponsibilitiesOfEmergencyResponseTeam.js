import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RolesAndResponsibilitiesOfEmergencyResponseTeamFormPage() {
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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Roles and Responsilibilities of Emergency Response Team');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Roles and Responsilibilities of Emergency Response Team');
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
          <h1>7.2.1.1.1. Roles and Responsibilities of Emergency Response Team</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.1.1.1. Roles and Responsibilities of Emergency Response Team */}
                <h2>7.2.1.1.1. Roles and Responsibilities of Emergency Response Team:</h2>
                <div className="form-section">
                    <label>What specific roles and responsibilities are assigned to each member of the Emergency Response Team?</label>
                    <div>
                        <input type="text" name="memberRoles" placeholder="Describe the roles and responsibilities" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the Emergency Response Team structured to ensure effective communication during an incident?</label>
                    <div>
                        <input type="text" name="effectiveCommunication" placeholder="Describe how it's structured" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training and qualifications are required for members of the Emergency Response Team?</label>
                    <div>
                        <input type="text" name="requiredTraining" placeholder="Describe the training and qualifications" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often does the Emergency Response Team participate in drills or training exercises to practice their roles?</label>
                    <div>
                        <input type="text" name="participatingInDrills" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear protocols for how the Emergency Response Team interacts with external agencies during an emergency? If so, what are they?</label>
                    <div>
                        <input type="text" name="interactionProtocols" placeholder="Describe the protocols" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default RolesAndResponsibilitiesOfEmergencyResponseTeamFormPage;