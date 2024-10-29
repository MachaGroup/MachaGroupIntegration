import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function VehicleBarriersPage() {
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
        <h1>1.1.2.1.2. Vehicle Barriers Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the vehicle barriers operational and functioning as intended?</label>
            <div>
              <input type="radio" name="barriers-operational" value="yes" /> Yes
              <input type="radio" name="barriers-operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the barriers effectively block vehicle access to restricted areas?</label>
            <div>
              <input type="radio" name="barriers-block-access" value="yes" /> Yes
              <input type="radio" name="barriers-block-access" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, wear, or malfunction in the barrier mechanisms?</label>
            <div>
              <input type="text" name="barriers-damage" placeholder="Describe any damage or wear" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or mechanical failures?</label>
            <div>
              <input type="radio" name="barriers-backup" value="yes" /> Yes
              <input type="radio" name="barriers-backup" value="no" /> No
            </div>
          </div>

          {/* Design and Construction */}
          <h2>Design and Construction:</h2>
          <div className="form-section">
            <label>Are the vehicle barriers designed and constructed to withstand vehicle impact?</label>
            <div>
              <input type="radio" name="barriers-withstand-impact" value="yes" /> Yes
              <input type="radio" name="barriers-withstand-impact" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they meet relevant crash-rated standards or certifications for vehicle mitigation?</label>
            <div>
              <input type="radio" name="barriers-crash-rated" value="yes" /> Yes
              <input type="radio" name="barriers-crash-rated" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any design features to minimize the risk of vehicle bypass or circumvention?</label>
            <div>
              <input type="radio" name="barriers-design-features" value="yes" /> Yes
              <input type="radio" name="barriers-design-features" value="no" /> No
            </div>
          </div>

          {/* Integration with Access Control */}
          <h2>Integration with Access Control:</h2>
          <div className="form-section">
            <label>How are the vehicle barriers integrated with access control systems?</label>
            <div>
              <input type="text" name="barriers-integration" placeholder="Describe access control integration" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there mechanisms to activate the barriers remotely or automatically based on access permissions?</label>
            <div>
              <input type="radio" name="barriers-remote-activation" value="yes" /> Yes
              <input type="radio" name="barriers-remote-activation" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access to the barrier controls restricted to authorized personnel only?</label>
            <div>
              <input type="radio" name="barriers-restricted-access" value="yes" /> Yes
              <input type="radio" name="barriers-restricted-access" value="no" /> No
            </div>
          </div>

          {/* Safety Measures */}
          <h2>Safety Measures:</h2>
          <div className="form-section">
            <label>Are there safety features in place to prevent accidents or injuries caused by the barriers?</label>
            <div>
              <input type="radio" name="barriers-safety" value="yes" /> Yes
              <input type="radio" name="barriers-safety" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are barriers equipped with warning lights, sirens, or other visual and audible signals to alert approaching vehicles?</label>
            <div>
              <input type="radio" name="barriers-warning-signals" value="yes" /> Yes
              <input type="radio" name="barriers-warning-signals" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there physical barriers or signage to prevent pedestrians from approaching the barrier zone?</label>
            <div>
              <input type="radio" name="barriers-physical-signage" value="yes" /> Yes
              <input type="radio" name="barriers-physical-signage" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the vehicle barriers?</label>
            <div>
              <input type="radio" name="barriers-maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="barriers-maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of mechanisms, and testing of safety features, performed according to schedule?</label>
            <div>
              <input type="radio" name="barriers-maintenance-tasks" value="yes" /> Yes
              <input type="radio" name="barriers-maintenance-tasks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="barriers-maintenance-records" value="yes" /> Yes
              <input type="radio" name="barriers-maintenance-records" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the vehicle barriers comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="barriers-compliance" value="yes" /> Yes
              <input type="radio" name="barriers-compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for vehicle barriers outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="barriers-regulatory-requirements" placeholder="Enter any regulatory requirements" />
          </div>

          <div className="form-section">
            <label>Have the barriers undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="barriers-testing" value="yes" /> Yes
              <input type="radio" name="barriers-testing" value="no" /> No
            </div>
          </div>

          {/* Emergency Procedures */}
          <h2>Emergency Procedures:</h2>
          <div className="form-section">
            <label>Is there a contingency plan in place for emergency situations, such as vehicle attacks or security breaches?</label>
            <div>
              <input type="radio" name="barriers-emergency-plan" value="yes" /> Yes
              <input type="radio" name="barriers-emergency-plan" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel trained on emergency procedures for activating and deactivating the barriers?</label>
            <div>
              <input type="radio" name="barriers-emergency-training" value="yes" /> Yes
              <input type="radio" name="barriers-emergency-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination with law enforcement or emergency responders for rapid response to security incidents involving the barriers?</label>
            <div>
              <input type="radio" name="barriers-emergency-response" value="yes" /> Yes
              <input type="radio" name="barriers-emergency-response" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default VehicleBarriersPage;
