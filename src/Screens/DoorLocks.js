import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DoorLocksPage() {
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
        <h1>Door Locks (e.g., electronic locks) Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the electronic door locks operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" /> Yes
              <input type="radio" name="operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the locks reliably secure doors to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="secure-locks" value="yes" /> Yes
              <input type="radio" name="secure-locks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in the locking mechanisms?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" /> Yes
              <input type="radio" name="malfunction" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backup-systems" value="yes" /> Yes
              <input type="radio" name="backup-systems" value="no" /> No
            </div>
          </div>

          {/* Authentication Methods */}
          <h2>Authentication Methods:</h2>
          <div className="form-section">
            <label>What authentication methods are used with the electronic door locks (e.g., RFID cards, key codes, biometric scans)?</label>
            <div>
              <input type="text" name="authentication-methods" placeholder="Enter authentication methods" />
            </div>
          </div>

          <div className="form-section">
            <label>Are these authentication methods secure and resistant to unauthorized duplication or bypass?</label>
            <div>
              <input type="radio" name="auth-secure" value="yes" /> Yes
              <input type="radio" name="auth-secure" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?</label>
            <div>
              <input type="radio" name="mfa" value="yes" /> Yes
              <input type="radio" name="mfa" value="no" /> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>How are access rights managed and enforced through the electronic door locks?</label>
            <div>
              <input type="text" name="access-rights-management" placeholder="Describe access rights management" />
            </div>
          </div>

          <div className="form-section">
            <label>Is access restricted to individuals with valid credentials or authorization?</label>
            <div>
              <input type="radio" name="valid-credentials" value="yes" /> Yes
              <input type="radio" name="valid-credentials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for granting, modifying, or revoking access permissions as needed?</label>
            <div>
              <input type="radio" name="access-permissions" value="yes" /> Yes
              <input type="radio" name="access-permissions" value="no" /> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the electronic door locks integrated with other security systems, such as access control software, surveillance cameras, or alarm systems?</label>
            <div>
              <input type="radio" name="integration-security-systems" value="yes" /> Yes
              <input type="radio" name="integration-security-systems" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with these systems to provide real-time monitoring and response to security events?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access events logged and recorded for audit and analysis purposes?</label>
            <div>
              <input type="radio" name="access-events-logging" value="yes" /> Yes
              <input type="radio" name="access-events-logging" value="no" /> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the electronic door locks made from durable materials and designed to withstand tampering or forced entry attempts?</label>
            <div>
              <input type="radio" name="durability" value="yes" /> Yes
              <input type="radio" name="durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there anti-tamper features or sensors to detect and respond to unauthorized manipulation?</label>
            <div>
              <input type="radio" name="anti-tamper" value="yes" /> Yes
              <input type="radio" name="anti-tamper" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are the locks resistant to environmental factors such as moisture, temperature extremes, or physical wear?</label>
            <div>
              <input type="radio" name="environmental-resistance" value="yes" /> Yes
              <input type="radio" name="environmental-resistance" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the electronic door locks?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as battery replacement, software updates, and inspection of locking mechanisms, performed according to schedule?</label>
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
            <label>Have users, such as security personnel, staff, and authorized individuals, received training on how to use the electronic door locks properly?</label>
            <div>
              <input type="radio" name="user-training" value="yes" /> Yes
              <input type="radio" name="user-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper door access procedures and security protocols?</label>
            <div>
              <input type="radio" name="user-instructions" value="yes" /> Yes
              <input type="radio" name="user-instructions" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the electronic door locks?</label>
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

export default DoorLocksPage;
