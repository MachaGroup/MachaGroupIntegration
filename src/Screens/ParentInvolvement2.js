import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ParentInvolvement2FormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Parent Involvement');
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
            <h1>Parent Involvement Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.3 Parent Involvement */}
                <h2>Information Sessions:</h2>
                <div className="form-section">
                    <label>How are parents informed about the emergency procedures and protocols established by the school or educational institution?</label>
                    <div>
                        <input type="text" name="parentalCommunication" placeholder="Describe how they're informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are information sessions or workshops organized specifically to educate parents about emergency preparedness and response?</label>
                    <div>
                        <input type="radio" name="parentWorkshops" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentWorkshops" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What topics are covered during these information sessions, and how are they tailored to meet the informational needs and concerns of parents?</label>
                    <div>
                        <input type="text" name="sessionTopics" placeholder="Describe the topics" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to ask questions, seek clarification, or express their opinions and feedback regarding emergency procedures?</label>
                    <div>
                        <input type="radio" name="parentEngagement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentEngagement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Communication Channels:</h2>
                <div className="form-section">
                    <label>What communication channels are used to disseminate information about emergency procedures to parents?</label>
                    <div>
                        <input type="text" name="communicationChannels" placeholder="Describe the channels" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are newsletters, emails, or other forms of written communication regularly sent to parents to provide updates and reminders about emergency preparedness?</label>
                    <div>
                        <input type="radio" name="writtenCommunication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="writtenCommunication" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are social media platforms or school websites utilized to share relevant information and resources with parents regarding emergency procedures?</label>
                    <div>
                        <input type="text" name="onlineCommunication" placeholder="Describe how social media is utilized" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency notification systems in place to alert parents in real-time about critical incidents or urgent situations affecting the school community?</label>
                    <div>
                        <input type="text" name="notificationSystems" placeholder="Describe the systems" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Parent Education Resources:</h2>
                <div className="form-section">
                    <label>Are educational materials or resources provided to parents to support their understanding of emergency procedures and their role in supporting their children's preparedness?</label>
                    <div>
                        <input type="radio" name="parentalResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentalResources" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of resources are available to parents, such as pamphlets, handouts, or online guides, and how accessible are they?</label>
                    <div>
                        <input type="text" name="resourceAvailability" placeholder="List the resources" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents encouraged to review and discuss emergency procedures with their children at home, and are guidance materials provided to facilitate these discussions?</label>
                    <div>
                        <input type="radio" name="homeDiscussionGuidance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="homeDiscussionGuidance" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents encouraged to reinforce emergency preparedness concepts and skills learned at school within the home environment?</label>
                    <div>
                        <input type="text" name="homeReinforcement" placeholder="Describe how are they encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Parent Feedback and Engagement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to solicit feedback from parents regarding their understanding of emergency procedures and their perceived effectiveness?</label>
                    <div>
                        <input type="text" name="parentFeedback" placeholder="Describe the mechanisms" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parent perspectives and concerns regarding emergency preparedness considered and addressed by school administrators and staff?</label>
                    <div>
                        <input type="text" name="parentConcerns" placeholder="Describe how are they addressed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents invited to participate in planning committees, advisory groups, or other forums focused on emergency preparedness and safety?</label>
                    <div>
                        <input type="radio" name="parentInvolvement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentInvolvement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to foster ongoing engagement and collaboration between parents and school stakeholders in enhancing emergency preparedness efforts?</label>
                    <div>
                        <input type="text" name="ongoingCollaboration" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Participation in Drills and Exercises:</h2>
                <div className="form-section">
                    <label>Are parents encouraged or invited to participate in emergency drills and exercises conducted by the school or educational institution?</label>
                    <div>
                        <input type="radio" name="parentParticipation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentParticipation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents informed about upcoming drills and exercises, and what instructions or expectations are provided to them regarding their involvement?</label>
                    <div>
                        <input type="text" name="drillCommunication" placeholder="Describe how they're informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to observe or volunteer during emergency drills to gain firsthand experience and understanding of school emergency procedures?</label>
                    <div>
                        <input type="radio" name="parentalObservation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="parentalObservation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place to gather input from parents about their observations and experiences during emergency drills?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ParentInvolvement2FormPage;