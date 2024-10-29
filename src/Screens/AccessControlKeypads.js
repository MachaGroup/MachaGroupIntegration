import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AccessControlKeypadsPage() {
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
        <h1>Access Control Keypads Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the access control keypads operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" /> Yes
              <input type="radio" name="operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the keypads reliably authenticate users and grant access to restricted areas?</label>
            <div>
              <input type="radio" name="reliably-authenticate" value="yes" /> Yes
              <input type="radio" name="reliably-authenticate" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in the keypad operation?</label>
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

          {/* Security of Access Codes */}
          <h2>Security of Access Codes:</h2>
          <div className="form-section">
            <label>Are access codes used with the keypads sufficiently secure and resistant to unauthorized access or guessing?</label>
            <div>
              <input type="radio" name="secure-codes" value="yes" /> Yes
              <input type="radio" name="secure-codes" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are users instructed not to share their access codes and to keep them confidential?</label>
            <div>
              <input type="radio" name="instructions" value="yes" /> Yes
              <input type="radio" name="instructions" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for periodically changing access codes to enhance security?</label>
            <div>
              <input type="radio" name="change-codes" value="yes" /> Yes
              <input type="radio" name="change-codes" value="no" /> No
            </div>
          </div>

          {/* Integration with Access Control Systems */}
          <h2>Integration with Access Control Systems:</h2>
          <div className="form-section">
            <label>Are the access control keypads integrated with the overall access control system?</label>
            <div>
              <input type="radio" name="integrated" value="yes" /> Yes
              <input type="radio" name="integrated" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with access control software and databases?</label>
            <div>
              <input type="radio" name="communicate-seamlessly" value="yes" /> Yes
              <input type="radio" name="communicate-seamlessly" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and logging of access events captured by the keypads?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights managed centrally and synchronized with the keypad system?</label>
            <div>
              <input type="radio" name="access-rights-managed" value="yes" /> Yes
              <input type="radio" name="access-rights-managed" value="no" /> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the access control keypads made from durable materials capable of withstanding physical force or tampering attempts?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security features, such as tamper alarms or anti-tamper enclosures, to deter unauthorized access or vandalism?</label>
            <div>
              <input type="radio" name="tamper-alarms" value="yes" /> Yes
              <input type="radio" name="tamper-alarms" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the keypads been tested for reliability and resistance to environmental factors such as moisture, temperature extremes, or physical wear?</label>
            <div>
              <input type="radio" name="tested-reliability" value="yes" /> Yes
              <input type="radio" name="tested-reliability" value="no" /> No
            </div>
          </div>

          {/* Accessibility and Ease of Use */}
          <h2>Accessibility and Ease of Use:</h2>
          <div className="form-section">
            <label>Are the access control keypads easily accessible and operable for authorized users?</label>
            <div>
              <input type="radio" name="accessible" value="yes" /> Yes
              <input type="radio" name="accessible" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear instructions for entering access codes and accessing restricted areas?</label>
            <div>
              <input type="radio" name="clear-instructions" value="yes" /> Yes
              <input type="radio" name="clear-instructions" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any accessibility features or considerations for individuals with disabilities?</label>
            <div>
              <input type="radio" name="disability-accessibility" value="yes" /> Yes
              <input type="radio" name="disability-accessibility" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the access control keypads?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of keypads and wiring, and replacement of worn-out components, performed according to schedule?</label>
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
            <label>Have users, such as security personnel and authorized individuals, received training on how to use the access control keypads properly?</label>
            <div>
              <input type="radio" name="user-training" value="yes" /> Yes
              <input type="radio" name="user-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper access code usage and security protocols?</label>
            <div>
              <input type="radio" name="instructions-available" value="yes" /> Yes
              <input type="radio" name="instructions-available" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the access control keypads?</label>
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

export default AccessControlKeypadsPage;
