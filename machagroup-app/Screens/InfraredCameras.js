import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function InfraredCamerasPage() {
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
        <h1>Infrared Cameras Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Low-Light Performance */}
          <h2>Low-Light Performance:</h2>
          <div className="form-section">
            <label>Do the infrared cameras effectively capture images in low-light or nighttime conditions?</label>
            <div>
              <input type="radio" name="low-light-performance" value="yes" /> Yes
              <input type="radio" name="low-light-performance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they equipped with infrared LEDs or other illumination technology to enhance visibility in darkness?</label>
            <div>
              <input type="radio" name="infrared-LEDs" value="yes" /> Yes
              <input type="radio" name="infrared-LEDs" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize camera performance in varying levels of low-light conditions?</label>
            <div>
              <input type="radio" name="low-light-adjustments" value="yes" /> Yes
              <input type="radio" name="low-light-adjustments" value="no" /> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the infrared cameras capture high-quality images with sufficient resolution for identification and analysis, even in low-light environments?</label>
            <div>
              <input type="radio" name="image-quality" value="yes" /> Yes
              <input type="radio" name="image-quality" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to enhance image clarity and detail in low-light conditions?</label>
            <div>
              <input type="radio" name="image-clarity" value="yes" /> Yes
              <input type="radio" name="image-clarity" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities in low-light environments?</label>
            <div>
              <input type="radio" name="clear-images" value="yes" /> Yes
              <input type="radio" name="clear-images" value="no" /> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the infrared cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="system-integration" value="yes" /> Yes
              <input type="radio" name="system-integration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="software-communication" value="yes" /> Yes
              <input type="radio" name="software-communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from areas with low-light conditions?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the infrared cameras cover the desired areas with low-light conditions, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="coverage-areas" value="yes" /> Yes
              <input type="radio" name="coverage-areas" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical areas, such as dark corners, alleys, or building perimeters, effectively?</label>
            <div>
              <input type="radio" name="strategic-positioning" value="yes" /> Yes
              <input type="radio" name="strategic-positioning" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient in low-light environments?</label>
            <div>
              <input type="radio" name="blind-spots" value="yes" /> Yes
              <input type="radio" name="blind-spots" value="no" /> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the infrared cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weather-resistance" value="yes" /> Yes
              <input type="radio" name="weather-resistance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding harsh outdoor conditions?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the cameras undergone testing or certification to verify weatherproofing and durability?</label>
            <div>
              <input type="radio" name="weatherproofing-certification" value="yes" /> Yes
              <input type="radio" name="weatherproofing-certification" value="no" /> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the infrared cameras?</label>
            <div>
              <input type="radio" name="remote-access" value="yes" /> Yes
              <input type="radio" name="remote-access" value="no" /> No
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
              <input type="radio" name="secure-protocols" value="yes" /> Yes
              <input type="radio" name="secure-protocols" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the infrared cameras?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?</label>
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

export default InfraredCamerasPage;
