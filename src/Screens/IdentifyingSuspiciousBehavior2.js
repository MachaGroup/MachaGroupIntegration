import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IdentifyingSuspiciousBehavior2Page() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Identifying Suspicious Behavior 2');
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
            <h1>7.2.3.2 Security Awareness Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                
                {/* Identifying Suspicious Behavior 2 */}
                <h2> 7.2.3.2.1 Identifying Suspicious Behavior 2:</h2>
                <div className="form-section">
                  <label>What specific behaviors are staff trained to recognize as suspicious in the school environment?</label>
                    <div>
                      <input type="text" name="suspiciousBehavior" placeholder="Describe behaviors considered suspicious in the school" onChange={handleChange}/>
                    </div>
                  </div>

                <div className="form-section">
                  <label>How is the training for identifying suspicious behavior conducted (e.g., workshops, online modules)?</label>
                  <div>
                    <input type="text" name="suspiciousBehaviorTrainingMethod" placeholder="Describe methods for training to identify suspicious behavior" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>What resources or tools are provided to staff for reporting suspicious behavior?</label>
                  <div>
                    <input type="text" name="reportingResources" placeholder="Describe resources for reporting suspicious behavior" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>How often is the training on identifying suspicious behavior reviewed or updated to reflect current security concerns?</label>
                  <div>
                    <input type="text" name="suspiciousBehaviorTrainingReview" placeholder="Describe review/update frequency for suspicious behavior training" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are there real-life scenarios or examples included in the training to help staff better understand suspicious behavior?</label>
                  <div>
                    <input type="text" name="realLifeScenarios" placeholder="Describe inclusion of real-life scenarios in training" onChange={handleChange}/>
                  </div>
                </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default IdentifyingSuspiciousBehavior2Page;