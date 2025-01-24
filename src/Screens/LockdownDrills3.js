import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function LockdownDrills3Page() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Lockdown Drills 3');
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
            <h1>7.2.4.2.2 Lockdown Drills</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Lockdown Drills 3 */}
                <h2> 7.2.4.2.2 Lockdown Drills: </h2>
                <label>How frequently are lockdown drills conducted in the school?</label>
                  <div>
                    <input type="text" name="lockdownDrillFrequency" placeholder="Describe frequency of lockdown drills" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>What are the specific procedures students and staff must follow during a lockdown drill?</label>
                  <div>
                    <input type="text" name="lockdownProcedures" placeholder="Describe specific procedures for lockdown drills" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>How are the outcomes of lockdown drills evaluated, and what changes are made based on that evaluation?</label>
                  <div>
                    <input type="text" name="lockdownDrillEvaluation" placeholder="Describe evaluation of lockdown drill outcomes" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>How does the school communicate the lockdown procedures to students, especially new students or those with special needs?</label>
                  <div>
                    <input type="text" name="lockdownCommunication" placeholder="Describe how lockdown procedures are communicated" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are there mechanisms in place for students and parents to provide feedback on the effectiveness of the lockdown drills?</label>
                  <div>
                    <input type="text" name="lockdownDrillFeedback" placeholder="Describe feedback mechanisms for lockdown drills" onChange={handleChange}/>
                  </div>
                </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default LockdownDrills3Page;