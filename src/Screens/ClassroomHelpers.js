import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ClassroomHelpersPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Classroom Helpers');
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
            <h1>Classroom Helpers</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Classroom Helpers */}
                <h2>6.3.1.2.1. Classroom Helpers</h2>
                <div className="form-section">
                    <label>What training is provided to classroom helpers regarding student safety and emergency procedures?</label>
                    <div>
                        <input type="text" name="classroomHelpersTraining" placeholder="Describe the training" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are classroom helpers screened to ensure they are suitable for working with students?</label>
                    <div>
                        <input type="text" name="screeningClassroomHelpers" placeholder="Describe how they're screened" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do classroom helpers contribute to maintaining a safe and supportive environment in the classroom?</label>
                    <div>
                        <input type="text" name="maintainingASafeEnviroment" placeholder="Describe the ways" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are classroom helpers informed about the school’s safety policies and reporting procedures?</label>
                    <div>
                        <input type="text" name="informingClassroomHelpers" placeholder="Describe how they're informed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place for classroom helpers to communicate concerns or suggestions about safety in the classroom?</label>
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

export default ClassroomHelpersPage;