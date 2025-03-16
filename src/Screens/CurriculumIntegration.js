import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function CurriculumIntegrationFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Curriculum Integration');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Curriculum Integration');
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
            <h1>Curriculum Integration Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.1 Recertification Schedule */}
                <h2>Curriculum Integration:</h2>
                <div className="form-section">
                    <label>How are emergency procedures integrated into the curriculum, and in which subjects or courses are they included?</label>
                    <div>
                        <input type="text" name="curriculumIntegration" placeholder="Describe how procedures are integrated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency procedures incorporated into existing lessons or taught as standalone topics within the curriculum?</label>
                    <div>
                        <input type="radio" name="lessonIntegration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="lessonIntegration" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="lessonIntegrationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are used to ensure that emergency procedures are age-appropriate and developmentally suitable for students?</label>
                    <div>
                        <input type="text" name="ageAppropriateStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are emergency procedures revisited and reinforced throughout the academic year to promote retention and readiness?</label>
                    <div>
                        <input type="text" name="procedureReinforcement" placeholder="Describe how often" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Instructional Materials:</h2>
                <div className="form-section">
                    <label>What instructional materials are used to teach emergency procedures to students, such as textbooks, workbooks, or multimedia resources?</label>
                    <div>
                        <input type="text" name="instructionalMaterials" placeholder="Describe the materials" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are educational materials aligned with established emergency response protocols and guidelines?</label>
                    <div>
                        <input type="radio" name="protocolAlignment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="protocolAlignment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="protocolAlignmentComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are instructional materials adapted to meet the diverse learning needs and preferences of students, including those with disabilities or language barriers?</label>
                    <div>
                        <input type="text" name="materialAdaptation" placeholder="Describe how materials adapt" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are supplementary resources available to support student learning and reinforce key concepts related to emergency preparedness?</label>
                    <div>
                        <input type="text" name="supplementaryResources" placeholder="Describe the resources" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Interactive Learning Activities:</h2>
                <div className="form-section">
                    <label>What interactive learning activities are employed to engage students in learning about emergency procedures?</label>
                    <div>
                        <input type="text" name="interactiveActivities" placeholder="Describe the activities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are hands-on activities, simulations, or role-playing exercises used to simulate emergency situations and practice response skills?</label>
                    <div>
                        <input type="radio" name="simulationExercises" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="simulationExercises" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="simulationExercisesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are technology tools or educational games utilized to enhance student understanding and retention of emergency procedures?</label>
                    <div>
                        <input type="text" name="techIntegration" placeholder="Describe how tools are utilized" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative learning experiences or group discussions facilitated to promote peer interaction and knowledge sharing?</label>
                    <div>
                        <input type="radio" name="collaborativeLearning" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="collaborativeLearning" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="collaborativeLearningComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Assessment and Evaluation:</h2>
                <div className="form-section">
                    <label>How is student comprehension and proficiency in emergency procedures assessed and evaluated?</label>
                    <div>
                        <input type="text" name="assessmentMethods" placeholder="Describe how it's assessed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are formal assessments, such as quizzes, tests, or performance evaluations, used to measure student learning outcomes?</label>
                    <div>
                        <input type="radio" name="formalAssessments" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="formalAssessments" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="formalAssessmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are formative assessment strategies, such as observations or classroom discussions, employed to gauge student understanding and skill development?</label>
                    <div>
                        <input type="text" name="formativeAssessments" placeholder="Describe how its understanding" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are assessment results used to identify areas for improvement in emergency preparedness education and inform instructional adjustments?</label>
                    <div>
                        <input type="radio" name="assessmentFeedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="assessmentFeedback" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="assessmentFeedbackComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Parent and Guardian Involvement:</h2>
                <div className="form-section">
                    <label>How are parents and guardians informed about the emergency procedures being taught to their children?</label>
                    <div>
                        <input type="text" name="parentalCommunication" placeholder="Describe how parents are informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources provided to parents and guardians to support reinforcement of emergency preparedness concepts at home?</label>
                    <div>
                        <input type="radio" name="parentalResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentalResources" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="parentalResourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels are used to solicit feedback and input from parents and guardians regarding their children's learning experiences related to emergency procedures?</label>
                    <div>
                        <input type="text" name="feedbackChannels" placeholder="Describe the channels" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents and guardians to participate in training or informational sessions about emergency preparedness and response?</label>
                    <div>
                        <input type="radio" name="parentalInvolvement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentalInvolvement" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="parentalInvolvementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default CurriculumIntegrationFormPage;