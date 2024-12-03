import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MentalHealthServicesFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

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

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Mental Health Services');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Mental Health Services Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.2.3 Mental Health Services */}
                <h2>Availability and Accessibility:</h2>
                <div className="form-section">
                    <label>How are mental health services, crisis intervention resources, and support networks identified and established as essential resources for addressing mental health needs, psychological trauma, and emotional crises within the community?</label>
                    <div>
                        <input type="text" name="mentalHealthIdentificationCriteria" placeholder="Describe how they're identified" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are considered when assessing the availability, accessibility, and suitability of mental health services to meet the diverse needs of individuals, families, and populations affected by emergencies, disasters, or other traumatic events?</label>
                    <div>
                        <input type="text" name="mentalHealthAccessibilityCriteria" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Collaborative Service Delivery:</h2>
                <div className="form-section">
                    <label>How do schools collaborate with mental health professionals, counseling centers, crisis hotlines, and community-based organizations to provide coordinated and integrated mental health support services to students, staff, families, and community members?</label>
                    <div>
                        <input type="text" name="mentalHealthCollaboration" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are partnerships formed to enhance access to crisis intervention resources, psychological first aid, counseling services, and other evidence-based mental health interventions within the school setting and the broader community?</label>
                    <div>
                        <input type="radio" name="mentalHealthPartnerships" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="mentalHealthPartnerships" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Crisis Response and Intervention:</h2>
                <div className="form-section">
                    <label>What protocols, procedures, and referral mechanisms are in place to facilitate timely access to mental health services, crisis intervention resources, and specialized support for individuals experiencing emotional distress, psychological trauma, or mental health crises during emergencies or critical incidents?</label>
                    <div>
                        <input type="text" name="crisisResponseProtocols" placeholder="Describe the protocols/procedures/mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are crisis response teams, mobile crisis units, or telehealth platforms utilized to provide immediate assessments, interventions, and follow-up care for individuals in need of mental health support, including students, staff, first responders, and community members?</label>
                    <div>
                        <input type="radio" name="mobileCrisisIntervention" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="mobileCrisisIntervention" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Resource Coordination and Capacity Building:</h2>
                <div className="form-section">
                    <label>How are mental health resources, funding, and staffing coordinated and allocated to address the increased demand for mental health services during emergencies, disasters, or other traumatic events affecting the community?</label>
                    <div>
                        <input type="text" name="mentalHealthResourceCoordination" placeholder="Describe how they're coordinated/allocated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are efforts made to build capacity, enhance resilience, and expand the reach of mental health services through training, workforce development, peer support networks, and community partnerships aimed at promoting mental health literacy, awareness, and stigma reduction?</label>
                    <div>
                        <input type="radio" name="mentalHealthCapacityBuilding" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="mentalHealthCapacityBuilding" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Community Outreach and Engagement:</h2>
                <div className="form-section">
                    <label>How are community members informed about the availability, accessibility, and confidentiality of mental health services, crisis intervention resources, and support networks within the community?</label>
                    <div>
                        <input type="text" name="communityMentalHealthEducation" placeholder="Describe how they're informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are educational campaigns, workshops, support groups, and community forums organized to raise awareness, provide psychoeducation, and empower individuals to seek help, self-care strategies, and coping skills for managing mental health challenges, stressors, and traumatic experiences?</label>
                    <div>
                        <input type="radio" name="mentalHealthAwarenessCampaigns" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="mentalHealthAwarenessCampaigns" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default MentalHealthServicesFormPage;