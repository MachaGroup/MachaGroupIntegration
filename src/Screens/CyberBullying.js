import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function CyberBullyingFormPage() {
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
            <h1>Cyber Bullying Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.3 Cyber Bullying */}
                <h2>Awareness and Recognition:</h2>
                <div className="form-section">
                    <label>How is cyberbullying defined and distinguished from other forms of online communication within the school's policies and educational materials?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's defined" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are in place to encourage students to report instances of cyberbullying, and how are reports handled confidentially and with sensitivity?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for monitoring online activity and social media platforms to proactively identify potential instances of cyberbullying, and how are privacy concerns addressed in this process?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Preventive Strategies and Digital Citizenship:</h2>
                <div className="form-section">
                    <label>What curriculum resources or educational programs are utilized to teach students about digital citizenship, online safety, and responsible internet use?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/programs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school promote a culture of respect and empathy in online interactions, including discussions on cyberbullying prevention, digital footprints, and the consequences of online behavior?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote respect" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific lessons or activities designed to address the unique challenges of cyberbullying, such as the spread of rumors, online harassment, or digital identity theft?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the lessons/activities" />  
                    </div>
                </div>

                <h2>Response and Intervention Protocols:</h2>
                <div className="form-section">
                    <label>Can you outline the steps involved in responding to a reported case of cyberbullying, from initial investigation to resolution and follow-up support for affected students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the steps" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or support services are available for students who have been targeted by cyberbullying, including counseling, peer mediation, or legal assistance if necessary?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/services" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school collaborate with external partners, such as law enforcement or mental health professionals, to address serious or persistent cases of cyberbullying and ensure a coordinated response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <h2>Safe Online Environments and Digital Tools:</h2>
                <div className="form-section">
                    <label>What measures are in place to secure school-owned devices and digital platforms against cyber threats, including malware, phishing attempts, or unauthorized access?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students educated about the importance of protecting their personal information online, including strategies for creating secure passwords, avoiding phishing scams, and safeguarding sensitive data?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there policies or guidelines governing the use of social media and digital communication tools within the school community, and how are these communicated to students, staff, and parents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the policies/guidelines" />  
                    </div>
                </div>

                <h2>Peer Support and Peer Mediation:</h2>
                <div className="form-section">
                    <label>Does the school facilitate peer support programs or peer mentoring initiatives aimed at fostering positive online behavior and providing support to students experiencing cyberbullying?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to intervene as bystanders in instances of cyberbullying, and what resources or training are available to empower them to take action?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for restorative justice practices or facilitated discussions among students involved in cyberbullying incidents to promote understanding, empathy, and resolution?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Professional Development and Staff Training:</h2>
                <div className="form-section">
                    <label>What training opportunities are provided to school staff members to increase their awareness of cyberbullying issues, improve their ability to recognize warning signs, and respond effectively to incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opportunities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is ongoing professional development integrated into staff training programs to ensure that educators stay informed about evolving trends in cyberbullying and digital safety?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's intergrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols or procedures in place for staff members to seek guidance or support when addressing cyberbullying incidents, including access to counseling services or legal advice if needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <h2>Parent and Community Engagement:</h2>
                <div className="form-section">
                    <label>How does the school involve parents or guardians in conversations about cyberbullying prevention and online safety, and what resources or materials are provided to support these discussions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they involve parents/gaurdians" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for parents to participate in workshops, seminars, or informational sessions focused on cyberbullying awareness, digital parenting strategies, and effective communication with their children about online risks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the school collaborate with community organizations, law enforcement agencies, or industry partners to enhance cyberbullying prevention efforts, share best practices, and advocate for policies that promote online safety?</label>
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

export default CyberBullyingFormPage;