import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EvacuationRoutesReviewFormPage() {
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
            <h1>Evacuation Routes Review Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.3.1.2.5 Evacuation Routes Review */}
                <h2>Review Frequency:</h2>
                <div className="form-section">
                    <label>How often are evacuation routes reviewed and updated within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews conducted at regular intervals to ensure that evacuation routes remain current and effective?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a schedule or procedure in place for conducting routine reviews of evacuation routes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the schedule or procedure" />  
                    </div>
                </div>

                <h2>Review Process:</h2>
                <div className="form-section">
                    <label>Is there a structured process for reviewing evacuation routes, including designated personnel responsible for conducting reviews?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews comprehensive, covering all areas of the facility, including primary and alternative evacuation routes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do reviews include assessments of signage, lighting, obstacles, and other factors that may impact the usability of evacuation routes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Compliance with Regulations:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed to ensure compliance with relevant regulations, codes, and standards, such as building codes and fire safety regulations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews conducted by individuals knowledgeable about regulatory requirements and best practices for evacuation route design and signage?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility Considerations:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed to ensure accessibility for individuals with disabilities or mobility limitations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions in place to accommodate the needs of all occupants, including those who may require assistance during evacuations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the provisions" />  
                    </div>
                </div>

                <h2>Signage and Wayfinding:</h2>
                <div className="form-section">
                    <label>Are evacuation route signs inspected as part of the review process to ensure they are clear, visible, and properly positioned?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are signs updated or replaced as needed to maintain legibility and compliance with standards?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are wayfinding aids, such as floor plans or maps, reviewed to ensure they accurately depict evacuation routes and assembly areas?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed in conjunction with broader emergency response plans to ensure alignment and consistency?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do reviews consider how evacuation routes integrate with other emergency preparedness and response measures, such as sheltering procedures and communication protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the outcomes of evacuation route reviews, including any identified issues, recommended changes, and actions taken?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are review records accessible to relevant stakeholders for reference and follow-up?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are review findings used to track trends, monitor compliance, and inform future updates to evacuation routes and emergency plans?</label>
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

export default EvacuationRoutesReviewFormPage;