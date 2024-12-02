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
