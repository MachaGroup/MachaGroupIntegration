import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function CommunicationPlatformsFormPage() {
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
            <h1>Communication Platforms Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.4.2.1.4 Communication Platforms */}
                <h2>Availability of Communication Platforms:</h2>
                <div className="form-section">
                    <label>Are designated communication platforms established to facilitate communication between the school or institution and parents/guardians during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the designated communication platforms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do communication platforms include various channels such as phone lines, messaging apps, email, or web portals?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Designation of Phone Lines:</h2>
                <div className="form-section">
                    <label>Are specific phone lines designated for parent communication during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a clear process for parents to access these designated phone lines, including published contact numbers and operating hours?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Redundancy and Backup Options:</h2>
                <div className="form-section">
                    <label>Are redundant communication options available in case of phone line failures or disruptions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the redundant communication options" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup communication platforms such as messaging apps or email used to supplement phone lines and ensure reliable communication with parents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility and Usability:</h2>
                <div className="form-section">
                    <label>Are communication platforms accessible and user-friendly for parents of diverse backgrounds and abilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is information provided in multiple languages or formats to accommodate linguistic and accessibility needs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are designated communication platforms integrated into broader emergency communication and response plans?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                <div className="form-section">
                    <label>Are procedures established for using communication platforms to disseminate emergency notifications, updates, and instructions to parents during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are communication platforms tested and verified periodically to ensure their functionality and reliability?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to simulate emergency situations and assess the responsiveness and effectiveness of communication platforms?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to use designated communication platforms for parent communication during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or guidelines provided to assist staff members in effectively communicating with parents via designated communication channels?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from parents regarding the usability, reliability, and effectiveness of communication platforms during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing parent communication protocols and platforms considered and implemented based on feedback received?</label>
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

export default CommunicationPlatformsFormPage;