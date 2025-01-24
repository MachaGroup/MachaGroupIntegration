import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentChaperonesForFieldTripsPage() {
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
            <h1>Parent Chaperones for Field Trips</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Parent Chaperones for Field Trips */}
                <h2>6.3.1.2.2. Parent Chaperones for Field Trips</h2>
                <div className="form-section">
                    <label>What requirements must parent chaperones meet before being allowed to accompany students on field trips?</label>
                    <div>
                        <input type="text" name="parentChaperonesRequirements" placeholder="Describe the requirements" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parent chaperones trained on emergency procedures and student safety protocols during field trips?</label>
                    <div>
                        <input type="text" name="parentChaperonesTraining" placeholder="Describe how they're trained" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What responsibilities do parent chaperones have in ensuring the safety and well-being of students while on outings?</label>
                    <div>
                        <input type="text" name="parentChaperonesResponsibilities" placeholder="Describe the responsibilities" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is communication between teachers and parent chaperones handled before, during, and after field trips?</label>
                    <div>
                        <input type="text" name="teacherParentChaperonesCommunication" placeholder="Describe how it's handled" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What process is in place for parents to report any safety concerns they observe during field trips?</label>
                    <div>
                        <input type="text" name="reportingProcess" placeholder="Describe the process" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default ParentChaperonesForFieldTripsPage;