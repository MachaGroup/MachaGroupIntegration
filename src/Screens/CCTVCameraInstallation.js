import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CCTVCameraInstallationPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/CCTV Camera Installation and Monitoring');
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
            <h1>7.3.1.2.1. CCTV Camera Installation and Monitoring</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* CCTV Camera Installation and Monitoring */}
              <h2>7.3.1.2.1. CCTV Camera Installation and Monitoring</h2>
              <div className="form-section">
                <label>What criteria are used to determine the placement of CCTV cameras throughout the facility?</label>
                <div>
                  <input type="text" name="cctvPlacementCriteria" placeholder="Describe placement criteria for CCTV cameras" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the footage from CCTV cameras monitored, and who is responsible for monitoring?</label>
                <div>
                  <input type="text" name="cctvMonitoring" placeholder="Describe monitoring processes" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What is the retention period for recorded footage, and how is it securely stored?</label>
                <div>
                  <input type="text" name="cctvRetention" placeholder="Describe retention period and storage practices" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there policies in place regarding the access and review of recorded footage by authorized personnel?</label>
                <div>
                  <input type="text" name="cctvAccessPolicy" placeholder="Describe policies for accessing CCTV footage" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often is the CCTV system evaluated for effectiveness and updated as needed?</label>
                <div>
                  <input type="text" name="cctvSystemEvaluation" placeholder="Describe evaluation and update frequency" onChange={handleChange}/>
                </div>
              </div>

          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default CCTVCameraInstallationPage;