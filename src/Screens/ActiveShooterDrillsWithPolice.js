import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function ActiveShooterDrillsWithPolicePage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress'); 
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
                      const formsRef = collection(db, 'forms/Community Partnership/Active Shooter Drills with Police');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Community Partnership/Active Shooter Drills with Police');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!')
      alert('Form Submitted successfully!');
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
            <h1>Active Shooter Drills with Police</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Active Shooter Drills with Police */}
              <h2>6.1.2.1.1. Active Shooter Drills with Police</h2>
              <div className="form-section">
                <label>What are the objectives and goals of conducting active shooter drills in collaboration with law enforcement?</label>
                <div>
                  <input type="text" name="collaborationObjectives" placeholder="Describe the objectives/goals" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How frequently are active shooter drills conducted, and what factors determine the schedule?</label>
                <div>
                  <input type="text" name="frequentlyConductedDrills" placeholder="Describe how frequent and what determines the schedule" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What roles do school staff and law enforcement play during these drills, and how are these roles communicated?</label>
                <div>
                  <input type="text" name="staffRoles" placeholder="Describe the roles and how they're communicated" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are the outcomes and effectiveness of the active shooter drills evaluated after completion?</label>
                <div>
                  <input type="text" name="evaluatedDrillsOutcomes" placeholder="Describe how they're evaluated" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What measures are in place to address psychological impacts on students and staff participating in these drills?</label>
                <div>
                  <input type="text" name="psychologicalImpacts" placeholder="Describe the measures" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>
              
            </form>
        </main>
    </div>

  )
}

export default ActiveShooterDrillsWithPolicePage;