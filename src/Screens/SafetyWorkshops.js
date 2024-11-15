import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function SafetyWorkshopsFormPage() {
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
            <h1>Safety Workshops Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.1.1 Safety Workshops */}
                <h2>Event Planning and Coordination:</h2>
                <div className="form-section">
                    <label>How are safety workshops and educational events for parents planned, organized, and coordinated within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're planned" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to select topics, speakers, and formats for parent education events, and how are they aligned with the safety needs and concerns of the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent education events integrated into broader community engagement initiatives, school calendars, or existing parent involvement programs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Content and Curriculum:</h2>
                <div className="form-section">
                    <label>What specific safety topics are covered in parent education events, such as emergency preparedness, home safety, cyber safety, or substance abuse prevention?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the topics" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the content of safety workshops developed or curated to ensure relevance, accuracy, and effectiveness in addressing the information needs and concerns of parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's developed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are materials, resources, or take-home materials provided to parents to reinforce key safety messages and facilitate ongoing learning beyond the events?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe which is provided" />  
                    </div>
                </div>

                <h2>Engagement Strategies:</h2>
                <div className="form-section">
                    <label>How are efforts made to encourage parent participation and engagement in safety workshops and educational events?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels, outreach methods, or incentives are used to promote parent attendance, solicit feedback, and gauge interest in specific safety topics or initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent education events designed to accommodate diverse schedules, preferences, and accessibility needs of parents, such as offering multiple session times, language options, or virtual participation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Interactive Learning and Skill-building:</h2>
                <div className="form-section">
                    <label>How are parent education events structured to facilitate interactive learning, discussion, and skill-building among participants?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how events are structured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are workshops designed to incorporate hands-on activities, group discussions, case studies, or role-playing exercises to deepen understanding and retention of safety concepts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to empower parents with practical skills, resources, and strategies they can implement at home to enhance family safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Partnerships and Collaboration:</h2>
                <div className="form-section">
                    <label>How do schools collaborate with external partners, such as community organizations, local agencies, or subject matter experts, to enhance the quality and impact of parent education events?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful collaborations or joint initiatives that have enriched the content, reach, or engagement of safety workshops for parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do partnerships with external stakeholders contribute to the sustainability, diversity, and cultural relevance of parent education efforts within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default SafetyWorkshopsFormPage;