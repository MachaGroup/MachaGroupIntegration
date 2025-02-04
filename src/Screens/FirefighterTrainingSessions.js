import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function FirefighterTrainingSessionsPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Firefighter Training Sessions');
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
            <h1>Firefighter Training Sessions</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Firefighter Training Sessions */}
                <h2>6.1.2.2.3. Firefighter Training Sessions</h2>
                <div className="form-section">
                    <label>What types of training sessions are conducted for firefighters in collaboration with schools?</label>
                    <div>
                        <input type="text" name="collaborationTrainingSessions" placeholder="Describe the sessions" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are these training sessions tailored to address the specific needs of the school environment?</label>
                    <div>
                        <input type="text" name="trainingSessionsAddressingNeeds" placeholder="Describe how they're addressing the needs" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What qualifications and experience do trainers have to ensure effective firefighter training sessions?</label>
                    <div>
                        <input type="text" name="trainersQualifications" placeholder="Describe the qualifications" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are firefighter training sessions held, and what is the process for evaluating their effectiveness?</label>
                    <div>
                        <input type="text" name="oftenTrainingSessionsAndEffectiveness" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place for school staff and students to share their experiences from these training sessions?</label>
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

export default FirefighterTrainingSessionsPage;