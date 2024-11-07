import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ParentInvolvement2FormPage() {
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
            <h1>Parent Involvement Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.3 Parent Involvement */}
                <h2>Information Sessions:</h2>
                <div className="form-section">
                    <label>How are parents informed about the emergency procedures and protocols established by the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're informed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are information sessions or workshops organized specifically to educate parents about emergency preparedness and response?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What topics are covered during these information sessions, and how are they tailored to meet the informational needs and concerns of parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the topics" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to ask questions, seek clarification, or express their opinions and feedback regarding emergency procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication Channels:</h2>
                <div className="form-section">
                    <label>What communication channels are used to disseminate information about emergency procedures to parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are newsletters, emails, or other forms of written communication regularly sent to parents to provide updates and reminders about emergency preparedness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are social media platforms or school websites utilized to share relevant information and resources with parents regarding emergency procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how social media is utilized" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency notification systems in place to alert parents in real-time about critical incidents or urgent situations affecting the school community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the systems" />  
                    </div>
                </div>

                <h2>Parent Education Resources:</h2>
                <div className="form-section">
                    <label>Are educational materials or resources provided to parents to support their understanding of emergency procedures and their role in supporting their children's preparedness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of resources are available to parents, such as pamphlets, handouts, or online guides, and how accessible are they?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the resources" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents encouraged to review and discuss emergency procedures with their children at home, and are guidance materials provided to facilitate these discussions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents encouraged to reinforce emergency preparedness concepts and skills learned at school within the home environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how are they encouraged" />  
                    </div>
                </div>

                <h2>Parent Feedback and Engagement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to solicit feedback from parents regarding their understanding of emergency procedures and their perceived effectiveness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parent perspectives and concerns regarding emergency preparedness considered and addressed by school administrators and staff?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how are they addressed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents invited to participate in planning committees, advisory groups, or other forums focused on emergency preparedness and safety?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to foster ongoing engagement and collaboration between parents and school stakeholders in enhancing emergency preparedness efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Participation in Drills and Exercises:</h2>
                <div className="form-section">
                    <label>Are parents encouraged or invited to participate in emergency drills and exercises conducted by the school or educational institution?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents informed about upcoming drills and exercises, and what instructions or expectations are provided to them regarding their involvement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're informed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to observe or volunteer during emergency drills to gain firsthand experience and understanding of school emergency procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place to gather input from parents about their observations and experiences during emergency drills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default ParentInvolvement2FormPage;