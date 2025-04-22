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
        "Community Partnership": [
            "Active Shooter Drills with Police",
            "Assessing Community Needs and Priorities",
            "Back-to-School Nights",
            "Classroom Helpers",
            "Crisis Intervention Workshops",
            "Emergency Response Training2",
            "Feedback Collection from Community",
            "Fire Department Access to School Facilities",
            "Fire Drills and Evacuation Planning",
            "Fire Safety Education for Students",
            "Firefighter Training Sessions",
            "Fundraising Events",
            "Mutual Aid Agreements",
            "Parent Chaperones for Field Trips",
            "Parent Workshops on Student Safety",
            "Parent-Teacher Conferences",
            "Planning Community Outreach Strategies",
            "SRO Roles and Responsibilities",
            "SRO Training and Certification"
        ],
        "Continuous Improvement - Safety and Security": [
            "Access Control Systems Assessment",
            "Backup Systems and Redundancies",
            "Biometric Access Control Systems",
            "CCTV Camera Installation and Monitoring",
            "Communication Protocols2",
            "Critical Function Identification",
            "Cybersecurity Vulnerability Assessment",
            "Data Encryption Protocols",
            "Endpoint Security Solutions",
            "Enviromental Hazards Assessment",
            "Evacuation Procedures Training",
            "External Communication Protocols",
            "External Threats",
            "Fire Drills 2",
            "Fire Safety Training",
            "Firewall Implementation and Configuration",
            "Identifying Suspicious Behavior 2",
            "Internal Communication Protocols",
            "Internal Threats",
            "Intrusion Detection Systems 3",
            "Intrusion Prevention Systems",
            "Keycard Access Systems",
            "Likelihood and Impact Assessment",
            "Lockdown Drills 3",
            "Perimter Security Evaluations",
            "Perimter Security Fencing",
            "Physical Hazards Assesment",
            "Regular Data Backups",
            "Response To Security Threats",
            "Roles and Responsilibilities of Emergency Response Team",
            "Safety and Security Training",
            "Simulated Emergency Drills"
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
            "Vehicle Barriers",
            "Visitor Check-In",
            "WeatherProof Cameras",
            "Weatherproof Cameras",
            "Window Locks"
        ],
        "Policy and Compliance": [
            "Access Restrictions",
            "Compliance with Regulations",
            "Consent Management",
            "Data Access Controls",
            "Data Breach Notification Procedures",
            "Data Classification",
            "Data Minimization",
            "Data Protection Impact Assessments",
            "Data Retention Periods",
            "Data Security Requirements",
            "Data Sharing Policies",
            "Documentation Of Policy Changes",
            "Effectiveness In Addressing Security Risks",
            "Encrpytion Requirements",
            "Personal Device Usage",
            "Policy Revision Approval Workflow",
            "Staff input On Policy Impact",
            "Student Data Privacy Policies",
            "Student Privacy Rights"
        ]
    };

    const getAssessmentDetails = useCallback(async (doc, category1, category2) => {
        try {
            const data = doc.data();
            console.log(`Assessment Details found for ${doc.id}:`, data);

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
                    const q = query(collectionRef, where('formData.building', '==', buildingRef)); // Corrected Query
                    const promise = getDocs(q);
                    allPromises.push(promise);
                    console.log("Promise Pushed:", promise);
                }
            }
        }

        try {
            const snapshots = await Promise.all(allPromises);
            console.log("Snapshots:", snapshots);

            let i = 0;
            for (const category1 of formCategories) {
                if (subCategories[category1]) {
                    for (const category2 of subCategories[category1]) {
                        const snapshot = snapshots[i];
                        snapshot.forEach(doc => {
                            console.log("Document Data from Query:", doc.data());
                            console.log("Building Reference from Document:", doc.data().formData.building);
                            allAssessments.push({
                                doc: doc,
                                category1: category1,
                                category2: category2
                            });
                        });
                        i++;
                    }
                }
            }
            const assessmentDetails = await Promise.all(allAssessments.map(assessment => {
                console.log("Mapping assessment:", assessment);
                const details = getAssessmentDetails(assessment.doc, assessment.category1, assessment.category2);
                console.log("Assessment details returned:", details);
                return details;
            }));

            console.log("Assessment details before set state:", assessmentDetails);
            setAssessments(assessmentDetails);
            console.log("Assessment Details:", assessments);
        } catch (error) {
            console.error("Error fetching assessments:", error);
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
        console.log("Selected Building ID:", buildingId);
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
                            console.log("Rendering assessment:", assessment);
                            return (
                                <li key={assessment.id}>
                                    <h3>{assessment.formName || 'N/A'}</h3>
                                    <p>Form Type: {assessment.formType || 'N/A'}</p>
                                    <p>Building: {assessment.building?.id || 'Assessment ID not found'}</p>
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