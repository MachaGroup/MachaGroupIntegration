import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FrontDeskSecurityPage() {
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
        <h1>Front Desk Security Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Visitor Registration and Verification */}
          <h2>Visitor Registration and Verification:</h2>
          <div className="form-section">
            <label>Do front desk security personnel maintain a visitor log or electronic system to record details of incoming visitors?</label>
            <div>
              <input type="radio" name="visitor-log" value="yes" /> Yes
              <input type="radio" name="visitor-log" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors required to provide identification and sign in before gaining access to the premises?</label>
            <div>
              <input type="radio" name="visitor-id-signin" value="yes" /> Yes
              <input type="radio" name="visitor-id-signin" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for verifying visitor credentials and ensuring that they have legitimate reasons for entry?</label>
            <div>
              <input type="radio" name="verify-credentials" value="yes" /> Yes
              <input type="radio" name="verify-credentials" value="no" /> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>Do front desk security personnel enforce access control policies to restrict entry to authorized individuals and visitors?</label>
            <div>
              <input type="radio" name="enforce-access-control" value="yes" /> Yes
              <input type="radio" name="enforce-access-control" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to challenge individuals without proper identification or authorization?</label>
            <div>
              <input type="radio" name="challenge-individuals" value="yes" /> Yes
              <input type="radio" name="challenge-individuals" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors provided with temporary access badges or passes to indicate their authorized status while on the premises?</label>
            <div>
              <input type="radio" name="visitor-badges" value="yes" /> Yes
              <input type="radio" name="visitor-badges" value="no" /> No
            </div>
          </div>

          {/* Screening and Security Checks */}
          <h2>Screening and Security Checks:</h2>
          <div className="form-section">
            <label>Do front desk security personnel conduct screening procedures, such as bag checks or metal detection, for incoming visitors?</label>
            <div>
              <input type="radio" name="screening-procedures" value="yes" /> Yes
              <input type="radio" name="screening-procedures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protocols in place to identify and address prohibited items or potential security threats brought by visitors?</label>
            <div>
              <input type="radio" name="security-threat-protocols" value="yes" /> Yes
              <input type="radio" name="security-threat-protocols" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security checks conducted in a professional and non-intrusive manner to maintain a positive visitor experience?</label>
            <div>
              <input type="radio" name="professional-checks" value="yes" /> Yes
              <input type="radio" name="professional-checks" value="no" /> No
            </div>
          </div>

          {/* Visitor Assistance and Customer Service */}
          <h2>Visitor Assistance and Customer Service:</h2>
          <div className="form-section">
            <label>Are front desk security personnel trained to provide assistance and guidance to visitors, including directions, information, and support?</label>
            <div>
              <input type="radio" name="visitor-assistance" value="yes" /> Yes
              <input type="radio" name="visitor-assistance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they greet visitors in a friendly and professional manner while maintaining security awareness?</label>
            <div>
              <input type="radio" name="professional-greeting" value="yes" /> Yes
              <input type="radio" name="professional-greeting" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel responsive to visitor inquiries and requests for assistance?</label>
            <div>
              <input type="radio" name="visitor-inquiries" value="yes" /> Yes
              <input type="radio" name="visitor-inquiries" value="no" /> No
            </div>
          </div>

          {/* Emergency Response Preparedness */}
          <h2>Emergency Response Preparedness:</h2>
          <div className="form-section">
            <label>Are front desk security personnel trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?</label>
            <div>
              <input type="radio" name="emergency-response-training" value="yes" /> Yes
              <input type="radio" name="emergency-response-training" value="no" /> No
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
            <label>Are security personnel equipped with necessary communication devices or emergency response equipment?</label>
            <div>
              <input type="radio" name="emergency-equipment" value="yes" /> Yes
              <input type="radio" name="emergency-equipment" value="no" /> No
            </div>
          </div>

          {/* Communication and Coordination */}
          <h2>Communication and Coordination:</h2>
          <div className="form-section">
            <label>Is there effective communication between front desk security personnel and other security personnel, as well as with management and staff?</label>
            <div>
              <input type="radio" name="communication-between-personnel" value="yes" /> Yes
              <input type="radio" name="communication-between-personnel" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?</label>
            <div>
              <input type="radio" name="coordination-training" value="yes" /> Yes
              <input type="radio" name="coordination-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a centralized communication system or protocol for relaying information and coordinating responses between front desk security personnel and other security stakeholders?</label>
            <div>
              <input type="radio" name="centralized-communication" value="yes" /> Yes
              <input type="radio" name="centralized-communication" value="no" /> No
            </div>
          </div>

          {/* Documentation and Reporting */}
          <h2>Documentation and Reporting:</h2>
          <div className="form-section">
            <label>Are front desk security personnel required to maintain records of visitor activity, security incidents, or other notable events?</label>
            <div>
              <input type="radio" name="visitor-records" value="yes" /> Yes
              <input type="radio" name="visitor-records" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a standardized reporting process for documenting security incidents, suspicious activities, or visitor-related issues?</label>
            <div>
              <input type="radio" name="reporting-process" value="yes" /> Yes
              <input type="radio" name="reporting-process" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are reports reviewed regularly by security management to identify trends, areas for improvement, or security risks related to visitor access?</label>
            <div>
              <input type="radio" name="report-review" value="yes" /> Yes
              <input type="radio" name="report-review" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FrontDeskSecurityPage;
