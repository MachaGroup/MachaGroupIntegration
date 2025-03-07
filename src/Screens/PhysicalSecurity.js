import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, Timestamp, query, where, getDocs, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './PhysicalSecurity.css';
import logo from '../assets/MachaLogo.png';

function PhysicalSecurityPage() {
  const navigate = useNavigate();
  const db = getFirestore();

  // Form state
  const [accessControl, setAccessControl] = useState('');
  const [surveillanceSystems, setSurveillanceSystems] = useState('');
  const [securityPersonnel, setSecurityPersonnel] = useState('');
  const [formDocId, setFormDocId] = useState(null);

  // Autosave every 15 seconds
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      console.log('Autosaving...');
      handleAutoSave();
    }, 15000); // Save every 15 seconds

    return () => clearInterval(autosaveInterval); // Cleanup on unmount
  }, [accessControl, surveillanceSystems, securityPersonnel]);

  // Function to handle auto-saving
  const handleAutoSave = async () => {
    if (!accessControl && !surveillanceSystems && !securityPersonnel) {
      console.log('Skipping autosave: All fields are empty.');
      return;
    }

    try {
      if (formDocId) {
        // Update existing document
        const formRef = doc(db, 'PhysicalSecurityForms', formDocId);
        await updateDoc(formRef, {
          accessControl,
          surveillanceSystems,
          securityPersonnel,
          timestamp: Timestamp.now(),
        });
        console.log('Autosave: Updated form in Firestore.');
      } else {
        // Check if a form exists
        const q = query(collection(db, 'PhysicalSecurityForms'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Update existing form
          const existingForm = querySnapshot.docs[0];
          setFormDocId(existingForm.id);
          const formRef = doc(db, 'PhysicalSecurityForms', existingForm.id);
          await updateDoc(formRef, {
            accessControl,
            surveillanceSystems,
            securityPersonnel,
            timestamp: Timestamp.now(),
          });
          console.log('Autosave: Found and updated existing form.');
        } else {
          // Create a new form document
          const newFormRef = await addDoc(collection(db, 'PhysicalSecurityForms'), {
            accessControl,
            surveillanceSystems,
            securityPersonnel,
            timestamp: Timestamp.now(),
          });
          setFormDocId(newFormRef.id);
          console.log('Autosave: New form created in Firestore.');
        }
      }
    } catch (error) {
      console.error('Error autosaving form:', error);
    }
  };

  // Handle navigation and force save
  const handleButtonClick = async (section, route) => {
    console.log(`Saving before navigating to ${route}...`);
    await handleAutoSave(); // Save immediately before navigating
    navigate(route);
  };

  return (
    <div className="form-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Physical Security Section */}
      <main className="form-container">
        <h2>Physical Security</h2>
        <form>
          {/* Access Control Input */}
          <div className="form-section">
            <label>Access Control</label>
            <input
              type="text"
              value={accessControl}
              onChange={(e) => setAccessControl(e.target.value)}
              placeholder="Enter Access Control details"
            />
            <button type="button" className="form-button" onClick={() => handleButtonClick('Access Control', '/Access')}>
              Enter Here
            </button>
          </div>

          {/* Surveillance Systems Input */}
          <div className="form-section">
            <label>Surveillance Systems</label>
            <input
              type="text"
              value={surveillanceSystems}
              onChange={(e) => setSurveillanceSystems(e.target.value)}
              placeholder="Enter Surveillance Systems details"
            />
            <button type="button" className="form-button" onClick={() => handleButtonClick('Surveillance Systems', '/surveillance')}>
              Enter Here
            </button>
          </div>

          {/* Security Personnel Input */}
          <div className="form-section">
            <label>Security Personnel</label>
            <input
              type="text"
              value={securityPersonnel}
              onChange={(e) => setSecurityPersonnel(e.target.value)}
              placeholder="Enter Security Personnel details"
            />
            <button type="button" className="form-button" onClick={() => handleButtonClick('Security Personnel', '/security-personnel')}>
              Enter Here
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PhysicalSecurityPage;
