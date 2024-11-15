import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PeerSupportNetworksFormPage() {
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
            <h1>Peer Support Networks Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.3 Peer Support Networks */}
                <h2>Training and Structure:</h2>
                <div className="form-section">
                    <label>How are peer support network members selected or trained to ensure they possess the necessary skills and knowledge to effectively support their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's selected/trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What ongoing support or supervision mechanisms are in place to assist peer supporters in managing their roles and addressing challenging situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the support/supervision mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the structure of the peer support network designed to facilitate effective communication, collaboration, and coordination among members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's designed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established protocols or guidelines for maintaining confidentiality and ensuring that peer support interactions are conducted in a safe and respectful manner?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/guidelines" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support network activities integrated with existing school programs or initiatives aimed at promoting mental health and well-being?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's integrated" />  
                    </div>
                </div>

                <h2>Accessibility and Outreach:</h2>
                <div className="form-section">
                    <label>What efforts are made to promote awareness of the peer support network among students, and how accessible is information about accessing support from peer supporters?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts made" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are barriers to accessing peer support addressed, particularly for students who may be reluctant to seek help or who face additional challenges in reaching out?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're addressed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there strategies in place to ensure that peer support services are inclusive and reach a diverse range of students, including those from marginalized or underserved communities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from students used to evaluate the accessibility and effectiveness of the peer support network, and what adjustments are made based on this feedback?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's used to evaluate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there partnerships or collaborations with other school or community organizations to enhance the visibility and reach of the peer support network?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the partnerships/collaborations" />  
                    </div>
                </div>

                <h2>Training and Skill Development:</h2>
                <div className="form-section">
                    <label>What specific training or skill development opportunities are provided to peer support network members to enhance their capacity to provide effective support to their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training/skill development opportunities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training curricula or materials tailored to address the unique needs and challenges of peer supporters, including topics such as active listening, empathy, and boundary setting?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it addresses the needs/challenges" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for peer supporters to receive ongoing training or professional development to further develop their skills and expertise?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of training programs assessed, and what mechanisms are in place for incorporating feedback from peer supporters into future training initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's assessed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions for recognizing and rewarding the contributions of peer supporters, such as certifications, awards, or opportunities for leadership development?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Peer Support Activities and Services:</h2>
                <div className="form-section">
                    <label>What types of support services or activities are offered through the peer support network, and how are these tailored to meet the diverse needs and preferences of students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the types offered" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support activities structured to promote inclusivity, diversity, and cultural competence, ensuring that all students feel welcome and valued?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're structured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for peer supporters to engage in proactive outreach and engagement efforts to connect with students who may benefit from support but may not actively seek it out?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support services aligned with broader school goals or initiatives related to mental health promotion, bullying prevention, or student well-being?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're aligned" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for evaluating the impact and effectiveness of peer support activities, such as collecting feedback from participants or tracking outcomes over time?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Collaboration and Referral Networks:</h2>
                <div className="form-section">
                    <label>How does the peer support network collaborate with other school-based support services, such as counseling centers, student support teams, or health services, to ensure coordinated care for students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols or procedures are in place for referring students to additional support services or resources beyond the scope of peer support, when needed?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established partnerships or referral networks with external organizations or community agencies to expand the range of support options available to students?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the partnerships" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication channels maintained between peer supporters and other support providers to facilitate information sharing, continuity of care, and follow-up?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're maintained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for tracking and monitoring referrals made by peer supporters to ensure that students receive appropriate follow-up and support?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of the peer support network evaluated, and what metrics or indicators are used to assess its impact on student well-being and school climate?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for collecting feedback from both peer supporters and students who have received support to gather insights into their experiences and satisfaction with the service?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evaluation findings used to identify areas for improvement or refinement in the peer support network, and what steps are taken to implement changes based on these findings?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're used" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for ongoing research or evaluation studies to further explore the outcomes and benefits of peer support interventions within the school context?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the peer support network integrated into broader efforts to promote a positive and supportive school environment, and what strategies are employed to sustain its impact over time?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default PeerSupportNetworksFormPage;