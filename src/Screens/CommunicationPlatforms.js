import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/

function CommunicationPlatformsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Communiation Platforms');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Emergency Preparedness/Communiation Platforms');
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
            <h1>Communication Platforms Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.4 Communication Platforms */}
                <h2>Availability of Communication Platforms:</h2>
                <div className="form-section">
                    <label>Are designated communication platforms established to facilitate communication between the school or institution and parents/guardians during emergencies?</label>
                    <div>
                        <input type="radio" name="CommPlatformEstablish" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CommPlatformEstablish" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="CommPlatformEstablishComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="communicationPlatformEstablish" placeholder="Describe the designated communication platforms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do communication platforms include various channels such as phone lines, messaging apps, email, or web portals?</label>
                    <div>
                        <input type="radio" name="PlatformChannelsUse" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PlatformChannelsUse" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="PlatformChannelsUseComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Designation of Phone Lines:</h2>
                <div className="form-section">
                    <label>Are specific phone lines designated for parent communication during emergencies?</label>
                    <div>
                        <input type="radio" name="PhoneLineDesignate" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PhoneLineDesignate" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="PhoneLineDesignateComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a clear process for parents to access these designated phone lines, including published contact numbers and operating hours?</label>
                    <div>
                        <input type="radio" name="CommRedundancyAvail" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CommRedundancyAvail" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="CommRedundancyAvailComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Redundancy and Backup Options:</h2>
                <div className="form-section">
                    <label>Are redundant communication options available in case of phone line failures or disruptions?</label>
                    <div>
                        <input type="radio" name="BackupOptionsDesc" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="BackupOptionsDesc" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="BackupOptionsDescComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="backupOptionsDesc" placeholder="Describe the redundant communication options" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup communication platforms such as messaging apps or email used to supplement phone lines and ensure reliable communication with parents?</label>
                    <div>
                        <input type="radio" name="BackupPlatformsUse" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="BackupPlatformsUse" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="BackupPlatformsUseComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accessibility and Usability:</h2>
                <div className="form-section">
                    <label>Are communication platforms accessible and user-friendly for parents of diverse backgrounds and abilities?</label>
                    <div>
                        <input type="radio" name="PlatformAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PlatformAccessibility" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="PlatformAccessibilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is information provided in multiple languages or formats to accommodate linguistic and accessibility needs?</label>
                    <div>
                        <input type="radio" name="LanguageFormatsAvail" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LanguageFormatsAvail" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="LanguageFormatsAvailComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are designated communication platforms integrated into broader emergency communication and response plans?</label>
                    <div>
                        <input type="radio" name="IntegrationPlans" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="IntegrationPlans" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="IntegrationPlansComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="form-section">
                    <label>Are procedures established for using communication platforms to disseminate emergency notifications, updates, and instructions to parents during emergencies?</label>
                    <div>
                        <input type="radio" name="EmergencyProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="EmergencyProcedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="EmergencyProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are communication platforms tested and verified periodically to ensure their functionality and reliability?</label>
                    <div>
                        <input type="radio" name="PlatformTesting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PlatformTesting" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="PlatformTestingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to simulate emergency situations and assess the responsiveness and effectiveness of communication platforms?</label>
                    <div>
                        <input type="radio" name="ScenarioSimulations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ScenarioSimulations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ScenarioSimulationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to use designated communication platforms for parent communication during emergencies?</label>
                    <div>
                        <input type="radio" name="StaffTrainingComm" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StaffTrainingComm" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="StaffTrainingCommComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or guidelines provided to assist staff members in effectively communicating with parents via designated communication channels?</label>
                    <div>
                        <input type="radio" name="StaffGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StaffGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="StaffGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from parents regarding the usability, reliability, and effectiveness of communication platforms during emergencies?</label>
                    <div>
                        <input type="radio" name="ParentFeedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ParentFeedback" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ParentFeedbackComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="parentFeedback" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing parent communication protocols and platforms considered and implemented based on feedback received?</label>
                    <div>
                        <input type="radio" name="ProtocolEnhancements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ProtocolEnhancements" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ProtocolEnhancementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default CommunicationPlatformsFormPage;