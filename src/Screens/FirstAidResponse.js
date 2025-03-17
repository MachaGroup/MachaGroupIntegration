import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function FirstAidResponseFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/First aid Response');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/First aid Response');
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
            <h1>First Aid Response Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.1.1.3 Availability of First Aid Supplies */}
                <h2>Availability of First Aid Supplies:</h2>
                <div className="form-section">
                    <label>Are first aid supplies readily available throughout the premises, including in designated first aid stations and easily accessible locations?</label>
                    <div>
                        <input type="radio" name="available aid supplies" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="available aid supplies" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="available aid supplies-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there an adequate stock of essential items such as bandages, gauze, antiseptics, gloves, and basic medical equipment?</label>
                    <div>
                        <input type="radio" name="adequate essential items" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="adequate essential items" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="adequate essential items-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are first aid kits regularly inspected, replenished, and maintained according to industry standards and regulatory requirements?</label>
                    <div>
                        <input type="radio" name="kits regular  inspection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="kits regular  inspection" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="kits regular  inspection-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Trained Personnel:</h2>
                <div className="form-section">
                    <label>Are staff members trained in basic first aid procedures, including CPR, wound care, splinting, and treatment for common injuries?</label>
                    <div>
                        <input type="radio" name="staff Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="staff Training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="staff Training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do designated personnel possess valid certifications or qualifications in first aid and cardiopulmonary resuscitation (CPR)?</label>
                    <div>
                        <input type="radio" name="valid certifications" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="valid certifications" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="valid certifications-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a sufficient number of trained personnel available to provide first aid assistance during all operational hours?</label>
                    <div>
                        <input type="radio" name="sufficient trained personnel" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="sufficient trained personnel" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="sufficient trained personnel-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Response Procedures:</h2>
                <div className="form-section">
                    <label>Are there established procedures for responding to medical emergencies and providing initial first aid assistance?</label>
                    <div>
                        <input type="radio" name="established procedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="established procedures" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="established procedures-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="establishedProcedures" placeholder="Describe Emergency procedures " onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do staff members know how to assess the situation, prioritize actions, and summon additional assistance if needed?</label>
                    <div>
                        <input type="radio" name="Staff Actions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Staff Actions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Staff Actions-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear communication channels and protocols for alerting emergency medical services and coordinating response efforts?</label>
                    <div>
                        <input type="radio" name="clear communication channel" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="clear communication channel" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="clear communication channel-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accessibility of Medical Assistance:</h2>
                <div className="form-section">
                    <label>Is there a designated point of contact or responsible individual for coordinating medical assistance during emergencies?</label>
                    <div>
                        <input type="radio" name="Medical responsible individual" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Medical responsible individual" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Medical responsible individual-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="medicalResponsibleIndividual" placeholder="List the contact or responsible individual" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contact details for emergency medical services (e.g., ambulance services) readily available and prominently displayed?</label>
                    <div>
                        <input type="radio" name="Emergency contact details" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Emergency contact details" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Emergency contact details-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide accurate information to emergency medical services regarding the nature and severity of the medical emergency?</label>
                    <div>
                        <input type="radio" name="staff accurate information" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="staff accurate information" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="staff accurate information-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are incidents requiring first aid assistance documented accurately and promptly?</label>
                    <div>
                        <input type="radio" name="aid assistance document" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="aid assistance document" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="aid assistance document-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a standardized reporting process for recording details of medical emergencies, treatments provided, and outcomes?</label>
                    <div>
                        <input type="radio" name="standardized reporting process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="standardized reporting process" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="standardized reporting process-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="standardizedReportingProcess" placeholder="Describe the reporting process" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reports reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?</label>
                    <div>
                        <input type="radio" name="reports review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reports review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="reports review-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Medical Equipment and Facilities:</h2>
                <div className="form-section">
                    <label>Are there designated areas or facilities equipped for administering first aid, such as treatment rooms or medical stations?</label>
                    <div>
                        <input type="radio" name="designated areas" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designated areas" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designated areas-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is medical equipment, such as automated external defibrillators (AEDs) or oxygen tanks, maintained in working condition and regularly inspected for functionality?</label>
                    <div>
                        <input type="radio" name="medical equipment Maintainance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="medical equipment Maintainance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="medical equipment Maintainance-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained in the proper use and maintenance of medical equipment?</label>
                    <div>
                        <input type="radio" name="medical equipment training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="medical equipment training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="medical equipment training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Continuous Training and Improvement:</h2>
                <div className="form-section">
                    <label>Is there ongoing training and education provided to staff members to refresh and enhance their first aid skills?</label>
                    <div>
                        <input type="radio" name="training and education" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="training and education" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="training and education-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are regular drills or simulations conducted to practice response procedures and assess the effectiveness of first aid protocols?</label>
                    <div>
                        <input type="radio" name="response procedures drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="response procedures drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="response procedures drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback and lessons learned from past incidents used to improve first aid response capabilities and procedures?</label>
                    <div>
                        <input type="radio" name="past incidents feedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="past incidents feedback" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="past incidents feedback-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default FirstAidResponseFormPage;