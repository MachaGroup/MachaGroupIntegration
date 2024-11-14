import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RecognizingSecurityIncidentsFormPage() {
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
            <h1>Recognizing Security Incidents Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.5.1.1 Recognizing Security Incidents */}
                <div className="form-section">
                    <label>What are common signs of a potential security incident (e.g., phishing attempts, unusual network activity)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the common signs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How can employees distinguish between false alarms and legitimate security threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they distinguish between them" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of incidents (e.g., malware infections, unauthorized access) should be reported immediately?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the different types" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees respond if they suspect a data breach or compromise?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they should respond" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or systems are available to help employees monitor and report potential security issues?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the tools/systems" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityIncidentsFormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RecognizingSecurityIncidentsFormPage() {
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
            <h1>Recognizing Security Incidents Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.5.1.1 Recognizing Security Incidents */}
                <div className="form-section">
                    <label>What are common signs of a potential security incident (e.g., phishing attempts, unusual network activity)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the common signs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How can employees distinguish between false alarms and legitimate security threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they distinguish between them" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of incidents (e.g., malware infections, unauthorized access) should be reported immediately?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the different types" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees respond if they suspect a data breach or compromise?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they should respond" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or systems are available to help employees monitor and report potential security issues?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the tools/systems" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityIncidentsFormPage;