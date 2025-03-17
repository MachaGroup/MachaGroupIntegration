import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function StaffInputOnPolicyImpactPage() {
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
        const formsRef = collection(db, 'forms/Policy and Compliance/Staff Input On Policy Impact');
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Staff Input On Policy Impact');
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
            <h1>Staff Input On Policy Impact Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Staff Input On Policy Impact */}
            <h2>5.4.1.2.1 Staff Input On Policy Impact</h2>
            <div className="form-section">
              <label>What methods are used to collect staff feedback on the effectiveness of security policies?</label>
              <div>
                <input type="text" name="feedbackMethods" placeholder="Describe methods for collecting staff feedback" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>How often are staff surveys or focus groups conducted to assess policy impact?</label>
              <div>
                <input type="text" name="surveyFrequency" placeholder="Describe frequency of staff surveys or focus groups" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>In what ways are staff encouraged to share their experiences with existing policies?</label>
              <div>
                <input type="text" name="staffEncouragement" placeholder="Describe how staff are encouraged to share experiences" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>How is staff feedback incorporated into the policy revision process?</label>
              <div>
                <input type="text" name="feedbackIncorporation" placeholder="Describe how feedback is incorporated into revisions" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>What follow-up actions are taken after collecting staff input to address concerns or suggestions?</label>
              <div>
                <input type="text" name="followUpActions" placeholder="Describe follow-up actions after collecting feedback" onChange={handleChange}/>
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

export default StaffInputOnPolicyImpactPage;