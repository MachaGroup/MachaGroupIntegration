import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function HealthcareProviderEngagementFormPage() {
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
            <h1>Healthcare Provider Engagement Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.2.1.3 Healthcare Provider Engagement */}
                <h2>Collaborative Initiatives and Objectives:</h2>
                <div className="form-section">
                    <label>What are the primary objectives and focus areas of collaboration between the school or educational institution and healthcare providers in the community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the objectives" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and healthcare providers to promote health and wellness, address medical needs, or enhance emergency medical response within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the partnership with healthcare providers aligned with broader school health goals, emergency preparedness efforts, or community health promotion initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the partnership" />  
                    </div>
                </div>

                <h2>Medical Response Coordination:</h2>
                <div className="form-section">
                    <label>How do healthcare providers coordinate with the school administration and designated medical personnel to support medical response efforts during emergencies, incidents, or health-related crises on campus?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the coordination" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for accessing medical expertise, resources, or support services from healthcare providers in the event of medical emergencies, injuries, or illness occurring within the school community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What role do healthcare providers play in providing guidance, training, or medical oversight to school staff, administrators, or designated responders regarding medical response procedures and protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the role" />  
                    </div>
                </div>

                <h2>Health Education and Outreach:</h2>
                <div className="form-section">
                    <label>How do healthcare providers contribute to health education and outreach efforts within the school community, including students, staff, and families?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the contribution" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources, materials, or presentations does the healthcare community provide to educate students about health promotion, disease prevention, or general wellness practices?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials/presentations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative activities organized to engage students in interactive learning experiences, workshops, or health screenings conducted by healthcare professionals?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Health Services Integration:</h2>
                <div className="form-section">
                    <label>How are healthcare services integrated into the broader support systems and resources available to students within the school setting?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to facilitate access to healthcare services, referrals, or follow-up care for students in need of medical attention or specialized treatment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the meachanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote continuity of care, communication, and collaboration between school-based health services and external healthcare providers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Community Health Promotion:</h2>
                <div className="form-section">
                    <label>How do healthcare providers engage with the broader school community, including parents, caregivers, and local residents, to promote health literacy, healthy lifestyles, and preventive healthcare practices?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are community health fairs, wellness events, or educational workshops organized jointly by the school and healthcare providers to raise awareness about health-related issues and resources available in the community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What efforts are made to address health disparities, cultural competence, or social determinants of health within the school community through collaborative partnerships with healthcare providers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default HealthcareProviderEngagementFormPage;