import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function VerbalBullyingFormPage() {
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
            <h1>Verbal Bullying Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.1 Verbal Bullying */}
                <h2>Understanding Verbal Bullying:</h2>
                <div className="form-section">
                    <label>How do students learn to recognize verbal bullying behaviors, such as name-calling, teasing, or derogatory remarks, and understand the negative impact these behaviors can have on individuals' well-being and sense of belonging?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they learn" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the curriculum or educational activities used to help students differentiate between playful banter and hurtful verbal interactions, and how students are empowered to advocate for themselves and others when faced with verbal bullying situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the curriculum/activities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to foster empathy and perspective-taking among students, helping them understand the emotional impact of their words on others and develop respectful communication skills in their interactions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Recognizing Signs of Verbal Bullying:</h2>
                <div className="form-section">
                    <label>What signs or indicators of verbal bullying are emphasized in the curriculum to help students identify when someone is being targeted or marginalized through verbal harassment, intimidation, or exclusion?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the signs/indicators" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to recognize and validate their own feelings and experiences when subjected to verbal bullying, and what supportive strategies or coping mechanisms are taught to help them navigate and respond to these situations effectively?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific reporting mechanisms or support systems in place for students to confidentially report incidents of verbal bullying, and how is confidentiality ensured while addressing these concerns?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms/support systems" />  
                    </div>
                </div>

                <h2>Impact and Consequences of Verbal Bullying:</h2>
                <div className="form-section">
                    <label>How does the curriculum address the emotional, psychological, and social consequences of verbal bullying on both victims and perpetrators, including feelings of shame, fear, isolation, and low self-esteem?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they address these" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students educated about the broader impact of verbal bullying on school climate and community cohesion, and how positive bystander intervention and collective action can help mitigate the prevalence and harmful effects of verbal harassment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to provide support and intervention for students affected by verbal bullying, including access to counseling services, peer support groups, or restorative justice practices to address underlying conflicts and promote healing and reconciliation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Effective Communication and Conflict Resolution:</h2>
                <div className="form-section">
                    <label>What communication skills and conflict resolution strategies are taught to students to address verbal conflicts and disagreements constructively, de-escalate tense situations, and resolve interpersonal conflicts without resorting to hurtful or demeaning language?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the skills and strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students empowered to assertively communicate their boundaries and expectations in verbal interactions, express their feelings and concerns assertively, and seek support from trusted adults or peers when faced with verbal bullying incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're empowered" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for students to role-play or practice assertive communication techniques and conflict resolution strategies in simulated scenarios, helping them build confidence and resilience in handling verbal bullying situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Creating a Respectful and Inclusive Culture:</h2>
                <div className="form-section">
                    <label>What proactive measures are taken to foster a culture of respect, empathy, and inclusivity within the school community, where differences are celebrated, and individuals feel valued, accepted, and supported regardless of their background, identity, or perceived vulnerabilities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe any school-wide initiatives, programs, or campaigns aimed at promoting kindness, empathy, and positive peer relationships, and how these efforts contribute to preventing and addressing verbal bullying behaviors effectively?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the initiatives/programs/campaigns" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students involved in the development and implementation of anti-bullying policies and initiatives, fostering a sense of ownership and collective responsibility for creating a safe and inclusive school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're involved" />  
                    </div>
                </div>

                <h2>Parental Involvement and Support:</h2>
                <div className="form-section">
                    <label>How are parents or guardians engaged as partners in bullying prevention efforts, including opportunities for parent education, workshops, or discussions on recognizing and addressing verbal bullying behaviors?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're engaged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents provided with resources, guidance, and strategies for supporting their children who may be experiencing or witnessing verbal bullying, including communication tips, conflict resolution techniques, and referrals to community support services?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/guidance/strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels are utilized to keep parents informed about school-wide anti-bullying initiatives, updates on curriculum content, and resources available for addressing verbal bullying concerns at home and in the community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels" />  
                    </div>
                </div>

                <h2>Continuous Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of bullying prevention strategies, including interventions targeting verbal bullying, regularly assessed and evaluated, and what data or metrics are used to measure progress and identify areas for improvement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's effective" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for gathering feedback from students, parents, and staff about their perceptions of the school's response to verbal bullying incidents, the accessibility of support services, and the overall effectiveness of anti-bullying initiatives?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are findings from assessments and feedback collected used to inform decision-making, adjust intervention strategies, and allocate resources to ensure ongoing improvement in preventing and addressing verbal bullying within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's used" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default VerbalBullyingFormPage;