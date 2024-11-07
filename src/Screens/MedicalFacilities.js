import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function MedicalFacilitiesFormPage() {
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
            <h1>Medical Facilities Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.2.2.2 Medical Facilities */}
                <h2>Proximity and Accessibility:</h2>
                <div className="form-section">
                    <label>How are nearby hospitals or medical facilities identified and designated as essential resources for providing medical care, treatment, and support services during emergencies or incidents requiring advanced medical intervention?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're identified" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are considered when assessing the proximity, accessibility, and capabilities of medical facilities to respond effectively to various types of emergencies, injuries, or medical emergencies within the community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <h2>Collaborative Emergency Response:</h2>
                <div className="form-section">
                    <label>How do schools collaborate with local hospitals, healthcare providers, and emergency medical services (EMS) to establish coordinated response protocols, communication channels, and mutual aid agreements for managing medical emergencies on school grounds or in the surrounding area?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are joint training exercises, drills, or simulations conducted regularly to test the interoperability, coordination, and effectiveness of medical response teams, equipment, and procedures during simulated emergencies or mass casualty incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Resource Availability and Capacity:</h2>
                <div className="form-section">
                    <label>What resources, equipment, and specialized medical capabilities are available at nearby hospitals or medical facilities to support emergency medical care, trauma management, and patient transport for individuals affected by emergencies or disasters?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/equipment/capabilities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contingency plans developed to address potential challenges or surges in demand for medical services, such as during large-scale incidents, pandemics, or public health emergencies, and to ensure continuity of care for patients requiring ongoing treatment or specialized interventions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication and Information Sharing:</h2>
                <div className="form-section">
                    <label>How is communication established and maintained between schools, emergency responders, and medical facilities to facilitate the timely exchange of critical information, patient status updates, and medical resource requests during emergencies or incidents requiring medical intervention?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's established/maintained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols in place for notifying medical facilities of incoming patients, sharing situational awareness, and coordinating medical transport logistics to ensure seamless transitions of care and continuity of treatment for individuals requiring hospitalization or advanced medical care?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Community Engagement and Education:</h2>
                <div className="form-section">
                    <label>How are community members, including students, staff, families, and local residents, educated about the availability, location, and capabilities of nearby hospitals or medical facilities to address medical needs and emergencies within the community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are outreach efforts conducted to raise awareness about the importance of timely access to medical care, the role of medical facilities in emergency response, and strategies for seeking medical assistance during emergencies or health-related crises?</label>
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

export default MedicalFacilitiesFormPage;