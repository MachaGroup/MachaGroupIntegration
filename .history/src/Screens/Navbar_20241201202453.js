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
      subsections: [{ name: "Main", path: "/Home" }],
    },
    {
      name: "Physical Security",
      path: "/PhysicalSecurity",
      subsections: [
        { name: "Security Gates", path: "/SecurityGates" },
        { name: "Turnstiles", path: "/Turnstiles" },
        { name: "Access Control Systems", path: "/PhysicalSecurity/AccessControlSystems" },
        { name: "Card Readers", path: "/PhysicalSecurity/CardReaders" },
        { name: "Biometric Scanners", path: "/PhysicalSecurity/BiometricScanners" },
        { name: "Access Control Software", path: "/PhysicalSecurity/AccessControlSoftware" },
        { name: "Perimeter Fencing", path: "/PhysicalSecurity/PerimeterFencing" },
        { name: "Vehicle Barriers", path: "/PhysicalSecurity/VehicleBarriers" },
        { name: "Razor Wire", path: "/PhysicalSecurity/RazorWire" },
        { name: "Motion Activated Lights", path: "/PhysicalSecurity/MotionActivatedLights" },
        { name: "Floodlights", path: "/PhysicalSecurity/Floodlights" },
        { name: "Door Locks", path: "/PhysicalSecurity/DoorLocks" },
        { name: "Window Locks", path: "/PhysicalSecurity/WindowLocks" },
        { name: "Access Control Keypads", path: "/PhysicalSecurity/AccessControlKeypads" },
        { name: "Dome Cameras", path: "/PhysicalSecurity/DomeCameras" },
        { name: "Weatherproof Cameras", path: "/PhysicalSecurity/WeatherproofCameras" },
        { name: "Infrared Cameras", path: "/PhysicalSecurity/InfraredCameras" },
        { name: "Motion Sensors", path: "/PhysicalSecurity/MotionSensors" },
        { name: "Glass Break Sensors", path: "/PhysicalSecurity/GlassBreakSensors" },
        { name: "Door Alarms", path: "/PhysicalSecurity/DoorAlarms" },
        { name: "Fence Alarms", path: "/PhysicalSecurity/FenceAlarms" },
        { name: "Gate Alarms", path: "/PhysicalSecurity/GateAlarms" },
        { name: "Stationed Guards", path: "/PhysicalSecurity/StationedGuards" },
        { name: "Roving Patrols", path: "/PhysicalSecurity/RovingPatrols" },
        { name: "Front Desk Security", path: "/PhysicalSecurity/FrontDeskSecurity" },
        { name: "Visitor Check-in", path: "/PhysicalSecurity/VisitorCheckIn" },
      ],
    },
    {
      name: "Emergency Preparedness",
      path: "/EmergencyPreparedness",
      subsections: [
        { name: "Conflict Resolution", path: "/EmergencyPreparedness/ConflictResolution" },
        { name: "Emergency Communication", path: "/EmergencyPreparedness/EmergencyCommunication" },
        { name: "First Aid Response", path: "/EmergencyPreparedness/FirstAidResponse" },
        { name: "Evacuation Procedures", path: "/EmergencyPreparedness/EvacuationProcedures" },
        { name: "Fire Extinguisher Locations", path: "/EmergencyPreparedness/FireExtinguisherLocations" },
        { name: "Fire Alarm Systems", path: "/EmergencyPreparedness/FireAlarmSystems" },
        { name: "Classroom Lockdown Protocols", path: "/EmergencyPreparedness/ClassroomLockdownProtocols" },
        { name: "Lockdown Communication Protocols", path: "/EmergencyPreparedness/LockdownCommunicationProtocols" },
        { name: "Law Enforcement Coordination", path: "/EmergencyPreparedness/LawEnforcementCoordination" },
        { name: "Disaster Drills", path: "/EmergencyPreparedness/DisastorDrills" },
        { name: "Tornado Shelter Locations", path: "/EmergencyPreparedness/TornadoShelterLocations" },
        { name: "Severe Weather Monitoring", path: "/EmergencyPreparedness/SevereWeatherMonitoring" },
        { name: "Tornado Drills", path: "/EmergencyPreparedness/TornadoDrills" },
        { name: "Earthquake Drills", path: "/EmergencyPreparedness/EarthquakeDrills" },
        { name: "Fire Drill", path: "/EmergencyPreparedness/FireDrill" },
        { name: "Drill Scenarios", path: "/EmergencyPreparedness/DrillScenarios" },
        { name: "Lockdown Signal Recognition", path: "/EmergencyPreparedness/LockdownSignalRecognition" },
        { name: "Staff Roles and Responsibilities", path: "/EmergencyPreparedness/StaffRolesAndResponsibilities" },
        { name: "Debriefing and Feedback", path: "/EmergencyPreparedness/DebriefingAndFeedback" },
        { name: "Evacuation Routes Review", path: "/EmergencyPreparedness/EvacuationRoutesReview" },
        { name: "Drill Frequency", path: "/EmergencyPreparedness/DrillFrequency" },
        { name: "Speaker Locations", path: "/EmergencyPreparedness/SpeakerLocations" },
        { name: "Emergency Announcement Protocols", path: "/EmergencyPreparedness/EmergencyAnnouncementProtocols" },
        { name: "Backup Power Systems", path: "/EmergencyPreparedness/BackupPowerSystems" },
        { name: "Contact Information Database", path: "/EmergencyPreparedness/ContactInformationDatabase" },
        { name: "Alert Activation Procedures", path: "/EmergencyPreparedness/AlertActivationProcedures" },
        { name: "Integration With Parent Communication", path: "/EmergencyPreparedness/IntegrationWithParentCommunication" },
        { name: "Two-Way Radios", path: "/EmergencyPreparedness/TwoWayRadios" },
        { name: "Communication Channels", path: "/EmergencyPreparedness/CommunicationChannels" },
        { name: "Emergency Communication Training", path: "/EmergencyPreparedness/EmergencyCommunicationTraining" },
        { name: "Communication Platforms", path: "/EmergencyPreparedness/CommunicationPlatforms" },
        { name: "Parent Notification Procedures", path: "/EmergencyPreparedness/ParentNotificationProcedures" },
        { name: "Communication Language", path: "/EmergencyPreparedness/CommunicationLanguage" },
      ],
    },
    {
      name: "Personnel Training and Awareness",
      path: "/PersonnelTrainingAndAwareness",
      subsections: [
        { name: "Training Providers", path: "/PersonnelTrainingAndAwareness/TrainingProviders" },
        { name: "Training Materials", path: "/PersonnelTrainingAndAwareness/TrainingMaterials" },
        { name: "Recertification Schedule", path: "/PersonnelTrainingAndAwareness/RecertificationSchedule" },
        { name: "Scenario Based Training", path: "/PersonnelTrainingAndAwareness/ScenarioBasedTraining" },
        { name: "Response Protocols", path: "/PersonnelTrainingAndAwareness/ResponseProtocols" },
        { name: "Post Incident Support", path: "/PersonnelTrainingAndAwareness/PostIncidentSupport" },
        { name: "First Aid/CPR Training", path: "/PersonnelTrainingAndAwareness/FirstAidCPRTraining" },
        { name: "Basic First Aid Techniques", path: "/PersonnelTrainingAndAwareness/BasicFirstAidTechniques" },
        { name: "CPR Certification", path: "/PersonnelTrainingAndAwareness/CPRCertification" },
        { name: "AED Training", path: "/PersonnelTrainingAndAwareness/AEDTraining" },
        { name: "Active Shooter Response", path: "/PersonnelTrainingAndAwareness/ActiveShooterResponse" },
        { name: "Evacuation Procedures", path: "/PersonnelTrainingAndAwareness/EvacuationProcedures" },
        { name: "Emergency Communication", path: "/PersonnelTrainingAndAwareness/EmergencyCommunication" },
        { name: "Recognizing Security Incidents Assessment", path: "/PersonnelTrainingAndAwareness/RecognizingSecurityIncidentsAssessment" },
        { name: "Incident Reporting Procedures", path: "/PersonnelTrainingAndAwareness/IncidentReportingProcedures" },
        { name: "Curriculum Integration", path: "/PersonnelTrainingAndAwareness/CurriculumIntegration" },
        { name: "Student Handbooks", path: "/PersonnelTrainingAndAwareness/StudentHandbooks" },
        { name: "Parent Involvement", path: "/PersonnelTrainingAndAwareness/ParentInvolvement" },
        { name: "Fire Drills", path: "/PersonnelTrainingAndAwareness/FireDrills" },
        { name: "Lockdown Drills", path: "/PersonnelTrainingAndAwareness/LockdownDrills" },
        { name: "Severe Weather Preparedness", path: "/PersonnelTrainingAndAwareness/SevereWeatherPreparedness" },
        { name: "Safety Demonstrations", path: "/PersonnelTrainingAndAwareness/SafetyDemonstrations" },
        { name: "Role Playing Scenarios", path: "/PersonnelTrainingAndAwareness/RolePlayingScenarios" },
        { name: "Student Leadership", path: "/PersonnelTrainingAndAwareness/StudentLeadership" },
        { name: "Stranger Danger Awareness", path: "/PersonnelTrainingAndAwareness/StrangerDangerAwareness" },
        { name: "Internet Safety", path: "/PersonnelTrainingAndAwareness/InternetSafety" },
        { name: "Verbal Bullying", path: "/PersonnelTrainingAndAwareness/VerbalBullying" },
        { name: "Physical Bullying", path: "/PersonnelTrainingAndAwareness/PhysicalBullying" },
        { name: "Cyber Bullying", path: "/PersonnelTrainingAndAwareness/CyberBullying" },
        { name: "Trusted Adults", path: "/PersonnelTrainingAndAwareness/TrustedAdults" },
        { name: "Anonymous Reporting Systems", path: "/PersonnelTrainingAndAwareness/AnonymousReportingSystems" },
        { name: "Peer Support Networks", path: "/PersonnelTrainingAndAwareness/PeerSupportNetworks" },
        { name: "Safety Workshops", path: "/PersonnelTrainingAndAwareness/SafetyWorkshops" },
        { name: "Parent Volunteer Programs", path: "/PersonnelTrainingAndAwareness/ParentVolunteerPrograms" },
        { name: "Parent Advisory Committees", path: "/PersonnelTrainingAndAwareness/ParentAdvisoryCommittees" },
        { name: "Parent Teacher Associations", path: "/PersonnelTrainingAndAwareness/ParentTeacherAssociations" },
        { name: "Emergency Contacts", path: "/PersonnelTrainingAndAwareness/EmergencyContacts" },
        { name: "Parent Feedback Mechanisms", path: "/PersonnelTrainingAndAwareness/ParentFeedbackMechanisms" },
        { name: "Law Enforcement Partnership", path: "/PersonnelTrainingAndAwareness/LawEnforcementPartnership" },
        { name: "Fire Department Collaboration", path: "/PersonnelTrainingAndAwareness/FireDepartmentCollaboration" },
        { name: "Healthcare Provider Engagement", path: "/PersonnelTrainingAndAwareness/HealthcareProviderEngagement" },
        { name: "Emergency Shelters", path: "/PersonnelTrainingAndAwareness/EmergencyShelters" },
        { name: "Medical Facilities", path: "/PersonnelTrainingAndAwareness/MedicalFacilities" },
        { name: "Mental Health Services", path: "/PersonnelTrainingAndAwareness/MentalHealthServices" },
      ],
    },
    {
      name: "Cybersecurity",
      path: "/Cybersecurity",
      subsections: [
        { name: "Access Control Lists", path: "/Cybersecurity/AccessControlLists" },
        { name: "Firewall Policies", path: "/Cybersecurity/FirewallPolicies" },
        { name: "Network Anomaly Detection", path: "/Cybersecurity/NetworkAnomalyDetection" },
        { name: "Antivirus Software", path: "/Cybersecurity/AntivirusSoftware" },
        { name: "Malware Removal Tools", path: "/Cybersecurity/MalwareRemovalTools" },
        { name: "Patch Management", path: "/Cybersecurity/PatchManagement" },
        { name: "Device Encryption", path: "/Cybersecurity/DeviceEncryption" },
        { name: "Full Disk Encryption", path: "/Cybersecurity/FullDiskEncryption" },
        { name: "File Level Encryption", path: "/Cybersecurity/FileLevelEncryption" },
        { name: "Secure Email Gateways", path: "/Cybersecurity/SecureEmailGateways" },
        { name: "End To End Encryption", path: "/Cybersecurity/EndToEndEncryption" },
        { name: "Regular Backup Schedules", path: "/Cybersecurity/RegularBackupSchedules" },
        { name: "Off Site Backup Storage", path: "/Cybersecurity/OffSiteBackupStorage" },
        { name: "Backup Testing", path: "/Cybersecurity/BackupTesting" },
        { name: "Continuinty Of Operations", path: "/Cybersecurity/ContinuintyOfOperations" },
        { name: "Simulated Phishing Campaigns", path: "/Cybersecurity/SimulatedPhishingCampaigns" },
        { name: "Phishing Awareness Training", path: "/Cybersecurity/PhishingAwarenessTraining" },
        { name: "Incident Reporting", path: "/Cybersecurity/IncidentReporting" },
        { name: "Contact Information", path: "/Cybersecurity/ContactInformation" },
        { name: "Password Complexity Requirements", path: "/Cybersecurity/PasswordComplexityRequirements" },
        { name: "Password Expiration Policies", path: "/Cybersecurity/PasswordExpirationPolicies" },
        { name: "Two Factor Authentication", path: "/Cybersecurity/TwoFactorAuthentication" },
        { name: "Biometric Authentication", path: "/Cybersecurity/BiometricAuthentication" },
        { name: "Security Information And Event Management", path: "/Cybersecurity/SecurityInformationAndEventManagement" },
        { name: "Intrusion Detection Systems", path: "/Cybersecurity/IntrusionDetectionSystems" },
        { name: "User Behavior Analytics", path: "/Cybersecurity/UserBehaviorAnalytics" },
        { name: "Incident Response Team Roles And Responsibilities", path: "/Cybersecurity/IncidentResponseTeamRolesAndResponsibilities" },
        { name: "Communication Channels And Protocols", path: "/Cybersecurity/CommunicationChannelsAndProtocols" },
        { name: "Isolation Procedures", path: "/Cybersecurity/IsolationProcedures" },
        { name: "Incident Response Patch Management", path: "/Cybersecurity/IncidentResponsePatchManagement" },
      ],
    },

    {
      name: "Policy and Compliance",
      path: "/PolicyAndCompliance",
      subsections: [
        { name: "Access Restrictions", path: "/PolicyAndCompliance/AccessRestrictions" },
        { name: "Personal Device Usage", path: "/PolicyAndCompliance/PersonalDeviceUsage" },
        { name: "Data Classification", path: "/PolicyAndCompliance/DataClassification" },
        { name: "Data Sharing Policies", path: "/PolicyAndCompliance/DataSharingPolicies" },
        { name: "Data Minimization", path: "/PolicyAndCompliance/DataMinimization" },
        { name: "Data Retention Periods", path: "/PolicyAndCompliance/DataRetentionPeriods" },
        { name: "Encryption Requirements", path: "/PolicyAndCompliance/EncryptionRequirements" },
        { name: "Data Access Controls", path: "/PolicyAndCompliance/DataAccessControls" },
        { name: "Student Privacy Rights", path: "/PolicyAndCompliance/StudentPrivacyRights" },
        { name: "Data Security Requirements", path: "/PolicyAndCompliance/DataSecurityRequirements" },
        { name: "Student Data Privacy Policies", path: "/PolicyAndCompliance/StudentDataPrivacyPolicies" },
        { name: "Data Breach Notification Procedures", path: "/PolicyAndCompliance/DataBreachNotificationProcedures" },
        { name: "Protected Health Information Handling", path: "/PolicyAndCompliance/ProtectedHealthInformationHandling" },
        { name: "Medical Records Security", path: "/PolicyAndCompliance/MedicalRecordsSecurity" },
        { name: "Data Protection Impact", path: "/PolicyAndCompliance/DataProtectionImpact" },
        { name: "Consent Management", path: "/PolicyAndCompliance/ConsentManagement" },
        { name: "Compliance With Regulations", path: "/PolicyAndCompliance/ComplianceWithRegulations" },
        { name: "Effectiveness In Addressing Security Risks", path: "/PolicyAndCompliance/EffectivenessInAddressingSecurityRisks" },
        { name: "Staff Input On Policy Impact", path: "/PolicyAndCompliance/StaffInputOnPolicyImpact" },
        { name: "Policy Revision Approval Workflow", path: "/PolicyAndCompliance/PolicyRevisionApprovalWorkflow" },
        { name: "Documentation Of Policy Changes", path: "/PolicyAndCompliance/DocumentationOfPolicyChanges" },
      ],
    },
    {
      name: "Community Partnership",
      path: "/CommunityPartnership",
      subsections: [
        { name: "Law Enforcement Partnership", path: "/CommunityPartnership/LawEnforcementPartnership" },
        { name: "Fire Department Collaboration", path: "/CommunityPartnership/FireDepartmentCollaboration" },
        { name: "Healthcare Provider Engagement", path: "/CommunityPartnership/HealthcareProviderEngagement" },
        { name: "Emergency Shelters", path: "/CommunityPartnership/EmergencyShelters" },
        { name: "Medical Facilities", path: "/CommunityPartnership/MedicalFacilities" },
        { name: "Mental Health Services", path: "/CommunityPartnership/MentalHealthServices" },
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