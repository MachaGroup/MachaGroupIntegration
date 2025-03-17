import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function EvacuationProceduresFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Evacuation Procedures');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Evacuation Procedures');
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
            <h1>Evacuation Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.1.1 Evacuation Procedures */}
                <h2>Evacuation Routes and Procedures:</h2>
                <div className="form-section">
                    <label>Are there clearly defined evacuation routes posted throughout the premises, indicating primary and secondary exit paths?</label>
                    <div>
                        <input type="radio" name="defined evacuation routes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="defined evacuation routes" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="defined evacuation routes-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Have evacuation procedures been established for different scenarios, such as fire emergencies, bomb threats, or natural disasters?</label>
                    <div>
                        <input type="radio" name="Established evacuation procedures" value="yes" onChange={handleChange}/>Yes
                        <input type="radio" name="Established evacuation procedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Established evacuation procedures-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="establishedEvacuationProcedures" placeholder="Describe evacuation procedures" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on evacuation procedures and their roles during evacuations?</label>
                    <div>
                        <input type="radio" name="evacuation procedures training " value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="evacuation procedures training " value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="evacuation procedures training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Assembly Points:</h2>
                <div className="form-section">
                    <label>Have designated assembly points been identified outside the building where occupants should gather after evacuating?</label>
                    <div>
                        <input type="radio" name="designated assembly points" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designated assembly points" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designated assembly points-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are assembly points located at safe distances from the building and away from potential hazards?</label>
                    <div>
                        <input type="radio" name="assembly point safety" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="assembly point safety" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="assembly point safety-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do assembly points provide adequate space and facilities for occupants to gather and await further instructions?</label>
                    <div>
                        <input type="radio" name="assembly point space" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="assembly point space" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="assembly point space-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication and Alert Systems:</h2>
                <div className="form-section">
                    <label>Is there an effective communication system in place to alert occupants of the need to evacuate?</label>
                    <div>
                        <input type="radio" name="effective alert system" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="effective alert system" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="effective alert system-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are fire alarms, strobe lights, or other alerting devices installed and regularly tested to ensure they are functional?</label>
                    <div>
                        <input type="radio" name="alerting devices installed" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="alerting devices installed" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="alerting devices installed-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a mechanism for broadcasting evacuation instructions and updates to all occupants, including those with disabilities or language barriers?</label>
                    <div>
                        <input type="radio" name="broadcasting mechanism" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="broadcasting mechanism" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="broadcasting mechanism-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="broadcastingMechanism" placeholder="Describe the mechanism" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Evacuation Procedures for Special Needs:</h2>
                <div className="form-section">
                    <label>Are there procedures in place to assist occupants with disabilities or special needs during evacuations?</label>
                    <div>
                        <input type="radio" name="disability evacuation procedure" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="disability evacuation procedure" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="disability evacuation procedure-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide assistance to individuals who may require additional support during evacuations?</label>
                    <div>
                        <input type="radio" name="disability assistance training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="disability assistance training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="disability assistance training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation routes and assembly points accessible to individuals with mobility impairments or other disabilities?</label>
                    <div>
                        <input type="radio" name="disability evacuation accesibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="disability evacuation accesibility" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="disability evacuation accesibility-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accountability and Accountability:</h2>
                <div className="form-section">
                    <label>Is there a system in place to account for all occupants and ensure everyone has evacuated safely?</label>
                    <div>
                        <input type="radio" name="Evacuation account" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Evacuation account" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Evacuation account-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="evacuationAccount" placeholder="Describe the system" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated individuals assigned to perform accountability checks at assembly points and report any missing persons to emergency responders?</label>
                    <div>
                        <input type="radio" name="Assigned accountability checker" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Assigned accountability checker" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Assigned accountability checker-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="assignedAccountabilityChecker" placeholder="List designated individuals" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures in place for re-entry into the building after evacuations have been completed and deemed safe?</label>
                    <div>
                        <input type="radio" name="building reentry procedure" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="building reentry procedure" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="building reentry procedure-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Training and Drills:</h2>
                <div className="form-section">
                    <label>Are regular evacuation drills conducted to familiarize occupants with evacuation procedures and routes?</label>
                    <div>
                        <input type="radio" name="regular evacuation drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regular evacuation drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regular evacuation drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills tailored to address different scenarios and challenges that may arise during evacuations?</label>
                    <div>
                        <input type="radio" name="different scenario drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="different scenario drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="different scenario drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback and lessons learned from drills used to improve evacuation procedures and preparedness?</label>
                    <div>
                        <input type="radio" name="drills feedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="drills feedback" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="drills feedback-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Review and Updates:</h2>
                <div className="form-section">
                    <label>Are evacuation procedures regularly reviewed and updated to reflect changes in building layout, occupancy, or emergency response protocols?</label>
                    <div>
                        <input type="radio" name="evacuation procedures review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="evacuation procedures review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="evacuation procedures review-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is input from occupants, emergency responders, and other stakeholders solicited to identify areas for improvement in evacuation plans?</label>
                    <div>
                        <input type="radio" name="solicited input" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="solicited input" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="solicited input-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are updates communicated effectively to all occupants and staff members to ensure they are aware of changes to evacuation procedures?</label>
                    <div>
                        <input type="radio" name="effective update communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="effective update communication" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="effective update communication-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default EvacuationProceduresFormPage;