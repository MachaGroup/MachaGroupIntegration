import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function LawEnforcementPartnershipFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Law Enforcement Partnerships');
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
          navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Law Enforcement Partnerships');
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
            <h1>Law Enforcement Partnership Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.1.1 Law Enforcement Partnership */}
                <h2>Nature and Scope of Partnership:</h2>
                <div className="form-section">
                    <label>How is the partnership between the school or educational institution and local law enforcement agencies established, formalized, and maintained?</label>
                    <div>
                        <input type="text" name="partnershipEstablishment" placeholder="Describe the partnership" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific goals, objectives, or areas of collaboration are outlined in the partnership agreement or memorandum of understanding (MOU) between the school and law enforcement?</label>
                    <div>
                        <input type="text" name="partnershipGoals" placeholder="Describe the goals/objectives/areas" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are roles, responsibilities, and expectations clearly defined for both parties regarding their respective contributions to enhancing school safety, emergency preparedness, and response efforts?</label>
                    <div>
                        <input type="text" name="rolesResponsibilities" placeholder="Describe the roles/responsibilities/expectations" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Training and Exercises:</h2>
                <div className="form-section">
                    <label>How frequently do school staff, administrators, and law enforcement personnel participate in joint training exercises, drills, or simulations to prepare for various emergency scenarios?</label>
                    <div>
                        <input type="text" name="trainingFrequency" placeholder="Describe how frequent" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of training activities are conducted collaboratively, such as active shooter drills, tabletop exercises, or scenario-based simulations, to improve coordination and communication between school and law enforcement personnel?</label>
                    <div>
                        <input type="text" name="trainingActivities" placeholder="Describe the activities conducted" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training sessions tailored to address specific needs, challenges, or vulnerabilities identified through risk assessments, security audits, or incident debriefs?</label>
                    <div>
                        <input type="radio" name="trainingTailoring" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="trainingTailoring" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="trainingTailoring" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication and Information Sharing:</h2>
                <div className="form-section">
                    <label>How do school administrators and law enforcement agencies communicate and share information regarding potential threats, safety concerns, or suspicious activities identified within the school community?</label>
                    <div>
                        <input type="text" name="communicationMethods" placeholder="Describe how they communicate"onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for reporting, documenting, and responding to security incidents, behavioral indicators, or other warning signs that may pose a risk to school safety?</label>
                    <div>
                        <input type="text" name="reportingProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to protect the privacy, confidentiality, and legal rights of students and staff while facilitating information sharing and collaboration between the school and law enforcement?</label>
                    <div>
                        <input type="text" name="privacyMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Resource Allocation and Support:</h2>
                <div className="form-section">
                    <label>What resources, support services, or technical assistance are provided by law enforcement agencies to augment school safety initiatives, emergency response capabilities, or crime prevention efforts?</label>
                    <div>
                        <input type="text" name="resourcesSupport" placeholder="Describe the resources" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are school security personnel, administrators, or designated staff members trained to interface with law enforcement during emergencies, incidents, or law enforcement interventions on campus?</label>
                    <div>
                        <input type="radio" name="securityPersonnelTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="securityPersonnelTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="securityPersonnelTraining" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school administration collaborate with law enforcement agencies to leverage community policing strategies, crime prevention programs, or outreach initiatives aimed at enhancing school security and fostering positive relationships with students and families?</label>
                    <div>
                        <input type="text" name="collaborationStrategies" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of the partnership with local law enforcement agencies evaluated, monitored, and assessed over time?</label>
                    <div>
                        <input type="text" name="effectivenessEvaluation" placeholder="Describe how it's evaluated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to solicit feedback from school stakeholders, law enforcement personnel, and community members regarding the impact, strengths, and areas for improvement in the collaboration between the school and law enforcement?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies or measures are implemented to address challenges, adapt to changing circumstances, and refine partnership approaches based on lessons learned, best practices, or emerging trends in school safety and security?</label>
                    <div>
                        <input type="text" name="partnershipRefinement" placeholder="Describe the strategies/measures" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default LawEnforcementPartnershipFormPage;