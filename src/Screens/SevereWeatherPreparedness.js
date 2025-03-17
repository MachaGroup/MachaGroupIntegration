import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SevereWeatherPreparednessFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Severe Weather Preparedness');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Severe Weather Preparedness');
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
            <h1>Severe Weather Preparedness Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.6 Severe Weather Preparedness */}
                <h2>Understanding of Severe Weather Risks:</h2>
                <div className="form-section">
                    <label>How are students educated about the potential risks associated with severe weather events such as tornadoes, hurricanes, thunderstorms, or floods, including the specific threats posed to their geographic location and the school environment?</label>
                    <div>
                        <input type="text" name="weatherEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students taught to recognize the warning signs of impending severe weather conditions, such as changes in sky color, cloud formations, temperature, or wind patterns, and to take proactive measures to stay informed and prepared for possible emergencies?</label>
                    <div>
                        <input type="radio" name="weatherWarningSigns" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="weatherWarningSigns" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="weatherWarningSignsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Response to Severe Weather Alerts:</h2>
                <div className="form-section">
                    <label>What procedures are in place to promptly disseminate severe weather alerts and advisories to students and staff, utilizing multiple communication channels such as public address systems, digital displays, mobile alerts, or weather radios to ensure widespread awareness and timely response?</label>
                    <div>
                        <input type="text" name="weatherAlertProcedures" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to respond to severe weather alerts, including the importance of seeking shelter in designated safe areas, moving away from windows or glass doors, and assuming protective positions to minimize exposure to flying debris or potential hazards?</label>
                    <div>
                        <input type="text" name="weatherResponseTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Sheltering and Safety Protocols:</h2>
                <div className="form-section">
                    <label>Are students familiarized with the specific sheltering and safety protocols associated with different types of severe weather events, such as tornado safety procedures involving seeking shelter in interior rooms or reinforced areas on lower levels of the building, away from exterior walls, doors, and windows?</label>
                    <div>
                        <input type="radio" name="shelteringProtocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="shelteringProtocols" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="shelteringProtocolsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students instructed on the appropriate actions to take during severe weather events, including how to crouch low, cover their heads, and protect themselves from falling or flying objects while sheltering in place until the threat has passed or further instructions are provided?</label>
                    <div>
                        <input type="text" name="weatherInstructions" placeholder="Describe how they're instructed" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evacuation and Assembly Procedures:</h2>
                <div className="form-section">
                    <label>What plans are in place for evacuating students and staff from outdoor areas, temporary structures, or portable classrooms in anticipation of severe weather threats, ensuring that all individuals are directed to safe, predetermined assembly points or designated storm shelters in a prompt and orderly manner?</label>
                    <div>
                        <input type="text" name="evacuationPlans" placeholder="Describe the plans" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to navigate evacuation routes, avoid potential hazards such as downed power lines or flooded areas, and follow instructions from designated personnel or emergency responders to facilitate a safe and efficient evacuation process?</label>
                    <div>
                        <input type="text" name="evacuationTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Post-Event Evaluation and Review:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in post-event evaluations or debriefing sessions following severe weather incidents, allowing them to share their observations, experiences, and feedback on the effectiveness of sheltering procedures, communication protocols, and staff response efforts?</label>
                    <div>
                        <input type="radio" name="postEventEvaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="postEventEvaluation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="postEventEvaluationComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student perspectives and insights from severe weather drills and real-world events used to inform ongoing safety planning, infrastructure improvements, or emergency preparedness initiatives aimed at enhancing the school's resilience and response capabilities to future severe weather events?</label>
                    <div>
                        <input type="text" name="studentInput" placeholder="Describe how they're informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to address any concerns, questions, or misconceptions raised by students during post-event debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of future severe weather emergencies?</label>
                    <div>
                        <input type="text" name="concernsAddressed" placeholder="Describe the measures" onChange={handleChange}/>  
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

export default SevereWeatherPreparednessFormPage;