import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function TornadoShelterLocationsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
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
  
  // Function to handle back button
  const handleBack = () => {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Tornado Shelter Locations');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Tornado Shelter Locations Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.3.2 Tornado Shelter Locations */}
                <h2>Identification of Shelter Areas:</h2>
                <div className="form-section">
                    <label>Have designated tornado shelter areas been identified throughout the facility?</label>
                    <div>
                        <input type="radio" name="Shelter Identified" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Shelter Identified" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas located in structurally sound spaces that provide protection from flying debris and structural collapse?</label>
                    <div>
                        <input type="radio" name="Structural Soundness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Structural Soundness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas easily accessible to all occupants, including individuals with disabilities or mobility limitations?</label>
                    <div>
                        <input type="radio" name="Accessibility Check" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Accessibility Check" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Signage and Markings:</h2>
                <div className="form-section">
                    <label>Are tornado shelter areas clearly marked with signage or visual indicators to guide occupants during emergencies?</label>
                    <div>
                        <input type="radio" name="Signage Presence" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Signage Presence" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do signs include directions to shelter areas and instructions for seeking refuge during tornado warnings?</label>
                    <div>
                        <input type="radio" name="Signage Directions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Signage Directions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter locations identified on building maps and evacuation plans distributed to occupants?</label>
                    <div>
                        <input type="radio" name="Shelter on Maps" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Shelter on Maps" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Capacity and Space Requirements:</h2>
                <div className="form-section">
                    <label>Have shelter areas been assessed to ensure they can accommodate the facility's maximum occupancy load?</label>
                    <div>
                        <input type="radio" name="Occupancy Assessment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupancy Assessment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there sufficient space within shelter areas to provide comfortable seating or standing room for occupants during extended sheltering periods?</label>
                    <div>
                        <input type="radio" name="Space Sufficiency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Space Sufficiency" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have measures been taken to minimize overcrowding and facilitate orderly entry into shelter areas?</label>
                    <div>
                        <input type="radio" name="Overcrowding Measures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Overcrowding Measures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Structural Integrity and Safety Features:</h2>
                <div className="form-section">
                    <label>Have shelter areas been evaluated for structural integrity and resistance to tornado-force winds?</label>
                    <div>
                        <input type="radio" name="Structural Evaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Structural Evaluation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas located in interior spaces or reinforced areas of the building to minimize exposure to external hazards?</label>
                    <div>
                        <input type="radio" name="Hazard Minimization" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Hazard Minimization" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there additional safety features in place, such as reinforced walls, sturdy furniture, or protective barriers, to enhance occupant safety?</label>
                    <div>
                        <input type="radio" name="Safety Features" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Safety Features" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>Are shelter areas accessible to individuals with disabilities, including those who use mobility devices or require assistance?</label>
                    <div>
                        <input type="radio" name="Disability Access" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Disability Access" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have accommodations been made to ensure equal access to shelter areas for all occupants, regardless of physical or cognitive abilities?</label>
                    <div>
                        <input type="radio" name="Accommodations Made" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Accommodations Made" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the accommodations" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated personnel or procedures in place to assist individuals with disabilities during tornado evacuations?</label>
                    <div>
                        <input type="radio" name="Assistance Procedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Assistance Procedures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Communication and Notification:</h2>
                <div className="form-section">
                    <label>Is there a protocol for notifying occupants of tornado warnings and directing them to seek shelter?</label>
                    <div>
                        <input type="radio" name="Warning Protocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Warning Protocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems, such as public address announcements or emergency notifications, used to alert occupants to tornado threats and provide instructions?</label>
                    <div>
                        <input type="radio" name="Communication Systems" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Communication Systems" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the communication systems" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter locations included in communication materials and drills to familiarize occupants with sheltering procedures?</label>
                    <div>
                        <input type="radio" name="Drill Familiarity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Familiarity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Regular Inspections and Maintenance:</h2>
                <div className="form-section">
                    <label>Are shelter areas inspected regularly to ensure they remain in good condition and free from obstructions?</label>
                    <div>
                        <input type="radio" name="Inspection Regularity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Inspection Regularity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is maintenance conducted to address any issues or damage that may compromise the safety and effectiveness of shelter areas?</label>
                    <div>
                        <input type="radio" name="Maintenance Done" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Maintenance Done" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are shelter areas tested periodically during drills to verify their suitability and readiness for use during tornado emergencies?</label>
                    <div>
                        <input type="radio" name="Drill Testing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Testing" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default TornadoShelterLocationsFormPage;