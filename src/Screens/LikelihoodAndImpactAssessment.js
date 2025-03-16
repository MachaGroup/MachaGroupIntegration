import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function LikelihoodAndImpactAssessmentFormPage() {
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
    const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Likelihood and Impact Assessment');
              await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
              });
              console.log('Form Data submitted successfully on back!');
              alert('Form data saved before navigating back!');
            } catch (error) {
              console.error('Error saving form data:', error);
              alert('Failed to save form data before navigating back. Some data may be lost.');
            }
          }
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Likelihood and Impact Assessment');
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
          <h1>7.1.1.2.1. Likelihood and Impact Assessment</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.1.1.2.1. Likelihood and Impact Assessment */}
                <h2>7.1.1.2.1. Likelihood and Impact Assessment:</h2>
                <div className="form-section">
                    <label>Has a Likelihood and Impact  assessment been conducted? If so, when was it last performed?</label>
                    <div>
                        <input type="text" name="conductedLikelihoodAssessment" placeholder="Describe if and when was the last time" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to determine the likelihood of various safety risks occurring at the school?</label>
                    <div>
                        <input type="text" name="determiningSafetyRisks" placeholder="Describe the criteria" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the potential impact of identified risks evaluated in terms of severity and consequences for students and staff?</label>
                    <div>
                        <input type="text" name="evaluatedIdentifiedRisks" placeholder="Describe how the risks are evaluated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are historical data and incident reports considered in the assessment of likelihood and impact?</label>
                    <div>
                        <input type="radio" name="considering-reports" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="considering-reports" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="considering-reports" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently is the likelihood and impact assessment updated to reflect new information or changes in circumstances?</label>
                    <div>
                        <input type="text" name="frequentUpdates" placeholder="Describe how frequent" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What methods are used to communicate the findings of the likelihood and impact assessment to stakeholders, including parents and staff?</label>
                    <div>
                        <input type="text" name="communicationMethods" placeholder="Describe the methods" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>
  )
}

export default LikelihoodAndImpactAssessmentFormPage;