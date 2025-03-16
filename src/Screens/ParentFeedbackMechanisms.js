import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentFeedbackMechanismsFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Feedback Mechanisms');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Feedback Mechanisms');
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
            <h1>Parent Feedback Mechanisms Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.2.3 Parent Feedback Mechanisms */}
                <h2>Feedback Collection Methods:</h2>
                <div className="form-section">
                    <label>What mechanisms or channels are available for parents to provide feedback on school safety, emergency preparedness, and communication processes?</label>
                    <div>
                        <input type="text" name="feedbackMechanismsDescription" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback collection methods diversified to accommodate various preferences and communication styles of parents, such as surveys, suggestion boxes, town hall meetings, or online forums?</label>
                    <div>
                        <input type="radio" name="feedbackMethodsDiversity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="feedbackMethodsDiversity" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="feedbackMethodsDiversityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>How frequently are opportunities for providing feedback offered to parents, and are they accessible and convenient for all members of the school community?</label>
                    <div>
                        <input type="text" name="feedbackFrequency" placeholder="Describe how frequent" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Survey Design and Administration:</h2>
                <div className="form-section">
                    <label>How are surveys designed, developed, and administered to solicit feedback from parents regarding their perceptions, experiences, and suggestions related to school safety and emergency communication?</label>
                    <div>
                        <input type="text" name="surveyDesignDescription" placeholder="Describe how surveys solicit feedback" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are survey questions structured to capture key aspects of safety concerns, emergency responsiveness, communication effectiveness, and overall satisfaction with school safety measures?</label>
                    <div>
                        <input type="radio" name="surveyQuestionsStructure" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="surveyQuestionsStructure" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="surveyQuestionsStructureComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to encourage participation, increase response rates, and ensure representative sampling in parent feedback surveys?</label>
                    <div>
                        <input type="text" name="surveyParticipationStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Data Analysis and Interpretation:</h2>
                <div className="form-section">
                    <label>How is feedback data collected from parents analyzed, synthesized, and interpreted to identify trends, patterns, or recurring themes relevant to school safety and emergency communication?</label>
                    <div>
                        <input type="text" name="dataAnalysisMethods" placeholder="Describe how data is collected" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to disaggregate feedback by demographic factors, such as grade level, language proficiency, or parental involvement, to ensure equitable representation and address diverse perspectives?</label>
                    <div>
                        <input type="radio" name="feedbackDisaggregation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="feedbackDisaggregation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="feedbackDisaggregationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools, software, or methodologies are utilized to extract actionable insights from parent feedback and inform decision-making processes related to school safety initiatives and communication strategies?</label>
                    <div>
                        <input type="text" name="feedbackInsightsTools" placeholder="Describe the tools/software/methodologies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Response and Follow-up:</h2>
                <div className="form-section">
                    <label>How does the school administration or leadership respond to feedback received from parents regarding school safety concerns, emergency preparedness, or communication challenges?</label>
                    <div>
                        <input type="text" name="adminFeedbackResponse" placeholder="Describe the tools/software/methodologies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established to acknowledge receipt of feedback, communicate follow-up actions, and provide updates or resolutions to address parent concerns in a timely and transparent manner?</label>
                    <div>
                        <input type="text" name="feedbackFollowupProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to demonstrate accountability, responsiveness, and continuous improvement in school safety practices and communication efforts based on parent feedback?</label>
                    <div>
                        <input type="text" name="accountabilityMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Engagement and Collaboration:</h2>
                <div className="form-section">
                    <label>Are opportunities provided for parents to participate in collaborative discussions, focus groups, or advisory committees aimed at reviewing feedback data, prioritizing safety initiatives, and co-creating solutions?</label>
                    <div>
                        <input type="radio" name="parentCollaborationOpportunities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentCollaborationOpportunities" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="parentCollaborationOpportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school foster a culture of open communication, trust, and partnership with parents by actively seeking their input, valuing their perspectives, and integrating their feedback into decision-making processes?</label>
                    <div>
                        <input type="text" name="communicationCulture" placeholder="Describe how they foster a culture" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms integrated into broader efforts to engage parents as active partners in promoting school safety, fostering community resilience, and enhancing emergency preparedness within the school community?</label>
                    <div>
                        <input type="text" name="integratedFeedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ParentFeedbackMechanismsFormPage;