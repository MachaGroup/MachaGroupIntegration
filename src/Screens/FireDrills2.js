import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function FireDrills2Page() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Fire Drills 2');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.2.4.2 Emergency Response Drills for Students</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Fire Drills 2 */}
                <h3> 7.2.4.2.1 Fire Drills 2</h3>
                <label>How often are fire drills conducted throughout the school year?</label>
            <div>
              <input type="text" name="fireDrillFrequency" placeholder="Describe frequency of fire drills" />
            </div>
          </div>

          <div className="form-section">
            <label>What procedures are in place to ensure that all students and staff can evacuate the building quickly and safely during a fire drill?</label>
            <div>
              <input type="text" name="evacuationProcedures" placeholder="Describe procedures for safe evacuation" />
            </div>
          </div>

          <div className="form-section">
            <label>How is student participation in fire drills tracked and assessed for compliance?</label>
            <div>
              <input type="text" name="fireDrillTracking" placeholder="Describe tracking and assessment of participation" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there accommodations for students with disabilities during fire drills, and how are those addressed?</label>
            <div>
              <input type="text" name="disabilityAccommodations" placeholder="Describe accommodations for students with disabilities" />
            </div>
          </div>

          <div className="form-section">
            <label>How is feedback collected after fire drills to improve future drill procedures?</label>
            <div>
              <input type="text" name="fireDrillFeedback" placeholder="Describe methods for collecting feedback post-drills" />
            </div>
          </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default FireDrills2Page;