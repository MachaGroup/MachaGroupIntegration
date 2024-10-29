import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function VisitorCheckInPage() {
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
        <h1>Visitor Check-in Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Identification Verification */}
          <h2>Identification Verification:</h2>
          <div className="form-section">
            <label>Are visitors required to present valid identification upon check-in?</label>
            <div>
              <input type="radio" name="valid-id" value="yes" /> Yes
              <input type="radio" name="valid-id" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do staff members verify the authenticity of the identification presented by visitors?</label>
            <div>
              <input type="radio" name="verify-authenticity" value="yes" /> Yes
              <input type="radio" name="verify-authenticity" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process in place to ensure that the identification matches the information provided during pre-registration or scheduling?</label>
            <div>
              <input type="radio" name="id-match-process" value="yes" /> Yes
              <input type="radio" name="id-match-process" value="no" /> No
            </div>
          </div>

          {/* Registration Process */}
          <h2>Registration Process:</h2>
          <div className="form-section">
            <label>Is there a standardized process for registering visitors upon check-in?</label>
            <div>
              <input type="radio" name="standard-registration" value="yes" /> Yes
              <input type="radio" name="standard-registration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors required to provide relevant information such as name, affiliation, purpose of visit, and contact details?</label>
            <div>
              <input type="radio" name="provide-info" value="yes" /> Yes
              <input type="radio" name="provide-info" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is visitor information recorded accurately and legibly for future reference and tracking?</label>
            <div>
              <input type="radio" name="record-info" value="yes" /> Yes
              <input type="radio" name="record-info" value="no" /> No
            </div>
          </div>

          {/* Access Authorization */}
          <h2>Access Authorization:</h2>
          <div className="form-section">
            <label>Are visitors granted access to the premises only after successful check-in and verification of identification?</label>
            <div>
              <input type="radio" name="access-granted" value="yes" /> Yes
              <input type="radio" name="access-granted" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access authorization based on predetermined criteria such as scheduled appointments, visitor type, or security clearance levels?</label>
            <div>
              <input type="radio" name="predetermined-criteria" value="yes" /> Yes
              <input type="radio" name="predetermined-criteria" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitor access privileges clearly communicated to security personnel and other relevant staff members?</label>
            <div>
              <input type="radio" name="access-privileges" value="yes" /> Yes
              <input type="radio" name="access-privileges" value="no" /> No
            </div>
          </div>

          {/* Visitor Badges or Passes */}
          <h2>Visitor Badges or Passes:</h2>
          <div className="form-section">
            <label>Are visitors issued with temporary badges or passes upon check-in?</label>
            <div>
              <input type="radio" name="issued-badges" value="yes" /> Yes
              <input type="radio" name="issued-badges" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do badges or passes prominently display relevant information such as visitor name, date of visit, and authorized areas or restrictions?</label>
            <div>
              <input type="radio" name="badge-info" value="yes" /> Yes
              <input type="radio" name="badge-info" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protocols in place for reclaiming badges or passes upon visitor departure to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="reclaim-badges" value="yes" /> Yes
              <input type="radio" name="reclaim-badges" value="no" /> No
            </div>
          </div>

          {/* Confidentiality and Data Protection */}
          <h2>Confidentiality and Data Protection:</h2>
          <div className="form-section">
            <label>Is visitor information handled and stored securely to maintain confidentiality and protect sensitive data?</label>
            <div>
              <input type="radio" name="data-protection" value="yes" /> Yes
              <input type="radio" name="data-protection" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are staff members trained to handle visitor information in compliance with data protection regulations and organizational policies?</label>
            <div>
              <input type="radio" name="staff-training" value="yes" /> Yes
              <input type="radio" name="staff-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for securely disposing of visitor records or data once they are no longer needed?</label>
            <div>
              <input type="radio" name="dispose-records" value="yes" /> Yes
              <input type="radio" name="dispose-records" value="no" /> No
            </div>
          </div>

          {/* Customer Service and Assistance */}
          <h2>Customer Service and Assistance:</h2>
          <div className="form-section">
            <label>Are staff members trained to provide assistance and guidance to visitors during the check-in process?</label>
            <div>
              <input type="radio" name="staff-assistance" value="yes" /> Yes
              <input type="radio" name="staff-assistance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they greet visitors in a friendly and professional manner, making them feel welcome and valued?</label>
            <div>
              <input type="radio" name="visitor-greeting" value="yes" /> Yes
              <input type="radio" name="visitor-greeting" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are staff members responsive to visitor inquiries and requests for assistance, providing accurate information and support as needed?</label>
            <div>
              <input type="radio" name="inquiries-response" value="yes" /> Yes
              <input type="radio" name="inquiries-response" value="no" /> No
            </div>
          </div>

          {/* Emergency Response Preparedness */}
          <h2>Emergency Response Preparedness:</h2>
          <div className="form-section">
            <label>Are staff members trained to respond appropriately to security incidents, medical emergencies, or other crises that may occur during the check-in process?</label>
            <div>
              <input type="radio" name="emergency-response" value="yes" /> Yes
              <input type="radio" name="emergency-response" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?</label>
            <div>
              <input type="radio" name="emergency-procedures" value="yes" /> Yes
              <input type="radio" name="emergency-procedures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a system in place to alert security personnel or initiate emergency response procedures if necessary?</label>
            <div>
              <input type="radio" name="alert-system" value="yes" /> Yes
              <input type="radio" name="alert-system" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default VisitorCheckInPage;
