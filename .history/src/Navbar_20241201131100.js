import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const sections = [
    {
      name: "Home",
      path: "/Home",
      subsections: [
        { name: "Main", path: "/Home" },
      ],
    },
    {
      name: "Physical Security",
      path: "/PhysicalSecurity",
      subsections: [
        { name: "Security Gates", path: "/PhysicalSecurity/SecurityGates" },
        { name: "Turnstiles", path: "/PhysicalSecurity/Turnstiles" },
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
      title: "Cybersecurity",
      path: "/Cybersecurity",
      subNav: [
        { title: "Access Control Lists", path: "/Cybersecurity/AccessControlLists" },
        { title: "Firewall Policies", path: "/Cybersecurity/FirewallPolicies" },
        { title: "Network Anamoloy Detection", path: "/Cybersecurity/NetworkAnamoloyDetection" },
        { title: "Signature Based Detection", path: "/Cybersecurity/SignatureBasedDetection" },
        { title: "Antivirus Software", path: "/Cybersecurity/AntivirusSoftware" },
        { title: "Malware Removal Tools", path: "/Cybersecurity/MalwareRemovalTools" },
        { title: "Patch Management", path: "/Cybersecurity/PatchManagement" },
        { title: "Device Encryption", path: "/Cybersecurity/DeviceEncryption" },
        { title: "Full Disk Encryption", path: "/Cybersecurity/FullDiskEncryption" },
        { title: "File Level Encryption", path: "/Cybersecurity/FileLevelEncryption" },
        { title: "Secure Email Gateways", path: "/Cybersecurity/SecureEmailGateways" },
        { title: "End To End Encryption", path: "/Cybersecurity/EndToEndEncryption" },
        { title: "Regular Backup Schedules", path: "/Cybersecurity/RegularBackupSchedules" },
        { title: "Off Site Backup Storage", path: "/Cybersecurity/OffSiteBackupStorage" },
        { title: "Backup Testing", path: "/Cybersecurity/BackupTesting" },
        { title: "Continuinty Of Operations", path: "/Cybersecurity/ContinuintyOfOperations" },
        { title: "Simulated Phishing Campaigns", path: "/Cybersecurity/SimulatedPhishingCampaigns" },
        { title: "Phishing Awareness Training", path: "/Cybersecurity/PhishingAwarenessTraining" },
        { title: "Incident Reporting", path: "/Cybersecurity/IncidentReporting" },
        { title: "Contact Information", path: "/Cybersecurity/ContactInformation" },
        { title: "Password Complexity Requirements", path: "/Cybersecurity/PasswordComplexityRequirements" },
        { title: "Password Expiration Policies", path: "/Cybersecurity/PasswordExpirationPolicies" },
        { title: "Two Factor Authentication", path: "/Cybersecurity/TwoFactorAuthentication" },
        { title: "Biometric Authentication", path: "/Cybersecurity/BiometricAuthentication" },
        { title: "Security Information And Event Management", path: "/Cybersecurity/SecurityInformationAndEventManagement" },
        { title: "Intrusion Detection Systems", path: "/Cybersecurity/IntrusionDetectionSystems" },
        { title: "User Behavior Analytics", path: "/Cybersecurity/UserBehaviorAnalytics" },
        { title: "Incident Response Team Roles And Responsibilities", path: "/Cybersecurity/IncidentResponseTeamRolesAndResponsibilities" },
        { title: "Communication Channels And Protocols", path: "/Cybersecurity/CommunicationChannelsAndProtocols" },
        { title: "Isolation Procedures", path: "/Cybersecurity/IsolationProcedures" },
        { title: "Incident Response Patch Management", path: "/Cybersecurity/IncidentResponsePatchManagement" },
      ],
    },

    {
      title: "Policy and Compliance",
      path: "/PolicyAndCompliance",
      subNav: [
        { title: "Access Restrictions", path: "/PolicyAndCompliance/AccessRestrictions" },
        { title: "Personal Device Usage", path: "/PolicyAndCompliance/PersonalDeviceUsage" },
        { title: "Data Classification", path: "/PolicyAndCompliance/DataClassification" },
        { title: "Data Sharing Policies", path: "/PolicyAndCompliance/DataSharingPolicies" },
        { title: "Data Minimization", path: "/PolicyAndCompliance/DataMinimization" },
        { title: "Data Retention Periods", path: "/PolicyAndCompliance/DataRetentionPeriods" },
        { title: "Encryption Requirements", path: "/PolicyAndCompliance/EncryptionRequirements" },
        { title: "Data Access Controls", path: "/PolicyAndCompliance/DataAccessControls" },
        { title: "Student Privacy Rights", path: "/PolicyAndCompliance/StudentPrivacyRights" },
        { title: "Data Security Requirements", path: "/PolicyAndCompliance/DataSecurityRequirements" },
        { title: "Student Data Privacy Policies", path: "/PolicyAndCompliance/StudentDataPrivacyPolicies" },
        { title: "Data Breach Notification Procedures", path: "/PolicyAndCompliance/DataBreachNotificationProcedures" },
        { title: "Protected Health Information Handling", path: "/PolicyAndCompliance/ProtectedHealthInformationHandling" },
        { title: "Medical Records Security", path: "/PolicyAndCompliance/MedicalRecordsSecurity" },
        { title: "Data Protection Impact", path: "/PolicyAndCompliance/DataProtectionImpact" },
        { title: "Consent Management", path: "/PolicyAndCompliance/ConsentManagement" },
        { title: "Compliance With Regulations", path: "/PolicyAndCompliance/ComplianceWithRegulations" },
        { title: "Effectiveness In Addressing Security Risks", path: "/PolicyAndCompliance/EffectivenessInAddressingSecurityRisks" },
        { title: "Staff Input On Policy Impact", path: "/PolicyAndCompliance/StaffInputOnPolicyImpact" },
        { title: "Policy Revision Approval Workflow", path: "/PolicyAndCompliance/PolicyRevisionApprovalWorkflow" },
        { title: "Documentation Of Policy Changes", path: "/PolicyAndCompliance/DocumentationOfPolicyChanges" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul>
        {sections.map((section) => (
          <li key={section.name}>
            <NavLink to={section.path} className="main-link">
              {section.name}
            </NavLink>
            {section.subsections && (
              <ul className="nested">
                {section.subsections.map((sub) => (
                  <li key={sub.name}>
                    <NavLink to={sub.path} className="sub-link">
                      {sub.name}
                    </NavLink>
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
