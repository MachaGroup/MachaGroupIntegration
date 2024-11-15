import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ParentVolunteerProgramsFormPage() {
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
            <h1>Parent Volunteer Programs Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.1.2 Parent Volunteer Programs */}
                <h2>Program Structure and Organization:</h2>
                <div className="form-section">
                    <label>How are parent volunteer programs, particularly those focused on emergency response or safety, structured and organized within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the programs structured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What roles and responsibilities do parent volunteers assume within emergency response teams or safety committees, and how are these roles defined and communicated?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the roles and responsibilities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteer programs integrated into broader school safety plans, emergency protocols, or community engagement strategies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Recruitment and Training:</h2>
                <div className="form-section">
                    <label>How are parents recruited or solicited to participate in volunteer programs related to emergency response or safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're recruited" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria or qualifications are used to select parent volunteers for specific roles or responsibilities, such as training, availability, skills, or expertise?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria/qualifications" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteers provided with training, orientation, or resources to prepare them for their roles and responsibilities within emergency response teams or safety committees?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Collaboration with School Staff and Administration:</h2>
                <div className="form-section">
                    <label>How do parent volunteer programs collaborate with school staff, administrators, or safety personnel to support and enhance school safety efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between parent volunteer programs and school stakeholders in addressing safety concerns, implementing safety protocols, or organizing emergency drills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do parent volunteers contribute to the development, implementation, or evaluation of school safety policies, procedures, or initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

                <h2>Role in Emergency Response:</h2>
                <div className="form-section">
                    <label>What specific roles or functions do parent volunteers fulfill within emergency response teams or safety committees during various types of emergencies or crisis situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles/functions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parent volunteers trained and prepared to effectively respond to emergencies, assist with evacuation procedures, provide first aid support, or facilitate communication and coordination efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent volunteers integrated into broader emergency response plans, incident command structures, or communication protocols to ensure a coordinated and effective response?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How do parent volunteer programs engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're engaging" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of collaborative projects, events, or campaigns led by parent volunteers that have extended the reach and impact of safety education beyond the school campus?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do parent volunteers leverage their networks, expertise, or resources to mobilize collective action, build community resilience, and foster a culture of safety within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default ParentVolunteerProgramsFormPage;