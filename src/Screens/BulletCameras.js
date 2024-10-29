import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function BulletCamerasPage() {
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
        <h1>Bullet Cameras Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the bullet cameras strategically positioned to overlook entrances and provide comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="strategic-placement" value="yes" /> Yes
              <input type="radio" name="strategic-placement" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all entry points and critical areas, such as doors, gates, or parking lots?</label>
            <div>
              <input type="radio" name="coverage-entry-points" value="yes" /> Yes
              <input type="radio" name="coverage-entry-points" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient?</label>
            <div>
              <input type="text" name="blind-spots" placeholder="Describe any blind spots" />
            </div>
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the bullet cameras securely mounted and installed to withstand outdoor conditions?</label>
            <div>
              <input type="radio" name="secure-mounting" value="yes" /> Yes
              <input type="radio" name="secure-mounting" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned at optimal angles to capture clear and unobstructed views of entrances?</label>
            <div>
              <input type="radio" name="optimal-angles" value="yes" /> Yes
              <input type="radio" name="optimal-angles" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring adequately protected from weather elements and tampering?</label>
            <div>
              <input type="radio" name="protected-wiring" value="yes" /> Yes
              <input type="radio" name="protected-wiring" value="no" /> No
            </div>
          </div>

          {/* Weatherproofing and Durability */}
          <h2>Weatherproofing and Durability:</h2>
          <div className="form-section">
            <label>Are the bullet cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weatherproofing" value="yes" /> Yes
              <input type="radio" name="weatherproofing" value="no" /> No
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
              <input type="radio" name="certification" value="yes" /> Yes
              <input type="radio" name="certification" value="no" /> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the bullet cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
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
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities at entrances?</label>
            <div>
              <input type="radio" name="clear-images" value="yes" /> Yes
              <input type="radio" name="clear-images" value="no" /> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the bullet cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integrated-surveillance" value="yes" /> Yes
              <input type="radio" name="integrated-surveillance" value="no" /> No
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
            <label>Is there real-time monitoring and recording of camera feeds from entrances?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the bullet cameras?</label>
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
              <input type="radio" name="secure-access" value="yes" /> Yes
              <input type="radio" name="secure-access" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the bullet cameras?</label>
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

export default BulletCamerasPage;
