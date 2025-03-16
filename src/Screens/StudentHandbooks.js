import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function StudentHandbooksFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Student Handbook');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Student Handbook');
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
            <h1>Student Handbooks Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.2 Student Handbooks */}
                <h2>Content and Coverage:</h2>
                <div className="form-section">
                    <label>What emergency procedures and protocols are included in the student handbooks, and how comprehensively are they covered?</label>
                    <div>
                        <input type="text" name="handbookProcedures" placeholder="Describe the procedures/protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency procedures outlined in a clear, concise, and easily understandable manner within the student handbooks?</label>
                    <div>
                        <input type="radio" name="procedureClarity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="procedureClarity" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="procedureClarityComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do the student handbooks provide detailed instructions and guidance on actions to take during various types of emergencies, such as evacuations, lockdowns, or medical incidents?</label>
                    <div>
                        <input type="radio" name="emergencyIntructions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="emergencyIntructions" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="emergencyIntructionsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are additional resources or references provided in the student handbooks to support understanding and implementation of emergency procedures?</label>
                    <div>
                        <input type="radio" name="additionalResource" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="additionalResource" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="additionalResourceComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Distribution and Accessibility:</h2>
                <div className="form-section">
                    <label>How are student handbooks distributed to students, and are they readily accessible to all members of the student body?</label>
                    <div>
                        <input type="text" name="handbookDistribution" placeholder="Describe how it's distributed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student handbooks provided in multiple formats to accommodate different learning preferences or accessibility needs (e.g., print, digital, audio)?</label>
                    <div>
                        <input type="radio" name="formatAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="formatAccessibility" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="formatAccessibilityComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that student handbooks are regularly updated and maintained to reflect current emergency procedures and protocols?</label>
                    <div>
                        <input type="text" name="handbookUpdates" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student handbooks available in languages other than English to support students with limited English proficiency or non-native speakers?</label>
                    <div>
                        <input type="radio" name="languageAccessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="languageAccessibility" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="languageAccessibilityComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>How are students trained on the contents of the student handbooks and familiarized with emergency procedures?</label>
                    <div>
                        <input type="text" name="handbookTraining" placeholder="Describe students are trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are orientation sessions, classroom discussions, or interactive activities conducted to introduce students to the information contained in the student handbooks?</label>
                    <div>
                        <input type="radio" name="orientationActivities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="orientationActivities" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="orientationActivitiesComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to reinforce key concepts and ensure retention of emergency procedures among students?</label>
                    <div>
                        <input type="text" name="reinforcementStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student leaders, peer mentors, or older students involved in assisting with the dissemination and explanation of information from the student handbooks?</label>
                    <div>
                        <input type="radio" name="peerInvolvement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="peerInvolvement" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="peerInvolvementComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Integration with Curriculum:</h2>
                <div className="form-section">
                    <label>How are the contents of the student handbooks integrated into the school curriculum to reinforce emergency preparedness education?</label>
                    <div>
                        <input type="text" name="curriculumIntegration" placeholder="Describe how it's integrated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are specific lessons or activities designed to align with the emergency procedures outlined in the student handbooks?</label>
                    <div>
                        <input type="radio" name="alignedLessons" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="alignedLessons" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="alignedLessonsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are teachers and staff members encouraged to reference and reinforce information from the student handbooks in their instructional practices?</label>
                    <div>
                        <input type="text" name="staffEncouragement" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for students to apply knowledge and skills related to emergency procedures in simulated scenarios or real-life situations?</label>
                    <div>
                        <input type="text" name="practicalApplication" placeholder="Describe the opportunities" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Feedback and Improvement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to gather feedback from students regarding the usefulness and effectiveness of the information provided in the student handbooks?</label>
                    <div>
                        <input type="text" name="studentFeedback" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are suggestions or concerns raised by students regarding emergency procedures in the student handbooks addressed and incorporated into revisions?</label>
                    <div>
                        <input type="text" name="feedbackIntegration" placeholder="Describe how it's addressed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are periodic reviews and evaluations conducted to assess the impact of the student handbooks on student preparedness and response to emergencies?</label>
                    <div>
                        <input type="radio" name="handbookEvaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handbookEvaluation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="handbookEvaluationComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to continuously improve the content, format, and accessibility of the student handbooks based on feedback and evaluation findings?</label>
                    <div>
                        <input type="text" name="continuousImprovement" placeholder="Describe the measures" onChange={handleChange}/>
                    </div>
                </div>
                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default StudentHandbooksFormPage;