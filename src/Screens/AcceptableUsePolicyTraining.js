import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AcceptableUsePolicyTrainingFormPage() {
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
            <h1>Acceptable Use Policy (AUP) Training Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.4.3.1 Acceptable Use Policy (AUP) Training */}
                <div className="form-section">
                    <label>What activities are restricted under the Acceptable Use Policy (AUP)?</label>
                    <div>
                        <input type="text" name="restrictedActivities" placeholder="List the activities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees handle personal device usage in the workplace (e.g., BYOD policies)?</label>
                    <div>
                        <input type="text" name="deviceHandling" placeholder="Describe how they handle usage" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What are the consequences of violating the AUP?</label>
                    <div>
                        <input type="text" name="violatingConsequences" placeholder="List the consequences" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How can employees report potential AUP violations or issues?</label>
                    <div>
                        <input type="text" name="violationReport" placeholder="Describe how they report" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>When and how are employees required to complete AUP training?</label>
                    <div>
                        <input type="text" name="requiredCompletion" placeholder="Describe when/how they're required" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default AcceptableUsePolicyTrainingFormPage;