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
        { name: "Weatherproof Cameras", path: "/WeatherproofCameras" },
        { name: "Infrared Cameras", path: "/InfraredCameras" },
        { name: "Motion Sensors", path: "/MotionSensors" },
        { name: "Glass Break Sensors", path: "/GlassBreakSensors" },
        { name: "Door Alarms", path: "/DoorAlarms" },
        { name: "Fence Alarms", path: "/FenceAlarms" },
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
        { name: "Drill Scenarios", path: "/DrillScenerios" },
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
        { name: "Communication Channels", path: "/CommunicationChannelsAndProtocols" },
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
        { name: "Response Protocols", path: "/EmergencyResponseProtocols" },
        { name: "Post Incident Support", path: "/PostIncidentSupport" },
        { name: "First Aid/CPR Training", path: "/FirstAidCPRTraining" },
        { name: "Basic First Aid Techniques", path: "/BasicFirstAidTechniques" },
        { name: "CPR Certification", path: "/CPRCertification" },
        { name: "AED Training", path: "/AEDTraining" },
        { name: "Active Shooter Response", path: "/ActiveShooterResponse" },
        { name: "Evacuation Procedures", path: "/EvacuationProcedures" },
        { name: "Emergency Communication", path: "/EmergencyCommunication" },
        { name: "Recognizing Security Incidents Assessment", path: "/RecognizingSecurityIncidentsAssessment" },
        { name: "Incident Reporting Procedures", path: "/IncidentReportingProcedures" },
        { name: "Curriculum Integration", path: "/CurriculumIntegration" },
        { name: "Student Handbooks", path: "/StudentHandbooks" },
        { name: "Parent Involvement", path: "/ParentInvolvement" },
        { name: "Fire Drills", path: "/FireDrills" },
        { name: "Lockdown Drills", path: "/LockdownDrills" },
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
        { name: "Continuinty Of Operations", path: "/ContinuintyOfOperations" },
        { name: "Simulated Phishing Campaigns", path: "/SimulatedPhishingCampaigns" },
        { name: "Phishing Awareness Training", path: "/PhishingAwarenessTraining" },
        { name: "Incident Reporting", path: "/IncidentReporting" },
        { name: "Contact Information", path: "/ContactInformation" },
        { name: "Password Complexity Requirements", path: "/PasswordComplexityRequirements" },
        { name: "Password Expiration Policies", path: "/PasswordExpirationPolicies" },
        { name: "Two Factor Authentication", path: "/TwoFactorAuthentication" },
        { name: "Biometric Authentication", path: "/BiometricAuthentication" },
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
        { name: "Protected Health Information Handling", path: "/ProtectedHealthInformationHandling" },
        { name: "Medical Records Security", path: "/MedicalRecordsSecurity" },
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
        { name: "Law Enforcement Partnership", path: "/LawEnforcementPartnership" },
        { name: "Fire Department Collaboration", path: "/FireDepartmentCollaboration" },
        { name: "Healthcare Provider Engagement", path: "/HealthcareProviderEngagement" },
        { name: "Emergency Shelters", path: "/EmergencyShelters" },
        { name: "Medical Facilities", path: "/MedicalFacilities" },
        { name: "Mental Health Services", path: "/MentalHealthServices" },
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