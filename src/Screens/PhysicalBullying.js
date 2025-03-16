import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PhysicalBullyingFormPage() {
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Physical Bullying');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Physical Bullying');
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
            <h1>Physical Bullying Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.1.2 Physical Bullying */}
                <h2>Identification and Recognition:</h2>
                <div className="form-section">
                    <label>How are students educated on recognizing physical bullying behaviors, such as pushing, hitting, kicking, or other forms of physical aggression, and distinguishing them from rough play or consensual interaction?</label>
                    <div>
                        <input type="text" name="recognizingBullying" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What proactive measures are in place to empower students to identify signs of physical bullying, including changes in behavior, unexplained injuries, or reluctance to attend school, and to report incidents to trusted adults or authorities?</label>
                    <div>
                        <input type="text" name="proactiveMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Prevention and Intervention:</h2>
                <div className="form-section">
                    <label>What preventive strategies and intervention protocols are implemented to address physical bullying incidents promptly and effectively, including clear reporting procedures, designated staff responsibilities, and consequences for perpetrators?</label>
                    <div>
                        <input type="text" name="preventionStrategies" placeholder="Describe the strategies and protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to advocate for themselves and others when witnessing physical bullying, and what support mechanisms or bystander intervention strategies are promoted to foster a culture of collective responsibility and mutual respect?</label>
                    <div>
                        <input type="text" name="bystanderSupport" placeholder="Describe the strategies and protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Safety Measures and Environment Design:</h2>
                <div className="form-section">
                    <label>What measures are taken to ensure the physical safety and well-being of students within the school environment, including supervision during transition periods, monitoring of high-risk areas, and implementation of proactive measures to prevent conflicts and aggression?</label>
                    <div>
                        <input type="text" name="safetyMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there physical modifications or environmental adjustments made to reduce opportunities for physical bullying, such as improved lighting, surveillance cameras, or designated safe zones, and how are these measures communicated to students and staff?</label>
                    <div>
                        <input type="text" name="environmentModifications" placeholder="Describe the modifications/adjustments" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Support and Counseling Services:</h2>
                <div className="form-section">
                    <label>How are students affected by physical bullying provided with immediate support and access to counseling services to address their emotional and psychological well-being, including trauma-informed care, crisis intervention, and ongoing support for recovery and resilience-building?</label>
                    <div>
                        <input type="text" name="counselingSupport" placeholder="Describe how they're affected" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols in place for engaging with parents or guardians of students involved in physical bullying incidents, including communication about the incident, collaboration on intervention strategies, and referrals to external support services as needed?</label>
                    <div>
                        <input type="text" name="parentProtocols" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Restorative Justice and Conflict Resolution:</h2>
                <div className="form-section">
                    <label>Can you describe any restorative justice practices or conflict resolution techniques employed to address physical bullying incidents, including opportunities for dialogue, mediation, and reconciliation between parties involved, and how are these approaches integrated into the school's disciplinary framework?</label>
                    <div>
                        <input type="text" name="restorativePractices" placeholder="Describe the practices" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students supported in understanding the impact of their actions, taking responsibility for their behavior, and developing empathy and accountability in resolving conflicts and repairing harm caused by physical bullying incidents?</label>
                    <div>
                        <input type="text" name="accountabilitySupport" placeholder="Describe how they're supported" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Partnerships and Collaboration:</h2>
                <div className="form-section">
                    <label>Are there partnerships with local law enforcement agencies, community organizations, or youth-serving agencies to address issues of physical bullying comprehensively, including joint initiatives, resource-sharing, and coordination of support services for affected students and families?</label>
                    <div>
                        <input type="text" name="communityPartnerships" placeholder="Describe the agencies/organizations" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are community stakeholders engaged in prevention efforts, awareness campaigns, and capacity-building activities to address the root causes of physical bullying and promote a culture of respect, empathy, and nonviolence within the broader community?</label>
                    <div>
                        <input type="text" name="stakeholderEngagement" placeholder="Describe how they're engaged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of interventions targeting physical bullying regularly assessed and evaluated, including data collection on incident reports, disciplinary actions, student surveys, and feedback from staff, students, and parents?</label>
                    <div>
                        <input type="text" name="interventionEffectiveness" placeholder="Describe how it's assessed and evaluated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for ongoing review and refinement of anti-bullying policies, procedures, and programming based on evidence-based practices, best available research, and input from stakeholders to ensure continuous improvement in addressing physical bullying within the school community?</label>
                    <div>
                        <input type="text" name="policyRefinement" placeholder="Describe the mechanisms" onChange={handleChange}/>
                    </div>
                </div>
            
                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default PhysicalBullyingFormPage;