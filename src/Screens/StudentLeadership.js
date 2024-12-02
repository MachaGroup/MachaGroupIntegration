import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function StudentLeadershipFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Student Leadership');
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
            <h1>Student Leadership Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.2.3 Student Leadership */}
                <h2>Peer-to-Peer Safety Initiatives:</h2>
                <div className="form-section">
                    <label>How do student leaders actively engage their peers in promoting safety awareness and implementing initiatives within the school or educational institution?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful peer-to-peer safety initiatives led by students, and how they have positively impacted safety culture or behavior among peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they engage and impact" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do student leaders collaborate with school staff, administrators, or external organizations to support and amplify their peer-to-peer safety efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Leadership Roles and Responsibilities:</h2>
                <div className="form-section">
                    <label>What leadership roles and responsibilities are entrusted to student leaders in driving peer-to-peer safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles/responsibilities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student leaders selected or recruited for leadership roles related to safety education, and what criteria are used to identify potential candidates?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're selected" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the training, mentorship, or support provided to student leaders to enhance their leadership skills and effectiveness in promoting safety among peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training/mentorship/support" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Training and Skill Development:</h2>
                <div className="form-section">
                    <label>What opportunities are available for student leaders to develop essential skills and competencies related to promoting safety and emergency preparedness among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opportunities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training programs or workshops specifically designed to equip student leaders with communication, collaboration, problem-solving, and decision-making skills relevant to safety leadership roles?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="gates-operational" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do student leaders apply the knowledge and skills gained through training to effectively communicate safety messages, influence peer behavior, and respond to safety concerns within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they apply knowledge/skills" onChange={handleChange}/>  
                    </div>
                </div>
                
                <h2>Collaboration with School Staff and Administration:</h2>
                <div className="form-section">
                    <label>How do student leaders collaborate with school staff, administrators, or safety personnel to align peer-to-peer safety initiatives with institutional goals and priorities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful partnerships or joint initiatives between student leaders and adult stakeholders in advancing safety education and preparedness within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do school staff and administrators support and empower student leaders to take ownership of safety initiatives and drive positive change among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evaluation and Recognition:</h2>
                <div className="form-section">
                    <label>How are student-led safety initiatives evaluated for their effectiveness and impact on safety culture, behavior change, and incident prevention within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're evaluated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are specific metrics, indicators, or benchmarks established to assess the success of peer-to-peer safety initiatives led by student leaders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the metrics/indicators/benchmarks" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student leaders recognized, celebrated, or rewarded for their contributions to promoting safety and fostering a culture of responsibility and preparedness among their peers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're recognized" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Sustainability and Continuity:</h2>
                <div className="form-section">
                    <label>What measures are in place to ensure the sustainability and continuity of peer-to-peer safety initiatives beyond the tenure of current student leaders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are succession plans or leadership transition processes implemented to facilitate the seamless transfer of knowledge, skills, and responsibilities to incoming student leaders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the plans/leadership" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do student leaders mentor, empower, and inspire younger students to become future safety leaders and continue the legacy of peer-to-peer safety initiatives within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how students mentor" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How do student leaders engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how students engage" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of collaborative projects, events, or campaigns led by student leaders that have extended the reach and impact of safety education beyond the school campus?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do student leaders leverage digital platforms, social media, or other communication channels to amplify their safety messages and mobilize collective action among peers and community members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default StudentLeadershipFormPage;