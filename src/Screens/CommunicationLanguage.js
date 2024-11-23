import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';


function CommunicationLanguageFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Communication Language Assessment</h1>
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
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there multiple languages spoken among the parent population, and if so, which languages are most prevalent?</label>
                    <div>
                        <input type="radio" name="LanguagePrevalenceIdentified" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LanguagePrevalenceIdentified" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the languages" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Multilingual Notification Capability:</h2>
                <div className="form-section">
                    <label>Does the communication system have the capability to send notifications in multiple languages?</label>
                    <div>
                        <input type="radio" name="MultiLangNotifyCapable" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MultiLangNotifyCapable" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there features or settings within the system that allow for the customization of notification language based on recipient preferences or profile information?</label>
                    <div>
                        <input type="radio" name="NotifyLangCustomizable" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotifyLangCustomizable" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Translation Services:</h2>
                <div className="form-section">
                    <label>Are translation services or resources available to facilitate the translation of emergency notifications into different languages?</label>
                    <div>
                        <input type="radio" name="TranslationServicesAvail" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationServicesAvail" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process in place for obtaining professional translation services or engaging bilingual staff members to assist with translation efforts?</label>
                    <div>
                        <input type="radio" name="TranslationProcessDefined" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationProcessDefined" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Standardized Message Templates:</h2>
                <div className="form-section">
                    <label>Are standardized message templates developed for various types of emergencies, and do these templates include translations in multiple languages?</label>
                    <div>
                        <input type="radio" name="TemplatesMultiLangReady" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TemplatesMultiLangReady" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do translated messages maintain consistency and accuracy with the original message content?</label>
                    <div>
                        <input type="radio" name="TranslationAccuracyMaintained" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationAccuracyMaintained" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>Are efforts made to ensure that emergency notifications are accessible and inclusive for parents/guardians with limited English proficiency?</label>
                    <div>
                        <input type="radio" name="LimitedEnglishAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LimitedEnglishAccessibility" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alternative communication methods or formats provided for parents/guardians who may require assistance with understanding notifications in a non-primary language?</label>
                    <div>
                        <input type="radio" name="AltCommunicationMethods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AltCommunicationMethods" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the alternative methods" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Engagement:</h2>
                <div className="form-section">
                    <label>Are parents/guardians informed about the availability of multilingual notifications, and are they encouraged to indicate their language preferences?</label>
                    <div>
                        <input type="radio" name="ParentsInformedMultilang" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ParentsInformedMultilang" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are efforts made to engage with community organizations, cultural liaisons, or parent advisory groups to gather input and feedback on language accessibility and inclusivity?</label>
                    <div>
                        <input type="radio" name="CommunityEngagementEfforts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CommunityEngagementEfforts" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are multilingual notification capabilities tested and verified periodically to ensure their functionality and effectiveness?</label>
                    <div>
                        <input type="radio" name="MultiLangTestingDone" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MultiLangTestingDone" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to assess the clarity, comprehensibility, and appropriateness of translated messages across different languages?</label>
                    <div>
                        <input type="radio" name="TranslationTestScenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TranslationTestScenarios" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from parents/guardians regarding the accessibility and effectiveness of multilingual notifications?</label>
                    <div>
                        <input type="radio" name="FeedbackMechanismsExist" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="FeedbackMechanismsExist" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing multilingual notification protocols and practices considered and implemented based on feedback received?</label>
                    <div>
                        <input type="radio" name="EnhancementFeedbackUsed" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="EnhancementFeedbackUsed" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default CommunicationLanguageFormPage;