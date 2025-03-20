import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import './PastAssessments.css';

function PastAssessments() {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [assessments, setAssessments] = useState([]);
    const db = getFirestore();

    const formCategories = [
        "Physical Security",
        "Fire Safety",
        // Add your other top-level categories here
    ];

    const subCategories = {
        "Physical Security": [
            "Access Control Keypads",
            // Add subcategories under Physical Security
        ],
        "Fire Safety": [
            "Sprinklers",
            // Add subcategories under Fire Safety
        ],
        // Add other top-level categories and their subcategories
    };

    const getAssessmentDetails = useCallback(async (formId, category1, category2) => {
        try {
            const docRef = doc(db, `forms/${category1}/${category2}/${formId}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return { id: formId, ...data, formType: `${category1} - ${category2}` };
            } else {
                console.log(`Document not found: forms/${category1}/${category2}/${formId}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching assessment details: forms/${category1}/${category2}/${formId}`, error);
            return null;
        }
    }, [db]);

    const fetchAssessments = useCallback(async (buildingId) => {
        if (!buildingId) {
            setAssessments([]);
            return;
        }

        const allAssessments = [];
        for (const category1 of Object.keys(subCategories)) {
            for (const category2 of subCategories[category1]) {
                try {
                    const formsCollectionRef = collection(db, `forms/${category1}/${category2}`);
                    const q = query(formsCollectionRef, where('building', '==', buildingId));
                    const querySnapshot = await getDocs(q);

                    for (const doc of querySnapshot.docs) {
                        try {
                          const assessmentData = await getAssessmentDetails(doc.id, category1, category2);
                          if (assessmentData) {
                            allAssessments.push(assessmentData);
                          }
                        } catch (innerError) {
                          console.error(`Error processing document ${doc.id} in ${category1}/${category2}:`, innerError);
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching from ${category1}/${category2}:`, error);
                }
            }
        }

        setAssessments(allAssessments);
    }, [db, subCategories, getAssessmentDetails]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const buildingsRef = collection(db, 'Buildings');
                const querySnapshot = await getDocs(buildingsRef);
                const buildingData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBuildings(buildingData);
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchBuildings();
    }, []);

    const handleBuildingChange = (event) => {
        const buildingId = event.target.value;
        setSelectedBuilding(buildingId);
        fetchAssessments(buildingId);
    };

    return (
        <div className="past-assessments-container">
            <header className="header">
                <h1>Past Assessments</h1>
            </header>

            <section className="filters">
                <div className="filter-group">
                    <label htmlFor="building">Building:</label>
                    <select id="building" name="building" value={selectedBuilding} onChange={handleBuildingChange}>
                        <option value="">Select Building</option>
                        {buildings.map((building) => (
                            <option key={building.id} value={building.id}>
                                {building.buildingName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add other filter options here (date range, etc.) */}
            </section>

            <section className="assessments-list">
                <h2>Assessments:</h2>
                <p>Selected Building: {selectedBuilding || "No building selected"}</p>
                <ul className="assessments-ul">
                    {assessments.length > 0 ? (
                        assessments.map((assessment) => (
                            <li key={assessment.id}>
                                <h3>{assessment.formName || 'Form Name'}</h3>
                                <p>Form Type: {assessment.formType}</p>
                                <p>Building: {assessment.building}</p>
                                <p>Submission Date: {assessment.submissionDate?.toDate().toLocaleDateString() || 'N/A'}</p>
                                <button>View Details</button>
                            </li>
                        ))
                    ) : (
                        <p>No assessments found for this building.</p>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default PastAssessments;
