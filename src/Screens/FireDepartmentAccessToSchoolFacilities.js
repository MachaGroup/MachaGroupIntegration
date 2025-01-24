import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function FireDepartmentAccessToSchoolFacilitiesPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Evacuation Procedures Training');
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
            <h1>Fire Department Access to School Facilities</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Fire Department Access to School Facilities */}
                <h2>6.1.2.2.1. Fire Department Access to School Facilities</h2>
                <div className="form-section">
                    <label>What protocols are in place for fire department personnel to access school grounds during emergencies?</label>
                    <div>
                        <input type="text" name="fireDepartmentPersonnelProtocols" placeholder="Describe the protocols" onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>How is access to the school's blueprints and layout provided to the fire department for effective emergency response?</label>
                    <div>
                        <input type="text" name="blueprintsForEffectiveness" placeholder="Describe how it's provided for effectiveness" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated entry points for emergency services, and how are they communicated to staff and students?</label>
                    <div>
                        <input type="text" name="entryPoints" placeholder="Describe the entry points and they're communicated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training do school staff receive regarding cooperating with fire department personnel during an emergency?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are joint inspections conducted with the fire department to ensure accessibility and readiness of emergency routes?</label>
                    <div>
                        <input type="text" name="frequentJointInspections" placeholder="Describe how frequent" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default FireDepartmentAccessToSchoolFacilitiesPage;