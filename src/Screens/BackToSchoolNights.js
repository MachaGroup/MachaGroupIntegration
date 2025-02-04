import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BackToSchoolNightsPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Back-to-School Nights');
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
            <h1>Back-to-School Nights</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Back-to-School Nights */}
                <h2>6.3.1.1.1. Back-to-School Nights</h2>
                <div className="form-section">
                    <label>What activities are typically planned for Back-to-School Nights to engage families?</label>
                    <div>
                        <input type="text" name="engagingFamilyActivities" placeholder="Describe the activities" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents informed about the purpose and schedule of Back-to-School Nights?</label>
                    <div>
                        <input type="text" name="informingParents" placeholder="Describe how they're informed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What opportunities are provided for parents to connect with teachers and school staff during these events?</label>
                    <div>
                        <input type="text" name="parentsAndTeachersConnecting" placeholder="Describe the opportunities" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from families collected after Back-to-School Nights to improve future events?</label>
                    <div>
                        <input type="text" name="familyFeedback" placeholder="Describe how it's collected" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there any specific resources or information shared with families during Back-to-School Nights to support student success?</label>
                    <div>
                        <input type="radio" name="sharedResources" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="sharedResources" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default BackToSchoolNightsPage;