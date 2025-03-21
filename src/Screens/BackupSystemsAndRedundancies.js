import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BackupSystemsAndRedundanciesFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Backup Systems and Redundancies');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
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
          <h1>7.2.2.2.2. Backup Systems and Redundancies</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.2.2.2. Backup Systems and Redundancies */}
                <h2>7.2.2.2.2. Backup Systems and Redundancies:</h2>
                <div className="form-section">
                    <label>What types of backup systems are in place to ensure data integrity and availability during an emergency?</label>
                    <div>
                        <input type="text" name="systemsEnsuringDataIntegrity" placeholder="Describe the types" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are redundancies established to maintain critical operations when primary systems fail?</label>
                    <div>
                        <input type="text" name="maintainingCriticalOperations" placeholder="Describe how it's maintained" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to test and validate the effectiveness of backup systems and redundancies?</label>
                    <div>
                        <input type="text" name="validatingEffectiveness" placeholder="Describe the procedures" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are backup systems updated to reflect the latest data and operational changes?</label>
                    <div>
                        <input type="text" name="frequentUpdates" placeholder="Describe how frequent" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training is provided to staff regarding the use of backup systems and understanding redundancies in place?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default BackupSystemsAndRedundanciesFormPage;