import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function FrontDeskSecurityPage() {
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
              const formsRef = collection(db, 'forms/Physical Security/Front Desk Security');
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
      const formsRef = collection(db, 'forms/Physical Security/Front Desk Security');
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
        <h1>Front Desk Security Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Visitor Registration and Verification */}
          <h2>Visitor Registration and Verification:</h2>
          <div className="form-section">
            <label>Do front desk security personnel maintain a visitor log or electronic system to record details of incoming visitors?</label>
            <div>
              <input type="radio" name="visitorLog" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorLog" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorLogComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors required to provide identification and sign in before gaining access to the premises?</label>
            <div>
              <input type="radio" name="visitorIdSignIn" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorIdSignIn" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorIdSignInComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for verifying visitor credentials and ensuring that they have legitimate reasons for entry?</label>
            <div>
              <input type="radio" name="verifyCredentials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="verifyCredentials" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="verifyCredentialsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>Do front desk security personnel enforce access control policies to restrict entry to authorized individuals and visitors?</label>
            <div>
              <input type="radio" name="enforceAccessControl" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="enforceAccessControl" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="enforceAccessControlComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to challenge individuals without proper identification or authorization?</label>
            <div>
              <input type="radio" name="challengeIndividuals" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="challengeIndividuals" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="challengeIndividualsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors provided with temporary access badges or passes to indicate their authorized status while on the premises?</label>
            <div>
              <input type="radio" name="visitorBadges" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorBadges" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorBadgesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Screening and Security Checks */}
          <h2>Screening and Security Checks:</h2>
          <div className="form-section">
            <label>Do front desk security personnel conduct screening procedures, such as bag checks or metal detection, for incoming visitors?</label>
            <div>
              <input type="radio" name="screeningProcedures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="screeningProcedures" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="screeningProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there protocols in place to identify and address prohibited items or potential security threats brought by visitors?</label>
            <div>
              <input type="radio" name="securityThreatProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securityThreatProtocols" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="securityThreatProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are security checks conducted in a professional and non-intrusive manner to maintain a positive visitor experience?</label>
            <div>
              <input type="radio" name="professionalChecks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="professionalChecks" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="professionalChecksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Visitor Assistance and Customer Service */}
          <h2>Visitor Assistance and Customer Service:</h2>
          <div className="form-section">
            <label>Are front desk security personnel trained to provide assistance and guidance to visitors, including directions, information, and support?</label>
            <div>
              <input type="radio" name="visitorAssistance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorAssistance" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorAssistanceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they greet visitors in a friendly and professional manner while maintaining security awareness?</label>
            <div>
              <input type="radio" name="professionalGreeting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="professionalGreeting" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="professionalGreetingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel responsive to visitor inquiries and requests for assistance?</label>
            <div>
              <input type="radio" name="visitorInquiries" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorInquiries" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorInquiriesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Emergency Response Preparedness */}
          <h2>Emergency Response Preparedness:</h2>
          <div className="form-section">
            <label>Are front desk security personnel trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?</label>
            <div>
              <input type="radio" name="emergencyResponseTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyResponseTraining" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="emergencyResponseTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?</label>
            <div>
              <input type="radio" name="emergencyProcedures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyProcedures" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="emergencyProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel equipped with necessary communication devices or emergency response equipment?</label>
            <div>
              <input type="radio" name="emergencyEquipment" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyEquipment" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="emergencyEquipmentComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Communication and Coordination */}
          <h2>Communication and Coordination:</h2>
          <div className="form-section">
            <label>Is there effective communication between front desk security personnel and other security personnel, as well as with management and staff?</label>
            <div>
              <input type="radio" name="communicationBetweenPersonnel" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationBetweenPersonnel" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="communicationBetweenPersonnelComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?</label>
            <div>
              <input type="radio" name="coordinationTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationTraining" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="coordinationTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a centralized communication system or protocol for relaying information and coordinating responses between front desk security personnel and other security stakeholders?</label>
            <div>
              <input type="radio" name="centralizedCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="centralizedCommunication" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="centralizedCommunicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Documentation and Reporting */}
          <h2>Documentation and Reporting:</h2>
          <div className="form-section">
            <label>Are front desk security personnel required to maintain records of visitor activity, security incidents, or other notable events?</label>
            <div>
              <input type="radio" name="visitorRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorRecords" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visitorRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a standardized reporting process for documenting security incidents, suspicious activities, or visitor-related issues?</label>
            <div>
              <input type="radio" name="reportingProcess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportingProcess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="reportingProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are reports reviewed regularly by security management to identify trends, areas for improvement, or security risks related to visitor access?</label>
            <div>
              <input type="radio" name="reportReview" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportReview" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="reportReviewComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FrontDeskSecurityPage;