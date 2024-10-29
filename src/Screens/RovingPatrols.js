import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RovingPatrolsPage() {
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
        <h1>Roving Patrols Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Patrol Routes and Coverage */}
          <h2>Patrol Routes and Coverage:</h2>
          <div className="form-section">
            <label>Are roving patrols conducted regularly throughout the premises, covering all critical areas and potential security vulnerabilities?</label>
            <div>
              <input type="radio" name="regular-patrols" value="yes" /> Yes
              <input type="radio" name="regular-patrols" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol routes well-defined, ensuring comprehensive coverage of indoor and outdoor areas?</label>
            <div>
              <input type="radio" name="well-defined-routes" value="yes" /> Yes
              <input type="radio" name="well-defined-routes" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas or zones that require special attention or increased patrol frequency?</label>
            <input type="text" name="special-attention-areas" placeholder="Describe any areas or zones" />
          </div>

          {/* Frequency and Timing */}
          <h2>Frequency and Timing:</h2>
          <div className="form-section">
            <label>How often are roving patrols conducted, and at what intervals?</label>
            <input type="text" name="patrol-frequency" placeholder="Enter patrol frequency and intervals" />
          </div>

          <div className="form-section">
            <label>Are patrols conducted at random intervals to deter predictability and enhance security effectiveness?</label>
            <div>
              <input type="radio" name="random-intervals" value="yes" /> Yes
              <input type="radio" name="random-intervals" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional patrols scheduled during high-risk periods or events?</label>
            <div>
              <input type="radio" name="additional-patrols" value="yes" /> Yes
              <input type="radio" name="additional-patrols" value="no" /> No
            </div>
          </div>

          {/* Observation and Vigilance */}
          <h2>Observation and Vigilance:</h2>
          <div className="form-section">
            <label>Do roving patrol officers actively monitor the premises for signs of unauthorized access, suspicious behavior, or security breaches?</label>
            <div>
              <input type="radio" name="active-monitoring" value="yes" /> Yes
              <input type="radio" name="active-monitoring" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to recognize and respond to potential threats, including unauthorized individuals or unusual activities?</label>
            <div>
              <input type="radio" name="threat-response" value="yes" /> Yes
              <input type="radio" name="threat-response" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do patrol officers conduct thorough inspections of doors, windows, gates, and other access points during patrols?</label>
            <div>
              <input type="radio" name="thorough-inspections" value="yes" /> Yes
              <input type="radio" name="thorough-inspections" value="no" /> No
            </div>
          </div>

          {/* Response to Incidents */}
          <h2>Response to Incidents:</h2>
          <div className="form-section">
            <label>Are roving patrol officers equipped to respond promptly to security incidents, alarms, or emergencies encountered during patrols?</label>
            <div>
              <input type="radio" name="incident-response" value="yes" /> Yes
              <input type="radio" name="incident-response" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know how to initiate appropriate emergency response procedures and contact relevant authorities or response teams?</label>
            <div>
              <input type="radio" name="emergency-procedures" value="yes" /> Yes
              <input type="radio" name="emergency-procedures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a system in place to coordinate with stationed guards or other security personnel in case of incidents requiring additional support?</label>
            <div>
              <input type="radio" name="coordination-with-guards" value="yes" /> Yes
              <input type="radio" name="coordination-with-guards" value="no" /> No
            </div>
          </div>

          {/* Documentation and Reporting */}
          <h2>Documentation and Reporting:</h2>
          <div className="form-section">
            <label>Are patrol officers required to maintain detailed records of patrol activities, including patrol routes, observations, and incidents encountered?</label>
            <div>
              <input type="radio" name="detailed-records" value="yes" /> Yes
              <input type="radio" name="detailed-records" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a standardized reporting process for documenting security incidents, suspicious activities, or maintenance issues identified during patrols?</label>
            <div>
              <input type="radio" name="reporting-process" value="yes" /> Yes
              <input type="radio" name="reporting-process" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol reports reviewed regularly by security management to identify trends, areas for improvement, or security risks?</label>
            <div>
              <input type="radio" name="report-reviews" value="yes" /> Yes
              <input type="radio" name="report-reviews" value="no" /> No
            </div>
          </div>

          {/* Communication and Coordination */}
          <h2>Communication and Coordination:</h2>
          <div className="form-section">
            <label>Is there effective communication between roving patrol officers and stationed guards, as well as with management and staff?</label>
            <div>
              <input type="radio" name="effective-communication" value="yes" /> Yes
              <input type="radio" name="effective-communication" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol officers equipped with communication devices to report incidents, request assistance, or communicate with response teams?</label>
            <div>
              <input type="radio" name="communication-devices" value="yes" /> Yes
              <input type="radio" name="communication-devices" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a centralized communication system or protocol for relaying information and coordinating responses between patrol officers and other security personnel?</label>
            <div>
              <input type="radio" name="centralized-communication" value="yes" /> Yes
              <input type="radio" name="centralized-communication" value="no" /> No
            </div>
          </div>

          {/* Training and Preparedness */}
          <h2>Training and Preparedness:</h2>
          <div className="form-section">
            <label>Are roving patrol officers adequately trained in security procedures, emergency response protocols, and effective patrol techniques?</label>
            <div>
              <input type="radio" name="adequate-training" value="yes" /> Yes
              <input type="radio" name="adequate-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they receive ongoing training to enhance their skills, knowledge, and awareness of security threats and emerging risks?</label>
            <div>
              <input type="radio" name="ongoing-training" value="yes" /> Yes
              <input type="radio" name="ongoing-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol officers prepared to handle various situations professionally and effectively, including confrontations, medical emergencies, or crisis situations?</label>
            <div>
              <input type="radio" name="situation-handling" value="yes" /> Yes
              <input type="radio" name="situation-handling" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default RovingPatrolsPage;
