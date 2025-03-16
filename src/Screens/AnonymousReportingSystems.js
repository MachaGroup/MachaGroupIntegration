import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AnonymousReportingSystemsFormPage() {
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
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Anonymous Reporting Systems');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Anonymous Reporting Systems');
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
            <h1>Anonymous Reporting Systems Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.2.2 Anonymous Reporting Systems */}
                <h2>Accessibility and Utilization:</h2>
                <div className="form-section">
                    <label>How diverse are the channels provided for anonymous reporting, and what efforts are made to ensure that all students feel comfortable using them?</label>
                    <div>
                        <input type="text" name="diverseChannels" placeholder="Describe how diverse are they" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote awareness and encourage regular utilization of the anonymous reporting system among students, staff, and parents?</label>
                    <div>
                        <input type="text" name="awarenessStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of different reporting channels assessed, and are adjustments made based on feedback or usage patterns?</label>
                    <div>
                        <input type="text" name="channelEffectiveness" placeholder="Describe how the effectiveness is assessed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions in place to accommodate individuals who may face barriers to accessing traditional reporting channels, such as language barriers or disabilities?</label>
                    <div>
                        <input type="radio" name="accessProvisions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="accessProvisions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="accessProvisionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Confidentiality and Trust:</h2>
                <div className="form-section">
                    <label>How is the anonymity of individuals who submit reports ensured, and what measures are taken to protect their identities from being disclosed?</label>
                    <div>
                        <input type="text" name="anonymityEnsurance" placeholder="Describe how it's ensured" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place to address concerns about potential breaches of confidentiality or misuse of the anonymous reporting system?</label>
                    <div>
                        <input type="text" name="confidentialityProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is trust in the anonymous reporting system maintained or reinforced among students, staff, and parents, particularly in cases where anonymity may be perceived as a barrier to accountability?</label>
                    <div>
                        <input type="text" name="trustMaintenance" placeholder="Describe how it's maintained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for providing feedback or updates to individuals who submit anonymous reports, while still respecting their anonymity?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Response and Follow-Up:</h2>
                <div className="form-section">
                    <label>What procedures are in place for reviewing and investigating reports submitted through the anonymous reporting system, and how are findings communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="reviewProcedures" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are reports prioritized based on severity, urgency, or other factors, and what mechanisms exist for ensuring timely responses?</label>
                    <div>
                        <input type="text" name="reportPrioritization" placeholder="Describe how they're prioritized" onChange={handleChange}/>  
                    </div>
                </div>
                /**/
                <div className="form-section">
                    <label>What follow-up actions are taken in response to anonymous reports, and how are individuals who submit reports kept informed about the outcomes of their submissions?</label>
                    <div>
                        <input type="text" name="followUpActions" placeholder="Describe the follow-up actions" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for ongoing dialogue or engagement with individuals who submit anonymous reports, to gather additional information or clarify details as needed?</label>
                    <div>
                        <input type="radio" name="ongoingDialogue" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ongoingDialogue" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ongoingDialogueComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Data Analysis and Trend Identification:</h2>
                <div className="form-section">
                    <label>How is data collected from anonymous reports analyzed to identify trends, patterns, or emerging issues related to bullying incidents?</label>
                    <div>
                        <input type="text" name="dataAnalysis" placeholder="Describe how the data is analyzed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place for sharing insights or findings from data analysis with relevant stakeholders, and how are these used to inform decision-making or resource allocation?</label>
                    <div>
                        <input type="text" name="insightSharing" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular reviews or assessments of the effectiveness of the anonymous reporting system, based on data trends or other indicators?</label>
                    <div>
                        <input type="radio" name="systemReviews" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="systemReviews" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="systemReviewsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are findings from data analysis incorporated into broader efforts to prevent and address bullying behavior within the school community?</label>
                    <div>
                        <input type="text" name="findingsIncorporation" placeholder="Describe how they're incorporated" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default AnonymousReportingSystemsFormPage;