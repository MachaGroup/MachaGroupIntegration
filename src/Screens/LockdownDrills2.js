import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function LockdownDrills2FormPage() {
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Lockdown Drills');
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
            <h1>Lockdown Drills Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.5 Lockdown Drills */}
                <h2>Understanding of Lockdown Procedures:</h2>
                <div className="form-section">
                    <label>How are students educated on the purpose and importance of lockdown drills, including the concept of sheltering in place and securing classrooms or designated safe areas during a perceived threat or security incident?</label>
                    <div>
                        <input type="text" name="lockdownEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are students provided with clear and concise instructions on the specific actions to take during a lockdown, such as moving away from doors and windows, remaining silent, and following teacher or staff directives to maintain safety and minimize visibility to potential threats?</label>
                    <div>
                        <input type="radio" name="lockdownInstructions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="lockdownInstructions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Recognition of Lockdown Signals:</h2>
                <div className="form-section">
                    <label>Are students trained to recognize the signals or announcements that initiate a lockdown, such as coded alerts, audible alarms, visual cues, or digital notifications, and to differentiate them from other routine announcements or drills?</label>
                    <div>
                        <input type="radio" name="signalRecognition" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="signalRecognition" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students prepared to respond quickly and decisively to lockdown signals, including the importance of taking immediate shelter, staying out of sight, and remaining quiet to avoid drawing attention to their location?</label>
                    <div>
                        <input type="text" name="responsePreparation" placeholder="Describe how they're prepared" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Securement of Classroom Environment:</h2>
                <div className="form-section">
                    <label>What strategies are employed to instruct students on fortifying their classroom or shelter area during a lockdown, such as locking doors, barricading entry points, closing blinds or curtains, and turning off lights or electronic devices to minimize visibility and enhance security?</label>
                    <div>
                        <input type="text" name="classroomFortification" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to utilize available resources and improvised tools, such as heavy furniture, bookshelves, or classroom supplies, to reinforce doorways, create physical barriers, or shield themselves from potential threats while awaiting further instructions or assistance?</label>
                    <div>
                        <input type="text" name="resourceUtilization" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Communication and Coordination:</h2>
                <div className="form-section">
                    <label>How are students briefed on the importance of communication and cooperation during a lockdown, including the need to remain calm, follow teacher or staff directives, and assist classmates who may require support or reassurance during a stressful situation?</label>
                    <div>
                        <input type="text" name="communicationBriefing" placeholder="Describe how they're briefed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students encouraged to report any suspicious activity, unusual noises, or signs of danger discreetly to designated adults or authorities, using predetermined signals or communication methods to convey information without compromising their safety or alerting potential intruders?</label>
                    <div>
                        <input type="radio" name="activityReporting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="activityReporting" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Post-Drill Reflection and Review:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in debriefing sessions or discussions following lockdown drills, allowing them to share their observations, experiences, and feedback on the effectiveness of lockdown procedures and protocols?</label>
                    <div>
                        <input type="radio" name="debriefingParticipation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="debriefingParticipation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student perspectives and insights from lockdown drills incorporated into ongoing safety planning, risk assessments, and emergency preparedness efforts, informing revisions or enhancements to lockdown procedures, communication protocols, or staff training initiatives?</label>
                    <div>
                        <input type="text" name="studentInput" placeholder="Describe they're perspectives" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to address any concerns, questions, or misconceptions raised by students during post-drill debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of a real lockdown situation?</label>
                    <div>
                        <input type="text" name="concernsAddressed" placeholder="Describe the measures" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default LockdownDrills2FormPage;