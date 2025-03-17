import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BulletCamerasPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Physical Security/Bullet Cameras');

      if (image) {
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          return;
        }
        if (image.size > 5 * 1024 * 1024) {
          setUploadError('Image file too large (Max 5MB)');
          return;
        }

        const storageRef = ref(storage, `bulletCameras_images/${Date.now()}_${image.name}`);
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

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
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
        <h1>Bullet Cameras Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
        <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the bullet cameras strategically positioned to overlook entrances and provide comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="strategicPlacementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all entry points and critical areas, such as doors, gates, or parking lots?</label>
            <div>
              <input type="radio" name="coverageEntryPoints" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverageEntryPoints" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="coverageEntryPointsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient?</label>
            <div>
              <input type="text" name="blindSpots" placeholder="Describe any blind spots" onChange={handleChange}/>
            </div>
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the bullet cameras securely mounted and installed to withstand outdoor conditions?</label>
            <div>
              <input type="radio" name="secureMounting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureMounting" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="secureMountingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned at optimal angles to capture clear and unobstructed views of entrances?</label>
            <div>
              <input type="radio" name="optimalAngles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="optimalAngles" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="optimalAnglesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring adequately protected from weather elements and tampering?</label>
            <div>
              <input type="radio" name="protectedWiring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="protectedWiring" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="protectedWiringComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Weatherproofing and Durability */}
          <h2>Weatherproofing and Durability:</h2>
          <div className="form-section">
            <label>Are the bullet cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weatherProofing" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="weatherProofing" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="weatherProofingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding harsh outdoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="durableMaterialsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have the cameras undergone testing or certification to verify weatherproofing and durability?</label>
            <div>
              <input type="radio" name="certification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="certification" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="certificationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the bullet cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="imageQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageQuality" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="imageQualityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions outdoors?</label>
            <div>
              <input type="radio" name="imageAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="imageAdjustmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities at entrances?</label>
            <div>
              <input type="radio" name="clearImages" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="clearImages" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="clearImagesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the bullet cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integratedSurveillance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedSurveillance" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="integratedSurveillanceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="seamlessCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="seamlessCommunication" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="seamlessCommunicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from entrances?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="realTimeMonitoringComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the bullet cameras?</label>
            <div>
              <input type="radio" name="remoteAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAccess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteAccessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?</label>
            <div>
              <input type="radio" name="remoteAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteAdjustmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?</label>
            <div>
              <input type="radio" name="secureAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureAccess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="secureAccessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the bullet cameras?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceTasksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
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

export default BulletCamerasPage;