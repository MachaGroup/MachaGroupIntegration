import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BuildingProvider } from './Context/BuildingContext';
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
import RecognizingBullyingBehavior from './Screens/RecognizingBullyingBehavior';
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
import IntrusionDetectionSystems from './Screens/IntrusionDetectionSystems';
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
import ResponseTeamFormation from './Screens/ResponseTeamFormation';
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
import PeriodicReviews from './Screens/PeriodicReviews';
import RevisionProcedures from './Screens/RevisionProcedures';
import InternetUsage from './Screens/InternetUsage';
import DataHandling from './Screens/DataHandling';
import DataCollectionAndRetention from './Screens/DataCollectionAndRetention';
import DataProtectionMeasures from './Screens/DataProtectionMeasures';
import FERPACompliance from './Screens/FERPACompliance';
import GDPRCompliance from './Screens/GDPRCompliance';
import PolicyEvaluationCriteria from './Screens/PolicyEvaluationCriteria';
import StakeholderFeedback from './Screens/StakeholderFeedback';
import ChangeManagementProcess from './Screens/ChangeManagementProcess';
import ThreatRecognition from './Screens/ThreatRecognition';
import CybersecurityTraining from './Screens/CybersecurityTraining';
import ConflictResolution from './Screens/ConflictResolution';
import EmergencyCommunication from './Screens/EmergencyCommunication';
import FirstAidResponse from './Screens/FirstAidResponse';
import EvacuationProcedures from './Screens/EvacuationProcedures';
import FireExtinguisherLocations from './Screens/FireExtinguisherLocations';
import ClassroomLockdownProtocols from './Screens/ClassroomLockdownProtocols';
import LockdownCommunicationProtocols from './Screens/LockdownCommunicationProtocols';
import LawEnforcementCoordination from './Screens/LawEnforcementCoordination';
import DisasterDrills from './Screens/DisasterDrills';
import TornadoShelterLocations from './Screens/TornadoShelterLocations';
import SevereWeatherMonitoring from './Screens/SevereWeatherMonitoring';
import TornadoDrills from './Screens/TornadoDrills';
import EarthquakeDrills from './Screens/EarthquakeDrills';
import FireDrill from './Screens/FireDrill';
import DrillScenarios from './Screens/DrillScenarios';
import LockdownSignalRecognition from './Screens/LockdownSignalRecognition';
import StaffRolesAndResponsibilities from './Screens/StaffRolesAndResponsibilities';
import DebriefingAndFeedback from './Screens/DebriefingAndFeedback';
import EvacuationRoutesReview from './Screens/EvacuationRoutesReview';
import DrillFrequency from './Screens/DrillFrequency';
import SpeakerLocations from './Screens/SpeakerLocations';
import EmergencyAnnouncementProtocols from './Screens/EmergencyAnnouncementProtocols';
import BackupPowerSystems from './Screens/BackupPowerSystems';
import ContactInformationDatabase from './Screens/ContactInformationDatabase';
import AlertActivationProcedures from './Screens/AlertActivationProcedures';
import IntegrationWithParentCommunication from './Screens/IntegrationWithParentCommunication';
import TwoWayRadios from './Screens/TwoWayRadios';
import EmergencyCommunicationTraining from './Screens/EmergencyCommunicationTraining';
import CommunicationPlatforms from './Screens/CommunicationPlatforms';
import ParentNotificationProcedures from './Screens/ParentNotificationProcedures';
import CommunicationLanguage from './Screens/CommunicationLanguage';
import TrainingProviders from './Screens/TrainingProviders';
import TrainingMaterials from './Screens/TrainingMaterials';
import RecertificationSchedule from './Screens/RecertificationSchedule';
import ScenarioBasedTraining from './Screens/ScenarioBasedTraining';
import PostIncidentSupport from './Screens/PostIncidentSupport';
import CurriculumIntegration from './Screens/CurriculumIntegration';
import StudentHandbooks from './Screens/StudentHandbooks';
import ParentInvolvement2 from './Screens/ParentInvolvement2';
import SafetyDemonstrations from './Screens/SafetyDemonstrations';
import RolePlayingScenarios from './Screens/RolePlayingScenarios';
import StudentLeadership from './Screens/StudentLeadership';
import SafetyWorkshops from './Screens/SafetyWorkshops';
import ParentVolunteerPrograms from './Screens/ParentVolunteerPrograms';
import ParentAdvisoryCommittees from './Screens/ParentAdvisoryCommittees';
import ParentTeacherAssociations from './Screens/ParentTeacherAssociations';
import EmergencyContacts from './Screens/EmergencyContacts';
import ParentFeedbackMechanisms from './Screens/ParentFeedbackMechanisms';
import LawEnforcementPartnership from './Screens/LawEnforcementPartnership';
import FireDepartmentCollaboration from './Screens/FireDepartmentCollaboration';
import HealthcareProviderEngagement from './Screens/HealthcareProviderEngagement';
import EmergencyShelters from './Screens/EmergencyShelters';
import MedicalFacilities from './Screens/MedicalFacilities';
import MentalHealthServices from './Screens/MentalHealthServices';
import FirstAidCPRTraining2 from './Screens/FirstAidCPRTraining2';
import BasicFirstAidTechniques from './Screens/BasicFirstAidTechniques';
import CPRCertification from './Screens/CPRCertification';
import AEDTraining from './Screens/AEDTraining';
import ActiveShooterResponse from './Screens/ActiveShooterResponse';
import EmergencyResponseProtocols from './Screens/EmergencyResponseProtocols';
import EmergencyEvacuationProcedures from './Screens/EmergencyEvacuationProcedures';
import EmergencyCommunication2 from './Screens/EmergencyCommunication2';
import IdentifyingSuspiciousBehavior from './Screens/IdentifyingSuspiciousBehavior';
import RecognizingSecurityBreaches from './Screens/RecognizingSecurityBreaches';
import PhishingAwareness2 from './Screens/PhishingAwareness2';
import PasswordSecurity2 from './Screens/PasswordSecurity2';
import DataProtection2 from './Screens/DataProtection2';
import FireDrills from './Screens/FireDrills';
import LockdownDrills2 from './Screens/LockdownDrills2';
import SevereWeatherPreparedness from './Screens/SevereWeatherPreparedness';
import StrangerDangerAwareness from './Screens/StrangerDangerAwareness';
import InternetSafety from './Screens/InternetSafety';
import VerbalBullying from './Screens/VerbalBullying';
import PhysicalBullying from './Screens/PhysicalBullying';
import CyberBullying from './Screens/CyberBullying';
import TrustedAdults from './Screens/TrustedAdults';
import AnonymousReportingSystems from './Screens/AnonymousReportingSystems';
import PeerSupportNetworks from './Screens/PeerSupportNetworks';
import RecognizingSecurityIncidents from './Screens/RecognizingSecurityIncidents';
import IncidentReportingProcedures from './Screens/IncidentReportingProcedures';
import AcceptableUsePolicyTraining from './Screens/AcceptableUsePolicyTraining';
import DataHandlingGuidelines from './Screens/DataHandlingGuidelines';
import AccessRestrictions from './Screens/AccessRestrictions';
import AccessPoints from './Screens/AccessPoints';
import BuildingSecurity from './Screens/BuildingSecurity';
import PerimeterSecurity from './Screens/PerimeterSecurity';
import CCTVCameras from './Screens/CCTVCameras';
import AlarmSystems from './Screens/AlarmSystems';
import OnSiteSecurity from './Screens/OnSiteSecurity';
import PersonalDeviceUsage from './Screens/PersonalDeviceUsage';
import DataClassification from './Screens/DataClassification';
import DataSharingPolicies from './Screens/DataSharingPolicies';
import DataMinimization from './Screens/DataMinimization';
import DataRetentionPeriods from './Screens/DataRetentionPeriods';
import EncryptionRequirements from './Screens/EncryptionRequirements';
import DataAccessControls from './Screens/DataAccessControls';
import StudentPrivacyRights from './Screens/StudentPrivacyRights';
import DataSecurityRequirements from './Screens/DataSecurityRequirements';
//Tier 4 PS
import MainEntrance from './Screens/MainEntrance';
import SecondaryEntrances from './Screens/SecondaryEntrances';
import FencingandBarriers from './Screens/FencingandBarriers';
import LockingMechanisms from './Screens/LockingMechanisms';
import Lighting from './Screens/Lighting';
import IndoorCameras from './Screens/IndoorCameras';
import OutdoorCameras from './Screens/OutdoorCameras';
import IntrusionAlarms from './Screens/IntrusionAlarms';
import PerimeterAlarms from './Screens/PerimeterAlarms';
import SecurityGuards from './Screens/SecurityGuards';
import ReceptionStaff from './Screens/ReceptionStaff';
import SecurityGates from './Screens/SecurityGates';
import Turnstiles from './Screens/Turnstiles';
import AccessControlSystems from './Screens/AccessControlSystems';
import StationedGuards from './Screens/StationedGuards';
import CardReaders from "./Screens/CardReaders";
import BiometricScanners from "./Screens/BiometricScanners";
import AccessControlSoftware from "./Screens/AccessControlSoftware";
import PerimeterFencing from "./Screens/PerimeterFencing";
import VehicleBarriers from "./Screens/VehicleBarriers";
import RazorWire from "./Screens/RazorWire";
import MotionActivatedLights from "./Screens/MotionActivatedLights";
import Floodlights from "./Screens/Floodlights";
import DoorLocks from "./Screens/DoorLocks";
import WindowLocks from "./Screens/WindowLocks";
import AccessControlKeypads from "./Screens/AccessControlKeypads";
import DomeCameras from "./Screens/DomeCameras";
import PTZCameras from "./Screens/PTZCameras";
import BulletCameras from "./Screens/BulletCameras";
import WeatherproofCameras from "./Screens/WeatherproofCameras";
import InfraredCameras from "./Screens/InfraredCameras";
import MotionSensors from "./Screens/MotionSensors";
import GlassBreakSensors from "./Screens/GlassBreakSensors";
import DoorAlarms from "./Screens/DoorAlarms";
import FenceSensors from "./Screens/FenceSensors";
import GateAlarms from "./Screens/GateAlarms";
import OnSiteGuards from "./Screens/OnSiteGuards";
import RovingPatrols from "./Screens/RovingPatrols";
import FrontDeskSecurity from "./Screens/FrontDeskSecurity";
import VisitorCheckin from "./Screens/VisitorCheckin";
import CreateanAccount from "./Screens/CreateanAccount";
import ForgotPassword from "./Screens/ForgotPassword";
import BuildingandAddress from "./Screens/BuildingandAddress";
import AccessControlLists from "./Screens/AccessControlLists";
import FirewallPolicies from "./Screens/FirewallPolicies";
import SignatureBasedDetection from './Screens/SignatureBasedDetection';
import NetworkAnomalyDetection from "./Screens/NetworkAnomalyDetection";
import AntivirusSoftware from "./Screens/AntivirusSoftware";
import MalwareRemovalTools from "./Screens/MalwareRemovalTools";
import PatchManagement from "./Screens/PatchManagement";
import DeviceEncryption from "./Screens/DeviceEncryption";
import FullDiskEncryption from "./Screens/FullDiskEncryption";
import FileLevelEncryption from "./Screens/FileLevelEncryption";
import SecureEmailGateways from "./Screens/SecureEmailGateways";
import EndToEndEncryption from "./Screens/EndToEndEncryption";
import RegularBackupSchedules from "./Screens/RegularBackupSchedules";
import OffSiteBackupStorage from "./Screens/OffSiteBackupStorage";
import BackupTesting from "./Screens/BackupTesting";
import ContinuityOfOperations from "./Screens/ContinuityOfOperations";
import SimulatedPhishingCampaigns from "./Screens/SimulatedPhishingCampaigns";
import PhishingAwarenessTraining from "./Screens/PhishingAwarenessTraining";
import IncidentReporting from "./Screens/IncidentReporting";
import ContactInformation from "./Screens/ContactInformation";
import PasswordComplexityRequirements from "./Screens/PasswordComplexityRequirements";
import PasswordExpirationPolicies from "./Screens/PasswordExpirationPolicies";
import TwoFactorAuthentication from "./Screens/TwoFactorAuthentication";
import BiometricAuthentication from "./Screens/BiometricAuthentication";
import FireAlarmSystems from "./Screens/FireAlarmSystems";
import SecurityInformationAndEventManagement from "./Screens/SecurityInformationAndEventManagement";
import IntrusionDetectionSystems2 from "./Screens/IntrusionDetectionSystems2";
import UserBehaviorAnalytics from "./Screens/UserBehaviorAnalytics";
import IncidentResponseTeamRolesAndResponsibilities from "./Screens/IncidentResponseTeamRolesAndResponsibilities";
import CommunicationChannelsAndProtocols from "./Screens/CommunicationChannelsAndProtocols";
import IsolationProcedures from "./Screens/IsolationProcedures";
import IncidentResponsePatchManagement from "./Screens/IncidentResponsePatchManagement";
import DataProtectionImpactAssessments from "./Screens/DataProtectionImpactAssessments";
import ConsentManagement from "./Screens/ConsentManagement";
import StudentDataPrivacyPolicies from "./Screens/StudentDataPrivacyPolicies";
import DataBreachNotificationProcedures from "./Screens/DataBreachNotificationProcedures";
import ComplianceWithRegulations from './Screens/ComplianceWithRegulations'; 
import EffectivenessInAddressingSecurityRisks from  './Screens/EffectivenessInAddressingSecurityRisks';
import StaffInputOnPolicyImpact from './Screens/StaffInputOnPolicyImpact';
import PolicyRevisionApprovalWorkflow from './Screens/PolicyRevisionApprovalWorkflow';
import DocumentationOfPolicyChanges from './Screens/DocumentationOfPolicyChanges';
import SafetyAndSecurityTraining from './Screens/SafetyAndSecurityTraining';
import FireSafetyTraining from './Screens/FireSafetyTraining';
import EvacuationProceduresTraining from './Screens/EvacuationProceduresTraining';
import IdentifyingSuspiciousBehavior2 from './Screens/IdentifyingSuspiciousBehavior2';
import ResponseToSecurityThreats from './Screens/ResponseToSecurityThreats';
import StrangerDangerAwareness2 from './Screens/StrangerDangerAwareness2';
import FireDrills2 from './Screens/FireDrills2';
import LockdownDrills3 from './Screens/LockdownDrills3';
import KeycardAccessSystems from './Screens/KeycardAccessSystems';
import BiometricAccessControlSystems from './Screens/BiometricAccessControlSystems';
import CCTVCameraInstallation from './Screens/CCTVCameraInstallation';
import IntrusionDetectionSystems3 from './Screens/IntrusionDetectionSystems3';
import PerimeterSecurityFencing from './Screens/PerimeterSecurityFencing';
import FirewallImplementation from './Screens/FirewallImplementation';
import IntrusionPreventionSystems from './Screens/IntrusionPreventionSystems';
import DataEncryptionProtocols from './Screens/DataEncryptionProtocols';
import RegularDataBackups from './Screens/RegularDataBackups';
import EndpointSecuritySolutions from './Screens/EndpointSecuritySolutions';
import ContinuousImprovement from './Screens/ContinuousImprovement';
import RiskAssessmentAndMitigation from './Screens/RiskAssessmentAndMitigation';
import SafetyRiskAssessment from './Screens/SafetyRiskAssessment';
import HazardIdentification from './Screens/HazardIdentification';
import RiskAnalysis from './Screens/RiskAnalysis';
import SecurityThreatAssessment from './Screens/SecurityThreatAssessment';
import ThreatIdentification from './Screens/ThreatIdentification';
import SecurityVulnerabilityAssessment from './Screens/SecurityVulnerabilityAssessment';
import EmergencyPreparednessPlanning from './Screens/EmergencyPreparednessPlanning';
import EmergencyResponsePlanDevelopment from './Screens/EmergencyResponsePlanDevelopment';
import IncidentCommandStrucutre from './Screens/IncidentCommandStructure';
import ScenarioBasedPlanning from './Screens/ScenarioBasedPlanning';
import CrisisManagementProcedures from './Screens/CrisisManagementProcedures';
import CrisisCommunicationPlan from './Screens/CrisisCommunicationPlan';
import ContinuityOfOperationsPlan from './Screens/ContinuityOfOperationsPlan';
import StaffTrainingPrograms from './Screens/StaffTrainingPrograms';
import SafetyProceduresTraining from './Screens/SafetyProceduresTraining';
import SecurityAwarenessTraining2 from './Screens/SecurityAwarenessTraining2';
import StudentSafetyEducation from './Screens/StudentSafetyEducation';
import PersonalSafetyEducation from './Screens/PersonalSafetyEducation';
import EmergencyResponseDrillsForStudents from './Screens/EmergencyResponseDrillsForStudents';
import SecurityInfrastructureEnhancement from './Screens/SecurityInfrastructureEnhancement';
import PhysicalSecurityMeasures from './Screens/PhysicalSecurityMeasures';
import AccessControlSystems2 from './Screens/AccessControlSystems2';
import SurveillanceSystems2 from './Screens/SurveillanceSystems2';
import CybersecurityInfrastructure from './Screens/CybersecurityInfrastructure';
import NetworkSecurityMeasures from './Screens/NetworkSecurityMeasures';
import DataProtectionMeasures2 from './Screens/DataProtectionMeasures2';
import PhysicalHazardsAssessment from './Screens/PhysicalHazardsAssessment';
import EnvironmentalHazardsAssessment from './Screens/EnvironmentalHazardsAssessment';
import LikelihoodAndImpactAssessment from './Screens/LikelihoodAndImpactAssessment';
import VulnerabilityAssessment from './Screens/VulnerabilityAssessment';
import ExternalThreats from './Screens/ExternalThreats';
import InternalThreats from './Screens/InternalThreats';
import PerimeterSecurityEvaluation from './Screens/PerimeterSecurityEvaluation';
import AccessControlSystemsAssessment from './Screens/AccessControlSystemsAssessment';
import CybersecurityVulnerabilityAssessment from './Screens/CybersecurityVulnerabilityAssessment';
import RolesAndResponsibilitiesOfEmergencyResponseTeam from './Screens/RolesAndResponsibilitiesOfEmergencyResponseTeam';
import CommunicationProtocols2 from './Screens/CommunicationProtocols2';
import TabletopExercises from './Screens/TabletopExercises';
import SimulatedEmergencyDrills from './Screens/SimulatedEmergencyDrills';
import InternalCommunicationProtocols from './Screens/InternalCommunicationProtocols';
import ExternalCommunicationProtocols from './Screens/ExternalCommunicationProtocols';
import CriticalFunctionIdentification from './Screens/CriticalFunctionIdentification';
import BackupSystemsAndRedundancies from './Screens/BackupSystemsAndRedundancies';
import StrongPasswordGuidelines from './Screens/StrongPasswordGuidelines';
import MultiFactorAuthenticationAwareness from './Screens/MultiFactorAuthenticationAwareness';
import LawEnforcementPartnerships from './Screens/LawEnforcementPartnerships';
import SchoolResourceOfficers from './Screens/SchoolResourceOfficers';
import SRORolesAndResponsibilities from './Screens/SRORolesAndResponsibilities';
import SROTrainingAndCertification from './Screens/SROTrainingAndCertification';
import FireDepartmentCollaborations from './Screens/FireDepartmentCollaborations';
import FirePreventionPrograms from './Screens/FirePreventionPrograms';
import EmergencyResponseCoordination from './Screens/EmergencyResponseCoordination';
import JointCommunityEvents from './Screens/JointCommunityEvents';
import JointTrainingExercises from './Screens/JointTrainingExercises';
import ActiveShooterDrillsWithPolice from './Screens/ActiveShooterDrillsWithPolice';
import EmergencyResponseTraining2 from './Screens/EmergencyResponseTraining2';
import CrisisInterventionWorkshops from './Screens/CrisisInterventionWorkshops';
import FireSafetyEducationForStudents from './Screens/FireSafetyEducationForStudents';
import FireDrillsAndEvacuationPlanning from './Screens/FireDrillsAndEvacuationPlanning';
import FireDepartmentAccessToSchoolFacilities from './Screens/FireDepartmentAccessToSchoolFacilities';
import MutualAidAgreements from './Screens/MutualAidAgreements';
import FirefighterTrainingSessions from './Screens/FirefighterTrainingSessions';
import CollaborationWithLocalAgenices2 from './Screens/CollaborationWithLocalAgencies2';
import CommunityPartnership from './Screens/CommunityPartnership';
import ParentAndCommunityInvolvement from './Screens/ParentAndCommunityInvolvement';
import ParentTeacherAssociations2 from './Screens/ParentTeacherAssociations2';
import FamilyEngagementEvents from './Screens/FamilyEngagementEvents';
import VolunteerPrograms from './Screens/VolunteerPrograms';
import CommunityOutreachPrograms from './Screens/CommunityOutreachPrograms';
import CommunityEngagementSurveys from './Screens/CommunityEngagementSurveys';
import BackToSchoolNights from './Screens/BackToSchoolNights';
import ParentWorkshopsOnStudentSafety from './Screens/ParentWorkshopsOnStudentSafety';
import ParentTeacherConferences from './Screens/ParentTeacherConferences';
import ClassroomHelpers from './Screens/ClassroomHelpers';
import ParentChaperonesForFieldTrips from './Screens/ParentChaperonesForFieldTrips';
import FundraisingEvents from './Screens/FundraisingEvents';
import FeedbackCollectionFromCommunity from './Screens/FeedbackCollectionFromCommunity';
import AssessingCommunityNeedsAndPriorities from './Screens/AssessingCommunityNeedsAndPriorities';
import PlanningCommunityOutreachStrategies from './Screens/PlanningCommunityOutreachStrategies';
import CommunicationChannels from './Screens/CommunicationChannels';
import ResponseProtocols2 from './Screens/ResponseProtocols2';
import PhishingSimulationExercises from './Screens/PhishingSimulationExercises';
import PrivacyAndSecurity from './Screens/PrivacyAndSecurity';
import PastAssessments from './Screens/PastAssessments';
import AssessmentDetails from './Screens/AssessmentDetails'; // Create this component
import AccessControlListsPage from './Screens/AccessControlLists';

