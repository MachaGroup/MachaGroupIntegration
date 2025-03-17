import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

/**/
function CommunicationChannelsFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Two-way Radios');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Two-way Radios');
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
            <h1>Communication Channels Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.2 Communication Channels */}
                <h2>Designation of Communication Channels:</h2>
                <div className="form-section">
                    <label>Are specific communication channels designated for different types of communication needs, such as emergency communication, general staff communication, or coordination between departments?</label>
                    <div>
                        <input type="radio" name="designatedCommunicationChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designatedCommunicationChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designatedCommunicationChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a clear delineation of the purpose and usage guidelines for each communication channel?</label>
                    <div>
                        <input type="radio" name="clearDelineation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="clearDelineation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="clearDelineationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Emergency Communication Frequency:</h2>
                <div className="form-section">
                    <label>Is there a designated frequency or channel specifically reserved for emergency communication purposes?</label>
                    <div>
                        <input type="radio" name="reservedFrequency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reservedFrequency" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="reservedFrequencyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on how to access and utilize the designated emergency communication channel during emergencies?</label>
                    <div>
                        <input type="radio" name="trainedStaff" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="trainedStaff" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="trainedStaffComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Channel Management and Coordination:</h2>
                <div className="form-section">
                    <label>Is there a protocol for managing and coordinating communication channels to prevent interference and ensure clear communication during emergencies?</label>
                    <div>
                        <input type="radio" name="managingProtocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="managingProtocol" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="managingProtocolComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for reallocating or reassigning communication channels as needed to adapt to changing circumstances or address technical issues?</label>
                    <div>
                        <input type="radio" name="reallocatingProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reallocatingProcedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="reallocatingProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Compatibility with Equipment:</h2>
                <div className="form-section">
                    <label>Are communication channels selected or configured to be compatible with the communication equipment used by staff members, such as two-way radios or mobile devices?</label>
                    <div>
                        <input type="radio" name="compatibleChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="compatibleChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="compatibleChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there compatibility testing conducted to verify interoperability and functionality across different devices and communication channels?</label>
                    <div>
                        <input type="radio" name="compatiblilityTesting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="compatiblilityTesting" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="compatiblilityTestingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Redundancy and Contingency Planning:</h2>
                <div className="form-section">
                    <label>Are redundant communication channels or backup options available to mitigate the risk of channel failure or disruption during emergencies?</label>
                    <div>
                        <input type="radio" name="redundantCommunicationChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="redundantCommunicationChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="redundantCommunicationChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a contingency plan in place for switching to alternative communication channels if primary channels become unavailable or compromised?</label>
                    <div>
                        <input type="radio" name="contingencyPlan" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="contingencyPlan" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="contingencyPlanComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to access, select, and utilize communication channels effectively, particularly during emergencies?</label>
                    <div>
                        <input type="radio" name="trainedStaff" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="trainedStaff" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="trainedStaffComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are practice sessions or drills conducted to familiarize staff members with communication channel protocols and simulate emergency scenarios?</label>
                    <div>
                        <input type="radio" name="practiceSessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="practiceSessions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="practiceSessionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Are designated communication channels integrated into broader emergency communication and response plans, ensuring alignment with overall emergency protocols?</label>
                    <div>
                        <input type="radio" name="integratedCommunicationChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="integratedCommunicationChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="integratedCommunicationChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated procedures for incorporating communication channel usage into emergency drills, exercises, and simulations to assess effectiveness and identify areas for improvement?</label>
                    <div>
                        <input type="radio" name="incorporatingChannelProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="incorporatingChannelProcedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="incorporatingChannelProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from staff members regarding the usability, reliability, and effectiveness of communication channels during emergencies?</label>
                    <div>
                        <input type="radio" name="feedbackMechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="feedbackMechanisms" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="feedbackMechanismsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing communication channel protocols and infrastructure considered and implemented as part of ongoing improvement efforts?</label>
                    <div>
                        <input type="radio" name="enhancingRecommendations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="enhancingRecommendations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="enhancingRecommendationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default CommunicationChannelsFormPage;