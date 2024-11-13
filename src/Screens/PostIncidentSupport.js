import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PostIncidentSupportFormPage() {
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
            <h1>Post-Incident Support Assessment</h1>
        </header>
        
        <main className="form-container">
            <form>
                {/* 3.1.1.1.6 Post-Incident Support */}
                <h2>Availability of Support Services:</h2>
                <div className="form-section">
                    <label>What post-incident support services are available to staff members following emergency situations, and are they easily accessible?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List/Describe the support services" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are counseling services, peer support programs, or other mental health resources offered to staff members affected by traumatic events?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are support services promoted and communicated to staff members to ensure awareness of available resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how support services are promoted/communicated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are external partnerships or collaborations established with mental health organizations or community agencies to supplement internal support services?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the partnerships/collaborations" />  
                    </div>
                </div>

                <h2>Counseling and Psychological Support:</h2>
                <div className="form-section">
                    <label>What counseling and psychological support options are available to staff members in the aftermath of critical incidents or emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the counseling/psychological support options" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are licensed counselors or mental health professionals trained in trauma response and crisis intervention available to provide support?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are confidentiality and privacy protected for staff members seeking counseling or psychological support services?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how confidential and privacy are protected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols in place for assessing the immediate and long-term mental health needs of staff members and providing appropriate interventions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Peer Support Programs:</h2>
                <div className="form-section">
                    <label>Are peer support programs established to facilitate informal assistance and emotional support among staff members following traumatic events?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer supporters selected, trained, and supported in their roles as peer counselors or advocates?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are peer support networks integrated into the organization's broader crisis management and employee assistance programs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure the effectiveness and sustainability of peer support initiatives over time?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Family Assistance and Resources:</h2>
                <div className="form-section">
                    <label>How are family members of staff members affected by emergencies supported and informed about available resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how family members of staff are affected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication channels established to provide updates and information to family members during and after critical incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or referral networks are available to connect family members with appropriate support services, such as counseling or financial assistance?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the resources" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are family assistance plans or protocols included in the organization's overall emergency response and recovery framework?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training and Preparedness:</h2>
                <div className="form-section">
                    <label>Are staff members trained on the availability and utilization of post-incident support services as part of their emergency response training?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on recognizing signs of stress, trauma, or emotional distress in themselves and their colleagues?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they are educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training sessions or workshops conducted to enhance staff members' resilience and coping skills in response to critical incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members feel comfortable and supported in seeking assistance or support when needed?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How are post-incident support services evaluated for their effectiveness and responsiveness to staff members' needs?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how services are evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from staff members about their experiences with post-incident support services?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures or metrics are used to assess the impact of support interventions on staff members' well-being and recovery?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures/metrics" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are lessons learned from post-incident support activities used to inform improvements to the organization's crisis management and employee assistance programs?</label>
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

export default PostIncidentSupportFormPage;