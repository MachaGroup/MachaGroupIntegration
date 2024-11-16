import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RolePlayingScenariosFormPage() {
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
            <h1>Role-Playing Scenarios Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.2.2 Role-Playing Scenarios */}
                <h2>Scenario Selection:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios selected or developed to address specific safety concerns or emergency situations relevant to the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's selected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios based on real-life incidents, local hazards, or common safety risks identified within the school environment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to ensure that role-playing scenarios are age-appropriate, culturally sensitive, and aligned with the developmental needs of participants?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <h2>Scenario Design and Structure:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios designed to engage participants and simulate realistic emergency situations or safety challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's designed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios scripted or improvised, and how are roles assigned or distributed among participants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the scenarios and roles" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What props, equipment, or simulated environments are used to enhance the realism and immersion of role-playing scenarios?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's designed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios structured to allow for multiple outcomes or variations based on participant actions and decisions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Participant Engagement and Interaction:</h2>
                <div className="form-section">
                    <label>How are participants encouraged to actively engage and participate in role-playing scenarios?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions, pre-briefings, or instructions provided to orient participants and establish expectations before engaging in scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote collaboration, communication, and teamwork among participants during role-playing exercises?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for participants to reflect on their experiences, share insights, and learn from each other's perspectives following the completion of scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Learning Objectives and Outcomes:</h2>
                <div className="form-section">
                    <label>What specific learning objectives or outcomes are targeted through role-playing scenarios, and how are they aligned with broader safety education goals?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the objectives/outcomes" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios designed to reinforce key safety concepts, practice emergency response procedures, or develop critical thinking and problem-solving skills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are participant performance and learning outcomes assessed and evaluated during or after role-playing exercises?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how outcomes are accessed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions or post-scenario discussions used to identify strengths, areas for improvement, and lessons learned from each scenario?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Training Programs:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios integrated into broader safety training programs or curriculum initiatives within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how scenarios are integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios incorporated into existing classroom instruction, extracurricular activities, or dedicated safety training sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What role do teachers, staff members, or external facilitators play in facilitating role-playing scenarios and guiding participant learning?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are follow-up activities or assignments provided to reinforce learning and encourage further exploration of safety topics addressed in role-playing exercises?</label>
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

export default RolePlayingScenariosFormPage;