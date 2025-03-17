import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ClassroomHelpersPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if(!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress'); 
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Community Partnership/Classroom Helpers');

      if (image) {
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          return;
        }
        if (image.size > 5 * 1024 * 1024) {
          setUploadError('Image file too large (Max 5MB)');
          return;
        }

        const storageRef = ref(storage, `classroomHelpers_images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setUploadError(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL);
            setFormData({ ...formData, imageUrl: downloadURL });
            setUploadError(null);
          }
        );
      }

      await addDoc(formsRef, {
        building: buildingRef,
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
            <button className="back-button" onClick={() => navigate(-1)}>←</button>
            <h1>Classroom Helpers</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>6.3.1.2.1. Classroom Helpers</h2>
                <div className="form-section">
                    <label>What training is provided to classroom helpers regarding student safety and emergency procedures?</label>
                    <input type="text" name="classroomHelpersTraining" placeholder="Describe the training" onChange={handleChange}/>
                </div>

                <div className="form-section">
                    <label>How are classroom helpers screened to ensure they are suitable for working with students?</label>
                    <input type="text" name="screeningClassroomHelpers" placeholder="Describe how they're screened" onChange={handleChange}/>
                </div>

                <div className="form-section">
                    <label>In what ways do classroom helpers contribute to maintaining a safe and supportive environment in the classroom?</label>
                    <input type="text" name="maintainingASafeEnviroment" placeholder="Describe the ways" onChange={handleChange}/>
                </div>

                <div className="form-section">
                    <label>How are classroom helpers informed about the school’s safety policies and reporting procedures?</label>
                    <input type="text" name="informingClassroomHelpers" placeholder="Describe how they're informed" onChange={handleChange}/>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are in place for classroom helpers to communicate concerns or suggestions about safety in the classroom?</label>
                    <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
                </div>

                <input type="file" accept="image/*" onChange={handleImageChange} />
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  );
}

export default ClassroomHelpersPage;
