import React, { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './PastAssessments.css';

function PastAssessments() {
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const db = getFirestore();
    const navigate = useNavigate();

    const formCategories = [
        "Community Partnership",
        "Continuous Improvement - Safety and Security",
        "Cybersecurity",
        "Emergency Preparedness",
        "Personnel Training and Awareness",
        "Physical Security",
        "Policy and Compliance"
    ];

    const subCategories = {
        "Community Partnership": [],
        "Continuous Improvement - Safety and Security": [
            "Biometric Access Control Systems"
        ],
        "Cybersecurity": [
            "Access Control Lists",
            "Antivirus Software",
            "Device Encryption",
            "Firewall Policies",
            "Incident Response Patch Management",
            "Malware Removal Tools",
            "Network Anomaly Detection",
            "Patch Management",
            "Security Information and Event Management"
        ],
        "Emergency Preparedness": [
            "Classroom Lockdownm Protocols",
            "Conflict Resolution",
            "Disaster Drills",
            "Drill Scenerios",
            "Earthquake Drills",
            "Emergency Communication",
            "Evacuation Procedures",
            "Fire Alarm Systems",
            "Fire Drill",
            "Fire Extinguisher Locations",
            "First Aid Response",
            "Law Enforcement Coordination",
            "Lockdown Communication Protocols",
            "Severe Weather Monitoring",
            "Tornado Drills",
            "Tornado Shelter Locations"
        ],
        "Personnel Training and Awareness": [
            "Acceptable Use Policy Training",
            "Active Shooter Response",
            "Anonymous Reporting Systems",
            "Basic First Aid Techniques",
            "CPR Certification",
            "Curriculum Integration",
            "Cyber Bullying",
            "Data Handling Guidelines",
            "Data Protection",
            "Emergency Communication",
            "Emergency Contacts",
            "Emergency Evacuation Procedures",
            "Emergency Response Protocols",
            "Emergency Shelters",
            "Fire Department Collaboration",
            "Fire Drills",
            "First Aid CPR Training",
            "Healthcare Provider Engagement",
            "Identifying Suspicious Behavior",
            "Incident Reporting Procedures",
            "Internet Safety",
            "Law Enforcement Partnerships",
            "Lockdown Drills",
            "Medical Facilities",
            "Parent Advisory Committees",
            "Parent Involvement",
            "Parent Volunteer Programs",
            "Parent-Teacher Associations",
            "Password Security",
            "Peer Support Networks",
            "Phishing Awareness",
            "Physical Bullying",
            "Post-Incident Support",
            "Recertification Schedule",
            "Recognizing Security Breaches",
            "Recognizing Security Incidents",
            "Response Protocols",
            "Role-PLaying Scenarios",
            "Safety Demonstrations",
            "Safety Workshop",
            "Severe Weather Preparedness",
            "Stranger Danger Awareness",
            "Student Handbook",
            "Student Leadership",
            "Training Materials",
            "Training Providers",
            "Trusted Adults",
            "Verbal Bullying"
        ],
        "Physical Security": [
            "Access Control Keypads",
            "Access Control Software",
            "Access Control Systems",
            "Biometric Scanners",
            "Bullet Cameras",
            "Card Readers",
            "Dome Cameras",
            "Door Alarms",
            "Door Locks",
            "Fence Sensors",
            "Floodlights",
            "Front Desk Security",
            "Gate Alarms",
            "Glass Break Sensors",
            "Infrared Cameras",
            "Motion Activated Lights",
            "Motion Sensors",
            "PTZ Cameras",
            "Perimeter Fencing",
            "Razor Wire",
            "Roving Patrols",
            "Security Gates",
            "Stationed Guards",
            "Turnstiles",
            "Vehicle Barrier",
            "Visitor Check-In",
            "WeatherProof Cameras",
            "Window Locks"
        ],
        "Policy and Compliance": [
            "Access Restrictions",
            "Data Classification",
            "Data Minimization",
            "Data Retention Periods",
            "Data Sharing Policies",
            "Personal Device Usage",
            "Student Privacy Rights"
        ]
    };

    const getAssessmentDetails = useCallback(async (doc, category1, category2) => {
        try {
            const data = doc.data();
            console.log(`Assessment Details found for ${doc.id}:`, data);

            //  Use the provided category1 and category2 values
            const formName = category1 || 'N/A';
            const formType = category2 || 'N/A';

            return {
                id: doc.id,
                ...data,
                formName: formName,
                formType: formType,
            };
        } catch (error) {
            console.error(`Error processing assessment details:`, error);
            setError("Error processing assessment details.");
            return null;
        }
    }, []);

    const fetchAssessments = useCallback(async (buildingId) => {
        setLoading(true);
        setError(null);
        setAssessments([]);
        if (!buildingId) {
            setLoading(false);
            return;
        }

        console.log("Selected Building ID:", buildingId);
        const buildingRef = doc(db, "Buildings", buildingId);
        console.log("Building Reference:", buildingRef);

        try {
            const buildingSnap = await getDoc(buildingRef);
            if (buildingSnap.exists()) {
                console.log("Building Document Data:", buildingSnap.data());
            } else {
                console.log("Building Document not found!");
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error("Error fetching building document:", error);
            setError("Error fetching building document.");
            setLoading(false);
            return;
        }

        const allAssessments = [];
        const allPromises = [];

        for (const category1 of formCategories) {
            if (subCategories[category1]) {
                for (const category2 of subCategories[category1]) {
                    const collectionRef = collection(db, `forms/${category1}/${category2}`);
                    const q = query(collectionRef, where('building', '==', buildingRef));
                    allPromises.push(getDocs(q));
                }
            }
        }
        try {
            const snapshots = await Promise.all(allPromises);

            let i = 0;
            for (const category1 of formCategories) {
                if (subCategories[category1]) {
                    for (const category2 of subCategories[category1]) {
                        const snapshot = snapshots[i];
                        snapshot.forEach(doc => {
                            allAssessments.push({
                                doc: doc,
                                category1: category1,
                                category2: category2
                            });
                        })
                        i++;
                    }
                }
            }
            const assessmentDetails = await Promise.all(allAssessments.map(assessment => getAssessmentDetails(assessment.doc, assessment.category1, assessment.category2)));
            setAssessments(assessmentDetails.map(detail => ({
                ...detail,
                category1: detail.formName, // Use formName as category1
                category2: detail.formType  // Use formType as category2
            })));
        } catch (error) {
            console.error("Error fetching assessments:", error)
            setError("Error fetching assessments");
        } finally {
            setLoading(false);
        }
    }, [db, formCategories, subCategories, getAssessmentDetails]);

    const [buildings, setBuildings] = useState([]);
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
                console.log("Fetched Buildings:", buildingData);
            } catch (error) {
                console.error('Error fetching buildings:', error);
                setError("Error fetching building data.");
            }
        };
        fetchBuildings();
    }, []);

    const handleBuildingChange = (event) => {
        const buildingId = event.target.value;
        setSelectedBuilding(buildingId);
        fetchAssessments(buildingId);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleViewDetails = (assessment) => {
        console.log('Navigating to details:', assessment);
        navigate(`/assessment/${assessment.id}`, {
            state: {
                category1: assessment.formName,
                category2: assessment.formType
            }
        });
    };

    return (
        <div className="past-assessments-container">
            <header className="header">
                <button onClick={handleBackClick}>Back</button>
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
            </section>

            <section className="assessments-list">
                <h2>Assessments:</h2>
                {loading && <p>Loading assessments...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <p>Selected Building: {selectedBuilding || "No building selected"}</p>
                <ul className="assessments-ul">
                    {assessments.length > 0 ? (
                        assessments.map((assessment) => {
                            console.log("Current Assessment:", assessment);
                            return (
                                <li key={assessment.id}>
                                    <h3>{assessment.formName || 'N/A'}</h3>
                                    <p>Form Type: {assessment.formType || 'N/A'}</p>
                                    <p>Building: {assessment.building?.id || 'Building ID not found'}</p>
                                    <button onClick={() => handleViewDetails(assessment)}>View Details</button>
                                </li>
                            );
                        })
                    ) : (
                        <p>No assessments found for this building.</p>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default PastAssessments;
