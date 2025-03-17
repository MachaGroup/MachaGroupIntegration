import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AssessingCommunityNeedsAndPrioritiesPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage(); // Initialize Firebase Storage

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleBack = async () => {
    if (formData && buildingId) {
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Community Partnership/Assessing Community Needs and Priorities');
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

    if (!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Community Partnership/Assessing Community Needs and Priorities');

      if (image) {
        const storageRef = ref(storage, `communityNeeds_images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setUploadError(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, imageUrl: downloadURL });
              setUploadError(null);
            });
          }
        );
      }

      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Assessing Community Needs and Priorities</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Assessing Community Needs and Priorities */}
          <h2>6.3.2.3.2. Assessing Community Needs and Priorities</h2>
          <div className="form-section">
            <label>How are community needs and priorities related to school safety identified and prioritized?</label>
            <div>
              <input type="text" name="identifyingCommunityNeeds" placeholder="Describe how they're identified and prioritized" onChange={handleChange} />
            </div>
          </div>
          {/* ...rest of your form questions... */}
          <div className="form-section">
    <label>What tools or methods are used to assess the specific safety concerns of community members?</label>
    <div>
        <input type="text" name="toolsAssessingSafetyConcerns" placeholder="Describe the tools" onChange={handleChange}/>
    </div>
</div>

<div className="form-section">
    <label>How often is the assessment of community needs conducted to ensure it reflects current conditions?</label>
    <div>
        <input type="text" name="conductedAssessmentOfCommunityNeeds" placeholder="Describe how often" onChange={handleChange}/>
    </div>
</div>

<div className="form-section">
    <label>In what ways are community members involved in the process of identifying their safety needs and priorities?</label>
    <div>
        <input type="text" name="involvedCommunityMemebers" placeholder="Describe the ways they're involved" onChange={handleChange}/>
    </div>
</div>

<div className="form-section">
    <label>How do the assessed needs influence the development of school safety programs and initiatives?</label>
    <div>
        <input type="text" name="assessedNeeds" placeholder="Describe the influence" onChange={handleChange}/>
    </div>
</div>
          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {uploadError && <p style={{ color: 'red' }}>{uploadError.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default AssessingCommunityNeedsAndPrioritiesPage;
