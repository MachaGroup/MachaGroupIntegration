import React, { useState, useEffect, useCallback } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce';

function SafetyAndSecurityTrainingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const storage = getStorage();

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [saveError, setSaveError] = useState(null);

    // Fetching Data: useEffect hook
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'Safety And Security Training', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No form data for this building");
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [buildingId, db, navigate]);

    // Function to save form data to Firestore (debounced for performance)
    const saveFormData = async (updatedFormData, currentImageUrl) => {
        try {
            const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'Safety And Security Training', buildingId);
            await setDoc(formDocRef, { formData: updatedFormData, imageUrl: currentImageUrl, updatedAt: serverTimestamp() }, { merge: true });
            setSaveError(null);
            console.log("Form data saved:", updatedFormData);
        } catch (error) {
            console.error("Error saving form data:", error);
            setSaveError("Failed to save form data. Please try again.");
        }
    };
    // Create a debounced version of the save function
    const debouncedSaveFormData = useCallback(debounce(saveFormData, 500), [buildingId, db]);

    //HandleInputChange function
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === 'radio') {
            newValue = checked ? value : '';
        }

        // Update the local state *immediately*
        setFormData(prevFormData => ({ ...prevFormData, [name]: newValue }));

        debouncedSaveFormData({ ...formData, [name]: newValue }, imageUrl);
    };

    const handleChange = async (e) => {
      const { name, value } = e.target;
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);

      try {
          const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
          const formDocRef = doc(db, 'forms', 'Physical Security', 'Security Gates', buildingId);
          await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
          console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
      } catch (error) {
          console.error("Error saving form data to Firestore:", error);
          alert("Failed to save changes. Please check your connection and try again.");
      }
  };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImage(imageFile);
            uploadImageToFirebase(imageFile);
        }
    };

    const uploadImageToFirebase = async (imageFile) => {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Error uploading image:", error);
                setUploadError("Failed to upload image. Please try again.");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL);
                    handleInputChange({ target: { name: 'imageUrl', value: downloadURL } });
                });
            }
        );
    };
  // Function to handle back button
    const handleBack = () => {
        navigate(-1);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
        const formDocRef = doc(db, 'forms', 'Continuous Improvement - Safety and Security', 'Safety And Security Training', buildingId);
        await setDoc(formDocRef, { formData: formData, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
        console.log('Form data submitted successfully!');
        alert('Form submitted successfully!');
        navigate('/Form');
    } catch (error) {
        console.error("Error submitting form:", error);
        alert('Failed to submit the form. Please try again.');
    }
  };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    if (saveError) {
        return <div>Error: {saveError}</div>;
    }

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.2.2.2.3. Safety and Security Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                {/* Safety And Security Training */}
                <h2>7.2.2.2.3. Safety and Security Training</h2>
                <label>What training programs are available for staff to understand safety and security protocols during emergencies?</label>
                <div>
                  <input
                    type="text"
                    name="trainingPrograms"
                    placeholder="Describe the safety and security training programs"
                    value={formData.trainingPrograms || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <label>How frequently are safety and security training sessions conducted for employees and stakeholders?</label>
                <div>
                  <input
                    type="text"
                    name="trainingFrequency"
                    placeholder="Describe the frequency of training sessions"
                    value={formData.trainingFrequency || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <label>What methods are used to assess the effectiveness of safety and security training programs?</label>
                <div>
                  <input
                    type="text"
                    name="trainingAssessmentMethods"
                    placeholder="Describe the methods for assessing training effectiveness"
                    value={formData.trainingAssessmentMethods || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <label>How is training tailored to meet the specific needs of different roles within the organization?</label>
                <div>
                  <input
                    type="text"
                    name="trainingCustomization"
                    placeholder="Describe how training is customized for different roles"
                    value={formData.trainingCustomization || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <label>What resources are provided to staff for ongoing education about safety and security best practices?</label>
                <div>
                  <input
                    type="text"
                    name="ongoingEducationResources"
                    placeholder="Describe resources for ongoing education on safety and security"
                    value={formData.ongoingEducationResources || ''}
                    onChange={handleInputChange}
                  />
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

export default SafetyAndSecurityTrainingPage;
