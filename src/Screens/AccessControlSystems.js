import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AccessControlSystemsPage() {
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
        <h1>Access Control Systems Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the Access Control Systems operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" /> Yes
              <input type="radio" name="operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the systems accurately authenticate and authorize individuals' access rights?</label>
            <div>
              <input type="radio" name="auth-accurate" value="yes" /> Yes
              <input type="radio" name="auth-accurate" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or system errors that could compromise security?</label>
            <div>
              <input type="text" name="malfunction-signs" placeholder="Describe any malfunctions or errors" />
            </div>
          </div>

          {/* Authentication Mechanisms */}
          <h2>Authentication Mechanisms:</h2>
          <div className="form-section">
            <label>What authentication mechanisms are used within the Access Control Systems (e.g., RFID cards, PIN codes, biometric scanners)?</label>
            <div>
              <input type="text" name="auth-mechanisms" placeholder="Enter the authentication mechanisms" />
            </div>
          </div>

          <div className="form-section">
            <label>Are these mechanisms reliable and secure for verifying individuals' identities?</label>
            <div>
              <input type="radio" name="mechanisms-reliable" value="yes" /> Yes
              <input type="radio" name="mechanisms-reliable" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?</label>
            <div>
              <input type="radio" name="multi-factor" value="yes" /> Yes
              <input type="radio" name="multi-factor" value="no" /> No
            </div>
          </div>

          {/* Authorization and Access Rights */}
          <h2>Authorization and Access Rights:</h2>
          <div className="form-section">
            <label>How are access rights assigned and managed within the Access Control Systems?</label>
            <div>
              <input type="text" name="access-rights" placeholder="Describe how access rights are managed" />
            </div>
          </div>

          <div className="form-section">
            <label>Is there a defined process for granting, modifying, or revoking access permissions based on individuals' roles and responsibilities?</label>
            <div>
              <input type="radio" name="process-defined" value="yes" /> Yes
              <input type="radio" name="process-defined" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights regularly reviewed and updated to align with organizational changes and security requirements?</label>
            <div>
              <input type="radio" name="access-reviewed" value="yes" /> Yes
              <input type="radio" name="access-reviewed" value="no" /> No
            </div>
          </div>

          {/* Integration with Other Systems */}
          <h2>Integration with Other Systems:</h2>
          <div className="form-section">
            <label>Are the Access Control Systems integrated with other security systems, such as surveillance cameras, intrusion detection, or alarm systems?</label>
            <div>
              <input type="radio" name="systems-integrated" value="yes" /> Yes
              <input type="radio" name="systems-integrated" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>How does the integration enhance overall security and situational awareness within the facility?</label>
            <div>
              <input type="text" name="integration-enhance" placeholder="Describe the integration" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there any compatibility issues or gaps in integration that need to be addressed?</label>
            <div>
              <input type="text" name="integration-issues" placeholder="Describe any compatibility issues" />
            </div>
          </div>

          {/* Monitoring and Logging */}
          <h2>Monitoring and Logging:</h2>
          <div className="form-section">
            <label>Is there a centralized monitoring system in place to oversee access control events and activities?</label>
            <div>
              <input type="radio" name="monitoring-system" value="yes" /> Yes
              <input type="radio" name="monitoring-system" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access logs generated and maintained to track user activity, including successful and failed access attempts?</label>
            <div>
              <input type="radio" name="access-logs" value="yes" /> Yes
              <input type="radio" name="access-logs" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reviewing access logs and investigating any suspicious or unauthorized access incidents?</label>
            <div>
              <input type="radio" name="logs-review" value="yes" /> Yes
              <input type="radio" name="logs-review" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the Access Control Systems comply with relevant regulations, standards, and industry best practices (e.g., GDPR, HIPAA, ISO 27001)?</label>
            <div>
              <input type="radio" name="compliance-regs" value="yes" /> Yes
              <input type="radio" name="compliance-regs" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the systems undergone any audits or assessments to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="audits" value="yes" /> Yes
              <input type="radio" name="audits" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the Access Control Systems?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as software updates, hardware inspections, and database backups, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenance-tasks" value="yes" /> Yes
              <input type="radio" name="maintenance-tasks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenance-records" value="yes" /> Yes
              <input type="radio" name="maintenance-records" value="no" /> No
            </div>
          </div>

          {/* User Training and Awareness */}
          <h2>User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel, system administrators, and end-users, received training on how to use the Access Control Systems effectively?</label>
            <div>
              <input type="radio" name="user-training" value="yes" /> Yes
              <input type="radio" name="user-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper access control procedures, password management, and security awareness?</label>
            <div>
              <input type="radio" name="instructions-guidelines" value="yes" /> Yes
              <input type="radio" name="instructions-guidelines" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting system errors, suspicious activities, or security incidents related to the Access Control Systems?</label>
            <div>
              <input type="radio" name="reporting-process" value="yes" /> Yes
              <input type="radio" name="reporting-process" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default AccessControlSystemsPage;
