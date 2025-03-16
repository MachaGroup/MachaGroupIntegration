import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PlanningCommunityOutreachStrategiesPage() {
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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Community Partnership/Planning Community Outreach Strategies');
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
    navigate(-1);
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
      const formsRef = collection(db, 'forms/Community Partnership/Planning Community Outreach Strategies');
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
            <h1>Planning Community Outreach Strategies</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Planning Community Outreach Strategies */}
                <h2>6.3.2.3.3. Planning Community Outreach Strategies</h2>
                <div className="form-section">
                    <label>What specific outreach methods will be used to engage with community members regarding school safety?</label>
                    <div>
                        <input type="text" name="outreachMethods" placeholder="Describe the methods" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How will the effectiveness of outreach strategies be measured and evaluated?</label>
                    <div>
                        <input type="text" name="effectiveOutreachStrategies" placeholder="Describe how it'll be measured and evaluated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What role will community feedback play in shaping future outreach initiatives?</label>
                    <div>
                        <input type="text" name="communityFeedbackRole" placeholder="Describe the role" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How will the school ensure inclusivity in its outreach efforts to reach diverse community groups?</label>
                    <div>
                        <input type="text" name="diverseCommunityGroups" placeholder="Describe how it'll ensure inclusitivity" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or partnerships will be leveraged to enhance community outreach efforts?</label>
                    <div>
                        <input type="text" name="leveregedResources" placeholder="Describe the resources" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            
            </form>
        </main>
    </div>

  )
}

export default PlanningCommunityOutreachStrategiesPage;