function App() {
  return (
    <div className="App">
    <BuildingProvider>
    <Router>
      <Routes>
        {/* Default route for the main screen */}
        <Route path="/" element={<Login />} />

        {/* Other Routes */}
        <Route path="/access-control-lists-form" element={<AccessControlListsPage />} />
        <Route path="/assessment-details/:assessmentId" element={<AssessmentDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Form" element={<FormInputPage />} />
        <Route path="/Main" element={<MainScreen />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/EditProfile" element={<EditProfile />} />
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
        <Route path="/fire-emergency-plan" element={<FireEmergencyPlans />} />
        <Route path="/lockdown-procedures" element={<LockdownProcedures />} />
        <Route path="/natural-disaster-plans" element={<NaturalDisasterPlans />} />
        <Route path="/natural-disaster-drills" element={<NaturalDisasterDrills />} />
        <Route path="/lockdown-drills" element={<LockdownDrills />} />
        <Route path="/publicAddressSystem" element={<PublicAddressSystem />} />
        <Route path="/TextEmailAlerts" element={<TextEmailAlerts />} />
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
        <Route path="/CommunityPartnerships" element={<CommunityPartnerships />} />
        <Route path="/security-awareness-training" element={<SecurityAwarenessTraining />} />
        <Route path="/bullying-prevention" element={<BullyingPrevention />} />
        <Route path="/parent-education-events" element={<ParentEducationEvents />} />
        <Route path="/parent-comm" element={<ParentComm />} />
        <Route path="/collaboration-with-local-agencies" element={<CollaborationWithLocalAgenices />} />
        <Route path="/access-to-community-resources" element={<AccessToCommunityResources />} />
        <Route path="/recognizing-bullying-behavior" element={<RecognizingBullyingBehavior />} />
        <Route path="/reporting-procedures" element={<ReportingProcedures />} />
        <Route path="/network-security" element={<NetworkSecurity />} />
        <Route path="/data-protection" element={<DataProtection />} />
        <Route path="/user-awareness" element={<UserAwarenessAndTraining />} />
        <Route path="/firewalls" element={<FirewallsAndIntrusionDetection />} />
        <Route path="/endpoint-security" element={<EndpointSecurity />} />
        <Route path="/DataEncryption" element={<DataEncryption />} />
        <Route path="/DataBackupAndRecovery" element={<DataBackupAndRecovery />} />
        <Route path="/phishing-awareness" element={<PhishingAwareness />} />
        <Route path="/password-management" element={<PasswordManagement />} />
        <Route path="/incident-identification" element={<IncidentIdentification />} />
        <Route path="/incident-response-planning" element={<IncidentResponsePlanning />} />
        <Route path="/firewall-configuration" element={<FirewallConfiguratinon />} />
        <Route path="/IntrusionDetectionSystems" element={<IntrusionDetectionSystems />} />
        <Route path="/antivirus-and-malware-protection" element={<AntivirusAndMalwareProtection />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/file-encryption" element={<FileEncryption />} /> 
        <Route path="/email-encryption" element={<EmailEncryption />} />
        <Route path="/BackupSolutions" element={<BackupSolutions />} />
        <Route path="/disaster-recovery-planning" element={<DisasterRecoveryPlanning />} />
        <Route path="/phishing-simulation-training" element={<PhishingSimulationTraining />} />
        <Route path="/reporting-procedures2" element={<ReportingProcedures2 />} />
        <Route path="/password-policies" element={<PasswordPolicies />} />
        <Route path="/multi-factor-authentication" element={<MultiFactorAuthentication />} />
        <Route path="/event-logging" element={<EventLoggingAndMonitoring />} />
        <Route path="/user-activity-monitoring" element={<UserActivityMonitoring />} />
        <Route path="/ResponseTeamFormation" element={<ResponseTeamFormation />} />
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
        <Route path="/periodic-reviews" element={<PeriodicReviews />} />
        <Route path="/revision-procedures" element={<RevisionProcedures />} />
        <Route path="/internet-usage" element={<InternetUsage />} />
        <Route path="/data-handling" element={<DataHandling />} />
        <Route path="/data-collection-and-retention" element={<DataCollectionAndRetention />} />
        <Route path="/data-protection-measures" element={<DataProtectionMeasures />} />
        <Route path="/FERPA-compliance" element={<FERPACompliance />} />
        <Route path="/GDPR-compliance" element={<GDPRCompliance />} />
        <Route path="/policy-evaluation-criteria" element={<PolicyEvaluationCriteria />} />
        <Route path="/stakeholder-feedback" element={<StakeholderFeedback />} />
        <Route path="/change-management-process" element={<ChangeManagementProcess />} />
        <Route path="/AccessP" element={<AccessPoints />} />
        <Route path="/BuildingS" element={<BuildingSecurity />} />
        <Route path="/PerimeterS" element={<PerimeterSecurity />} />
        <Route path="/CCTV" element={<CCTVCameras />} />
        <Route path="/AlarmS" element={<AlarmSystems />} />
        <Route path="/OnSite" element={<OnSiteSecurity />} />
        <Route path="/MainE" element={<MainEntrance />} />
        <Route path="/SecondaryEntrances" element={<SecondaryEntrances />} />
        <Route path="/FencingandBarriers" element={<FencingandBarriers />} />
        <Route path="/LockingMechanisms" element={<LockingMechanisms />} />
        <Route path="/Lighting" element={<Lighting />} />
        <Route path="/IndoorCameras" element={<IndoorCameras />} />
        <Route path="/OutdoorCameras" element={<OutdoorCameras />} />
        <Route path="/IntrusionAlarms" element={<IntrusionAlarms />} />
        <Route path="/PerimeterAlarms" element={<PerimeterAlarms />} />
        <Route path="/SecurityGuards" element={<SecurityGuards />} />
        <Route path="/SecurityPersonnel" element={<SecurityPersonnel />} />
        <Route path="/ReceptionStaff" element={<ReceptionStaff />} />
        <Route path="/SecurityGates" element={<SecurityGates />} />
        <Route path="/Turnstiles" element={<Turnstiles />} />
        <Route path="/AccessControlSystems" element={<AccessControlSystems />} />
        <Route path="/StationedGuards" element={<StationedGuards />} />
        <Route path="/CardReaders" element={<CardReaders />} />
        <Route path="/BiometricScanners" element={<BiometricScanners />} />
        <Route path="/AccessControlSoftware" element={<AccessControlSoftware />} />
        <Route path="/PerimeterFencing" element={<PerimeterFencing />} />
        <Route path="/VehicleBarriers" element={<VehicleBarriers />} />
        <Route path="/RazorWire" element={<RazorWire />} />
        <Route path="/MotionActivatedLights" element={<MotionActivatedLights />} />
        <Route path="/Floodlights" element={<Floodlights />} />
        <Route path="/DoorLocks" element={<DoorLocks />} />
        <Route path="/WindowLocks" element={<WindowLocks />} />
        <Route path="/AccessControlKeypads" element={<AccessControlKeypads />} />
        <Route path="/DomeCameras" element={<DomeCameras />} />
        <Route path="/PTZCameras" element={<PTZCameras />} />
        <Route path="/BulletCameras" element={<BulletCameras />} />
        <Route path="/WeatherproofCameras" element={<WeatherproofCameras />} />
        <Route path="/InfraredCameras" element={<InfraredCameras />} />
        <Route path="/MotionSensors" element={<MotionSensors />} />
        <Route path="/GlassBreakSensors" element={<GlassBreakSensors />} />
        <Route path="/DoorAlarms" element={<DoorAlarms />} />
        <Route path="/FenceSensors" element={<FenceSensors />} />
        <Route path="/GateAlarms" element={<GateAlarms />} />
        <Route path="/OnSiteGuards" element={<OnSiteGuards />} />
        <Route path="/RovingPatrols" element={<RovingPatrols />} />
        <Route path="/FrontDeskSecurity" element={<FrontDeskSecurity />} />
        <Route path="/VisitorCheckin" element={<VisitorCheckin />} />
        <Route path="/CreateanAccount" element={<CreateanAccount />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/BuildingandAddress" element={<BuildingandAddress />} />
        <Route path="/AccessControlLists" element={<AccessControlLists />} />
        <Route path="/FirewallPolicies" element={<FirewallPolicies />} />
        <Route path="/NetworkAnomalyDetection" element={<NetworkAnomalyDetection />} />
        <Route path="/SignatureBasedDetection" element={<SignatureBasedDetection />} />
        <Route path="/AntivirusSoftware" element={<AntivirusSoftware />} />
        <Route path="/MalwareRemovalTools" element={<MalwareRemovalTools />} />
        <Route path="/PatchManagement" element={<PatchManagement />} />
        <Route path="/ConflictResolution" element={<ConflictResolution />} />
        <Route path="/ScenarioBasedTraining" element={<ScenarioBasedTraining />} />
        <Route path="/EmergencyResponseProtocols" element={<EmergencyResponseProtocols />} />
        <Route path="/PostIncidentSupport" element={<PostIncidentSupport />} />
        <Route path="/FirstAid/CPRTraining" element={<FirstAidCPRTraining />} />
        <Route path="/BasicFirstAidTechniques" element={<BasicFirstAidTechniques />} />
        <Route path="/CPRCertification" element={<CPRCertification />} />
        <Route path="/AEDTraining" element={<AEDTraining />} />
        <Route path="/ActiveShooterResponse" element={<ActiveShooterResponse />} />
        <Route path="/ResponseProtocols2" element={<ResponseProtocols2 />} />
        <Route path="/EmergencyEvacuationProcedures" element={<EmergencyEvacuationProcedures />} />
        <Route path="/DeviceEncryption" element={<DeviceEncryption />} />
        <Route path="/FullDiskEncryption" element={<FullDiskEncryption />} />
        <Route path="/SecureEmailGateways" element={<SecureEmailGateways />} />
        <Route path="FileLevelEncryption" element={<FileLevelEncryption />} />
        <Route path="EndToEndEncryption" element={<EndToEndEncryption />} />
        <Route path="/RegularBackupSchedules" element={<RegularBackupSchedules />} />
        <Route path="/OffSiteBackupStorage" element={<OffSiteBackupStorage />} />
        <Route path="/BackupTesting" element={<BackupTesting />} />
        <Route path="/ContinuityOfOperations" element={<ContinuityOfOperations />} />
        <Route path="/SimulatedPhishingCampaigns" element={<SimulatedPhishingCampaigns />} />
        <Route path="/PhishingAwarenessTraining" element={<PhishingAwarenessTraining />} />
        <Route path="/IncidentReporting" element={<IncidentReporting />} />
        <Route path="/ContactInformation" element={<ContactInformation />} />
        <Route path="/PasswordComplexityRequirements" element={<PasswordComplexityRequirements />} />
        <Route path="/PasswordExpirationPolicies" element={<PasswordExpirationPolicies />} />
        <Route path="/TwoFactorAuthentication" element={<TwoFactorAuthentication />} />
        <Route path="/BiometricAuthentication" element={<BiometricAuthentication />} />
        <Route path="ConflictResolution" element={<ConflictResolution />} />
        <Route path="EmergencyCommunication" element={<EmergencyCommunication />} />
        <Route path="FirstAidResponse" element={<FirstAidResponse />} />
        <Route path="EvacuationProcedures" element={<EvacuationProcedures />}/>
        <Route path="FireExtinguisherLocations" element={<FireExtinguisherLocations />} />
        <Route path="FireAlarmSystems" element={<FireAlarmSystems />} />
        <Route path="ThreatRecognition" element={<ThreatRecognition />} />
        <Route path="CybersecurityTraining" element={<CybersecurityTraining />} />
        <Route path="ClassroomLockdownProtocols" element={<ClassroomLockdownProtocols />} />
        <Route path="LockdownCommunicationProtocols" element={<LockdownCommunicationProtocols />} />
        <Route path="LawEnforcementCoordination" element={<LawEnforcementCoordination />} />
        <Route path="FireDepartmentCollaboration" element={<FireDepartmentCollaboration />} />
        <Route path="HealthcareProviderEngagement" element={<HealthcareProviderEngagement />} />
        <Route path="EmergencyShelters" element={<EmergencyShelters />} />
        <Route path="MedicalFacilities" element={<MedicalFacilities />} />
        <Route path="MentalHealthServices" element={<MentalHealthServices />} />
        <Route path="FirstAidCPRTraining2" element={<FirstAidCPRTraining2 />} />
        <Route path="DisasterDrills" element={<DisasterDrills />} />
        <Route path="TornadoShelterLocations" element={<TornadoShelterLocations />} />
        <Route path="SevereWeatherMonitoring" element={<SevereWeatherMonitoring />} />
        <Route path="TornadoDrills" element={<TornadoDrills />} />
        <Route path="EarthquakeDrills" element={<EarthquakeDrills />} />
        <Route path="FireDrill" element={<FireDrill />} />
        <Route path="DrillScenarios" element={<DrillScenarios />} />
        <Route path="LockdownSignalRecognition" element={<LockdownSignalRecognition />} />
        <Route path="StaffRolesAndResponsibilities" element={<StaffRolesAndResponsibilities />} />
        <Route path="DebriefingAndFeedback" element={<DebriefingAndFeedback />} />
        <Route path="EvacuationRoutesReview" element={<EvacuationRoutesReview />} />
        <Route path="DrillFrequency" element={<DrillFrequency />} />
        <Route path="SpeakerLocations" element={<SpeakerLocations />} />
        <Route path="EmergencyAnnouncementProtocols" element={<EmergencyAnnouncementProtocols />} />
        <Route path="BackupPowerSystems" element={<BackupPowerSystems />} />
        <Route path="ContactInformationDatabase" element={<ContactInformationDatabase />} />
        <Route path="AlertActivationProcedures" element={<AlertActivationProcedures />} />
        <Route path="IntegrationWithParentCommunication" element={<IntegrationWithParentCommunication />} />
        <Route path="TwoWayRadios" element={<TwoWayRadios />} />
        <Route path="EmergencyCommunicationTraining" element={<EmergencyCommunicationTraining />} />
        <Route path="CommunicationPlatforms" element={<CommunicationPlatforms />} />
        <Route path="ParentNotificationProcedures" element={<ParentNotificationProcedures />} />
        <Route path="CommunicationLanguage" element={<CommunicationLanguage />} />
        <Route path="TrainingProviders" element={<TrainingProviders />} />
        <Route path="TrainingMaterials" element={<TrainingMaterials />} />
        <Route path="RecertificationSchedule" element={<RecertificationSchedule />} />
        <Route path="ScenarioBasedTraining" element={<ScenarioBasedTraining />} />
        <Route path="PostIncidentSupport" element={<PostIncidentSupport />} />
        <Route path="CurriculumIntegration" element={<CurriculumIntegration />} />
        <Route path="StudentHandbooks" element={<StudentHandbooks />} />
        <Route path="ParentInvolvement2" element={<ParentInvolvement2 />} />
        <Route path="SafetyDemonstrations" element={<SafetyDemonstrations />} />
        <Route path="RolePlayingScenarios" element={<RolePlayingScenarios />} />
        <Route path="StudentLeadership" element={<StudentLeadership />} />
        <Route path="SafetyWorkshops" element={<SafetyWorkshops />} />
        <Route path="ParentVolunteerPrograms" element={<ParentVolunteerPrograms />} />
        <Route path="ParentAdvisoryCommittees" element={<ParentAdvisoryCommittees />} />
        <Route path="ParentTeacherAssociations" element={<ParentTeacherAssociations />} />
        <Route path="EmergencyContacts" element={<EmergencyContacts />} />
        <Route path="ParentFeedbackMechanisms" element={<ParentFeedbackMechanisms />} />
        <Route path="LawEnforcementPartnership" element={<LawEnforcementPartnership />} />
        <Route path="BasicFirstAidTechniques" element={<BasicFirstAidTechniques />} />
        <Route path="CPRCertification" element={<CPRCertification />} />
        <Route path="AEDTraining" element={<AEDTraining />} />
        <Route path="ActiveShooterResponse" element={<ActiveShooterResponse />} />
        <Route path="EmergencyResponseProtocols" element={<EmergencyResponseProtocols />} />
        <Route path="EmergencyEvacuationProcedures" element={<EmergencyEvacuationProcedures />} />
        <Route path="EmergencyCommunication2" element={<EmergencyCommunication2 />} />
        <Route path="IdentifyingSuspiciousBehavior" element={<IdentifyingSuspiciousBehavior />} />
        <Route path="RecognizingSecurityBreaches" element={<RecognizingSecurityBreaches />} />
        <Route path="PhishingAwareness2" element={<PhishingAwareness2 />} />
        <Route path="PasswordSecurity2" element={<PasswordSecurity2 />} />
        <Route path="DataProtection2" element={<DataProtection2 />} />
        <Route path="FireDrills" element={<FireDrills />} />
        <Route path="LockdownDrills2" element={<LockdownDrills2 />} />
        <Route path="SevereWeatherPreparedness" element={<SevereWeatherPreparedness />} />
        <Route path="StrangerDangerAwareness" element={<StrangerDangerAwareness />} />
        <Route path="InternetSafety" element={<InternetSafety />} />
        <Route path="VerbalBullying" element={<VerbalBullying />} />
        <Route path="PhysicalBullying" element={<PhysicalBullying />} />
        <Route path="CyberBullying" element={<CyberBullying />} />
        <Route path="TrustedAdults" element={<TrustedAdults />} />
        <Route path="AnonymousReportingSystems" element={<AnonymousReportingSystems />} />
        <Route path="PeerSupportNetworks" element={<PeerSupportNetworks />} />
        <Route path="RecognizingSecurityIncidents" element={<RecognizingSecurityIncidents />} />
        <Route path="IncidentReportingProcedures" element={<IncidentReportingProcedures />} />
        <Route path="AcceptableUsePolicyTraining" element={<AcceptableUsePolicyTraining />} />
        <Route path="DataHandlingGuidelines" element={<DataHandlingGuidelines />} />
        <Route path="AccessRestrictions" element={<AccessRestrictions />} />
        <Route path="FireAlarmSystems" element={<FireAlarmSystems />} />
        <Route path="SecurityInformationAndEventManagement" element={<SecurityInformationAndEventManagement />} />
        <Route path="IntrusionDetectionSystems2" element={<IntrusionDetectionSystems2 />} />
        <Route path="UserBehaviorAnalytics" element={<UserBehaviorAnalytics />} />
        <Route path="IncidentResponseTeamRolesAndResponsibilities" element={<IncidentResponseTeamRolesAndResponsibilities />} />
        <Route path="CommunicationChannelsAndProtocols" element={<CommunicationChannelsAndProtocols />} />
        <Route path="IsolationProcedures" element={<IsolationProcedures />} />
        <Route path="IncidentResponsePatchManagement" element={<IncidentResponsePatchManagement />} />
        <Route path="DataProtectionImpact" element={<DataProtectionImpactAssessments />} />
        <Route path="ConsentManagement" element={<ConsentManagement />} />
        <Route path="StudentDataPrivacyPolicies" element={<StudentDataPrivacyPolicies />} />
        <Route path="DataBreachNotificationProcedures" element={<DataBreachNotificationProcedures />} />
        <Route path="/conflict-resolution" element={<ConflictResolution />} />
        <Route path="/threat-recognition" element={<ThreatRecognition />} />
        <Route path="/cybersecurity-training" element={<CybersecurityTraining />} />
        <Route path="/emergency-communication" element={<EmergencyCommunication />} />
        <Route path="/first-aid-response" element={<FirstAidResponse />} />
        <Route path="/evacuation-procedures" element={<EvacuationProcedures />} />
        <Route path="fire-extinguisher-locations" element={<FireExtinguisherLocations />} />
        <Route path="/classroom-lockdown-protocols" element={<ClassroomLockdownProtocols />} />
        <Route path="/law-enforcement-coordination" element={<LawEnforcementCoordination />} />
        <Route path="/disaster-drills" element={<DisasterDrills />} />
        <Route path="/tornado-shelter-locations" element={<TornadoShelterLocations />} />
        <Route path="/severe-weather-monitoring" element={<SevereWeatherMonitoring />} />
        <Route path="/tornado-drills" element={<TornadoDrills />} />
        <Route path="/earthquake-drills" element={<EarthquakeDrills />} />
        <Route path="/fire-drill" element={<FireDrill />} />
        <Route path="/drill-scenarios" element={<DrillScenarios />} />
        <Route path="/lockdown-signal-recognition" element={<LockdownSignalRecognition />} />
        <Route path="/staff-roles-and-responsibilities" element={<StaffRolesAndResponsibilities />} />
        <Route path="/debriefing-and-feedback" element={<DebriefingAndFeedback />} />
        <Route path="/evacuation-routes-review" element={<EvacuationRoutesReview />} />
        <Route path="/drill-frequency" element={<DrillFrequency />} />
        <Route path="/speaker-locations" element={<SpeakerLocations />} />
        <Route path="/emergency-announcement-protocols" element={<EmergencyAnnouncementProtocols />} />
        <Route path="/backup-power-systems" element={<BackupPowerSystems />} />
        <Route path="/contact-information-database" element={<ContactInformationDatabase />} />
        <Route path="/alert-activation-procedures" element={<AlertActivationProcedures />} />
        <Route path="/intergration-with-parent-communication" element={<IntegrationWithParentCommunication />} />
        <Route path="/two-way-radios" element={<TwoWayRadios />} />
        <Route path="/emergency-communication-training" element={<EmergencyCommunicationTraining />} />
        <Route path="/communication-platforms" element={<CommunicationPlatforms />} />
        <Route path="/parent-notification-procedures" element={<ParentNotificationProcedures />} />
        <Route path="/communication-language" element={<CommunicationLanguage />} />
        <Route path="/training-providers" element={<TrainingProviders />} />
        <Route path="/training-materials" element={<TrainingMaterials />} />
        <Route path="/recertification-schedule" element={<RecertificationSchedule />} />
        <Route path="/scenario-based-training" element={<ScenarioBasedTraining />} />
        <Route path="/emergency-response-protocols" element={<EmergencyResponseProtocols />} />
        <Route path="/post-incident-support" element={<PostIncidentSupport />} />
        <Route path="/curriculum-integration" element={<CurriculumIntegration />} />
        <Route path="/student-handbooks" element={<StudentHandbooks />} />
        <Route path="/parent-involvement2" element={<ParentInvolvement2 />} />
        <Route path="/safety-demonstrations" element={<SafetyDemonstrations />} />
        <Route path="/role-playing-scenarios" element={<RolePlayingScenarios />} />
        <Route path="/student-leadership" element={<StudentLeadership />} />
        <Route path="/safety-workshops" element={<SafetyWorkshops />} />
        <Route path="/parent-volunteer-programs" element={<ParentVolunteerPrograms />} />
        <Route path="/parent-advisory-committees" element={<ParentAdvisoryCommittees />} />
        <Route path="/parent-teacher-associations" element={<ParentTeacherAssociations />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/parent-feedback-mechanisms" element={<ParentFeedbackMechanisms />} />
        <Route path="/fire-department-collaboration" element={<FireDepartmentCollaboration />} />
        <Route path="/emergency-shelters" element={<EmergencyShelters />} />
        <Route path="/medical-facilities" element={<MedicalFacilities />} />
        <Route path="/mental-health-services" element={<MentalHealthServices />} />
        <Route path="/first-aid-CPR-training2" element={<FirstAidCPRTraining2 />} />
        <Route path="/basic-first-aid-techniques" element={<BasicFirstAidTechniques />} />
        <Route path="/CPR-certification" element={<CPRCertification />} />
        <Route path="/AED-training" element={<AEDTraining />} />
        <Route path="/active-shooter-reponse" element={<ActiveShooterResponse />} />
        <Route path="/response-protocols2" element={<EmergencyResponseProtocols />} />
        <Route path="/evacuation-procedures2" element={<EmergencyEvacuationProcedures />} />
        <Route path="/emergency-communication2" element={<EmergencyCommunication2 />} />
        <Route path="/identifying-suspicious-behavior" element={<IdentifyingSuspiciousBehavior />} />
        <Route path="/recognizing-security-breaches" element={<RecognizingSecurityBreaches />} />
        <Route path="/phishing-awareness2" element={<PhishingAwareness2 />} />
        <Route path="/password-security2" element={<PasswordSecurity2 />} />
        <Route path="/data-protection2" element={<DataProtection2 />} />
        <Route path="/fire-drills" element={<FireDrills />} />
        <Route path="/lockdown-drills2" element={<LockdownDrills2 />} />
        <Route path="/severe-weather-preparedness" element={<SevereWeatherPreparedness />} />
        <Route path="/stranger-danger-awareness" element={<StrangerDangerAwareness />} />
        <Route path="/internet-safety" element={<InternetSafety />} />
        <Route path="/verbal-bullying" element={<VerbalBullying />} />
        <Route path="/physical-bullying" element={<PhysicalBullying />} />
        <Route path="/cyber-bullying" element={<CyberBullying />} />
        <Route path="/trusted-adults" element={<TrustedAdults />} />
        <Route path="/anonymous-reporting-systems" element={<AnonymousReportingSystems />} />
        <Route path="/peer-support-networks" element={<PeerSupportNetworks />} />
        <Route path="/recognizing-security-incidents" element={<RecognizingSecurityIncidents />} />
        <Route path="/incident-reporting-procedures" element={<IncidentReportingProcedures />} />
        <Route path="/accpetable-use-policy-training" element={<AcceptableUsePolicyTraining />} />
        <Route path="/data-handling-guidelines" element={<DataHandlingGuidelines />} />
        <Route path="/access-restrictions" element={<AccessRestrictions />} />
        <Route path="/PersonalDeviceUsage" element={<PersonalDeviceUsage />} />
        <Route path="/data-classification" element={<DataClassification />} />
        <Route path="/data-sharing-policies" element={<DataSharingPolicies />} />
        <Route path="/DataMinimization" element={<DataMinimization />} />
        <Route path="/DataRetentionPeriods" element={<DataRetentionPeriods />} />
        <Route path="/EncryptionRequirements" element={<EncryptionRequirements />} />
        <Route path="/DataAccessControls" element={<DataAccessControls />} />
        <Route path="/StudentPrivacyRights" element={<StudentPrivacyRights />} />
        <Route path="/DataSecurityRequirements" element={<DataSecurityRequirements />} />
        <Route path='/ComplianceWithRegulations' element={<ComplianceWithRegulations />} />
        <Route path='/EffectivenessInAddressingSecurityRisks' element={<EffectivenessInAddressingSecurityRisks />} />
        <Route path='/StaffInputOnPolicyImpact' element={<StaffInputOnPolicyImpact />} />     
        <Route path='/PolicyRevisionApprovalWorkflow' element={<PolicyRevisionApprovalWorkflow />} />
        <Route path='/DocumentationOfPolicyChanges' element={<DocumentationOfPolicyChanges />} />
        <Route path='/SafetyAndSecurityTraining' element={<SafetyAndSecurityTraining />} />
        <Route path='/FireSafetyTraining' element={<FireSafetyTraining />} />
        <Route path='/EvacuationProceduresTraining' element={<EvacuationProceduresTraining />} />
        <Route path='/IdentifyingSuspiciousBehavior2' element={<IdentifyingSuspiciousBehavior2 />} />
        <Route path='/ResponseToSecurityThreats' element={<ResponseToSecurityThreats />} />
        <Route path='/StrangerDangerAwareness2' element={<StrangerDangerAwareness2 />} />
        <Route path='/FireDrills2' element={<FireDrills2 />} />
        <Route path='/LockdownDrills3' element={<LockdownDrills3 />} />
        <Route path='/KeycardAccessSystems' element={<KeycardAccessSystems />} />
        <Route path='/BiometricAccessControlSystems' element={<BiometricAccessControlSystems />} />
        <Route path='/CCTVCameraInstallation' element={<CCTVCameraInstallation />} />
        <Route path='/IntrusionDetectionSystems3' element={<IntrusionDetectionSystems3 />} />
        <Route path='/PerimeterSecurityFencing' element={<PerimeterSecurityFencing />} />
        <Route path='/FirewallImplementation' element={<FirewallImplementation />} />
        <Route path='/IntrusionPreventionSystems' element={<IntrusionPreventionSystems />} />
        <Route path='/DataEncryptionProtocols' element={<DataEncryptionProtocols />} />
        <Route path='/RegularDataBackups' element={<RegularDataBackups />} />
        <Route path='/EndpointSecuritySolutions' element={<EndpointSecuritySolutions />} />
        <Route path='/continuous-improvement' element={<ContinuousImprovement />} />
        <Route path='/risk-assessment-and-mitigation' element={<RiskAssessmentAndMitigation />} />
        <Route path='/safety-risk-assessment' element={<SafetyRiskAssessment />} />
        <Route path='/hazard-identification' element={<HazardIdentification />} />
        <Route path='/risk-analysis' element={<RiskAnalysis />} />
        <Route path='/security-threat-assessment' element={<SecurityThreatAssessment />} />
        <Route path='/threat-identification' element={<ThreatIdentification />} />
        <Route path='/security-vulnerability-assessment' element={<SecurityVulnerabilityAssessment />} />
        <Route path='/emergency-preparedness-planning' element={<EmergencyPreparednessPlanning />} />
        <Route path='/emergency-response-plan-development' element={<EmergencyResponsePlanDevelopment />} />
        <Route path='/incident-command-structure' element={<IncidentCommandStrucutre />} />
        <Route path='/scenario-based-planning' element={<ScenarioBasedPlanning />} />
        <Route path='/crisis-management-procedures' element={<CrisisManagementProcedures />} />
        <Route path='/crisis-communication-plan' element={<CrisisCommunicationPlan />} />
        <Route path='/continuity-of-operations-plan' element={<ContinuityOfOperationsPlan />} />
        <Route path='/staff-training-programs' element={<StaffTrainingPrograms />} />
        <Route path='/safety-procedures-training' element={<SafetyProceduresTraining />} />
        <Route path='/security-awareness-training2' element={<SecurityAwarenessTraining2 />} />
        <Route path='/student-safety-education' element={<StudentSafetyEducation />} />
        <Route path='/personal-safety-education' element={<PersonalSafetyEducation />} />
        <Route path='/emergency-response-drills-for-students' element={<EmergencyResponseDrillsForStudents />} />
        <Route path='/security-infrastructure-enhancement' element={<SecurityInfrastructureEnhancement />} />
        <Route path='/physical-security-measures' element={<PhysicalSecurityMeasures />} />
        <Route path='/access-control-systems2' element={<AccessControlSystems2 />} />
        <Route path='/surveillance-systems2' element={<SurveillanceSystems2 />} />
        <Route path='/cybersecurity-infrastructure' element={<CybersecurityInfrastructure />} />
        <Route path='/network-security-measures' element={<NetworkSecurityMeasures />} />
        <Route path='/data-protection-measures2' element={<DataProtectionMeasures2 />} />
        <Route path='/physical-hazards-assessment' element={<PhysicalHazardsAssessment />} />
        <Route path='/enviromental-hazards-assessment' element={<EnvironmentalHazardsAssessment />} />
        <Route path='/likelihood-and-impact-assessment' element={<LikelihoodAndImpactAssessment />} />
        <Route path='/vulnerability-assessment' element={<VulnerabilityAssessment />} />
        <Route path='/external-threats' element={<ExternalThreats />} />
        <Route path='/internal-threats' element={<InternalThreats />} />
        <Route path='/perimeter-security-evaluation' element={<PerimeterSecurityEvaluation />} />
        <Route path='/access-control-systems-assessment' element={<AccessControlSystemsAssessment />} />
        <Route path='/cybersecurity-vulnerability-assessment' element={<CybersecurityVulnerabilityAssessment />} />
        <Route path='/roles-and-responsibilities-of-emergency-response-team' element={<RolesAndResponsibilitiesOfEmergencyResponseTeam />} />
        <Route path='/communication-protocols2' element={<CommunicationProtocols2 />} />
        <Route path='/tabletop-exercises' element={<TabletopExercises />} />
        <Route path='/simulated-emergency-drills' element={<SimulatedEmergencyDrills />} />
        <Route path='/internal-communication-protocols' element={<InternalCommunicationProtocols />} />
        <Route path='/external-communication-protocols' element={<ExternalCommunicationProtocols />} />
        <Route path='/critical-function-identification' element={<CriticalFunctionIdentification />} />
        <Route path='/backup-systems-and-redundancies' element={<BackupSystemsAndRedundancies />} />
        <Route path='/strong-password-guidelines' element={<StrongPasswordGuidelines />} />
        <Route path='/multi-factor-authentication-awareness' element={<MultiFactorAuthenticationAwareness />} />
        <Route path='/law-enforcement-partnerships' element={<LawEnforcementPartnerships />} />
        <Route path='/school-resource-officers' element={<SchoolResourceOfficers />} />
        <Route path='/sro-roles-and-responsibilities' element={<SRORolesAndResponsibilities />} />
        <Route path='/sro-training-and-certification' element={<SROTrainingAndCertification />} />
        <Route path='/fire-department-collaborations' element={<FireDepartmentCollaborations />} />
        <Route path='/fire-prevention-programs' element={<FirePreventionPrograms />} />
        <Route path='/emergency-response-coordination' element={<EmergencyResponseCoordination />} />
        <Route path='/joint-community-events' element={<JointCommunityEvents />} />
        <Route path='/joint-training-exercises' element={<JointTrainingExercises />} />
        <Route path='/active-shooter-drills-with-police' element={<ActiveShooterDrillsWithPolice />} />
        <Route path='/emergency-response-training2' element={<EmergencyResponseTraining2 />} />
        <Route path='/crisis-intervention-workshops' element={<CrisisInterventionWorkshops />} />
        <Route path='/fire-safety-education-for-students' element={<FireSafetyEducationForStudents />} />
        <Route path='/fire-drills-and-evacuation-planning' element={<FireDrillsAndEvacuationPlanning />} />
        <Route path='/fire-department-access-to-school-facilities' element={<FireDepartmentAccessToSchoolFacilities />} />
        <Route path='/mutual-aid-agreements' element={<MutualAidAgreements />} />
        <Route path='/firefighter-training-sessions' element={<FirefighterTrainingSessions />} />
        <Route path='/collaboration-with-local-agencies2' element={<CollaborationWithLocalAgenices2 />} />
        <Route path='/community-partnership' element={<CommunityPartnership />} />
        <Route path='/parent-and-community-involvement' element={<ParentAndCommunityInvolvement />} />
        <Route path='/parent-teacher-associations2' element={<ParentTeacherAssociations2 />} />
        <Route path='/family-engagement-events' element={<FamilyEngagementEvents />} />
        <Route path='/volunteer-programs' element={<VolunteerPrograms />} />
        <Route path='/community-outreach-programs' element={<CommunityOutreachPrograms />} />
        <Route path='/community-engagement-surveys' element={<CommunityEngagementSurveys />} />
        <Route path='/back-to-school-nights' element={<BackToSchoolNights />} />
        <Route path='/parent-workshops-on-student-safety' element={<ParentWorkshopsOnStudentSafety />} />
        <Route path='/parent-teacher-conferences' element={<ParentTeacherConferences />} />
        <Route path='/classroom-helpers' element={<ClassroomHelpers />} />
        <Route path='/parent-chaperones-for-field-trips' element={<ParentChaperonesForFieldTrips />} />
        <Route path='/fundraising-events' element={<FundraisingEvents />} />
        <Route path='/feedback-collection-from-community' element={<FeedbackCollectionFromCommunity />} />
        <Route path='/assessing-community-needs-and-priorities' element={<AssessingCommunityNeedsAndPriorities />} />
        <Route path='/planning-community-outreach-strategies' element={<PlanningCommunityOutreachStrategies />} />
        <Route path='/CommunicationChannels' element={<CommunicationChannels />} />
        <Route path='/PhishingSimulationExercises' element={<PhishingSimulationExercises />} />
        <Route path='/privacy&security' element={<PrivacyAndSecurity />} />
        <Route path='PastAssessments' element={<PastAssessments />} />
        <Route path="/assessment/:assessmentId" element={<AssessmentDetails />} />

      </Routes>
    </Router>
   </BuildingProvider>
 </div>
  );
}

export default App;
