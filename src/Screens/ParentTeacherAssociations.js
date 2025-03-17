import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentTeacherAssociationsFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent-Teacher Associations');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent-Teacher Associations');
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
            <h1>Parent-Teacher Associations Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.2.1 Parent-Teacher Associations */}
                <h2>Association Structure and Function:</h2>
                <div className="form-section">
                    <label>How is the parent-teacher association (PTA) or similar organization structured, governed, and operated within the school or educational institution?</label>
                    <div>
                        <input type="text" name="ptaStructureAndOperation" placeholder="Describe how PTA's are structured" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What roles and responsibilities do PTA members fulfill in facilitating communication, collaboration, and engagement between parents, teachers, administrators, and other stakeholders?</label>
                    <div>
                        <input type="text" name="ptaRolesAndResponsibilities" placeholder="List the roles/responsibilties" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PTA meetings, events, or activities inclusive and accessible to all parents, regardless of background, language, or socio-economic status?</label>
                    <div>
                        <input type="radio" name="ptaInclusivityAndAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ptaInclusivityAndAccessibility" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ptaInclusivityAndAccessibilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Information Dissemination and Outreach:</h2>
                <div className="form-section">
                    <label>How does the PTA disseminate important information, updates, announcements, or resources related to school safety, emergency preparedness, and other relevant topics to parents?</label>
                    <div>
                        <input type="text" name="ptaInformationDissemination" placeholder="Describe how they disseminate info" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels, platforms, or strategies are utilized by the PTA to reach a broad audience of parents and ensure timely and effective communication?</label>
                    <div>
                        <input type="text" name="ptaCommunicationChannels" placeholder="Describe the channels/platforms/strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are efforts made to engage parents who may face barriers to communication, such as language barriers, limited access to technology, or lack of familiarity with school processes?</label>
                    <div>
                        <input type="text" name="ptaEffortsToEngageParents" placeholder="Describe the efforts" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Collaboration with School Leadership:</h2>
                <div className="form-section">
                    <label>How does the PTA collaborate with school leadership, administrators, or safety personnel to support and enhance communication efforts related to school safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="ptaCollaborationWithLeadership" placeholder="Describe how PTA collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between the PTA and school stakeholders in promoting safety awareness, organizing informational sessions, or addressing parent concerns?</label>
                    <div>
                        <input type="text" name="ptaSuccessfulPartnerships" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways does the PTA contribute to the development, implementation, or evaluation of parent communication strategies and policies within the school community?</label>
                    <div>
                        <input type="text" name="ptaContributionToCommunicationStrategies" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Engagement Events and Activities:</h2>
                <div className="form-section">
                    <label>What types of events, workshops, or activities does the PTA organize to engage parents in discussions, workshops, or training sessions related to school safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="ptaEngagementEvents" placeholder="Describe the events/workshops/activities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the PTA leverage its resources, networks, and expertise to create opportunities for parents to learn, collaborate, and share experiences with each other regarding safety concerns or best practices?</label>
                    <div>
                        <input type="text" name="ptaLeveragingResources" placeholder="Describe how they leverage resources" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PTA-sponsored events designed to accommodate diverse preferences, interests, and schedules of parents to maximize participation and engagement?</label>
                    <div>
                        <input type="radio" name="ptaEventDesign" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ptaEventDesign" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ptaEventDesignComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Feedback and Input</h2>
                <div className="form-section">
                    <label>How does the PTA solicit feedback, suggestions, concerns, or input from parents regarding school safety, emergency planning, or other relevant issues?</label>
                    <div>
                        <input type="text" name="ptaFeedbackSolicitation" placeholder="Describe how they solicit feedback" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place for parents to provide feedback anonymously, confidentially, or through designated representatives to ensure open and honest communication?</label>
                    <div>
                        <input type="text" name="ptaAnonymousFeedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the PTA utilize feedback from parents to advocate for improvements, advocate for changes, or address emerging safety challenges within the school community?</label>
                    <div>
                        <input type="text" name="ptaFeedbackUtilization" placeholder="Describe how they utilize feedback" onChange={handleChange}/>  
                    </div>
                </div>
                
                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ParentTeacherAssociationsFormPage;