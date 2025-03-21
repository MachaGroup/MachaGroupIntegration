import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function FundraisingEventsPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Fundraising Events');
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
            <h1>Fundraising Events</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Fundraising Events */}
                <h2>6.3.1.2.3. Fundraising Events</h2>
                <div className="form-section">
                    <label>What types of fundraising events are organized to support student safety initiatives and programs?</label>
                    <div>
                        <input type="text" name="fundraisingEvents" placeholder="Describe the events" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How do fundraising events engage parents and the community in promoting school safety?</label>
                    <div>
                        <input type="text" name="fundraisingEventsEngagingParents" placeholder="Describe how they engage" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure the safety of students during fundraising events?</label>
                    <div>
                        <input type="text" name="safetyMeasures" placeholder="Describe the measures" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the use of funds raised communicated to parents and the community?</label>
                    <div>
                        <input type="text" name="communicatedRaisedFunds" placeholder="Describe how it's communicated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place for parents and community members to suggest ideas for future fundraising events?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default FundraisingEventsPage;