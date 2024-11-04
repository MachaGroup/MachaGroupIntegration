import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function MotionSensorsPage() {
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
        <h1>Motion Sensors Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the motion sensors strategically placed to detect unauthorized entry points?</label>
            <div>
              <input type="radio" name="strategic-placement" value="yes" /> Yes
              <input type="radio" name="strategic-placement" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all potential entry points, such as doors, windows, and other vulnerable areas?</label>
            <div>
              <input type="radio" name="coverage" value="yes" /> Yes
              <input type="radio" name="coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where sensor coverage is insufficient?</label>
            <div>
              <input type="text" name="blind-spots" placeholder="Describe any blind spots" />
            </div>
          </div>

          {/* Detection Sensitivity */}
          <h2>Detection Sensitivity:</h2>
          <div className="form-section">
            <label>Are the motion sensors set to an appropriate sensitivity level to detect unauthorized movement effectively?</label>
            <div>
              <input type="radio" name="sensitivity-level" value="yes" /> Yes
              <input type="radio" name="sensitivity-level" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have adjustments been made to minimize false alarms caused by environmental factors such as pets, wildlife, or moving objects?</label>
            <div>
              <input type="text" name="false-alarms" placeholder="Describe any adjustments made" />
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the motion sensors respond quickly to detected motion and trigger alarms promptly?</label>
            <div>
              <input type="radio" name="response-time" value="yes" /> Yes
              <input type="radio" name="response-time" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a mechanism in place to differentiate between normal activity and suspicious movements to minimize false alarms?</label>
            <div>
              <input type="radio" name="differentiate-mechanism" value="yes" /> Yes
              <input type="radio" name="differentiate-mechanism" value="no" /> No
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
            <label>Are the motion sensors integrated with the overall intrusion alarm system?</label>
            <div>
              <input type="radio" name="system-integration" value="yes" /> Yes
              <input type="radio" name="system-integration" value="no" /> No
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
            <label>Is there coordination between motion sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="coordination-alarm-devices" value="yes" /> Yes
              <input type="radio" name="coordination-alarm-devices" value="no" /> No
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the motion sensors?</label>
            <div>
              <input type="radio" name="remote-access" value="yes" /> Yes
              <input type="radio" name="remote-access" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?</label>
            <div>
              <input type="radio" name="remote-adjustments" value="yes" /> Yes
              <input type="radio" name="remote-adjustments" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?</label>
            <div>
              <input type="radio" name="secure-authentication" value="yes" /> Yes
              <input type="radio" name="secure-authentication" value="no" /> No
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the motion sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?</label>
            <div>
              <input type="radio" name="environment-durability" value="yes" /> Yes
              <input type="radio" name="environment-durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding outdoor conditions if installed in exterior locations?</label>
            <div>
              <input type="radio" name="material-durability" value="yes" /> Yes
              <input type="radio" name="material-durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the sensors undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="sensor-certification" value="yes" /> Yes
              <input type="radio" name="sensor-certification" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the motion sensors?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor lenses, performed according to schedule?</label>
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

export default MotionSensorsPage;
