import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MutualAidAgreementsPage() {
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
            <h1>Mutual Aid Agreements</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Mutual Aid Agreements */}
                <h2>6.1.2.2.2. Mutual Aid Agreements</h2>
                <div className="form-section">
                    <label>What specific terms are included in the mutual aid agreements with local fire departments?</label>
                    <div>
                        <input type="text" name="mutualAidAgreementTerms" placeholder="Describe the terms" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are the mutual aid agreements reviewed and updated to reflect current needs and capabilities?</label>
                    <div>
                        <input type="text" name="reviewedMutualAidAgreements" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place to activate mutual aid during a large-scale emergency?</label>
                    <div>
                        <input type="text" name="protocolsActivatingMutualAid" placeholder="Describe the protocols" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is communication facilitated between schools and fire departments during an emergency requiring mutual aid?</label>
                    <div>
                        <input type="text" name="facilitatedCommunication" placeholder="Describe how it's facilitated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training or drills are conducted to ensure all parties understand the mutual aid agreement and their respective roles?</label>
                    <div>
                        <input type="text" name="conductingDrills" placeholder="Describe the training/drills" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default MutualAidAgreementsPage;