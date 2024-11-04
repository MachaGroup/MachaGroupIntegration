import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function WeatherproofCamerasPage() {
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
        <h1>Weatherproof Cameras Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Weatherproofing and Durability */}
          <h2>Weatherproofing and Durability:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras designed to withstand outdoor environmental factors such as rain, snow, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weatherproof-design" value="yes" /> Yes
              <input type="radio" name="weatherproof-design" value="no" /> No
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
              <input type="radio" name="certification-testing" value="yes" /> Yes
              <input type="radio" name="certification-testing" value="no" /> No
            </div>
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras securely mounted and installed in outdoor areas?</label>
            <div>
              <input type="radio" name="secure-mounting" value="yes" /> Yes
              <input type="radio" name="secure-mounting" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned at optimal angles to cover the desired outdoor spaces effectively?</label>
            <div>
              <input type="radio" name="optimal-positioning" value="yes" /> Yes
              <input type="radio" name="optimal-positioning" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring adequately protected from weather elements and tampering?</label>
            <div>
              <input type="radio" name="protected-wiring" value="yes" /> Yes
              <input type="radio" name="protected-wiring" value="no" /> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the weatherproof cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="image-quality" value="yes" /> Yes
              <input type="radio" name="image-quality" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions outdoors?</label>
            <div>
              <input type="radio" name="image-adjustments" value="yes" /> Yes
              <input type="radio" name="image-adjustments" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities in outdoor areas?</label>
            <div>
              <input type="radio" name="image-clarity" value="yes" /> Yes
              <input type="radio" name="image-clarity" value="no" /> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integration-surveillance" value="yes" /> Yes
              <input type="radio" name="integration-surveillance" value="no" /> No
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
            <label>Is there real-time monitoring and recording of camera feeds from outdoor areas?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the weatherproof cameras?</label>
            <div>
              <input type="radio" name="remote-control" value="yes" /> Yes
              <input type="radio" name="remote-control" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?</label>
            <div>
              <input type="radio" name="adjustable-camera-settings" value="yes" /> Yes
              <input type="radio" name="adjustable-camera-settings" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?</label>
            <div>
              <input type="radio" name="secure-protocols" value="yes" /> Yes
              <input type="radio" name="secure-protocols" value="no" /> No
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the weatherproof cameras cover the desired outdoor areas, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="comprehensive-coverage" value="yes" /> Yes
              <input type="radio" name="comprehensive-coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical outdoor spaces, such as building perimeters, parking lots, or loading docks?</label>
            <div>
              <input type="radio" name="strategic-positioning" value="yes" /> Yes
              <input type="radio" name="strategic-positioning" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient?</label>
            <div>
              <input type="text" name="blind-spots" placeholder="Describe any blind spots or coverage issues" />
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the weatherproof cameras?</label>
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

export default WeatherproofCamerasPage;
