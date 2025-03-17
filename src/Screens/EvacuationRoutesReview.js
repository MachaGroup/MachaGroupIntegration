import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function EvacuationRoutesReviewFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Evacuation Routes Review');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Evacuation Routes Review');
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
            <h1>Evacuation Routes Review Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.2.5 Evacuation Routes Review */}
                <h2>Review Frequency:</h2>
                <div className="form-section">
                    <label>How often are evacuation routes reviewed and updated within the facility?</label>
                    <div>
                        <input type="text" name="reviewedEvacuationRoutes" placeholder="How often" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews conducted at regular intervals to ensure that evacuation routes remain current and effective?</label>
                    <div>
                        <input type="radio" name="Regular Interval" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Regular Interval" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Regular Interval-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a schedule or procedure in place for conducting routine reviews of evacuation routes?</label>
                    <div>
                        <input type="radio" name="Schedule Procedure" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Schedule Procedure" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Schedule Procedure-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="scheduleProcedure" placeholder="Describe the schedule or procedure" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Review Process:</h2>
                <div className="form-section">
                    <label>Is there a structured process for reviewing evacuation routes, including designated personnel responsible for conducting reviews?</label>
                    <div>
                        <input type="radio" name="Structured Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Structured Process" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Structured Process-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="structuredProcess" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews comprehensive, covering all areas of the facility, including primary and alternative evacuation routes?</label>
                    <div>
                        <input type="radio" name="Comprehensive Coverage" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Comprehensive Coverage" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Comprehensive Coverage-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do reviews include assessments of signage, lighting, obstacles, and other factors that may impact the usability of evacuation routes?</label>
                    <div>
                        <input type="radio" name="Obstacle Assessment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Obstacle Assessment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Obstacle Assessment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Compliance with Regulations:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed to ensure compliance with relevant regulations, codes, and standards, such as building codes and fire safety regulations?</label>
                    <div>
                        <input type="radio" name="Regulation Compliance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Regulation Compliance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Regulation Compliance-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are reviews conducted by individuals knowledgeable about regulatory requirements and best practices for evacuation route design and signage?</label>
                    <div>
                        <input type="radio" name="Knowledgeable Reviewers" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Knowledgeable Reviewers" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Knowledgeable Reviewers-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accessibility Considerations:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed to ensure accessibility for individuals with disabilities or mobility limitations?</label>
                    <div>
                        <input type="radio" name="Disability Access" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Disability Access" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Disability Access-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there provisions in place to accommodate the needs of all occupants, including those who may require assistance during evacuations?</label>
                    <div>
                        <input type="radio" name="Occupant Provisions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Provisions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Occupant Provisions-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="occupantProvisions" placeholder="Describe the provisions" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Signage and Wayfinding:</h2>
                <div className="form-section">
                    <label>Are evacuation route signs inspected as part of the review process to ensure they are clear, visible, and properly positioned?</label>
                    <div>
                        <input type="radio" name="Sign Inspection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Sign Inspection" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Sign Inspection-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are signs updated or replaced as needed to maintain legibility and compliance with standards?</label>
                    <div>
                        <input type="radio" name="Sign Updates" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Sign Updates" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Sign Updates-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are wayfinding aids, such as floor plans or maps, reviewed to ensure they accurately depict evacuation routes and assembly areas?</label>
                    <div>
                        <input type="radio" name="Wayfinding Review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Wayfinding Review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Wayfinding Review-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>Are evacuation routes reviewed in conjunction with broader emergency response plans to ensure alignment and consistency?</label>
                    <div>
                        <input type="radio" name="Plan Alignment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Plan Alignment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Plan Alignment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do reviews consider how evacuation routes integrate with other emergency preparedness and response measures, such as sheltering procedures and communication protocols?</label>
                    <div>
                        <input type="radio" name="Response Integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Response Integration" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Response Integration-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the outcomes of evacuation route reviews, including any identified issues, recommended changes, and actions taken?</label>
                    <div>
                        <input type="radio" name="Outcome Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Outcome Records" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Outcome Records-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are review records accessible to relevant stakeholders for reference and follow-up?</label>
                    <div>
                        <input type="radio" name="Accessible Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Accessible Records" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Accessible Records-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are review findings used to track trends, monitor compliance, and inform future updates to evacuation routes and emergency plans?</label>
                    <div>
                        <input type="radio" name="Trend Tracking" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Trend Tracking" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Trend Tracking-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default EvacuationRoutesReviewFormPage;