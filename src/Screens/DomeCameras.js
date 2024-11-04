import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DomeCamerasPage() {
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
        <h1>Dome Cameras Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the dome cameras strategically placed in hallways to provide comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="strategic-placement" value="yes" /> Yes
              <input type="radio" name="strategic-placement" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all critical areas and potential blind spots within the hallways?</label>
            <div>
              <input type="radio" name="coverage" value="yes" /> Yes
              <input type="radio" name="coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where camera coverage is insufficient, posing potential security risks?</label>
            <input type="text" name="insufficient-coverage" placeholder="Describe areas with insufficient coverage" />
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the dome cameras securely mounted and installed to prevent tampering or vandalism?</label>
            <div>
              <input type="radio" name="secure-mounting" value="yes" /> Yes
              <input type="radio" name="secure-mounting" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protective enclosures or housings to shield the cameras from damage?</label>
            <div>
              <input type="radio" name="protective-housing" value="yes" /> Yes
              <input type="radio" name="protective-housing" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring concealed to maintain a neat and unobtrusive appearance?</label>
            <div>
              <input type="radio" name="concealed-wiring" value="yes" /> Yes
              <input type="radio" name="concealed-wiring" value="no" /> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the dome cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="image-quality" value="yes" /> Yes
              <input type="radio" name="image-quality" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions in the hallways?</label>
            <input type="text" name="image-settings" placeholder="Describe available settings" />
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities?</label>
            <div>
              <input type="radio" name="image-clarity" value="yes" /> Yes
              <input type="radio" name="image-clarity" value="no" /> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the dome cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="system-integration" value="yes" /> Yes
              <input type="radio" name="system-integration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="communication-seamless" value="yes" /> Yes
              <input type="radio" name="communication-seamless" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from the hallways?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the dome cameras?</label>
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
              <input type="radio" name="encryption-protocols" value="yes" /> Yes
              <input type="radio" name="encryption-protocols" value="no" /> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the dome cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?</label>
            <div>
              <input type="radio" name="durability" value="yes" /> Yes
              <input type="radio" name="durability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding indoor conditions?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to protect the cameras from accidental damage or tampering?</label>
            <div>
              <input type="radio" name="damage-protection" value="yes" /> Yes
              <input type="radio" name="damage-protection" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the dome cameras?</label>
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

export default DomeCamerasPage;
