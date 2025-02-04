import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./FormQuestions.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // Track active main section

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSection = (sectionName) => {
    // If the section is already active, collapse it; otherwise, expand it
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };


  const sections = [
    {
      name: "Home",
      path: "/Home",
      subsections: [{ name: "Main", path: "/Main" },
        {name: "Main Form", path: "/Form"}],
    },
    {
      name: "Physical Security",
      path: "/PhysicalSecurity",
      subsections: [
        { name: "Security Gates", path: "/SecurityGates" },
        { name: "Turnstiles", path: "/Turnstiles" },
        { name: "Access Control Systems", path: "/AccessControlSystems" },
        { name: "Card Readers", path: "/CardReaders" },
        { name: "Biometric Scanners", path: "/BiometricScanners" },
        { name: "Access Control Software", path: "/AccessControlSoftware" },
        { name: "Perimeter Fencing", path: "/PerimeterFencing" },
        { name: "Vehicle Barriers", path: "/VehicleBarriers" },
        { name: "Razor Wire", path: "/RazorWire" },
        { name: "Motion Activated Lights", path: "/MotionActivatedLights" },
        { name: "Floodlights", path: "/Floodlights" },
        { name: "Door Locks", path: "/DoorLocks" },
        { name: "Window Locks", path: "/WindowLocks" },
        { name: "Access Control Keypads", path: "/AccessControlKeypads" },
        { name: "Dome Cameras", path: "/DomeCameras" },
        { name: "PTZ Cameras", path: "/PTZCameras" },
        { name: "Bullet Cameras", path: "/BulletCameras" },
        { name: "Weatherproof Cameras", path: "/WeatherproofCameras" },
        { name: "Infrared Cameras", path: "/InfraredCameras" },
        { name: "Motion Sensors", path: "/MotionSensors" },
        { name: "Glass Break Sensors", path: "/GlassBreakSensors" },
        { name: "Door Alarms", path: "/DoorAlarms" },
        { name: "Fence Sensors", path: "/FenceSensors" },
        { name: "Gate Alarms", path: "/GateAlarms" },
        { name: "Stationed Guards", path: "/StationedGuards" },
        { name: "Roving Patrols", path: "/RovingPatrols" },
        { name: "Front Desk Security", path: "/FrontDeskSecurity" },
        { name: "Visitor Check-in", path: "/VisitorCheckIn" },
      ],
    },
    {
      name: "Emergency Preparedness",
      path: "/EmergencyPreparedness",
      subsections: [
        { name: "Conflict Resolution", path: "/ConflictResolution" },
        { name: "Emergency Communication", path: "/EmergencyCommunication" },
        { name: "First Aid Response", path: "/FirstAidResponse" },
        { name: "Evacuation Procedures", path: "/EvacuationProcedures" },
        { name: "Fire Extinguisher Locations", path: "/FireExtinguisherLocations" },
        { name: "Fire Alarm Systems", path: "/FireAlarmSystems" },
        { name: "Classroom Lockdown Protocols", path: "/ClassroomLockdownProtocols" },
        { name: "Lockdown Communication Protocols", path: "/LockdownCommunicationProtocols" },
        { name: "Law Enforcement Coordination", path: "/LawEnforcementCoordination" },
        { name: "Disaster Drills", path: "/DisastorDrills" },
        { name: "Tornado Shelter Locations", path: "/TornadoShelterLocations" },
        { name: "Severe Weather Monitoring", path: "/SevereWeatherMonitoring" },
        { name: "Tornado Drills", path: "/TornadoDrills" },
        { name: "Earthquake Drills", path: "/EarthquakeDrills" },
        { name: "Fire Drill", path: "/FireDrill" },
        { name: "Drill Scenarios", path: "/DrillScenarios" },
        { name: "Lockdown Signal Recognition", path: "/LockdownSignalRecognition" },
        { name: "Staff Roles and Responsibilities", path: "/StaffRolesAndResponsibilities" },
        { name: "Debriefing and Feedback", path: "/DebriefingAndFeedback" },
        { name: "Evacuation Routes Review", path: "/EvacuationRoutesReview" },
        { name: "Drill Frequency", path: "/DrillFrequency" },
        { name: "Speaker Locations", path: "/SpeakerLocations" },
        { name: "Emergency Announcement Protocols", path: "/EmergencyAnnouncementProtocols" },
        { name: "Backup Power Systems", path: "/BackupPowerSystems" },
        { name: "Contact Information Database", path: "/ContactInformationDatabase" },
        { name: "Alert Activation Procedures", path: "/AlertActivationProcedures" },
        { name: "Integration With Parent Communication", path: "/IntegrationWithParentCommunication" },
        { name: "Two-Way Radios", path: "/TwoWayRadios" },
        { name: "Communication Channels", path: "/CommunicationChannels" },
        { name: "Emergency Communication Training", path: "/EmergencyCommunicationTraining" },
        { name: "Communication Platforms", path: "/communication-platforms" },
        { name: "Parent Notification Procedures", path: "/parent-notification-procedures" },
        { name: "Communication Language", path: "/communication-language" },
      ],
    },
    {
      name: "Personnel Training and Awareness",
      path: "/PersonnelTrainingAndAwareness",
      subsections: [
        { name: "Training Providers", path: "/TrainingProviders" },
        { name: "Training Materials", path: "/TrainingMaterials" },
        { name: "Recertification Schedule", path: "/RecertificationSchedule" },
        { name: "Scenario Based Training", path: "/ScenarioBasedTraining" },
        { name: "Emergency Response Protocols", path: "/EmergencyResponseProtocols" },
        { name: "Post Incident Support", path: "/PostIncidentSupport" },
        { name: "First Aid/CPR Training", path: "/FirstAidCPRTraining2" },
        { name: "Basic First Aid Techniques", path: "/BasicFirstAidTechniques" },
        { name: "CPR Certification", path: "/CPRCertification" },
        { name: "AED Training", path: "/AEDTraining" },
        { name: "Active Shooter Response", path: "/ActiveShooterResponse" },
        { name: "Response Protocols", path: "/ResponseProtocols2" },
        { name: "Evacuation Procedures", path: "/EmergencyEvacuationProcedures" },
        { name: "Emergency Communication", path: "/emergency-communication2" },
        { name: "Identifying Suspicious Behavior", path: "/identifying-suspicious-behavior" },
        { name: "Recognizing Security Breaches", path: "/recognizing-security-breaches" },
        { name: "Phishing Awareness", path: "/phishing-awareness2" },
        { name: "Data Protection", path: "/data-protection2" },
        { name: "Acceptable Use Policy (AUP) Training", path: "/AcceptableUsePolicyTraining" },
        { name: "Data Handling Guidelines", path: "/DataHandlingGuidelines" },
        { name: "Recognizing Security Incidents", path: "/recognizing-security-incidents" },
        { name: "Incident Reporting Procedures", path: "/incident-reporting-procedures" },
        { name: "Curriculum Integration", path: "/CurriculumIntegration" },
        { name: "Student Handbooks", path: "/StudentHandbooks" },
        { name: "Parent Involvement", path: "/ParentInvolvement" },
        { name: "Fire Drills", path: "/FireDrills" },
        { name: "Lockdown Drills", path: "/LockdownDrills2" },
        { name: "Severe Weather Preparedness", path: "/SevereWeatherPreparedness" },
        { name: "Safety Demonstrations", path: "/SafetyDemonstrations" },
        { name: "Role Playing Scenarios", path: "/RolePlayingScenarios" },
        { name: "Student Leadership", path: "/StudentLeadership" },
        { name: "Stranger Danger Awareness", path: "/StrangerDangerAwareness" },
        { name: "Internet Safety", path: "/InternetSafety" },
        { name: "Verbal Bullying", path: "/VerbalBullying" },
        { name: "Physical Bullying", path: "/PhysicalBullying" },
        { name: "Cyber Bullying", path: "/CyberBullying" },
        { name: "Trusted Adults", path: "/TrustedAdults" },
        { name: "Anonymous Reporting Systems", path: "/AnonymousReportingSystems" },
        { name: "Peer Support Networks", path: "/PeerSupportNetworks" },
        { name: "Safety Workshops", path: "/SafetyWorkshops" },
        { name: "Parent Volunteer Programs", path: "/ParentVolunteerPrograms" },
        { name: "Parent Advisory Committees", path: "/ParentAdvisoryCommittees" },
        { name: "Parent Teacher Associations", path: "/ParentTeacherAssociations" },
        { name: "Emergency Contacts", path: "/EmergencyContacts" },
        { name: "Parent Feedback Mechanisms", path: "/ParentFeedbackMechanisms" },
        { name: "Law Enforcement Partnership", path: "/LawEnforcementPartnership" },
        { name: "Fire Department Collaboration", path: "/FireDepartmentCollaboration" },
        { name: "Healthcare Provider Engagement", path: "/HealthcareProviderEngagement" },
        { name: "Emergency Shelters", path: "/EmergencyShelters" },
        { name: "Medical Facilities", path: "/MedicalFacilities" },
        { name: "Mental Health Services", path: "/MentalHealthServices" },
      ],
    },
    {
      name: "Cybersecurity",
      path: "/Cybersecurity",
      subsections: [
        { name: "Access Control Lists", path: "/AccessControlLists" },
        { name: "Firewall Policies", path: "/FirewallPolicies" },
        { name: "Network Anomaly Detection", path: "/NetworkAnomalyDetection" },
        { name: "Signature-Based Detection", path: "/SignatureBasedDetection" },
        { name: "Antivirus Software", path: "/AntivirusSoftware" },
        { name: "Malware Removal Tools", path: "/MalwareRemovalTools" },
        { name: "Patch Management", path: "/PatchManagement" },
        { name: "Device Encryption", path: "/DeviceEncryption" },
        { name: "Full Disk Encryption", path: "/FullDiskEncryption" },
        { name: "File Level Encryption", path: "/FileLevelEncryption" },
        { name: "Secure Email Gateways", path: "/SecureEmailGateways" },
        { name: "End To End Encryption", path: "/EndToEndEncryption" },
        { name: "Regular Backup Schedules", path: "/RegularBackupSchedules" },
        { name: "Off Site Backup Storage", path: "/OffSiteBackupStorage" },
        { name: "Backup Testing", path: "/BackupTesting" },
        { name: "Continuity Of Operations", path: "/ContinuityOfOperations" },
        { name: "Simulated Phishing Campaigns", path: "/SimulatedPhishingCampaigns" },
        { name: "Phishing Awareness Training", path: "/PhishingAwarenessTraining" },
        { name: "Phishing Simulation Exercises", path: "/PhishingSimulationExercises" },
        { name: "Incident Reporting", path: "/IncidentReporting" },
        { name: "Contact Information", path: "/ContactInformation" },
        { name: "Password Complexity Requirements", path: "/PasswordComplexityRequirements" },
        { name: "Password Expiration Policies", path: "/PasswordExpirationPolicies" },
        { name: "Two Factor Authentication", path: "/TwoFactorAuthentication" },
        { name: "Biometric Authentication", path: "/BiometricAuthentication" },
        { name: "Strong Password Guidelines", path: "/strong-password-guidelines" },
        { name: "Multi-Factor Authentication (MFA) Awareness", path: "/multi-factor-authentication-awareness" },
        { name: "Security Information And Event Management", path: "/SecurityInformationAndEventManagement" },
        { name: "Intrusion Detection Systems", path: "/IntrusionDetectionSystems" },
        { name: "User Behavior Analytics", path: "/UserBehaviorAnalytics" },
        { name: "Incident Response Team Roles And Responsibilities", path: "/IncidentResponseTeamRolesAndResponsibilities" },
        { name: "Communication Channels And Protocols", path: "/CommunicationChannelsAndProtocols" },
        { name: "Isolation Procedures", path: "/IsolationProcedures" },
        { name: "Incident Response Patch Management", path: "/IncidentResponsePatchManagement" },
      ],
    },

    {
      name: "Policy and Compliance",
      path: "/PolicyAndCompliance",
      subsections: [
        { name: "Access Restrictions", path: "/AccessRestrictions" },
        { name: "Personal Device Usage", path: "/PersonalDeviceUsage" },
        { name: "Data Classification", path: "/DataClassification" },
        { name: "Data Sharing Policies", path: "/DataSharingPolicies" },
        { name: "Data Minimization", path: "/DataMinimization" },
        { name: "Data Retention Periods", path: "/DataRetentionPeriods" },
        { name: "Encryption Requirements", path: "/EncryptionRequirements" },
        { name: "Data Access Controls", path: "/DataAccessControls" },
        { name: "Student Privacy Rights", path: "/StudentPrivacyRights" },
        { name: "Data Security Requirements", path: "/DataSecurityRequirements" },
        { name: "Student Data Privacy Policies", path: "/StudentDataPrivacyPolicies" },
        { name: "Data Breach Notification Procedures", path: "/DataBreachNotificationProcedures" },
        { name: "Data Protection Impact", path: "/DataProtectionImpact" },
        { name: "Consent Management", path: "/ConsentManagement" },
        { name: "Compliance With Regulations", path: "/ComplianceWithRegulations" },
        { name: "Effectiveness In Addressing Security Risks", path: "/EffectivenessInAddressingSecurityRisks" },
        { name: "Staff Input On Policy Impact", path: "/StaffInputOnPolicyImpact" },
        { name: "Policy Revision Approval Workflow", path: "/PolicyRevisionApprovalWorkflow" },
        { name: "Documentation Of Policy Changes", path: "/DocumentationOfPolicyChanges" },
      ],
    },
    {
      name: "Community Partnership",
      path: "/CommunityPartnership",
      subsections: [
        { name: "SRO Roles and Responsibilities", path: "/sro-roles-and-responsibilities" },
        { name: "SRO Training and Certification", path: "/sro-training-and-certification" },
        { name: "Active Shooter Drills with Police", path: "/active-shooter-drills-with-police" },
        { name: "Emergency Response Training", path: "/emergency-response-training2" },
        { name: "Crisis Intervention Workshops", path: "/crisis-intervention-workshops" },
        { name: "Fire Safety Education for Students", path: "/fire-safety-education-for-students" },
        { name: "Fire Drills and Evacuation Planning", path: "/fire-drills-and-evacuation-planning" },
        { name: "Fire Department Access to School Facilities", path: "/fire-department-access-to-school-facilities" },
        { name: "Mutual Aid Agreements", path: "/mutual-aid-agreements" },
        { name: "Firefighter Training Sessions", path: "/firefighter-training-sessions" },
        { name: "Back-to-School Nights", path: "/back-to-school-nights" },
        { name: "Parent Workshops on Student Safety", path: "/parent-workshops-on-student-safety" },
        { name: "Parent-Teacher Conferences", path: "/parent-teacher-conferences" },
        { name: "Classroom Helpers", path: "/classroom-helpers" },
        { name: "Parent Chaperones for Field Trips", path: "/parent-chaperones-for-field-trips" },
        { name: "Fundraising Events", path: "/fundraising-events" },
        { name: "Feedback Collection from Community", path: "/feedback-collection-from-community" },
        { name: "Assessing Community Needs and Priorities", path: "/assessing-community-needs-and-priorities" },
        { name: "Planning Community Outreach Strategies", path: "/planning-community-outreach-strategies" },
      ],
    },
    {
      name: "Continuous Improvement - Safety and Security",
      path: "/ContinuousImprovement",
      subsections: [
        { name: "Physical Hazards Assessment", path: "/physical-hazards-assessment" },
        { name: "Environmental Hazards Assessment", path: "/enviromental-hazards-assessment" },
        { name: "Likelihood and Impact Assessment", path: "/likelihood-and-impact-assessment" },
        { name: "Vulnerability Assessment", path: "/vulnerability-assessment" },
        { name: "External Threats", path: "/external-threats" },
        { name: "Internal Threats", path: "/internal-threats" },
        { name: "Perimeter Security Evaluation", path: "/perimeter-security-evaluation" },
        { name: "Access Control Systems Assessment", path: "/access-control-systems-assessment" },
        { name: "Cybersecurity Vulnerability Assessment", path: "/cybersecurity-vulnerability-assessment" },
        { name: "Roles and Responsibilities of Emergency Response Team", path: "/roles-and-responsibilities-of-emergency-response-team" },
        { name: "Communication Protocols", path: "/communication-protocols2" },
        { name: "Tabletop Exercises", path: "/tabletop-exercises" },
        { name: "Simulated Emergency Drills", path: "/simulated-emergency-drills" },
        { name: "Internal Communication Protocols", path: "/internal-communication-protocols" },
        { name: "External Communication Protocols", path: "/external-communication-protocols" },
        { name: "Critical Function Identification", path: "/critical-function-identification" },
        { name: "Backup Systems and Redundancies", path: "/backup-systems-and-redundancies" },
        { name: "Safety and Security Training", path: "/SafetyAndSecurityTraining" },
        { name: "Fire Safety Training", path: "/FireSafetyTraining" },
        { name: "Evacuation Procedures Training", path: "/EvacuationProceduresTraining" },
        { name: "Identifying Suspicious Behavior", path: "/IdentifyingSuspiciousBehavior2" },
        { name: "Response to Security Threats", path: "/ResponseToSecurityThreats" },
        { name: "Stranger Danger Awareness", path: "/StrangerDangerAwareness2" },
        { name: "Fire Drills", path: "/FireDrills2" },
        { name: "Lockdown Drills", path: "/LockdownDrills3" },
        { name: "Keycard Access Systems", path: "/KeycardAccessSystems" },
        { name: "Biometric Access Control Systems", path: "/BiometricAccessControlSystems" },
        { name: "CCTV Camera Installation and Monitoring", path: "/CCTVCameraInstallation" },
        { name: "Intrusion Detection Systems", path: "/IntrusionDetectionSystems3" },
        { name: "Perimeter Security Fencing", path: "/PerimeterSecurityFencing" },
        { name: "Firewall Implementation and Configuration", path: "/FirewallImplementation" },
        { name: "Intrusion Prevention Systems", path: "/IntrusionPreventionSystems" },
        { name: "Data Encryption Protocols", path: "/DataEncryptionProtocols" },
        { name: "Regular Data Backups", path: "/RegularDataBackups" },
        { name: "Endpoint Security Solutions", path: "/EndpointSecuritySolutions" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      {/* Menu Button */}
      <button className="menu-button" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Main Navigation */}
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        {sections.map((section) => (
          <li key={section.name}>
            <div className="section-title" onClick={() => toggleSection(section.name)}>
              <span>{section.name}</span>
            </div>
            {/* Display subsections only if this section is active */}
            {activeSection === section.name && section.subsections && (
              <ul className="sub-menu">
                {section.subsections.map((sub) => (
                  <li key={sub.name}>
                    <NavLink to={sub.path}>{sub.name}</NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;