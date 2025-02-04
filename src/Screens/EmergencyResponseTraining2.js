import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EmergencyResponseTraining2Page() {
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Community Partnership/Emergency Response Training2');
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
            <h1>Emergency Response Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Emergency Response Training */}
              <h2>6.1.2.1.2. Emergency Response Training</h2>
              <div className="form-section">
                <label>What specific emergency scenarios are included in the response training exercises?</label>
                <div>
                  <input type="text" name="emergencyScenarios" placeholder="Describe the scenarios" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the training tailored to address the unique needs of the school environment?</label>
                <div>
                  <input type="text" name="trainingAddressingNeeds" placeholder="Describe how it's tailored" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What qualifications or certifications do the trainers have to conduct emergency response training?</label>
                <div>
                  <input type="text" name="trainerQualifications" placeholder="Describe the qualifications/certifications" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often is the emergency response training updated or revised to incorporate new protocols or lessons learned?</label>
                <div>
                  <input type="text" name="updatedEmergencyResponseTraining" placeholder="Describe how often" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What feedback mechanisms are in place to assess the effectiveness of the training from both staff and participants?</label>
                <div>
                  <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default EmergencyResponseTraining2Page;