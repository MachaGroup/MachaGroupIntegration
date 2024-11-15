import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FirstAidResponseFormPage() {
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
            <h1>First Aid Response Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.1.1.3 Availability of First Aid Supplies */}
                <h2>Availability of First Aid Supplies:</h2>
                <div className="form-section">
                    <label>Are first aid supplies readily available throughout the premises, including in designated first aid stations and easily accessible locations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there an adequate stock of essential items such as bandages, gauze, antiseptics, gloves, and basic medical equipment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are first aid kits regularly inspected, replenished, and maintained according to industry standards and regulatory requirements?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Trained Personnel:</h2>
                <div className="form-section">
                    <label>Are staff members trained in basic first aid procedures, including CPR, wound care, splinting, and treatment for common injuries?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do designated personnel possess valid certifications or qualifications in first aid and cardiopulmonary resuscitation (CPR)?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a sufficient number of trained personnel available to provide first aid assistance during all operational hours?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Response Procedures:</h2>
                <div className="form-section">
                    <label>Are there established procedures for responding to medical emergencies and providing initial first aid assistance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the procedures" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Do staff members know how to assess the situation, prioritize actions, and summon additional assistance if needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear communication channels and protocols for alerting emergency medical services and coordinating response efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility of Medical Assistance:</h2>
                <div className="form-section">
                    <label>Is there a designated point of contact or responsible individual for coordinating medical assistance during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="List the contact or responsible individual" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contact details for emergency medical services (e.g., ambulance services) readily available and prominently displayed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide accurate information to emergency medical services regarding the nature and severity of the medical emergency?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are incidents requiring first aid assistance documented accurately and promptly?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a standardized reporting process for recording details of medical emergencies, treatments provided, and outcomes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the reporting process" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reports reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Medical Equipment and Facilities:</h2>
                <div className="form-section">
                    <label>Are there designated areas or facilities equipped for administering first aid, such as treatment rooms or medical stations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is medical equipment, such as automated external defibrillators (AEDs) or oxygen tanks, maintained in working condition and regularly inspected for functionality?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained in the proper use and maintenance of medical equipment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Continuous Training and Improvement:</h2>
                <div className="form-section">
                    <label>Is there ongoing training and education provided to staff members to refresh and enhance their first aid skills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are regular drills or simulations conducted to practice response procedures and assess the effectiveness of first aid protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback and lessons learned from past incidents used to improve first aid response capabilities and procedures?</label>
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

export default FirstAidResponseFormPage;