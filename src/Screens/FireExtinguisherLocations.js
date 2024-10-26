import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FireExtinguisherLocationsFormPage() {
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
        <h1>Fire Extinguisher Locations Assessment</h1>
        </header>

        <main className="form-container">
            <form>
            {/* 2.2.1.1.2 Visibility and Accessibility */}
            <h2>Visibility and Accessibility:</h2>
            <div className="form-section">
                <label>Are fire extinguishers located in easily accessible locations throughout the premises?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
            
            <div className="form-section">
            <label>Are fire extinguishers located in easily accessible locations throughout the premises?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are extinguisher locations clearly marked and visible to occupants, including visitors and employees?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are extinguishers mounted at appropriate heights and locations to facilitate quick retrieval in case of fire emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Distribution and Coverage:</h2>
            <div className="form-section">
            <label>Are fire extinguishers distributed strategically to provide adequate coverage of all areas, including high-risk zones and confined spaces?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are there sufficient numbers of extinguishers available to meet the needs of the building size and occupancy load?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Proper Mounting and Maintenance:</h2>
            <div className="form-section">
            <label>Are fire extinguishers securely mounted on brackets or stands to prevent accidental displacement or damage?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are extinguishers inspected regularly to ensure they are in good working condition and free from damage or tampering?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Is there a maintenance schedule in place for servicing extinguishers, including inspections, testing, and recharging as needed?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Identification and Signage:</h2>
            <div className="form-section">
            <label>Are fire extinguishers clearly labeled with appropriate signage indicating the type of extinguisher and its intended use?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are extinguisher locations identified on building maps or evacuation plans, both in physical form and electronically if applicable?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Is there training provided to occupants on how to locate and use fire extinguishers effectively during emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Training and Education:</h2>
            <div className="form-section">
            <label>Are staff members and occupants trained in the proper use of fire extinguishers as part of their fire safety training?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Do occupants understand the types of fires that can be safely extinguished with portable extinguishers and when to evacuate instead?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are regular fire drills conducted to reinforce training and familiarize occupants with fire extinguisher locations and procedures?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Emergency Response Integration:</h2>
            <div className="form-section">
            <label>Are fire extinguishers integrated into the overall emergency response plan for the premises?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Is there coordination between fire extinguisher use and other response actions such as evacuation, alarm activation, and contacting emergency services?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are designated personnel trained to assess fire situations and determine when it is safe and appropriate to use extinguishers before evacuation?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Record Keeping and Documentation:</h2>
            <div className="form-section">
            <label>Is there a record keeping system in place to document the location, inspection dates, and maintenance history of fire extinguishers?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the system" />
                </div>
            </div>

            <div className="form-section">
            <label>Are records maintained in compliance with relevant regulations and standards, and are they readily accessible for review by authorities or inspectors?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
            <label>Are deficiencies or issues identified during inspections promptly addressed and documented, with corrective actions implemented as needed?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            </form>
        </main>
    </div>
  )
}

export default FireExtinguisherLocationsFormPage;