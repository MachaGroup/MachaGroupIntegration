import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function StrangerDangerAwareness2Page() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Stranger Danger Awareness 2');
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
            <h1>7.2.4.1 Personal Safety Education</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Response To Security Threats */}
                <h3> 7.2.4.1.2 Stranger Danger Awareness 2</h3>
                <label>What programs or materials are used to teach students about stranger danger?</label>
            <div>
              <input type="text" name="strangerDangerPrograms" placeholder="Describe programs or materials used" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How often are stranger danger awareness lessons incorporated into the curriculum?</label>
            <div>
              <input type="text" name="strangerDangerFrequency" placeholder="Describe how often lessons are given" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any role-playing exercises or simulations included in the training for real-life scenarios?</label>
            <div>
              <input type="text" name="rolePlayingExercises" placeholder="Describe role-playing or simulations used" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How do teachers assess student understanding of stranger danger concepts after the training?</label>
            <div>
              <input type="text" name="strangerDangerAssessment" placeholder="Describe assessment methods for understanding" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What resources are provided to parents to reinforce stranger danger awareness at home?</label>
            <div>
              <input type="text" name="parentResources" placeholder="Describe resources provided to parents" onChange={handleChange}/>
            </div>
          </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default StrangerDangerAwareness2Page;