import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function MotionActivatedLightsPage() {
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
        <h1>1.1.2.2.1. Motion-Activated Lights Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are motion-activated lights strategically placed around the perimeter to provide adequate coverage?</label>
            <div>
              <input type="radio" name="strategic-placement" value="yes" /> Yes
              <input type="radio" name="strategic-placement" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the lights illuminate key areas susceptible to unauthorized access, such as entry points, blind spots, or areas with limited visibility?</label>
            <div>
              <input type="radio" name="key-areas-illumination" value="yes" /> Yes
              <input type="radio" name="key-areas-illumination" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where lighting coverage is insufficient, posing potential security risks?</label>
            <div>
              <input type="text" name="insufficient-coverage" placeholder="Describe any areas with insufficient coverage" />
            </div>
          </div>

          {/* Sensor Sensitivity and Range */}
          <h2>Sensor Sensitivity and Range:</h2>
          <div className="form-section">
            <label>Are the motion sensors configured to detect movement effectively within the designated range?</label>
            <div>
              <input type="radio" name="sensor-configuration" value="yes" /> Yes
              <input type="radio" name="sensor-configuration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they differentiate between legitimate movement (e.g., personnel patrolling the perimeter) and unauthorized intrusions?</label>
            <div>
              <input type="radio" name="movement-differentiation" value="yes" /> Yes
              <input type="radio" name="movement-differentiation" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or calibration settings available to optimize sensor sensitivity and range based on environmental conditions?</label>
            <div>
              <input type="radio" name="sensor-adjustments" value="yes" /> Yes
              <input type="radio" name="sensor-adjustments" value="no" /> No
            </div>
          </div>

          {/* Timing and Duration */}
          <h2>Timing and Duration:</h2>
          <div className="form-section">
            <label>Are the lights programmed to activate promptly upon detecting motion and remain illuminated for a sufficient duration?</label>
            <div>
              <input type="radio" name="light-programming" value="yes" /> Yes
              <input type="radio" name="light-programming" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is the timing and duration of light activation adjusted to accommodate varying lighting conditions throughout the day and night?</label>
            <div>
              <input type="radio" name="timing-adjustments" value="yes" /> Yes
              <input type="radio" name="timing-adjustments" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there controls or settings to customize the timing and duration of light activation based on specific security requirements?</label>
            <div>
              <input type="radio" name="customizable-settings" value="yes" /> Yes
              <input type="radio" name="customizable-settings" value="no" /> No
            </div>
          </div>

          {/* Brightness and Visibility */}
          <h2>Brightness and Visibility:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights sufficiently bright to illuminate the surrounding area effectively?</label>
            <div>
              <input type="radio" name="brightness" value="yes" /> Yes
              <input type="radio" name="brightness" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear visibility without causing glare or shadows that could obscure detection of unauthorized activity?</label>
            <div>
              <input type="radio" name="visibility-without-glare" value="yes" /> Yes
              <input type="radio" name="visibility-without-glare" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent tampering or vandalism of light fixtures to maintain visibility?</label>
            <div>
              <input type="radio" name="tampering-prevention" value="yes" /> Yes
              <input type="radio" name="tampering-prevention" value="no" /> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights integrated with other security systems, such as surveillance cameras or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integration-security-systems" value="yes" /> Yes
              <input type="radio" name="integration-security-systems" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?</label>
            <div>
              <input type="radio" name="trigger-alert" value="yes" /> Yes
              <input type="radio" name="trigger-alert" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between lighting controls and security personnel to respond to motion activations appropriately?</label>
            <div>
              <input type="radio" name="lighting-coordination" value="yes" /> Yes
              <input type="radio" name="lighting-coordination" value="no" /> No
            </div>
          </div>

          {/* Energy Efficiency */}
          <h2>Energy Efficiency:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights energy-efficient, utilizing LED technology or other low-power lighting solutions?</label>
            <div>
              <input type="radio" name="energy-efficiency" value="yes" /> Yes
              <input type="radio" name="energy-efficiency" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there controls or settings to optimize energy consumption based on usage patterns and security requirements?</label>
            <div>
              <input type="radio" name="optimize-energy" value="yes" /> Yes
              <input type="radio" name="optimize-energy" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?</label>
            <div>
              <input type="radio" name="monitor-energy" value="yes" /> Yes
              <input type="radio" name="monitor-energy" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for motion-activated lights?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?</label>
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

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default MotionActivatedLightsPage;
