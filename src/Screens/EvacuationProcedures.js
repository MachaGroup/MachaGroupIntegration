import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EvacuationProceduresFormPage() {
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
            <h1>Conflict Resolution Assessment</h1>
        </header>

        <main className="form-container">
            <form>
            {/* 2.2.1.1.1 Evacuation Procedures */}
            <h2>Evacuation Routes and Procedures:</h2>
            <div className="form-section">
                <label>Are there clearly defined evacuation routes posted throughout the premises, indicating primary and secondary exit paths?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Have evacuation procedures been established for different scenarios, such as fire emergencies, bomb threats, or natural disasters?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe evacuation procedures" />
                </div>
            </div>

            <div className="form-section">
                <label>Are staff members trained on evacuation procedures and their roles during evacuations?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Assembly Points:</h2>
            <div className="form-section">
                <label>Have designated assembly points been identified outside the building where occupants should gather after evacuating?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are assembly points located at safe distances from the building and away from potential hazards?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Do assembly points provide adequate space and facilities for occupants to gather and await further instructions?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Communication and Alert Systems:</h2>
            <div className="form-section">
                <label>Is there an effective communication system in place to alert occupants of the need to evacuate?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are fire alarms, strobe lights, or other alerting devices installed and regularly tested to ensure they are functional?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a mechanism for broadcasting evacuation instructions and updates to all occupants, including those with disabilities or language barriers?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the mechanism" />
                </div>
            </div>

            <h2>Evacuation Procedures for Special Needs:</h2>
            <div className="form-section">
                <label>Are there procedures in place to assist occupants with disabilities or special needs during evacuations?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are staff members trained to provide assistance to individuals who may require additional support during evacuations?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are evacuation routes and assembly points accessible to individuals with mobility impairments or other disabilities?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Accountability and Accountability:</h2>
            <div className="form-section">
                <label>Is there a system in place to account for all occupants and ensure everyone has evacuated safely?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the system" />
                </div>
            </div>

            <div className="form-section">
                <label>Are designated individuals assigned to perform accountability checks at assembly points and report any missing persons to emergency responders?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="List designated individuals" />
                </div>
            </div>

            <div className="form-section">
                <label>Are procedures in place for re-entry into the building after evacuations have been completed and deemed safe?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Training and Drills:</h2>
            <div className="form-section">
                <label>Are regular evacuation drills conducted to familiarize occupants with evacuation procedures and routes?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are drills tailored to address different scenarios and challenges that may arise during evacuations?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are feedback and lessons learned from drills used to improve evacuation procedures and preparedness?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Review and Updates:</h2>
            <div className="form-section">
                <label>Are evacuation procedures regularly reviewed and updated to reflect changes in building layout, occupancy, or emergency response protocols?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is input from occupants, emergency responders, and other stakeholders solicited to identify areas for improvement in evacuation plans?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are updates communicated effectively to all occupants and staff members to ensure they are aware of changes to evacuation procedures?</label>
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

export default EvacuationProceduresFormPage;