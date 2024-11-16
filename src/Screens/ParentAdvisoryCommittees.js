import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ParentAdvisoryCommitteesFormPage() {
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
            <h1>Parent Advisory Committees Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.1.3 Parent Advisory Committees */}
                <h2>Committee Formation and Composition:</h2>
                <div className="form-section">
                    <label>How are parent advisory committees established, structured, and maintained within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's established" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to select parent representatives for advisory committees, and how are they chosen to ensure diverse perspectives, expertise, and representation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent advisory committees inclusive and reflective of the demographics, backgrounds, and interests of the school community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Role and Scope of Advisory Committees:</h2>
                <div className="form-section">
                    <label>What specific roles, responsibilities, and mandates are assigned to parent advisory committees, particularly regarding their involvement in emergency planning and safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles/responsibilities/mandates" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do advisory committees contribute to the development, review, and refinement of emergency plans, protocols, policies, or procedures within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they contribute" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are advisory committees empowered to provide input, feedback, recommendations, or alternative perspectives on emergency preparedness and safety-related matters?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Engagement and Communication:</h2>
                <div className="form-section">
                    <label>How do parent advisory committees engage with school leadership, administrators, safety personnel, and other stakeholders to facilitate open communication, collaboration, and transparency?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're engaging" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms or channels are in place to solicit feedback, concerns, suggestions, or insights from parent advisory committees regarding emergency plans, safety measures, or school policies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are advisory committee meetings, forums, or discussions conducted regularly and inclusively to encourage participation, dialogue, and consensus-building among members?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Review and Evaluation:</h2>
                <div className="form-section">
                    <label>How does the school administration or leadership utilize feedback and recommendations from parent advisory committees to inform decision-making, policy development, or improvements in emergency preparedness and safety?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they use feedback" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a structured process or timeline for reviewing, revising, and updating emergency plans, protocols, or procedures based on input from advisory committees and other stakeholders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe process/timeline" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are outcomes, actions, or changes resulting from advisory committee input communicated transparently and effectively to the school community to demonstrate accountability and responsiveness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Capacity Building and Training:</h2>
                <div className="form-section">
                    <label>Are members of parent advisory committees provided with orientation, training, or resources to enhance their understanding of emergency planning principles, safety protocols, and relevant school policies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school administration support the capacity building and professional development of advisory committee members to empower them as informed and effective contributors to safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they support the development" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities available for advisory committee members to collaborate with external experts, attend workshops or conferences, or participate in relevant training sessions to broaden their knowledge and expertise in emergency preparedness and safety?</label>
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

export default ParentAdvisoryCommitteesFormPage;