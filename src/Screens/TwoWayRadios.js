import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";


function TwoWayRadiosFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Two-way Radios');
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
            <h1>Two-Way Radios Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.1 Two-Way Radios */}
                <h2>Availability of Two-way Radios:</h2>
                <div className="form-section">
                    <label>Are two-way radios provided to staff members who require them for communication during emergencies or daily operations?</label>
                    <div>
                        <input type="radio" name="Radios Provided" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Radios Provided" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there an adequate number of two-way radios available to ensure that all relevant staff members are equipped for communication?</label>
                    <div>
                        <input type="radio" name="Adequate Radios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Adequate Radios" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Coverage and Range:</h2>
                <div className="form-section">
                    <label>Do two-way radios provide sufficient coverage and range to facilitate communication across the entire facility or campus?</label>
                    <div>
                        <input type="radio" name="Sufficient Coverage" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Sufficient Coverage" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there measures in place to address potential dead zones or areas with poor radio reception?</label>
                    <div>
                        <input type="radio" name="Dead Zone Measures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Dead Zone Measures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="deadZoneMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Channel Assignment and Management:</h2>
                <div className="form-section">
                    <label>Are specific radio channels assigned for different purposes, such as emergency communication, general staff communication, or coordination between departments?</label>
                    <div>
                        <input type="radio" name="Channel Assignment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Channel Assignment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a protocol for managing radio channels to prevent interference and ensure clear communication during emergencies?</label>
                    <div>
                        <input type="radio" name="Channel Management" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Channel Management" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="channelManagement" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to use two-way radios effectively, including proper radio etiquette, channel selection, and basic troubleshooting?</label>
                    <div>
                        <input type="radio" name="Radio Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Radio Training" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are practice sessions or drills conducted to familiarize staff members with radio communication procedures and simulate emergency scenarios?</label>
                    <div>
                        <input type="radio" name="Drill Familiarization" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Familiarization" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2> Emergency Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are protocols established for using two-way radios during emergencies, specifying roles, responsibilities, and procedures for initiating, receiving, and relaying critical information?</label>
                    <div>
                        <input type="radio" name="Emergency Protocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Emergency Protocols" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="emergencyProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on emergency communication protocols and aware of their roles and responsibilities in using two-way radios during different types of emergencies?</label>
                    <div>
                        <input type="radio" name="Emergency Role Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Emergency Role Training" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Battery Management and Maintenance:</h2>
                <div className="form-section">
                    <label>Are batteries for two-way radios regularly inspected, charged, and replaced as needed to ensure that radios remain operational during emergencies?</label>
                    <div>
                        <input type="radio" name="Battery Inspection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Battery Inspection" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a protocol for storing and maintaining two-way radios to prolong their lifespan and minimize the risk of malfunctions or equipment failures?</label>
                    <div>
                        <input type="radio" name="Storage Protocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Storage Protocols" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="storageProtocols" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are two-way radios integrated into broader emergency communication and response plans, ensuring seamless coordination with other communication systems and protocols?</label>
                    <div>
                        <input type="radio" name="Radio Integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Radio Integration" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated procedures for incorporating two-way radio communication into emergency drills, exercises, and simulations to assess effectiveness and identify areas for improvement?</label>
                    <div>
                        <input type="radio" name="Drill Integration Procedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Integration Procedures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="drillIntegrationProcedures" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from staff members regarding the usability, reliability, and effectiveness of two-way radios for communication during emergencies?</label>
                    <div>
                        <input type="radio" name="Feedback Mechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Mechanisms" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing two-way radio communication protocols and equipment considered and implemented as part of ongoing improvement efforts?</label>
                    <div>
                        <input type="radio" name="Improvement Recommendations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Improvement Recommendations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default TwoWayRadiosFormPage;