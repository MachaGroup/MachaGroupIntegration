import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EmergencyCommunicationTrainingFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
        <header className="header">
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Emergency Communication Training Assessment</h1>
      </header>

        <main className="form-container">
            <form>
                {/* 2.4.2.1.3 Emergency Communication Training */}
                <h2>Existence of Training Programs:</h2>
                <div className="form-section">
                    <label>Are formal training programs established to provide staff members with the necessary knowledge and skills for effective emergency communication?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training programs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs encompass various aspects of emergency communication, including procedures, protocols, equipment operation, and communication strategies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Frequency of Training:</h2>
                <div className="form-section">
                    <label>How frequently are emergency communication training sessions conducted for staff members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a schedule or calendar for recurring training sessions, and are sessions held at regular intervals throughout the year?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Inclusion of Communication Drills:</h2>
                <div className="form-section">
                    <label>Do emergency communication training programs incorporate practical exercises, drills, or simulations to simulate real-world emergency scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication drills designed to assess staff members' ability to effectively communicate critical information, follow established protocols, and coordinate response efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Scenario Variety:</h2>
                <div className="form-section">
                    <label>Are training scenarios diversified to cover a wide range of emergency situations, including natural disasters, security incidents, medical emergencies, and other relevant scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scenarios vary in complexity and severity to challenge staff members and enhance their preparedness for different types of emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Role-Specific Training:</h2>
                <div className="form-section">
                    <label>Are training sessions tailored to address the specific communication needs and responsibilities of different staff roles or departments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on their roles and responsibilities in initiating, receiving, and relaying emergency communication messages during various emergency scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms incorporated into training sessions to provide staff members with constructive feedback on their performance during communication drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions conducted after drills to review strengths, areas for improvement, and lessons learned, with recommendations for enhancement discussed and documented?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are emergency communication training programs aligned with broader emergency preparedness and response plans and protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training scenarios and exercises designed to reinforce and validate emergency communication procedures outlined in emergency plans?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document staff participation in emergency communication training sessions, including attendance, training materials used, and performance evaluations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EmergencyCommunicationTrainingFormPage;