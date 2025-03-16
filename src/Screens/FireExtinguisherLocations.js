import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function FireExtinguisherLocationsFormPage() {
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
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Emergency Preparedness/Fire Extinguisher Locations');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Fire Extinguisher Locations');
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
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Fire Extinguisher Locations Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.1.2 Visibility and Accessibility */}
                <h2>Visibility and Accessibility:</h2>
                <div className="form-section">
                <label>Are fire extinguishers located in easily accessible locations throughout the premises?</label>
                    <div>
                        <input type="radio" name="fire extinguishers accessible" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="fire extinguishers accessible" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="fire extinguishers accessible-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?</label>
                    <div>
                        <input type="radio" name="extinguisher placement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher placement" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher placement-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are extinguisher locations clearly marked and visible to occupants, including visitors and employees?</label>
                    <div>
                        <input type="radio" name="Visible extinguisher locations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Visible extinguisher locations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Visible extinguisher locations-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are extinguishers mounted at appropriate heights and locations to facilitate quick retrieval in case of fire emergencies?</label>
                    <div>
                        <input type="radio" name="extinguishers heights locations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguishers heights locations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguishers heights locations-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Distribution and Coverage:</h2>
                <div className="form-section">
                <label>Are fire extinguishers distributed strategically to provide adequate coverage of all areas, including high-risk zones and confined spaces?</label>
                    <div>
                        <input type="radio" name="strategic extinguisher placement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="strategic extinguisher placement" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="strategic extinguisher placement-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?</label>
                    <div>
                        <input type="radio" name="extinguisher placement regulation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher placement regulation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher placement regulation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are there sufficient numbers of extinguishers available to meet the needs of the building size and occupancy load?</label>
                    <div>
                        <input type="radio" name="sufficient extinguishers number" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="sufficient extinguishers number" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="sufficient extinguishers number-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Proper Mounting and Maintenance:</h2>
                <div className="form-section">
                <label>Are fire extinguishers securely mounted on brackets or stands to prevent accidental displacement or damage?</label>
                    <div>
                        <input type="radio" name="extinguisher securely mounted" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher securely mounted" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher securely mounted-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are extinguishers inspected regularly to ensure they are in good working condition and free from damage or tampering?</label>
                    <div>
                        <input type="radio" name="regular extinguisher inspection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regular extinguisher inspection" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regular extinguisher inspection-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Is there a maintenance schedule in place for servicing extinguishers, including inspections, testing, and recharging as needed?</label>
                    <div>
                        <input type="radio" name="regular extinguisher maintainance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regular extinguisher maintainance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regular extinguisher maintainance-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Identification and Signage:</h2>
                <div className="form-section">
                <label>Are fire extinguishers clearly labeled with appropriate signage indicating the type of extinguisher and its intended use?</label>
                    <div>
                        <input type="radio" name="extinguisher clearly labeled" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher clearly labeled" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher clearly labeled-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are extinguisher locations identified on building maps or evacuation plans, both in physical form and electronically if applicable?</label>
                    <div>
                        <input type="radio" name="extinguisher location identified" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher location identified" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher location identified-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Is there training provided to occupants on how to locate and use fire extinguishers effectively during emergencies?</label>
                    <div>
                        <input type="radio" name="occupant training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="occupant training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="occupant training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Training and Education:</h2>
                <div className="form-section">
                <label>Are staff members and occupants trained in the proper use of fire extinguishers as part of their fire safety training?</label>
                    <div>
                        <input type="radio" name="user training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="user training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="user training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Do occupants understand the types of fires that can be safely extinguished with portable extinguishers and when to evacuate instead?</label>
                    <div>
                        <input type="radio" name="occupants fire understanding" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="occupants fire understanding" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="occupants fire understanding-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are regular fire drills conducted to reinforce training and familiarize occupants with fire extinguisher locations and procedures?</label>
                    <div>
                        <input type="radio" name="regular fire drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regular fire drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regular fire drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Emergency Response Integration:</h2>
                <div className="form-section">
                <label>Are fire extinguishers integrated into the overall emergency response plan for the premises?</label>
                    <div>
                        <input type="radio" name="fire extinguishers integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="fire extinguishers integration" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="fire extinguishers integration-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Is there coordination between fire extinguisher use and other response actions such as evacuation, alarm activation, and contacting emergency services?</label>
                    <div>
                        <input type="radio" name="extinguisher use coordination" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="extinguisher use coordination" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="extinguisher use coordination-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are designated personnel trained to assess fire situations and determine when it is safe and appropriate to use extinguishers before evacuation?</label>
                    <div>
                        <input type="radio" name="designated trained personnel " value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="designated trained personnel " value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="designated trained personnel-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Record Keeping and Documentation:</h2>
                <div className="form-section">
                <label>Is there a record keeping system in place to document the location, inspection dates, and maintenance history of fire extinguishers?</label>
                    <div>
                        <input type="radio" name="record keeping system" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="record keeping system" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="record keeping system-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="recordKeepingSystem" placeholder="Describe the system" />
                    </div>
                </div>

                <div className="form-section">
                <label>Are records maintained in compliance with relevant regulations and standards, and are they readily accessible for review by authorities or inspectors?</label>
                    <div>
                        <input type="radio" name="maintaining records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="maintaining records" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="maintaining records-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                <label>Are deficiencies or issues identified during inspections promptly addressed and documented, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="issues identified" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="issues identified" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="issues identified-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default FireExtinguisherLocationsFormPage;