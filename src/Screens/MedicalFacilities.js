import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MedicalFacilitiesFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Medical Facilities');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Medical Facilities');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
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
            <h1>Medical Facilities Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.2.2 Medical Facilities */}
                <h2>Proximity and Accessibility:</h2>
                <div className="form-section">
                    <label>How are nearby hospitals or medical facilities identified and designated as essential resources for providing medical care, treatment, and support services during emergencies or incidents requiring advanced medical intervention?</label>
                    <div>
                        <input type="text" name="hospitalIdentificationCriteria" placeholder="Describe how they're identified" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are considered when assessing the proximity, accessibility, and capabilities of medical facilities to respond effectively to various types of emergencies, injuries, or medical emergencies within the community?</label>
                    <div>
                        <input type="text" name="hospitalAccessibilityCriteria" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Collaborative Emergency Response:</h2>
                <div className="form-section">
                    <label>How do schools collaborate with local hospitals, healthcare providers, and emergency medical services (EMS) to establish coordinated response protocols, communication channels, and mutual aid agreements for managing medical emergencies on school grounds or in the surrounding area?</label>
                    <div>
                        <input type="text" name="medicalCollaborationProtocols" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are joint training exercises, drills, or simulations conducted regularly to test the interoperability, coordination, and effectiveness of medical response teams, equipment, and procedures during simulated emergencies or mass casualty incidents?</label>
                    <div>
                        <input type="radio" name="medicalTrainingExercises" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="medicalTrainingExercises" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="medicalTrainingExercisesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Resource Availability and Capacity:</h2>
                <div className="form-section">
                    <label>What resources, equipment, and specialized medical capabilities are available at nearby hospitals or medical facilities to support emergency medical care, trauma management, and patient transport for individuals affected by emergencies or disasters?</label>
                    <div>
                        <input type="text" name="hospitalResourceAvailability" placeholder="Describe the resources/equipment/capabilities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contingency plans developed to address potential challenges or surges in demand for medical services, such as during large-scale incidents, pandemics, or public health emergencies, and to ensure continuity of care for patients requiring ongoing treatment or specialized interventions?</label>
                    <div>
                        <input type="radio" name="medicalContingencyPlans" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="medicalContingencyPlans" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="medicalContingencyPlansComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication and Information Sharing:</h2>
                <div className="form-section">
                    <label>How is communication established and maintained between schools, emergency responders, and medical facilities to facilitate the timely exchange of critical information, patient status updates, and medical resource requests during emergencies or incidents requiring medical intervention?</label>
                    <div>
                        <input type="text" name="communicationProtocols" placeholder="Describe how it's established/maintained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols in place for notifying medical facilities of incoming patients, sharing situational awareness, and coordinating medical transport logistics to ensure seamless transitions of care and continuity of treatment for individuals requiring hospitalization or advanced medical care?</label>
                    <div>
                        <input type="radio" name="patientNotificationProtocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="patientNotificationProtocols" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="patientNotificationProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Community Engagement and Education:</h2>
                <div className="form-section">
                    <label>How are community members, including students, staff, families, and local residents, educated about the availability, location, and capabilities of nearby hospitals or medical facilities to address medical needs and emergencies within the community?</label>
                    <div>
                        <input type="text" name="communityMedicalEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are outreach efforts conducted to raise awareness about the importance of timely access to medical care, the role of medical facilities in emergency response, and strategies for seeking medical assistance during emergencies or health-related crises?</label>
                    <div>
                        <input type="radio" name="medicalAwarenessOutreach" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="medicalAwarenessOutreach" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="medicalAwarenessOutreachComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default MedicalFacilitiesFormPage;