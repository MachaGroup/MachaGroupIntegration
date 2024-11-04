import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PerimeterFencingPage() {
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
        <h1>1.1.2.1.1. Perimeter Fencing Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Physical Integrity */}
          <h2>Physical Integrity:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing structurally sound and in good condition?</label>
            <div>
              <input type="radio" name="structural-soundness" value="yes" /> Yes
              <input type="radio" name="structural-soundness" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, corrosion, or deterioration in the fencing material?</label>
            <div>
              <input type="radio" name="fencing-damage" value="yes" /> Yes
              <input type="radio" name="fencing-damage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are fence posts securely anchored, and are there any signs of leaning or instability?</label>
            <div>
              <input type="radio" name="secure-posts" value="yes" /> Yes
              <input type="radio" name="secure-posts" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any gaps or breaches in the fencing that could compromise security?</label>
            <div>
              <input type="radio" name="gaps-breaches" value="yes" /> Yes
              <input type="radio" name="gaps-breaches" value="no" /> No
            </div>
          </div>

          {/* Height and Coverage */}
          <h2>Height and Coverage:</h2>
          <div className="form-section">
            <label>Is the height of the perimeter fencing sufficient to deter unauthorized entry or climbing?</label>
            <div>
              <input type="radio" name="fencing-height" value="yes" /> Yes
              <input type="radio" name="fencing-height" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Does the fencing provide adequate coverage to secure the perimeter of the facility or property?</label>
            <div>
              <input type="radio" name="fencing-coverage" value="yes" /> Yes
              <input type="radio" name="fencing-coverage" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional measures in place to prevent access over or under the fencing, such as barbed wire or concrete barriers?</label>
            <div>
              <input type="radio" name="additional-measures" value="yes" /> Yes
              <input type="radio" name="additional-measures" value="no" /> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>Are access points in the perimeter fencing properly secured with gates or barriers?</label>
            <div>
              <input type="radio" name="secured-access-points" value="yes" /> Yes
              <input type="radio" name="secured-access-points" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are gates equipped with locks, hinges, and latches to control access effectively?</label>
            <div>
              <input type="radio" name="gates-equipment" value="yes" /> Yes
              <input type="radio" name="gates-equipment" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access to the fenced area restricted to authorized personnel only, with proper authentication mechanisms in place?</label>
            <div>
              <input type="radio" name="restricted-access" value="yes" /> Yes
              <input type="radio" name="restricted-access" value="no" /> No
            </div>
          </div>

          {/* Visibility and Surveillance */}
          <h2>Visibility and Surveillance:</h2>
          <div className="form-section">
            <label>Does the perimeter fencing allow for clear visibility of the surrounding area, both from inside and outside the fenced area?</label>
            <div>
              <input type="radio" name="visibility" value="yes" /> Yes
              <input type="radio" name="visibility" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to minimize blind spots or obscured views along the perimeter?</label>
            <div>
              <input type="radio" name="blind-spots" value="yes" /> Yes
              <input type="radio" name="blind-spots" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are surveillance cameras or other monitoring systems positioned strategically to monitor activity along the fencing?</label>
            <div>
              <input type="radio" name="strategic-surveillance" value="yes" /> Yes
              <input type="radio" name="strategic-surveillance" value="no" /> No
            </div>
          </div>

          {/* Durability and Maintenance */}
          <h2>Durability and Maintenance:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing made from durable materials that can withstand environmental factors and wear over time?</label>
            <div>
              <input type="radio" name="durable-materials" value="yes" /> Yes
              <input type="radio" name="durable-materials" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular maintenance and inspection procedures in place to address any issues with the fencing promptly?</label>
            <div>
              <input type="radio" name="maintenance-inspection" value="yes" /> Yes
              <input type="radio" name="maintenance-inspection" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there provisions for repairing or replacing damaged sections of fencing as needed?</label>
            <div>
              <input type="radio" name="repair-provisions" value="yes" /> Yes
              <input type="radio" name="repair-provisions" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the perimeter fencing comply with relevant regulations, codes, and standards for security fencing?</label>
            <div>
              <input type="radio" name="regulatory-compliance" value="yes" /> Yes
              <input type="radio" name="regulatory-compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for perimeter fencing outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatory-requirements" placeholder="Enter any regulatory requirements" />
          </div>

          <div className="form-section">
            <label>Have inspections or assessments been conducted to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspections-compliance" value="yes" /> Yes
              <input type="radio" name="inspections-compliance" value="no" /> No
            </div>
          </div>

          {/* Integration with Security Measures */}
          <h2>Integration with Security Measures:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing integrated with other security measures, such as surveillance cameras, lighting, or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integrated-security-measures" value="yes" /> Yes
              <input type="radio" name="integrated-security-measures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do these security measures complement the effectiveness of the fencing in deterring and detecting security threats?</label>
            <div>
              <input type="radio" name="security-effectiveness" value="yes" /> Yes
              <input type="radio" name="security-effectiveness" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between security personnel and monitoring systems to respond to perimeter breaches effectively?</label>
            <div>
              <input type="radio" name="coordination-response" value="yes" /> Yes
              <input type="radio" name="coordination-response" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PerimeterFencingPage;
