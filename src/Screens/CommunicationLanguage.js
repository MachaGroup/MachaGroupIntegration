import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/

function CommunicationLanguageFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/communication language');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/communication language');
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
            <h1>Communication Language Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.6 Communication Language */}
                <h2>Language Diversity Assessment:</h2>
                <div className="form-section">
                    <label>Has an assessment been conducted to identify the language diversity among parents/guardians within the community?</label>
                    <div>
                        <input type="radio" name="LanguageAssessConducted" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LanguageAssessConducted" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="LanguageAssessConductedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there multiple languages spoken among the parent population, and if so, which languages are most prevalent?</label>
                    <div>
                        <input type="radio" name="LanguagePrevalenceIdentified" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LanguagePrevalenceIdentified" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="LanguagePrevalenceIdentifiedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="languagePrevalanceIdentified" placeholder="List the languages" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Multilingual Notification Capability:</h2>
                <div className="form-section">
                    <label>Does the communication system have the capability to send notifications in multiple languages?</label>
                    <div>
                        <input type="radio" name="MultiLangNotifyCapable" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MultiLangNotifyCapable" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="MultiLangNotifyCapableComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there features or settings within the system that allow for the customization of notification language based on recipient preferences or profile information?</label>
                    <div>
                        <input type="radio" name="NotifyLangCustomizable" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotifyLangCustomizable" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="NotifyLangCustomizableComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Translation Services:</h2>
                <div className="form-section">
                    <label>Are translation services or resources available to facilitate the translation of emergency notifications into different languages?</label>
                    <div>
                        <input type="radio" name="TranslationServicesAvail" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationServicesAvail" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TranslationServicesAvailComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process in place for obtaining professional translation services or engaging bilingual staff members to assist with translation efforts?</label>
                    <div>
                        <input type="radio" name="TranslationProcessDefined" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationProcessDefined" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TranslationProcessDefinedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="translationProcessDefined" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Standardized Message Templates:</h2>
                <div className="form-section">
                    <label>Are standardized message templates developed for various types of emergencies, and do these templates include translations in multiple languages?</label>
                    <div>
                        <input type="radio" name="TemplatesMultiLangReady" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TemplatesMultiLangReady" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TemplatesMultiLangReadyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do translated messages maintain consistency and accuracy with the original message content?</label>
                    <div>
                        <input type="radio" name="TranslationAccuracyMaintained" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationAccuracyMaintained" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TranslationAccuracyMaintainedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>Are efforts made to ensure that emergency notifications are accessible and inclusive for parents/guardians with limited English proficiency?</label>
                    <div>
                        <input type="radio" name="LimitedEnglishAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LimitedEnglishAccessibility" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="LimitedEnglishAccessibilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alternative communication methods or formats provided for parents/guardians who may require assistance with understanding notifications in a non-primary language?</label>
                    <div>
                        <input type="radio" name="AltCommunicationMethods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AltCommunicationMethods" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="AltCommunicationMethodsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="altCommunicationMethods" placeholder="Describe the alternative methods" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Engagement:</h2>
                <div className="form-section">
                    <label>Are parents/guardians informed about the availability of multilingual notifications, and are they encouraged to indicate their language preferences?</label>
                    <div>
                        <input type="radio" name="ParentsInformedMultilang" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ParentsInformedMultilang" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ParentsInformedMultilangComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are efforts made to engage with community organizations, cultural liaisons, or parent advisory groups to gather input and feedback on language accessibility and inclusivity?</label>
                    <div>
                        <input type="radio" name="CommunityEngagementEfforts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CommunityEngagementEfforts" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="CommunityEngagementEffortsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are multilingual notification capabilities tested and verified periodically to ensure their functionality and effectiveness?</label>
                    <div>
                        <input type="radio" name="MultiLangTestingDone" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MultiLangTestingDone" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="MultiLangTestingDoneComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to assess the clarity, comprehensibility, and appropriateness of translated messages across different languages?</label>
                    <div>
                        <input type="radio" name="TranslationTestScenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationTestScenarios" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TranslationTestScenariosComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from parents/guardians regarding the accessibility and effectiveness of multilingual notifications?</label>
                    <div>
                        <input type="radio" name="FeedbackMechanismsExist" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="FeedbackMechanismsExist" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="FeedbackMechanismsExistComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="feedbackMechansismsExist" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing multilingual notification protocols and practices considered and implemented based on feedback received?</label>
                    <div>
                        <input type="radio" name="EnhancementFeedbackUsed" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="EnhancementFeedbackUsed" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="EnhancementFeedbackUsedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default CommunicationLanguageFormPage;