import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ParentTeacherAssociationsFormPage() {
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
            <h1>Parent-Teacher Associations Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.2.1 Parent-Teacher Associations */}
                <h2>Association Structure and Function:</h2>
                <div className="form-section">
                    <label>How is the parent-teacher association (PTA) or similar organization structured, governed, and operated within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how PTA's are structured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What roles and responsibilities do PTA members fulfill in facilitating communication, collaboration, and engagement between parents, teachers, administrators, and other stakeholders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the roles/responsibilties" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PTA meetings, events, or activities inclusive and accessible to all parents, regardless of background, language, or socio-economic status?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Information Dissemination and Outreach:</h2>
                <div className="form-section">
                    <label>How does the PTA disseminate important information, updates, announcements, or resources related to school safety, emergency preparedness, and other relevant topics to parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they disseminate info" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels, platforms, or strategies are utilized by the PTA to reach a broad audience of parents and ensure timely and effective communication?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels/platforms/strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are efforts made to engage parents who may face barriers to communication, such as language barriers, limited access to technology, or lack of familiarity with school processes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts" />  
                    </div>
                </div>

                <h2>Collaboration with School Leadership:</h2>
                <div className="form-section">
                    <label>How does the PTA collaborate with school leadership, administrators, or safety personnel to support and enhance communication efforts related to school safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how PTA collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between the PTA and school stakeholders in promoting safety awareness, organizing informational sessions, or addressing parent concerns?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways does the PTA contribute to the development, implementation, or evaluation of parent communication strategies and policies within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

                <h2>Engagement Events and Activities:</h2>
                <div className="form-section">
                    <label>What types of events, workshops, or activities does the PTA organize to engage parents in discussions, workshops, or training sessions related to school safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the events/workshops/activities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the PTA leverage its resources, networks, and expertise to create opportunities for parents to learn, collaborate, and share experiences with each other regarding safety concerns or best practices?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they leverage resources" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PTA-sponsored events designed to accommodate diverse preferences, interests, and schedules of parents to maximize participation and engagement?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Feedback and Input</h2>
                <div className="form-section">
                    <label>How does the PTA solicit feedback, suggestions, concerns, or input from parents regarding school safety, emergency planning, or other relevant issues?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they solicit feedback" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place for parents to provide feedback anonymously, confidentially, or through designated representatives to ensure open and honest communication?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the PTA utilize feedback from parents to advocate for improvements, advocate for changes, or address emerging safety challenges within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they utilize feedback" />  
                    </div>
                </div>
                
            </form>
        </main>
    </div>
  )
}

export default ParentTeacherAssociationsFormPage;