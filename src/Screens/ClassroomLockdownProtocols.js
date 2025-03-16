import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function ClassroomLockdownProtocolsFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Classroom Lockdown Protocols');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Classroom Lockdown Protocols');
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
            <h1>Classroom Lockdown Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.2.1 Classroom Lockdown Procedures */}
                <h2>2.2.1.2.1 Door Locks:</h2>
                <div className="form-section">
                    <label>2.2.1.2.1.1 Are classroom doors equipped with locks that can be securely engaged from the inside?</label>
                    <div>
                        <input type="radio" name="classroom doors locks" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="classroom doors locks" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="classroom doors locks-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>2.2.1.2.1.2 Do locks meet safety standards and regulations for lockdown procedures?</label>
                    <div>
                        <input type="radio" name="locks  safety standard" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="locks  safety standard" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="locks  safety standard-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>2.2.1.2.1.3 Are locks easy to operate and reliably secure, even under stress or pressure?</label>
                    <div>
                        <input type="radio" name="lock-operational" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="lock-operational" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="lock-operational-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                { /* 2.2.1.2.2 Barricading Mechanisms*/ }
                <h2>2.2.1.2.2 Barricading Mechanisms:</h2>
                <div className="form-section">
                    <label>Are there barricading mechanisms available in classrooms to reinforce door security during lockdowns?</label>
                    <div>
                        <input type="radio" name="barricading mechanism" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="barricading mechanism" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="barricading mechanism-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="barricadingMechanisms" placeholder="List the mechanisms" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Do barricading devices effectively prevent unauthorized entry and provide additional time for occupants to seek shelter or escape?</label>
                    <div>
                        <input type="radio" name="barricading device operational" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="barricading device operational" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="barricading device operational-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are barricading devices designed to be quickly deployed and easily removed by authorized personnel?</label>
                    <div>
                        <input type="radio" name="barricading device efficiency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="barricading device efficiency" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="barricading device efficiency-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Training and Drills:</h2>
                <div className="form-section">
                    <label>Are staff members and students trained in lockdown procedures, including how to barricade doors effectively?</label>
                    <div>
                        <input type="radio" name="lockdown procedure training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="lockdown procedure training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="lockdown procedure training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted regularly to practice lockdown scenarios and ensure familiarity with procedures?</label>
                    <div>
                        <input type="radio" name="regular lockdown drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regular lockdown drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regular lockdown drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefings held after drills to review performance, identify areas for improvement, and reinforce best practices?</label>
                    <div>
                        <input type="radio" name="regularly lockdown debriefing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularly lockdown debriefing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regularly lockdown debriefing-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication Systems:</h2>
                <div className="form-section">
                    <label>Is there a communication system in place to alert occupants of lockdowns and provide instructions?</label>
                    <div>
                        <input type="radio" name="lockdown communication system" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="lockdown communication system" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="lockdown communication system-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="lockdownCommunicationSystem" placeholder="Describe the communication system" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency communication devices accessible in classrooms for contacting authorities or requesting assistance?</label>
                    <div>
                        <input type="radio" name="emergency communication devices" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="emergency communication devices" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="emergency communication devices-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="emergencyCommunicationDevices" placeholder="List the devices" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated protocol for reporting suspicious activity or potential threats to school administrators or security personnel?</label>
                    <div>
                        <input type="radio" name="designated protocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designated protocol" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designated protocol-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="designatedProtocol" placeholder="Describe the protocol" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Safe Zones and Hiding Places:</h2>
                <div className="form-section">
                    <label>Are there designated safe zones or hiding places within classrooms where occupants can seek shelter during lockdowns?</label>
                    <div>
                        <input type="radio" name="designated safe zones" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designated safe zones" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designated safe zones-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="designatedSafeZones" placeholder="Describe the safe zones" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are these areas strategically located to provide cover and concealment from potential threats?</label>
                    <div>
                        <input type="radio" name="strategic safe zones" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="strategic safe zones" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="strategic safe zones-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Have safe zones been assessed for potential vulnerabilities and reinforced as needed to enhance security?</label>
                    <div>
                        <input type="radio" name="safe zones vulnerabilities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="safe zones vulnerabilities" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="safe zones vulnerabilities-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Coordination with Authorities:</h2>
                <div className="form-section">
                    <label>Is there coordination between school personnel and local law enforcement agencies on lockdown procedures and response protocols?</label>
                    <div>
                        <input type="radio" name="personel coordination" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="personel coordination" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="personel coordination-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are law enforcement agencies familiar with school layouts and lockdown plans to facilitate their response in the event of an emergency?</label>
                    <div>
                        <input type="radio" name="law enforcement familiarity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="law enforcement familiarity" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="law enforcement familiarity-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are there regular meetings or exercises conducted with law enforcement to review and refine lockdown procedures?</label>
                    <div>
                        <input type="radio" name="law enforcement review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="law enforcement review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="law enforcement review-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Parent and Guardian Communication:</h2>
                <div className="form-section">
                    <label>Are parents and guardians informed of lockdown procedures and expectations for student safety?</label>
                    <div>
                        <input type="radio" name="guardians informed" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="guardians informed" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="guardians informed-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a communication plan in place for notifying parents and guardians of lockdown events and providing updates as needed?</label>
                    <div>
                        <input type="radio" name="guardians communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="guardians communication" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="guardians communication-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="guardiansCommunication" placeholder="Describe the plan" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or support services available to assist families in coping with the emotional impact of lockdown situations?</label>
                    <div>
                        <input type="radio" name="available support services" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="available support services" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="available support services-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default ClassroomLockdownProtocolsFormPage;