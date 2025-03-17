import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IntrusionPreventionSystemsPage() {
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
                  const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Intrusion Prevention Systems');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Intrusion Prevention Systems');
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
            <h1>7.3.2.1.2. Intrusion Prevention Systems</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Intrusion Prevention Systems */}
              <h2>7.3.2.1.2. Intrusion Prevention Systems</h2>
              <div className="form-section">
                <label>What criteria are used to select and implement intrusion prevention systems (IPS) within the network?</label>
                <div>
                  <input type="text" name="ipsSelectionCriteria" placeholder="Describe IPS selection and implementation criteria" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are the IPS configurations tested to ensure effectiveness against various types of attacks?</label>
                <div>
                  <input type="text" name="ipsTesting" placeholder="Describe testing process for IPS configurations" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What methods are in place to regularly update the IPS with new threat signatures or rules?</label>
                <div>
                  <input type="text" name="ipsUpdateMethods" placeholder="Describe methods for updating IPS" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How does the organization monitor and respond to alerts generated by the IPS?</label>
                <div>
                  <input type="text" name="ipsAlertResponse" placeholder="Describe monitoring and response to IPS alerts" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What training is provided to staff on the capabilities and limitations of the IPS to ensure proper usage?</label>
                <div>
                  <input type="text" name="ipsTraining" placeholder="Describe IPS training provided to staff" onChange={handleChange}/>
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

export default IntrusionPreventionSystemsPage;