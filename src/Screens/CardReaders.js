import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function CardReadersPage() {
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
        <h1>1.1.1.2.1. Card Readers Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the card readers operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" /> Yes
              <input type="radio" name="operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the card readers accurately read and authenticate proximity cards or other access credentials?</label>
            <div>
              <input type="radio" name="authentication" value="yes" /> Yes
              <input type="radio" name="authentication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in card reader operations?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" /> Yes
              <input type="radio" name="malfunction" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backup-systems" value="yes" /> Yes
              <input type="radio" name="backup-systems" value="no" /> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>How is access to the secondary entrances controlled using card readers?</label>
            <input type="text" name="access-control-methods" placeholder="Describe the access control methods" />
          </div>

          <div className="form-section">
            <label>Are proximity cards issued to authorized personnel and visitors for access?</label>
            <div>
              <input type="radio" name="issued-cards" value="yes" /> Yes
              <input type="radio" name="issued-cards" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access restricted to individuals with valid proximity cards or authorized credentials?</label>
            <div>
              <input type="radio" name="restricted-access" value="yes" /> Yes
              <input type="radio" name="restricted-access" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process in place to deactivate lost or stolen proximity cards to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="deactivation-process" value="yes" /> Yes
              <input type="radio" name="deactivation-process" value="no" /> No
            </div>
          </div>

          {/* Integration with Access Control Systems */}
          <h2>Integration with Access Control Systems:</h2>
          <div className="form-section">
            <label>Are the card readers integrated with the overall access control system?</label>
            <div>
              <input type="radio" name="integration" value="yes" /> Yes
              <input type="radio" name="integration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with access control software and databases?</label>
            <div>
              <input type="radio" name="communication" value="yes" /> Yes
              <input type="radio" name="communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and logging of access events captured by the card readers?</label>
            <div>
              <input type="radio" name="monitoring" value="yes" /> Yes
              <input type="radio" name="monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights managed centrally and synchronized with the card reader system?</label>
            <div>
              <input type="radio" name="central-management" value="yes" /> Yes
              <input type="radio" name="central-management" value="no" /> No
            </div>
          </div>

          {/* Security Features */}
          <h2>Security Features:</h2>
          <div className="form-section">
            <label>Are the card readers equipped with security features to prevent tampering or unauthorized access attempts?</label>
            <div>
              <input type="radio" name="security-features" value="yes" /> Yes
              <input type="radio" name="security-features" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they support encryption and secure communication protocols to protect access credentials?</label>
            <div>
              <input type="radio" name="encryption" value="yes" /> Yes
              <input type="radio" name="encryption" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there physical security measures in place to prevent unauthorized access to card reader components or wiring?</label>
            <div>
              <input type="radio" name="physical-security" value="yes" /> Yes
              <input type="radio" name="physical-security" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the card readers comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="compliance" value="yes" /> Yes
              <input type="radio" name="compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for card reader systems outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatory-requirements" placeholder="Enter any regulatory requirements" />
          </div>

          <div className="form-section">
            <label>Have the card readers undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="testing-certification" value="yes" /> Yes
              <input type="radio" name="testing-certification" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the card readers?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, calibration, and firmware updates, performed according to schedule?</label>
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
            <label>Have users, such as security personnel, staff, and authorized cardholders, received training on how to use the card readers properly?</label>
            <div>
              <input type="radio" name="user-training" value="yes" /> Yes
              <input type="radio" name="user-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper card usage and access procedures?</label>
            <div>
              <input type="radio" name="instructions" value="yes" /> Yes
              <input type="radio" name="instructions" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the card readers?</label>
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

export default CardReadersPage;
