import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FireDepartmentCollaborationFormPage() {
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
            <h1>Fire Department Collaboration Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.2.1.2 Recertification Schedule */}
                <h2>Partnership Objectives and Initiatives:</h2>
                <div className="form-section">
                    <label>What are the primary objectives and focus areas of collaboration between the school or educational institution and the local fire department?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the objectives" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and fire department to enhance fire safety, prevention, and preparedness within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the partnership with the fire department aligned with broader school safety goals, emergency planning efforts, or community resilience initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's aligned" />  
                    </div>
                </div>

                <h2>Fire Prevention Education and Outreach:</h2>
                <div className="form-section">
                    <label>How does the fire department support fire prevention education and outreach efforts within the school community, including students, staff, and families?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the support" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources, materials, or presentations does the fire department provide to educate students about fire safety practices, evacuation procedures, and fire prevention measures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials/presentation" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative activities organized to engage students in hands-on learning experiences, demonstrations, or interactive sessions related to fire safety and emergency preparedness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Inspection and Compliance:</h2>
                <div className="form-section">
                    <label>How does the fire department collaborate with the school administration to conduct fire inspections, safety audits, or compliance checks of school facilities and premises?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are school staff, administrators, or designated safety personnel trained to address fire code violations, safety hazards, or deficiencies identified during inspections, and to implement corrective measures in a timely manner?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to ensure ongoing communication, coordination, and follow-up between the school and fire department regarding compliance with fire safety regulations and standards?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Emergency Response Planning:</h2>
                <div className="form-section">
                    <label>How does the school administration collaborate with the fire department to develop, review, and update emergency response plans, protocols, and procedures for addressing fire incidents or emergencies on campus?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of fire response strategies, evacuation routes, and communication protocols between the school and fire department?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What role does the fire department play in providing guidance, expertise, or technical assistance to enhance the school's capacity to respond effectively to fire emergencies and ensure the safety of students, staff, and visitors?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the role" />  
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How does the fire department engage with the broader school community, including parents, neighborhood residents, and local businesses, to promote fire safety awareness, preparedness, and collaboration?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are community events, workshops, or outreach activities organized jointly by the school and fire department to disseminate information, share resources, and foster partnerships around fire prevention and safety?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to leverage the expertise, credibility, and trust of the fire department in building public confidence, resilience, and support for school safety initiatives within the local community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default FireDepartmentCollaborationFormPage;