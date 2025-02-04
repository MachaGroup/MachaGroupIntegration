import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AssessingCommunityNeedsAndPrioritiesPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Assessing Community Needs and Priorities');
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
            <h1>Assessing Community Needs and Priorities</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Assessing Community Needs and Priorities */}
                <h2>6.3.2.3.2. Assessing Community Needs and Priorities</h2>
                <div className="form-section">
                    <label>How are community needs and priorities related to school safety identified and prioritized?</label>
                    <div>
                        <input type="text" name="identifyingCommunityNeeds" placeholder="Describe how they're identified and prioritized" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or methods are used to assess the specific safety concerns of community members?</label>
                    <div>
                        <input type="text" name="toolsAssessingSafetyConcerns" placeholder="Describe the tools" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often is the assessment of community needs conducted to ensure it reflects current conditions?</label>
                    <div>
                        <input type="text" name="conductedAssessmentOfCommunityNeeds" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways are community members involved in the process of identifying their safety needs and priorities?</label>
                    <div>
                        <input type="text" name="involvedCommunityMemebers" placeholder="Describe the ways they're involved" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How do the assessed needs influence the development of school safety programs and initiatives?</label>
                    <div>
                        <input type="text" name="assessedNeeds" placeholder="Describe the influence" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default AssessingCommunityNeedsAndPrioritiesPage;