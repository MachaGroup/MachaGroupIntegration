import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function GateAlarmsPage() {
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
        <h1>Gate Alarms Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the gate alarms installed on all entry gates, including vehicle and pedestrian gates?</label>
            <div>
              <input type="radio" name="installed-on-all-gates" value="yes" /> Yes
              <input type="radio" name="installed-on-all-gates" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all gate openings and potential access points?</label>
            <div>
              <input type="radio" name="coverage-all-openings" value="yes" /> Yes
              <input type="radio" name="coverage-all-openings" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any gates or entry points without alarm coverage?</label>
            <div>
              <input type="text" name="no-coverage-gates" placeholder="Describe any uncovered gates or points" />
            </div>
          </div>

          {/* Sensor Type and Activation */}
          <h2>Sensor Type and Activation:</h2>
          <div className="form-section">
            <label>What type of sensors are used for gate alarms (e.g., magnetic switches, contact sensors)?</label>
            <div>
              <input type="text" name="sensor-type" placeholder="Enter the type of sensors used" />
            </div>
          </div>

          <div className="form-section">
            <label>Are the sensors activated when the gate is opened, closed, or both?</label>
            <div>
              <input type="radio" name="sensor-activation" value="opened" /> Opened
              <input type="radio" name="sensor-activation" value="closed" /> Closed
              <input type="radio" name="sensor-activation" value="both" /> Both
            </div>
          </div>

          <div className="form-section">
            <label>Is there a delay mechanism in place to allow authorized personnel to disarm the alarm before it triggers?</label>
            <div>
              <input type="radio" name="delay-mechanism" value="yes" /> Yes
              <input type="radio" name="delay-mechanism" value="no" /> No
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the gate alarms respond quickly when triggered by unauthorized access attempts?</label>
            <div>
              <input type="radio" name="quick-response" value="yes" /> Yes
              <input type="radio" name="quick-response" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?</label>
            <div>
              <input type="radio" name="audible-visual-alarm" value="yes" /> Yes
              <input type="radio" name="audible-visual-alarm" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="real-time-response" value="yes" /> Yes
              <input type="radio" name="real-time-response" value="no" /> No
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the gate alarms integrated with the overall perimeter alarm system?</label>
            <div>
              <input type="radio" name="integrated-with-perimeter-system" value="yes" /> Yes
              <input type="radio" name="integrated-with-perimeter-system" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="seamless-communication" value="yes" /> Yes
              <input type="radio" name="seamless-communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between gate alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="coordination-with-devices" value="yes" /> Yes
              <input type="radio" name="coordination-with-devices" value="no" /> No
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the gate alarms?</label>
            <div>
              <input type="radio" name="remote-monitoring" value="yes" /> Yes
              <input type="radio" name="remote-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?</label>
            <div>
              <input type="radio" name="remote-access-acknowledge" value="yes" /> Yes
              <input type="radio" name="remote-access-acknowledge" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to alarm controls?</label>
            <div>
              <input type="radio" name="secure-protocols" value="yes" /> Yes
              <input type="radio" name="secure-protocols" value="no" /> No
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the gate alarms designed to withstand frequent use and potential tampering attempts?</label>
            <div>
              <input type="radio" name="durability" value="yes" /> Yes
              <input type="radio" name="durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding outdoor conditions?</label>
            <div>
              <input type="radio" name="outdoor-durability" value="yes" /> Yes
              <input type="radio" name="outdoor-durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the alarms undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="testing-certification" value="yes" /> Yes
              <input type="radio" name="testing-certification" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the gate alarms?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing alarm functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?</label>
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

export default GateAlarmsPage;
