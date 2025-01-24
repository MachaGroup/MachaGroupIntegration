import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SROTrainingAndCertificationPage() {
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
            <h1>SRO Training and Certification</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* SRO Training and Certification */}
              <h2>6.1.1.1.2. SRO Training and Certification</h2>
              <div className="form-section">
                <label>What are the core components of the training curriculum for School Resource Officers (SROs)?</label>
                <div>
                  <input type="text" name="coreComponents" placeholder="List the components" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often do SROs undergo training and certification updates to stay current with best practices?</label>
                <div>
                  <input type="text" name="trainingUpdates" placeholder="Describe how often" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What specialized training is required for SROs in areas such as conflict resolution and mental health awareness?</label>
                <div>
                  <input type="text" name="requiredSpecializedTraining" placeholder="Describe the training" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How do training programs ensure that SROs are equipped to handle emergencies and critical incidents in schools?</label>
                <div>
                  <input type="text" name="trainingPrograms" placeholder="Describe how they're equipped" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there any certification programs specifically tailored for SROs, and what do they entail?</label>
                <div>
                  <input type="text" name="certificationPrograms" placeholder="Describe the programs" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>
            
            </form>
        </main>

    </div>

  )
}

export default SROTrainingAndCertificationPage;