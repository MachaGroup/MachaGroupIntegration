import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function ParentAdvisoryCommitteesFormPage() {
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
  const handleBack = () => {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Advisory Committees');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Parent Advisory Committees Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.1.3 Parent Advisory Committees */}
                <h2>Committee Formation and Composition:</h2>
                <div className="form-section">
                    <label>How are parent advisory committees established, structured, and maintained within the school or educational institution?</label>
                    <div>
                        <input type="text" name="committeeFormationAndComposition" placeholder="Describe how it's established" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to select parent representatives for advisory committees, and how are they chosen to ensure diverse perspectives, expertise, and representation?</label>
                    <div>
                        <input type="text" name="selectionCriteriaForRepresentatives" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent advisory committees inclusive and reflective of the demographics, backgrounds, and interests of the school community?</label>
                    <div>
                        <input type="radio" name="committeeInclusiveness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="committeeInclusiveness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Role and Scope of Advisory Committees:</h2>
                <div className="form-section">
                    <label>What specific roles, responsibilities, and mandates are assigned to parent advisory committees, particularly regarding their involvement in emergency planning and safety initiatives?</label>
                    <div>
                        <input type="text" name="committeeRolesAndMandates" placeholder="Describe the roles/responsibilities/mandates" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do advisory committees contribute to the development, review, and refinement of emergency plans, protocols, policies, or procedures within the school or educational institution?</label>
                    <div>
                        <input type="text" name="committeeContributionsToPlans" placeholder="Describe how they contribute" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are advisory committees empowered to provide input, feedback, recommendations, or alternative perspectives on emergency preparedness and safety-related matters?</label>
                    <div>
                        <input type="radio" name="committeeEmpowerment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="committeeEmpowerment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Engagement and Communication:</h2>
                <div className="form-section">
                    <label>How do parent advisory committees engage with school leadership, administrators, safety personnel, and other stakeholders to facilitate open communication, collaboration, and transparency?</label>
                    <div>
                        <input type="text" name="committeeEngagementWithLeadership" placeholder="Describe how they're engaging" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms or channels are in place to solicit feedback, concerns, suggestions, or insights from parent advisory committees regarding emergency plans, safety measures, or school policies?</label>
                    <div>
                        <input type="text" name="feedbackMechanismsForCommittees" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are advisory committee meetings, forums, or discussions conducted regularly and inclusively to encourage participation, dialogue, and consensus-building among members?</label>
                    <div>
                        <input type="radio" name="committeeMeetingFrequency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="committeeMeetingFrequency" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Review and Evaluation:</h2>
                <div className="form-section">
                    <label>How does the school administration or leadership utilize feedback and recommendations from parent advisory committees to inform decision-making, policy development, or improvements in emergency preparedness and safety?</label>
                    <div>
                        <input type="text" name="feedbackUtilizationBySchool" placeholder="Describe how they use feedback" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a structured process or timeline for reviewing, revising, and updating emergency plans, protocols, or procedures based on input from advisory committees and other stakeholders?</label>
                    <div>
                        <input type="text" name="reviewAndRevisionProcess" placeholder="Describe process/timeline" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are outcomes, actions, or changes resulting from advisory committee input communicated transparently and effectively to the school community to demonstrate accountability and responsiveness?</label>
                    <div>
                        <input type="radio" name="transparencyInOutcomes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="transparencyInOutcomes" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Capacity Building and Training:</h2>
                <div className="form-section">
                    <label>Are members of parent advisory committees provided with orientation, training, or resources to enhance their understanding of emergency planning principles, safety protocols, and relevant school policies?</label>
                    <div>
                        <input type="radio" name="orientationAndTrainingForCommittees" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="orientationAndTrainingForCommittees" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school administration support the capacity building and professional development of advisory committee members to empower them as informed and effective contributors to safety initiatives?</label>
                    <div>
                        <input type="text" name="capacityBuildingSupport" placeholder="Describe how they support the development" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities available for advisory committee members to collaborate with external experts, attend workshops or conferences, or participate in relevant training sessions to broaden their knowledge and expertise in emergency preparedness and safety?</label>
                    <div>
                        <input type="radio" name="externalCollaborationOpportunities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="externalCollaborationOpportunities" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ParentAdvisoryCommitteesFormPage;