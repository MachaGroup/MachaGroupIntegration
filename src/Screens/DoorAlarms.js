import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DoorAlarmsPage() {
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
        <h1>Door Alarms Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the door alarms installed on all entry points, including doors leading to restricted areas?</label>
            <div>
              <input type="radio" name="entry-point-coverage" value="yes" /> Yes
              <input type="radio" name="entry-point-coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all exterior doors, internal doors, and other access points?</label>
            <div>
              <input type="radio" name="door-coverage" value="yes" /> Yes
              <input type="radio" name="door-coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any doors or entry points without alarm coverage?</label>
            <div>
              <input type="text" name="uncovered-points" placeholder="Describe any uncovered doors or points" />
            </div>
          </div>

          {/* Sensor Type and Activation */}
          <h2>Sensor Type and Activation:</h2>
          <div className="form-section">
            <label>What type of sensors are used for door alarms (e.g., magnetic reed switches, contact sensors)?</label>
            <div>
              <input type="text" name="sensor-type" placeholder="Enter sensor type" />
            </div>
          </div>

          <div className="form-section">
            <label>Are the sensors activated when the door is opened, closed, or both?</label>
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
            <label>Do the door alarms respond quickly when triggered by unauthorized entry attempts?</label>
            <div>
              <input type="radio" name="response-time" value="yes" /> Yes
              <input type="radio" name="response-time" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?</label>
            <div>
              <input type="radio" name="alarm-indication" value="yes" /> Yes
              <input type="radio" name="alarm-indication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="alarm-transmission" value="yes" /> Yes
              <input type="radio" name="alarm-transmission" value="no" /> No
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the door alarms integrated with the overall intrusion alarm system?</label>
            <div>
              <input type="radio" name="system-integration" value="yes" /> Yes
              <input type="radio" name="system-integration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="alarm-communication" value="yes" /> Yes
              <input type="radio" name="alarm-communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between door alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="alarm-coordination" value="yes" /> Yes
              <input type="radio" name="alarm-coordination" value="no" /> No
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the door alarms?</label>
            <div>
              <input type="radio" name="remote-monitoring" value="yes" /> Yes
              <input type="radio" name="remote-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?</label>
            <div>
              <input type="radio" name="remote-acknowledge" value="yes" /> Yes
              <input type="radio" name="remote-acknowledge" value="no" /> No
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
            <label>Are the door alarms designed to withstand frequent use and potential tampering attempts?</label>
            <div>
              <input type="radio" name="tamper-proof" value="yes" /> Yes
              <input type="radio" name="tamper-proof" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding indoor and outdoor conditions?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the alarms undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="alarm-testing" value="yes" /> Yes
              <input type="radio" name="alarm-testing" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the door alarms?</label>
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

export default DoorAlarmsPage;
