import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PTZCamerasPage() {
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
        <h1>PTZ Cameras (e.g., for flexible monitoring) Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" /> Yes
              <input type="radio" name="operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the cameras provide flexible monitoring capabilities, allowing for pan, tilt, and zoom functionalities?</label>
            <div>
              <input type="radio" name="flexible-monitoring" value="yes" /> Yes
              <input type="radio" name="flexible-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in camera movements or zoom capabilities?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" /> Yes
              <input type="radio" name="malfunction" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of power outages or camera malfunctions?</label>
            <div>
              <input type="radio" name="backup-systems" value="yes" /> Yes
              <input type="radio" name="backup-systems" value="no" /> No
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the PTZ cameras cover the desired areas for monitoring, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="coverage" value="yes" /> Yes
              <input type="radio" name="coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical areas and respond to security events effectively?</label>
            <div>
              <input type="radio" name="strategic-positioning" value="yes" /> Yes
              <input type="radio" name="strategic-positioning" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there preset positions or patrol patterns programmed into the cameras to enhance monitoring efficiency?</label>
            <div>
              <input type="radio" name="preset-positions" value="yes" /> Yes
              <input type="radio" name="preset-positions" value="no" /> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the PTZ cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="image-quality" value="yes" /> Yes
              <input type="radio" name="image-quality" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions and environmental factors?</label>
            <div>
              <input type="radio" name="image-adjustments" value="yes" /> Yes
              <input type="radio" name="image-adjustments" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, even when zoomed in for closer inspection?</label>
            <div>
              <input type="radio" name="zoom-quality" value="yes" /> Yes
              <input type="radio" name="zoom-quality" value="no" /> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integration-surveillance" value="yes" /> Yes
              <input type="radio" name="integration-surveillance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="seamless-communication" value="yes" /> Yes
              <input type="radio" name="seamless-communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds, with the ability to control PTZ functions remotely?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?</label>
            <div>
              <input type="radio" name="durability-weather-resistance" value="yes" /> Yes
              <input type="radio" name="durability-weather-resistance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding outdoor conditions?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protective enclosures or housings to shield the cameras from damage or vandalism?</label>
            <div>
              <input type="radio" name="protective-enclosures" value="yes" /> Yes
              <input type="radio" name="protective-enclosures" value="no" /> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the PTZ cameras?</label>
            <div>
              <input type="radio" name="remote-control" value="yes" /> Yes
              <input type="radio" name="remote-control" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?</label>
            <div>
              <input type="radio" name="remote-adjustments" value="yes" /> Yes
              <input type="radio" name="remote-adjustments" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?</label>
            <div>
              <input type="radio" name="secure-authentication" value="yes" /> Yes
              <input type="radio" name="secure-authentication" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the PTZ cameras?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of PTZ functions, performed according to schedule?</label>
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

export default PTZCamerasPage;
