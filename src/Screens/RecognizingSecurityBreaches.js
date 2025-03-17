import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RecognizingSecurityBreachesFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Recognizing Security Breaches');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Recognizing Security Breaches');
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
            <h1>3.4.2.1.2 Recognizing Security Breaches Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.1.2 Recognizing Security Breaches */}
                <h2>3.4.2.1.2.1 Understanding Security Vulnerabilities:</h2>
                <div className="form-section">
                    <label>Are staff members trained to identify and recognize common security vulnerabilities, weaknesses, or gaps in physical security measures, access controls, or surveillance systems that could be exploited by intruders or unauthorized individuals?</label>
                    <div>
                        <input type="radio" name="securityVulnerabilityTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="securityVulnerabilityTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="securityVulnerabilityTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific indicators or warning signs are emphasized during training as potential evidence of security breaches, such as unauthorized access points, tampered locks, broken windows, or unexplained disruptions to normal operations?</label>
                    <div>
                        <input type="text" name="securityIndicators" placeholder="Describe the indicators/warning signs" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining a proactive and vigilant stance towards security, actively monitoring their surroundings, and promptly reporting any deviations from established security protocols or procedures?</label>
                    <div>
                        <input type="text" name="proactiveEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.4.2.1.2.2 Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of a suspected security breach, unauthorized access attempt, or breach of perimeter security?</label>
                    <div>
                        <input type="text" name="responseProtocols" placeholder="Describe the protocols/procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively and decisively to security breaches, including actions such as initiating lockdown procedures, activating alarm systems, alerting security personnel or law enforcement authorities, and directing occupants to safe locations?</label>
                    <div>
                        <input type="text" name="responseTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities during security incidents, coordinate their actions with other team members, and communicate critical information to facilitate a prompt and coordinated response?</label>
                    <div>
                        <input type="text" name="roleCoordination" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.4.2.1.2.3 Security Device Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members provided with training on the proper use, operation, and troubleshooting of security devices, such as access control systems, surveillance cameras, intrusion detection sensors, or alarm systems?</label>
                    <div>
                        <input type="radio" name="deviceFamiliarization" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="deviceFamiliarization" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="deviceFamiliarizationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to recognize abnormal behavior or indications of malfunction in security devices that could signal a potential security breach or technical issue requiring immediate attention?</label>
                    <div>
                        <input type="text" name="deviceMalfunctionRecognition" placeholder="Describe how they're instructed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or reference materials are available to staff members to assist them in troubleshooting common security device issues, interpreting system alerts or error messages, and taking appropriate corrective actions to restore functionality?</label>
                    <div>
                        <input type="text" name="troubleshootingResources" placeholder="List the resources/reference materials" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.4.2.1.2.4 Incident Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are staff members trained on the importance of documenting and reporting security breaches or unauthorized access incidents in a timely and accurate manner to support investigation, analysis, and corrective action?</label>
                    <div>
                        <input type="radio" name="incidentReportingTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="incidentReportingTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="incidentReportingTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to document relevant details and observations regarding security breaches, including the location, time, nature of the incident, individuals involved, and any additional contextual information that may aid in understanding the situation?</label>
                    <div>
                        <input type="text" name="incidentDocumentation" placeholder="Describe how they're instructed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place for reporting security breaches to designated authorities, security personnel, or administrative staff members, and how are staff members informed of their obligations and responsibilities in this regard?</label>
                    <div>
                        <input type="text" name="reportingProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.4.2.1.2.5 Continuous Improvement and Feedback:</h2>
                <div className="form-section">
                    <label>How does the organization promote a culture of continuous improvement in security awareness and breach recognition capabilities among staff members through ongoing training, reinforcement activities, and feedback mechanisms?</label>
                    <div>
                        <input type="text" name="continuousImprovement" placeholder="Describe how they promote" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members encouraged to provide feedback on security protocols, procedures, or training materials based on their real-world experiences, insights, or suggestions for enhancing security awareness and breach recognition effectiveness?</label>
                    <div>
                        <input type="radio" name="feedbackEncouragement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="feedbackEncouragement" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="feedbackEncouragementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to review and analyze reported security breaches, identify root causes or contributing factors, and implement corrective actions or procedural enhancements to prevent recurrence and strengthen overall security posture?</label>
                    <div>
                        <input type="text" name="breachAnalysisMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityBreachesFormPage;