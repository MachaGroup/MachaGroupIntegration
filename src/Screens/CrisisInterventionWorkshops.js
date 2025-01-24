import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CrisisInterventionWorkshopsPage() {
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
            <h1>Crisis Intervention Workshops</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>
        
        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Crisis Intervention Workshops */}
              <h2>6.1.2.1.3. Crisis Intervention Workshops</h2>
              <div className="form-section">
                <label>What topics are covered in the crisis intervention workshops to prepare staff for various emergency situations?</label>
                <div>
                  <input type="text" name="workshopTopics" placeholder="Describe the topics" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Who leads the workshops, and what qualifications or experience do they have in crisis intervention?</label>
                <div>
                  <input type="text" name="leadingWorkshops" placeholder="Describe who leads and their qualifications" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are participants assessed to ensure they understand and can apply the techniques learned during the workshops?</label>
                <div>
                  <input type="text" name="assessingParticipants" placeholder="Describe how they're assessed and apply the learned techniques" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there follow-up sessions or refresher courses to reinforce the skills learned in the workshops?</label>
                <div>
                  <input type="radio" name="follow-up-sessions" value="yes" onChange={handleChange} /> Yes
                  <input type="radio" name="follow-up-sessions" value="no" onChange={handleChange} /> No
                </div>
              </div>

              <div className="form-section">
                <label>How is feedback from participants collected to improve future workshops and address any gaps in training?</label>
                <div>
                  <input type="text" name="collectingFeedback" placeholder="Describe how it's collected" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default CrisisInterventionWorkshopsPage;