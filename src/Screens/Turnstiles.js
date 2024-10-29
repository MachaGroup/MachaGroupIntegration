import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function TurnstilesPage() {
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
        <h1>Turnstiles Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* 1.1.1.1.2.1 Functionality and Operation */}
          <h2>1.1.1.1.2.1 Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the turnstiles operational and functioning as intended?</label>
            <div>
              <input type="radio" name="turnstiles-operational" value="yes" /> Yes
              <input type="radio" name="turnstiles-operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the turnstiles rotate smoothly without any mechanical issues?</label>
            <div>
              <input type="radio" name="turnstiles-smooth" value="yes" /> Yes
              <input type="radio" name="turnstiles-smooth" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of wear or damage that could affect the turnstiles' functionality?</label>
            <div>
              <input type="text" name="turnstiles-damage" placeholder="Describe any wear or damage" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backup-systems-turnstiles" value="yes" /> Yes
              <input type="radio" name="backup-systems-turnstiles" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.2.2 Access Control */}
          <h2>1.1.1.1.2.2 Access Control:</h2>
          <div className="form-section">
            <label>How is access to the turnstiles controlled?</label>
            <div>
              <input type="text" name="access-control-turnstiles" placeholder="Enter access control methods" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there authentication mechanisms, such as RFID card readers, barcode scanners, or biometric systems, to restrict entry?</label>
            <div>
              <input type="radio" name="auth-mechanisms-turnstiles" value="yes" /> Yes
              <input type="radio" name="auth-mechanisms-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access control systems integrated with other security measures, such as surveillance cameras or alarm systems?</label>
            <div>
              <input type="radio" name="integrated-systems-turnstiles" value="yes" /> Yes
              <input type="radio" name="integrated-systems-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a log of entries and exits through the turnstiles for monitoring and auditing purposes?</label>
            <div>
              <input type="radio" name="log-entries-turnstiles" value="yes" /> Yes
              <input type="radio" name="log-entries-turnstiles" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.2.3 Safety Features */}
          <h2>1.1.1.1.2.3 Safety Features:</h2>
          <div className="form-section">
            <label>Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?</label>
            <div>
              <input type="radio" name="safety-features-turnstiles" value="yes" /> Yes
              <input type="radio" name="safety-features-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are the turnstiles equipped with anti-tailgating features to prevent unauthorized entry by multiple individuals?</label>
            <div>
              <input type="radio" name="anti-tailgating" value="yes" /> Yes
              <input type="radio" name="anti-tailgating" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there clear instructions or signage to inform users about safety procedures and precautions when using the turnstiles?</label>
            <div>
              <input type="radio" name="safety-signage-turnstiles" value="yes" /> Yes
              <input type="radio" name="safety-signage-turnstiles" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.2.4 Compliance with Regulations */}
          <h2>1.1.1.1.2.4 Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the turnstiles comply with relevant safety and security regulations, codes, and standards?</label>
            <div>
              <input type="radio" name="compliance-regulations-turnstiles" value="yes" /> Yes
              <input type="radio" name="compliance-regulations-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for turnstiles outlined by regulatory authorities or industry associations that need to be met?</label>
            <div>
              <input type="text" name="regulatory-requirements-turnstiles" placeholder="Enter regulatory requirements" />
            </div>
          </div>

          <div className="form-section">
            <label>Have the turnstiles undergone any inspections or certifications to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspections-certifications-turnstiles" value="yes" /> Yes
              <input type="radio" name="inspections-certifications-turnstiles" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.2.5 Maintenance and Upkeep */}
          <h2>1.1.1.1.2.5 Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the turnstiles?</label>
            <div>
              <input type="radio" name="maintenance-schedule-turnstiles" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenance-tasks-turnstiles" value="yes" /> Yes
              <input type="radio" name="maintenance-tasks-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenance-records-turnstiles" value="yes" /> Yes
              <input type="radio" name="maintenance-records-turnstiles" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.2.6 User Training and Awareness */}
          <h2>1.1.1.1.2.6 User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel, staff, and visitors, received training on how to use the turnstiles safely and effectively?</label>
            <div>
              <input type="radio" name="user-training-turnstiles" value="yes" /> Yes
              <input type="radio" name="user-training-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper turnstile usage and emergency procedures?</label>
            <div>
              <input type="radio" name="instructions-guidelines-turnstiles" value="yes" /> Yes
              <input type="radio" name="instructions-guidelines-turnstiles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the turnstiles?</label>
            <div>
              <input type="radio" name="reporting-process-turnstiles" value="yes" /> Yes
              <input type="radio" name="reporting-process-turnstiles" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default TurnstilesPage;
