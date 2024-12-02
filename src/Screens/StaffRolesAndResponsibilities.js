import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function StaffRolesAndResponsibilitiesFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Staff Roles and Responsibilities');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Staff Roles and Responsibilities Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.2.3 Staff Roles and Responsibilities */}
                <h2>Role Assignment:</h2>
                <div className="form-section">
                    <label>Are staff members assigned specific roles and responsibilities during drills, such as evacuation team leaders, floor wardens, or first aid responders?</label>
                    <div>
                        <input type="radio" name="Role Specificity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role Specificity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are these assignments communicated to staff members in advance, along with clear expectations for their roles and duties?</label>
                    <div>
                        <input type="radio" name="Role Communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role Communication" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Training and Preparation:</h2>
                <div className="form-section">
                    <label>Are staff members trained on their assigned roles and responsibilities before participating in drills?</label>
                    <div>
                        <input type="radio" name="Role Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role Training" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training materials provided to educate staff members on their duties, procedures, and communication protocols during drills?</label>
                    <div>
                        <input type="radio" name="Training Materials" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Materials" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members given opportunities to practice their roles and receive feedback on their performance?</label>
                    <div>
                        <input type="radio" name="Practice Feedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Practice Feedback" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Coordination and Communication:</h2>
                <div className="form-section">
                    <label>Is there a system in place for coordinating the actions of staff members during drills, including communication channels and protocols?</label>
                    <div>
                        <input type="radio" name="Coordination System" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Coordination System" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members instructed on how to communicate effectively with each other, as well as with occupants, emergency responders, and management personnel?</label>
                    <div>
                        <input type="radio" name="Effective Communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Effective Communication" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated leaders or coordinators appointed to oversee the execution of staff roles and facilitate communication during drills?</label>
                    <div>
                        <input type="radio" name="Leadership Oversight" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Leadership Oversight" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for monitoring the performance of staff members in their assigned roles during drills?</label>
                    <div>
                        <input type="radio" name="Performance Monitoring" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Performance Monitoring" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are supervisors or observers tasked with assessing staff members' adherence to procedures, teamwork, and effectiveness in carrying out their responsibilities?</label>
                    <div>
                        <input type="radio" name="Observer Assessment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Observer Assessment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback provided to staff members after drills to recognize commendable efforts and identify areas for improvement?</label>
                    <div>
                        <input type="radio" name="Feedback Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Process" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Adaptability and Flexibility:</h2>
                <div className="form-section">
                    <label>Are staff members prepared to adapt to changing circumstances or unexpected events during drills?</label>
                    <div>
                        <input type="radio" name="Adaptability Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Adaptability Training" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contingency plans established to address deviations from standard procedures or the need for improvised responses?</label>
                    <div>
                        <input type="radio" name="Contingency Plans" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Contingency Plans" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members encouraged to exercise initiative and creativity in problem-solving and decision-making during drills?</label>
                    <div>
                        <input type="radio" name="Creative Problem-Solving" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Creative Problem-Solving" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>Are staff roles and responsibilities aligned with the broader emergency response plans and protocols of the facility?</label>
                    <div>
                        <input type="radio" name="Plan Alignment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Plan Alignment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do staff members understand how their roles fit into the overall emergency response framework and support the safety and well-being of occupants?</label>
                    <div>
                        <input type="radio" name="Framework Understanding" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Framework Understanding" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff roles regularly reviewed and updated in conjunction with changes to emergency response plans or organizational structure?</label>
                    <div>
                        <input type="radio" name="Role Updates" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Role Updates" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Documentation and Review:</h2>
                <div className="form-section">
                    <label>Are records maintained to document staff assignments, actions, and performance during drills?</label>
                    <div>
                        <input type="radio" name="Record Maintenance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Record Maintenance" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to assess the effectiveness of staff roles and identify opportunities for enhancement?</label>
                    <div>
                        <input type="radio" name="Drill Review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Review" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations used to refine staff roles and responsibilities, as well as associated training and preparation efforts?</label>
                    <div>
                        <input type="radio" name="Evaluation Recommendations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Evaluation Recommendations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default StaffRolesAndResponsibilitiesFormPage;