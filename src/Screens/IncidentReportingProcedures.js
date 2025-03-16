import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IncidentReportingProceduresFormPage() {
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
            const formsRef = collection(db, 'forms/Personnel Training and Awareness/Incident Reporting Procedures');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Incident Reporting Procedures');
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
            <h1>Incident Reporting Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.5.1.2 Incident Reporting Procedures */}
                <div className="form-section">
                    <label>What are the steps for reporting a security incident (e.g., whom to contact, what information to provide)?</label>
                    <div>
                        <input type="text" name="incidentReportingSteps" placeholder="List the steps" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific timeframes for reporting incidents, and what are the consequences of delayed reporting?</label>
                    <div>
                        <input type="radio" name="incidentReportingTimeframes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="incidentReportingTimeframes" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="incidentReportingTimeFrames" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What channels are available for reporting (e.g., hotline, email, incident management system)?</label>
                    <div>
                        <input type="text" name="incidentReportingChannels" placeholder="List the channels" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is anonymity handled in the reporting process, if an employee prefers to remain anonymous?</label>
                    <div>
                        <input type="text" name="incidentReportingAnonymity" placeholder="Describe how it's handled" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What follow-up actions can employees expect after reporting an incident (e.g., investigation, status updates)?</label>
                    <div>
                        <input type="text" name="incidentReportingFollowUp" placeholder="Describe the actions" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default IncidentReportingProceduresFormPage;