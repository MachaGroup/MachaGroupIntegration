import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function HealthcareProviderEngagementFormPage() {
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
           const formsRef = collection(db, 'forms/Personnel Training and Awareness/Healthcare Provider Engagement');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Healthcare Provider Engagement');
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
            <h1>Healthcare Provider Engagement Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.1.3 Healthcare Provider Engagement */}
                <h2>Collaborative Initiatives and Objectives:</h2>
                <div className="form-section">
                    <label>What are the primary objectives and focus areas of collaboration between the school or educational institution and healthcare providers in the community?</label>
                    <div>
                        <input type="text" name="collaborativeObjectives" placeholder="Describe the objectives" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and healthcare providers to promote health and wellness, address medical needs, or enhance emergency medical response within the school community?</label>
                    <div>
                        <input type="text" name="jointProgramsExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the partnership with healthcare providers aligned with broader school health goals, emergency preparedness efforts, or community health promotion initiatives?</label>
                    <div>
                        <input type="text" name="partnershipAlignment" placeholder="Describe the partnership" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Medical Response Coordination:</h2>
                <div className="form-section">
                    <label>How do healthcare providers coordinate with the school administration and designated medical personnel to support medical response efforts during emergencies, incidents, or health-related crises on campus?</label>
                    <div>
                        <input type="text" name="medicalResponseCoordination" placeholder="Describe the coordination" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for accessing medical expertise, resources, or support services from healthcare providers in the event of medical emergencies, injuries, or illness occurring within the school community?</label>
                    <div>
                        <input type="text" name="medicalProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What role do healthcare providers play in providing guidance, training, or medical oversight to school staff, administrators, or designated responders regarding medical response procedures and protocols?</label>
                    <div>
                        <input type="text" name="healthcareProviderRole" placeholder="Describe the role" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Health Education and Outreach:</h2>
                <div className="form-section">
                    <label>How do healthcare providers contribute to health education and outreach efforts within the school community, including students, staff, and families?</label>
                    <div>
                        <input type="text" name="healthEducationContribution" placeholder="Describe the contribution" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources, materials, or presentations does the healthcare community provide to educate students about health promotion, disease prevention, or general wellness practices?</label>
                    <div>
                        <input type="text" name="resourcesProvidedHealth" placeholder="Describe the resources/materials/presentations" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative activities organized to engage students in interactive learning experiences, workshops, or health screenings conducted by healthcare professionals?</label>
                    <div>
                        <input type="radio" name="interactiveLearning" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="interactiveLearning" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="interactiveLearning" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Health Services Integration:</h2>
                <div className="form-section">
                    <label>How are healthcare services integrated into the broader support systems and resources available to students within the school setting?</label>
                    <div>
                        <input type="text" name="healthcareIntegration" placeholder="Describe how it's integrated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to facilitate access to healthcare services, referrals, or follow-up care for students in need of medical attention or specialized treatment?</label>
                    <div>
                        <input type="text" name="accessMechanisms" placeholder="Describe the meachanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote continuity of care, communication, and collaboration between school-based health services and external healthcare providers?</label>
                    <div>
                        <input type="text" name="continuityOfCareStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Health Promotion:</h2>
                <div className="form-section">
                    <label>How do healthcare providers engage with the broader school community, including parents, caregivers, and local residents, to promote health literacy, healthy lifestyles, and preventive healthcare practices?</label>
                    <div>
                        <input type="text" name="communityHealthEngagement" placeholder="Describe how they engage" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are community health fairs, wellness events, or educational workshops organized jointly by the school and healthcare providers to raise awareness about health-related issues and resources available in the community?</label>
                    <div>
                        <input type="radio" name="communityHealthEvents" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="communityHealthEvents" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="communityHealthEvents" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What efforts are made to address health disparities, cultural competence, or social determinants of health within the school community through collaborative partnerships with healthcare providers?</label>
                    <div>
                        <input type="text" name="healthDisparitiesEfforts" placeholder="Describe the efforts" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default HealthcareProviderEngagementFormPage;