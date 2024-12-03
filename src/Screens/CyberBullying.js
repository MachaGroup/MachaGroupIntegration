import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CyberBullyingFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Cyber Bullying');
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
            <h1>Cyber Bullying Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.1.3 Cyber Bullying */}
                <h2>Awareness and Recognition:</h2>
                <div className="form-section">
                    <label>How is cyberbullying defined and distinguished from other forms of online communication within the school's policies and educational materials?</label>
                    <div>
                        <input type="text" name="cyberbullyingDefinition" placeholder="Describe how it's defined" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are in place to encourage students to report instances of cyberbullying, and how are reports handled confidentially and with sensitivity?</label>
                    <div>
                        <input type="text" name="reportingStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for monitoring online activity and social media platforms to proactively identify potential instances of cyberbullying, and how are privacy concerns addressed in this process?</label>
                    <div>
                        <input type="text" name="monitoringMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Preventive Strategies and Digital Citizenship:</h2>
                <div className="form-section">
                    <label>What curriculum resources or educational programs are utilized to teach students about digital citizenship, online safety, and responsible internet use?</label>
                    <div>
                        <input type="text" name="digitalCitizenship" placeholder="Describe the resources/programs" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school promote a culture of respect and empathy in online interactions, including discussions on cyberbullying prevention, digital footprints, and the consequences of online behavior?</label>
                    <div>
                        <input type="text" name="onlineRespect" placeholder="Describe how they promote respect" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific lessons or activities designed to address the unique challenges of cyberbullying, such as the spread of rumors, online harassment, or digital identity theft?</label>
                    <div>
                        <input type="text" name="cyberbullyingLessons" placeholder="Describe the lessons/activities" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Response and Intervention Protocols:</h2>
                <div className="form-section">
                    <label>Can you outline the steps involved in responding to a reported case of cyberbullying, from initial investigation to resolution and follow-up support for affected students?</label>
                    <div>
                        <input type="text" name="responseProtocols" placeholder="Describe the steps" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or support services are available for students who have been targeted by cyberbullying, including counseling, peer mediation, or legal assistance if necessary?</label>
                    <div>
                        <input type="text" name="studentResources" placeholder="Describe the resources/services" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school collaborate with external partners, such as law enforcement or mental health professionals, to address serious or persistent cases of cyberbullying and ensure a coordinated response?</label>
                    <div>
                        <input type="text" name="externalCollaboration" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Safe Online Environments and Digital Tools:</h2>
                <div className="form-section">
                    <label>What measures are in place to secure school-owned devices and digital platforms against cyber threats, including malware, phishing attempts, or unauthorized access?</label>
                    <div>
                        <input type="text" name="deviceSecurity" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students educated about the importance of protecting their personal information online, including strategies for creating secure passwords, avoiding phishing scams, and safeguarding sensitive data?</label>
                    <div>
                        <input type="text" name="dataProtection" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there policies or guidelines governing the use of social media and digital communication tools within the school community, and how are these communicated to students, staff, and parents?</label>
                    <div>
                        <input type="text" name="socialMediaPolicies" placeholder="Describe the policies/guidelines" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Peer Support and Peer Mediation:</h2>
                <div className="form-section">
                    <label>Does the school facilitate peer support programs or peer mentoring initiatives aimed at fostering positive online behavior and providing support to students experiencing cyberbullying?</label>
                    <div>
                        <input type="radio" name="peerSupportPrograms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="peerSupportPrograms" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to intervene as bystanders in instances of cyberbullying, and what resources or training are available to empower them to take action?</label>
                    <div>
                        <input type="text" name="bystanderEncouragement" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for restorative justice practices or facilitated discussions among students involved in cyberbullying incidents to promote understanding, empathy, and resolution?</label>
                    <div>
                        <input type="radio" name="restorativeJustice" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="restorativeJustice" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Professional Development and Staff Training:</h2>
                <div className="form-section">
                    <label>What training opportunities are provided to school staff members to increase their awareness of cyberbullying issues, improve their ability to recognize warning signs, and respond effectively to incidents?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the opportunities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is ongoing professional development integrated into staff training programs to ensure that educators stay informed about evolving trends in cyberbullying and digital safety?</label>
                    <div>
                        <input type="text" name="professionalDevelopment" placeholder="Describe how it's intergrated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols or procedures in place for staff members to seek guidance or support when addressing cyberbullying incidents, including access to counseling services or legal advice if needed?</label>
                    <div>
                        <input type="text" name="staffSupportProtocols" placeholder="Describe the protocols/procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Parent and Community Engagement:</h2>
                <div className="form-section">
                    <label>How does the school involve parents or guardians in conversations about cyberbullying prevention and online safety, and what resources or materials are provided to support these discussions?</label>
                    <div>
                        <input type="text" name="parentEngagement" placeholder="Describe how they involve parents/gaurdians" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for parents to participate in workshops, seminars, or informational sessions focused on cyberbullying awareness, digital parenting strategies, and effective communication with their children about online risks?</label>
                    <div>
                        <input type="radio" name="parentWorkshops" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentWorkshops" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the school collaborate with community organizations, law enforcement agencies, or industry partners to enhance cyberbullying prevention efforts, share best practices, and advocate for policies that promote online safety?</label>
                    <div>
                        <input type="radio" name="communityCollaboration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="communityCollaboration" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default CyberBullyingFormPage;