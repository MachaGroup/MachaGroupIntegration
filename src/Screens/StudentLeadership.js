import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function StudentLeadershipFormPage() {
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
            <h1>Student Leadership Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.2.3 Student Leadership */}
                <h2>Peer-to-Peer Safety Initiatives:</h2>
                <div className="form-section">
                    <label>How do student leaders actively engage their peers in promoting safety awareness and implementing initiatives within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful peer-to-peer safety initiatives led by students, and how they have positively impacted safety culture or behavior among peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage and impact" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do student leaders collaborate with school staff, administrators, or external organizations to support and amplify their peer-to-peer safety efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <h2>Leadership Roles and Responsibilities:</h2>
                <div className="form-section">
                    <label>What leadership roles and responsibilities are entrusted to student leaders in driving peer-to-peer safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles/responsibilities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student leaders selected or recruited for leadership roles related to safety education, and what criteria are used to identify potential candidates?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're selected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the training, mentorship, or support provided to student leaders to enhance their leadership skills and effectiveness in promoting safety among peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training/mentorship/support" />  
                    </div>
                </div>

                <h2>Training and Skill Development:</h2>
                <div className="form-section">
                    <label>What opportunities are available for student leaders to develop essential skills and competencies related to promoting safety and emergency preparedness among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opportunities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training programs or workshops specifically designed to equip student leaders with communication, collaboration, problem-solving, and decision-making skills relevant to safety leadership roles?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do student leaders apply the knowledge and skills gained through training to effectively communicate safety messages, influence peer behavior, and respond to safety concerns within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they apply knowledge/skills" />  
                    </div>
                </div>
                
                <h2>Collaboration with School Staff and Administration:</h2>
                <div className="form-section">
                    <label>How do student leaders collaborate with school staff, administrators, or safety personnel to align peer-to-peer safety initiatives with institutional goals and priorities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between student leaders and adult stakeholders in advancing safety education and preparedness within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do school staff and administrators support and empower student leaders to take ownership of safety initiatives and drive positive change among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

                <h2>Evaluation and Recognition:</h2>
                <div className="form-section">
                    <label>How are student-led safety initiatives evaluated for their effectiveness and impact on safety culture, behavior change, and incident prevention within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are specific metrics, indicators, or benchmarks established to assess the success of peer-to-peer safety initiatives led by student leaders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the metrics/indicators/benchmarks" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student leaders recognized, celebrated, or rewarded for their contributions to promoting safety and fostering a culture of responsibility and preparedness among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're recognized" />  
                    </div>
                </div>

                <h2>Sustainability and Continuity:</h2>
                <div className="form-section">
                    <label>What measures are in place to ensure the sustainability and continuity of peer-to-peer safety initiatives beyond the tenure of current student leaders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are succession plans or leadership transition processes implemented to facilitate the seamless transfer of knowledge, skills, and responsibilities to incoming student leaders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the plans/leadership" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do student leaders mentor, empower, and inspire younger students to become future safety leaders and continue the legacy of peer-to-peer safety initiatives within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how students mentor" />  
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How do student leaders engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how students engage" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of collaborative projects, events, or campaigns led by student leaders that have extended the reach and impact of safety education beyond the school campus?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do student leaders leverage digital platforms, social media, or other communication channels to amplify their safety messages and mobilize collective action among peers and community members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default StudentLeadershipFormPage;