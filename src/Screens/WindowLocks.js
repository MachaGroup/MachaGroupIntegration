import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function WindowLocksPage() {
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
        <h1>Window Locks Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the window locks operational and functioning properly?</label>
            <div>
              <input type="radio" name="operational-locks" value="yes" /> Yes
              <input type="radio" name="operational-locks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the locks securely fasten windows to prevent unauthorized entry?</label>
            <div>
              <input type="radio" name="secure-fastening" value="yes" /> Yes
              <input type="radio" name="secure-fastening" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, wear, or malfunction in the locking mechanisms?</label>
            <div>
              <input type="text" name="damage-locks" placeholder="Describe any damage or malfunction" />
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of lock failure or tampering?</label>
            <div>
              <input type="radio" name="backup-systems" value="yes" /> Yes
              <input type="radio" name="backup-systems" value="no" /> No
            </div>
          </div>

          {/* Compatibility with Window Types */}
          <h2>Compatibility with Window Types:</h2>
          <div className="form-section">
            <label>Are the window locks suitable for the type of windows installed (e.g., sliding windows, casement windows)?</label>
            <div>
              <input type="radio" name="window-lock-suitability" value="yes" /> Yes
              <input type="radio" name="window-lock-suitability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide a secure fit and effective locking mechanism for each window style?</label>
            <div>
              <input type="radio" name="secure-fit" value="yes" /> Yes
              <input type="radio" name="secure-fit" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have considerations been made for windows of varying sizes and configurations?</label>
            <div>
              <input type="radio" name="window-sizes" value="yes" /> Yes
              <input type="radio" name="window-sizes" value="no" /> No
            </div>
          </div>

          {/* Accessibility and Ease of Use */}
          <h2>Accessibility and Ease of Use:</h2>
          <div className="form-section">
            <label>Are the window locks easily accessible and operable for occupants, particularly in emergency situations?</label>
            <div>
              <input type="radio" name="accessible-locks" value="yes" /> Yes
              <input type="radio" name="accessible-locks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they allow for quick and convenient opening and closing of windows when needed?</label>
            <div>
              <input type="radio" name="convenient-use" value="yes" /> Yes
              <input type="radio" name="convenient-use" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any accessibility features or considerations for individuals with disabilities?</label>
            <div>
              <input type="radio" name="accessibility-features" value="yes" /> Yes
              <input type="radio" name="accessibility-features" value="no" /> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the window locks made from durable materials capable of withstanding physical force or tampering attempts?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security features, such as reinforced bolts or tamper-resistant screws, to enhance resistance to forced entry?</label>
            <div>
              <input type="radio" name="additional-security-features" value="yes" /> Yes
              <input type="radio" name="additional-security-features" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the locks been tested for reliability and resistance to environmental factors such as corrosion or wear?</label>
            <div>
              <input type="radio" name="reliability-testing" value="yes" /> Yes
              <input type="radio" name="reliability-testing" value="no" /> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the window locks integrated with the overall building security system?</label>
            <div>
              <input type="radio" name="integration-security-system" value="yes" /> Yes
              <input type="radio" name="integration-security-system" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger alerts or notifications in the event of tampering or attempted unauthorized entry?</label>
            <div>
              <input type="radio" name="tamper-alerts" value="yes" /> Yes
              <input type="radio" name="tamper-alerts" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there surveillance cameras or other monitoring devices positioned to monitor windows for security breaches?</label>
            <div>
              <input type="radio" name="surveillance-monitoring" value="yes" /> Yes
              <input type="radio" name="surveillance-monitoring" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for window locks?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of locking mechanisms, and replacement of worn-out parts, performed according to schedule?</label>
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

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the window locks comply with relevant regulations, codes, and standards for building security?</label>
            <div>
              <input type="radio" name="compliance" value="yes" /> Yes
              <input type="radio" name="compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for window locks outlined by regulatory authorities or industry associations?</label>
            <div>
              <input type="text" name="regulatory-requirements" placeholder="Enter any regulatory requirements" />
            </div>
          </div>

          <div className="form-section">
            <label>Have the locks undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="certifications" value="yes" /> Yes
              <input type="radio" name="certifications" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default WindowLocksPage;
