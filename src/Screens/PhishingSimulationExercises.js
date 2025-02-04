import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";


function PhishingSimulationExercisesFormPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Phishing Simulation Exercises');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
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
            <h1>Phishing Simulation Exercises Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 4.3.1.1.3 Phishing Simulation Exercises */}
                <h2>4.3.1.1.3 Phishing Simulation Exercises:</h2>
                <div className="form-section">
                    <label>How often are phishing simulation exercises conducted to test user vigilance?</label>
                    <div>
                        <input type="text" name="conductedExercises" placeholder="Describe how often" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of phishing tactics (e.g., email, SMS) are included in the simulations?</label>
                    <div>
                        <input type="text" name="phishingTactics" placeholder="Describe the types" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are employees informed of their performance in these exercises (e.g., feedback, follow-up training)?</label>
                    <div>
                        <input type="text" name="informedEmployees" placeholder="Describe how they're informed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What corrective actions or additional training are required for employees who fall for simulated phishing attempts?</label>
                    <div>
                        <input type="text" name="correctiveActions" placeholder="Describe the actions/training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are results from phishing exercises tracked to identify trends and improve the program?</label>
                    <div>
                        <input type="radio" name="trackedResults" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="trackedResults" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default PhishingSimulationExercisesFormPage;