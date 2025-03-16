import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentWorkshopsOnStudentSafetyPage() {
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
        const formsRef = collection(db, 'forms/Community Partnership/Parent Workshops on Student Safety');
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
      const formsRef = collection(db, 'forms/Community Partnership/Parent Workshops on Student Safety');
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
            <h1>Parent Workshops on Student Safety</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Back-to-School Nights */}
                <h2>6.3.1.1.2. Parent Workshops on Student Safety</h2>
                <div className="form-section">
                    <label>What topics are covered in parent workshops focused on student safety?</label>
                    <div>
                        <input type="text" name="parentWorkshopsTopics" placeholder="Describe the topics" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents encouraged to participate in these workshops, and what methods are used to promote attendance?</label>
                    <div>
                        <input type="text" name="parentsParticipatingInWorkshops" placeholder="Describe how they're encouraged and the methods" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for parents to ask questions or share concerns during the workshops?</label>
                    <div>
                        <input type="radio" name="questionOpportunities" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="questionOpportunities" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="questionOpportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of these workshops evaluated in terms of improving parents' understanding of student safety?</label>
                    <div>
                        <input type="text" name="workshopEvaluatedEffectiveness" placeholder="Describe it's evaluated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or materials are provided to parents during these workshops to help them implement safety measures at home?</label>
                    <div>
                        <input type="text" name="resourcesProvided" placeholder="Describe the resources/materials" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>

  )
}

export default ParentWorkshopsOnStudentSafetyPage;