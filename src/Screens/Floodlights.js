import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FloodlightsPage() {
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
        <h1>Floodlights Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are floodlights strategically placed throughout the parking lots to provide uniform illumination?</label>
            <div>
              <input type="radio" name="strategic-placement" value="yes" /> Yes
              <input type="radio" name="strategic-placement" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the floodlights cover all areas of the parking lots, including entrances, exits, pathways, and blind spots?</label>
            <div>
              <input type="radio" name="coverage-areas" value="yes" /> Yes
              <input type="radio" name="coverage-areas" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where lighting coverage is inadequate, posing potential security risks?</label>
            <div>
              <input type="text" name="inadequate-coverage" placeholder="Describe inadequate areas" />
            </div>
          </div>

          {/* Brightness and Visibility */}
          <h2>Brightness and Visibility:</h2>
          <div className="form-section">
            <label>Are the floodlights sufficiently bright to illuminate the parking lots effectively?</label>
            <div>
              <input type="radio" name="brightness" value="yes" /> Yes
              <input type="radio" name="brightness" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear visibility for pedestrians and vehicles to navigate safely?</label>
            <div>
              <input type="radio" name="clear-visibility" value="yes" /> Yes
              <input type="radio" name="clear-visibility" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent glare or shadows that could affect visibility?</label>
            <div>
              <input type="text" name="glare-shadows" placeholder="Describe glare/shadow issues" />
            </div>
          </div>

          {/* Timers and Controls */}
          <h2>Timers and Controls:</h2>
          <div className="form-section">
            <label>Are floodlights equipped with timers or controls to activate and deactivate them at specific times?</label>
            <div>
              <input type="radio" name="timers" value="yes" /> Yes
              <input type="radio" name="timers" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are lighting schedules adjusted based on usage patterns and security requirements, such as during non-operating hours?</label>
            <div>
              <input type="radio" name="lighting-schedules" value="yes" /> Yes
              <input type="radio" name="lighting-schedules" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there flexibility in controlling individual floodlights or zones to optimize energy usage and security coverage?</label>
            <div>
              <input type="radio" name="control-flexibility" value="yes" /> Yes
              <input type="radio" name="control-flexibility" value="no" /> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are floodlights integrated with other security systems, such as surveillance cameras or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integrated-systems" value="yes" /> Yes
              <input type="radio" name="integrated-systems" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?</label>
            <div>
              <input type="radio" name="trigger-recording" value="yes" /> Yes
              <input type="radio" name="trigger-recording" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between floodlight controls and security personnel to respond to security incidents effectively?</label>
            <div>
              <input type="radio" name="coordination" value="yes" /> Yes
              <input type="radio" name="coordination" value="no" /> No
            </div>
          </div>

          {/* Energy Efficiency */}
          <h2>Energy Efficiency:</h2>
          <div className="form-section">
            <label>Are the floodlights energy-efficient, utilizing LED technology or other low-power lighting solutions?</label>
            <div>
              <input type="radio" name="energy-efficient" value="yes" /> Yes
              <input type="radio" name="energy-efficient" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to optimize energy consumption, such as dimming or motion-sensing capabilities during periods of low activity?</label>
            <div>
              <input type="radio" name="energy-optimization" value="yes" /> Yes
              <input type="radio" name="energy-optimization" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?</label>
            <div>
              <input type="radio" name="monitoring-system" value="yes" /> Yes
              <input type="radio" name="monitoring-system" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for floodlights?</label>
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

          {/* Safety and Security */}
          <h2>Safety and Security:</h2>
          <div className="form-section">
            <label>Are floodlight installations secure from tampering or vandalism?</label>
            <div>
              <input type="radio" name="secure-installations" value="yes" /> Yes
              <input type="radio" name="secure-installations" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are fixtures and mounting structures adequately reinforced to withstand environmental conditions and potential impact?</label>
            <div>
              <input type="radio" name="reinforced-structures" value="yes" /> Yes
              <input type="radio" name="reinforced-structures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent unauthorized access to floodlight controls or wiring?</label>
            <div>
              <input type="radio" name="unauthorized-access" value="yes" /> Yes
              <input type="radio" name="unauthorized-access" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FloodlightsPage;
