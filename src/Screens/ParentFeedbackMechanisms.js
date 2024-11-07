import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ParentFeedbackMechanismsFormPage() {
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
            <h1>Parent Feedback Mechanisms Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.2.3 Parent Feedback Mechanisms */}
                <h2>Feedback Collection Methods:</h2>
                <div className="form-section">
                    <label>What mechanisms or channels are available for parents to provide feedback on school safety, emergency preparedness, and communication processes?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback collection methods diversified to accommodate various preferences and communication styles of parents, such as surveys, suggestion boxes, town hall meetings, or online forums?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>How frequently are opportunities for providing feedback offered to parents, and are they accessible and convenient for all members of the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how frequent" />  
                    </div>
                </div>

                <h2>Survey Design and Administration:</h2>
                <div className="form-section">
                    <label>How are surveys designed, developed, and administered to solicit feedback from parents regarding their perceptions, experiences, and suggestions related to school safety and emergency communication?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how surveys solicit feedback" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are survey questions structured to capture key aspects of safety concerns, emergency responsiveness, communication effectiveness, and overall satisfaction with school safety measures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to encourage participation, increase response rates, and ensure representative sampling in parent feedback surveys?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Data Analysis and Interpretation:</h2>
                <div className="form-section">
                    <label>How is feedback data collected from parents analyzed, synthesized, and interpreted to identify trends, patterns, or recurring themes relevant to school safety and emergency communication?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how data is collected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to disaggregate feedback by demographic factors, such as grade level, language proficiency, or parental involvement, to ensure equitable representation and address diverse perspectives?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools, software, or methodologies are utilized to extract actionable insights from parent feedback and inform decision-making processes related to school safety initiatives and communication strategies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the tools/software/methodologies" />  
                    </div>
                </div>

                <h2>Response and Follow-up:</h2>
                <div className="form-section">
                    <label>How does the school administration or leadership respond to feedback received from parents regarding school safety concerns, emergency preparedness, or communication challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the tools/software/methodologies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established to acknowledge receipt of feedback, communicate follow-up actions, and provide updates or resolutions to address parent concerns in a timely and transparent manner?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to demonstrate accountability, responsiveness, and continuous improvement in school safety practices and communication efforts based on parent feedback?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Engagement and Collaboration:</h2>
                <div className="form-section">
                    <label>Are opportunities provided for parents to participate in collaborative discussions, focus groups, or advisory committees aimed at reviewing feedback data, prioritizing safety initiatives, and co-creating solutions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school foster a culture of open communication, trust, and partnership with parents by actively seeking their input, valuing their perspectives, and integrating their feedback into decision-making processes?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they foster a culture" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms integrated into broader efforts to engage parents as active partners in promoting school safety, fostering community resilience, and enhancing emergency preparedness within the school community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default ParentFeedbackMechanismsFormPage;