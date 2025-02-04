import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentTeacherConferencesPage() {
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
      const formsRef = collection(db, 'forms/Community Partnership/Parent-Teacher Conferences');
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
            <h1>Parent-Teacher Conferences</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Parent-Teacher Conferences */}
                <h2>6.3.1.1.3. Parent-Teacher Conferences</h2>
                <div className="form-section">
                    <label>How often are parent-teacher conferences held to discuss student safety and well-being?</label>
                    <div>
                        <input type="text" name="oftenParentTeacherConferences" placeholder="Describe how often" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific safety topics are typically addressed during these conferences?</label>
                    <div>
                        <input type="text" name="specificSafetyTopics" placeholder="Describe the topics" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents informed about the importance of discussing safety concerns during these meetings?</label>
                    <div>
                        <input type="text" name="informedParentsAboutSafety" placeholder="Describe how they're informed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or handouts provided to parents during conferences to help them understand school safety policies?</label>
                    <div>
                        <input type="radio" name="providedResources" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="providedResources" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do teachers and staff follow up on safety discussions that occur during parent-teacher conferences?</label>
                    <div>
                        <input type="text" name="safetyDiscussionFollowUp" placeholder="Describe how they follow up" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default ParentTeacherConferencesPage;