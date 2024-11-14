import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DataHandlingGuidelinesFormPage() {
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
            <h1>Data Handling Guidelines Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.4.3.1.2 Data Handling Guidelines */}
                <div className="form-section">
                    <label>What are the key steps for securely storing and transmitting sensitive data?</label>
                    <div>
                        <input type="text" name="storingData" placeholder="Describe the key steps" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees classify data based on sensitivity (e.g., public, confidential, restricted)?</label>
                    <div>
                        <input type="text" name="classifyingData" placeholder="Describe how they classify data" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures must be followed when sharing data with external parties?</label>
                    <div>
                        <input type="text" name="sharingData" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What actions should employees take in the event of accidental data exposure or loss?</label>
                    <div>
                        <input type="text" name="accidentalExposure" placeholder="Describe the actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How often should employees review and update their understanding of data handling policies?</label>
                    <div>
                        <input type="text" name="employeesReviewing" placeholder="Describe how they review/update" />  
                    </div>
                </div>
            </form>
        </main>
    </div>
  )
}

export default DataHandlingGuidelinesFormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DataHandlingGuidelinesFormPage() {
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
            <h1>Data Handling Guidelines Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.4.3.1.2 Data Handling Guidelines */}
                <div className="form-section">
                    <label>What are the key steps for securely storing and transmitting sensitive data?</label>
                    <div>
                        <input type="text" name="storingData" placeholder="Describe the key steps" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees classify data based on sensitivity (e.g., public, confidential, restricted)?</label>
                    <div>
                        <input type="text" name="classifyingData" placeholder="Describe how they classify data" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures must be followed when sharing data with external parties?</label>
                    <div>
                        <input type="text" name="sharingData" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What actions should employees take in the event of accidental data exposure or loss?</label>
                    <div>
                        <input type="text" name="accidentalExposure" placeholder="Describe the actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How often should employees review and update their understanding of data handling policies?</label>
                    <div>
                        <input type="text" name="employeesReviewing" placeholder="Describe how they review/update" />  
                    </div>
                </div>
            </form>
        </main>
    </div>
  )
}

export default DataHandlingGuidelinesFormPage;