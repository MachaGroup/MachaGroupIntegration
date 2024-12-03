import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function PostIncidentSupportFormPage() {
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
  const handleBack = () => {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Post-Incident Support');
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
    {/* Back Button */}
    <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
    <h1>3.1.1.2.3 Post-Incident Support Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.3 Post-Incident Support */}
      <h2>3.1.1.2.3.1 Availability of Support Services:</h2>
      <div className="form-section">
        <label>What post-incident support services are available to staff members following emergency situations, and are they easily accessible?</label>
        <div>
          <input type="text" name="supportServicesAvailability" placeholder="List/Describe the support services" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are counseling services, peer support programs, or other mental health resources offered to staff members affected by traumatic events?</label>
        <div>
          <input type="radio" name="mentalHealthResourcesAvailability" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="mentalHealthResourcesAvailability" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are support services promoted and communicated to staff members to ensure awareness of available resources?</label>
        <div>
          <input type="text" name="supportServicesCommunication" placeholder="Describe how support services are promoted/communicated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are external partnerships or collaborations established with mental health organizations or community agencies to supplement internal support services?</label>
        <div>
          <input type="text" name="externalSupportDetails" placeholder="Describe the partnerships/collaborations" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.3.2 Counseling and Psychological Support:</h2>
      <div className="form-section">
        <label>What counseling and psychological support options are available to staff members in the aftermath of critical incidents or emergencies?</label>
        <div>
          <input type="text" name="counselingSupportOptions" placeholder="Describe the counseling/psychological support options" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are licensed counselors or mental health professionals trained in trauma response and crisis intervention available to provide support?</label>
        <div>
          <input type="radio" name="licensedMentalHealthAvailability" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="licensedMentalHealthAvailability" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are confidentiality and privacy protected for staff members seeking counseling or psychological support services?</label>
        <div>
          <input type="text" name="confidentialityProtection" placeholder="Describe how confidentiality and privacy are protected" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are there protocols in place for assessing the immediate and long-term mental health needs of staff members and providing appropriate interventions?</label>
        <div>
          <input type="text" name="mentalHealthAssessmentDetails" placeholder="Describe the protocols" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.3.3 Peer Support Programs:</h2>
      <div className="form-section">
        <label>Are peer support programs established to facilitate informal assistance and emotional support among staff members following traumatic events?</label>
        <div>
          <input type="radio" name="peerSupportEstablished" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="peerSupportEstablished" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are peer supporters selected, trained, and supported in their roles as peer counselors or advocates?</label>
        <div>
          <input type="text" name="peerSupporterRoles" placeholder="Describe the process" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are peer support networks integrated into the organization's broader crisis management and employee assistance programs?</label>
        <div>
          <input type="radio" name="peerSupportIntegration" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="peerSupportIntegration" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure the effectiveness and sustainability of peer support initiatives over time?</label>
        <div>
          <input type="text" name="peerSupportEffectiveness" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.3.4 Family Assistance and Resources:</h2>
      <div className="form-section">
        <label>How are family members of staff members affected by emergencies supported and informed about available resources?</label>
        <div>
          <input type="text" name="familyAssistanceDescription" placeholder="Describe how family members of staff are affected" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are communication channels established to provide updates and information to family members during and after critical incidents?</label>
        <div>
          <input type="text" name="familyCommunicationDetails" placeholder="Describe the communication channels" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What resources or referral networks are available to connect family members with appropriate support services, such as counseling or financial assistance?</label>
        <div>
          <input type="text" name="familyResourcesReferrals" placeholder="List the resources" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are family assistance plans or protocols included in the organization's overall emergency response and recovery framework?</label>
        <div>
          <input type="radio" name="familyAssistancePlans" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="familyAssistancePlans" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <h2>3.1.1.2.3.5 Training and Preparedness:</h2>
      <div className="form-section">
        <label>Are staff members trained on the availability and utilization of post-incident support services as part of their emergency response training?</label>
        <div>
          <input type="radio" name="postIncidentSupportTraining" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="postIncidentSupportTraining" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members educated on recognizing signs of stress, trauma, or emotional distress in themselves and their colleagues?</label>
        <div>
          <input type="text" name="stressRecognitionEducation" placeholder="Describe how they are educated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are training sessions or workshops conducted to enhance staff members' resilience and coping skills in response to critical incidents?</label>
        <div>
          <input type="radio" name="resilienceTrainingWorkshops" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="resilienceTrainingWorkshops" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure that staff members feel comfortable and supported in seeking assistance or support when needed?</label>
        <div>
          <input type="text" name="supportSeekingComfortMeasures" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.3.6 Evaluation and Continuous Improvement:</h2>
      <div className="form-section">
        <label>How are post-incident support services evaluated for their effectiveness and responsiveness to staff members' needs?</label>
        <div>
          <input type="text" name="evaluationEffectiveness" placeholder="Describe how services are evaluated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are feedback mechanisms in place to gather input from staff members about their experiences with post-incident support services?</label>
        <div>
          <input type="text" name="feedbackDetails" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What measures or metrics are used to assess the impact of support interventions on staff members' well-being and recovery?</label>
        <div>
          <input type="text" name="impactAssessmentMetrics" placeholder="Describe the measures/metrics" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are lessons learned from post-incident support activities used to inform improvements to the organization's crisis management and employee assistance programs?</label>
        <div>
          <input type="radio" name="lessonsLearnedUsed" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="lessonsLearnedUsed" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default PostIncidentSupportFormPage;
