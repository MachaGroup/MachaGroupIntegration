import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IdentifyingSuspiciousBehaviorFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Identifying Suspicious Behaivor');
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
            <h1>3.1.1.4.1.1 Identifying Suspicious Behavior Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.1.4.1.1 Identifying Suspicious Behavior */}
                <h2>3.1.1.4.1.1.1 Understanding of Suspicious Behaviors:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize and identify indicators of suspicious behavior, unusual activity, or potential threats within the school environment?</label>
                    <div>
                        <input type="radio" name="recognizing-suspicious-behavior" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="recognizing-suspicious-behavior" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific behaviors or actions are emphasized during training as potential warning signs of security concerns, such as aggression, hostility, erratic movements, or attempts to conceal weapons or contraband?</label>
                    <div>
                        <input type="text" name="warning-sign-training" placeholder="Describe the behaviors/actions" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining vigilance, situational awareness, and proactive observation to detect and report suspicious incidents promptly?</label>
                    <div>
                        <input type="text" name="maintaining-vigilance" placeholder="Describe how they're educated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.4.1.1.2 Reporting Procedures:</h2>
                <div className="form-section">
                    <label>Are clear reporting procedures established and communicated to staff members for documenting and reporting observations of suspicious behavior or security-related concerns?</label>
                    <div>
                        <input type="radio" name="reporting-procedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reporting-procedures" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to initiate timely and appropriate responses, such as notifying school administrators, security personnel, or law enforcement authorities, when encountering suspicious individuals or activities?</label>
                    <div>
                        <input type="text" name="response-training" placeholder="Describe how they're trained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure confidentiality, anonymity, and protection from retaliation for staff members who report security-related incidents or raise concerns about potential threats?</label>
                    <div>
                        <input type="text" name="confidentiality-measures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.4.1.1.3 Communication and Collaboration:</h2>
                <div className="form-section">
                    <label>How are staff members encouraged to communicate and collaborate with colleagues, security personnel, and other stakeholders to share information, insights, and observations related to security threats or suspicious behavior?</label>
                    <div>
                        <input type="text" name="collaborating-with-colleagues" placeholder="Describe how they're encouraged" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to facilitate information sharing, debriefings, or post-incident discussions among staff members to analyze and learn from past experiences, identify emerging trends, and enhance threat recognition capabilities?</label>
                    <div>
                        <input type="radio" name="information-sharing" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="information-sharing" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="information-sharing-mechanisms" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are followed to coordinate threat assessment efforts, validate reported concerns, and determine appropriate follow-up actions or interventions based on the severity and credibility of identified threats?</label>
                    <div>
                        <input type="text" name="threat-assessment-protocols" placeholder="Describe the protocols" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.4.1.1.4 Scenario-based Training:</h2>
                <div className="form-section">
                    <label>Are staff members provided with scenario-based training exercises, simulations, or case studies to practice identifying and responding to various types of security threats or suspicious situations?</label>
                    <div>
                        <input type="radio" name="training-exercises" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="training-exercises" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do scenario-based training sessions simulate realistic scenarios, challenge decision-making abilities, and test staff members' capacity to assess threats, evaluate risks, and implement appropriate security measures?</label>
                    <div>
                        <input type="text" name="simulate-realistic-scenarios" placeholder="Describe how they simulate" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during scenario-based training exercises, reinforce key concepts, and address areas for improvement in threat recognition and response skills?</label>
                    <div>
                        <input type="text" name="evaluating-performance" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.4.1.1.5 Cultural Sensitivity and Bias Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize potential biases, stereotypes, or cultural factors that may influence their perceptions of suspicious behavior or threat indicators?</label>
                    <div>
                        <input type="radio" name="recognizing-potential-biases" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="recognizing-potential-biases" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do training programs promote cultural sensitivity, inclusivity, and equity in threat assessment practices, ensuring that staff members avoid making assumptions based on race, ethnicity, religion, or other personal characteristics?</label>
                    <div>
                        <input type="text" name="cultural-sensitivity-programs" placeholder="Describe how they promote these" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are implemented to foster open dialogue, mutual respect, and trust among staff members, students, and community members, enhancing the effectiveness of threat recognition efforts and promoting a safe and supportive school environment for all?</label>
                    <div>
                        <input type="text" name="open-dialogue-strategies" placeholder="Describe the strategies" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default IdentifyingSuspiciousBehaviorFormPage;