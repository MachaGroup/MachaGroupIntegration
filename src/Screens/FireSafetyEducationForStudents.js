import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function FireSafetyEducationForStudentsPage() {
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
              const formsRef = collection(db, 'forms/Community Partnership/Fire Safety Education for Students');
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
      const formsRef = collection(db, 'forms/Community Partnership/Fire Safety Education for Students');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!')
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
          <h1>Fire Safety Education for Students</h1>
          <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Fire Safety Education for Students */}
          <h2>6.1.2.1.1. Fire Safety Education for Students</h2>
          <div className="form-section">
            <label>What key fire safety concepts are included in the education program for students?</label>
            <div>
              <input type="text" name="keyFireSafetyConcepts" placeholder="Describe the concepts" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How often are fire safety education sessions conducted throughout the academic year?</label>
            <div>
              <input type="text" name="conductedSessions" placeholder="Describe how often" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What methods are used to engage students and make the fire safety education relatable and effective?</label>
            <div>
              <input type="text" name="engagingStudents" placeholder="Describe the methods" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there hands-on activities, such as fire drills or demonstrations, included in the program to enhance learning?</label>
            <div>
              <input type="radio" name="hands-on-activities" value="yes" onChange={handleChange} /> Yes
              <input type="radio" name="hands-on-activities" value="no" onChange={handleChange} /> No
              <textarea className='comment-box' name="hands-on-activitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How is the effectiveness of the fire safety education assessed, and what feedback is gathered from students and teachers?</label>
            <div>
              <input type="text" name="assessingEffectiveness" placeholder="Describe how it's assessed" onChange={handleChange}/>
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

export default FireSafetyEducationForStudentsPage;