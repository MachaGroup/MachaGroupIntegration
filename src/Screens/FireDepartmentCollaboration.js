import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function FireDepartmentCollaborationFormPage() {
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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Fire Department Collaboration');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Fire Department Collaboration');
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
            <h1>Fire Department Collaboration Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.1.2 Recertification Schedule */}
                <h2>Partnership Objectives and Initiatives:</h2>
                <div className="form-section">
                    <label>What are the primary objectives and focus areas of collaboration between the school or educational institution and the local fire department?</label>
                    <div>
                        <input type="text" name="partnershipObjectives" placeholder="Describe the objectives" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and fire department to enhance fire safety, prevention, and preparedness within the school community?</label>
                    <div>
                        <input type="text" name="jointProgramsExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the partnership with the fire department aligned with broader school safety goals, emergency planning efforts, or community resilience initiatives?</label>
                    <div>
                        <input type="text" name="partnershipAlignment" placeholder="Describe how it's aligned" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Fire Prevention Education and Outreach:</h2>
                <div className="form-section">
                    <label>How does the fire department support fire prevention education and outreach efforts within the school community, including students, staff, and families?</label>
                    <div>
                        <input type="text" name="firePreventionSupport" placeholder="Describe the support" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources, materials, or presentations does the fire department provide to educate students about fire safety practices, evacuation procedures, and fire prevention measures?</label>
                    <div>
                        <input type="text" name="resourcesProvided" placeholder="Describe the resources/materials/presentation" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative activities organized to engage students in hands-on learning experiences, demonstrations, or interactive sessions related to fire safety and emergency preparedness?</label>
                    <div>
                        <input type="radio" name="handsOnLearning" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handsOnLearning" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="handsOnLearningComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Inspection and Compliance:</h2>
                <div className="form-section">
                    <label>How does the fire department collaborate with the school administration to conduct fire inspections, safety audits, or compliance checks of school facilities and premises?</label>
                    <div>
                        <input type="text" name="fireInspectionCollaboration" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are school staff, administrators, or designated safety personnel trained to address fire code violations, safety hazards, or deficiencies identified during inspections, and to implement corrective measures in a timely manner?</label>
                    <div>
                        <input type="radio" name="staffTrainingForViolations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="staffTrainingForViolations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="staffTrainingForViolationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to ensure ongoing communication, coordination, and follow-up between the school and fire department regarding compliance with fire safety regulations and standards?</label>
                    <div>
                        <input type="text" name="complianceCommunication" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Emergency Response Planning:</h2>
                <div className="form-section">
                    <label>How does the school administration collaborate with the fire department to develop, review, and update emergency response plans, protocols, and procedures for addressing fire incidents or emergencies on campus?</label>
                    <div>
                        <input type="text" name="emergencyPlanningCollaboration" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of fire response strategies, evacuation routes, and communication protocols between the school and fire department?</label>
                    <div>
                        <input type="radio" name="jointExercises" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="jointExercises" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="jointExercisesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What role does the fire department play in providing guidance, expertise, or technical assistance to enhance the school's capacity to respond effectively to fire emergencies and ensure the safety of students, staff, and visitors?</label>
                    <div>
                        <input type="text" name="fireDepartmentRole" placeholder="Describe the role" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How does the fire department engage with the broader school community, including parents, neighborhood residents, and local businesses, to promote fire safety awareness, preparedness, and collaboration?</label>
                    <div>
                        <input type="text" name="communityEngagement" placeholder="Describe how they engage" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are community events, workshops, or outreach activities organized jointly by the school and fire department to disseminate information, share resources, and foster partnerships around fire prevention and safety?</label>
                    <div>
                        <input type="radio" name="communityEvents" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="communityEvents" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="communityEventsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to leverage the expertise, credibility, and trust of the fire department in building public confidence, resilience, and support for school safety initiatives within the local community?</label>
                    <div>
                        <input type="text" name="communityStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default FireDepartmentCollaborationFormPage;