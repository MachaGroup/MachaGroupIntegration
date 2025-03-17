import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentVolunteerProgramsFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Volunteer Programs');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Volunteer Programs');
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
            <h1>Parent Volunteer Programs Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.1.2 Parent Volunteer Programs */}
                <h2>Program Structure and Organization:</h2>
                <div className="form-section">
                    <label>How are parent volunteer programs, particularly those focused on emergency response or safety, structured and organized within the school or educational institution?</label>
                    <div>
                        <input type="text" name="programStructureAndOrganization" placeholder="Describe how the programs structured" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What roles and responsibilities do parent volunteers assume within emergency response teams or safety committees, and how are these roles defined and communicated?</label>
                    <div>
                        <input type="text" name="rolesAndResponsibilities" placeholder="List the roles and responsibilities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteer programs integrated into broader school safety plans, emergency protocols, or community engagement strategies?</label>
                    <div>
                        <input type="radio" name="programsIntegratedWithPlans" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="programsIntegratedWithPlans" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="programsIntegratedWithPlansComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Recruitment and Training:</h2>
                <div className="form-section">
                    <label>How are parents recruited or solicited to participate in volunteer programs related to emergency response or safety initiatives?</label>
                    <div>
                        <input type="text" name="parentRecruitmentProcess" placeholder="Describe how they're recruited" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria or qualifications are used to select parent volunteers for specific roles or responsibilities, such as training, availability, skills, or expertise?</label>
                    <div>
                        <input type="text" name="selectionCriteriaForVolunteers" placeholder="Describe the criteria/qualifications" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteers provided with training, orientation, or resources to prepare them for their roles and responsibilities within emergency response teams or safety committees?</label>
                    <div>
                        <input type="radio" name="volunteerTrainingProvided" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="volunteerTrainingProvided" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="volunteerTrainingProvidedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Collaboration with School Staff and Administration:</h2>
                <div className="form-section">
                    <label>How do parent volunteer programs collaborate with school staff, administrators, or safety personnel to support and enhance school safety efforts?</label>
                    <div>
                        <input type="text" name="collaborationWithStaff" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between parent volunteer programs and school stakeholders in addressing safety concerns, implementing safety protocols, or organizing emergency drills?</label>
                    <div>
                        <input type="text" name="successfulPartnershipsExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do parent volunteers contribute to the development, implementation, or evaluation of school safety policies, procedures, or initiatives?</label>
                    <div>
                        <input type="text" name="volunteerContributionsToSafety" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Role in Emergency Response:</h2>
                <div className="form-section">
                    <label>What specific roles or functions do parent volunteers fulfill within emergency response teams or safety committees during various types of emergencies or crisis situations?</label>
                    <div>
                        <input type="text" name="specificRolesInEmergencies" placeholder="Describe the roles/functions" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parent volunteers trained and prepared to effectively respond to emergencies, assist with evacuation procedures, provide first aid support, or facilitate communication and coordination efforts?</label>
                    <div>
                        <input type="text" name="volunteerEmergencyTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteers integrated into broader emergency response plans, incident command structures, or communication protocols to ensure a coordinated and effective response?</label>
                    <div>
                        <input type="radio" name="integrationWithEmergencyPlans" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="integrationWithEmergencyPlans" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="integrationWithEmergencyPlansComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How do parent volunteer programs engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?</label>
                    <div>
                        <input type="text" name="communityEngagementEfforts" placeholder="Describe how they're engaging" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of collaborative projects, events, or campaigns led by parent volunteers that have extended the reach and impact of safety education beyond the school campus?</label>
                    <div>
                        <input type="text" name="collaborativeProjectsExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do parent volunteers leverage their networks, expertise, or resources to mobilize collective action, build community resilience, and foster a culture of safety within the school community?</label>
                    <div>
                        <input type="text" name="volunteersMobilizingCommunity" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ParentVolunteerProgramsFormPage;