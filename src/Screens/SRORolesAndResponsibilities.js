import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SRORolesAndResponsibilitiesPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/SRO Roles and Responsibilities');
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
            <h1>SRO Roles and Responsibilities</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* SRO Roles and Responsibilities */}
              <h2>6.1.1.1.1. SRO Roles and Responsibilities</h2>
              <div className="form-section">
                <label>What specific duties do School Resource Officers (SROs) perform within the school environment?</label>
                <div>
                  <input type="text" name="sroDuties" placeholder="Describe the duties" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How do SROs collaborate with school administration and staff to enhance safety?</label>
                <div>
                  <input type="text" name="srosCollaborating" placeholder="Describe how they collaborate" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What training or qualifications are required for SROs working in schools?</label>
                <div>
                  <input type="text" name="requiredTraining" placeholder="Describe the training/qualifications" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How do SROs contribute to emergency preparedness and response planning?</label>
                <div>
                  <input type="text" name="sroEmergencyPrepareness" placeholder="Describe how they contribute" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>In what ways do SROs engage with students to build trust and rapport within the school community?</label>
                <div>
                  <input type="text" name="sroEngagingWithStudents" placeholder="Describe how they engage" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </form>
        </main>

    </div>

  )
}

export default SRORolesAndResponsibilitiesPage;