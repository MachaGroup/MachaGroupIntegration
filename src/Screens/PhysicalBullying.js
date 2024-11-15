import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PhysicalBullyingFormPage() {
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
            <h1>Physical Bullying Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.2 Physical Bullying */}
                <h2>Identification and Recognition:</h2>
                <div className="form-section">
                    <label>How are students educated on recognizing physical bullying behaviors, such as pushing, hitting, kicking, or other forms of physical aggression, and distinguishing them from rough play or consensual interaction?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What proactive measures are in place to empower students to identify signs of physical bullying, including changes in behavior, unexplained injuries, or reluctance to attend school, and to report incidents to trusted adults or authorities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Prevention and Intervention:</h2>
                <div className="form-section">
                    <label>What preventive strategies and intervention protocols are implemented to address physical bullying incidents promptly and effectively, including clear reporting procedures, designated staff responsibilities, and consequences for perpetrators?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies and protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to advocate for themselves and others when witnessing physical bullying, and what support mechanisms or bystander intervention strategies are promoted to foster a culture of collective responsibility and mutual respect?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies and protocols" />  
                    </div>
                </div>

                <h2>Safety Measures and Environment Design:</h2>
                <div className="form-section">
                    <label>What measures are taken to ensure the physical safety and well-being of students within the school environment, including supervision during transition periods, monitoring of high-risk areas, and implementation of proactive measures to prevent conflicts and aggression?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there physical modifications or environmental adjustments made to reduce opportunities for physical bullying, such as improved lighting, surveillance cameras, or designated safe zones, and how are these measures communicated to students and staff?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the modifications/adjustments" />  
                    </div>
                </div>

                <h2>Support and Counseling Services:</h2>
                <div className="form-section">
                    <label>How are students affected by physical bullying provided with immediate support and access to counseling services to address their emotional and psychological well-being, including trauma-informed care, crisis intervention, and ongoing support for recovery and resilience-building?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're affected" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols in place for engaging with parents or guardians of students involved in physical bullying incidents, including communication about the incident, collaboration on intervention strategies, and referrals to external support services as needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Restorative Justice and Conflict Resolution:</h2>
                <div className="form-section">
                    <label>Can you describe any restorative justice practices or conflict resolution techniques employed to address physical bullying incidents, including opportunities for dialogue, mediation, and reconciliation between parties involved, and how are these approaches integrated into the school's disciplinary framework?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the practices" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students supported in understanding the impact of their actions, taking responsibility for their behavior, and developing empathy and accountability in resolving conflicts and repairing harm caused by physical bullying incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're supported" />  
                    </div>
                </div>

                <h2>Community Partnerships and Collaboration:</h2>
                <div className="form-section">
                    <label>Are there partnerships with local law enforcement agencies, community organizations, or youth-serving agencies to address issues of physical bullying comprehensively, including joint initiatives, resource-sharing, and coordination of support services for affected students and families?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the agencies/organizations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are community stakeholders engaged in prevention efforts, awareness campaigns, and capacity-building activities to address the root causes of physical bullying and promote a culture of respect, empathy, and nonviolence within the broader community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're engaged" />  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of interventions targeting physical bullying regularly assessed and evaluated, including data collection on incident reports, disciplinary actions, student surveys, and feedback from staff, students, and parents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's assessed and evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for ongoing review and refinement of anti-bullying policies, procedures, and programming based on evidence-based practices, best available research, and input from stakeholders to ensure continuous improvement in addressing physical bullying within the school community?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>
            
            </form>
        </main>
    </div>
  )
}

export default PhysicalBullyingFormPage;