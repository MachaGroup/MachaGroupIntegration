import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function DocumentationOfPolicyChangesPage() {
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
              const formsRef = collection(db, 'forms/Policy and Compliance/Documentation Of Policy Changes');
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Documentation Of Policy Changes');
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
            <h1>Documentation of Policy Changes Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Documentation Of Policy Changes */}
            <h2>5.4.2.1.2 Documentation Of Policy Changes</h2>
            <div className="form-section">
                <label>What format is used for documenting changes made to policies?</label>
              <div>
                <input type="text" name="documentFormat" placeholder="Describe the format used for documenting changes" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>How are the reasons for each policy change recorded?</label>
              <div>
                <input type="text" name="reasonDocumentation" placeholder="Describe how reasons for changes are documented" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>Who is responsible for maintaining the documentation of policy changes?</label>
              <div>
                <input type="text" name="documentationResponsibility" placeholder="Describe the person or team responsible for maintaining documentation" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>How is the historical record of policy changes accessible to stakeholders?</label>
              <div>
                <input type="text" name="historicalRecordAccess" placeholder="Describe how the historical record of policy changes is accessed" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>What procedures are in place to ensure that documentation is up-to-date and accurate?</label>
              <div>
                <input type="text" name="documentationUpdateProcedure" placeholder="Describe procedures for keeping documentation up-to-date" onChange={handleChange}/>
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

export default DocumentationOfPolicyChangesPage;