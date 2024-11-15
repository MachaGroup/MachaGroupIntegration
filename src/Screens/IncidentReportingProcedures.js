import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function IncidentReportingProceduresFormPage() {
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
            <h1>Incident Reporting Procedures Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.5.1.2 Incident Reporting Procedures */}
                <div className="form-section">
                    <label>What are the steps for reporting a security incident (e.g., whom to contact, what information to provide)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the steps" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific timeframes for reporting incidents, and what are the consequences of delayed reporting?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What channels are available for reporting (e.g., hotline, email, incident management system)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is anonymity handled in the reporting process, if an employee prefers to remain anonymous?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's handled" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What follow-up actions can employees expect after reporting an incident (e.g., investigation, status updates)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the actions" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default IncidentReportingProceduresFormPage;