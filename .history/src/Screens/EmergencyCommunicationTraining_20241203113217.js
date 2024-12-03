import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";


function EmergencyCommunicationTrainingFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Emergency Communication Training');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
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
            <h1>Emergency Communication Training Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.3 Emergency Communication Training */}
                <h2>Existence of Training Programs:</h2>
                <div className="form-section">
                    <label>Are formal training programs established to provide staff members with the necessary knowledge and skills for effective emergency communication?</label>
                    <div>
                        <input type="radio" name="Training Programs Exist" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Programs Exist" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training programs" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs encompass various aspects of emergency communication, including procedures, protocols, equipment operation, and communication strategies?</label>
                    <div>
                        <input type="radio" name="Training Content Scope" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Content Scope" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Frequency of Training:</h2>
                <div className="form-section">
                    <label>How frequently are emergency communication training sessions conducted for staff members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How frequent" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a schedule or calendar for recurring training sessions, and are sessions held at regular intervals throughout the year?</label>
                    <div>
                        <input type="radio" name="Training Schedule Set" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Schedule Set" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Inclusion of Communication Drills:</h2>
                <div className="form-section">
                    <label>Do emergency communication training programs incorporate practical exercises, drills, or simulations to simulate real-world emergency scenarios?</label>
                    <div>
                        <input type="radio" name="Drills Included" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drills Included" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication drills designed to assess staff members' ability to effectively communicate critical information, follow established protocols, and coordinate response efforts?</label>
                    <div>
                        <input type="radio" name="Drill Effectiveness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Effectiveness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Scenario Variety:</h2>
                <div className="form-section">
                    <label>Are training scenarios diversified to cover a wide range of emergency situations, including natural disasters, security incidents, medical emergencies, and other relevant scenarios?</label>
                    <div>
                        <input type="radio" name="Scenario Variety" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Variety" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scenarios vary in complexity and severity to challenge staff members and enhance their preparedness for different types of emergencies?</label>
                    <div>
                        <input type="radio" name="Scenario Complexity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Complexity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Role-Specific Training:</h2>
                <div className="form-section">
                    <label>Are training sessions tailored to address the specific communication needs and responsibilities of different staff roles or departments?</label>
                    <div>
                        <input type="radio" name="Role-Specific Focus" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role-Specific Focus" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on their roles and responsibilities in initiating, receiving, and relaying emergency communication messages during various emergency scenarios?</label>
                    <div>
                        <input type="radio" name="Role Preparedness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role Preparedness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms incorporated into training sessions to provide staff members with constructive feedback on their performance during communication drills?</label>
                    <div>
                        <input type="radio" name="Feedback Provided" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Provided" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions conducted after drills to review strengths, areas for improvement, and lessons learned, with recommendations for enhancement discussed and documented?</label>
                    <div>
                        <input type="radio" name="Debrief Sessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Debrief Sessions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are emergency communication training programs aligned with broader emergency preparedness and response plans and protocols?</label>
                    <div>
                        <input type="radio" name="Plan Integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Plan Integration" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training scenarios and exercises designed to reinforce and validate emergency communication procedures outlined in emergency plans?</label>
                    <div>
                        <input type="radio" name="Plan Reinforcement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Plan Reinforcement" value="no" onChange={handleChange}/> No
                    </div>
                </div>
                 
                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document staff participation in emergency communication training sessions, including attendance, training materials used, and performance evaluations?</label>
                    <div>
                        <input type="radio" name="Training Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Records" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?</label>
                    <div>
                        <input type="radio" name="Records Accessible" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Records Accessible" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EmergencyCommunicationTrainingFormPage;