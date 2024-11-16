import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function TornadoShelterLocationsFormPage() {
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
            <h1>Tornado Shelter Locations Assessment</h1>
      </header>

        <main className="form-container">
            <form>
                {/* 2.2.1.3.2 Tornado Shelter Locations */}
                <h2>Identification of Shelter Areas:</h2>
                <div className="form-section">
                    <label>Have designated tornado shelter areas been identified throughout the facility?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas located in structurally sound spaces that provide protection from flying debris and structural collapse?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas easily accessible to all occupants, including individuals with disabilities or mobility limitations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Signage and Markings:</h2>
                <div className="form-section">
                    <label>Are tornado shelter areas clearly marked with signage or visual indicators to guide occupants during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do signs include directions to shelter areas and instructions for seeking refuge during tornado warnings?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter locations identified on building maps and evacuation plans distributed to occupants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Capacity and Space Requirements:</h2>
                <div className="form-section">
                    <label>Have shelter areas been assessed to ensure they can accommodate the facility's maximum occupancy load?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there sufficient space within shelter areas to provide comfortable seating or standing room for occupants during extended sheltering periods?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have measures been taken to minimize overcrowding and facilitate orderly entry into shelter areas?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Structural Integrity and Safety Features:</h2>
                <div className="form-section">
                    <label>Have shelter areas been evaluated for structural integrity and resistance to tornado-force winds?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas located in interior spaces or reinforced areas of the building to minimize exposure to external hazards?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there additional safety features in place, such as reinforced walls, sturdy furniture, or protective barriers, to enhance occupant safety?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>Are shelter areas accessible to individuals with disabilities, including those who use mobility devices or require assistance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have accommodations been made to ensure equal access to shelter areas for all occupants, regardless of physical or cognitive abilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the accommodations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated personnel or procedures in place to assist individuals with disabilities during tornado evacuations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <h2>Communication and Notification:</h2>
                <div className="form-section">
                    <label>Is there a protocol for notifying occupants of tornado warnings and directing them to seek shelter?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocol" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems, such as public address announcements or emergency notifications, used to alert occupants to tornado threats and provide instructions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the communication systems" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter locations included in communication materials and drills to familiarize occupants with sheltering procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Regular Inspections and Maintenance:</h2>
                <div className="form-section">
                    <label>Are shelter areas inspected regularly to ensure they remain in good condition and free from obstructions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is maintenance conducted to address any issues or damage that may compromise the safety and effectiveness of shelter areas?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas tested periodically during drills to verify their suitability and readiness for use during tornado emergencies?</label>
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

export default TornadoShelterLocationsFormPage;