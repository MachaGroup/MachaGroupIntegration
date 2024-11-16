import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AnonymousReportingSystemsFormPage() {
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
            <h1>Anonymous Reporting Systems Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.2 Anonymous Reporting Systems */}
                <h2>Accessibility and Utilization:</h2>
                <div className="form-section">
                    <label>How diverse are the channels provided for anonymous reporting, and what efforts are made to ensure that all students feel comfortable using them?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how diverse are they" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote awareness and encourage regular utilization of the anonymous reporting system among students, staff, and parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of different reporting channels assessed, and are adjustments made based on feedback or usage patterns?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the effectiveness is assessed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions in place to accommodate individuals who may face barriers to accessing traditional reporting channels, such as language barriers or disabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Confidentiality and Trust:</h2>
                <div className="form-section">
                    <label>How is the anonymity of individuals who submit reports ensured, and what measures are taken to protect their identities from being disclosed?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's ensured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place to address concerns about potential breaches of confidentiality or misuse of the anonymous reporting system?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is trust in the anonymous reporting system maintained or reinforced among students, staff, and parents, particularly in cases where anonymity may be perceived as a barrier to accountability?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's maintained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for providing feedback or updates to individuals who submit anonymous reports, while still respecting their anonymity?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Response and Follow-Up:</h2>
                <div className="form-section">
                    <label>What procedures are in place for reviewing and investigating reports submitted through the anonymous reporting system, and how are findings communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are reports prioritized based on severity, urgency, or other factors, and what mechanisms exist for ensuring timely responses?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're prioritized" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What follow-up actions are taken in response to anonymous reports, and how are individuals who submit reports kept informed about the outcomes of their submissions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the follow-up actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for ongoing dialogue or engagement with individuals who submit anonymous reports, to gather additional information or clarify details as needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Data Analysis and Trend Identification:</h2>
                <div className="form-section">
                    <label>How is data collected from anonymous reports analyzed to identify trends, patterns, or emerging issues related to bullying incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the data is analyzed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place for sharing insights or findings from data analysis with relevant stakeholders, and how are these used to inform decision-making or resource allocation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular reviews or assessments of the effectiveness of the anonymous reporting system, based on data trends or other indicators?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are findings from data analysis incorporated into broader efforts to prevent and address bullying behavior within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're incorporated" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default AnonymousReportingSystemsFormPage;