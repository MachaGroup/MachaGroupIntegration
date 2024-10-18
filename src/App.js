import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Correct the import paths for all screens
import Login from './Screens/Login';
import FormInputPage from './Screens/FormInputPage';
import MainScreen from './Screens/MainScreen';
import AboutUs from './Screens/AboutUs';
import FAQ from './Screens/FAQ';
import ContactUs from './Screens/ContactUs';
import Settings from './Screens/Settings';
import EditProfile from './Screens/EditProfile';
import Notifications from './Screens/Notifications';
import Pricing from './Screens/Pricing';
import PhysicalSecurity from './Screens/PhysicalSecurity';
import AccessControl from './Screens/AccessControl';
import SurveillanceSystems from './Screens/SurveillanceSystems';
import SecurityPersonnel from './Screens/SecurityPersonnel';
import EmergencyPreparedness from './Screens/EmergencyPreparedness';
import EmergencyResponse from './Screens/EmergencyResponse';
import EmergencyResponsePlan from './Screens/EmergencyResponsePlan';
import DrillsAndTraining from './Screens/DrillsAndTraining';
import CommunicationSystems from './Screens/CommunicationSystems';
import PersonnelTrainingAndAwareness from './Screens/PersonnelTrainingAndAwareness';
import Cybersecurity from './Screens/Cybersecurity';
import CrisisIntervention from './Screens/CrisisIntervention';
import PlanDevelopment from './Screens/PlanDevelopment';
import DrillExecution from './Screens/DrillExecution';
import AlertSystems from './Screens/AlertSystems';
import CommunicationProtocols from './Screens/CommunicationProtocols';
import FireEmergencyPlans from './Screens/FireEmergencyPlans';
import LockdownProcedures from './Screens/LockdownProcedures';
import NaturalDisasterPlans from './Screens/NaturalDisasterPlans';
import NaturalDisasterDrills from './Screens/NaturalDisasterDrills';
import LockdownDrills from './Screens/LockdownDrills';
import PublicAddressSystem from './Screens/PublicAddressSystem';
import TextEmailAlerts from './Screens/TextEmailAlerts';
import StaffCommunication from './Screens/StaffCommunication';
import ParentCommunication from './Screens/ParentCommunication';
import CommunityEngagement from './Screens/CommunityEngagement';
import StaffTraining from './Screens/StaffTraining';
import StudentEducation from './Screens/StudentEducation';
import FirstAidCPRTraining from './Screens/FirstAidCPRTraining';
import EmergencyResponseTraining from './Screens/EmergencyResponseTraining';
import EmergencyProcedures from './Screens/EmergencyProcedures';
import SafetyEducation from './Screens/SafetyEducation';
import PersonalSafety from './Screens/PersonalSafety';
import ParentInvolvement from './Screens/ParentInvolvement';
import CommunityPartnerships from './Screens/CommunityPartnerships';
import SecurityAwarenessTraining from './Screens/SecurityAwarenessTraining';
import BullyingPrevention from './Screens/BullyingPrevention';
import ParentEducationEvents from './Screens/ParentEducationEvents';
import ParentComm from './Screens/ParentComm';
import CollaborationWithLocalAgenices from './Screens/CollaborationWithLocalAgencies';
import AccessToCommunityResources from './Screens/AccessToCommunityResources';
import RecognizingBullyingBehavoir from './Screens/RecognizingBullyingBehavior';
import ReportingProcedures from './Screens/ReportingProcedures';
import NetworkSecurity from './Screens/NetworkSecurity';
import DataProtection from './Screens/DataProtection';
import UserAwarenessAndTraining from './Screens/UserAwarenessAndTraining';
import FirewallsAndIntrusionDetection from './Screens/FirewallsAndIntrusionDetection';
import EndpointSecurity from './Screens/EndpointSecurity';
import DataEncryption from './Screens/DataEncryption';
import DataBackupAndRecovery from './Screens/DataBackupAndRecovery';
import PhishingAwareness from './Screens/PhishingAwareness';
import PasswordManagement from './Screens/PasswordManagement';
import IncidentIdentification from './Screens/IncidentIdentification';
import IncidentResponsePlanning from './Screens/IncidentResponsePlanning';
import FirewallConfiguratinon from './Screens/FirewallConfiguration';
import IntrusionDetectionSystems from './Screens/IntrusionDectecitonSystems';
import AntivirusAndMalwareProtection from './Screens/AntivirusAndMalwareProtection';
import DeviceManagement from './Screens/DeviceManagement';
import FileEncryption from './Screens/FileEncryption';
import EmailEncryption from './Screens/EmailEncryption';
import BackupSolutions from './Screens/BackupSolutions';
import DisasterRecoveryPlanning from './Screens/DisasterRecoveryPlanning';
import PhishingSimulationTraining from './Screens/PhishingSimulationTraining';
import ReportingProcedures2 from './Screens/ReportingProcedures2';
import PasswordPolicies from './Screens/PasswordPolicies';
import MultiFactorAuthentication from './Screens/MultiFactorAuthentication';
import EventLoggingAndMonitoring from './Screens/EventLoggingAndMonitoring';
import UserActivityMonitoring from './Screens/UserActivityMonitoring';
import ResponseTeamFoundation from './Screens/ResponseTeamFoundation';
import ContainmentAndMitigation from './Screens/ContainmentAndMitigation';
import PasswordSecurity from './Screens/PasswordSecurity';
import SecurityPoliciesAndProcedures from './Screens/SecurityPoliciesAndProcedures';
import IncidentResponseTraining from './Screens/IncidentResponseTraining';
import PolicyAndCompliance from './Screens/PolicyAndCompliance';
import PolicyDevelopment from './Screens/PolicyDevelopment';
import ComplianceManagement from './Screens/ComplianceManagement';
import Branch4 from './Screens/Branch4';
import AcceptableUsePolicy from './Screens/AcceptableUsePolicy';
import DataPrivacyPolicy from './Screens/DataPrivacyPolicy';
import RegulatoryComlpiance from './Screens/RegulatoryCompliance';
import LegalCompliance from './Screens/LegalCompliance';
import PeriodicReviews from './Screens/PeriodicReviews';
import RevisionProcedures from './Screens/RevisionProcedures';
import InternetUsage from './Screens/InternetUsage';
import DataHandling from './Screens/DataHandling';
import DataCollectionAndRetention from './Screens/DataCollectionAndRetention';
import DataProtectionMeasures from './Screens/DataProtectionMeasures';
import FERPACompliance from './Screens/FERPACompliance';
import HIPAACompliance from './Screens/HIPAACompliance';
import GDPRCompliance from './Screens/GDPRCompliance';
import CopyrightCompliance from './Screens/CopyrightCompliance';
import AccessibilityCompliance from './Screens/AccessibilityCompliance';
import PolicyEvaluationCriteria from './Screens/PolicyEvaluationCriteria';
import StakeholderFeedback from './Screens/StakeholderFeedback';
import ChangeManagementProcess from './Screens/ChangeManagementProcess';
import ThreatRecognition from './Screens/ThreatRecognition';
import CybersecurityTraining from './Screens/CybersecurityTraining';

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
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Physical" element={<PhysicalSecurity />} />
        <Route path="/Access" element={<AccessControl />} />
        <Route path="/Surveillance" element={<SurveillanceSystems />} />
        <Route path="/security-personnel" element={<SecurityPersonnel />} />
        <Route path="/emergency-preparedness" element={<EmergencyPreparedness />} />
        <Route path="/emergency-response" element={<EmergencyResponse />} />
        <Route path="/emergency-response-plan" element={<EmergencyResponsePlan />} />
        <Route path="/drills-and-training" element={<DrillsAndTraining />} />
        <Route path="/communication-systems" element={<CommunicationSystems />} />
        <Route path="/personnel-training" element={<PersonnelTrainingAndAwareness />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/crisis-intervention" element={<CrisisIntervention />} />
        <Route path="/plan-development" element={<PlanDevelopment />} />
        <Route path="/drill-execution" element={<DrillExecution />} />
        <Route path="/alert-systems" element={<AlertSystems />} />
        <Route path="/communication-protocols" element={<CommunicationProtocols />} />
        <Route path="/fire-emergency-plans" element={<FireEmergencyPlans />} />
        <Route path="/lockdown-procedures" element={<LockdownProcedures />} />
        <Route path="/natural-disaster-plans" element={<NaturalDisasterPlans />} />
        <Route path="/natural-disaster-drills" element={<NaturalDisasterDrills />} />
        <Route path="/lockdown-drills" element={<LockdownDrills />} />
        <Route path="/public-address-system" element={<PublicAddressSystem />} />
        <Route path="/text-email-alerts" element={<TextEmailAlerts />} />
        <Route path="/staff-communication" element={<StaffCommunication />} />
        <Route path="/parent-communication" element={<ParentCommunication />} />
        <Route path="/community-engagement" element={<CommunityEngagement />} />
        <Route path="/staff-training" element={<StaffTraining />} />
        <Route path="/student-education" element={<StudentEducation />} />
        <Route path="/first-aid" element={<FirstAidCPRTraining />} />
        <Route path="/emergency-response-training" element={<EmergencyResponseTraining />} />
        <Route path="/emergency-procedures" element={<EmergencyProcedures />} />
        <Route path="/personal-safety" element={<PersonalSafety />} />
        <Route path="/safety-education" element={<SafetyEducation />} />
        <Route path="/parent-involvement" element={<ParentInvolvement />} />
        <Route path="/community-partnerships" element={<CommunityPartnerships />} />
        <Route path="/security-awareness-training" element={<SecurityAwarenessTraining />} />
        <Route path="/bullying-prevention" element={<BullyingPrevention />} />
        <Route path="/parent-education-events" element={<ParentEducationEvents />} />
        <Route path="/parent-comm" element={<ParentComm />} />
        <Route path="/collaboration-with-local-agencies" element={<CollaborationWithLocalAgenices />} />
        <Route path="/access-to-community-resources" element={<AccessToCommunityResources />} />
        <Route path="/recognizing-bullying-behavior" element={<RecognizingBullyingBehavoir />} />
        <Route path="/reporting-procedures" element={<ReportingProcedures />} />
        <Route path="/network-security" element={<NetworkSecurity />} />
        <Route path="/data-protection" element={<DataProtection />} />
        <Route path="/user-awareness" element={<UserAwarenessAndTraining />} />
        <Route path="/firewalls" element={<FirewallsAndIntrusionDetection />} />
        <Route path="/endpoint-security" element={<EndpointSecurity />} />
        <Route path="/data-encryption" element={<DataEncryption />} />
        <Route path="/data-backup-and-recovery" element={<DataBackupAndRecovery />} />
        <Route path="/phishing-awareness" element={<PhishingAwareness />} />
        <Route path="/password-management" element={<PasswordManagement />} />
        <Route path="/incident-identification" element={<IncidentIdentification />} />
        <Route path="/incident-response-planning" element={<IncidentResponsePlanning />} />
        <Route path="/firewall-configuration" element={<FirewallConfiguratinon />} />
        <Route path="/intrusion-detection-systems" element={<IntrusionDetectionSystems />} />
        <Route path="/antivirus-and-malware-protection" element={<AntivirusAndMalwareProtection />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/file-encryption" element={<FileEncryption />} /> 
        <Route path="/email-encryption" element={<EmailEncryption />} />
        <Route path="/backup-solutions" element={<BackupSolutions />} />
        <Route path="/disaster-recovery-planning" element={<DisasterRecoveryPlanning />} />
        <Route path="/phishing-simulation-training" element={<PhishingSimulationTraining />} />
        <Route path="/reporting-procedures2" element={<ReportingProcedures2 />} />
        <Route path="/password-policies" element={<PasswordPolicies />} />
        <Route path="/multi-factor-authentication" element={<MultiFactorAuthentication />} />
        <Route path="/event-logging" element={<EventLoggingAndMonitoring />} />
        <Route path="/user-activity-monitoring" element={<UserActivityMonitoring />} />
        <Route path="/response-team-foundation" element={<ResponseTeamFoundation />} />
        <Route path="/containment-and-mitigation" element={<ContainmentAndMitigation />} />
        <Route path="/password-security" element={<PasswordSecurity />} />
        <Route path="/security-policies-and-procedures" element={<SecurityPoliciesAndProcedures />} />
        <Route path="/incident-response-training" element={<IncidentResponseTraining />} />
        <Route path="/policy-compliance" element={<PolicyAndCompliance />} />
        <Route path="/policy-development" element={<PolicyDevelopment />} />
        <Route path="/compliance-management" element={<ComplianceManagement />} />
        <Route path="/branch-4" element={<Branch4 />} />
        <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
        <Route path="/data-privacy-policy" element={<DataPrivacyPolicy />} />
        <Route path="/regulatory-compliance" element={<RegulatoryComlpiance />} />
        <Route path="/legal-compliance" element={<LegalCompliance />} />
        <Route path="/periodic-reviews" element={<PeriodicReviews />} />
        <Route path="/revision-procedures" element={<RevisionProcedures />} />
        <Route path="/internet-usage" element={<InternetUsage />} />
        <Route path="/data-handling" element={<DataHandling />} />
        <Route path="/data-collection-and-retention" element={<DataCollectionAndRetention />} />
        <Route path="/data-protection-measures" element={<DataProtectionMeasures />} />
        <Route path="/FERPA-compliance" element={<FERPACompliance />} />
        <Route path="/HIPAA-compliance" element={<HIPAACompliance />} />
        <Route path="/GDPR-compliance" element={<GDPRCompliance />} />
        <Route path="/copyright-compliance" element={<CopyrightCompliance />} />
        <Route path="/accessibility-compliance" element={<AccessibilityCompliance />} />
        <Route path="/policy-evaluation-criteria" element={<PolicyEvaluationCriteria />} />
        <Route path="/stakeholder-feedback" element={<StakeholderFeedback />} />
        <Route path="/change-management-process" element={<ChangeManagementProcess />} />
        <Route path="/threat-recognition" element={<ThreatRecognition />} />
        <Route path="/cybersecurity-training" element={<CybersecurityTraining />} />
      </Routes>
    </Router>
  );
}

export default App;