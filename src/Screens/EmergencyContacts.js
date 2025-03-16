import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function EmergencyContactsFormPage() {
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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Contacts');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Contacts');
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
            <h1>Emergency Contact Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.2.2 Recertification Schedule */}
                <h2>Contact Information Management:</h2>
                <div className="form-section">
                    <label>How does the school or educational institution collect, manage, and update emergency contact information for students and their families?</label>
                    <div>
                        <input type="text" name="contactInfoCollection" placeholder="Describe how they collect" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What systems, databases, or platforms are utilized to maintain accurate and up-to-date contact details, including phone numbers, email addresses, and alternative emergency contacts?</label>
                    <div>
                        <input type="text" name="contactInfoSystems" placeholder="Describe the systems/databases/platforms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents provided with opportunities and mechanisms to review, verify, and update their contact information regularly, such as through online portals, forms, or designated communication channels?</label>
                    <div>
                        <input type="radio" name="contactInfoVerification" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="contactInfoVerification" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="contactInfoVerificationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>What protocols or procedures are in place to initiate and facilitate communication with parents in the event of emergencies, incidents, or critical situations occurring at the school?</label>
                    <div>
                        <input type="text" name="emergencyProtocols" placeholder="Describe the protocols/procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are emergency contact lists accessed, activated, or utilized by school staff, administrators, or safety personnel to notify parents of safety alerts, school closures, or other urgent messages?</label>
                    <div>
                        <input type="text" name="contactListAccess" placeholder="Describe how they're accessed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication channels diversified to accommodate varying preferences, needs, or circumstances of parents, such as text messages, emails, phone calls, or automated alerts?</label>
                    <div>
                        <input type="radio" name="communicationChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="communicationChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="communicationChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Verification and Authentication:</h2>
                <div className="form-section">
                    <label>How does the school verify the identity and authority of individuals contacting or requesting information about students during emergency situations or crises?</label>
                    <div>
                        <input type="text" name="identityVerification" placeholder="Describe how they verify id" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established to authenticate the identity of parents, guardians, or authorized emergency contacts before disclosing sensitive information or providing updates regarding student safety or well-being?</label>
                    <div>
                        <input type="text" name="authenticationProcedures" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are implemented to protect the privacy, confidentiality, and security of student and parent information during emergency communications and interactions?</label>
                    <div>
                        <input type="text" name="privacyMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>How does the school ensure that emergency contact information and communication methods are accessible and inclusive to all parents, regardless of language, literacy, or technological proficiency?</label>
                    <div>
                        <input type="text" name="accessibilityInclusivity" placeholder="Describe how they ensures its accessible" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are accommodations provided for parents with disabilities, communication barriers, or unique needs to ensure they receive timely and relevant emergency notifications and updates?</label>
                    <div>
                        <input type="radio" name="disabilityAccommodations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="disabilityAccommodations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="disabilityAccommodationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What outreach efforts or support services are available to assist parents in updating or verifying their contact information, especially those facing challenges or limitations in accessing school resources?</label>
                    <div>
                        <input type="text" name="outreachSupportServices" placeholder="Describe the efforts/support services" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Feedback and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to gather feedback from parents regarding their experiences, preferences, and satisfaction with emergency communication processes and protocols?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the meachanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school utilize feedback from parents to identify areas for improvement, address communication gaps, or enhance the effectiveness of emergency contact procedures?</label>
                    <div>
                        <input type="text" name="feedbackUtilization" placeholder="Describe how they utilize feedback" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to participate in collaborative discussions, focus groups, or surveys aimed at evaluating and refining emergency communication strategies and practices?</label>
                    <div>
                        <input type="text" name="feedbackUtilization" placeholder="Describe the opportunities" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default EmergencyContactsFormPage;