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
