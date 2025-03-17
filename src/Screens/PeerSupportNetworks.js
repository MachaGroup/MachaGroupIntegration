import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PeerSupportNetworksFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle back button
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'orms/Personnel Training and Awareness/Peer Support Networks');
        await addDoc(formsRef, {
          building: buildingRef,
          formData: formData,
        });
        console.log('Form Data submitted successfully on back!');
        alert('Form data saved before navigating back!');
      } catch (error) {
        console.error('Error saving form data:', error);
        alert('Failed to save form data before navigating back. Some data may be lost.');
      }
    }
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Peer Support Networks');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
      alert('Form Submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Peer Support Networks Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.2.3 Peer Support Networks */}
                <h2>Training and Structure:</h2>
                <div className="form-section">
                    <label>How are peer support network members selected or trained to ensure they possess the necessary skills and knowledge to effectively support their peers?</label>
                    <div>
                        <input type="text" name="memberSelection" placeholder="Describe how it's selected/trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What ongoing support or supervision mechanisms are in place to assist peer supporters in managing their roles and addressing challenging situations?</label>
                    <div>
                        <input type="text" name="supportMechanisms" placeholder="Describe the support/supervision mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the structure of the peer support network designed to facilitate effective communication, collaboration, and coordination among members?</label>
                    <div>
                        <input type="text" name="networkStructure" placeholder="Describe how it's designed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established protocols or guidelines for maintaining confidentiality and ensuring that peer support interactions are conducted in a safe and respectful manner?</label>
                    <div>
                        <input type="text" name="confidentialityProtocols" placeholder="Describe the protocols/guidelines" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support network activities integrated with existing school programs or initiatives aimed at promoting mental health and well-being?</label>
                    <div>
                        <input type="text" name="programIntegration" placeholder="Describe how it's integrated" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Accessibility and Outreach:</h2>
                <div className="form-section">
                    <label>What efforts are made to promote awareness of the peer support network among students, and how accessible is information about accessing support from peer supporters?</label>
                    <div>
                        <input type="text" name="awarenessEfforts" placeholder="Describe the efforts made" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are barriers to accessing peer support addressed, particularly for students who may be reluctant to seek help or who face additional challenges in reaching out?</label>
                    <div>
                        <input type="text" name="accessBarriers" placeholder="Describe how they're addressed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there strategies in place to ensure that peer support services are inclusive and reach a diverse range of students, including those from marginalized or underserved communities?</label>
                    <div>
                        <input type="radio" name="inclusivityStrategies" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="inclusivityStrategies" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="inclusivityStrategiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from students used to evaluate the accessibility and effectiveness of the peer support network, and what adjustments are made based on this feedback?</label>
                    <div>
                        <input type="text" name="feedbackEvaluation" placeholder="Describe how it's used to evaluate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there partnerships or collaborations with other school or community organizations to enhance the visibility and reach of the peer support network?</label>
                    <div>
                        <input type="text" name="partnerships" placeholder="Describe the partnerships/collaborations" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Training and Skill Development:</h2>
                <div className="form-section">
                    <label>What specific training or skill development opportunities are provided to peer support network members to enhance their capacity to provide effective support to their peers?</label>
                    <div>
                        <input type="text" name="trainingOpportunities" placeholder="Describe the training/skill development opportunities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training curricula or materials tailored to address the unique needs and challenges of peer supporters, including topics such as active listening, empathy, and boundary setting?</label>
                    <div>
                        <input type="text" name="trainingTailoring" placeholder="Describe how it addresses the needs/challenges" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for peer supporters to receive ongoing training or professional development to further develop their skills and expertise?</label>
                    <div>
                        <input type="radio" name="ongoingTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ongoingTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ongoingTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of training programs assessed, and what mechanisms are in place for incorporating feedback from peer supporters into future training initiatives?</label>
                    <div>
                        <input type="text" name="trainingEffectiveness" placeholder="Describe how it's assessed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions for recognizing and rewarding the contributions of peer supporters, such as certifications, awards, or opportunities for leadership development?</label>
                    <div>
                        <input type="radio" name="recognition" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="recognition" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="recognitionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Peer Support Activities and Services:</h2>
                <div className="form-section">
                    <label>What types of support services or activities are offered through the peer support network, and how are these tailored to meet the diverse needs and preferences of students?</label>
                    <div>
                        <input type="text" name="supportServices" placeholder="Describe the types offered" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support activities structured to promote inclusivity, diversity, and cultural competence, ensuring that all students feel welcome and valued?</label>
                    <div>
                        <input type="text" name="inclusivity" placeholder="Describe how they're structured" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for peer supporters to engage in proactive outreach and engagement efforts to connect with students who may benefit from support but may not actively seek it out?</label>
                    <div>
                        <input type="radio" name="proactiveOutreach" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="proactiveOutreach" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="proactiveOutreachComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are peer support services aligned with broader school goals or initiatives related to mental health promotion, bullying prevention, or student well-being?</label>
                    <div>
                        <input type="text" name="alignmentWithGoals" placeholder="Describe how they're aligned" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for evaluating the impact and effectiveness of peer support activities, such as collecting feedback from participants or tracking outcomes over time?</label>
                    <div>
                        <input type="text" name="impactEvaluation" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Collaboration and Referral Networks:</h2>
                <div className="form-section">
                    <label>How does the peer support network collaborate with other school-based support services, such as counseling centers, student support teams, or health services, to ensure coordinated care for students?</label>
                    <div>
                        <input type="text" name="serviceCollaboration" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols or procedures are in place for referring students to additional support services or resources beyond the scope of peer support, when needed?</label>
                    <div>
                        <input type="text" name="referralProtocols" placeholder="Describe the protocols/procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established partnerships or referral networks with external organizations or community agencies to expand the range of support options available to students?</label>
                    <div>
                        <input type="text" name="externalPartnerships" placeholder="Describe the partnerships" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication channels maintained between peer supporters and other support providers to facilitate information sharing, continuity of care, and follow-up?</label>
                    <div>
                        <input type="text" name="communicationChannels" placeholder="Describe how they're maintained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for tracking and monitoring referrals made by peer supporters to ensure that students receive appropriate follow-up and support?</label>
                    <div>
                        <input type="text" name="referralTracking" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of the peer support network evaluated, and what metrics or indicators are used to assess its impact on student well-being and school climate?</label>
                    <div>
                        <input type="text" name="effectivenessEvaluation" placeholder="Describe how they're evaluated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for collecting feedback from both peer supporters and students who have received support to gather insights into their experiences and satisfaction with the service?</label>
                    <div>
                        <input type="text" name="feedbackCollection" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evaluation findings used to identify areas for improvement or refinement in the peer support network, and what steps are taken to implement changes based on these findings?</label>
                    <div>
                        <input type="text" name="improvementSteps" placeholder="Describe how they're used" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for ongoing research or evaluation studies to further explore the outcomes and benefits of peer support interventions within the school context?</label>
                    <div>
                        <input type="radio" name="researchOpportunities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="researchOpportunities" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="researchOpportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the peer support network integrated into broader efforts to promote a positive and supportive school environment, and what strategies are employed to sustain its impact over time?</label>
                    <div>
                        <input type="text" name="sustainabilityStrategies" placeholder="Describe how they're integrated" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default PeerSupportNetworksFormPage;