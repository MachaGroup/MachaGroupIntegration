import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PhishingAwareness2FormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Phishing Awareness');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Phishing Awareness');
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
            <h1>3.1.1.4.2.1 Phishing Awareness Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.1.4.2.1 Phishing Awareness */}
                <h2>3.1.1.4.2.1.1 Recognizing Phishing Attempts:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize common indicators of phishing attempts, such as unsolicited emails requesting sensitive information, urgent requests for account credentials, or messages containing suspicious links or attachments?</label>
                    <div>
                        <input type="radio" name="phishingTrainingRecognition" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="phishingTrainingRecognition" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="phishingTrainingRecognitionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific characteristics or red flags are emphasized during training as potential signs of phishing, such as misspelled or unfamiliar sender addresses, generic greetings, grammatical errors, or requests for confidential data?</label>
                    <div>
                        <input type="text" name="phishingRedFlags" placeholder="Describe the characteristics/red flags" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of exercising caution and skepticism when interacting with email messages, especially those prompting them to disclose personal information or take immediate action without verification?</label>
                    <div>
                        <input type="text" name="phishingCautionEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>
                
                <h2>3.1.1.4.2.1.2 Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of encountering a suspected phishing email or cyber threat, including steps to report the incident, mitigate risks, and safeguard sensitive information?</label>
                    <div>
                        <input type="text" name="phishingResponseProtocols" placeholder="Describe the protocols/procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively to phishing attempts, such as refraining from clicking on suspicious links or attachments, verifying the authenticity of sender identities, and forwarding suspicious emails to designated IT or security personnel for analysis?</label>
                    <div>
                        <input type="text" name="phishingResponseTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities in preventing, detecting, and responding to phishing attacks, including the escalation of incidents to appropriate authorities for further investigation and remediation?</label>
                    <div>
                        <input type="text" name="phishingRolesAndResponsibilities" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.1.3 Phishing Simulation Exercises:</h2>
                <div className="form-section">
                    <label>Are staff members provided with opportunities to participate in simulated phishing exercises or awareness campaigns designed to mimic real-world phishing scenarios and test their ability to recognize and respond to phishing threats?</label>
                    <div>
                        <input type="radio" name="phishingSimulationOpportunities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="phishingSimulationOpportunities" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="phishingSimulationOpportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How do phishing simulation exercises simulate various phishing techniques and tactics, challenge staff members' ability to differentiate between legitimate and fraudulent emails, and reinforce best practices for mitigating phishing risks?</label>
                    <div>
                        <input type="text" name="phishingSimulationDescription" placeholder="Describe how they simulate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during phishing simulation exercises, track their progress in identifying phishing attempts, and provide targeted guidance or training to address areas for improvement?</label>
                    <div>
                        <input type="text" name="phishingSimulationFeedback" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.1.4 Educational Resources and Awareness Materials:</h2>
                <div className="form-section">
                    <label>Are educational resources, awareness materials, or interactive modules available to staff members to enhance their understanding of phishing threats, cybersecurity best practices, and proactive measures for safeguarding sensitive information?</label>
                    <div>
                        <input type="radio" name="phishingEducationalResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="phishingEducationalResources" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="phishingEducationalResourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members provided with access to informational resources, instructional videos, or online tutorials covering topics such as email security, password hygiene, two-factor authentication, and safe browsing habits to reinforce phishing awareness and prevention strategies?</label>
                    <div>
                        <input type="text" name="phishingResourceAccess" placeholder="Describe how they're provided" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote ongoing engagement and awareness among staff members regarding emerging phishing trends, evolving cyber threats, and recommended countermeasures to protect against phishing attacks in a dynamic threat landscape?</label>
                    <div>
                        <input type="text" name="phishingEngagementStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.1.5 Reporting and Incident Management:</h2>
                <div className="form-section">
                    <label>Are staff members informed of the procedures for reporting suspected phishing emails or cyber incidents to designated IT or security personnel for investigation and response?</label>
                    <div>
                        <input type="radio" name="phishingReportingProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="phishingReportingProcedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="phishingReportingProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to promptly report phishing attempts, security breaches, or suspicious activities through established reporting channels, incident response mechanisms, or incident management systems?</label>
                    <div>
                        <input type="text" name="phishingReportingEncouragement" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate timely analysis, triage, and resolution of reported phishing incidents, including communication with affected individuals, containment of threats, and implementation of corrective actions to prevent recurrence?</label>
                    <div>
                        <input type="text" name="phishingIncidentManagement" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default PhishingAwareness2FormPage;