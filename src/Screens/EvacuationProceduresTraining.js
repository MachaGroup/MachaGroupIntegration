import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function EvacuationProceduresTrainingPage() {
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
              const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Evacuation Procedures Training');
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
            <h1>Evacuation Procedures Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Evacuation Procedures Training */}
              <h2>7.2.3.1.2. Evacuation Procedures Training</h2>
              <div className="form-section">
                <label>What are the key components included in the evacuation procedures training for staff?</label>
                <div>
                  <input type="text" name="evacuationComponents" placeholder="Describe key components of evacuation training" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the effectiveness of the evacuation procedures assessed after training sessions?</label>
                <div>
                  <input type="text" name="evacuationEffectiveness" placeholder="Describe how effectiveness is assessed post-training" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there specific evacuation routes and assembly points that staff are trained to use, and how are these communicated?</label>
                <div>
                  <input type="text" name="evacuationRoutes" placeholder="Describe evacuation routes and communication" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often is the evacuation procedures training updated or reviewed for relevance and compliance?</label>
                <div>
                  <input type="text" name="evacuationTrainingReview" placeholder="Describe frequency of review and updates to evacuation training" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What measures are in place to accommodate individuals with disabilities during evacuation procedures?</label>
                <div>
                  <input type="text" name="disabilityAccommodations" placeholder="Describe measures for individuals with disabilities during evacuation" onChange={handleChange}/>
                </div>
              </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EvacuationProceduresTrainingPage;