import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function FireSafetyTrainingPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Fire Safety Training');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.2.3.1 Safety Procedures Training (COOP)</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Fire Safety Training */}
                <h3> 7.2.3.1.1 Fire Safety Training</h3>
                <label>What specific topics are covered in the fire safety training program for staff?</label>
            <div>
              <input type="text" name="fireSafetyTopics" placeholder="Describe topics covered in fire safety training" />
            </div>
          </div>

          <div className="form-section">
            <label>How often is fire safety training conducted for employees?</label>
            <div>
              <input type="text" name="fireSafetyFrequency" placeholder="Describe how often fire safety training is conducted" />
            </div>
          </div>

          <div className="form-section">
            <label>What methods are used to evaluate staff understanding and retention of fire safety protocols?</label>
            <div>
              <input type="text" name="fireSafetyEvaluation" placeholder="Describe methods for evaluating fire safety understanding" />
            </div>
          </div>

          <div className="form-section">
            <label>Are fire drills incorporated into the training program, and if so, how frequently are they held?</label>
            <div>
              <input type="text" name="fireDrillsFrequency" placeholder="Describe frequency of fire drills" />
            </div>
          </div>

          <div className="form-section">
            <label>How is the training adjusted based on feedback from participants or after incidents?</label>
            <div>
              <input type="text" name="fireSafetyFeedback" placeholder="Describe adjustments to training based on feedback" />
            </div>
          </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default FireSafetyTrainingPage;