import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const motionSensorQuestions = [
    // Placement and Coverage
    { name: "strategicPlacement", label: "Are motion sensors strategically placed to detect unauthorized entry?" }, // Simplified
    { name: "coverage", label: "Do they cover all potential entry points (doors, windows, vulnerable areas)?" }, // Simplified
    // Adapted from text input
    { name: "blindSpotsIdentified", label: "Are any blind spots or areas identified where sensor coverage is insufficient?" },
    // Detection Sensitivity
    { name: "sensitivityLevel", label: "Are sensors set to an appropriate sensitivity level for effective detection?" }, // Simplified
    // Adapted from text input
    { name: "falseAlarmsMinimized", label: "Are adjustments/measures in place to minimize false alarms (from pets, environment etc.)?" },
    // Response Time and Alarm Triggering
    { name: "responseTime", label: "Do sensors respond quickly and trigger alarms promptly upon detection?" }, // Simplified
    { name: "differentiateMechanism", label: "Is there a mechanism to differentiate normal vs. suspicious movement?" }, // Simplified
    { name: "alarmTransmission", label: "Are alarms transmitted to monitoring stations/security in real-time?" }, // Simplified
    // Integration with Alarm Systems
    { name: "systemIntegration", label: "Are motion sensors integrated with the overall intrusion alarm system?" },
    { name: "seamlessCommunication", label: "Do they communicate seamlessly with alarm panels/monitoring stations?" }, // Simplified
    { name: "coordinationAlarmDevices", label: "Is there coordination between sensor activations and other alarm devices (sirens, lights)?" },
    // Remote Monitoring and Management
    { name: "remoteAccess", label: "Is remote access and monitoring functionality available for sensors?" }, // Simplified
    { name: "remoteAdjustments", label: "Can personnel remotely view status, receive alerts, and adjust settings?" }, // Simplified
    { name: "secureAuthentication", label: "Are secure authentication/encryption protocols in place for remote access?" }, // Simplified
    // Durability and Reliability
    { name: "environmentDurability", label: "Are sensors designed to withstand relevant environmental factors?" }, // Simplified
    { name: "materialDurability", label: "Are they constructed from durable materials (especially if outdoors)?" }, // Simplified
    { name: "sensorCertification", label: "Have sensors undergone testing or certification for reliability/durability?" },
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for motion sensors?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (testing, battery replacement, cleaning) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
];


function MotionSensorsPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  // Renamed variable for clarity and consistency with function name string
  const uploadMotionSensorsPageImage = httpsCallable(functions, 'uploadMotionSensorsPageImage');

  // State variables look good
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // useEffect for fetching data - Looks good
  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress'); // Ensure path is correct
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
       // Correct Firestore path
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);

      try {
        const docSnapshot = await getDoc(formDocRef);
        if (docSnapshot.exists()) {
          const existingData = docSnapshot.data().formData || {};
          setFormData(existingData);
          if (existingData.imageUrl) {
            setImageUrl(existingData.imageUrl);
          }
        } else {
          setFormData({});
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

  // handleChange saves data immediately with correct structure
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (buildingId) {
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);
            const dataToSave = {
                 ...newFormData,
                 building: buildingRef,
                 ...(imageUrl && { imageUrl: imageUrl })
             };
            await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            // console.log("Form data updated:", dataToSave);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            // Avoid alerting on every change
        }
    }
  };

  // handleImageChange using base64 - Looks good
  const handleImageChange = (e) => {
     const file = e.target.files[0];
     if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
             setImageData(reader.result);
             setImageUrl(null);
             setImageUploadError(null);
         };
         reader.readAsDataURL(file);
     } else {
         setImageData(null);
     }
  };

  // handleBack - Looks good
  const handleBack = () => {
    navigate(-1);
  };

  // handleSubmit uses Cloud Function and setDoc with correct structure
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
      alert('Building ID is missing. Cannot submit.');
      return;
    }

    setLoading(true);
    let finalImageUrl = formData.imageUrl || null;
    let submissionError = null;

    if (imageData) {
      try {
        console.log("Uploading image via Cloud Function...");
        // Use correct function variable name
        const uploadResult = await uploadMotionSensorsPageImage({
            imageData: imageData,
            buildingId: buildingId
         });
        finalImageUrl = uploadResult.data.imageUrl;
        setImageUrl(finalImageUrl);
        setImageUploadError(null);
        console.log("Image uploaded successfully:", finalImageUrl);
      } catch (error) {
        console.error('Error uploading image via function:', error);
        setImageUploadError(`Image upload failed: ${error.message}`);
        submissionError = "Image upload failed. Form data saved without new image.";
         finalImageUrl = formData.imageUrl || null;
      }
    }

    const finalFormData = {
         ...formData,
         imageUrl: finalImageUrl,
    };
    setFormData(finalFormData);

    try {
      console.log("Saving final form data to Firestore...");
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);
      await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
      console.log('Form data submitted successfully!');
      if (!submissionError) {
          alert('Form submitted successfully!');
      } else {
          alert(submissionError);
      }
      navigate('/Form');
    } catch (error) {
      console.error("Error saving final form data to Firestore:", error);
      alert("Failed to save final form data. Please check connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading/Error Display - Looks good
  if (loading) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return <div>Error: {loadError}</div>;
  }

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Motion Sensors Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Motion Sensor Assessment Questions</h2> {/* Simplified heading */}

          {/* Single .map call for all questions with standardized rendering */}
          {motionSensorQuestions.map((question, index) => (
            <div key={question.name} className="form-section"> {/* Use name for key */}
              <label>{question.label}</label>
              {/* Div for radio buttons */}
              <div>
                <input
                  type="radio"
                  id={`${question.name}_yes`}
                  name={question.name}
                  value="yes"
                  checked={formData[question.name] === "yes"}
                  onChange={handleChange}
                /> <label htmlFor={`${question.name}_yes`}>Yes</label>
                <input
                  type="radio"
                  id={`${question.name}_no`}
                  name={question.name}
                  value="no"
                  checked={formData[question.name] === "no"}
                  onChange={handleChange}
                /> <label htmlFor={`${question.name}_no`}>No</label>
              </div>
              {/* Input for comments */}
              <input
                className='comment-input'
                type="text"
                name={`${question.name}Comment`}
                placeholder="Additional comments"
                value={formData[`${question.name}Comment`] || ''}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Image upload section - Looks good */}
          <div className="form-section">
               <label htmlFor="imageUploadMotionSensor">Upload Image (Optional):</label>
               <input id="imageUploadMotionSensor" type="file" onChange={handleImageChange} accept="image/*" />
               {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Motion Sensor" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageData && <img src={imageData} alt="Preview Motion Sensor" style={{ maxWidth: '200px', marginTop: '10px' }} />}
               {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Final'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default MotionSensorsPage;