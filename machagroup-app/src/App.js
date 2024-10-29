import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Correct the import paths for all screens
//Main screen pages
import Login from './Screens/Login';
import FormInputPage from './Screens/FormInputPage';
import MainScreen from './Screens/MainScreen';
import AboutUs from './Screens/AboutUs';
import FAQ from './Screens/FAQ';
import ContactUs from './Screens/ContactUs';
import Settings from './Screens/Settings';
import Pricing from './Screens/Pricing';
//Physical Security sections
import PhysicalSecurity from './Screens/PhysicalSecurity';
//Tier 2 PS
import AccessControl from './Screens/AccessControl';
import SurveillanceSystems from './Screens/SurveillanceSystems';
import SecurityPersonnel from './Screens/SecurityPersonnel';
//Tier 3 PS
import AccessPoints from './Screens/AccessPoints';
import BuildingSecurity from './Screens/BuildingSecurity';
import PerimeterSecurity from './Screens/PerimeterSecurity';
import CCTVCameras from './Screens/CCTVCameras';
import AlarmSystems from './Screens/AlarmSystems';
import OnSiteSecurity from './Screens/OnSiteSecurity';
//Tier 4 PS
//import MainEntrance from './Screens/MainEntrance';
//import SecondaryEntrance from './Screens/SecondaryEntrance';
//import FencingandBarriers from './FencingandBarriers';
//import Lighting from './Lighting';
//import LockingMechanisms from './LockingMechanisms';
//import IndoorCameras from './IndoorCameras';
//import outdoorCameras from './OutdoorCameras';
//import IntrusionAlarms from './IntrusionAlarms';
//import PerimeterAlarms from './PerimeterAlarms';
//import SecurityGuards from './SecurityGuards';
//import ReceptionStaff from './ReceptionStaff';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the main screen */}
        <Route path="/" element={<MainScreen />} />

        {/* Other Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Form" element={<FormInputPage />} />
        <Route path="/Main" element={<MainScreen />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Physical" element={<PhysicalSecurity />} />
        <Route path="/Access" element={<AccessControl />} />
        <Route path="/Surveillance" element={<SurveillanceSystems />} />
        <Route path="/Security" element={<SecurityPersonnel />} />
        <Route path="/AccessP" element={<AccessPoints />} />
        <Route path="/PerimeterS" element={<PerimeterSecurity />} />
        <Route path="/BuildingS" element={<BuildingSecurity />} />
        <Route path="/CCTV" element={<CCTVCameras />} />
        <Route path="/AlarmS" element={<AlarmSystems />} />
        <Route path="/OnSite" element={<OnSiteSecurity />} />
      </Routes>
    </Router>
  );
}

export default App;

