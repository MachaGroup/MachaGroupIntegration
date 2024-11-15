import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function InternetSafetyFormPage() {
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
            <h1>Internet Safety Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.3.1.2 Internet Safety */}
                <h2>Understanding of Online Risks:</h2>
                <div className="form-section">
                    <label>How are students educated about the potential risks and dangers associated with internet use, including exposure to inappropriate content, online predators, cyberbullying, identity theft, and phishing scams?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the topics covered in the internet safety curriculum, such as privacy settings, safe browsing habits, recognizing and reporting online threats, and responsible social media use, and how these concepts are presented to students in an age-appropriate manner?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the topics" />  
                    </div>
                </div>

                <h2>Safe Online Practices:</h2>
                <div className="form-section">
                    <label>What strategies are taught to students to promote safe online practices, including the importance of creating strong, unique passwords, avoiding sharing personal information or photos with strangers, and being cautious when clicking on links or downloading files from unknown sources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to critically evaluate online information for accuracy, credibility, and potential biases, and what tools or resources are provided to help them fact-check sources, identify misinformation, and navigate digital media literacy challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <h2>Cyberbullying Prevention:</h2>
                <div className="form-section">
                    <label>How does the curriculum address the topic of cyberbullying, including defining what constitutes cyberbullying behavior, its impact on victims, and strategies for preventing and responding to cyberbullying incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it address the topic" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students taught empathy, respect, and digital citizenship skills to foster positive online behavior and promote a culture of kindness, inclusivity, and accountability in digital spaces?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What support mechanisms are in place to assist students who experience cyberbullying, including reporting mechanisms, access to counseling or mental health services, and strategies for seeking help from trusted adults or peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Parental Involvement and Guidance:</h2>
                <div className="form-section">
                    <label>How are parents or guardians involved in reinforcing internet safety lessons at home, and what resources or guidance materials are provided to support parents in discussing online safety topics with their children?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're involved" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe any parent education events, workshops, or resources offered by the school to promote collaboration between educators and families in fostering a safe and responsible online environment for students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe they events/workshops/resources" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school communicate with parents about internet safety initiatives, including updates on curriculum content, online tools and resources, and recommendations for monitoring and supervising children's online activities outside of school hours?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe they events/workshops/resources" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default InternetSafetyFormPage;