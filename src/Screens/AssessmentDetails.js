import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './AssessmentDetails.css';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import questions from './Questions.js';

function AssessmentDetails() {
    const { assessmentId } = useParams();
    const location = useLocation();
    const { category1, category2 } = location.state || {};
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore();

    const questions = {
        //Rest of A-F
        "restrictedActivities": "What activities are restricted under the Acceptable Use Policy (AUP)?",
        "deviceHandling": "How should employees handle personal device usage in the workplace (e.g., BYOD policies)?",
        "violatingConsequences": "What are the consequences of violating the AUP?",
        "violationReport": "How can employees report potential AUP violations or issues?",
        "requiredCompletion": "When and how are employees required to complete AUP training?",
        "operational": "Are the access control keypads operational and functioning as intended?",
        "operationalComment": "Comment (Optional)",
        "reliablyAuthenticate": "Do the keypads reliably authenticate users and grant access to restricted areas?",
        "malfunction": "Are there any signs of malfunction or errors in card reader operations?",
        "malfunctionComment": "Comment (Optional)",
        "backupSystems": "Are there backup systems in place in case of power outages or malfunctions?",
        "backupSystemsComment": "Comment (Optional)",
        "secureCodes": "Are access codes used with the keypads sufficiently secure and resistant to unauthorized access or guessing?",
        "instructions": "Are there instructions or guidelines available to users regarding proper card usage and access procedures?",
        "changeCodes": "Is there a process for periodically changing access codes to enhance security?",
        "integrated": "Are the access control keypads integrated with the overall access control system?",
        "communicateSeamlessly": "Do they communicate seamlessly with access control software and databases?",
        "realTimeMonitoring": "Is there real-time monitoring and recording of camera feeds from entrances?",
        "realTimeMonitoringComment": "Comment (Optional)",
        "accessRightsManaged": "Are access rights managed centrally and synchronized with the keypad system?",
        "durableMaterials": "Are they constructed from durable materials capable of withstanding exposure to the elements and potential tampering attempts?",
        "tamperAlarms": "Are there additional security features, such as tamper alarms or anti-tamper enclosures, to deter unauthorized access or vandalism?",
        "testedReliability": "Have the keypads been tested for reliability and resistance to environmental factors such as moisture, temperature extremes, or physical wear?",
        "accessible": "Are the access control keypads easily accessible and operable for authorized users?",
        "clearInstructions": "Do they provide clear instructions for entering access codes and accessing restricted areas?",
        "disabilityAccessibility": "Are there any accessibility features or considerations for individuals with disabilities?",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the fence sensors?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as testing sensor functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        "userTraining": "Have users, such as security personnel, staff, and authorized cardholders, received training on how to use the card readers properly?",
        "userTrainingComment": "Comment (Optional)",
        "instructionsAvailable": "Are there instructions or guidelines available to users regarding proper access code usage and security protocols?",
        "reportingProcess": "Is there a process for reporting malfunctions, damage, or security incidents related to the card readers?",
        "reportingProcessComment": "Comment (Optional)",
        "defineCriteria": "What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?",
        "firewallUtilization": "How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?",
        "guidelinesProtocols": "Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?",
        "reviewFrequency": "How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?",
        "validationProcesses": "What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?",
        "automatedTools": "Are automated testing tools utilized to increase the frequency and reliability of backup testing?",
        "trafficMonitoring": "How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?",
        "regularAudits": "Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?",
        "incidentDocumentation": "What documentation is required during an incident?",
        "trainingPrograms": "Do training programs include practical exercises, simulations, or role-playing scenarios to familiarize staff members with communication procedures, protocols, and equipment operation under simulated emergency conditions?",
        "documentationGuidelines": "Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?",
        "promoteAwareness": "How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?",
        "adaptability": "Is it adaptable to changes in access control policies, personnel, and security protocols?",
        "scalingStrategies": "Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?",
        "integrationSecurityMeasures": "How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?",
        "comprehensiveFunctionality": "Does the access control software provide comprehensive functionality for managing access to secondary entrances?",
        "centralManagement": "Are access rights managed centrally and synchronized with the card reader system?",
        "authenticationMethods": "Does it support various authentication methods, such as card readers, biometric scanners, or PIN codes?",
        "hardwareCompatibility": "Is the access control software compatible with a wide range of hardware devices, including card readers, biometric scanners, and electronic locks?",
        "integrationInfrastructure": "Does it seamlessly integrate with existing security infrastructure, such as surveillance cameras and alarm systems?",
        "encryptionSecurity": "Does the access control software employ robust encryption and security protocols to protect sensitive data and communication?",
        "securePolicies": "Are access control policies and credentials securely stored and transmitted within the software?",
        "multiFactorAuth": "Is there support for multi-factor authentication to enhance security?",
        "scalability": "Can the access control software scale to accommodate the needs of your organization as it grows?",
        "flexibility": "Does it offer flexibility in configuring access control rules and permissions based on organizational requirements?",
        "userInterface": "Is the user interface intuitive and easy to navigate for administrators and end-users?",
        "customization": "Are there features for customizing dashboards, reports, and access control workflows?",
        "userDocumentation": "Does the software provide comprehensive user documentation and training resources?",
        "compliance": "Do the card readers comply with relevant regulations, standards, and industry best practices?",
        "testingCertification": "Have the sensors undergone testing or certification to verify reliability and durability?",
        "supportSystem": "Is there a reliable support system in place for troubleshooting issues, resolving technical challenges, and providing software updates?",
        "sla": "Are there maintenance agreements or service level agreements (SLAs) to ensure timely support and software updates?",
        "disasterRecovery": "Are there regular backups and disaster recovery plans in place to protect access control data?",
        "accessControlOperational": "Are the Access Control Systems operational and functioning as intended?",
        "authAccurate": "Do the systems accurately authenticate and authorize individuals' access rights?",
        "malfunctionSigns": "Are there any signs of malfunction or system errors that could compromise security?",
        "authMechanisms": "What authentication mechanisms are used within the Access Control Systems (e.g., RFID cards, PIN codes, biometric scanners)?",
        "mechanismsReliable": "Are these mechanisms reliable and secure for verifying individuals' identities?",
        "multiFactor": "Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?",
        "accessRights": "How are access rights assigned and managed within the Access Control Systems?",
        "processDefined": "Is there a defined process for granting, modifying, or revoking access permissions based on individuals' roles and responsibilities?",
        "accessReviewed": "Are access rights regularly reviewed and updated to align with organizational changes and security requirements?",
        "systemsIntegrated": "Are the Access Control Systems integrated with other security systems, such as surveillance cameras, intrusion detection, or alarm systems?",
        "integrationEnhance": "How does the integration enhance overall security and situational awareness within the facility?",
        "integrationIssues": "Are there any compatibility issues or gaps in integration that need to be addressed?",
        "monitoringSystem": "Is there a centralized monitoring system in place to oversee access control events and activities?",
        "accessLogs": "Are access logs generated and maintained to track user activity, including successful and failed access attempts?",
        "logsReview": "Is there a process for reviewing access logs and investigating any suspicious or unauthorized access incidents?",
        "complianceRegs": "Do the Access Control Systems comply with relevant regulations, standards, and industry best practices (e.g., GDPR, HIPAA, ISO 27001)?",
        "audits": "Have the systems undergone any audits or assessments to verify compliance with applicable standards?",
        "instructionsGuidelines": "Are there instructions or guidelines available to users regarding proper access control procedures, password management, and security awareness?",
        "prohibitedWebsites": "What types of websites or online content are explicitly prohibited by the Acceptable Use Policy (AUP) (e.g., adult content, gambling sites)?",
        "definedRestrictions": "How are these restrictions defined and categorized within the policy?",
        "clearGuidelines": "Are there clear guidelines on what constitutes prohibited websites or online activities?",
        "enforcedRestrictions": "How are access restrictions enforced on the network (e.g., through web filters, firewalls)?",
        "blockedAccess": "What tools or technologies are used to block access to prohibited websites?",
        "frequentUpdates": "How frequently are backup systems updated to reflect the latest data and operational changes?",
        "informedUsers": "How are users informed about the access restrictions and prohibited websites (e.g., through training, policy documents)?",
        "notifiedUsers": "Are there mechanisms in place to notify users when they attempt to access a restricted site?",
        "aupCompliance": "How is compliance with the AUP communicated to users to ensure they understand the restrictions?",
        "requestingExceptions": "What procedures are in place for requesting exceptions to the access restrictions (e.g., for educational or research purposes)?",
        "authorizedUser": "Who is authorized to review and approve requests for access to restricted websites?",
        "handlingExpectations": "Are there documented processes for handling and documenting exceptions?",
        "monitoredActivity": "How is user activity monitored to ensure compliance with access restrictions (e.g., logging, auditing)?",
        "reportMethods": "What methods are used to track and report attempts to access prohibited websites?",
        "addressedViolations": "How are violations of access restrictions addressed and managed?",
        "reviewedPolicy": "How frequently is the Acceptable Use Policy reviewed and updated to reflect changes in technology and threats?",
        "revisingPolicy": "Who is responsible for reviewing and revising the policy, and what criteria are used for updates?",
        "communicatedUpdates": "How are updates regarding the crisis communicated to the community, and how frequently are these updates provided?",
        "impactedRequirements": "What legal or regulatory requirements impact the development and enforcement of access restrictions (e.g., data protection laws)?",
        "ensuredCompliance": "How does the policy ensure compliance with relevant laws and regulations regarding internet usage?",
        "legalIssues": "Are there procedures for addressing legal or regulatory issues related to access restrictions?",
        "assessedTraining": "How is the effectiveness of the training assessed and improved over time?",
        "accessRestrictions": "Are there resources available for users to better understand the reasons for access restrictions?",
        "violatingAccess": "What steps are taken when a user repeatedly attempts to access prohibited websites or violates access restrictions?",
        "restrictionViolations": "How are incidents related to access restriction violations documented and managed?",
        "disciplinaryActions": "What disciplinary actions are outlined in the policy for non-compliance?",
        "collectedFeedback": "How is feedback collected from users regarding the effectiveness and impact of access restrictions?",
        "relatedSuggestions": "Are there mechanisms for users to provide suggestions or report issues related to access restrictions?",
        "improvementFeedback": "How is feedback used to make improvements to the Acceptable Use Policy and access restriction mechanisms?",
        "collaborationObjectives": "What are the objectives and goals of conducting active shooter drills in collaboration with law enforcement?",
        "frequentlyConductedDrills": "How frequently are active shooter drills conducted, and what factors determine the schedule?",
        "staffRoles": "What roles do school staff and law enforcement play during these drills, and how are these roles communicated?",
        "evaluatedDrillsOutcomes": "How are the outcomes and effectiveness of the active shooter drills evaluated after completion?",
        "psychologicalImpacts": "What measures are in place to address psychological impacts on students and staff participating in these drills?",
        "asrTrainingTopics": "What topics and skills are covered in active shooter response training programs, such as situational awareness, threat recognition, decision-making under stress, and survival tactics?",
        "asrMaterialsAlignment": "Are training materials and resources based on recognized active shooter response protocols, guidelines, and recommendations from law enforcement agencies, security experts, or government agencies?",
        "asrKeyConcepts": "How do active shooter response training programs address key concepts such as the 'Run, Hide, Fight' protocol, evacuation procedures, barricading techniques, and communication strategies during an active shooter incident?",
        "asrScenarioSimulations": "To what extent do active shooter response training sessions incorporate scenario-based simulations, tabletop exercises, and live drills to prepare staff members for real-life emergencies?",
        "asrScenarioPractice": "Are staff members provided with opportunities to practice response options, decision-making skills, and coordinated actions in simulated active shooter scenarios?",
        "asrDrillConduction": "How are active shooter drills conducted to simulate various threat scenarios, test emergency communication systems, and evaluate staff readiness and response effectiveness?",
        "asrCommunicationTraining": "How are staff members trained to communicate effectively with colleagues, students, and emergency responders during an active shooter incident?",
        "asrCommunicationProtocols": "Are communication protocols established to relay critical information, issue alerts, and coordinate response efforts across different areas of the school campus?",
        "asrExternalCommunication": "What mechanisms are in place to facilitate communication with law enforcement agencies, emergency dispatch centers, and other external stakeholders during an active shooter crisis?",
        "asrDecisionTraining": "How are staff members trained to assess the situation, make rapid decisions, and implement appropriate response strategies based on the evolving threat environment during an active shooter incident?",
        "asrDecisionFrameworks": "Are decision-making frameworks, decision trees, or decision support tools provided to guide staff members in determining the most effective course of action in different scenarios?",
        "asrActionProvisions": "What provisions are in place to empower staff members to take decisive action to protect themselves and others, including options for evacuation, lockdown, sheltering, or countermeasures?",
        "asrSupportResources": "What resources and support services are available to staff members following an active shooter incident, including psychological first aid, counseling, and debriefing sessions?",
        "asrDebriefings": "Are post-incident debriefings conducted to review response actions, identify lessons learned, address concerns, and implement improvements to emergency preparedness plans and procedures?",
        "asrFeedbackContribution": "How are staff members encouraged to share their experiences, provide feedback on training effectiveness, and contribute to the continuous improvement of active shooter response protocols?",
        "informingParents": "How are parents informed about the purpose and schedule of Back-to-School Nights?",
        "parentsAndTeachersConnecting": "What opportunities are provided for parents to connect with teachers and school staff during these events?",
        "familyFeedback": "How is feedback from families collected after Back-to-School Nights to improve future events?",
        "sharedResources": "Are there any specific resources or information shared with families during Back-to-School Nights to support student success?",
        "installedBackupPowerSystem": "Is there a backup power system, such as an Uninterruptible Power Supply (UPS), installed to support the operation of the public address (PA) system during power outages or disruptions?",
        "capicityOfSystem": "What is the capacity of the backup power system in terms of providing sufficient power to operate the PA system?",
        "backup-system": "How long can the backup power system sustain the PA system in operation during a power outage or disruption before requiring recharge or replacement?",
        "uninterruptedTransitions": "Is the backup power system seamlessly integrated with the PA system to ensure uninterrupted operation during transitions between primary and backup power sources?",
        "automaticSwitchoverMechanisms": "Are there automatic switchover mechanisms in place to activate the backup power system in the event of a power failure without manual intervention?",
        "regularTests": "Is the backup power system regularly tested to verify its functionality and performance, including its ability to support the PA system under simulated outage conditions?",
        "routineMaintenanceActivities": "Are routine maintenance activities conducted on the backup power system to ensure reliability and readiness for use during emergencies?",
        "mitigatingRisks": "Are redundant backup power systems or multiple layers of redundancy implemented to mitigate the risk of power failure affecting the PA system?",
        "withstandingExternalThreats": "Are backup power systems designed to withstand environmental factors or external threats that could impact their reliability during emergencies?",
        "notifiedAdministrators": "Are system administrators or operators notified when the backup power system is activated or when there are issues with its performance?",
        "capableRemoteMonitoring": "Is there remote monitoring capability to track the status of the backup power system and receive alerts or notifications in real-time?",
        "backupSystemIncludedInPlans": "Are backup power systems included in emergency preparedness plans and protocols, specifying their roles and procedures for activation during power-related emergencies?",
        "trainedStaffMembers": "Are staff members trained on the use of backup power systems and familiar with protocols for managing power-related incidents affecting the PA system?",
        "maintainingRecords": "Are records maintained to document the installation, testing, maintenance, and performance of backup power systems supporting the PA system?",
        "maintainingRecordsComment": "Comment (Optional)",
        "accessibleRecords": "Are records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?",
        "systemsEnsuringDataIntegrity": "What types of backup systems are in place to ensure data integrity and availability during an emergency?",
        "maintainingCriticalOperations": "How are redundancies established to maintain critical operations when primary systems fail?",
        "validatingEffectiveness": "What procedures are followed to test and validate the effectiveness of backup systems and redundancies?",
        "staffTraining": "Are staff members provided with training on the proper use, operation, and protocols for emergency communication devices and systems?",
        "frequencyPreparedness": "How often are backup recovery drills conducted, and is the frequency sufficient to ensure preparedness and data integrity?",
        "scheduledTimes": "Are there specific times of the year when testing is scheduled to align with organizational needs or periods of lower activity?",
        "plannedUnplannedDrills": "Does the schedule for backup testing include both planned and unplanned drills to evaluate real-time response capabilities?",
        "testingScenarios": "What types of scenarios are covered during backup testing to simulate various types of data loss events (e.g., cyberattacks, hardware failure, natural disasters)?",
        "fullPartialRecovery": "Are both full-scale and partial recovery processes tested to ensure comprehensive preparedness?",
        "complexScenarios": "How are complex scenarios, such as multi-site recoveries or cross-functional dependencies, incorporated into the testing process?",
        "evaluationCriteria": "What criteria are used to evaluate the success or failure of a backup test, including recovery time objectives (RTOs) and recovery point objectives (RPOs)?",
        "documentTestResults": "Are the results of each backup test thoroughly documented, including any issues encountered and the steps taken to resolve them?",
        "lessonsLearned": "Are lessons learned from past emergencies used to improve communication procedures and response capabilities?",
        "responsibilityRoles": "Who is responsible for initiating, overseeing, and evaluating backup tests within the organization?",
        "definedRoles": "Are there clearly defined roles for each team member involved in the backup testing process, including IT staff, recovery coordinators, and external vendors?",
        "responsibilityCommunication": "How are responsibilities assigned and communicated to ensure effective coordination during a backup test?",
        "feedbackProcesses": "What processes are in place for stakeholders to provide feedback on the effectiveness of policies?",
        "communicatingChanges": "How are changes to backup testing procedures or disaster recovery plans communicated to relevant stakeholders?",
        "updateMechanisms": "Are there mechanisms to regularly review and update testing strategies based on new risks, technology changes, or organizational shifts?",
        "planIntegration": "How does backup testing integrate with the overall disaster recovery plan, including coordination with other recovery strategies?",
        "metricsKPIs": "Are there specific metrics or KPIs that link backup testing results with broader disaster recovery goals and objectives?",
        "evaluatePlanEffectiveness": "How is the effectiveness of the entire disaster recovery plan evaluated through the lens of backup testing outcomes?",
        "toolsUsed": "What tools or software are used to facilitate backup testing, and are they regularly updated to support the latest backup and recovery technologies?",
        "toolConfiguration": "How are these tools configured to simulate realistic disaster scenarios and provide accurate results?",
        "first-aid-comprehensiveness": "How comprehensively are basic first aid techniques covered in staff training programs?",
        "training-modules-structure": "Are training modules structured to provide a balance of theoretical knowledge, practical skills demonstrations, and hands-on practice sessions?",
        "first-aid-materials-coverage": "To what extent do training materials and resources address the application of basic first aid techniques in various emergency scenarios encountered in the school environment?",
        "emergency-recognition-training": "Are staff members trained to recognize common signs and symptoms of medical emergencies and injuries that may require immediate first aid intervention?",
        "first-aid-proficiency-assessment": "How are staff members assessed or evaluated to ensure proficiency in applying basic first aid techniques in simulated or real-life emergency situations?",
        "skills-practice-opportunities": "What opportunities are provided for staff members to practice and demonstrate basic first aid techniques in simulated scenarios, role-playing exercises, or skills stations?",
        "hands-on-props-usage": "Are hands-on practice sessions conducted using realistic training props, medical manikins, or simulated casualties to simulate various injury types and emergency scenarios?",
        "instructor-guidance": "How are staff members guided and supported by certified instructors, facilitators, or subject matter experts during hands-on skills practice sessions?",
        "skills-feedback": "Are staff members encouraged to actively participate in skills practice activities and receive constructive feedback on their performance?",
        "learning-reinforcement-mechanisms": "What mechanisms are in place to reinforce learning and encourage ongoing skills development beyond initial training sessions?",
        "first-aid-integration": "How are basic first aid techniques integrated into broader emergency response plans, procedures, and protocols?",
        "life-threatening-priority-training": "Are staff members trained to recognize and prioritize life-threatening conditions and administer basic first aid interventions in accordance with established protocols and medical guidelines?",
        "responder-coordination": "How do staff members coordinate and communicate with other responders, emergency services, or healthcare providers when providing basic first aid assistance during emergencies?",
        "continuity-of-care-provisions": "What provisions are in place to ensure continuity of care and seamless transition of injured or ill individuals to higher levels of medical care?",
        "first-aid-documentation-training": "Are staff members trained to document and report basic first aid interventions within the school's incident reporting system or medical logbook?",
        "post-aid-management": "How are injured or ill individuals managed and monitored following basic first aid interventions?",
        "care-transfer-procedures": "What procedures are in place to ensure continuity of care and facilitate patient transport or transfer to higher levels of medical care?",
        "emotional-support-training": "Are staff members trained to provide emotional support, reassurance, and ongoing monitoring to individuals receiving basic first aid interventions?",
        "follow-up-procedures": "How are follow-up procedures implemented to document incidents, assess outcomes, and provide post-incident debriefing or support?",
        "community-resources-awareness": "Are staff members familiar with community resources and referral pathways for individuals requiring additional medical or psychological support beyond basic first aid?",
        "aid-intervention-documentation": "How are basic first aid interventions documented, recorded, and reported within the school's incident reporting system or electronic health record system?",
        "documentation-guidance": "What training or guidance is provided to staff members on the importance of timely and accurate documentation, confidentiality requirements, and legal considerations?",
        "clear-documentation-training": "Are staff members trained to document patient assessments, treatments provided, and follow-up actions taken in a clear, concise, and objective manner?",
        "record-analysis": "How are medical records or incident reports reviewed and analyzed to identify trends, evaluate response effectiveness, and inform continuous improvement efforts?",
        "documentation-responsibility-awareness": "Are staff members aware of their responsibilities regarding incident reporting, documentation protocols, and data privacy regulations when documenting basic first aid treatments?",
        "biometricDataTypes": "What types of biometric data are collected (e.g., fingerprints, facial recognition) for access control?",
        "biometricDataProtection": "How is biometric data stored and protected to ensure privacy and compliance with regulations?",
        "biometricErrors": "What procedures are in place for handling false rejections or errors in biometric access?",
        "biometricEvaluation": "How frequently is the biometric access control system evaluated for accuracy and reliability?",
        "alternativeAccess": "Are there alternative access methods available for individuals who cannot use the biometric system?",
        "biometricUtilization": "What percentage of systems and applications within the organization utilize biometric authentication?",
        "criticalAccessPoints": "Are biometric authentication methods deployed across all critical access points?",
        "adoptionMonitoring": "How is the adoption of biometric authentication monitored?",
        "accuracyAssessment": "How does the organization assess the accuracy and reliability of the biometric authentication methods used?",
        "unauthorizedAccessIncidents": "Are there any documented incidents of unauthorized access despite the use of biometric authentication?",
        "dataProtection": "How are biometric data and authentication processes protected from potential security threats?",
        "userPerception": "How do users perceive the ease of use and convenience of the biometric authentication methods currently in place?",
        "enrollmentChallenges": "Are there any reported challenges or issues faced by users when enrolling their biometric data?",
        "userAccommodations": "What accommodations are made for users who may have difficulty with biometric authentication?",
        "privacyProtection": "How does the organization ensure the privacy and protection of biometric data collected from users?",
        "unauthorizedAccessProtection": "What measures are in place to secure biometric data from unauthorized access?",
        "handlingPolicies": "Are there clear policies and procedures for handling biometric data?",
        "backupOptions": "What backup or recovery options are available if users are unable to use their biometric authentication method?",
        "failureScenarios": "How does the organization handle scenarios where biometric authentication fails?",
        "backupGuidelines": "Are there guidelines for securely managing and storing backup authentication methods?",
        "systemIntegration": "How are communication systems integrated with broader emergency response plans, incident command structures, and coordination efforts within the school environment?",
        "compatibilityIssues": "Are there any compatibility issues with specific devices?",
        "enhancementPlans": "Does the organization have plans to enhance or expand its biometric authentication capabilities?",
        "policyGuidelines": "Are there documented policies and guidelines outlining the use and management of biometric authentication?",
        "complianceProcess": "How does the organization ensure compliance with biometric authentication policies?",
        "auditReviews": "Are there regular audits or reviews to ensure that biometric authentication practices remain in line with industry standards?",
        "biometricScannersOpertaional": "Are the biometric scanners operational and functioning as intended?",
        "biometricCapture": "Do the scanners accurately capture and authenticate biometric data (e.g., fingerprints)?",
        "accessControlMethods": "How is access to the secondary entrances controlled using card readers?",
        "biometricEnrollment": "Are individuals required to enroll their biometric data (e.g., fingerprints) for access?",
        "restrictedAccess": "Is access restricted to individuals with valid proximity cards or authorized credentials?",
        "updateRecords": "Is there a process in place to update or remove biometric records as needed (e.g., for personnel changes)?",
        "integration": "Are the card readers integrated with the overall access control system?",
        "communication": "Do they communicate seamlessly with access control software and databases?",
        "monitoring": "Is there real-time monitoring and logging of access events captured by the card readers?",
        "securityFeatures": "Are the card readers equipped with security features to prevent tampering or unauthorized access attempts?",
        "antiSpoofing": "Do they employ anti-spoofing measures to detect fraudulent attempts to bypass authentication?",
        "physicalSecurity": "Is there physical security measures in place to prevent unauthorized access to card reader components or wiring?",
        "regulatoryRequirements": "Are there specific regulatory requirements that impact encryption practices, and how are they addressed?",
        "strategicPlacement": "Are the fence sensors strategically placed along the perimeter to detect tampering or unauthorized access attempts?",
        "coverageEntryPoints": "Do they cover all entry points and critical areas, such as doors, gates, or parking lots?",
        "blindSpots": "Are there any blind spots or areas where camera coverage is insufficient?",
        "secureMounting": "Are the bullet cameras securely mounted and installed to withstand outdoor conditions?",
        "optimalAngles": "Are they positioned at optimal angles to capture clear and unobstructed views of entrances?",
        "protectedWiring": "Are cables and wiring adequately protected from weather elements and tampering?",
        "weatherProofing": "Are the bullet cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?",
        "certification": "Have the cameras undergone testing or certification to verify weatherproofing and durability?",
        "imageQuality": "Do the bullet cameras capture high-quality images with sufficient resolution for identification and analysis?",
        "imageAdjustments": "Are there adjustments or settings available to optimize image quality based on lighting conditions outdoors?",
        "clearImages": "Are images clear and detailed, allowing for easy identification of individuals and activities at entrances?",
        "integratedSurveillance": "Are the bullet cameras integrated with the overall surveillance system?",
        "seamlessCommunication": "Do they communicate seamlessly with alarm control panels and monitoring stations?",
        "remoteAccess": "Is there remote access and control functionality for the bullet cameras?",
        "remoteAdjustments": "Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?",
        "secureAccess": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?",
        "operationalCardReader": "Are the card readers operational and functioning as intended?",
        "authentication": "Do the card readers accurately read and authenticate proximity cards or other access credentials?",
        "issuedCards": "Are proximity cards issued to authorized personnel and visitors for access?",
        "deactivationProcess": "Is there a process in place to deactivate lost or stolen proximity cards to prevent unauthorized access?",
        "encryption": "Do they support encryption and secure communication protocols to protect access credentials?",
        "cctvPlacementCriteria": "What criteria are used to determine the placement of CCTV cameras throughout the facility?",
        "cctvMonitoring": "How is the footage from CCTV cameras monitored, and who is responsible for monitoring?",
        "cctvRetention": "What is the retention period for recorded footage, and how is it securely stored?",
        "cctvAccessPolicy": "Are there policies in place regarding the access and review of recorded footage by authorized personnel?",
        "cctvSystemEvaluation": "How often is the CCTV system evaluated for effectiveness and updated as needed?",
        "classroomHelpersTraining": "What training is provided to classroom helpers regarding student safety and emergency procedures?",
        "screeningClassroomHelpers": "How are classroom helpers screened to ensure they are suitable for working with students?",
        "maintainingASafeEnviroment": "In what ways do classroom helpers contribute to maintaining a safe and supportive environment in the classroom?",
        "informingClassroomHelpers": "How are classroom helpers informed about the school\u2019s safety policies and reporting procedures?",
        "feedbackMechanisms": "Are feedback mechanisms in place to solicit input from evacuees, shelter staff, volunteers, and other stakeholders to assess the quality, responsiveness, and satisfaction with emergency sheltering services?",
        "feedbackMechanismsComment": "Comment (Optional)",
        "classroomDoorsLocks": "Are classroom doors equipped with locks that can be securely engaged from the inside?",
        "locksSafetyStandard": "Do locks meet safety standards and regulations for lockdown procedures?",
        "lockOperational": "Are locks easy to operate and reliably secure, even under stress or pressure?",
        "barricadingMechanism": "Are there barricading mechanisms available in classrooms to reinforce door security during lockdowns?",
        "barricadingDeviceOperational": "Do barricading devices effectively prevent unauthorized entry and provide additional time for occupants to seek shelter or escape?",
        "barricadingDeviceEfficiency": "Are barricading devices designed to be quickly deployed and easily removed by authorized personnel?",
        "lockdownProcedureTraining": "Are staff members and students trained in lockdown procedures, including how to barricade doors effectively?",
        "regularLockdownDrills": "Are drills conducted regularly to practice lockdown scenarios and ensure familiarity with procedures?",
        "regularlyLockdownDebriefing": "Are debriefings held after drills to review performance, identify areas for improvement, and reinforce best practices?",
        "lockdownCommunicationSystem": "Is there a communication system in place to alert occupants of lockdowns and provide instructions?",
        "emergencyCommunicationDevices": "Are emergency communication devices accessible in classrooms for contacting authorities or requesting assistance?",
        "designatedProtocol": "Is there a designated protocol for reporting suspicious activity or potential threats to school administrators or security personnel?",
        "designatedSafeZones": "Are there designated safe zones or hiding places within classrooms where occupants can seek shelter during lockdowns?",
        "strategicSafeZones": "Are these areas strategically located to provide cover and concealment from potential threats?",
        "safeZonesVulnerabilities": "Have safe zones been assessed for potential vulnerabilities and reinforced as needed to enhance security?",
        "personelCoordination": "Is there coordination between school personnel and local law enforcement agencies on lockdown procedures and response protocols?",
        "lawEnforcementFamiliarity": "Are law enforcement agencies familiar with school layouts and lockdown plans to facilitate their response in the event of an emergency?",
        "lawEnforcementReview": "Are there regular meetings or exercises conducted with law enforcement to review and refine lockdown procedures?",
        "guardiansInformed": "Are parents and guardians informed of lockdown procedures and expectations for student safety?",
        "guardiansCommunication": "Is there a communication plan in place for notifying parents and guardians of lockdown events and providing updates as needed?",
        "availableSupportServices": "Are resources or support services available to assist families in coping with the emotional impact of lockdown situations?",
        "designatedCommunicationChannels": "Are specific communication channels designated for different types of communication needs, such as emergency communication, general staff communication, or coordination between departments?",
        "clearDelineation": "Is there a clear delineation of the purpose and usage guidelines for each communication channel?",
        "reservedFrequency": "Is there a designated frequency or channel specifically reserved for emergency communication purposes?",
        "trainedStaffEmergency": "Are staff members trained on how to access and utilize the designated emergency communication channel during emergencies?",
        "managingProtocol": "Is there a protocol for managing and coordinating communication channels to prevent interference and ensure clear communication during emergencies?",
        "reallocatingProcedures": "Are procedures established for reallocating or reassigning communication channels as needed to adapt to changing circumstances or address technical issues?",
        "compatibleChannels": "Are communication channels selected or configured to be compatible with the communication equipment used by staff members, such as two-way radios or mobile devices?",
        "compatibilityTesting": "Is there compatibility testing conducted to verify interoperability and functionality across different devices and communication channels?",
        "redundantCommunicationChannels": "Are redundant communication channels or backup options available to mitigate the risk of channel failure or disruption during emergencies?",
        "contingencyPlan": "Is there a contingency plan in place for switching to alternative communication channels if primary channels become unavailable or compromised?",
        "trainedStaffTraining": "Are staff members trained on how to access, select, and utilize communication channels effectively, particularly during emergencies?",
        "practiceSessions": "Are practice sessions or drills conducted to familiarize staff members with communication channel protocols and simulate emergency scenarios?",
        "integratedCommunicationChannels": "Are designated communication channels integrated into broader emergency communication and response plans, ensuring alignment with overall emergency protocols?",
        "incorporatingChannelProcedures": "Are there designated procedures for incorporating communication channel usage into emergency drills, exercises, and simulations to assess effectiveness and identify areas for improvement?",
        "enhancingRecommendations": "Are recommendations for enhancing communication channel protocols and infrastructure considered and implemented as part of ongoing improvement efforts?",
        "designatedChannels": "What communication channels are designated for incident response?",
        "channelSecurity": "How are these channels selected to ensure they meet security and confidentiality requirements?",
        "alternativeChannels": "Are there alternative channels identified in case primary ones become unavailable?",
        "internalCommunicationProtocols": "What protocols are established for internal communication?",
        "sensitiveInfoProtection": "How is sensitive information protected during communication?",
        "communicationEscalation": "Are there predefined procedures for escalating communication?",
        "incidentReporting": "How are incidents reported within the organization?",
        "incidentReportContent": "What information is required in incident reports?",
        "reportDocumentation": "How are reports documented and stored for compliance purposes?",
        "externalCommunicationGuidelines": "What guidelines are in place for communicating with external parties?",
        "externalCommunicationConsistency": "How is consistency maintained in external communications?",
        "mediaManagementProtocols": "What protocols are followed to manage media inquiries?",
        "responseCoordination": "How is coordination managed during an incident?",
        "realTimeTools": "What tools facilitate real-time communication?",
        "communicationResponsibilities": "How are communication responsibilities divided?",
        "channelSecurityMeasures": "How are channels secured to prevent interception?",
        "deviceProtection": "What measures protect communication devices?",
        "communicationIntegrity": "How is the integrity of communication ensured?",
        "trainingProtocols": "How is training provided on communication protocols?",
        "communicationDrills": "Are regular drills conducted to practice communication?",
        "drillFeedback": "How is feedback from drills used to refine practices?",
        "channelEvaluation": "How are communication channels evaluated post-incident?",
        "communicationChallengesFeedback": "What feedback is collected regarding communication challenges?",
        "communicationLessonsLearned": "How are lessons learned from communication incidents incorporated?",
        "recordMaintenance": "How are communication records maintained?",
        "recordAnalysis": "What procedures are in place for analyzing communication records?",
        "Regular Drill Schedule": "Are lockdown drills scheduled regularly to ensure all occupants are familiar with lockdown procedures?",
        "Drill Timing Variability": "Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?",
        "Initiation Protocol": "Is there a protocol for initiating lockdown drills, including how and when occupants are notified?",
        "Notification Methods Testing": "Are notification methods tested during drills to ensure timely dissemination of lockdown alerts?",
        "Absent Individuals System": "Is there a system in place to account for individuals who may not be present during scheduled drills?",
        "Scenario Planning": "Are lockdown drill scenarios carefully planned and communicated to participants in advance?",
        "Simulated Threat Scenarios": "Do scenarios include simulated intruder situations, as well as other potential threats that may require a lockdown response?",
        "Realistic Scenario Design": "Are scenarios designed to be realistic while considering the safety and well-being of participants?",
        "Procedure Communication": "Are lockdown procedures clearly defined and communicated to all occupants?",
        "Occupant Specific Actions": "Do drills include specific actions to be taken by occupants, such as securing doors, barricading entry points, and seeking shelter in safe areas?",
        "Scenario Simulation Variety": "Are drills conducted to simulate different scenarios, such as intruders in various locations or multiple threats simultaneously?",
        "Coordination Protocol": "Is there a protocol for communication and coordination between occupants, staff members, and security personnel during lockdown drills?",
        "Communication Systems Test": "Are communication systems, such as two-way radios or intercoms, tested during drills to facilitate coordination efforts?",
        "Designated Coordinators": "Are there designated individuals responsible for coordinating responses and providing updates during lockdown drills?",
        "Occupant Accountability Process": "Is there a process for accounting for all occupants during lockdown drills?",
        "Accountability Roles Assigned": "Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?",
        "Participants Feedback Collection": "Is feedback gathered from participants after drills to identify any issues or concerns with procedures?",
        "Effectiveness Evaluation": "Is there a mechanism for evaluating the effectiveness of lockdown drills and identifying areas for improvement?",
        "Debriefing Sessions": "Are debriefing sessions held after drills to review performance and discuss lessons learned?",
        "Implementation of Recommendations": "Are recommendations from drill evaluations implemented to enhance lockdown preparedness and response procedures?",
        "effectivenessMeasurement": "How is the effectiveness of current policies in mitigating security risks measured?",
        "successMetrics": "What metrics or indicators are used to evaluate the success of security policies?",
        "incidentReviewFrequency": "How often are security incidents reviewed to inform policy updates and improvements?",
        "lessonsLearnedIntegration": "How are lessons learned from security incidents integrated into policy revisions?",
        "standardizedMessageTemplates": "Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?",
        "essentialInfo": "Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?",
        "scriptedEmergencyAnnouncements": "Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?",
        "scriptsAvoidingConfusion": "Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?",
        "appropriateAnnouncements": "Are announcements tailored to the intended audience, considering factors such as age, language proficiency, and cognitive ability?",
        "structuredScriptedMessages": "Do scripted messages follow a structured format that includes key elements such as the type of emergency, location or affected area, recommended actions, and any follow-up instructions?",
        "messagesProvidingGuidance": "Are messages designed to provide actionable guidance to occupants, helping them make informed decisions and respond effectively to the emergency situation?",
        "reviewedScripts": "Are emergency announcement scripts reviewed and approved by appropriate authorities, such as safety officers, emergency management personnel, or legal advisors?",
        "ensuringConsistency": "Is there a process for ensuring consistency and accuracy in scripted messages, including periodic updates to reflect changes in procedures, regulations, or best practices?",
        "trainedIndividuals": "Are individuals responsible for delivering emergency announcements trained on the use of scripted messages and communication protocols?",
        "deliveringMessagesResources": "Are operators provided with resources, such as cue cards or reference guides, to assist them in delivering scripted messages accurately and confidently?",
        "adaptableScriptedMessages": "Are scripted messages adaptable to accommodate variations in emergency scenarios, such as the scale, severity, or duration of the event?",
        "FlexibilityInTemplates": "Is there flexibility built into message templates to allow for real-time updates or modifications based on evolving circumstances or new information?",
        "evaluatedEffectiveness": "Are scripted messages evaluated for their effectiveness in conveying critical information and guiding appropriate responses during drills and actual emergencies?",
        "solicitedFeedback": "Is feedback solicited from occupants and stakeholders to assess the clarity, comprehensibility, and usefulness of scripted messages?",
        "recommendationsRefineMessages": "Are recommendations from evaluations used to refine scripted messages and improve their efficacy in future emergency situations?",
        "dedicatedCommunicationSystems": "Are there dedicated communication systems in place for alerting authorities during emergencies?",
        "multipleChannels": "Do these systems include multiple channels such as telephone, radio, email, and text messaging?",
        "efficientCommunicationSystems": "Are communication systems capable of reaching relevant authorities quickly and efficiently?",
        "emergencyContactLists": "Have emergency contact lists been established for relevant authorities, including local law enforcement, fire department, and medical services?",
        "updatedContactDetails": "Are contact details regularly updated to ensure accuracy and reliability?",
        "designatedPoc": "Is there a designated point of contact responsible for initiating communication with authorities during emergencies?",
        "notifyAuthorities": "Are there clear protocols in place for when and how to notify authorities during different types of emergencies?",
        "staffRolesAndResponsibilities": "Do staff members understand their roles and responsibilities in initiating communication with authorities?",
        "chainOfCommand": "Is there a hierarchy or chain of command to follow for escalating emergency notifications as needed?",
        "chainOfCommandComment": "Comment (Optional)",
        "alertingAuthorities": "Is the process for alerting authorities designed to be swift and efficient, minimizing response times?",
        "communicationSystemsTest": "Are communication systems tested regularly to ensure they are functioning properly and can deliver alerts promptly?",
        "mitigatingCommunicationFailures": "Are there redundancies or backup systems in place to mitigate communication failures during emergencies?",
        "provideDetailedInformation": "Are staff members trained to provide accurate and detailed information when alerting authorities?",
        "conveyEssentialDetail": "Do they know how to convey essential details such as the nature of the emergency, location, number of individuals affected, and any immediate hazards?",
        "informationVerification": "Is there a mechanism for verifying information before it is communicated to authorities to prevent misinformation or confusion?",
        "establishCommunicationProtocolsl": "Is there coordination and collaboration with authorities to establish communication protocols and ensure a rapid response to emergencies?",
        "facilitateCommunication": "Have contact points and procedures been established to facilitate communication between the organization and responding agencies?",
        "refineEmergencyCommunication": "Are there regular meetings or exercises conducted with authorities to review and refine emergency communication processes?",
        "emergencyCommunicationProcedures": "Are emergency communication procedures documented in written policies or protocols?",
        "reviewingAndEvaluating": "Is there a process for reviewing and evaluating the effectiveness of emergency communication during drills or actual incidents?",
        "communicationDevices": "What communication devices and tools are provided to staff members for emergency communication purposes, such as two-way radios, mobile phones, intercom systems, or panic alarms?",
        "deviceSelectionCriteria": "Are communication devices selected based on their reliability, range, durability, and compatibility with existing infrastructure to ensure effective communication capabilities during emergencies?",
        "deviceMaintenance": "How are communication devices maintained, tested, and periodically inspected to verify functionality, battery life, signal strength, and readiness for use in emergency situations?",
        "communicationProtocols": "Are standardized communication protocols and procedures established to facilitate clear, concise, and efficient communication among staff members, emergency responders, and relevant stakeholders during emergencies?",
        "communicationChannels": "What channels are utilized for communicating with parents and guardians during a crisis (e.g., phone calls, emails, social media)?",
        "protocolAdherence": "What measures are in place to ensure adherence to communication protocols, minimize radio interference, avoid channel congestion, and prioritize emergency traffic during critical incidents?",
        "communicationProficiency": "How are staff members assessed for proficiency in emergency communication skills, such as effective radio etiquette, message clarity, active listening, and situational awareness during training exercises and drills?",
        "protocolAlignment": "Are communication protocols aligned with incident management protocols, resource allocation procedures, and decision-making frameworks to support effective coordination, information sharing, and situational awareness during emergencies?",
        "externalCollaboration": "What mechanisms are in place to facilitate communication and collaboration with external agencies, such as emergency dispatch centers, law enforcement agencies, fire departments, or medical response teams, during emergency incidents?",
        "redundancyMeasures": "Are redundancy measures and backup communication systems implemented to mitigate the risk of communication failures, network disruptions, or equipment malfunctions during emergencies?",
        "backupCommunication": "How are redundant communication channels, alternative communication methods, or backup power sources utilized to ensure continuity of communication and information flow in the event of primary system failures or infrastructure damage?",
        "communicationResilience": "What provisions are in place to maintain communication resilience, restore functionality, and adapt communication strategies to changing conditions or evolving threats during prolonged emergency incidents?",
        "Training Programs Exist": "Are formal training programs established to provide staff members with the necessary knowledge and skills for effective emergency communication?",
        "Training Content Scope": "Do training programs encompass various aspects of emergency communication, including procedures, protocols, equipment operation, and communication strategies?",
        "EmergencyCommunicationTrainingSessions": "How frequently are emergency communication training sessions conducted for staff members?",
        "Training Schedule Set": "Is there a schedule or calendar for recurring training sessions, and are sessions held at regular intervals throughout the year?",
        "Drills Included": "Do emergency communication training programs incorporate practical exercises, drills, or simulations to simulate real-world emergency scenarios?",
        "Drill Effectiveness": "Are communication drills designed to assess staff members' ability to effectively communicate critical information, follow established protocols, and coordinate response efforts?",
        "Scenario Variety": "Are training scenarios diversified to cover a wide range of emergency situations, including natural disasters, security incidents, medical emergencies, and other relevant scenarios?",
        "Scenario Complexity": "Do scenarios vary in complexity and severity to challenge staff members and enhance their preparedness for different types of emergencies?",
        "Role-Specific Focus": "Are training sessions tailored to address the specific communication needs and responsibilities of different staff roles or departments?",
        "Role Preparedness": "Are staff members trained on their roles and responsibilities in initiating, receiving, and relaying emergency communication messages during various emergency scenarios?",
        "Feedback Provided": "Are feedback mechanisms incorporated into training sessions to provide staff members with constructive feedback on their performance during communication drills?",
        "Debrief Sessions": "Are debriefing sessions conducted after drills to review strengths, areas for improvement, and lessons learned, with recommendations for enhancement discussed and documented?",
        "Plan Integration": "Are emergency communication training programs aligned with broader emergency preparedness and response plans and protocols?",
        "Plan Reinforcement": "Are training scenarios and exercises designed to reinforce and validate emergency communication procedures outlined in emergency plans?",
        "Training Records": "Are records maintained to document staff participation in emergency communication training sessions, including attendance, training materials used, and performance evaluations?",
        "Records Accessible": "Are training records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?",
        "contactInfoCollection": "How does the school or educational institution collect, manage, and update emergency contact information for students and their families?",
        "contactInfoSystems": "What systems, databases, or platforms are utilized to maintain accurate and up-to-date contact details, including phone numbers, email addresses, and alternative emergency contacts?",
        "contactInfoVerification": "Are parents provided with opportunities and mechanisms to review, verify, and update their contact information regularly, such as through online portals, forms, or designated communication channels?",
        "emergencyProtocols": "What protocols or procedures are in place to initiate and facilitate communication with parents in the event of emergencies, incidents, or critical situations occurring at the school?",
        "contactListAccess": "How are emergency contact lists accessed, activated, or utilized by school staff, administrators, or safety personnel to notify parents of safety alerts, school closures, or other urgent messages?",
        "identityVerification": "How does the school verify the identity and authority of individuals contacting or requesting information about students during emergency situations or crises?",
        "authenticationProcedures": "Are procedures established to authenticate the identity of parents, guardians, or authorized emergency contacts before disclosing sensitive information or providing updates regarding student safety or well-being?",
        "privacyMeasures": "What measures are implemented to protect the privacy, confidentiality, and security of student and parent information during emergency communications and interactions?",
        "accessibilityInclusivity": "How does the school ensure that emergency contact information and communication methods are accessible and inclusive to all parents, regardless of language, literacy, or technological proficiency?",
        "disabilityAccommodations": "Are accommodations provided for parents with disabilities, communication barriers, or unique needs to ensure they receive timely and relevant emergency notifications and updates?",
        "outreachSupportServices": "What outreach efforts or support services are available to assist parents in updating or verifying their contact information, especially those facing challenges or limitations in accessing school resources?",
        "feedbackUtilization": "How does the school utilize feedback from parents to identify areas for improvement, address communication gaps, or enhance the effectiveness of emergency contact procedures?",
        "parentParticipation": "Are opportunities provided for parents to participate in collaborative discussions, focus groups, or surveys aimed at evaluating and refining emergency communication strategies and practices?",
        "evacuationProceduresDevelopment": "How are evacuation procedures developed, documented, and communicated to staff members, students, and visitors within the school community?",
        "evacuationPlanAssessment": "Are evacuation plans based on thorough assessments of building layouts, occupancy characteristics, fire protection systems, and potential hazards to ensure safe and efficient evacuation routes and assembly areas?",
        "evacuationPlanConsiderations": "What considerations are given to factors such as building occupancy, accessibility requirements, special needs populations, and coordination with local emergency responders in the development of evacuation plans?",
        "floorPlansVisibility": "Are floor plans and evacuation routes prominently displayed, clearly marked, and readily accessible in key locations throughout the school premises?",
        "evacuationMapDetails": "Do evacuation maps include detailed floor layouts, exit locations, primary and secondary evacuation routes, assembly areas, and designated muster points for accountability and headcount purposes?",
        "evacuationRoutesCustomization": "How are evacuation routes tailored to different areas of the school campus, such as classrooms, offices, gymnasiums, auditoriums, laboratories, or specialized facilities, to accommodate varying occupant loads and mobility considerations?",
        "staffTrainingEvacuation": "How are staff members trained on evacuation procedures, route navigation, assembly area assignments, and roles and responsibilities during evacuation drills and real emergencies?",
        "evacuationTrainingFrequency": "Are evacuation training sessions conducted regularly to familiarize staff members with evacuation routes, exit procedures, emergency equipment locations, and communication protocols?",
        "staffReadinessMeasures": "What measures are in place to ensure staff members are equipped with the knowledge, skills, and confidence to lead and assist occupants during evacuations and account for individuals with special needs or mobility challenges?",
        "drillFrequencyCriteria": "How frequently are evacuation drills conducted, and what criteria are used to assess the effectiveness, realism, and compliance of drill exercises with established evacuation procedures?",
        "drillScenarioCustomization": "Are evacuation drills tailored to simulate different scenarios, challenges, and contingencies to test the responsiveness, coordination, and decision-making capabilities of staff members and occupants?",
        "drillOutcomeEvaluation": "How are evacuation drill outcomes evaluated, debriefed, and used to identify areas for improvement, reinforce best practices, and enhance the overall readiness and resilience of the school community?",
        "evacuationIntegration": "How are evacuation procedures integrated into broader emergency response plans, protocols, and coordination efforts within the school environment?",
        "evacuationSynchronization": "Are evacuation procedures synchronized with other emergency response actions, such as lockdowns, sheltering, medical response, or reunification processes, to ensure a comprehensive and coordinated approach to emergency management?",
        "evacuationCommunicationMechanisms": "What mechanisms are in place to communicate evacuation orders, monitor evacuation progress, and coordinate with external agencies, such as fire departments, law enforcement, or emergency management authorities, during evacuation operations?",
        "protocolDevelopmentDescription": "How are emergency response protocols developed, and are they based on recognized standards, best practices, or regulatory requirements?",
        "specificEmergencyTypes": "Are response protocols tailored to address specific types of emergencies or threats commonly faced by the organization?",
        "protocolConsiderations": "What considerations are taken into account when determining the appropriate actions and procedures to include in response protocols?",
        "protocolReview": "Are response protocols reviewed and updated periodically to reflect changes in organizational needs, emerging threats, or lessons learned from incidents?",
        "immediateActions": "What immediate actions are outlined in the response protocols for various types of emergencies (e.g., evacuation, shelter-in-place, medical emergencies)?",
        "initialResponseTraining": "Are staff members trained on the specific steps to take during the initial moments of an emergency, such as alerting others, assessing the situation, and taking protective measures?",
        "protocolCommunication": "How are response protocols communicated to staff members to ensure they are aware of and understand their roles and responsibilities?",
        "initiatorTeams": "Are there designated individuals or teams responsible for initiating immediate actions in different areas or departments of the organization?",
        "externalCoordination": "How are response protocols coordinated with external emergency services (e.g., fire department, law enforcement) to facilitate a timely and effective response?",
        "communicationProcedures": "What communication procedures are included in the response protocols for disseminating information and instructions during emergencies?",
        "notificationChannelsDetails": "Are there established communication channels and protocols for notifying staff members, occupants, and relevant stakeholders about emergency situations?",
        "communicationSystems": "How are communication systems and technologies utilized to ensure rapid and reliable dissemination of critical information?",
        "backupMethods": "Are backup communication methods or redundancy measures in place to address potential failures or disruptions in primary communication channels?",
        "communicationTraining": "How are staff members trained on effective communication practices during emergencies, such as using clear and concise language, active listening, and relaying accurate information?",
        "decisionAuthority": "How is decision-making authority delineated within the response protocols, and are there clear lines of authority and accountability during emergency situations?",
        "decisionFrameworkTraining": "Are staff members trained on the decision-making framework outlined in the response protocols, including when to escalate issues or seek additional support?",
        "empowermentMechanisms": "What mechanisms are in place to empower staff members to make informed decisions and take appropriate actions based on the situational context and available information?",
        "delegationDetails": "Are there protocols for delegating decision-making authority to designated individuals or teams in the event of leadership absence or incapacitation?",
        "decisionDocumentation": "How are decisions documented and communicated within the organization to ensure transparency and accountability?",
        "trainingMethods": "How are staff members trained on the response protocols, and what methods or formats are used to deliver training (e.g., classroom sessions, practical exercises)?",
        "scenarioDrills": "Are scenario-based drills conducted to simulate emergency situations and allow staff members to practice implementing response protocols in a realistic setting?",
        "drillFrequency": "How often are training sessions and drills conducted to reinforce response protocols and maintain readiness among staff members?",
        "debriefingSessions": "Are debriefing sessions held after training exercises to review performance, identify areas for improvement, and incorporate lessons learned into future training activities?",
        "retentionMeasures": "What measures are in place to ensure that staff members retain knowledge and skills related to response protocols over time, including refresher training and ongoing reinforcement?",
        "protocolDocumentation": "How are response protocols documented and disseminated to ensure accessibility and consistency across the organization?",
        "reviewDetails": "Are response protocols regularly reviewed and evaluated to assess their effectiveness, identify gaps or weaknesses, and make necessary revisions?",
        "performanceMetrics": "What metrics or indicators are used to measure the performance and outcomes of response protocols during actual emergencies or drills?",
        "postIncidentAnalyses": "Are post-incident analyses conducted to evaluate the implementation of response protocols, identify opportunities for improvement, and inform revisions?",
        "lessonsLearnedSharing": "How are lessons learned from response protocols shared within the organization to enhance preparedness and resilience against future emergencies?",
        "emergencyScenarios": "What specific emergency scenarios are included in the response training exercises?",
        "trainingAddressingNeeds": "How is the training tailored to address the unique needs of the school environment?",
        "trainerQualifications": "What qualifications or certifications do the trainers have to conduct emergency response training?",
        "updatedEmergencyResponseTraining": "How often is the emergency response training updated or revised to incorporate new protocols or lessons learned?",
        "shelterAgreements": "Are there agreements or partnerships established with local emergency shelters to provide assistance in the event of community-wide emergencies, disasters, or evacuations?",
        "shelterIdentificationCriteria": "How are emergency shelters identified, selected, and vetted as suitable resources for providing temporary housing, support services, and basic necessities to individuals or families affected by emergencies or disasters?",
        "shelterAccessibilityCriteria": "What criteria are considered when assessing the accessibility, capacity, and readiness of emergency shelters to accommodate diverse populations, including individuals with disabilities, medical needs, or language barriers?",
        "emergencyCoordination": "How do schools coordinate with local emergency management agencies, government entities, or nonprofit organizations to incorporate emergency sheltering plans into broader community preparedness efforts?",
        "emergencyDrills": "Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of emergency sheltering protocols, logistics, and communication procedures between schools and community partners?",
        "communicationCoordinationMechanisms": "What mechanisms are in place to ensure ongoing communication, coordination, and mutual aid agreements between schools, emergency shelters, and other stakeholders involved in emergency response and recovery operations?",
        "resourceAllocationMechanisms": "How are resources allocated and mobilized to support emergency sheltering operations, including staffing, supplies, equipment, and facilities management?",
        "contingencyPlans": "Are contingency plans developed to address potential challenges or gaps in resources, such as shortages of shelter space, specialized medical equipment, or essential supplies during prolonged emergencies or mass evacuations?",
        "shelterSupportServices": "What support services or accommodations are available at emergency shelters to meet the diverse needs of evacuees, including access to food, water, sanitation facilities, medical care, mental health support, and social services?",
        "communityShelterInformation": "How are community members informed about the availability, location, and operational status of emergency shelters during emergencies or disasters?",
        "shelterAwarenessOutreach": "Are outreach efforts conducted to raise awareness, provide guidance, and encourage individuals and families to make informed decisions about seeking shelter, evacuation, or other protective actions in response to imminent threats or hazards?",
        "shelterInclusivityStrategies": "What strategies are employed to promote inclusivity, cultural competence, and accessibility in emergency sheltering services to ensure equitable access and support for vulnerable populations?",
        "shelterEffectivenessEvaluation": "How is the effectiveness of emergency sheltering operations evaluated, monitored, and reviewed after incidents or exercises to identify lessons learned, best practices, and areas for improvement?",
        "shelterImprovementActions": "What steps are taken to incorporate feedback, address identified challenges, and enhance the resilience, efficiency, and effectiveness of emergency sheltering systems within the community?",
        "encryptionStandards": "What encryption standards or algorithms are required for protecting sensitive data (e.g., AES-256, RSA)?",
        "selectedStandards": "How are encryption standards selected and updated to address emerging security threats?",
        "documentedStandards": "Are encryption standards documented and communicated to relevant stakeholders?",
        "sensitiveData": "What criteria are used to define what constitutes sensitive data within the organization?",
        "reviewedClassifications": "How frequently are data classifications reviewed and updated?",
        "encryptionTools": "What methods or tools are used to apply encryption to sensitive data (e.g., software, hardware)?",
        "integratedEnryption": "How is encryption integrated into data storage, transmission, and processing systems?",
        "consistentPractices": "Are encryption practices consistent across different types of sensitive data and systems?",
        "managingKeys": "What procedures are in place for generating, distributing, storing, and managing encryption keys?",
        "accessProtected": "How are encryption keys protected from unauthorized access or compromise?",
        "expirationProcesses": "What processes are followed for key rotation, expiration, and revocation?",
        "complyingRegulations": "How does the organization's encryption approach comply with relevant regulations and standards (e.g., GDPR, HIPAA)?",
        "complianceRegulations": "What measures are in place to ensure ongoing compliance with encryption-related regulations?",
        "securingData": "What encryption protocols are used for securing data transmitted over networks (e.g., TLS, HTTPS)?",
        "dataIntegrity": "How is the integrity and confidentiality of data in transit ensured through encryption?",
        "effectivenessValidation": "Are there policies and procedures for validating the effectiveness of encryption for data in transit?",
        "storedMedia": "How is sensitive data encrypted when stored on physical media, such as hard drives and backup tapes?",
        "encryptionTechniques": "What encryption techniques are used for cloud storage and other remote data repositories?",
        "protectingData": "Are there safeguards to protect encrypted data from unauthorized access or physical theft?",
        "authorizedPersonnel": "What access controls are in place to ensure that only authorized personnel can manage and use encryption keys?",
        "reviewedPermissions": "How are access permissions reviewed and updated to reflect changes in personnel or roles?",
        "monitoringMechanisms": "Are there logging and monitoring mechanisms to track access to encryption keys and sensitive data?",
        "encryptionMeasures": "How is the effectiveness of encryption measures tested and validated?",
        "regularAssessments": "Are there regular security assessments or audits to evaluate the implementation of encryption?",
        "identifiedVulnerabilities": "What processes are in place to address any vulnerabilities or issues identified during testing?",
        "employeeTraining": "What training is provided to employees regarding encryption practices and data protection?",
        "awarenessRequirements": "How is awareness of encryption requirements and best practices maintained among staff?",
        "employeeResources": "Are there resources or guidelines available to assist employees in understanding and implementing encryption?",
        "endpointSecurityTypes": "What types of endpoint security solutions are currently implemented (e.g., antivirus, anti-malware, encryption)?",
        "endpointSecurityConfiguration": "How are endpoint security solutions configured to ensure they are effective against evolving threats?",
        "endpointSecurityMonitoring": "What processes are in place for monitoring and managing endpoint security alerts and incidents?",
        "endpointSecurityUpdates": "How often are endpoint security solutions updated or patched to protect against new vulnerabilities?",
        "endpointSecurityTraining": "What training or resources are provided to staff regarding the importance of endpoint security and safe practices?",
        "reviewedEvacuationRoutes": "How often are evacuation routes reviewed and updated within the facility?",
        "Regular Interval": "Are reviews conducted at regular intervals to ensure that evacuation routes remain current and effective?",
        "Schedule Procedure": "Is there a schedule or procedure in place for conducting routine reviews of evacuation routes?",
        "structuredProcess": "Is there a structured process for reviewing evacuation routes, including designated personnel responsible for conducting reviews?",
        "Comprehensive Coverage": "Are reviews comprehensive, covering all areas of the facility, including primary and alternative evacuation routes?",
        "Obstacle Assessment": "Do reviews include assessments of signage, lighting, obstacles, and other factors that may impact the usability of evacuation routes?",
        "Regulation Compliance": "Are evacuation routes reviewed to ensure compliance with relevant regulations, codes, and standards, such as building codes and fire safety regulations?",
        "Knowledgeable Reviewers": "Are reviews conducted by individuals knowledgeable about regulatory requirements and best practices for evacuation route design and signage?",
        "Disability Access": "Are evacuation routes reviewed to ensure accessibility for individuals with disabilities or mobility limitations?",
        "Occupant Provisions": "Are there provisions in place to accommodate the needs of all occupants, including those who may require assistance during evacuations?",
        "Sign Inspection": "Are evacuation route signs inspected as part of the review process to ensure they are clear, visible, and properly positioned?",
        "Sign Updates": "Are signs updated or replaced as needed to maintain legibility and compliance with standards?",
        "Wayfinding Review": "Are wayfinding aids, such as floor plans or maps, reviewed to ensure they accurately depict evacuation routes and assembly areas?",
        "Plan Alignment": "Are evacuation routes reviewed in conjunction with broader emergency response plans to ensure alignment and consistency?",
        "Response Integration": "Do reviews consider how evacuation routes integrate with other emergency preparedness and response measures, such as sheltering procedures and communication protocols?",
        "Outcome Records": "Are records maintained to document the outcomes of evacuation route reviews, including any identified issues, recommended changes, and actions taken?",
        "Accessible Records": "Are review records accessible to relevant stakeholders for reference and follow-up?",
        "Trend Tracking": "Are review findings used to track trends, monitor compliance, and inform future updates to evacuation routes and emergency plans?",
        "sharingInformationToMedia": "How is information shared with the media to ensure accurate reporting during a crisis situation?",
        "protectingStudents": "What guidelines are in place to protect student and staff privacy when communicating externally during a crisis?",
        "managingExternalCommunicationsResponsibility": "Who is responsible for managing external communications, and what training or resources do they have to handle media inquiries effectively?",
        "fullCoverage": "Do they cover the entire perimeter, including all fence lines and potential entry points?",
        "coverageSufficient": "Is sensor coverage sufficient across the entire fence line?",
        "sensitivityLevel": "Are the fence sensors set to an appropriate sensitivity level to detect tampering, such as cutting, climbing, or lifting of the fence?",
        "falseAlarmAdjustments": "Have adjustments been made to minimize false alarms caused by environmental factors such as wind, vegetation, or wildlife?",
        "quickResponse": "Do the fence sensors respond quickly to detected tampering and trigger alarms promptly?",
        "differentiationMechanism": "Is there a mechanism in place to differentiate between normal activities (e.g., wind-induced movements) and suspicious behaviors to minimize false alarms?",
        "realTimeTransmission": "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?",
        "integratedAlarmSystem": "Are the fence sensors integrated with the overall perimeter alarm system?",
        "coordinationWithOtherDevices": "Is there coordination between fence sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?",
        "remoteMonitoring": "Is there remote access and monitoring functionality for the fence sensors?",
        "secureProtocols": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?",
        "durableDesign": "Are the fence sensors designed to withstand outdoor environmental factors such as temperature variations, moisture, and physical impact?",
        ////////////
        "defineCriteria": "What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?",
        "firewallUtilization": "How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?",
        "guidelinesProtocols": "Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?",
        "reviewFrequency": "How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?",
        "validationProcesses": "What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?",
        "automatedTools": "Are there automated tools or systems in place to assist with the management and deployment of ACLs across multiple firewall devices within the organization?",
        "trafficMonitoring": "How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?",
        "regularAudits": "Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?",
        "incidentDocumentation": "How are incidents involving unauthorized access or ACL breaches documented, and what corrective actions are taken to prevent similar occurrences in the future?",
        "trainingPrograms": "What training programs are provided to IT staff to ensure they have the knowledge and skills necessary to configure and manage ACLs effectively?",
        "documentationGuidelines": "Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?",
        "promoteAwareness": "How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?",
        "adaptability": "How do ACLs adapt to accommodate new devices, applications, or users added to the network, and is there a process for dynamically updating ACLs in response to these changes?",
        "scalingStrategies": "Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?",
        "integrationSecurityMeasures": "How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?",
        "guidelinesProtocolsComment": "Guidelines Protocols Comment",
        "automatedToolsComment": "Automated Tools Comment",
        "regularAuditsComment": "Regular Audits Comment",
        //GateAlarms.js below
        "installedOnAllGates": "Are the gate alarms installed on all entry gates, including vehicle and pedestrian gates?", 
        "coverageAllOpenings": "Do they cover all gate openings and potential access points?",
        "noCoverageGates": "Are there any gates or entry points without alarm coverage?",
        "sensorType": "What type of sensors are used for gate alarms (e.g., magnetic switches, contact sensors)?",
        "sensorActivation": "Are the sensors activated when the gate is opened, closed, or both?",
        "delayMechanism": "Is there a delay mechanism in place to allow authorized personnel to disarm the alarm before it triggers?",
        "quickResponse": "Do the gate alarms respond quickly when triggered by unauthorized access attempts?",
        "audibleVisualAlarm": "Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?",
        "realTimeResponse": "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?",
        "integratedWithPerimeterSystem": "Are the gate alarms integrated with the overall perimeter alarm system?",
        "seamlessCommunication": "Do they communicate seamlessly with alarm control panels and monitoring stations?", 
        "coordinationWithDevices": "Is there coordination between gate alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?",
        "remoteMonitoring": "Is there remote access and monitoring functionality for the gate alarms?", 
        "remoteAccessAcknowledge": "Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?", 
        "secureProtocols": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to alarm controls?", 
        "durability": "Are the gate alarms designed to withstand frequent use and potential tampering attempts?",
        "outdoorDurability": "Are they constructed from durable materials capable of withstanding outdoor conditions?",
        "testingCertification": "Have the alarms undergone testing or certification to verify reliability and durability?",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the gate alarms?",
        "maintenanceTasks": "Are maintenance tasks, such as testing alarm functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        //GlassbreakSensors.js below
        "strategicPlacement": "Are the glass break sensors strategically placed to detect forced entry through windows or glass doors?",
        "vulnerableSurfaces": "Do they cover all vulnerable glass surfaces, including windows, glass doors, and glass panels?",
        "blindSpots": "Are there any blind spots or areas where sensor coverage is insufficient?",
        "sensitivityLevel": "Are the glass break sensors set to an appropriate sensitivity level to detect the sound frequency associated with breaking glass?",
        "falseAlarmAdjustments": "Have adjustments been made to minimize false alarms caused by ambient noise or non-threatening vibrations?",
        "quickResponse": "Do the glass break sensors respond quickly to the sound of breaking glass and trigger alarms promptly?",
        "falseAlarmMechanism": "Is there a mechanism in place to differentiate between normal sounds and the specific sound signature of breaking glass to minimize false alarms?", 
        "realTimeAlarms": "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?",
        "integratedWithAlarm": "Are the glass break sensors integrated with the overall intrusion alarm system?",
        "communicationSeamless": "Do they communicate seamlessly with alarm control panels and monitoring stations?",
        "coordinationWithDevices": "Is there coordination between glass break sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?",
        "remoteAccess": "Is there remote access and monitoring functionality for the glass break sensors?",
        "remoteManagement": "Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?",
        "secureAuthentication": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?",
        "durability": "Are the glass break sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?",
        "constructionMaterials": "Are they constructed from durable materials capable of withstanding indoor and outdoor conditions?", 
        "reliabilityCertification": "Have the sensors undergone testing or certification to verify reliability and durability?", 
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the glass break sensors?", 
        "maintenanceTasks": "Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor components, performed according to schedule?",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", 
        //HealthcareProviderEngagement.js below
        "collaborativeObjectives": "What are the primary objectives and focus areas of collaboration between the school or educational institution and healthcare providers in the community?",
        "jointProgramsExamples": "Can you provide examples of specific programs, initiatives, or projects jointly undertaken by the school and healthcare providers to promote health and wellness, address medical needs, or enhance emergency medical response within the school community?",
        "partnershipAlignment": "How is the partnership with healthcare providers aligned with broader school health goals, emergency preparedness efforts, or community health promotion initiatives?", 
        "medicalResponseCoordination": "How do healthcare providers coordinate with the school administration and designated medical personnel to support medical response efforts during emergencies, incidents, or health-related crises on campus?",
        "medicalProtocols": "Are protocols established for accessing medical expertise, resources, or support services from healthcare providers in the event of medical emergencies, injuries, or illness occurring within the school community?",
        "healthcareProviderRole": "What role do healthcare providers play in providing guidance, training, or medical oversight to school staff, administrators, or designated responders regarding medical response procedures and protocols?",
        "healthEducationContribution": "How do healthcare providers contribute to health education and outreach efforts within the school community, including students, staff, and families?",
        "resourcesProvidedHealth": "What resources, materials, or presentations does the healthcare community provide to educate students about health promotion, disease prevention, or general wellness practices?", 
        "interactiveLearning": "Are collaborative activities organized to engage students in interactive learning experiences, workshops, or health screenings conducted by healthcare professionals?",
        "healthcareIntegration": "How are healthcare services integrated into the broader support systems and resources available to students within the school setting?",
        "accessMechanisms": "Are mechanisms in place to facilitate access to healthcare services, referrals, or follow-up care for students in need of medical attention or specialized treatment?", 
        "continuityOfCareStrategies": "What strategies are employed to promote continuity of care, communication, and collaboration between school-based health services and external healthcare providers?", 
        "communityHealthEngagement": "How do healthcare providers engage with the broader school community, including parents, caregivers, and local residents, to promote health literacy, healthy lifestyles, and preventive healthcare practices?",
        "communityHealthEvents": "Are community health fairs, wellness events, or educational workshops organized jointly by the school and healthcare providers to raise awareness about health-related issues and resources available in the community?", 
        "healthDisparitiesEfforts": "What efforts are made to address health disparities, cultural competence, or social determinants of health within the school community through collaborative partnerships with healthcare providers?",
        //IdentifyingSuspiciousBehavior.js below
        "recognizing-suspicious-behavior": "Are staff members trained to recognize and identify indicators of suspicious behavior, unusual activity, or potential threats within the school environment?",
        "warning-sign-training": "What specific behaviors or actions are emphasized during training as potential warning signs of security concerns, such as aggression, hostility, erratic movements, or attempts to conceal weapons or contraband?",
        "maintaining-vigilance": "How are staff members educated on the importance of maintaining vigilance, situational awareness, and proactive observation to detect and report suspicious incidents promptly?",
        "reporting-procedures": "Are clear reporting procedures established and communicated to staff members for documenting and reporting observations of suspicious behavior or security-related concerns?",
        "response-training": "How are staff members trained to initiate timely and appropriate responses, such as notifying school administrators, security personnel, or law enforcement authorities, when encountering suspicious individuals or activities?",
        "confidentiality-measures": "What measures are in place to ensure confidentiality, anonymity, and protection from retaliation for staff members who report security-related incidents or raise concerns about potential threats?",
        "collaborating-with-colleagues": "How are staff members encouraged to communicate and collaborate with colleagues, security personnel, and other stakeholders to share information, insights, and observations related to security threats or suspicious behavior?",
        "information-sharing": "Are mechanisms in place to facilitate information sharing, debriefings, or post-incident discussions among staff members to analyze and learn from past experiences, identify emerging trends, and enhance threat recognition capabilities?",
        "threat-assessment-protocols": "What protocols are followed to coordinate threat assessment efforts, validate reported concerns, and determine appropriate follow-up actions or interventions based on the severity and credibility of identified threats?",
        "training-exercises": "Are staff members provided with scenario-based training exercises, simulations, or case studies to practice identifying and responding to various types of security threats or suspicious situations?",
        "simulate-realistic-scenarios": "How do scenario-based training sessions simulate realistic scenarios, challenge decision-making abilities, and test staff members' capacity to assess threats, evaluate risks, and implement appropriate security measures?",
        "evaluating-performance": "What feedback mechanisms are utilized to evaluate staff members' performance during scenario-based training exercises, reinforce key concepts, and address areas for improvement in threat recognition and response skills?",
        "recognizing-potential-biases": "Are staff members trained to recognize potential biases, stereotypes, or cultural factors that may influence their perceptions of suspicious behavior or threat indicators?",
        "cultural-sensitivity-programs": "How do training programs promote cultural sensitivity, inclusivity, and equity in threat assessment practices, ensuring that staff members avoid making assumptions based on race, ethnicity, religion, or other personal characteristics?",
        "open-dialogue-strategies": "What strategies are implemented to foster open dialogue, mutual respect, and trust among staff members, students, and community members, enhancing the effectiveness of threat recognition efforts and promoting a safe and supportive school environment for all?",
        //IdentifyingSuspiciousBehavior2.js below
        "suspiciousBehavior": "What specific behaviors are staff trained to recognize as suspicious in the school environment?",
        "suspiciousBehaviorTrainingMethod": "How is the training for identifying suspicious behavior conducted (e.g., workshops, online modules)?",
        "reportingResources": "What resources or tools are provided to staff for reporting suspicious behavior?",
        "suspiciousBehaviorTrainingReview": "How often is the training on identifying suspicious behavior reviewed or updated to reflect current security concerns?",
        "realLifeScenarios": "Are there real-life scenarios or examples included in the training to help staff better understand suspicious behavior?",
        //IncidentReporting.js Below
        "reportingChannels": "What channels are available for employees to report suspicious emails or potential phishing attempts (e.g., email, dedicated reporting tool, phone line)?",
        "accessibleReporting": "Are these reporting mechanisms easily accessible and user-friendly for all employees, regardless of their technical expertise?",
        "reportingProcessClarity": "Is there a clear process outlined for what information employees should include when reporting suspicious emails?",
        "regularTraining": "Are employees regularly trained on how to recognize suspicious emails and the importance of promptly reporting them?",
        "reportingReminders": "How often are employees reminded of the reporting procedures, and is there ongoing communication to reinforce these practices?",
        "caseStudies": "Are there examples or case studies used in training to illustrate successful reporting and its impact on preventing security breaches?",
        "incidentHandlingProcess": "What is the process for handling reports of suspicious emails once they are submitted? Who is responsible for investigating these reports?",
        "incidentResponseTime": "How quickly are reported incidents reviewed and addressed by the security team, and is this turnaround time communicated to employees?",
        "employeeFeedback": "Is there feedback provided to employees who report suspicious emails, such as acknowledgment of the report and information on any actions taken?",
        "effectivenessMetrics": "How is the effectiveness of the incident reporting process measured (e.g., number of reports, accuracy of reports, prevention of phishing attacks)?",
        "reviewAuditProcess": "Are there regular reviews or audits of the reporting process to identify areas for improvement and ensure it remains effective?",
        "encourageReporting": "How does the organization encourage employees to report incidents without fear of reprisal or judgment?",
        "integrationWithSecurity": "How is the incident reporting process integrated with other security measures, such as threat intelligence sharing and security incident response?",
        "escalationProtocols": "Are there established protocols for escalating reported incidents to higher-level security teams or external authorities if needed?",
        "useOfIncidentData": "How does the organization use data from reported incidents to enhance overall cybersecurity strategies and awareness efforts?",
        "reportingCulture": "Are there initiatives in place to promote a culture of proactive reporting and cybersecurity vigilance among employees?",
        "recognitionForReporting": "Does the organization recognize or reward employees for identifying and reporting potential security threats?",
        "emphasisOnReporting": "How is the importance of incident reporting emphasized within the organization's overall cybersecurity training and awareness programs?",
        "automatedSystems": "Are there automated systems in place to assist in the reporting and initial analysis of suspicious emails (e.g., phishing detection tools)?",
        "techStreamliningReporting": "How does technology aid in streamlining the reporting process and reducing the burden on employees?",
        "futureTechEnhancements": "Are there plans to enhance reporting capabilities with new technologies or integrations to improve detection and response times?",
        "communicationStrategy": "Is there a clear communication strategy to inform employees about the outcomes of their reports and the importance of their role in cybersecurity?",
        "employeeFeedbackOnProcess": "Are there opportunities for employees to provide feedback on the reporting process and suggest improvements?",
        "transparencyInReporting": "How does the organization ensure transparency in its handling of reported incidents, while maintaining necessary confidentiality and security?",
        //IncidentReportingProcedures.js below
        "incidentReportingSteps": "What are the steps for reporting a security incident (e.g., whom to contact, what information to provide)?",
        "incidentReportingTimeframes": "Are there specific timeframes for reporting incidents, and what are the consequences of delayed reporting?",
        "incidentReportingChannels": "What channels are available for reporting (e.g., hotline, email, incident management system)?",
        "incidentReportingAnonymity": "How is anonymity handled in the reporting process, if an employee prefers to remain anonymous?",
        "incidentReportingFollowUp": "What follow-up actions can employees expect after reporting an incident (e.g., investigation, status updates)?",
        //IncidentResponsePatchManagement.js below
        "patchIdentification": "How are security patches identified and prioritized for deployment?",
        "patchSources": "What sources are used to stay informed about available patches?",
        "criticalPatchesCriteria": "Are there specific criteria for determining which patches are critical?",
        "patchDeploymentProcedures": "What procedures are followed for deploying patches?",
        "minimalDisruption": "How is patch deployment managed to ensure minimal disruption?",
        "predefinedRolloutSteps": "Are there predefined steps for rolling out patches?",
        "patchTestingValidation": "What testing is conducted to validate that patches do not negatively impact system functionality?",
        "riskAssessmentMitigation": "How are potential risks assessed and mitigated before applying patches to live systems?",
        "patchVerification": "Are there procedures for verifying that patches have been successfully applied?",
        "patchDocumentationProcess": "How is the patch management process documented?",
        "patchHistoryTracking": "What information is included to track patch history and compliance?",
        "patchAuditUsage": "How is documentation used for auditing patch management?",
        "reportingMechanisms": "What reporting mechanisms are in place to track patch deployments?",
        "reportReview": "How are reports reviewed to identify gaps?",
        "reportingIssues": "Are there established procedures for reporting patch deployment issues?",
        "patchTools": "What tools are used to automate patching?",
        "toolsMaintenance": "How are tools maintained to ensure effectiveness?",
        "integrationRequirements": "Are there integration requirements with existing infrastructure?",
        "rollbackProcedures": "What rollback procedures are in place?",
        "rollbackDecision": "How is the decision made to roll back a patch?",
        "rollbackIssues": "How are rollback issues communicated?",
        "patchPolicy": "What policies govern the patch management process?",
        "policyCommunication": "How are policies communicated to stakeholders?",
        "policyReview": "Are policies periodically reviewed to ensure effectiveness?",
        "trainingOnPatch": "What training is provided on patch management?",
        "staffAwareness": "How is staff awareness of patch management importance ensured?",
        "refresherTraining": "Are there refresher training sessions for staff?",
        "incidentIntegration": "How is patch management integrated with incident response?",
        "incidentRecoveryRole": "What role does patch management play in incident recovery?",
        "quickPatchDeployment": "Are there protocols for quick patch deployment during incidents?",
        //IncidentresponseTeamRolesAndResponsibilities.js below
        "roleDefinition": "What specific roles are defined within the incident response team (e.g., Incident Commander, Lead Analyst, Communications Coordinator)?",
        "roleAssignment": "How are these roles determined and assigned based on the team's expertise and the organization's needs?",
        "clearRoleDescriptions": "Are there clear descriptions of responsibilities for each role to ensure effective incident management?",
        "trainingRequirements": "What training or certification requirements are established for each role within the incident response team?",
        "ongoingTraining": "How is ongoing training provided to keep team members updated on the latest incident response practices and technologies?",
        "periodicEvaluations": "Are there periodic evaluations or drills to assess the team's preparedness and proficiency in their roles?",
        "incidentProcedures": "What procedures are outlined for each role during different phases of an incident (e.g., detection, containment, eradication, recovery)?",
        "roleCoordination": "How are roles coordinated to ensure a seamless response, including communication and decision-making processes?",
        "predefinedChecklists": "Are there predefined checklists or guidelines to assist team members in fulfilling their responsibilities during an incident?",
        "communicationManagement": "How is communication managed among team members during an incident, and what tools or systems are used (e.g., secure messaging platforms)?",
        "coordinationProtocols": "What protocols are in place to ensure effective coordination between roles and timely information sharing?",
        "externalCommunications": "How are external communications handled, including interactions with stakeholders, regulatory bodies, or the public?",
        "roleFlexibility": "How is flexibility incorporated into role assignments to accommodate different types or scales of incidents (e.g., overlapping roles or additional resources)?",
        "backupPersonnel": "Are there backup or alternate personnel designated for key roles to ensure continuity if primary members are unavailable?",
        "roleAdaptation": "How is role adaptation managed in response to evolving incident dynamics or changes in the organization's structure?",
        "roleTools": "What tools, resources, or access privileges are assigned to each role to facilitate their responsibilities during an incident?",
        "softwareHardware": "Are there specific software or hardware resources required for different roles (e.g., forensic tools, communication equipment)?",
        "toolsAccessManagement": "How is access to these tools and resources managed and secured to support effective incident response?",
        "roleEvaluation": "How are the roles and responsibilities of the incident response team evaluated after an incident (e.g., debriefings, performance reviews)?",
        "feedbackMechanisms": "What feedback mechanisms are in place to gather insights from team members and improve role definitions and procedures?",
        "lessonsLearned": "How are lessons learned from past incidents used to refine role assignments and enhance the overall effectiveness of the response team?",
        //InfraredCameras.js below
        "lowLightPerformance": "Do the infrared cameras effectively capture images in low-light or nighttime conditions?",
        "infraredLEDs": "Are they equipped with infrared LEDs or other illumination technology to enhance visibility in darkness?",
        "lowLightAdjustments": "Are there adjustments or settings available to optimize camera performance in varying levels of low-light conditions?",
        "imageQuality": "Do the infrared cameras capture high-quality images with sufficient resolution for identification and analysis, even in low-light environments?",
        "imageClarity": "Are there adjustments or settings available to enhance image clarity and detail in low-light conditions?",
        "clearImages": "Are images clear and detailed, allowing for easy identification of individuals and activities in low-light environments?",
        "systemIntegration": "Are the infrared cameras integrated with the overall surveillance system?",
        "softwareCommunication": "Do they communicate seamlessly with surveillance software and monitoring stations?",
        "realTimeMonitoring": "Is there real-time monitoring and recording of camera feeds from areas with low-light conditions?",
        "coverageAreas": "Do the infrared cameras cover the desired areas with low-light conditions, providing comprehensive surveillance coverage?",
        "strategicPositioning": "Are they positioned strategically to monitor critical areas, such as dark corners, alleys, or building perimeters, effectively?",
        "blindSpots": "Are there any blind spots or areas where camera coverage is insufficient in low-light environments?",
        "weatherResistance": "Are the infrared cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?",
        "durableMaterials": "Are they constructed from durable materials capable of withstanding harsh outdoor conditions?",
        "weatherProofingCertification": "Have the cameras undergone testing or certification to verify weatherproofing and durability?",
        "remoteAccess": "Is there remote access and control functionality for the infrared cameras?",
        "remoteAdjustments": "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?",
        "secureProtocols": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the infrared cameras?",
        "maintenanceTasks": "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        //IntegrationWithParentCommunication.js below
        "integratingMechanism": "Is there a mechanism in place to integrate text/email alerts with parent communication systems to facilitate automatic notifications during emergencies?",
        "connectingAlertSystem": "Are there established protocols or interfaces for connecting the alerting system with parent communication platforms or databases?",
        "automaticNotificationConfigurations": "Are automatic notification configurations set up to ensure that parent contact information is automatically included in text/email alerts during emergencies?",
        "syncingContactDetails": "Are procedures established for syncing or updating parent contact details between the alerting system and parent communication databases?",
        "optInOptOutAlerts": "Are parents provided with opportunities to opt in or opt out of receiving text/email alerts, and are their preferences documented and respected?",
        "obtainingConsent": "Is there a process for obtaining consent from parents for the inclusion of their contact information in emergency notifications?",
        "implementingSafeguardMeasures": "Are appropriate measures implemented to safeguard the security and privacy of parent contact information stored or transmitted through the alerting system?",
        "integrationMechanisms": "Do integration mechanisms comply with relevant privacy regulations and organizational policies governing the handling of sensitive data?",
        "facilitatingCoordination": "Are communication protocols established to facilitate coordination between school authorities and parents during emergency situations?",
        "communicationWithParents": "Is there a designated method or channel for communicating with parents, providing updates, and addressing concerns or inquiries?",
        "informingParentsIntegration": "Are parents informed about the integration of text/email alerts with parent communication systems and the procedures for receiving emergency notifications?",
        "helpingParentsResources": "Are resources or educational materials provided to help parents understand how to opt in or opt out of receiving alerts and how to update their contact information?",
        "effectivenessMechanismsFeedback": "Are feedback mechanisms in place to solicit input from parents regarding the effectiveness and usefulness of text/email alerts during emergencies?",
        "evaluatingParentFeedback": "Is parent feedback used to evaluate and improve the integration of alerting systems with parent communication platforms over time?",
        "testingIntegrationMechanisms": "Are integration mechanisms tested and verified periodically to ensure that parent contact information is accurately included in text/email alerts and that notifications are delivered as intended?",
        "testingScenarios": "Are test scenarios conducted to simulate emergency situations and assess the reliability and responsiveness of the integrated alerting system?",
        //InternalCommunicationProtocols.js below
        "communicationMethods": "What methods are used to communicate critical information to staff during a crisis (e.g., email, text alerts, PA system)?",
        "internalCommunicationEffectiveness": "How is the effectiveness of internal communication assessed during a crisis situation?",
        "designatedSpokespersons": "Are there designated spokespersons for internal communications, and how are they selected?",
        "prioritizedInformation": "How is information about the crisis prioritized and disseminated to ensure all staff members are informed in a timely manner?",
        "staffCommunicationTraining": "What training do staff members receive to prepare them for communicating effectively during a crisis?",
        //InternetSafety.js below
        "internetSafetyEducation": "How are students educated about the potential risks and dangers associated with internet use, including exposure to inappropriate content, online predators, cyberbullying, identity theft, and phishing scams?",
        "internetSafetyCurriculumTopics": "Can you describe the topics covered in the internet safety curriculum, such as privacy settings, safe browsing habits, recognizing and reporting online threats, and responsible social media use, and how these concepts are presented to students in an age-appropriate manner?",
        "strategiesForSafeOnlinePractices": "What strategies are taught to students to promote safe online practices, including the importance of creating strong, unique passwords, avoiding sharing personal information or photos with strangers, and being cautious when clicking on links or downloading files from unknown sources?",
        "encouragingCriticalEvaluationOnline": "How are students encouraged to critically evaluate online information for accuracy, credibility, and potential biases, and what tools or resources are provided to help them fact-check sources, identify misinformation, and navigate digital media literacy challenges?",
        "cyberbullyingCurriculum": "How does the curriculum address the topic of cyberbullying, including defining what constitutes cyberbullying behavior, its impact on victims, and strategies for preventing and responding to cyberbullying incidents?",
        "teachingEmpathyAndDigitalCitizenship": "Are students taught empathy, respect, and digital citizenship skills to foster positive online behavior and promote a culture of kindness, inclusivity, and accountability in digital spaces?",
        "cyberbullyingSupportMechanisms": "What support mechanisms are in place to assist students who experience cyberbullying, including reporting mechanisms, access to counseling or mental health services, and strategies for seeking help from trusted adults or peers?",
        "parentalInvolvementInInternetSafety": "How are parents or guardians involved in reinforcing internet safety lessons at home, and what resources or guidance materials are provided to support parents in discussing online safety topics with their children?",
        "parentEducationEventsWorkshops": "Can you describe any parent education events, workshops, or resources offered by the school to promote collaboration between educators and families in fostering a safe and responsible online environment for students?",
        "communicationWithParentsOnInternetSafety": "How does the school communicate with parents about internet safety initiatives, including updates on curriculum content, online tools and resources, and recommendations for monitoring and supervising children's online activities outside of school hours?",
        //IntrusionDetectionSystems2.js below
        "idsDeployment": "How are IDS solutions deployed across the network (e.g., inline, passive, distributed) and what areas or segments do they cover?",
        "idsConfigSettings": "What are the key configuration settings for the IDS, and how are they tuned to match the organization’s security requirements?",
        "idsBlindSpots": "Are there any known limitations or blind spots in the IDS deployment that need to be addressed?",
        "idsDetectionTypes": "What types of intrusions and attacks does the IDS aim to detect (e.g., network-based attacks, host-based attacks, zero-day exploits)?",
        "idsFalsePositivesHandling": "How does the IDS differentiate between legitimate and malicious activities to minimize false positives and false negatives?",
        "idsDetectionMethods": "Are there specific signatures, heuristics, or anomaly detection methods used to identify potential threats?",
        "realTimeMonitoring": "Does the IDS provide real-time monitoring of network and system activities to identify suspicious or malicious behavior?",
        "idsAlertManagement": "How are alerts generated and managed, and what processes are in place to ensure timely response to detected threats?",
        "alertEscalationProcedure": "What is the procedure for escalating alerts to the appropriate response teams or individuals?",
        "idsIncidentIntegration": "How is the IDS integrated with incident response processes and tools, such as SIEM systems or ticketing systems?",
        "incidentProtocols": "Are there predefined incident response protocols for handling alerts and incidents detected by the IDS?",
        "idsIncidentEffectiveness": "How are the effectiveness and accuracy of the IDS in supporting incident response efforts evaluated?",
        "idsLogCollection": "What types of data and logs are collected by the IDS, and how are they stored and managed?",
        "idsLogAnalysis": "How are IDS logs analyzed to identify trends, patterns, or recurring issues related to security incidents?",
        "logCorrelation": "Are there tools or processes in place to correlate IDS data with other security logs or events?",
        "idsMaintenance": "What is the process for updating and maintaining IDS signatures, rules, and configurations to stay current with emerging threats?",
        "idsUpdatesFrequency": "How often are system updates and patches applied to the IDS, and how is the impact on system performance and security assessed?",
        "updateValidation": "Are there procedures for testing and validating updates to ensure they do not disrupt normal operations?",
        "idsPerformanceMonitoring": "How is the performance of the IDS monitored, and are there metrics or benchmarks used to assess its effectiveness?",
        "periodicAssessment": "Are there periodic reviews or assessments conducted to evaluate the IDS’s ability to detect and respond to threats?",
        "feedbackIncorporation": "How are feedback and lessons learned from past incidents incorporated into the IDS configuration and deployment strategy?",
        //IntrusionDetectionSystems3.js below
        "intrusionSystemTypes": "What types of intrusion detection systems are currently in place (e.g., motion sensors, glass break detectors)?",
        "intrusionAlertCommunication": "How are alerts generated and communicated when a potential intrusion is detected?",
        "intrusionResponseProtocol": "What protocols are followed in response to alerts from the intrusion detection system?",
        "intrusionSystemTesting": "How often are the intrusion detection systems tested for functionality and reliability?",
        "incidentReview": "Are there regular reviews of incidents detected by the system to assess security effectiveness and improve procedures?",
        //IntrusionPreventionSystems.js below
        "ipsSelectionCriteria": "What criteria are used to select and implement intrusion prevention systems (IPS) within the network?",
        "ipsTesting": "How are the IPS configurations tested to ensure effectiveness against various types of attacks?",
        "ipsUpdateMethods": "What methods are in place to regularly update the IPS with new threat signatures or rules?",
        "ipsAlertResponse": "How does the organization monitor and respond to alerts generated by the IPS?",
        "ipsTraining": "What training is provided to staff on the capabilities and limitations of the IPS to ensure proper usage?",
        //IsolationProcedures.js below
        "isolationCriteria": "What criteria are used to determine which systems should be isolated during an incident?",
        "isolationScope": "How are decisions made regarding the scope and extent of isolation?",
        "predefinedProtocols": "Are there predefined protocols for isolating different types of systems?",
        "isolationMethods": "What methods or technologies are used to isolate affected systems?",
        "methodImplementation": "How are these methods implemented to ensure effective containment?",
        "automatedTools": "Are there automated tools to assist with isolation?",
        "communicationManagement": "How is communication managed during the isolation process?",
        "documentationProcedures": "What procedures ensure isolation actions are documented?",
        "reportingChannels": "Are there channels for reporting isolation status?",
        "isolationVerification": "How is it verified that systems have been successfully isolated?",
        "verificationMethods": "What methods test and confirm the effectiveness of isolation?",
        "isolationBenchmarks": "Are there benchmarks for successful isolation?",
        "impactAssessment": "How is the impact of isolation on business operations assessed?",
        "minimizingImpact": "What measures minimize impact on critical functions?",
        "contingencyPlans": "Are there contingency plans for operational issues caused by isolation?",
        "recoveryProcedures": "What procedures are followed for recovery and reconnection?",
        "integrityVerification": "How is system integrity verified before reconnection?",
        "reconnectionProtocols": "What protocols ensure reconnection does not reintroduce the threat?",
        "isolationDocumentation": "How are isolation actions documented?",
        "reportingRequirements": "What are the reporting requirements for the isolation process?",
        "futureImprovements": "How is documentation used to improve future isolation procedures?",
        //KeycardAccessSystems.js below
        "keycardCriteria": "What criteria are used to determine who is issued keycards for access to school facilities?",
        "keycardMonitoring": "How is the keycard access system monitored for unauthorized access attempts?",
        "keycardDeactivation": "What procedures are in place for deactivating keycards when an employee leaves the school or changes roles?",
        "keycardReview": "How frequently is the keycard access system reviewed for effectiveness and potential vulnerabilities?",
        "keycardContingency": "Are there contingency plans for situations where keycards fail or are lost, and how are these communicated to staff?",
        //LawEnforcementCoordination.js below
        "facilityLawCommunicationChannels": "Are there established communication channels between the facility and local law enforcement agencies?",
        "Facility-LawPOCs": "Are there designated points of contact within the facility and law enforcement for emergency coordination?",
        "communicationProtocolsAccessible": "Are communication protocols documented and readily accessible to relevant personnel?",
        "emergencyNotifyProtocol": "Is there a protocol in place for notifying law enforcement agencies in the event of emergencies?",
        "lawContactMethods": "Are there predefined methods for contacting law enforcement, such as phone calls, emails, or dedicated emergency lines?",
        "StaffLawComTraining": "Are staff members trained on when and how to initiate contact with law enforcement and what information to provide?",
        "ResponseTimeDefined": "Are response time expectations clearly defined and communicated to law enforcement agencies?",
        "ResponseTimeBenchmarks": "Have response time benchmarks been established based on the facility's location, size, and potential risks?",
        "ResponseTimeTracking": "Is there a mechanism for tracking and evaluating law enforcement response times during emergencies?",
        "CollabPlanningMeetings": "Are there regular meetings or exercises conducted with law enforcement agencies to review emergency response plans and coordination procedures?",
        "TabletopExercises": "Do tabletop exercises or simulations involve law enforcement agencies to test coordination and communication during various emergency scenarios?",
        "ExerciseFeedbackUsage": "Are feedback and lessons learned from joint exercises used to improve coordination and response capabilities?",
        "informationSharingProtocol": "Is there a protocol for sharing relevant information with law enforcement agencies during emergencies?",
        "InfoSharingTraining": "Are staff members trained to provide accurate and timely information to law enforcement responders?",
        "secureInformationSharing": "Is there a secure method for sharing sensitive or confidential information with law enforcement agencies, if necessary?",
        "MutualAidExistence": "Does the facility have mutual aid agreements or partnerships with neighboring law enforcement agencies?",
        "MutualAidReview": "Are mutual aid agreements documented and reviewed periodically to ensure they align with current needs and resources?",
        "mutualAidActivation": "Is there a process for activating mutual aid support from other agencies during large-scale emergencies or resource-intensive incidents?",
        "PostIncidentDebriefs": "Are debriefing sessions conducted after emergency incidents to review the effectiveness of law enforcement coordination and response?",
        "LawEnforcementInvolvement": "Are representatives from law enforcement agencies involved in post-incident debriefings to provide feedback and insights?",
        "DebriefingRecommendations": "Are recommendations from debriefing sessions implemented to improve coordination and response procedures for future incidents?",
        //LawEnforcementPartnership.js below
        "partnershipEstablishment": "How is the partnership between the school or educational institution and local law enforcement agencies established, formalized, and maintained?",
        "partnershipGoals": "What specific goals, objectives, or areas of collaboration are outlined in the partnership agreement or memorandum of understanding (MOU) between the school and law enforcement?",
        "rolesResponsibilities": "Are roles, responsibilities, and expectations clearly defined for both parties regarding their respective contributions to enhancing school safety, emergency preparedness, and response efforts?",
        "trainingFrequency": "How frequently do school staff, administrators, and law enforcement personnel participate in joint training exercises, drills, or simulations to prepare for various emergency scenarios?",
        "trainingActivities": "What types of training activities are conducted collaboratively, such as active shooter drills, tabletop exercises, or scenario-based simulations, to improve coordination and communication between school and law enforcement personnel?",
        "trainingTailoring": "Are training sessions tailored to address specific needs, challenges, or vulnerabilities identified through risk assessments, security audits, or incident debriefs?",
        "communicationMethods": "How do school administrators and law enforcement agencies communicate and share information regarding potential threats, safety concerns, or suspicious activities identified within the school community?",
        "reportingProtocols": "Are protocols established for reporting, documenting, and responding to security incidents, behavioral indicators, or other warning signs that may pose a risk to school safety?",
        "privacyMeasures": "What measures are in place to protect the privacy, confidentiality, and legal rights of students and staff while facilitating information sharing and collaboration between the school and law enforcement?",
        "resourcesSupport": "What resources, support services, or technical assistance are provided by law enforcement agencies to augment school safety initiatives, emergency response capabilities, or crime prevention efforts?",
        "securityPersonnelTraining": "Are school security personnel, administrators, or designated staff members trained to interface with law enforcement during emergencies, incidents, or law enforcement interventions on campus?",
        "collaborationStrategies": "How does the school administration collaborate with law enforcement agencies to leverage community policing strategies, crime prevention programs, or outreach initiatives aimed at enhancing school security and fostering positive relationships with students and families?",
        "effectivenessEvaluation": "How is the effectiveness of the partnership with local law enforcement agencies evaluated, monitored, and assessed over time?",
        "feedbackMechanisms": "Are mechanisms in place to solicit feedback from school stakeholders, law enforcement personnel, and community members regarding the impact, strengths, and areas for improvement in the collaboration between the school and law enforcement?",
        "partnershipRefinement": "What strategies or measures are implemented to address challenges, adapt to changing circumstances, and refine partnership approaches based on lessons learned, best practices, or emerging trends in school safety and security?",
        //LikelihoodAndImpactAssessment.js below
        "conductedLikelihoodAssessment": "Has a Likelihood and Impact  assessment been conducted? If so, when was it last performed?",
        "determiningSafetyRisks": "What criteria are used to determine the likelihood of various safety risks occurring at the school?",
        "evaluatedIdentifiedRisks": "How is the potential impact of identified risks evaluated in terms of severity and consequences for students and staff?",
        "considering-reports": "Are historical data and incident reports considered in the assessment of likelihood and impact?",
        "frequentUpdates": "How frequently is the likelihood and impact assessment updated to reflect new information or changes in circumstances?",
        "communicationMethods": "What methods are used to communicate the findings of the likelihood and impact assessment to stakeholders, including parents and staff?",
        //LockdownCommunicationProtocols.js below
        "dedicatedCommunicationSystemsText": "Are there dedicated communication systems in place to alert authorities and relevant personnel during emergencies?",
        "variousChannels": "Do these systems include various channels such as silent alarms, intercoms, emergency call boxes, or mobile alerts?",
        "regularTestedCommunicationSystems": "Are communication systems tested regularly to ensure they are functional and reliable?",
        "silentAlarmSystemsInstalled": "Are silent alarm systems installed throughout the premises to discreetly signal emergencies without alerting potential threats?",
        "activatingSilentAlarms": "Do silent alarms activate without audible alerts to avoid escalating situations or causing panic among occupants?",
        "recognizingSilentAlarmTrainingText": "Are designated personnel trained to recognize and respond to silent alarm activations promptly?",
        "activatingSilentAlarmsProtocolsText": "Are there established protocols for activating silent alarms in different emergency scenarios, such as intruders, medical emergencies, or security breaches?",
        "activatingSilentAlarmTraining": "Are staff members trained on when and how to activate silent alarms and the appropriate response procedures to follow?",
        "centralizedMonitoringSystemText": "Is there a centralized monitoring system to receive and respond to silent alarm activations?",
        "monitoringSilentAlarms": "Are designated personnel or security teams tasked with monitoring silent alarms and coordinating response efforts?",
        "verifyingAlarmActivationsProcess": "Is there a process for verifying alarm activations and escalating responses as needed based on the severity of the situation?",
        "integratedSilentAlarms": "Are silent alarms integrated into the overall emergency response plan for the premises?",
        "alarmsTriggeringResponseActions": "Do alarm activations trigger appropriate response actions such as lockdowns, evacuations, or notifications to law enforcement?",
        "silentAlarmSystemsCooedination": "Is there coordination between silent alarm systems and other security measures to ensure a comprehensive and effective emergency response?",
        "purposeAndFunctionTraining": "Are staff members and occupants trained in the purpose and function of silent alarms as part of their emergency preparedness training?",
        "trainingPrograms": "Do training programs include scenarios and simulations to practice activating silent alarms and responding to alarm activations?",
        "effectivenessDrills": "Are there regular drills or exercises conducted to evaluate the effectiveness of silent alarm systems and response procedures?",
        "maintainingRecords": "Are records maintained for all silent alarm activations, including dates, times, locations, and responses?",
        "reviewingRecords": "Are alarm activation records reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?",
        "identifyingDeficiencies": "Are deficiencies or issues identified during alarm testing or response drills addressed promptly, with corrective actions implemented as needed?",
        //LockdownDrills2.js below
        "lockdownEducation": "How are students educated on the purpose and importance of lockdown drills, including the concept of sheltering in place and securing classrooms or designated safe areas during a perceived threat or security incident?",
        "lockdownInstructions": "Are students provided with clear and concise instructions on the specific actions to take during a lockdown, such as moving away from doors and windows, remaining silent, and following teacher or staff directives to maintain safety and minimize visibility to potential threats?",
        "signalRecognition": "Are students trained to recognize the signals or announcements that initiate a lockdown, such as coded alerts, audible alarms, visual cues, or digital notifications, and to differentiate them from other routine announcements or drills?",
        "responsePreparation": "How are students prepared to respond quickly and decisively to lockdown signals, including the importance of taking immediate shelter, staying out of sight, and remaining quiet to avoid drawing attention to their location?",
        "classroomFortification": "What strategies are employed to instruct students on fortifying their classroom or shelter area during a lockdown, such as locking doors, barricading entry points, closing blinds or curtains, and turning off lights or electronic devices to minimize visibility and enhance security?",
        "resourceUtilization": "How are students encouraged to utilize available resources and improvised tools, such as heavy furniture, bookshelves, or classroom supplies, to reinforce doorways, create physical barriers, or shield themselves from potential threats while awaiting further instructions or assistance?",
        "communicationBriefing": "How are students briefed on the importance of communication and cooperation during a lockdown, including the need to remain calm, follow teacher or staff directives, and assist classmates who may require support or reassurance during a stressful situation?",
        "activityReporting": "Are students encouraged to report any suspicious activity, unusual noises, or signs of danger discreetly to designated adults or authorities, using predetermined signals or communication methods to convey information without compromising their safety or alerting potential intruders?",
        "debriefingParticipation": "Are students given the opportunity to participate in debriefing sessions or discussions following lockdown drills, allowing them to share their observations, experiences, and feedback on the effectiveness of lockdown procedures and protocols?",
        "studentInput": "How are student perspectives and insights from lockdown drills incorporated into ongoing safety planning, risk assessments, and emergency preparedness efforts, informing revisions or enhancements to lockdown procedures, communication protocols, or staff training initiatives?",
        "concernsAddressed": "What measures are in place to address any concerns, questions, or misconceptions raised by students during post-drill debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of a real lockdown situation?",
        //LockdownDrills3.js below
        "lockdownDrillFrequency": "How frequently are lockdown drills conducted in the school?",
        "lockdownProcedures": "What are the specific procedures students and staff must follow during a lockdown drill?",
        "lockdownDrillEvaluation": "How are the outcomes of lockdown drills evaluated, and what changes are made based on that evaluation?",
        "lockdownCommunication": "How does the school communicate the lockdown procedures to students, especially new students or those with special needs?",
        "lockdownDrillFeedback": "Are there mechanisms in place for students and parents to provide feedback on the effectiveness of the lockdown drills?",
        //LockdownSignalRecognition.js below
        "Signal Training": "Are occupants trained to recognize the specific signals or alerts used to indicate a lockdown drill?",
        "Distinct Alerts": "Are these signals clearly distinct from other emergency signals or alarms used within the facility?",
        "standardizedMethod": "Is there a standardized method for signaling the start and end of lockdown drills to minimize confusion?",
        "Protocol Established": "Are communication protocols established to inform occupants and staff members about upcoming lockdown drills?",
        "Advance Notice": "Do these protocols include advance notice of drill schedules and procedures to prevent misunderstandings?",
        "multiChannelSystem": "Is there a system in place for disseminating information about drill signals through multiple channels, such as emails, announcements, or signage?",
        "Distinguish Signals": "Are occupants and staff members educated on the importance of distinguishing between drill signals and real threats?",
        "Training Materials": "Are training materials provided to clarify the differences in response actions between drills and actual emergencies?",
        "Drill Practice": "Are drills used as opportunities to reinforce signal recognition skills and practice appropriate responses?",
        "Realistic Scenarios": "Are efforts made to simulate realistic scenarios during lockdown drills, including the use of authentic signals and procedures?",
        "Mimic Challenges": "Are drills designed to mimic the conditions and challenges that occupants may encounter during real lockdown situations?",
        "lockdownFeedbackMechanisms": "Are feedback mechanisms in place to assess the effectiveness of drill simulations in promoting signal recognition?",
        "Feedback Gathered": "Is feedback gathered from occupants and staff members after each lockdown drill to assess signal recognition performance?",
        "Debrief Sessions": "Are debriefing sessions conducted to discuss any confusion or errors in identifying drill signals and provide corrective guidance?",
        "Feedback Improvements": "Are recommendations from feedback and evaluations used to improve signal recognition training and procedures?",
        "Varying Conditions": "Are lockdown drills conducted under varying conditions to test occupants' ability to recognize signals in different contexts?",
        "Unexpected Challenges": "Are drills designed to challenge occupants with unexpected changes or complexities to assess their adaptability and response capabilities?",
        "Procedure Deviations": "Are deviations from standard drill procedures introduced occasionally to gauge occupants' alertness and readiness?",
        "Drill Records": "Are records maintained to document the execution and outcomes of lockdown drills, including observations related to signal recognition?",
        "Periodic Review": "Are drill records reviewed periodically to identify trends or recurring issues in signal recognition performance?",
        "Corrective Actions": "Are corrective actions implemented based on review findings to address deficiencies and enhance signal recognition effectiveness?",

        //MalwareRemovalTools.js below
        "detectionEffectiveness": "How effective are the malware removal tools at detecting various types of malware, including viruses, Trojans, worms, ransomware, and spyware?",
        "quarantineProcess": "What is the process for quarantining suspicious files, and does the tool allow for manual quarantine overrides or adjustments?",
        "scanningOptions": "Are there options for automatic and manual scanning to identify and isolate malicious software in real time or during scheduled scans?",
        "scanningOptionsComment": "Comment (Optional)",
        "removalThoroughness": "How thorough is the malware removal process in eliminating all traces of an infection, including registry entries, temporary files, and hidden components?",
        "removalGuide": "Does the tool provide a step-by-step guide or automated process for safely removing malware without affecting the system's stability or other applications?",
        "complexThreats": "Are there specific tools or capabilities to handle complex or persistent threats, such as rootkits or deeply embedded malware?",
        "userAdminControl": "Can users and administrators configure the level of automated actions versus manual intervention for detected threats?",
        "detailedLogs": "Does the tool provide detailed logs and reports on quarantined and removed malware, including the nature of the threat, affected files, and actions taken?",
        "customPolicies": "Are there customizable policies for different user roles or groups, allowing for varying levels of access and control over malware removal actions?",
        "customPoliciesComment": "Comment (Optional)",
        "integrationWithSecurity": "How well does the malware removal tool integrate with other endpoint security solutions, such as antivirus software, firewalls, and intrusion detection systems?",
        "centralizedManagementIntegration": "Does the tool support integration with centralized management platforms to provide unified monitoring and response across multiple endpoints?",
        "threatDataSharing": "Can the malware removal tool share threat data and removal outcomes with other security systems to enhance overall threat intelligence and response strategies?",
        "updateFrequency": "How frequently are the malware removal tools updated to recognize and effectively deal with the latest threats and malware variants?",
        "autoUpdateProcess": "Is there a process for automatically applying updates to ensure that the tools remain effective against emerging threats?",
        "autoUpdateProcessComment": "Comment (Optional)",
        "feedbackUtilization": "How is user and system feedback utilized to improve the effectiveness and efficiency of the malware removal tools over time?",
        //MedicalFacilities.js below
        "hospitalIdentificationCriteria": "How are nearby hospitals or medical facilities identified and designated as essential resources for providing medical care, treatment, and support services during emergencies or incidents requiring advanced medical intervention?",
        "hospitalAccessibilityCriteria": "What criteria are considered when assessing the proximity, accessibility, and capabilities of medical facilities to respond effectively to various types of emergencies, injuries, or medical emergencies within the community?",
        "medicalCollaborationProtocols": "How do schools collaborate with local hospitals, healthcare providers, and emergency medical services (EMS) to establish coordinated response protocols, communication channels, and mutual aid agreements for managing medical emergencies on school grounds or in the surrounding area?",
        "medicalTrainingExercises": "Are joint training exercises, drills, or simulations conducted regularly to test the interoperability, coordination, and effectiveness of medical response teams, equipment, and procedures during simulated emergencies or mass casualty incidents?",
        "medicalTrainingExercisesComment": "Comment (Optional)",
        "hospitalResourceAvailability": "What resources, equipment, and specialized medical capabilities are available at nearby hospitals or medical facilities to support emergency medical care, trauma management, and patient transport for individuals affected by emergencies or disasters?",
        "medicalContingencyPlans": "Are contingency plans developed to address potential challenges or surges in demand for medical services, such as during large-scale incidents, pandemics, or public health emergencies, and to ensure continuity of care for patients requiring ongoing treatment or specialized interventions?",
        "medicalContingencyPlansComment": "Comment (Optional)",
        "communicationProtocols": "How is communication established and maintained between schools, emergency responders, and medical facilities to facilitate the timely exchange of critical information, patient status updates, and medical resource requests during emergencies or incidents requiring medical intervention?",
        "patientNotificationProtocols": "Are protocols in place for notifying medical facilities of incoming patients, sharing situational awareness, and coordinating medical transport logistics to ensure seamless transitions of care and continuity of treatment for individuals requiring hospitalization or advanced medical care?",
        "patientNotificationProtocolsComment": "Comment (Optional)",
        "communityMedicalEducation": "How are community members, including students, staff, families, and local residents, educated about the availability, location, and capabilities of nearby hospitals or medical facilities to address medical needs and emergencies within the community?",
        "medicalAwarenessOutreach": "Are outreach efforts conducted to raise awareness about the importance of timely access to medical care, the role of medical facilities in emergency response, and strategies for seeking medical assistance during emergencies or health-related crises?",
        "medicalAwarenessOutreachComment": "Comment (Optional)",
        //MentalHealthServices.js below
        "mentalHealthIdentificationCriteria": "How are mental health services, crisis intervention resources, and support networks identified and established as essential resources for addressing mental health needs, psychological trauma, and emotional crises within the community?",
        "mentalHealthAccessibilityCriteria": "What criteria are considered when assessing the availability, accessibility, and suitability of mental health services to meet the diverse needs of individuals, families, and populations affected by emergencies, disasters, or other traumatic events?",
        "mentalHealthCollaboration": "How do schools collaborate with mental health professionals, counseling centers, crisis hotlines, and community-based organizations to provide coordinated and integrated mental health support services to students, staff, families, and community members?",
        "mentalHealthPartnerships": "Are partnerships formed to enhance access to crisis intervention resources, psychological first aid, counseling services, and other evidence-based mental health interventions within the school setting and the broader community?",
        "mentalHealthPartnershipsComment": "Comment (Optional)",
        "crisisResponseProtocols": "What protocols, procedures, and referral mechanisms are in place to facilitate timely access to mental health services, crisis intervention resources, and specialized support for individuals experiencing emotional distress, psychological trauma, or mental health crises during emergencies or critical incidents?",
        "mobileCrisisIntervention": "Are crisis response teams, mobile crisis units, or telehealth platforms utilized to provide immediate assessments, interventions, and follow-up care for individuals in need of mental health support, including students, staff, first responders, and community members?",
        "mobileCrisisInterventionComment": "Comment (Optional)",
        "mentalHealthResourceCoordination": "How are mental health resources, funding, and staffing coordinated and allocated to address the increased demand for mental health services during emergencies, disasters, or other traumatic events affecting the community?",
        "mentalHealthCapacityBuilding": "Are efforts made to build capacity, enhance resilience, and expand the reach of mental health services through training, workforce development, peer support networks, and community partnerships aimed at promoting mental health literacy, awareness, and stigma reduction?",
        "mentalHealthCapacityBuildingComment": "Comment (Optional)",
        "communityMentalHealthEducation": "How are community members informed about the availability, accessibility, and confidentiality of mental health services, crisis intervention resources, and support networks within the community?",
        "mentalHealthAwarenessCampaigns": "Are educational campaigns, workshops, support groups, and community forums organized to raise awareness, provide psychoeducation, and empower individuals to seek help, self-care strategies, and coping skills for managing mental health challenges, stressors, and traumatic experiences?",
        "mentalHealthAwarenessCampaignsComment": "Comment (Optional)",
        //MotionActivatedLights.js below
        "strategicPlacementComment": "Comment (Optional)",
        "strategicPlacement": "Are motion-activated lights strategically placed around the perimeter to provide adequate coverage?",
        "keyAreasIllumination": "Do the lights illuminate key areas susceptible to unauthorized access, such as entry points, blind spots, or areas with limited visibility?",
        "keyAreasIlluminationComment": "Comment (Optional)",
        "insufficientCoverage": "Are there any areas where lighting coverage is insufficient, posing potential security risks?",
        "sensorConfiguration": "Are the motion sensors configured to detect movement effectively within the designated range?",
        "sensorConfigurationComment": "Comment (Optional)",
        "movementDifferentiation": "Do they differentiate between legitimate movement (e.g., personnel patrolling the perimeter) and unauthorized intrusions?",
        "movementDifferentiationComment": "Comment (Optional)",
        "sensorAdjustments": "Are there adjustments or calibration settings available to optimize sensor sensitivity and range based on environmental conditions?",
        "sensorAdjustmentsComment": "Comment (Optional)",
        "lightProgramming": "Are the lights programmed to activate promptly upon detecting motion and remain illuminated for a sufficient duration?",
        "lightProgrammingComment": "Comment (Optional)",
        "timingAdjustments": "Is the timing and duration of light activation adjusted to accommodate varying lighting conditions throughout the day and night?",
        "timingAdjustmentsComment": "Comment (Optional)",
        "customizableSettings": "Are there controls or settings to customize the timing and duration of light activation based on specific security requirements?",
        "customizableSettingsComment": "Comment (Optional)",
        "brightness": "Are the motion-activated lights sufficiently bright to illuminate the surrounding area effectively?",
        "brightnessComment": "Comment (Optional)",
        "visibilityWithoutGlare": "Do they provide clear visibility without causing glare or shadows that could obscure detection of unauthorized activity?",
        "visibilityWithoutGlareComment": "Comment (Optional)",
        "tamperingPrevention": "Are there measures in place to prevent tampering or vandalism of light fixtures to maintain visibility?",
        "tamperingPreventionComment": "Comment (Optional)",
        "integrationSecuritySystems": "Are the motion-activated lights integrated with other security systems, such as surveillance cameras or intrusion detection systems?",
        "integrationSecuritySystemsComment": "Comment (Optional)",
        "triggerAlert": "Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?",
        "triggerAlertComment": "Comment (Optional)",
        "lightingCoordination": "Is there coordination between lighting controls and security personnel to respond to motion activations appropriately?",
        "lightingCoordinationComment": "Comment (Optional)",
        "energyEfficiency": "Are the motion-activated lights energy-efficient, utilizing LED technology or other low-power lighting solutions?",
        "energyEfficiencyComment": "Comment (Optional)",
        "optimizeEnergy": "Are there controls or settings to optimize energy consumption based on usage patterns and security requirements?",
        "optimizeEnergyComment": "Comment (Optional)",
        "monitorEnergy": "Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?",
        "monitorEnergyComment": "Comment (Optional)",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for motion-activated lights?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        //MotionSensors.js below
        "strategicPlacement": "Are the motion sensors strategically placed to detect unauthorized entry points?",
        "strategicPlacementComment": "Comment (Optional)",
        "coverage": "Do they cover all potential entry points, such as doors, windows, and other vulnerable areas?",
        "coverageComment": "Comment (Optional)",
        "blindSpots": "Are there any blind spots or areas where sensor coverage is insufficient?",
        "sensitivityLevel": "Are the motion sensors set to an appropriate sensitivity level to detect unauthorized movement effectively?",
        "sensitivityLevelComment": "Comment (Optional)",
        "falseAlarms": "Have adjustments been made to minimize false alarms caused by environmental factors such as pets, wildlife, or moving objects?",
        "responseTime": "Do the motion sensors respond quickly to detected motion and trigger alarms promptly?",
        "responseTimeComment": "Comment (Optional)",
        "differentiateMechanism": "Is there a mechanism in place to differentiate between normal activity and suspicious movements to minimize false alarms?",
        "differentiateMechanismComment": "Comment (Optional)",
        "alarmTransmission": "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?",
        "alarmTransmissionComment": "Comment (Optional)",
        "systemIntegration": "Are the motion sensors integrated with the overall intrusion alarm system?",
        "systemIntegrationComment": "Comment (Optional)",
        "seamlessCommunication": "Do they communicate seamlessly with alarm control panels and monitoring stations?",
        "seamlessCommunicationComment": "Comment (Optional)",
        "coordinationAlarmDevices": "Is there coordination between motion sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?",
        "coordinationAlarmDevicesComment": "Comment (Optional)",
        "remoteAccess": "Is there remote access and monitoring functionality for the motion sensors?",
        "remoteAccessComment": "Comment (Optional)",
        "remoteAdjustments": "Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?",
        "remoteAdjustmentsComment": "Comment (Optional)",
        "secureAuthentication": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?",
        "secureAuthenticationComment": "Comment (Optional)",
        "environmentDurability": "Are the motion sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?",
        "environmentDurabilityComment": "Comment (Optional)",
        "materialDurability": "Are they constructed from durable materials capable of withstanding outdoor conditions if installed in exterior locations?",
        "materialDurabilityComment": "Comment (Optional)",
        "sensorCertification": "Have the sensors undergone testing or certification to verify reliability and durability?",
        "sensorCertificationComment": "Comment (Optional)",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the motion sensors?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor lenses, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        //MultiFactorAuthenticationAwareness.js below
        "authenticationFactors": "What types of authentication factors are used in MFA (e.g., SMS codes, biometrics, authenticator apps)?",
        "preveentingUnauthorizedAccess": "How is the importance of MFA communicated to users to prevent unauthorized access?",
        "MFAChallenges": "What challenges do users face when enabling MFA, and how can these be addressed?",
        "MFAMandatorySituations": "In what situations is MFA mandatory, and how is it enforced within the organization?",
        "backupMethods": "How are backup methods (e.g., recovery codes) provided in case primary authentication methods fail?",
        //MutualAidAgreements.js below
        "mutualAidAgreementTerms": "What specific terms are included in the mutual aid agreements with local fire departments?",
        "reviewedMutualAidAgreements": "How often are the mutual aid agreements reviewed and updated to reflect current needs and capabilities?",
        "protocolsActivatingMutualAid": "What protocols are in place to activate mutual aid during a large-scale emergency?",
        "facilitatedCommunication": "How is communication facilitated between schools and fire departments during an emergency requiring mutual aid?",
        "conductingDrills": "What training or drills are conducted to ensure all parties understand the mutual aid agreement and their respective roles?",
        //NetworkAnomalyDetection.js below
        "idsDetectionTypes": "What types of network anomalies are the Intrusion Detection Systems (IDS) configured to detect (e.g., unusual traffic volume, protocol misuse, unauthorized port access)?",
        "baselinePatterns": "How are baseline traffic patterns established for anomaly detection, and what criteria are used to define what constitutes \"normal\" network behavior?",
        "alertTime": "How quickly can the IDS detect and alert on abnormal traffic patterns, and what is the average time from detection to alert generation?",
        "customizableParameters": "Are the anomaly detection parameters customizable to fit the specific needs of the organization, such as different thresholds for various network segments or user groups?",
        "customizableParametersComment": "Comment (Optional)",
        "updateFrequency": "How often are detection algorithms and rules updated to adapt to new types of network threats or changes in network architecture?",
        "mlAiFlexibility": "Is there flexibility in the IDS to incorporate machine learning or artificial intelligence to improve detection accuracy over time?",
        "mlAiFlexibilityComment": "Comment (Optional)",
        "alertResponseProcess": "What is the process for responding to alerts generated by the IDS, and who is responsible for managing these alerts (e.g., network security team, IT operations)?",
        "alertPrioritization": "Are alerts prioritized based on the severity of the anomaly or the potential impact on the network, and how is this prioritization determined?",
        "falsePositives": "How are false positives minimized to prevent alert fatigue, and what measures are in place to ensure critical alerts are not missed?",
        "integrationWithTools": "How well does the IDS integrate with other security tools and systems, such as firewalls, SIEM (Security Information and Event Management) systems, and antivirus software?",
         "compatibilityIssues": "Are there any compatibility issues when deploying IDS across different network environments (e.g., cloud-based networks, on-premises infrastructure)?",
         "dataUsage": "How is data from the IDS used in conjunction with other security tools to provide a comprehensive view of network security?",
        "testingFrequency": "How frequently is the effectiveness of the IDS tested, and what methods are used for testing (e.g., simulated attacks, penetration testing, red teaming)?",
        "performanceReview": "Is there a regular review process for the performance of the IDS, including an assessment of its ability to detect new or evolving threats?",
        "feedbackIncorporation": "How is feedback from testing and real-world incidents used to refine and improve the IDS's anomaly detection capabilities?",
        //OffsiteBackupStorage.js below
        "criteriaForSelection": "What criteria are used to select offsite backup storage locations, such as cloud providers or physical sites, to ensure data security and accessibility?",
        "securityOfLocation": "How is the security of the offsite backup location maintained, including physical security measures and data encryption protocols?",
        "auditsOfStorage": "Are there regular audits or assessments of the offsite storage location to ensure compliance with security standards and policies?",
        "auditsOfStorageComment": "Comment (Optional)",
        "dataTransferMethods": "What methods are used to securely transfer backup data to the offsite location, and are these methods protected against data interception or breaches?",
        "dataEncryption": "Is the data encrypted during transfer and storage, and what encryption standards are applied (e.g., AES-256)?",
        "dataEncryptionComment": "Comment (Optional)",
        "keyManagement": "How are encryption keys managed, and who has access to these keys to ensure data can be securely accessed when needed?",
        "recoveryTime": "How quickly can data be retrieved from the offsite backup location in the event of a disaster or data loss incident?",
        "recoveryObjectives": "Are there clear recovery time objectives (RTOs) established for accessing and restoring data from offsite backups?",
        "recoveryObjectivesComment": "Comment (Optional)",
        "dataIntegrity": "What procedures are in place to ensure data integrity and completeness when backups are restored from offsite storage?",
        "redundancy": "Is there redundancy in the offsite backup storage solutions, such as multiple cloud providers or geographically distributed storage sites, to mitigate risk?",
        "redundancyComment": "Comment (Optional)",
        "geographicDistribution": "How are backups distributed geographically to prevent data loss due to regional disasters or outages at a single location?",
        "latencyConsiderations": "Are backup locations chosen to minimize latency and maximize data recovery speeds for the organization's primary operational regions?",
        "compliance": "How does the offsite backup storage solution comply with legal and regulatory requirements for data protection, privacy, and data sovereignty (e.g., GDPR, HIPAA)?",
        "contractualAgreements": "Are there specific contractual agreements in place with the cloud provider or offsite storage facility regarding data protection, access controls, and compliance standards?",
        "contractualAgreementsComment": "Comment (Optional)",
        "crossBorderCompliance": "What measures are taken to ensure that data stored offsite does not violate any cross-border data transfer regulations or data residency requirements?",
        "monitoringTools": "What monitoring tools or systems are in place to track the status and health of offsite backups to ensure they are successfully completed and stored?",
        "alerts": "Are there automated alerts or notifications for issues related to offsite backup storage, such as failed backups or storage capacity limits?",
        "alertsComment": "Comment (Optional)",
        "performanceMetrics": "How is backup performance reported, and what metrics are used to evaluate the effectiveness and reliability of offsite storage?",
        "costManagement": "How is the cost of offsite backup storage managed, and what pricing models are in place (e.g., pay-as-you-go, fixed rate)?",
        "scalability": "Are there scalability options to increase storage capacity as needed, and how does this impact the cost and management of offsite backups?",
        "scalabilityComment": "Comment (Optional)",
        "costOptimization": "What measures are in place to regularly review and optimize the cost-effectiveness of offsite backup storage solutions?",
        //OnSiteGuards.js below
        "guardsStationed": "Are security guards stationed at designated entrances during all operational hours?",
        "guardsStationedComment": "Comment (Optional)",
        "continuousCoverage": "Is there continuous coverage to ensure that entrances are monitored at all times?",
        "continuousCoverageComment": "Comment (Optional)",
        "backupPersonnel": "Are there backup personnel or procedures in place to cover breaks or emergencies?",
        "backupPersonnelComment": "Comment (Optional)",
        "trainingSecurityProcedures": "Are stationed guards properly trained in security procedures, emergency response protocols, and customer service?",
        "trainingSecurityProceduresComment": "Comment (Optional)",
        "certifications": "Do they possess necessary certifications or licenses required for security personnel?",
        "certificationsComment": "Comment (Optional)",
        "conflictResolution": "Are guards trained in conflict resolution techniques to handle various situations professionally and effectively?",
        "conflictResolutionComment": "Comment (Optional)",
        "monitorEntrances": "Do stationed guards actively monitor entrances for unauthorized access, suspicious behavior, or security breaches?",
        "monitorEntrancesComment": "Comment (Optional)",
        "recognizeThreats": "Are they trained to recognize and respond to potential threats, including individuals attempting to bypass security measures?",
        "recognizeThreatsComment": "Comment (Optional)",
        "communicationDevices": "Are guards equipped with communication devices to alert response teams or authorities in case of emergencies?",
        "communicationDevicesComment": "Comment (Optional)",
        "enforceAccessControl": "Do stationed guards enforce access control policies, verifying credentials and authorizing entry for authorized personnel?",
        "enforceAccessControlComment": "Comment (Optional)",
        "challengeUnauthorized": "Are they trained to challenge individuals without proper identification or authorization?",
        "challengeUnauthorizedComment": "Comment (Optional)",
        "inspectionConduct": "Do guards conduct thorough inspections of bags, packages, or vehicles entering the premises?",
        "inspectionConductComment": "Comment (Optional)",
        "assistCustomers": "Are stationed guards trained to provide assistance to visitors, employees, and contractors entering the premises?",
        "assistCustomersComment": "Comment (Optional)",
        "professionalGreeting": "Do they greet individuals in a professional and courteous manner while maintaining security awareness?",
        "professionalGreetingComment": "Comment (Optional)",
        "handleInquiries": "Are guards trained to handle inquiries, provide directions, and offer assistance as needed?",
        "handleInquiriesComment": "Comment (Optional)",
        "emergencyResponse": "Are stationed guards trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?",
        "emergencyResponseComment": "Comment (Optional)",
        "knowEvacuation": "Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?",
        "knowEvacuationComment": "Comment (Optional)",
        "firstAid": "Are guards equipped with necessary first aid supplies or emergency response equipment?",
        "firstAidComment": "Comment (Optional)",
        "effectiveCommunication": "Is there effective communication between stationed guards and other security personnel, as well as with management and staff?",
        "effectiveCommunicationComment": "Comment (Optional)",
        "coordinateResponse": "Are guards trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?",
        "coordinateResponseComment": "Comment (Optional)",
        "centralizedCommunication": "Is there a centralized communication system or protocol for relaying information and coordinating responses?",
        "centralizedCommunicationComment": "Comment (Optional)",
        //ParentAdvisoryCommittees.js below
        "committeeFormationAndComposition": "How are parent advisory committees established, structured, and maintained within the school or educational institution?",
        "selectionCriteriaForRepresentatives": "What criteria are used to select parent representatives for advisory committees, and how are they chosen to ensure diverse perspectives, expertise, and representation?",
        "committeeInclusiveness": "Are parent advisory committees inclusive and reflective of the demographics, backgrounds, and interests of the school community?",
        "committeeInclusivenessComment": "Comment (Optional)",
        "committeeRolesAndMandates": "What specific roles, responsibilities, and mandates are assigned to parent advisory committees, particularly regarding their involvement in emergency planning and safety initiatives?",
        "committeeContributionsToPlans": "How do advisory committees contribute to the development, review, and refinement of emergency plans, protocols, policies, or procedures within the school or educational institution?",
        "committeeEmpowerment": "Are advisory committees empowered to provide input, feedback, recommendations, or alternative perspectives on emergency preparedness and safety-related matters?",
        "committeeEmpowermentComment": "Comment (Optional)",
        "committeeEngagementWithLeadership": "How do parent advisory committees engage with school leadership, administrators, safety personnel, and other stakeholders to facilitate open communication, collaboration, and transparency?",
        "feedbackMechanismsForCommittees": "What mechanisms or channels are in place to solicit feedback, concerns, suggestions, or insights from parent advisory committees regarding emergency plans, safety measures, or school policies?",
        "committeeMeetingFrequency": "Are advisory committee meetings, forums, or discussions conducted regularly and inclusively to encourage participation, dialogue, and consensus-building among members?",
        "committeeMeetingFrequencyComment": "Comment (Optional)",
        "feedbackUtilizationBySchool": "How does the school administration or leadership utilize feedback and recommendations from parent advisory committees to inform decision-making, policy development, or improvements in emergency preparedness and safety?",
        "reviewAndRevisionProcess": "Is there a structured process or timeline for reviewing, revising, and updating emergency plans, protocols, or procedures based on input from advisory committees and other stakeholders?",
        "transparencyInOutcomes": "Are outcomes, actions, or changes resulting from advisory committee input communicated transparently and effectively to the school community to demonstrate accountability and responsiveness?",
        "transparencyInOutcomesComment": "Comment (Optional)",
        "orientationAndTrainingForCommittees": "Are members of parent advisory committees provided with orientation, training, or resources to enhance their understanding of emergency planning principles, safety protocols, and relevant school policies?",
        "orientationAndTrainingForCommitteesComment": "Comment (Optional)",
        "capacityBuildingSupport": "How does the school administration support the capacity building and professional development of advisory committee members to empower them as informed and effective contributors to safety initiatives?",
        "externalCollaborationOpportunities": "Are opportunities available for advisory committee members to collaborate with external experts, attend workshops or conferences, or participate in relevant training sessions to broaden their knowledge and expertise in emergency preparedness and safety?",
        "externalCollaborationOpportunitiesComment": "Comment (Optional)",
        //ParentChaperonesForFieldTrips.js
        "parentChaperonesRequirements": "What requirements must parent chaperones meet before being allowed to accompany students on field trips?",
        "parentChaperonesTraining": "How are parent chaperones trained on emergency procedures and student safety protocols during field trips?",
        "parentChaperonesResponsibilities": "What responsibilities do parent chaperones have in ensuring the safety and well-being of students while on outings?",
        "teacherParentChaperonesCommunication": "How is communication between teachers and parent chaperones handled before, during, and after field trips?",
        "reportingProcess": "What process is in place for parents to report any safety concerns they observe during field trips?",
        //ParentFeedbackMechanisms.js below
        "feedbackMechanismsDescription": "What mechanisms or channels are available for parents to provide feedback on school safety, emergency preparedness, and communication processes?",
        "feedbackMethodsDiversity": "Are feedback collection methods diversified to accommodate various preferences and communication styles of parents, such as surveys, suggestion boxes, town hall meetings, or online forums?",
        "feedbackMethodsDiversityComment": "Comment (Optional)",
        "feedbackFrequency": "How frequently are opportunities for providing feedback offered to parents, and are they accessible and convenient for all members of the school community?",
        "surveyDesignDescription": "How are surveys designed, developed, and administered to solicit feedback from parents regarding their perceptions, experiences, and suggestions related to school safety and emergency communication?",
        "surveyQuestionsStructure": "Are survey questions structured to capture key aspects of safety concerns, emergency responsiveness, communication effectiveness, and overall satisfaction with school safety measures?",
        "surveyQuestionsStructureComment": "Comment (Optional)",
        "surveyParticipationStrategies": "What strategies are employed to encourage participation, increase response rates, and ensure representative sampling in parent feedback surveys?",
        "dataAnalysisMethods": "How is feedback data collected from parents analyzed, synthesized, and interpreted to identify trends, patterns, or recurring themes relevant to school safety and emergency communication?",
        "feedbackDisaggregation": "Are mechanisms in place to disaggregate feedback by demographic factors, such as grade level, language proficiency, or parental involvement, to ensure equitable representation and address diverse perspectives?",
        "feedbackDisaggregationComment": "Comment (Optional)",
        "feedbackInsightsTools": "What tools, software, or methodologies are utilized to extract actionable insights from parent feedback and inform decision-making processes related to school safety initiatives and communication strategies?",
         "adminFeedbackResponse": "How does the school administration or leadership respond to feedback received from parents regarding school safety concerns, emergency preparedness, or communication challenges?",
        "feedbackFollowupProtocols": "Are protocols established to acknowledge receipt of feedback, communicate follow-up actions, and provide updates or resolutions to address parent concerns in a timely and transparent manner?",
        "accountabilityMeasures": "What measures are taken to demonstrate accountability, responsiveness, and continuous improvement in school safety practices and communication efforts based on parent feedback?",
        "parentCollaborationOpportunities": "Are opportunities provided for parents to participate in collaborative discussions, focus groups, or advisory committees aimed at reviewing feedback data, prioritizing safety initiatives, and co-creating solutions?",
        "parentCollaborationOpportunitiesComment": "Comment (Optional)",
        "communicationCulture": "How does the school foster a culture of open communication, trust, and partnership with parents by actively seeking their input, valuing their perspectives, and integrating their feedback into decision-making processes?",
        "integratedFeedbackMechanisms": "Are feedback mechanisms integrated into broader efforts to engage parents as active partners in promoting school safety, fostering community resilience, and enhancing emergency preparedness within the school community?",
        //ParentInvolvement2.js
        "parentalCommunication": "How are parents informed about the emergency procedures and protocols established by the school or educational institution?",
        "parentWorkshops": "Are information sessions or workshops organized specifically to educate parents about emergency preparedness and response?",
        "parentWorkshopsComment": "Comment (Optional)",
        "sessionTopics": "What topics are covered during these information sessions, and how are they tailored to meet the informational needs and concerns of parents?",
        "parentEngagement": "Are opportunities provided for parents to ask questions, seek clarification, or express their opinions and feedback regarding emergency procedures?",
        "parentEngagementComment": "Comment (Optional)",
        "communicationChannels": "What communication channels are used to disseminate information about emergency procedures to parents?",
        "writtenCommunication": "Are newsletters, emails, or other forms of written communication regularly sent to parents to provide updates and reminders about emergency preparedness?",
        "writtenCommunicationComment": "Comment (Optional)",
        "onlineCommunication": "How are social media platforms or school websites utilized to share relevant information and resources with parents regarding emergency procedures?",
        "notificationSystems": "Are emergency notification systems in place to alert parents in real-time about critical incidents or urgent situations affecting the school community?",
        "parentalResources": "Are educational materials or resources provided to parents to support their understanding of emergency procedures and their role in supporting their children's preparedness?",
        "parentalResourcesComment": "Comment (Optional)",
        "resourceAvailability": "What types of resources are available to parents, such as pamphlets, handouts, or online guides, and how accessible are they?",
        "homeDiscussionGuidance": "Are parents encouraged to review and discuss emergency procedures with their children at home, and are guidance materials provided to facilitate these discussions?",
        "homeDiscussionGuidanceComment": "Comment (Optional)",
        "homeReinforcement": "How are parents encouraged to reinforce emergency preparedness concepts and skills learned at school within the home environment?",
        "parentFeedback": "Are mechanisms in place to solicit feedback from parents regarding their understanding of emergency procedures and their perceived effectiveness?",
        "parentConcerns": "How are parent perspectives and concerns regarding emergency preparedness considered and addressed by school administrators and staff?",
        "parentInvolvement": "Are parents invited to participate in planning committees, advisory groups, or other forums focused on emergency preparedness and safety?",
        "parentInvolvementComment": "Comment (Optional)",
        "ongoingCollaboration": "What measures are taken to foster ongoing engagement and collaboration between parents and school stakeholders in enhancing emergency preparedness efforts?",
        "parentParticipation": "Are parents encouraged or invited to participate in emergency drills and exercises conducted by the school or educational institution?",
        "parentParticipationComment": "Comment (Optional)",
        "drillCommunication": "How are parents informed about upcoming drills and exercises, and what instructions or expectations are provided to them regarding their involvement?",
        "parentalObservation": "Are opportunities provided for parents to observe or volunteer during emergency drills to gain firsthand experience and understanding of school emergency procedures?",
        "parentalObservationComment": "Comment (Optional)",
        "feedbackMechanisms": "What feedback mechanisms are in place to gather input from parents about their observations and experiences during emergency drills?",
        //ParentNotificationProcedures.js
        "scanningOptions": "Are formal procedures established for notifying parents/guardians during emergencies or critical incidents?",
        "scanningOptionsComment": "Comment (Optional)",
        "NotificationTechMethods": "Do notification procedures include the use of automated messaging systems or other technology-enabled methods for rapid communication?",
        "NotificationTechMethodsComment": "Comment (Optional)",
        "AutomatedMessagingImplementation": "Is an automated messaging system implemented to facilitate timely and efficient communication with parents/guardians?",
        "AutomatedMessagingImplementationComment": "Comment (Optional)",
        "MultichannelNotificationCapability": "Does the automated messaging system have the capability to send notifications via various channels such as phone calls, text messages, emails, or mobile apps?",
        "MultichannelNotificationCapabilityComment": "Comment (Optional)",
        "StandardizedEmergencyTemplates": "Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?",
        "StandardizedEmergencyTemplatesComment": "Comment (Optional)",
        "TemplateEssentialInfo": "Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?",
        "TemplateEssentialInfoComment": "Comment (Optional)",
        "ClearEmergencyScripts": "Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?",
        "ClearEmergencyScriptsComment": "Comment (Optional)",
        "AvoidJargonInScripts": "Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?",
        "AvoidJargonInScriptsComment": "Comment (Optional)",
        "RedundantCommunicationChannels": "Are multiple communication channels utilized to ensure redundancy and reach a broad audience of parents/guardians?",
        "RedundantCommunicationChannelsComment": "Comment (Optional)",
        "ChannelPrioritizationScheme": "Is there a prioritization scheme for selecting communication channels based on factors such as urgency, audience preferences, and accessibility?",
        "ChannelPrioritizationSchemeComment": "Comment (Optional)",
        "ParentContactDatabase": "Is parent contact information maintained in a centralized database or system, and is it regularly updated to ensure accuracy?",
        "ParentContactDatabaseComment": "Comment (Optional)",
        "SystemIntegrationProcess": "Is there integration between the automated messaging system and parent contact databases to streamline the notification process?",
        "SystemIntegrationProcessComment": "Comment (Optional)",
        "NotificationTestingSchedule": "Are notification procedures tested and verified periodically to assess their effectiveness and reliability?",
        "NotificationTestingScheduleComment": "Comment (Optional)",
        "TestScenarioEvaluation": "Are test scenarios conducted to simulate emergency situations and evaluate the responsiveness and performance of the automated messaging system?",
        "TestScenarioEvaluationComment": "Comment (Optional)",
        "ParentFeedbackMechanisms": "Are feedback mechanisms in place to solicit input from parents regarding the clarity, timeliness, and usefulness of emergency notifications?",
        "ParentFeedbackMechanismsComment": "Comment (Optional)",
        "ProcedureRefinementFeedback": "Are recommendations from feedback evaluations used to refine notification procedures and improve their efficacy in future emergency situations?",
        "ProcedureRefinementFeedbackComment": "Comment (Optional)",
        //ParentTeacherAssociations.js
        "ptaStructureAndOperation": "How is the parent-teacher association (PTA) or similar organization structured, governed, and operated within the school or educational institution?",
        "ptaRolesAndResponsibilities": "What roles and responsibilities do PTA members fulfill in facilitating communication, collaboration, and engagement between parents, teachers, administrators, and other stakeholders?",
        "ptaInclusivityAndAccessibility": "Are PTA meetings, events, or activities inclusive and accessible to all parents, regardless of background, language, or socio-economic status?",
        "ptaInclusivityAndAccessibilityComment": "Comment (Optional)",
        "ptaInformationDissemination": "How does the PTA disseminate important information, updates, announcements, or resources related to school safety, emergency preparedness, and other relevant topics to parents?",
        "ptaCommunicationChannels": "What communication channels, platforms, or strategies are utilized by the PTA to reach a broad audience of parents and ensure timely and effective communication?",
        "ptaEffortsToEngageParents": "Are efforts made to engage parents who may face barriers to communication, such as language barriers, limited access to technology, or lack of familiarity with school processes?",
        "ptaCollaborationWithLeadership": "How does the PTA collaborate with school leadership, administrators, or safety personnel to support and enhance communication efforts related to school safety and emergency preparedness?",
        "ptaSuccessfulPartnerships": "Can you provide examples of successful partnerships or joint initiatives between the PTA and school stakeholders in promoting safety awareness, organizing informational sessions, or addressing parent concerns?",
        "ptaContributionToCommunicationStrategies": "In what ways does the PTA contribute to the development, implementation, or evaluation of parent communication strategies and policies within the school community?",
        "ptaEngagementEvents": "What types of events, workshops, or activities does the PTA organize to engage parents in discussions, workshops, or training sessions related to school safety and emergency preparedness?",
        "ptaLeveragingResources": "How does the PTA leverage its resources, networks, and expertise to create opportunities for parents to learn, collaborate, and share experiences with each other regarding safety concerns or best practices?",
        "ptaEventDesign": "Are PTA-sponsored events designed to accommodate diverse preferences, interests, and schedules of parents to maximize participation and engagement?",
        "ptaEventDesignComment": "Comment (Optional)",
        "ptaFeedbackSolicitation": "How does the PTA solicit feedback, suggestions, concerns, or input from parents regarding school safety, emergency planning, or other relevant issues?",
        "ptaAnonymousFeedbackMechanisms": "Are mechanisms in place for parents to provide feedback anonymously, confidentially, or through designated representatives to ensure open and honest communication?",
        "ptaFeedbackUtilization": "How does the PTA utilize feedback from parents to advocate for improvements, advocate for changes, or address emerging safety challenges within the school community?",
        //ParentTeacherConferences.js
        "parentTeacherConferencesFrequency": "How often are parent-teacher conferences held to discuss student safety and well-being?",
        "specificSafetyTopics": "What specific safety topics are typically addressed during these conferences?",
        "informedParentsAboutSafety": "How are parents informed about the importance of discussing safety concerns during these meetings?",
        "providedResources": "Are there resources or handouts provided to parents during conferences to help them understand school safety policies?",
        "providedResourcesComment": "Comment (Optional)",
        "safetyDiscussionFollowUp": "How do teachers and staff follow up on safety discussions that occur during parent-teacher conferences?",
        //ParentVolunteePrograms.js
        "programStructureAndOrganization": "How are parent volunteer programs, particularly those focused on emergency response or safety, structured and organized within the school or educational institution?",
        "rolesAndResponsibilities": "What roles and responsibilities do parent volunteers assume within emergency response teams or safety committees, and how are these roles defined and communicated?",
        "programsIntegratedWithPlans": "Are parent volunteer programs integrated into broader school safety plans, emergency protocols, or community engagement strategies?",
        "programsIntegratedWithPlansComment": "Comment (Optional)",
        "parentRecruitmentProcess": "How are parents recruited or solicited to participate in volunteer programs related to emergency response or safety initiatives?",
        "selectionCriteriaForVolunteers": "What criteria or qualifications are used to select parent volunteers for specific roles or responsibilities, such as training, availability, skills, or expertise?",
        "volunteerTrainingProvided": "Are parent volunteers provided with training, orientation, or resources to prepare them for their roles and responsibilities within emergency response teams or safety committees?",
        "volunteerTrainingProvidedComment": "Comment (Optional)",
        "collaborationWithStaff": "How do parent volunteer programs collaborate with school staff, administrators, or safety personnel to support and enhance school safety efforts?",
        "successfulPartnershipsExamples": "Can you provide examples of successful partnerships or joint initiatives between parent volunteer programs and school stakeholders in addressing safety concerns, implementing safety protocols, or organizing emergency drills?",
        "volunteerContributionsToSafety": "In what ways do parent volunteers contribute to the development, implementation, or evaluation of school safety policies, procedures, or initiatives?",
        "specificRolesInEmergencies": "What specific roles or functions do parent volunteers fulfill within emergency response teams or safety committees during various types of emergencies or crisis situations?",
        "volunteerEmergencyTraining": "How are parent volunteers trained and prepared to effectively respond to emergencies, assist with evacuation procedures, provide first aid support, or facilitate communication and coordination efforts?",
        "integrationWithEmergencyPlans": "Are parent volunteers integrated into broader emergency response plans, incident command structures, or communication protocols to ensure a coordinated and effective response?",
        "integrationWithEmergencyPlansComment": "Comment (Optional)",
        "communityEngagementEfforts": "How do parent volunteer programs engage with the broader school community, parents, local organizations, or stakeholders to raise awareness and garner support for safety initiatives?",
        "collaborativeProjectsExamples": "Can you provide examples of collaborative projects, events, or campaigns led by parent volunteers that have extended the reach and impact of safety education beyond the school campus?",
        "volunteersMobilizingCommunity": "In what ways do parent volunteers leverage their networks, expertise, or resources to mobilize collective action, build community resilience, and foster a culture of safety within the school community?",
        //ParentWorkshopsOnStudentSafety.js
        "parentWorkshopsTopics": "What topics are covered in parent workshops focused on student safety?",
        "parentsParticipatingInWorkshops": "How are parents encouraged to participate in these workshops, and what methods are used to promote attendance?",
        "questionOpportunities": "Are there opportunities for parents to ask questions or share concerns during the workshops?",
        "questionOpportunitiesComment": "Comment (Optional)",
        "workshopEvaluatedEffectiveness": "How is the effectiveness of these workshops evaluated in terms of improving parents' understanding of student safety?",
        "resourcesProvided": "What resources or materials are provided to parents during these workshops to help them implement safety measures at home?",
        //PasswordComplexityRequirements.js
        "employeeAwareness": "Are all employees aware of the organization's password complexity requirements, including the minimum length and the use of special characters?",
        "employeeAwarenessComment": "Comment (Optional)",
        "reminderFrequency": "How frequently are employees reminded of the password complexity policy, and through what channels (e.g., email, training sessions, policy documents)?",
        "trainingMaterials": "Are there educational materials or training sessions provided to help employees understand the importance of using complex passwords?",
        "enforcementMeasures": "What measures are in place to enforce compliance with password complexity requirements across all systems and applications?",
        "complianceMonitoring": "How is compliance with password complexity requirements monitored and reported?",
        "regularAudits": "Are there regular audits or checks to ensure that employees are adhering to password complexity guidelines?",
        "regularAuditsComment": "Comment (Optional)",
        "evaluateEffectiveness": "How does the organization evaluate the effectiveness of password complexity requirements in preventing unauthorized access or breaches?",
        "documentedIncidents": "Are there any documented incidents where weak passwords, despite the policy, led to security breaches? If so, what actions were taken to address the gaps?",
        "reviewFrequency": "How frequently does the organization review and update its password complexity requirements to respond to emerging security threats?",
        "userFriendliness": "Are the password complexity requirements user-friendly, or do they lead to difficulties in remembering passwords or frequent reset requests?",
        "balanceComplexity": "How does the organization balance strong password complexity with usability to avoid negative impacts on employee productivity?",
        "passwordTools": "Are there guidelines or tools provided to help employees create and remember complex passwords (e.g., password managers, mnemonic techniques)?",
        "integrationSecurity": "How do password complexity requirements integrate with other security measures, such as two-factor authentication (2FA) or single sign-on (SSO)?",
        "authGuidelines": "Are there specific guidelines for password complexity when used in conjunction with other authentication methods to enhance overall security?",
        "passphraseEncourage": "Does the organization encourage or require the use of passphrases (longer sequences of words) in addition to traditional complex passwords?",
        "feedbackProcess": "Is there a process for employees to provide feedback on the password complexity requirements, particularly if they encounter issues?",
        "feedbackProcessComment": "Comment (Optional)",
        "feedbackUse": "How is employee feedback used to adjust password policies to better meet security needs without creating undue burden?",
        "policyReview": "Are there periodic reviews of the password complexity policy to ensure it remains effective against evolving cyber threats?",
        "employeeTraining": "Are employees provided with training on how to create strong, memorable passwords that meet complexity requirements?",
        "employeeTrainingComment": "Comment (Optional)",
        "transitionSupport": "How does the organization support employees in transitioning to more complex passwords (e.g., phased implementation, support from IT)?",
        "assistanceResources": "Are there resources available for employees who need assistance or have questions about creating or managing complex passwords?",
        //PasswordExpirationPolicies.js
        "employeeAwareness": "Are all employees aware of the password expiration policy, including how often passwords must be changed?",
        "employeeAwarenessComment": "Comment (Optional)",
        
        "policyCommunication": "How is the password expiration policy communicated to new employees during onboarding and existing employees as policies update?",
        
        "automatedReminders": "Are there automated reminders or notifications in place to alert employees when their passwords are nearing expiration?",
        "automatedRemindersComment": "Comment (Optional)",
        "enforcementMechanisms": "What mechanisms are in place to enforce password expiration policies across all organizational systems and applications?",
        "nonComplianceConsequences": "Are there consequences for non-compliance with password expiration policies, and if so, what are they?",
        "complianceMonitoring": "How does the organization monitor compliance with password expiration policies, and are there reports generated for IT or security teams?",
        "policyEffectiveness": "How does the organization assess the effectiveness of password expiration policies in reducing the risk of unauthorized access or security breaches?",
        "impactMetrics": "Are there metrics or key performance indicators (KPIs) used to evaluate the impact of regular password changes on overall cybersecurity?",
        "incidentResponse": "Has the organization experienced any security incidents that were attributed to expired or unchanged passwords? What measures were taken in response?",
        "employeePerception": "How do employees perceive the password expiration policy in terms of convenience and practicality? Does it lead to frequent reset requests or difficulties?",
        "supportMechanisms": "Are there any support mechanisms in place (e.g., IT helpdesk) to assist employees who have trouble complying with password expiration policies?",
        "securityBalance": "How does the organization balance the need for security through regular password changes with the potential burden on employees?",
        "policyIntegration": "How do password expiration policies integrate with other security measures, such as multi-factor authentication (MFA) or single sign-on (SSO) systems?",
        "authGuidelines": "Are there specific guidelines or recommendations for password changes when other authentication methods are in use to enhance overall security?",
        "additionalSecurity": "Does the organization encourage or require additional security measures, such as MFA, when a password has expired or been recently changed?",
        "policyReviewFrequency": "How often does the organization review and update its password expiration policies to align with industry best practices and emerging security threats?",
        "feedbackProcess": "Is there a process for collecting and incorporating feedback from employees on the password expiration policy to improve its effectiveness and user-friendliness?",
        "policyAdjustments": "Are adjustments to the policy made based on technological advancements or changes in the threat landscape?",
        "employeeTraining": "Are employees provided with training on the importance of regular password changes and how to manage them effectively?",
        "employeeTrainingComment": "Comment (Optional)",
        "multiSystemSupport": "How does the organization support employees in adhering to the password expiration policy, especially those with access to multiple systems?",
        "passwordManagementTools": "Are there resources or tools available to help employees manage their passwords more efficiently, such as password managers?",
        //PasswordSecurity2.js
        "passwordCreationTraining": "Are staff members trained on best practices for creating strong, complex passwords that are resistant to dictionary attacks, brute-force attempts, and other common password cracking techniques?",
        "passwordCreationTrainingComment": "Comment (Optional)",
        "passwordSelectionGuidelines": "What specific guidelines or criteria are provided to staff members for selecting secure passwords, such as minimum length requirements, the use of a combination of uppercase and lowercase letters, numbers, and special characters, and avoidance of easily guessable or commonly used phrases?",
        "passwordEducationOnReuse": "How are staff members educated on the importance of selecting unique passwords for each account or system, avoiding password reuse across multiple platforms, and regularly updating passwords to mitigate the risk of unauthorized access due to credential compromise?",
        "passwordManagementToolsIntroduction": "Are staff members introduced to password management tools or utilities designed to facilitate the generation, storage, and retrieval of strong, complex passwords across multiple accounts or devices securely?",
        "passwordManagementToolsIntroductionComment": "Comment (Optional)",
        "passwordManagementTrainingResources": "What training resources or instructional materials are provided to staff members to familiarize them with the features and functionality of password management solutions, including password generation, encryption, synchronization, and multi-factor authentication capabilities?",
        "passwordManagementBestPractices": "How are staff members encouraged to incorporate password management best practices into their daily workflows, such as using passphrase-based authentication, enabling two-factor authentication (2FA), or implementing biometric authentication methods where available?",
        "passwordHygieneEducation": "Are staff members educated on the importance of practicing good password hygiene, including avoiding common pitfalls such as sharing passwords with others, writing down passwords on physical or digital notes, or storing passwords in easily accessible locations?",
        "passwordHygieneEducationComment": "Comment (Optional)",
        "passwordStorageProtocols": "What procedures or protocols are in place to guide staff members in securely storing and protecting passwords from unauthorized disclosure or theft, such as encrypted password vaults, secure cloud storage solutions, or physical security measures for sensitive information?",
        "passwordReviewReminders": "How are staff members reminded of the necessity of periodically reviewing and updating their passwords, conducting password audits, and revoking access for inactive or compromised accounts to maintain a robust and resilient password security posture?",
        "socialEngineeringTraining": "Are staff members trained to recognize social engineering tactics commonly employed by attackers to trick individuals into divulging their passwords or sensitive information through manipulation, deception, or coercion?",
        "socialEngineeringTrainingComment": "Comment (Optional)",
        "socialEngineeringResources": "What educational resources or awareness materials are provided to staff members to increase their awareness of phishing scams, pretexting schemes, or other social engineering techniques aimed at exploiting human vulnerabilities to compromise password security?",
        "socialEngineeringVigilance": "How are staff members encouraged to remain vigilant and skeptical of unsolicited requests for password information, particularly via email, phone calls, or other communication channels, and to verify the legitimacy of requests before disclosing sensitive credentials?",
        "passwordPolicyCompliance": "Are staff members informed of the organization's password policy requirements, including expectations for password complexity, expiration, history retention, and enforcement mechanisms for non-compliance?",
        "passwordPolicyComplianceComment": "Comment (Optional)",
        "passwordPolicyMonitoring": "How are staff members monitored or assessed for adherence to password policy guidelines, and what measures are in place to provide feedback, guidance, or enforcement actions in cases of policy violations or security breaches related to password management?",
        "passwordSecurityAccountability": "What strategies are employed to promote a culture of accountability and responsibility among staff members regarding password security, emphasizing the shared responsibility of all individuals in safeguarding sensitive information and protecting against unauthorized access or data breaches?",
        //PatchManagement.js
        "patchTimeliness": "How quickly are patches and security updates applied to devices once they are released by vendors?",
        "automatedPatchSystems": "Are there automated systems in place to regularly check for and deploy patches across all devices in the network?",
        "automatedPatchSystemsComment": "Comment (Optional)",
        "criticalPatchProcesses": "What processes are in place to ensure that critical patches are prioritized and installed without delay to mitigate security risks?",
        "patchCoverage": "Does the patch management strategy cover all operating systems, applications, and firmware used within the organization?",
        "patchCoverageComment": "Comment (Optional)",
        "thirdPartyManagement": "How are third-party applications managed, and is there a comprehensive inventory to ensure all software is up-to-date?",
        "remoteUpdateMechanisms": "Are there mechanisms to ensure that both on-premises and remote devices receive necessary updates in a timely manner?",
        "patchTestingProcedure": "Is there a procedure for testing patches in a controlled environment before deployment to ensure compatibility and prevent disruption of services?",
        "patchValidationSteps": "How are patches validated to confirm successful installation, and what steps are taken if a patch fails to apply correctly?",
        "rollbackPlans": "Are rollback plans in place to revert changes if a patch causes unforeseen issues or incompatibility with existing systems?",
        "complianceAssurance": "How does the patch management process ensure compliance with regulatory requirements and industry standards, such as GDPR, HIPAA, or PCI-DSS?",
        "auditTrails": "Are there audit trails and reporting mechanisms that document patch status, including deployed, pending, and failed updates, for all devices?",
        "reportReviewFrequency": "How often are patch management reports reviewed, and who is responsible for ensuring that devices are fully patched and compliant?",
        "patchPrioritizationStrategies": "What strategies are in place to prioritize patches based on the severity of vulnerabilities and the criticality of affected systems?",
        "cybersecurityIntegration": "How are patch management activities integrated into the broader cybersecurity strategy to address potential risks and minimize attack surfaces?",
        "emergencyPatchProcedures": "Are there procedures for handling out-of-band or emergency patches, particularly in response to zero-day vulnerabilities or active threats?",
        //PeerSupportNetworks.js
        "memberSelection": "How are peer support network members selected or trained to ensure they possess the necessary skills and knowledge to effectively support their peers?",
        "supportMechanisms": "What ongoing support or supervision mechanisms are in place to assist peer supporters in managing their roles and addressing challenging situations?",
        "networkStructure": "How is the structure of the peer support network designed to facilitate effective communication, collaboration, and coordination among members?",
        "confidentialityProtocols": "Are there established protocols or guidelines for maintaining confidentiality and ensuring that peer support interactions are conducted in a safe and respectful manner?",
        "programIntegration": "How are peer support network activities integrated with existing school programs or initiatives aimed at promoting mental health and well-being?",
        "awarenessEfforts": "What efforts are made to promote awareness of the peer support network among students, and how accessible is information about accessing support from peer supporters?",
        "accessBarriers": "How are barriers to accessing peer support addressed, particularly for students who may be reluctant to seek help or who face additional challenges in reaching out?",
        "inclusivityStrategies": "Are there strategies in place to ensure that peer support services are inclusive and reach a diverse range of students, including those from marginalized or underserved communities?",
        "inclusivityStrategiesComment": "Comment (Optional)",
        "feedbackEvaluation": "How is feedback from students used to evaluate the accessibility and effectiveness of the peer support network, and what adjustments are made based on this feedback?",
        "partnerships": "Are there partnerships or collaborations with other school or community organizations to enhance the visibility and reach of the peer support network?",
        "trainingOpportunities": "What specific training or skill development opportunities are provided to peer support network members to enhance their capacity to provide effective support to their peers?",
        "trainingTailoring": "How are training curricula or materials tailored to address the unique needs and challenges of peer supporters, including topics such as active listening, empathy, and boundary setting?",
        "ongoingTraining": "Are there opportunities for peer supporters to receive ongoing training or professional development to further develop their skills and expertise?",
        "ongoingTrainingComment": "Comment (Optional)",
        "trainingEffectiveness": "How is the effectiveness of training programs assessed, and what mechanisms are in place for incorporating feedback from peer supporters into future training initiatives?",
        "recognition": "Are there provisions for recognizing and rewarding the contributions of peer supporters, such as certifications, awards, or opportunities for leadership development?",
        "recognitionComment": "Comment (Optional)",
        "supportServices": "What types of support services or activities are offered through the peer support network, and how are these tailored to meet the diverse needs and preferences of students?",
        "inclusivity": "How are peer support activities structured to promote inclusivity, diversity, and cultural competence, ensuring that all students feel welcome and valued?",
        "proactiveOutreach": "Are there opportunities for peer supporters to engage in proactive outreach and engagement efforts to connect with students who may benefit from support but may not actively seek it out?",
        "proactiveOutreachComment": "Comment (Optional)",
        "alignmentWithGoals": "How are peer support services aligned with broader school goals or initiatives related to mental health promotion, bullying prevention, or student well-being?",
        "impactEvaluation": "Are there mechanisms in place for evaluating the impact and effectiveness of peer support activities, such as collecting feedback from participants or tracking outcomes over time?",
        "serviceCollaboration": "How does the peer support network collaborate with other school-based support services, such as counseling centers, student support teams, or health services, to ensure coordinated care for students?",
        "referralProtocols": "What protocols or procedures are in place for referring students to additional support services or resources beyond the scope of peer support, when needed?",
        "externalPartnerships": "Are there established partnerships or referral networks with external organizations or community agencies to expand the range of support options available to students?",
        "communicationChannels": "How are communication channels maintained between peer supporters and other support providers to facilitate information sharing, continuity of care, and follow-up?",
        "referralTracking": "Are there mechanisms for tracking and monitoring referrals made by peer supporters to ensure that students receive appropriate follow-up and support?",
        "effectivenessEvaluation": "How is the effectiveness of the peer support network evaluated, and what metrics or indicators are used to assess its impact on student well-being and school climate?",
        "feedbackCollection": "Are there mechanisms for collecting feedback from both peer supporters and students who have received support to gather insights into their experiences and satisfaction with the service?",
        "improvementSteps": "How are evaluation findings used to identify areas for improvement or refinement in the peer support network, and what steps are taken to implement changes based on these findings?",
        "researchOpportunities": "Are there opportunities for ongoing research or evaluation studies to further explore the outcomes and benefits of peer support interventions within the school context?",
        "researchOpportunitiesComment": "Comment (Optional)",
        //PerimeterFencing.js
        "structuralSoundness": "Is the perimeter fencing structurally sound and in good condition?",
        "structuralSoundnessComment": "Comment (Optional)",
        "fencingDamage": "Are there any signs of damage, corrosion, or deterioration in the fencing material?",
        "fencingDamageComment": "Comment (Optional)",
        "securePosts": "Are fence posts securely anchored, and are there any signs of leaning or instability?",
        "securePostsComment": "Comment (Optional)",
        "gapsBreaches": "Are there any gaps or breaches in the fencing that could compromise security?",
        "gapsBreachesComment": "Comment (Optional)",
        "fencingHeight": "Is the height of the perimeter fencing sufficient to deter unauthorized entry or climbing?",
        "fencingHeightComment": "Comment (Optional)",
        "fencingCoverage": "Does the fencing provide adequate coverage to secure the perimeter of the facility or property?",
        "fencingCoverageComment": "Comment (Optional)",
        "additionalMeasures": "Are there additional measures in place to prevent access over or under the fencing, such as barbed wire or concrete barriers?",
        "additionalMeasuresComment": "Comment (Optional)",
        "securedAccessPoints": "Are access points in the perimeter fencing properly secured with gates or barriers?",
        "securedAccessPointsComment": "Comment (Optional)",
        "gatesEquipment": "Are gates equipped with locks, hinges, and latches to control access effectively?",
        "gatesEquipmentComment": "Comment (Optional)",
        "restrictedAccess": "Is access to the fenced area restricted to authorized personnel only, with proper authentication mechanisms in place?",
        "restrictedAccessComment": "Comment (Optional)",
        "visibility": "Does the perimeter fencing allow for clear visibility of the surrounding area, both from inside and outside the fenced area?",
        "visibilityComment": "Comment (Optional)",
        "blindSpots": "Are there measures in place to minimize blind spots or obscured views along the perimeter?",
        "blindSpotsComment": "Comment (Optional)",
        "strategicSurveillance": "Are surveillance cameras or other monitoring systems positioned strategically to monitor activity along the fencing?",
        "strategicSurveillanceComment": "Comment (Optional)",
        "durableMaterials": "Is the perimeter fencing made from durable materials that can withstand environmental factors and wear over time?",
        "durableMaterialsComment": "Comment (Optional)",
        "maintenanceInspection": "Are there regular maintenance and inspection procedures in place to address any issues with the fencing promptly?",
        "maintenanceInspectionComment": "Comment (Optional)",
        "repairProvisions": "Are there provisions for repairing or replacing damaged sections of fencing as needed?",
        "repairProvisionsComment": "Comment (Optional)",
        "regulatoryCompliance": "Does the perimeter fencing comply with relevant regulations, codes, and standards for security fencing?",
        "regulatoryComplianceComment": "Comment (Optional)",
        "regulatoryRequirements": "Are there any specific requirements or guidelines for perimeter fencing outlined by regulatory authorities or industry associations?",
        "inspectionsCompliance": "Have inspections or assessments been conducted to verify compliance with applicable standards?",
        "inspectionsComplianceComment": "Comment (Optional)",
        "integratedSecurityMeasures": "Is the perimeter fencing integrated with other security measures, such as surveillance cameras, lighting, or intrusion detection systems?",
        "integratedSecurityMeasuresComment": "Comment (Optional)",
        "securityEffectiveness": "Do these security measures complement the effectiveness of the fencing in deterring and detecting security threats?",
        "securityEffectivenessComment": "Comment (Optional)",
        //PerimeterSecurityEvaluation.js
        "conductedPerimeterSecurityEvaluation": "Has a Perimeter Security Evaluation been conducted? If so, when was it last performed?",
        //PerimeterSecurityFencing.js
        "fencingType": "What type of fencing is used to secure the perimeter of the property (e.g., chain link, barbed wire)?",
        "fencingInspection": "How often is the perimeter security fencing inspected for damage or breaches?",
        "fencingEnhancement": "What measures are in place to enhance the effectiveness of perimeter fencing (e.g., alarms, motion sensors)?",
        "fencingBreachProtocol": "Are there clear protocols for addressing breaches or vulnerabilities in the perimeter security?",
        "fencingDesign": "How does the design of the perimeter fencing contribute to the overall security strategy of the facility?",
        //PersonalDeviceUsage.js
        "useGuidelines": "What guidelines are established for the use of personal devices (e.g., smartphones, tablets, laptops) on the network?",
        "securityRequirements": "Are there specific requirements for the type and security of personal devices that can connect to the network?",
        "securityRequirementsComment": "Comment (Optional)",
        "usePolicy": "How does the policy define acceptable and unacceptable uses of personal devices within the organizational environment?",
        "registeringProcedures": "What procedures are in place for registering personal devices with the organization (e.g., device registration forms)?",
        "handledTracking": "How is the management and tracking of personal devices handled within the network?",
        "deviceProtocols": "Are there specific protocols for ensuring that personal devices meet the organization's security standards before being granted access?",
        "deviceProtocolsComment": "Comment (Optional)",
        "securityMeasures": "What security measures are required for personal devices to access the network (e.g., antivirus software, encryption)?",
        "securityUpdates": "How are security updates and patches managed for personal devices connecting to the network?",
        "passwordRequirements": "Are there specific requirements for personal devices regarding passwords or multi-factor authentication?",
        "passwordRequirementsComment": "Comment (Optional)",
        "networkAccess": "How is network access controlled for personal devices (e.g., network segmentation, VPN requirements)?",
        "resourceRestrictions": "Are there restrictions on the types of network resources that personal devices can access?",
        "resourceRestrictionsComment": "Comment (Optional)",
        "monitoringTools": "What monitoring tools are used to ensure that personal devices do not pose a security risk to the network?",
        "userResponsibilities": "What responsibilities do users have regarding the use of their personal devices (e.g., reporting lost or stolen devices)?",
        "compliancePolicy": "How is compliance with the personal device usage policy ensured and enforced?",
        "policyConsequences": "Are there clear consequences for non-compliance with the policy?",
        "policyConsequencesComment": "Comment (Optional)",
        "addressedPolicy": "How does the policy address the privacy of data on personal devices used within the organization?",
        "protectionMeasures": "What measures are taken to protect organizational data on personal devices (e.g., remote wipe capabilities)?",
        "balancedData": "How are user data and privacy balanced with security requirements?",
        "requestingExceptions": "What processes are in place for requesting exceptions to the personal device usage policy (e.g., special permissions for specific devices)?",
        "authorizedExceptions": "Who is authorized to review and approve exceptions to the policy?",
        "documentedProcedures": "Are there documented procedures for handling and documenting policy exceptions?",
        "documentedProceduresComment": "Comment (Optional)",
        "securityIncident": "What steps are taken if a personal device is involved in a security incident (e.g., data breaches, malware infections)?",
        "managedIncidents": "How are incidents involving personal devices managed and documented?",
        "mitigatingRisks": "What procedures are followed for responding to and mitigating risks associated with compromised personal devices?",
        "trainingPrograms": "What training programs are provided to users regarding the safe use of personal devices on the network?",
        "userAwareness": "How is user awareness of personal device policies and security practices ensured?",
        "assistingUsers": "Are there resources available to assist users in understanding and complying with the personal device usage policy?",
        "assistingUsersComment": "Comment (Optional)",
        "usagePolicy": "How frequently is the personal device usage policy reviewed and updated to address new risks and technological changes?",
        //PhishingAwareness2.js
        "phishingTrainingRecognition": "Are staff members trained to recognize common indicators of phishing attempts, such as unsolicited emails requesting sensitive information, urgent requests for account credentials, or messages containing suspicious links or attachments?",
        "phishingTrainingRecognitionComment": "Comment (Optional)",
        "phishingRedFlags": "What specific characteristics or red flags are emphasized during training as potential signs of phishing, such as misspelled or unfamiliar sender addresses, generic greetings, grammatical errors, or requests for confidential data?",
        "phishingCautionEducation": "How are staff members educated on the importance of exercising caution and skepticism when interacting with email messages, especially those prompting them to disclose personal information or take immediate action without verification?",
        "phishingResponseProtocols": "Are clear response protocols and procedures established for staff members to follow in the event of encountering a suspected phishing email or cyber threat, including steps to report the incident, mitigate risks, and safeguard sensitive information?",
        "phishingResponseTraining": "How are staff members trained to respond effectively to phishing attempts, such as refraining from clicking on suspicious links or attachments, verifying the authenticity of sender identities, and forwarding suspicious emails to designated IT or security personnel for analysis?",
        "phishingRolesAndResponsibilities": "What measures are in place to ensure that staff members understand their roles and responsibilities in preventing, detecting, and responding to phishing attacks, including the escalation of incidents to appropriate authorities for further investigation and remediation?",
        "phishingSimulationOpportunities": "Are staff members provided with opportunities to participate in simulated phishing exercises or awareness campaigns designed to mimic real-world phishing scenarios and test their ability to recognize and respond to phishing threats?",
        "phishingSimulationOpportunitiesComment": "Comment (Optional)",
        "phishingSimulationDescription": "How do phishing simulation exercises simulate various phishing techniques and tactics, challenge staff members' ability to differentiate between legitimate and fraudulent emails, and reinforce best practices for mitigating phishing risks?",
        "phishingSimulationFeedback": "What feedback mechanisms are utilized to evaluate staff members' performance during phishing simulation exercises, track their progress in identifying phishing attempts, and provide targeted guidance or training to address areas for improvement?",
        "phishingEducationalResources": "Are educational resources, awareness materials, or interactive modules available to staff members to enhance their understanding of phishing threats, cybersecurity best practices, and proactive measures for safeguarding sensitive information?",
        "phishingEducationalResourcesComment": "Comment (Optional)",
        "phishingResourceAccess": "How are staff members provided with access to informational resources, instructional videos, or online tutorials covering topics such as email security, password hygiene, two-factor authentication, and safe browsing habits to reinforce phishing awareness and prevention strategies?",
        "phishingEngagementStrategies": "What strategies are employed to promote ongoing engagement and awareness among staff members regarding emerging phishing trends, evolving cyber threats, and recommended countermeasures to protect against phishing attacks in a dynamic threat landscape?",
        "phishingReportingProcedures": "Are staff members informed of the procedures for reporting suspected phishing emails or cyber incidents to designated IT or security personnel for investigation and response?",
        "phishingReportingProceduresComment": "Comment (Optional)",
        "phishingReportingEncouragement": "How are staff members encouraged to promptly report phishing attempts, security breaches, or suspicious activities through established reporting channels, incident response mechanisms, or incident management systems?",
        "phishingIncidentManagement": "What mechanisms are in place to facilitate timely analysis, triage, and resolution of reported phishing incidents, including communication with affected individuals, containment of threats, and implementation of corrective actions to prevent recurrence?",
        //PhishingAwarenessTraining.js
        "trainingTopics": "What specific topics are covered in phishing awareness training, and how are they designed to address the latest phishing tactics and techniques?",
        "interactiveTraining": "Are the training modules interactive and engaging to ensure users are actively learning and retaining information?",
        "interactiveTrainingComment": "Comment (Optional)",
        "trainingUpdateFrequency": "How frequently is phishing awareness training updated to reflect new threats and developments in phishing tactics?",
        "effectivenessMeasurement": "How is the effectiveness of phishing awareness training measured (e.g., user assessments, reduced phishing incidents)?",
        "refresherCourses": "Are there periodic refresher courses to reinforce key concepts and ensure ongoing vigilance against phishing threats?",
        "refresherCoursesComment": "Comment (Optional)",
        "knowledgeRetentionAssessment": "What methods are used to assess knowledge retention over time, and how is this data used to improve the training program?",
        "roleBasedTraining": "Is the phishing awareness training tailored to different user roles within the organization to address specific risks and scenarios they may encounter?",
        "roleBasedTrainingComment": "Comment (Optional)",
        "trainingAdaptation": "How does the training accommodate users with varying levels of technical expertise and familiarity with phishing threats?",
        "realWorldExamples": "Are real-world examples and case studies used in the training to provide practical, relatable insights for users?",
        "realWorldExamplesComment": "Comment (Optional)",
        "userFeedbackMechanism": "Is there a mechanism for users to provide feedback on the phishing awareness training program, and how is this feedback incorporated into future updates?",
        "questionsOpportunities": "Are there opportunities for users to ask questions or seek clarification on phishing-related concerns during or after training sessions?",
        "questionsOpportunitiesComment": "Comment (Optional)",
        "engagementMeasurement": "How is user engagement measured during training sessions, and what strategies are in place to maintain high levels of participation?",
        "integrationWithAwareness": "How is phishing awareness training integrated with other cybersecurity awareness initiatives, such as data protection and password security?",
        "crossDepartmentalEfforts": "Are there cross-departmental efforts to ensure a cohesive approach to phishing awareness across the organization?",
        "crossDepartmentalEffortsComment": "Comment (Optional)",
        "trainingSuccessLink": "How is the success of phishing awareness training linked to broader organizational goals, such as reducing security breaches and enhancing overall cybersecurity posture?",
        "regularReviews": "Are there regular reviews of phishing awareness training materials to ensure they remain current and effective?",
        "regularReviewsComment": "Comment (Optional)",
        "materialEvolution": "How does the organization ensure that training materials evolve in response to emerging phishing tactics and technologies?",
        "lessonsLearned": "Is there a process for incorporating lessons learned from real phishing incidents into the training program?",
        "complianceRequirements": "Are there any regulatory or compliance requirements driving the need for phishing awareness training within the organization?",
        "complianceRequirementsComment": "Comment (Optional)",
        "complianceTracking": "How is compliance with phishing awareness training tracked and reported to ensure all employees participate as required?",
        "trainingConsequences": "Are there consequences or follow-up actions for employees who fail to complete training or demonstrate poor phishing awareness?",
        "additionalResources": "Are users provided with additional resources or tools (e.g., guides, checklists) to help them recognize phishing attempts outside of formal training?",
        "additionalResourcesComment": "Comment (Optional)",
        "ongoingSupport": "Is there ongoing support available, such as a helpdesk or dedicated team, to assist users with phishing-related questions or concerns?",
        "ongoingSupportComment": "Comment (Optional)",
        "userEncouragement": "How are users encouraged to stay vigilant and proactive in reporting suspected phishing emails or incidents?",
        //PhishingSimulationExercises.js
        "conductedExercises": "How often are phishing simulation exercises conducted to test user vigilance?",
        "phishingTactics": "What types of phishing tactics (e.g., email, SMS) are included in the simulations?",
        "informedEmployees": "How are employees informed of their performance in these exercises (e.g., feedback, follow-up training)?",
        "correctiveActions": "What corrective actions or additional training are required for employees who fall for simulated phishing attempts?",
        "trackedResults": "Are results from phishing exercises tracked to identify trends and improve the program?",
        "trackedResultsComment": "Comment (Optional)",
        //PhysicalBullying.js
        "recognizingBullying": "How are students educated on recognizing physical bullying behaviors, such as pushing, hitting, kicking, or other forms of physical aggression, and distinguishing them from rough play or consensual interaction?",
        "proactiveMeasures": "What proactive measures are in place to empower students to identify signs of physical bullying, including changes in behavior, unexplained injuries, or reluctance to attend school, and to report incidents to trusted adults or authorities?",
        "preventionStrategies": "What preventive strategies and intervention protocols are implemented to address physical bullying incidents promptly and effectively, including clear reporting procedures, designated staff responsibilities, and consequences for perpetrators?",
        "bystanderSupport": "How are students encouraged to advocate for themselves and others when witnessing physical bullying, and what support mechanisms or bystander intervention strategies are promoted to foster a culture of collective responsibility and mutual respect?",
        "safetyMeasures": "What measures are taken to ensure the physical safety and well-being of students within the school environment, including supervision during transition periods, monitoring of high-risk areas, and implementation of proactive measures to prevent conflicts and aggression?",
        "environmentModifications": "Are there physical modifications or environmental adjustments made to reduce opportunities for physical bullying, such as improved lighting, surveillance cameras, or designated safe zones, and how are these measures communicated to students and staff?",
        "counselingSupport": "How are students affected by physical bullying provided with immediate support and access to counseling services to address their emotional and psychological well-being, including trauma-informed care, crisis intervention, and ongoing support for recovery and resilience-building?",
        "parentProtocols": "Are there protocols in place for engaging with parents or guardians of students involved in physical bullying incidents, including communication about the incident, collaboration on intervention strategies, and referrals to external support services as needed?",
        "restorativePractices": "Can you describe any restorative justice practices or conflict resolution techniques employed to address physical bullying incidents, including opportunities for dialogue, mediation, and reconciliation between parties involved, and how are these approaches integrated into the school's disciplinary framework?",
        "accountabilitySupport": "How are students supported in understanding the impact of their actions, taking responsibility for their behavior, and developing empathy and accountability in resolving conflicts and repairing harm caused by physical bullying incidents?",
        "communityPartnerships": "Are there partnerships with local law enforcement agencies, community organizations, or youth-serving agencies to address issues of physical bullying comprehensively, including joint initiatives, resource-sharing, and coordination of support services for affected students and families?",
        "stakeholderEngagement": "How are community stakeholders engaged in prevention efforts, awareness campaigns, and capacity-building activities to address the root causes of physical bullying and promote a culture of respect, empathy, and nonviolence within the broader community?",
        "interventionEffectiveness": "How is the effectiveness of interventions targeting physical bullying regularly assessed and evaluated, including data collection on incident reports, disciplinary actions, student surveys, and feedback from staff, students, and parents?",
        "policyRefinement": "Are there mechanisms in place for ongoing review and refinement of anti-bullying policies, procedures, and programming based on evidence-based practices, best available research, and input from stakeholders to ensure continuous improvement in addressing physical bullying within the school community?",
        //PhysicalHazardsAssessment.js
        "conductedPhysicalHazardsAssessment": "Has a Physical Hazards assessment been conducted? If so, when was it last performed?",
        "identifyingPhysicalHazards": "What criteria are used to identify physical hazards within the school environment?",
        "oftenConductingPhysicalHazards": "How often is the physical hazards assessment conducted?",
        "utilizedTools": "What tools or methods are utilized to assess physical hazards?",
        "presentPhysicalHazards": "Are there any known physical hazards present in the school's vicinity?",
        "communicatedResults": "How are the results of the physical hazards assessment communicated to staff and stakeholders?",
        //PlanningCommunityOutreachStrategies.js
        "outreachMethods": "What specific outreach methods will be used to engage with community members regarding school safety?",
        "effectiveOutreachStrategies": "How will the effectiveness of outreach strategies be measured and evaluated?",
        "communityFeedbackRole": "What role will community feedback play in shaping future outreach initiatives?",
        "diverseCommunityGroups": "How will the school ensure inclusivity in its outreach efforts to reach diverse community groups?",
        "leveregedResources": "What resources or partnerships will be leveraged to enhance community outreach efforts?",
        //PolicyRevisionApprovalWorkflow.js
        "revisionApprovalSteps": "What are the steps involved in the policy revision approval process?",
        "approvalStakeholders": "Who are the key stakeholders involved in approving policy revisions?",
        "revisionCommunication": "How are revisions communicated to all affected parties once approved?",
        "revisionTimelines": "What timelines are established for reviewing and approving proposed policy changes?",
        "revisionEffectivenessEvaluation": "How is the effectiveness of the policy revision process evaluated after implementation?",
        //PostIncidentSupport.js
        "supportServicesAvailability": "What post-incident support services are available to staff members following emergency situations, and are they easily accessible?",
        "mentalHealthResourcesAvailability": "Are counseling services, peer support programs, or other mental health resources offered to staff members affected by traumatic events?",
        "mentalHealthResourcesAvailabilityComment": "Comment (Optional)",
        "supportServicesCommunication": "How are support services promoted and communicated to staff members to ensure awareness of available resources?",
        "externalSupportDetails": "Are external partnerships or collaborations established with mental health organizations or community agencies to supplement internal support services?",
        "counselingSupportOptions": "What counseling and psychological support options are available to staff members in the aftermath of critical incidents or emergencies?",
        "licensedMentalHealthAvailability": "Are licensed counselors or mental health professionals trained in trauma response and crisis intervention available to provide support?",
        "licensedMentalHealthAvailabilityComment": "Comment (Optional)",
        "confidentialityProtection": "How are confidentiality and privacy protected for staff members seeking counseling or psychological support services?",
        "mentalHealthAssessmentDetails": "Are there protocols in place for assessing the immediate and long-term mental health needs of staff members and providing appropriate interventions?",
        "peerSupportEstablished": "Are peer support programs established to facilitate informal assistance and emotional support among staff members following traumatic events?",
        "peerSupportEstablishedComment": "Comment (Optional)",
        "peerSupporterRoles": "How are peer supporters selected, trained, and supported in their roles as peer counselors or advocates?",
        "peerSupportIntegration": "Are peer support networks integrated into the organization's broader crisis management and employee assistance programs?",
        "peerSupportIntegrationComment": "Comment (Optional)",
        "peerSupportEffectiveness": "What measures are in place to ensure the effectiveness and sustainability of peer support initiatives over time?",
        "familyAssistanceDescription": "How are family members of staff members affected by emergencies supported and informed about available resources?",
        "familyCommunicationDetails": "Are communication channels established to provide updates and information to family members during and after critical incidents?",
        "familyResourcesReferrals": "What resources or referral networks are available to connect family members with appropriate support services, such as counseling or financial assistance?",
        "familyAssistancePlans": "Are family assistance plans or protocols included in the organization's overall emergency response and recovery framework?",
        "familyAssistancePlansComment": "Comment (Optional)",
        "postIncidentSupportTraining": "Are staff members trained on the availability and utilization of post-incident support services as part of their emergency response training?",
        "postIncidentSupportTrainingComment": "Comment (Optional)",
        "stressRecognitionEducation": "How are staff members educated on recognizing signs of stress, trauma, or emotional distress in themselves and their colleagues?",
        "resilienceTrainingWorkshops": "Are training sessions or workshops conducted to enhance staff members' resilience and coping skills in response to critical incidents?",
        "resilienceTrainingWorkshopsComment": "Comment (Optional)",
        "supportSeekingComfortMeasures": "What measures are in place to ensure that staff members feel comfortable and supported in seeking assistance or support when needed?",
        "evaluationEffectiveness": "How are post-incident support services evaluated for their effectiveness and responsiveness to staff members' needs?",
        "feedbackDetails": "Are feedback mechanisms in place to gather input from staff members about their experiences with post-incident support services?",
        "impactAssessmentMetrics": "What measures or metrics are used to assess the impact of support interventions on staff members' well-being and recovery?",
        "lessonsLearnedUsed": "Are lessons learned from post-incident support activities used to inform improvements to the organization's crisis management and employee assistance programs?",
        "lessonsLearnedUsedComment": "Comment (Optional)",
        //PTZCameras.js
        "operational": "Are the PTZ cameras operational and functioning as intended?",
        "operationalComment": "Comment (Optional)",
        "flexibleMonitoring": "Do the cameras provide flexible monitoring capabilities, allowing for pan, tilt, and zoom functionalities?",
        "flexibleMonitoringComment": "Comment (Optional)",
        "malfunction": "Are there any signs of malfunction or errors in camera movements or zoom capabilities?",
        "malfunctionComment": "Comment (Optional)",
        "backupSystems": "Are backup systems in place in case of power outages or camera malfunctions?",
        "backupSystemsComment": "Comment (Optional)",
        "coverage": "Do the PTZ cameras cover the desired areas for monitoring, providing comprehensive surveillance coverage?",
        "coverageComment": "Comment (Optional)",
        "strategicPositioning": "Are they positioned strategically to monitor critical areas and respond to security events effectively?",
        "strategicPositioningComment": "Comment (Optional)",
        "presetPositions": "Are there preset positions or patrol patterns programmed into the cameras to enhance monitoring efficiency?",
        "presetPositionsComment": "Comment (Optional)",
        "imageQuality": "Do the PTZ cameras capture high-quality images with sufficient resolution for identification and analysis?",
        "imageQualityComment": "Comment (Optional)",
        "imageAdjustments": "Are there adjustments or settings available to optimize image quality based on lighting conditions and environmental factors?",
        "imageAdjustmentsComment": "Comment (Optional)",
        "zoomQuality": "Are images clear and detailed, even when zoomed in for closer inspection?",
        "zoomQualityComment": "Comment (Optional)",
        "integrationSurveillance": "Are the PTZ cameras integrated with the overall surveillance system?",
        "integrationSurveillanceComment": "Comment (Optional)",
        "seamlessCommunication": "Do they communicate seamlessly with surveillance software and monitoring stations?",
        "seamlessCommunicationComment": "Comment (Optional)",
        "realTimeMonitoring": "Is there real-time monitoring and recording of camera feeds, with the ability to control PTZ functions remotely?",
        "realTimeMonitoringComment": "Comment (Optional)",
        "durabilityWeatherResistance": "Are the PTZ cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?",
        "durabilityWeatherResistanceComment": "Comment (Optional)",
        "durableMaterials": "Are they constructed from durable materials capable of withstanding outdoor conditions?",
        "durableMaterialsComment": "Comment (Optional)",
        "protectiveEnclosures": "Are there protective enclosures or housings to shield the cameras from damage or vandalism?",
        "protectiveEnclosuresComment": "Comment (Optional)",
        "remoteControl": "Is there remote access and control functionality for the PTZ cameras?",
        "remoteControlComment": "Comment (Optional)",
        "remoteAdjustments": "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?",
        "remoteAdjustmentsComment": "Comment (Optional)",
        "secureAuthentication": "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?",
        "secureAuthenticationComment": "Comment (Optional)",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the PTZ cameras?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of PTZ functions, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        //RazorWire.js
        "razorWireInstalled": "Is razor wire installed at strategic locations atop perimeter fences to deter unauthorized access?",
        "razorWireInstalledComment": "Comment (Optional)",
        "razorWireCoverage": "Does the razor wire provide sufficient coverage to prevent climbing or scaling of the fence?",
        "razorWireCoverageComment": "Comment (Optional)",
        "warningSigns": "Are there warning signs or markers indicating the presence of razor wire to prevent accidental contact?",
        "warningSignsComment": "Comment (Optional)",
        "razorWireSafety": "Is the razor wire installed at a height and angle that minimizes the risk of accidental injury to personnel or wildlife?",
        "razorWireSafetyComment": "Comment (Optional)",
        "razorWireRestrictions": "Are there measures in place to prevent unauthorized access to areas where razor wire is installed?",
        "razorWireRestrictionsComment": "Comment (Optional)",
        "razorWireEffectiveness": "Has razor wire proven effective in deterring unauthorized access or intrusions in the past?",
        "razorWireEffectivenessComment": "Comment (Optional)",
        "additionalMeasures": "Are there additional security measures in place to complement the effectiveness of razor wire in perimeter defense?",
        "additionalMeasuresComment": "Comment (Optional)",
        "compliance": "Does the installation of razor wire comply with relevant regulations, codes, and standards for security fencing?",
        "complianceComment": "Comment (Optional)",
        "inspections": "Has the installation undergone inspections or assessments to verify compliance with applicable standards?",
        "inspectionsComment": "Comment (Optional)",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for razor wire installations?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as inspection for damage or corrosion, repair of any loose or damaged sections, and replacement of worn-out wire, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        "alternativesConsidered": "Has consideration been given to alternative perimeter security measures that may provide similar or enhanced security without the risks associated with razor wire?",
        "alternativesConsideredComment": "Comment (Optional)",
        "stakeholdersInformed": "Has the presence of razor wire been communicated transparently to stakeholders, including neighboring properties or the local community?",
        "stakeholdersInformedComment": "Comment (Optional)",
        "mitigationEfforts": "Are there efforts to mitigate any negative perceptions or concerns related to the use of razor wire, such as landscaping or architectural design elements to conceal or soften its appearance?",
        "mitigationEffortsComment": "Comment (Optional)",
        //RecertificationSchedule.js
        "recertificationFrequency": "What is the established frequency for recertifying staff members in First Aid/CPR training (e.g., every two years, annually)?",
        "recertificationScheduleDetermination": "How is the recertification schedule determined, and are there specific factors or regulations guiding this decision?",
        "recertificationVariations": "Are there variations in recertification requirements based on job roles, departmental needs, or regulatory standards?",
        "recertificationVariationsComment": "Comment (Optional)",
        "notificationMethods": "How are staff members notified of upcoming recertification deadlines for First Aid/CPR training?",
        "reminderSystem": "Is there a reminder system in place to alert staff members well in advance of their recertification expiration dates?",
        "reminderSystemComment": "Comment (Optional)",
        "communicationChannels": "What communication channels are utilized to ensure that staff members receive timely reminders about recertification requirements?",
        "recertificationProcess": "What is the process for staff members to recertify in First Aid/CPR training, and are there specific steps or procedures they need to follow?",
        "recertificationOptions": "Are recertification courses offered on-site, online, or through external training providers, and how are these options determined?",
        "recertificationOptionsComment": "Comment (Optional)",
        "recertificationSupport": "How are staff members supported in completing recertification requirements, such as scheduling flexibility or financial assistance?",
        "recertificationRecords": "How are records of staff members' recertification status and completion maintained, and are these records kept up to date?",
        "certificateDistribution": "Are recertification certificates or credentials issued to staff members upon successful completion, and how are these documents distributed or stored?",
        "recordsIntegrity": "What measures are in place to ensure the accuracy and integrity of recertification records, including verification of course completion and instructor credentials?",
        "evaluationFeedback": "How is the effectiveness of the recertification process evaluated, and are there mechanisms for gathering feedback from staff members?",
        "staffFeedback": "Are staff members given the opportunity to provide input on the recertification courses, instructors, or content to identify areas for improvement?",
        "staffFeedbackComment": "Comment (Optional)",
        "lessonsLearned": "How are lessons learned from previous recertification cycles used to refine and enhance the recertification process for future iterations?",
        //RecognizingSecurityBreaches.js
        "securityVulnerabilityTraining": "Are staff members trained to identify and recognize common security vulnerabilities, weaknesses, or gaps in physical security measures, access controls, or surveillance systems that could be exploited by intruders or unauthorized individuals?",
        "securityVulnerabilityTrainingComment": "Comment (Optional)",
        "securityIndicators": "What specific indicators or warning signs are emphasized during training as potential evidence of security breaches, such as unauthorized access points, tampered locks, broken windows, or unexplained disruptions to normal operations?",
        "proactiveEducation": "How are staff members educated on the importance of maintaining a proactive and vigilant stance towards security, actively monitoring their surroundings, and promptly reporting any deviations from established security protocols or procedures?",
        "responseProtocols": "Are clear response protocols and procedures established for staff members to follow in the event of a suspected security breach, unauthorized access attempt, or breach of perimeter security?",
        "responseTraining": "How are staff members trained to respond effectively and decisively to security breaches, including actions such as initiating lockdown procedures, activating alarm systems, alerting security personnel or law enforcement authorities, and directing occupants to safe locations?",
        "roleCoordination": "What measures are in place to ensure that staff members understand their roles and responsibilities during security incidents, coordinate their actions with other team members, and communicate critical information to facilitate a prompt and coordinated response?",
        "deviceFamiliarization": "Are staff members provided with training on the proper use, operation, and troubleshooting of security devices, such as access control systems, surveillance cameras, intrusion detection sensors, or alarm systems?",
        "deviceFamiliarizationComment": "Comment (Optional)",
        "deviceMalfunctionRecognition": "How are staff members instructed to recognize abnormal behavior or indications of malfunction in security devices that could signal a potential security breach or technical issue requiring immediate attention?",
        "troubleshootingResources": "What resources or reference materials are available to staff members to assist them in troubleshooting common security device issues, interpreting system alerts or error messages, and taking appropriate corrective actions to restore functionality?",
        "incidentReportingTraining": "Are staff members trained on the importance of documenting and reporting security breaches or unauthorized access incidents in a timely and accurate manner to support investigation, analysis, and corrective action?",
        "incidentReportingTrainingComment": "Comment (Optional)",
        "incidentDocumentation": "How are staff members instructed to document relevant details and observations regarding security breaches, including the location, time, nature of the incident, individuals involved, and any additional contextual information that may aid in understanding the situation?",
        "reportingProtocols": "What protocols are in place for reporting security breaches to designated authorities, security personnel, or administrative staff members, and how are staff members informed of their obligations and responsibilities in this regard?",
        "continuousImprovement": "How does the organization promote a culture of continuous improvement in security awareness and breach recognition capabilities among staff members through ongoing training, reinforcement activities, and feedback mechanisms?",
        "feedbackEncouragement": "Are staff members encouraged to provide feedback on security protocols, procedures, or training materials based on their real-world experiences, insights, or suggestions for enhancing security awareness and breach recognition effectiveness?",
        "feedbackEncouragementComment": "Comment (Optional)",
        "breachAnalysisMechanisms": "What mechanisms are in place to review and analyze reported security breaches, identify root causes or contributing factors, and implement corrective actions or procedural enhancements to prevent recurrence and strengthen overall security posture?",
        //RecognizingSecurityIncidents.js
        "securityIncidentSigns": "What are common signs of a potential security incident (e.g., phishing attempts, unusual network activity)?",
        "distinguishFalseAlarms": "How can employees distinguish between false alarms and legitimate security threats?",
        "typesOfIncidentsToReport": "What types of incidents (e.g., malware infections, unauthorized access) should be reported immediately?",
        "responseToDataBreach": "How should employees respond if they suspect a data breach or compromise?",
        "toolsForMonitoringSecurity": "What tools or systems are available to help employees monitor and report potential security issues?",
        //RegularBackupSchedules.js
        "backupFrequency": "What is the frequency of your backup schedules (e.g., daily, weekly), and does it align with the criticality of the data being backed up?",
        "criticalDataIncluded": "Are all critical data and systems included in the backup schedule, and are there specific types of data (e.g., databases, configuration files) that are prioritized?",
        "criticalDataIncludedComment": "Comment (Optional)",
        "scheduleAdjustments": "How are backup schedules adjusted for different types of data, such as high-frequency transactional data versus less frequently updated data?",
        "reliableBackupProcedures": "What procedures are followed to ensure that backups are performed reliably and consistently according to the established schedule?",
        "automatedBackupSystems": "Are there automated systems in place to handle backups, and how are manual backups managed and verified?",
        "automatedBackupSystemsComment": "Comment (Optional)",
        "backupIntegrityValidation": "How is backup integrity validated, and what steps are taken if a backup fails or encounters errors during the process?",
        "backupStorageSolutions": "How is backup data stored, and what storage solutions are used (e.g., cloud storage, on-premises storage, off-site storage)?",
        "retentionPolicies": "What are the retention policies for backup data, and how long is backup data kept before being archived or deleted?",
        "secureBackupStorage": "Are backup storage solutions secure and protected from unauthorized access or tampering?",
        "secureBackupStorageComment": "Comment (Optional)",
        "monitoringSystems": "What monitoring systems are in place to track the status of backups and ensure that they are completed as scheduled?",
        "backupAlerts": "Are there alert mechanisms to notify administrators of backup failures, delays, or issues, and how are these alerts handled?",
        "backupAlertsComment": "Comment (Optional)",
        "backupPerformanceMonitoring": "How is the performance of backup processes monitored to ensure that they do not negatively impact system performance or operations?",
        "restorationTestsFrequency": "How frequently are backup restoration tests conducted to ensure that backup data can be successfully restored when needed?",
        "backupVerificationProcedures": "What procedures are in place to verify the completeness and accuracy of backups, and how are discrepancies addressed?",
        "backupTestsDocumentation": "Are backup tests documented and reviewed, and what is the process for updating backup procedures based on test results?",
        "backupCompliance": "How does your backup schedule comply with relevant regulatory and industry standards for data protection and retention?",
        "backupProceduresDocumented": "Are backup procedures and schedules documented, and is there a clear process for updating documentation as needed?",
        "backupProceduresDocumentedComment": "Comment (Optional)",
        "backupAuditsReviews": "What audits or reviews are conducted to ensure compliance with backup policies and procedures?",
        "disasterRecoveryIntegration": "How are backup schedules integrated into the overall disaster recovery plan, and what role do they play in ensuring business continuity?",
        "recoveryFromBackups": "What are the procedures for initiating recovery from backups during a disaster or major incident, and how is recovery prioritized?",
        "backupRecoveryTested": "Are backup and recovery processes tested together to ensure that they function effectively as part of the disaster recovery plan?",
        "backupRecoveryTestedComment": "Comment (Optional)",
        //RegularDataBackups.js
        "backupFrequency": "What is the frequency of data backups (e.g., daily, weekly, monthly), and how is this schedule determined?",
        "backupDataTypes": "What types of data are included in the backup process, and are there any exclusions?",
        "backupStorageSecurity": "How are backup data stored, and what measures are in place to ensure the security of these backups?",
        "backupTesting": "What testing procedures are conducted to verify the integrity and recoverability of backup data?",
        "backupDocumentation": "How is the backup process documented, and who is responsible for overseeing it?",
        //ResponseProtocols2.js
        "immediateActionDescription": "What immediate actions are staff members trained to take in response to different types of emergencies, such as medical emergencies, fire incidents, hazardous material spills, or security threats?",
        "protocolsDetails": "Are response protocols established to guide staff members in promptly assessing the situation, activating the appropriate emergency response procedures, and initiating initial response actions to mitigate risks and ensure the safety of occupants?",
        "protocolPrioritization": "How do response protocols prioritize life safety, property protection, and incident stabilization to minimize harm, prevent escalation, and facilitate the orderly evacuation or sheltering of individuals as necessary?",
        "decisionMakingStructure": "How are decision-making responsibilities, authority levels, and incident command structures defined and communicated within the school organization during emergency situations?",
        "chainOfCommandTraining": "Are staff members trained to follow established chain of command protocols, communicate critical information effectively, and coordinate response efforts with designated incident commanders, safety officers, or emergency coordinators?",
        "chainOfCommandTrainingComment": "Comment (Optional)",
        "coordinationProvisions": "What provisions are in place to ensure clear lines of communication, rapid decision-making, and effective coordination among responders, stakeholders, and external agencies involved in emergency response operations?",
        "emergencyCommunication": "How are emergency response procedures initiated and communicated to staff members, students, and visitors within the school environment?",
        "notificationSystems": "Are notification systems, alert mechanisms, and communication channels utilized to issue timely warnings, alarms, or instructions to occupants in the event of an emergency?",
        "notificationSystemsComment": "Comment (Optional)",
        "responseTeamActivation": "What protocols are followed to activate emergency response teams, mobilize resources, and implement predetermined action plans based on the nature, severity, and location of the emergency incident?",
        "resourceAllocation": "How are resources, equipment, and facilities allocated and utilized during emergency response operations to support incident management, victim care, and logistical needs?",
        "resourceManagementProtocols": "Are resource management protocols established to prioritize resource allocation, track resource usage, and request additional support from external agencies or mutual aid partners as needed?",
        "resourceManagementProtocolsComment": "Comment (Optional)",
        "essentialResourcesReadiness": "What mechanisms are in place to ensure the availability, accessibility, and readiness of essential resources, including emergency supplies, medical equipment, communication devices, and specialized personnel, to support response efforts effectively?",
        "informationGathering": "How do response protocols facilitate the collection, verification, and dissemination of critical information, situational updates, and incident intelligence to inform decision-making and response actions?",
        "situationalAssessmentTraining": "Are staff members trained to conduct rapid situational assessments, gather relevant data, and report observations, hazards, and emerging threats to incident commanders or designated authorities?",
        "situationalAssessmentTrainingComment": "Comment (Optional)",
        "informationIntegration": "What procedures are in place to integrate information from multiple sources, assess the impact of the emergency incident, and adapt response strategies based on changing circumstances, evolving threats, or new developments?",
        //ResponseToSecurityThreats.js
        "securityThreatProcedures": "What procedures are in place for staff to follow when a security threat is identified?",
        "responseProtocolReview": "How frequently are response protocols for security threats reviewed and practiced?",
        "securityPersonnelTraining": "Are there designated personnel responsible for coordinating the response to security threats, and how are they trained?",
        "alertCommunicationMethods": "What communication methods are used to alert staff and students during a security threat?",
        "responseEvaluation": "How does the school evaluate the effectiveness of its response to past security threats?",
        //RolePlayingScenarios.js
        "rolePlayingScenarioSelection": "How are role-playing scenarios selected or developed to address specific safety concerns or emergency situations relevant to the school or educational institution?",
        "realLifeIncidentScenarios": "Are scenarios based on real-life incidents, local hazards, or common safety risks identified within the school environment?",
        "realLifeIncidentScenariosComment": "Comment (Optional)",
        "rolePlayingCriteria": "What criteria are used to ensure that role-playing scenarios are age-appropriate, culturally sensitive, and aligned with the developmental needs of participants?",
        "scenarioDesignEngagement": "How are role-playing scenarios designed to engage participants and simulate realistic emergency situations or safety challenges?",
        "scenarioRolesAssignment": "Are scenarios scripted or improvised, and how are roles assigned or distributed among participants?",
        "scenarioPropsAndEquipment": "What props, equipment, or simulated environments are used to enhance the realism and immersion of role-playing scenarios?",
        "multipleScenarioOutcomes": "Are scenarios structured to allow for multiple outcomes or variations based on participant actions and decisions?",
        "multipleScenarioOutcomesComment": "Comment (Optional)",
        "participantEngagement": "How are participants encouraged to actively engage and participate in role-playing scenarios?",
        "debriefingSessions": "Are debriefing sessions, pre-briefings, or instructions provided to orient participants and establish expectations before engaging in scenarios?",
        "debriefingSessionsComment": "Comment (Optional)",
        "collaborationAndTeamworkStrategies": "What strategies are employed to promote collaboration, communication, and teamwork among participants during role-playing exercises?",
        "postScenarioReflection": "Are opportunities provided for participants to reflect on their experiences, share insights, and learn from each other's perspectives following the completion of scenarios?",
        "postScenarioReflectionComment": "Comment (Optional)",
        "learningObjectivesAndOutcomes": "What specific learning objectives or outcomes are targeted through role-playing scenarios, and how are they aligned with broader safety education goals?",
        "reinforceSafetyConcepts": "Are scenarios designed to reinforce key safety concepts, practice emergency response procedures, or develop critical thinking and problem-solving skills?",
        "reinforceSafetyConceptsComment": "Comment (Optional)",
        "participantPerformanceAssessment": "How are participant performance and learning outcomes assessed and evaluated during or after role-playing exercises?",
        "debriefingPostScenario": "Are debriefing sessions or post-scenario discussions used to identify strengths, areas for improvement, and lessons learned from each scenario?",
        "debriefingPostScenarioComment": "Comment (Optional)",
        "scenarioIntegrationWithTraining": "How are role-playing scenarios integrated into broader safety training programs or curriculum initiatives within the school or educational institution?",
        "scenariosInClassroomOrActivities": "Are scenarios incorporated into existing classroom instruction, extracurricular activities, or dedicated safety training sessions?",
        "scenariosInClassroomOrActivitiesComment": "Comment (Optional)",
        "facilitatorRolesInScenarios": "What role do teachers, staff members, or external facilitators play in facilitating role-playing scenarios and guiding participant learning?",
        "followUpActivitiesAndAssignments": "Are follow-up activities or assignments provided to reinforce learning and encourage further exploration of safety topics addressed in role-playing exercises?",
        "followUpActivitiesAndAssignmentsComment": "Comment (Optional)",
        //RolesAndResponsibilitiesOfEmergencyResponseTeam.js
        "memberRoles": "What specific roles and responsibilities are assigned to each member of the Emergency Response Team?",
        "effectiveCommunication": "How is the Emergency Response Team structured to ensure effective communication during an incident?",
        "requiredTraining": "What training and qualifications are required for members of the Emergency Response Team?",
        "participatingInDrills": "How often does the Emergency Response Team participate in drills or training exercises to practice their roles?",
        "interactionProtocols": "Are there clear protocols for how the Emergency Response Team interacts with external agencies during an emergency? If so, what are they?",
        //RovingPatrols.js
        "regularPatrols": "Are roving patrols conducted regularly throughout the premises, covering all critical areas and potential security vulnerabilities?",
        "regularPatrolsComment": "Comment (Optional)",
        "wellDefinedRoutes": "Are patrol routes well-defined, ensuring comprehensive coverage of indoor and outdoor areas?",
        "wellDefinedRoutesComment": "Comment (Optional)",
        "specialAttentionAreas": "Are there any areas or zones that require special attention or increased patrol frequency?",
        "patrolFrequency": "How often are roving patrols conducted, and at what intervals?",
        "randomIntervals": "Are patrols conducted at random intervals to deter predictability and enhance security effectiveness?",
        "randomIntervalsComment": "Comment (Optional)",
        "additionalPatrols": "Are there additional patrols scheduled during high-risk periods or events?",
        "additionalPatrolsComment": "Comment (Optional)",
        "activeMonitoring": "Do roving patrol officers actively monitor the premises for signs of unauthorized access, suspicious behavior, or security breaches?",
        "activeMonitoringComment": "Comment (Optional)",
        "threatResponse": "Are they trained to recognize and respond to potential threats, including unauthorized individuals or unusual activities?",
        "threatResponseComment": "Comment (Optional)",
        "thoroughInspections": "Do patrol officers conduct thorough inspections of doors, windows, gates, and other access points during patrols?",
        "thoroughInspectionsComment": "Comment (Optional)",
        "incidentResponse": "Are roving patrol officers equipped to respond promptly to security incidents, alarms, or emergencies encountered during patrols?",
        "incidentResponseComment": "Comment (Optional)",
        "emergencyProcedures": "Do they know how to initiate appropriate emergency response procedures and contact relevant authorities or response teams?",
        "emergencyProceduresComment": "Comment (Optional)",
        "coordinationWithGuards": "Is there a system in place to coordinate with stationed guards or other security personnel in case of incidents requiring additional support?",
        "coordinationWithGuardsComment": "Comment (Optional)",
        "detailedRecords": "Are patrol officers required to maintain detailed records of patrol activities, including patrol routes, observations, and incidents encountered?",
        "detailedRecordsComment": "Comment (Optional)",
        "reportingProcess": "Is there a standardized reporting process for documenting security incidents, suspicious activities, or maintenance issues identified during patrols?",
        "reportingProcessComment": "Comment (Optional)",
        "reportReviews": "Are patrol reports reviewed regularly by security management to identify trends, areas for improvement, or security risks?",
        "reportReviewsComment": "Comment (Optional)",
        "effectiveCommunication": "Is there effective communication between roving patrol officers and stationed guards, as well as with management and staff?",
        "effectiveCommunicationComment": "Comment (Optional)",
        "communicationDevices": "Are patrol officers equipped with communication devices to report incidents, request assistance, or communicate with response teams?",
        "communicationDevicesComment": "Comment (Optional)",
        "centralizedCommunication": "Is there a centralized communication system or protocol for relaying information and coordinating responses between patrol officers and other security personnel?",
        "centralizedCommunicationComment": "Comment (Optional)",
        "adequateTraining": "Are roving patrol officers adequately trained in security procedures, emergency response protocols, and effective patrol techniques?",
        "adequateTrainingComment": "Comment (Optional)",
        "ongoingTraining": "Do they receive ongoing training to enhance their skills, knowledge, and awareness of security threats and emerging risks?",
        "ongoingTrainingComment": "Comment (Optional)",
        "situationHandling": "Are patrol officers prepared to handle various situations professionally and effectively, including confrontations, medical emergencies, or crisis situations?",
        "situationHandlingComment": "Comment (Optional)",
        //SafetyAndSecurityTraining.js
        "trainingPrograms": "What training programs are available for staff to understand safety and security protocols during emergencies?",
        "trainingFrequency": "How frequently are safety and security training sessions conducted for employees and stakeholders?",
        "trainingAssessmentMethods": "What methods are used to assess the effectiveness of safety and security training programs?",
        "trainingCustomization": "How is training tailored to meet the specific needs of different roles within the organization?",
        "ongoingEducationResources": "What resources are provided to staff for ongoing education about safety and security best practices?",
        //SafetyDemonstrations
        "safetyDemonstrationsFrequency": "How frequently are safety demonstrations conducted within the school or educational institution, and which safety topics are covered?",
        "safetyDemonstrationsIntegration": "Are safety demonstrations integrated into regular classroom instruction, special assemblies, or designated safety awareness events?",
        "safetyDemonstrationsIntegrationComment": "Comment (Optional)",
        "safetyDemonstrationsTopics": "What range of safety topics are addressed in the demonstrations, such as fire safety, first aid basics, personal safety, or disaster preparedness?",
        "demonstrationTechniques": "What techniques or methods are used to deliver safety demonstrations to students, staff, and other stakeholders?",
        "demonstrationTechniquesMethods": "Are live demonstrations, video presentations, interactive simulations, or hands-on activities employed to engage participants in learning about safety practices?",
        "demonstrationTechniquesMethodsComment": "Comment (Optional)",
        "safetyDemonstrationsAdaptation": "How are safety demonstrations adapted to accommodate different learning styles, age groups, and cultural backgrounds of participants?",
        "qualifiedInstructors": "Are demonstrations facilitated by qualified instructors or safety professionals with expertise in the specific safety topics being covered?",
        "qualifiedInstructorsComment": "Comment (Optional)",
        "practicalSafetySkills": "Do safety demonstrations include opportunities for participants to practice and apply safety skills in simulated or real-life scenarios?",
        "practicalSafetySkillsComment": "Comment (Optional)",
        "activeParticipantInvolvement": "Are participants actively involved in performing tasks such as operating fire extinguishers, administering basic first aid, or evacuating buildings during drills?",
        "activeParticipantInvolvementComment": "Comment (Optional)",
        "demonstrationStructure": "How are safety demonstrations structured to promote skill development, confidence building, and retention of safety knowledge among participants?",
        "followUpActivities": "Are follow-up activities or assessments conducted to reinforce learning and assess participants' mastery of safety concepts and skills demonstrated?",
        "demonstrationReinforcement": "How are safety demonstrations reinforced and reviewed beyond the initial presentation to ensure long-term retention and application of safety knowledge?",
        "reviewSessions": "Are review sessions, quizzes, or interactive discussions conducted to revisit key safety concepts and reinforce learning points covered in the demonstrations?",
        "reviewSessionsComment": "Comment (Optional)",
        "safetyPracticesIncorporation": "What strategies are employed to encourage participants to incorporate safety practices into their daily routines and habits following the demonstrations?",
        "refresherCourses": "Are refresher courses or ongoing training opportunities provided to maintain and update participants' proficiency in safety procedures over time?",
        "refresherCoursesComment": "Comment (Optional)",
        "feedbackMechanisms": "Are mechanisms in place to gather feedback from participants regarding their experience and effectiveness of safety demonstrations?",
        "suggestionsIncorporation": "How are suggestions or concerns raised by participants regarding safety demonstrations addressed and incorporated into future presentations?",
        "periodicEvaluations": "Are periodic evaluations or assessments conducted to measure the impact of safety demonstrations on participants' safety awareness, behavior, and preparedness?",
        "periodicEvaluationsComment": "Comment (Optional)",
        "continuousImprovementMeasures": "What measures are taken to continuously improve the content, delivery methods, and overall quality of safety demonstrations based on feedback and evaluation findings?",
        //SafetyWorkshops.js
        "workshopPlanningProcess": "How are safety workshops and educational events for parents planned, organized, and coordinated within the school or educational institution?",
        "selectionCriteriaTopicsSpeakers": "What criteria are used to select topics, speakers, and formats for parent education events, and how are they aligned with the safety needs and concerns of the school community?",
        "eventsIntegratedWithPrograms": "Are parent education events integrated into broader community engagement initiatives, school calendars, or existing parent involvement programs?",
        "eventsIntegratedWithProgramsComment": "Comment (Optional)",
        "safetyTopicsCovered": "What specific safety topics are covered in parent education events, such as emergency preparedness, home safety, cyber safety, or substance abuse prevention?",
        "contentDevelopmentProcess": "How is the content of safety workshops developed or curated to ensure relevance, accuracy, and effectiveness in addressing the information needs and concerns of parents?",
        "materialsProvidedToParents": "Are materials, resources, or take-home materials provided to parents to reinforce key safety messages and facilitate ongoing learning beyond the events?",
        "effortsToEncourageParticipation": "How are efforts made to encourage parent participation and engagement in safety workshops and educational events?",
        "communicationAndOutreachChannels": "What communication channels, outreach methods, or incentives are used to promote parent attendance, solicit feedback, and gauge interest in specific safety topics or initiatives?",
        "eventsAccommodateDiverseNeeds": "Are parent education events designed to accommodate diverse schedules, preferences, and accessibility needs of parents, such as offering multiple session times, language options, or virtual participation?",
        "eventsAccommodateDiverseNeedsComment": "Comment (Optional)",
        "interactiveLearningStructure": "How are parent education events structured to facilitate interactive learning, discussion, and skill-building among participants?",
        "handsOnActivitiesIncluded": "Are workshops designed to incorporate hands-on activities, group discussions, case studies, or role-playing exercises to deepen understanding and retention of safety concepts?",
        "handsOnActivitiesIncludedComment": "Comment (Optional)",
        "practicalSkillsStrategiesForParents": "What strategies are employed to empower parents with practical skills, resources, and strategies they can implement at home to enhance family safety and emergency preparedness?",
        "externalCollaborationMethods": "How do schools collaborate with external partners, such as community organizations, local agencies, or subject matter experts, to enhance the quality and impact of parent education events?",
        "successfulCollaborationsExamples": "Can you provide examples of successful collaborations or joint initiatives that have enriched the content, reach, or engagement of safety workshops for parents?",
        "partnershipContributionToEducation": "In what ways do partnerships with external stakeholders contribute to the sustainability, diversity, and cultural relevance of parent education efforts within the school community?",
        //ScenarioBasedTraining.js
        "scenarioDevelopmentDescription": "How are scenarios for scenario-based training developed, and are they based on realistic and relevant emergency situations?",
        "scenarioSpecificity": "Are scenarios tailored to address specific threats or hazards that staff members may encounter in their roles or environments?",
        "scenarioDesignConsiderations": "What considerations are taken into account when designing scenarios, such as the organization's risk profile, industry standards, or regulatory requirements?",
        "scenarioCategorization": "Are scenarios categorized based on severity levels or types of emergencies to ensure comprehensive training coverage?",
        "scenarioDocumentationProcess": "How are scenario development processes documented and reviewed to maintain consistency and quality?",
        "scenarioSessionConduct": "How are scenario-based training sessions conducted, and what methods or tools are used to simulate emergency situations?",
        "scenarioIntegration": "Are scenarios integrated into tabletop exercises, simulations, or full-scale drills to provide a range of training experiences?",
        "scenarioResources": "What resources or support are provided to ensure the safe and effective execution of scenario-based training sessions?",
        "scenarioContingencyPlans": "Are contingency plans in place to address unexpected issues or challenges that may arise during scenario implementation?",
        "scenarioUpdates": "How are scenarios modified or updated over time to reflect changes in organizational needs or emerging threats?",
        "participantEngagement": "How are staff members engaged and involved in scenario-based training exercises to maximize learning outcomes?",
        "activeParticipation": "Are participants encouraged to actively participate in scenarios by making decisions, taking actions, and communicating effectively with team members?",
        "participantConcernsMeasures": "What measures are in place to address any concerns or anxieties that staff members may have about participating in scenario-based training?",
        "scenarioTeamwork": "Are scenarios designed to promote teamwork, collaboration, and effective communication among participants?",
        "feedbackIntegration": "How are participant feedback and suggestions incorporated into the design and delivery of scenario-based training activities?",
        "learningObjectives": "What specific learning objectives are targeted through scenario-based training, and how are these objectives communicated to participants?",
        "reinforceKeyConcepts": "Are scenarios designed to reinforce key concepts, procedures, or protocols related to emergency response and crisis management?",
        "outcomesEvaluation": "How are learning outcomes assessed and evaluated to ensure that participants have achieved the desired competencies and skills?",
        "performanceMetrics": "Are performance metrics used to measure the effectiveness of scenario-based training in meeting established learning objectives?",
        "knowledgeAssessment": "How are participant knowledge and skills assessed before and after scenario-based training to measure improvement and identify areas for further development?",
        "debriefingSessions": "Is there a structured process for debriefing participants following scenario-based training exercises, and how are debriefing sessions facilitated?",
        "constructiveFeedback": "Are participants provided with constructive feedback and opportunities for reflection on their performance during scenarios?",
        "lessonsLearnedDocumentation": "How are lessons learned from scenario-based training exercises documented and incorporated into future training plans or improvements?",
        "debriefingImprovement": "Are debriefing sessions used to identify strengths, weaknesses, and areas for improvement in individual and team performance?",
        "feedbackEnhancementMechanisms": "What mechanisms are in place to ensure that feedback from participants is used to enhance the effectiveness and relevance of scenario-based training activities?",
        "scenarioVariation": "How are scenarios varied in terms of complexity, duration, and intensity to provide a diverse training experience?",
        "scenarioAdjustment": "Are scenarios adjusted based on the skill levels, roles, and responsibilities of participants to ensure appropriate challenge and engagement?",
        "complexityStrategies": "What strategies are used to gradually increase the complexity of scenarios as participants progress through training programs?",
        "realisticSimulations": "Are scenarios designed to simulate realistic stressors and environmental factors that participants may encounter during actual emergencies?",
        "considerationMeasures": "How are potential ethical, legal, or psychological considerations addressed when developing and implementing complex scenarios?",
        "integrationEmergencyPlans": "How are scenario-based training activities aligned with the organization's emergency response plans, procedures, and protocols?",
        "testEmergencyComponents": "Are scenarios designed to test specific components of emergency plans, such as evacuation procedures, communication protocols, or incident command structures?",
        "trainingLessonsMeasures": "What measures are in place to ensure that lessons learned from scenario-based training exercises are incorporated into emergency planning and preparedness efforts?",
        "emergencyTeamInvolvement": "Are emergency response teams or personnel involved in scenario development and implementation to ensure alignment with operational needs and priorities?",
        "outcomesValidation": "How are scenario-based training outcomes used to validate and enhance the effectiveness of emergency plans and procedures?",
        //SecureEmailGateways.js
        "fileEncryptionImplementation": "How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?",
        "encryptionConsistency": "Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?",
        "encryptionConsistencyComment": "Comment (Optional)",
        "toolsForEncryption": "What tools or software are used for file-level encryption, and how are they integrated into existing workflows?",
        "encryptionStandards": "What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?",
        "encryptionConfiguration": "How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?",
        "keyManagementSecure": "Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?",
        "keyManagementSecureComment": "Comment (Optional)",
        "accessControls": "How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?",
        "permissionsReviewed": "Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?",
        "permissionsReviewedComment": "Comment (Optional)",
        "sharedEnvironmentControl": "How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?",
        "complianceMonitoring": "How is compliance with file-level encryption policies monitored and enforced within the organization?",
        "regularAudits": "Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?",
        "regularAuditsComment": "Comment (Optional)",
        "detectionMechanisms": "What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?",
        "recoveryProcedures": "What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?",
        "keyPasswordManagement": "How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?",
        "contingencyPlans": "Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?",
        //SecurityGates
        "authMechanisms": "Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?",
        "authMechanismsComment": "Comment (Optional)",
        "integratedSystems": "Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?",
        "integratedSystemsComment": "Comment (Optional)",
        "logEntries": "Is there a log of entries and exits through the security gates for monitoring and auditing purposes?",
        "logEntriesComment": "Comment (Optional)",
        "safetyFeatures": "Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?",
        "safetyFeaturesComment": "Comment (Optional)",
        "trapHazards": "Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?",
        "trapHazardsComment": "Comment (Optional)",
        "safetySignage": "Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?",
        "safetySignageComment": "Comment (Optional)",
        "complianceRegulations": "Do the security gates comply with relevant safety and security regulations, codes, and standards?",
        "complianceRegulationsComment": "Comment (Optional)",
        "inspectionsCertifications": "Have the gates undergone any inspections or certifications to verify compliance with applicable standards?",
        "inspectionsCertificationsComment": "Comment (Optional)",
        "maintenanceSchedule": "Is there a regular maintenance schedule in place for the security gates?",
        "maintenanceScheduleComment": "Comment (Optional)",
        "maintenanceTasks": "Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?",
        "maintenanceTasksComment": "Comment (Optional)",
        "maintenanceRecords": "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?",
        "maintenanceRecordsComment": "Comment (Optional)",
        "userTraining": "Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?",
        "userTrainingComment": "Comment (Optional)",
        "instructionsGuidelines": "Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?",
        "instructionsGuidelinesComment": "Comment (Optional)",
        "reportingProcess": "Is there a process for reporting malfunctions, damage, or security incidents related to the gates?",
        "reportingProcessComment": "Comment (Optional)",
        //SecurityInformationAndEventManagement.js
        "siemIntegration": "How is the SIEM solution integrated with other security systems and tools within the organization (e.g., firewalls, intrusion detection systems)?",
        "siemScope": "What is the scope of the SIEM deployment, and does it cover all critical systems, applications, and network segments?",
        "siemCoverageGaps": "Are there any gaps in coverage or areas where SIEM integration is lacking?",
        "siemCoverageGapsComment": "Comment (Optional)",
        "eventLogs": "What types of security events and logs are collected by the SIEM solution (e.g., network traffic, system logs, application logs)?",
        "eventCorrelation": "How does the SIEM solution correlate events from different sources to identify potential security incidents or threats?",
        "eventPrioritizationRules": "Are there specific rules or algorithms used to prioritize and filter events based on their severity or relevance?",
        "realTimeMonitoring": "Does the SIEM solution provide real-time monitoring and alerting capabilities for detected security events and incidents?",
        "realTimeMonitoringComment": "Comment (Optional)",
        "alertConfiguration": "How are alerts configured and managed to minimize false positives and ensure timely detection of genuine threats?",
        "alertInvestigation": "What is the process for responding to and investigating alerts generated by the SIEM solution?",
        "incidentDetectionEffectiveness": "How effective is the SIEM solution in detecting and identifying various types of security incidents (e.g., malware infections, unauthorized access)?",
        "incidentWorkflowsIntegrated": "Are there predefined incident response procedures and workflows integrated with the SIEM solution to guide the response to detected incidents?",
        "incidentWorkflowsIntegratedComment": "Comment (Optional)",
        "incidentResponseEffectiveness": "How is the effectiveness of incident detection and response measured and evaluated?",
        "dataRetentionPolicy": "What is the policy for data storage and retention within the SIEM solution, including the duration for retaining logs and security events?",
        "dataIntegrityMaintenance": "How is the integrity and confidentiality of stored data maintained to prevent unauthorized access or tampering?",
        "dataArchivingProcess": "Are there processes in place for securely archiving or deleting outdated or obsolete data?",
        "dataArchivingProcessComment": "Comment (Optional)",
        "siemReports": "What types of reports and dashboards are available through the SIEM solution, and how are they used for security analysis and decision-making?",
        "reportFrequency": "How often are reports generated, and are they reviewed by security personnel or management to assess the overall security posture?",
        "customReports": "Are there capabilities for customizing reports and analysis to address specific security concerns or requirements?",
        "siemMaintenance": "What is the process for maintaining and updating the SIEM solution, including applying patches, updates, and new threat intelligence feeds?",
        "siemEffectivenessAudit": "How is the SIEM solution evaluated for effectiveness, and are there regular assessments or audits to ensure its continued relevance and performance?",
        "siemUpgradePlans": "Are there plans for upgrading or expanding the SIEM solution to enhance its capabilities or address emerging security threats?",
        "siemUpgradePlansComment": "Comment (Optional)",
        //SevereWeatherMonitoring.js
        "alertSystemsOperational": "Are weather alert systems installed and operational within the facility?",
        "alertSystemsOperationalComment": "Comment (Optional)",
        "timelyNotificationsProvided": "Do alert systems provide timely notifications of severe weather events, including tornadoes, thunderstorms, hurricanes, or other hazards?",
        "timelyNotificationsProvidedComment": "Comment (Optional)",
        "multiChannelBroadcasts": "Are alert systems capable of broadcasting alerts through various communication channels, such as sirens, public address systems, text messages, or mobile apps?",
        "multiChannelBroadcastsComment": "Comment (Optional)",
        "externalSourceLink": "Is the facility connected to external weather monitoring services or agencies for receiving up-to-date weather forecasts and warnings?",
        "externalSourceLinkComment": "Comment (Optional)",
        "automaticAlertRelay": "Are alert systems configured to automatically receive and relay weather alerts issued by national or local weather authorities?",
        "automaticAlertRelayComment": "Comment (Optional)",
        "alertSystemRedundancy": "Is there redundancy built into alert systems to ensure reliable reception and dissemination of weather alerts, even during power outages or network disruptions?",
        "alertSystemRedundancyComment": "Comment (Optional)",
        "activationProtocolsSet": "Are there established protocols for activating weather alert systems based on the severity and proximity of approaching weather events?",
        "activationProtocolsSetComment": "Comment (Optional)",
        "designatedPersonnelAuthority": "Do designated personnel have the authority and training to initiate alert activations in accordance with established protocols?",
        "designatedPersonnelAuthorityComment": "Comment (Optional)",
        "alertVerificationProcess": "Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?",
        "alertVerificationProcessComment": "Comment (Optional)",
        "promptAlertCommunication": "Are weather alerts communicated promptly to all occupants and stakeholders within the facility?",
        "promptAlertCommunicationComment": "Comment (Optional)",
        "tailoredCommunicationMethods": "Are communication methods used to relay weather alerts tailored to the preferences and accessibility needs of different occupants, such as visual, auditory, or text-based alerts?",
        "tailoredCommunicationMethodsComment": "Comment (Optional)",
        "authenticityVerification": "Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?",
        "authenticityVerificationComment": "Comment (Optional)",
        "responseProceduresSet": "Are response procedures established for different types of severe weather events, such as tornadoes, hurricanes, floods, or lightning storms?",
        "responseProceduresSetComment": "Comment (Optional)",
        "specificActionsDefined": "Do response procedures outline specific actions to be taken by occupants, staff members, and security personnel in response to weather alerts?",
        "specificActionsDefinedComment": "Comment (Optional)",
        "procedureReviewCycle": "Are response procedures regularly reviewed and updated based on lessons learned from past incidents or changes in weather patterns?",
        "procedureReviewCycleComment": "Comment (Optional)",
        "occupantTrainingProvided": "Are staff members and occupants trained on how to interpret weather alerts and respond appropriately during severe weather events?",
        "occupantTrainingProvidedComment": "Comment (Optional)",
        "trainingMaterialAvailability": "Are training materials and resources provided to educate occupants on sheltering procedures, evacuation routes, and other safety measures related to severe weather?",
        "trainingMaterialAvailabilityComment": "Comment (Optional)",
        "drillSimulationConducted": "Are drills or simulations conducted periodically to practice response procedures and ensure readiness for severe weather emergencies?",
        "drillSimulationConductedComment": "Comment (Optional)",
        "systemEvaluationProcess": "Is there a process for evaluating the effectiveness of weather alert systems and response procedures?",
        "systemEvaluationProcessComment": "Comment (Optional)",
        "feedbackMechanismsActive": "Are feedback mechanisms in place to gather input from occupants and stakeholders on the timeliness and clarity of weather alerts and response efforts?",
        "feedbackMechanismsActiveComment": "Comment (Optional)",
        "improvementRecommendationsUsed": "Are recommendations from evaluations and feedback used to improve weather monitoring systems, communication protocols, and preparedness for future severe weather events?",
        "improvementRecommendationsUsedComment": "Comment (Optional)",
        //SevereWeatherPreparedness.js
        "weatherEducation": "How are students educated about the potential risks associated with severe weather events such as tornadoes, hurricanes, thunderstorms, or floods, including the specific threats posed to their geographic location and the school environment?",
        "weatherWarningSigns": "Are students taught to recognize the warning signs of impending severe weather conditions, such as changes in sky color, cloud formations, temperature, or wind patterns, and to take proactive measures to stay informed and prepared for possible emergencies?",
        "weatherWarningSignsComment": "Comment (Optional)",
        "weatherAlertProcedures": "What procedures are in place to promptly disseminate severe weather alerts and advisories to students and staff, utilizing multiple communication channels such as public address systems, digital displays, mobile alerts, or weather radios to ensure widespread awareness and timely response?",
        "weatherResponseTraining": "How are students trained to respond to severe weather alerts, including the importance of seeking shelter in designated safe areas, moving away from windows or glass doors, and assuming protective positions to minimize exposure to flying debris or potential hazards?",
        "shelteringProtocols": "Are students familiarized with the specific sheltering and safety protocols associated with different types of severe weather events, such as tornado safety procedures involving seeking shelter in interior rooms or reinforced areas on lower levels of the building, away from exterior walls, doors, and windows?",
        "shelteringProtocolsComment": "Comment (Optional)",
        "weatherInstructions": "How are students instructed on the appropriate actions to take during severe weather events, including how to crouch low, cover their heads, and protect themselves from falling or flying objects while sheltering in place until the threat has passed or further instructions are provided?",
        "evacuationPlans": "What plans are in place for evacuating students and staff from outdoor areas, temporary structures, or portable classrooms in anticipation of severe weather threats, ensuring that all individuals are directed to safe, predetermined assembly points or designated storm shelters in a prompt and orderly manner?",
        "evacuationTraining": "How are students trained to navigate evacuation routes, avoid potential hazards such as downed power lines or flooded areas, and follow instructions from designated personnel or emergency responders to facilitate a safe and efficient evacuation process?",
        "postEventEvaluation": "Are students given the opportunity to participate in post-event evaluations or debriefing sessions following severe weather incidents, allowing them to share their observations, experiences, and feedback on the effectiveness of sheltering procedures, communication protocols, and staff response efforts?",
        "postEventEvaluationComment": "Comment (Optional)",
        "studentInput": "How are student perspectives and insights from severe weather drills and real-world events used to inform ongoing safety planning, infrastructure improvements, or emergency preparedness initiatives aimed at enhancing the school's resilience and response capabilities to future severe weather events?",
        "concernsAddressed": "What measures are taken to address any concerns, questions, or misconceptions raised by students during post-event debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of future severe weather emergencies?",
        //SignatureBasedDetection.js
        "databaseUpdateFrequency": "How frequently is the signature database updated to include the latest known attack patterns and vulnerabilities?",
        "signatureSources": "What sources are used to gather new signatures for the IDS, and how is the credibility and reliability of these sources ensured?",
        "customSignatures": "Are there mechanisms in place to create custom signatures based on specific threats faced by the organization?",
        "customSignaturesComment": "Comment (Optional)",
        "detectionCoverage": "How comprehensive is the IDS in detecting a wide range of known attack patterns, including zero-day vulnerabilities and emerging threats?",
        "performanceBalance": "What measures are in place to balance detection accuracy with performance, ensuring the IDS does not overly tax network resources?",
        "coverageGaps": "Are there any gaps in signature coverage for specific types of attacks or network protocols, and how are these addressed?",
        "alertPrioritization": "How are alerts generated by signature-based detections prioritized, and what criteria determine the severity of an alert?",
        "responseProcedure": "What is the standard operating procedure for responding to alerts triggered by known attack patterns, and who is responsible for initiating the response?",
        "falsePositiveReduction": "Are there measures in place to reduce the occurrence of false positives, and how is the accuracy of alerts verified?",
        "integrationWithTools": "How well does the signature-based IDS integrate with other cybersecurity tools, such as SIEM (Security Information and Event Management) systems, firewalls, and endpoint protection solutions?",
        "scalability": "Can the IDS scale effectively with the network, accommodating increases in traffic and changes in network architecture without a loss of detection capability?",
        "scalabilityComment": "Comment (Optional)",
        "encryptedTrafficHandling": "How is the IDS configured to handle encrypted traffic, ensuring visibility into potential threats without compromising data privacy?",
        "effectivenessTesting": "How regularly is the effectiveness of signature-based detection tested, and what methods (e.g., penetration testing, red teaming) are used to evaluate its capabilities?",
        "signatureRefinement": "Is there a process for reviewing and refining detection signatures based on feedback from incident investigations and threat intelligence updates?",
        "signatureRefinementComment": "Comment (Optional)",
        "lessonsLearned": "How are lessons learned from past incidents and detected threats incorporated into the ongoing development and improvement of the signature database?",
        //SimulatedEmergencyDrills.js
        "simulatedEmergencies": "What types of emergencies are simulated during the drills (e.g., fire, active shooter, natural disasters)?",
        "conductedSimulatedDrills": "How frequently are simulated emergency drills conducted to ensure staff and student preparedness?",
        "staffRoles": "What roles do staff and students play during these drills, and how is their participation evaluated?",
        "analyzedDrillResults": "How are the results of the simulated drills analyzed to identify areas for improvement in emergency response?",
        "updatedPlans": "What changes or updates have been made to emergency plans as a result of insights gained from previous drills?",
        //SimulatedPhishingCampaigns.js
        "phishingDesign": "How are simulated phishing campaigns designed to reflect realistic phishing threats and tactics?",
        "phishingCriteria": "What criteria are used to select the timing, frequency, and targets of these simulated phishing campaigns?",
        "emailDifficultyVariety": "Are the simulated phishing emails varied in difficulty to test different levels of user awareness and susceptibility?",
        "emailDifficultyVarietyComment": "Comments",
        "userResponseTracking": "How are user responses to simulated phishing attempts tracked and analyzed to identify trends and common vulnerabilities?",
        "feedbackMechanism": "Is there an immediate feedback mechanism in place to inform users whether they have successfully identified a phishing attempt or fallen for the simulation?",
        "feedbackMechanismComment": "Comments",
        "userFeedbackIncorporation": "How is user feedback incorporated into improving the design and effectiveness of future simulated phishing campaigns?",
        "trainingResources": "Are users provided with training or resources after a simulated phishing campaign to help them better identify phishing attempts in the future?",
        "trainingResourcesComment": "Comments",
        "trainingUpdateFrequency": "How often is phishing awareness training updated to reflect the latest phishing tactics and trends?",
        "followUpTraining": "Is there a follow-up process to ensure that users who fail the simulation receive additional training or support?",
        "followUpTrainingComment": "Comments",
        "campaignMetrics": "What metrics are used to evaluate the effectiveness of simulated phishing campaigns (e.g., click rates, reporting rates, repeat offenders)?",
        "metricsReporting": "How are these metrics reported to stakeholders, and are they used to inform cybersecurity policies and procedures?",
        "benchmarkingProcess": "Is there a process for benchmarking these metrics against industry standards or previous campaign results to measure improvement over time?",
        "benchmarkingProcessComment": "Comments",
        "campaignResultsImprovement": "How are the results of simulated phishing campaigns used to continuously improve phishing awareness and training programs?",
        "simulationUpdates": "Are there regular reviews and updates to the simulation content to adapt to new phishing techniques and emerging threats?",
        "simulationUpdatesComment": "Comments",
        "campaignEngagement": "How does the organization ensure that the simulated phishing campaigns remain challenging and engaging for users to prevent complacency?",
        "itSecurityInvolvement": "How are the IT and security teams involved in the planning and execution of simulated phishing campaigns?",
        "securityAnalysisProcess": "Is there a process for these teams to analyze data from simulations to identify potential security gaps or areas for improvement?",
        "securityAnalysisProcessComment": "Comments",
        "teamCoordination": "How does coordination with these teams enhance the overall effectiveness of the phishing simulation program?",
        "phishingImpactStrategy": "How do simulated phishing campaigns contribute to the organization’s broader cybersecurity strategy?",
        "impactAssessment": "Are there measures in place to assess the impact of these campaigns on reducing real-world phishing incidents?",
        "impactAssessmentComment": "Comments",
        "phishingProgramSuccess": "How is the success of the phishing simulation program linked to other user awareness and cybersecurity initiatives within the organization?",
        //SpeakerLocations.js
        "strategicallyLocatedSpeakers": "Are public address (PA) system speakers strategically located throughout the school to ensure comprehensive coverage?",
        "minimizingDeadZones": "Have speaker locations been assessed to minimize dead zones or areas with poor sound quality?",
        "speakerPositioning": "Are speakers positioned in key areas such as classrooms, hallways, common areas, and outdoor spaces to reach all occupants?",
        "deliveringAudioMessages": "Is the PA system capable of delivering clear and intelligible audio messages throughout the school?",
        "annoucementMeasures": "Have measures been taken to ensure that announcements are audible over ambient noise and distractions?",
        "adjustedSpeakerVolumes": "Are speaker volumes adjusted to appropriate levels to prevent discomfort or distortion?",
        "redundancyFeatures": "Is the PA system equipped with redundancy features to ensure continued operation in the event of equipment failures or power outages?",
        "backupPowerSources": "Are backup power sources, such as batteries or generators, available to support the PA system during emergencies?",
        "reliabilityTesting": "Is the PA system regularly tested to verify its reliability and functionality, including speaker performance and signal transmission?",
        "draftingProcedures": "Are procedures established for drafting and delivering emergency messages over the PA system?",
        "trainedSystemOperators": "Are PA system operators trained on message content, delivery techniques, and protocols for initiating alerts and announcements?",
        "standardizedEmergencyMessages": "Is there a standardized format for emergency messages to ensure clarity, consistency, and effectiveness?",
        "integratedSystem": "Is the PA system integrated into broader emergency communication and response plans?",
        "coordinatedAlerts": "Are PA system alerts coordinated with other communication channels and alert systems to ensure timely and coherent messaging?",
        "systemProcedures": "Are PA system procedures aligned with emergency protocols for specific scenarios, such as evacuations, lockdowns, or sheltering?",
        "emergencyMessagingAccommodations": "Have accommodations been made to ensure that emergency messages delivered via the PA system are accessible to individuals with disabilities?",
        "alternativeCommunicationMethods": "Are alternative communication methods available for individuals who may have difficulty hearing or understanding PA system announcements?",
        "languageBarrierProcedures": "Have procedures been established to address language barriers or other communication needs during emergencies?",
        "maintainingSpeakers": "Is the PA system regularly maintained to keep speakers in good working condition and address any issues promptly?",
        "routineTests": "Are routine tests and inspections conducted to verify the functionality of the PA system, including speaker performance and audio quality?",
        "maintainingDocuments": "Are records maintained to document maintenance activities, tests, and any corrective actions taken to address deficiencies?",
        "strategicallyLocatedSpeakersComment": "Additional comments",
        "minimizingDeadZonesComment": "Additional comments",
        "speakerPositioningComment": "Additional comments",
        "deliveringAudioMessagesComment": "Additional comments",
        "annoucementMeasuresComment": "Additional comments",
        "adjustedSpeakerVolumesComment": "Additional comments",
        "redundancyFeaturesComment": "Additional comments",
        "backupPowerSourcesComment": "Additional comments",
        "reliabilityTestingComment": "Additional comments",
        "draftingProceduresComment": "Additional comments",
        "trainedSystemOperatorsComment": "Additional comments",
        "standardizedEmergencyMessagesComment": "Additional comments",
        "integratedSystemComment": "Additional comments",
        "coordinatedAlertsComment": "Additional comments",
        "systemProceduresComment": "Additional comments",
        "emergencyMessagingAccommodationsComment": "Additional comments",
        "alternativeCommunicationMethodsComment": "Additional comments",
        "languageBarrierProceduresComment": "Additional comments",
        "maintainingSpeakersComment": "Additional comments",
        "routineTestsComment": "Additional comments",
        "maintainingDocumentsComment": "Additional comments",
        //SRORolesAndResponsibilities.js
        "sroDuties": "What specific duties do School Resource Officers (SROs) perform within the school environment?",
        "srosCollaborating": "How do SROs collaborate with school administration and staff to enhance safety?",
        "requiredTraining": "What training or qualifications are required for SROs working in schools?",
        "sroEmergencyPrepareness": "How do SROs contribute to emergency preparedness and response planning?",
        "sroEngagingWithStudents": "In what ways do SROs engage with students to build trust and rapport within the school community?",
        //SROTrainingAndCertification.js
        "coreComponents": "What are the core components of the training curriculum for School Resource Officers (SROs)?",
        "trainingUpdates": "How often do SROs undergo training and certification updates to stay current with best practices?",
        "requiredSpecializedTraining": "What specialized training is required for SROs in areas such as conflict resolution and mental health awareness?",
        "trainingPrograms": "How do training programs ensure that SROs are equipped to handle emergencies and critical incidents in schools?",
        "certificationPrograms": "Are there any certification programs specifically tailored for SROs, and what do they entail?",
        //StaffInputOnPolicyImpact.js
        "feedbackMethods": "What methods are used to collect staff feedback on the effectiveness of security policies?",
        "surveyFrequency": "How often are staff surveys or focus groups conducted to assess policy impact?",
        "staffEncouragement": "In what ways are staff encouraged to share their experiences with existing policies?",
        "feedbackIncorporation": "How is staff feedback incorporated into the policy revision process?",
        "followUpActions": "What follow-up actions are taken after collecting staff input to address concerns or suggestions?",
        //StaffRolesAndResponsibilities.js
        "Role Specificity": "Are staff members assigned specific roles and responsibilities during drills, such as evacuation team leaders, floor wardens, or first aid responders?",
        "Role Communication": "Are these assignments communicated to staff members in advance, along with clear expectations for their roles and duties?",
        "Role Training": "Are staff members trained on their assigned roles and responsibilities before participating in drills?",
        "Training Materials": "Are training materials provided to educate staff members on their duties, procedures, and communication protocols during drills?",
        "Practice Feedback": "Are staff members given opportunities to practice their roles and receive feedback on their performance?",
        "Coordination System": "Is there a system in place for coordinating the actions of staff members during drills, including communication channels and protocols?",
        "Effective Communication": "Are staff members instructed on how to communicate effectively with each other, as well as with occupants, emergency responders, and management personnel?",
        "Leadership Oversight": "Are designated leaders or coordinators appointed to oversee the execution of staff roles and facilitate communication during drills?",
        "Performance Monitoring": "Is there a process for monitoring the performance of staff members in their assigned roles during drills?",
        "Observer Assessment": "Are supervisors or observers tasked with assessing staff members' adherence to procedures, teamwork, and effectiveness in carrying out their responsibilities?",
        "Feedback Process": "Is feedback provided to staff members after drills to recognize commendable efforts and identify areas for improvement?",
        "Adaptability Training": "Are staff members prepared to adapt to changing circumstances or unexpected events during drills?",
        "Contingency Plans": "Are contingency plans established to address deviations from standard procedures or the need for improvised responses?",
        "Creative Problem-Solving": "Are staff members encouraged to exercise initiative and creativity in problem-solving and decision-making during drills?",
        "Plan Alignment": "Are staff roles and responsibilities aligned with the broader emergency response plans and protocols of the facility?",
        "Framework Understanding": "Do staff members understand how their roles fit into the overall emergency response framework and support the safety and well-being of occupants?",
        "Role Updates": "Are staff roles regularly reviewed and updated in conjunction with changes to emergency response plans or organizational structure?",
        "Record Maintenance": "Are records maintained to document staff assignments, actions, and performance during drills?",
        "Drill Review": "Are drill records reviewed periodically to assess the effectiveness of staff roles and identify opportunities for enhancement?",
        "Evaluation Recommendations": "Are recommendations from drill evaluations used to refine staff roles and responsibilities, as well as associated training and preparation efforts?",
        "Role SpecificityComment": "Comments",
        "Role CommunicationComment": "Comments",
        "Role TrainingComment": "Comments",
        "Training MaterialsComment": "Comments",
        "Practice FeedbackComment": "Comments",
        "Coordination SystemComment": "Comments",
        "Effective CommunicationComment": "Comments",
        "Leadership OversightComment": "Comments",
        "Performance MonitoringComment": "Comments",
        "Observer AssessmentComment": "Comments",
        "Feedback ProcessComment": "Comments",
        "Adaptability TrainingComment": "Comments",
        "Contingency PlansComment": "Comments",
        "Creative Problem-SolvingComment": "Comments",
        "Plan AlignmentComment": "Comments",
        "Framework UnderstandingComment": "Comments",
        "Role UpdatesComment": "Comments",
        "Record MaintenanceComment": "Comments",
        "Drill ReviewComment": "Comments",
        "Evaluation RecommendationsComment": "Comments",
        //StationedGuards.js
        "training": "Have security guards received adequate training in security procedures, emergency response, and conflict resolution?",
        "certified": "Are they certified or licensed to work as security personnel in your jurisdiction?",
        "ongoingTraining": "Do they receive ongoing training to stay updated on security protocols and best practices?",
        "professionalism": "Do security guards demonstrate professionalism, courtesy, and respect when interacting with students, staff, and visitors?",
        "uniformed": "Are they properly uniformed and equipped to perform their duties effectively?",
        "codesOfConduct": "Do they adhere to established codes of conduct and ethical standards?",
        "vigilant": "Are security guards vigilant and observant of their surroundings, identifying and reporting any suspicious activities or security concerns?",
        "patrols": "Do they conduct regular patrols and inspections of the premises to deter unauthorized access and monitor for potential threats?",
        "incidentReports": "Are incident reports accurately documented and promptly submitted following security incidents or breaches?",
        "emergencyResponse": "Are security guards trained to respond effectively to emergencies, such as medical emergencies, fires, or security breaches?",
        "lockdownProcedures": "Do they know how to initiate lockdown procedures, evacuate occupants, and coordinate with emergency services?",
        "communicationProtocols": "Are there established communication protocols for security guards to report emergencies and request assistance?",
        "accessControl": "Do security guards enforce access control measures, verifying the identity of individuals and ensuring they have proper authorization to enter?",
        "visitorManagement": "Are visitor management procedures in place, including registration, issuance of visitor badges, and monitoring of visitor activities?",
        "confrontationalSituations": "Are security guards trained to handle confrontational situations or unauthorized entry attempts diplomatically and assertively?",
        "collaboration": "Do security guards collaborate effectively with other stakeholders, such as school administrators, law enforcement, and emergency responders?",
        "communicationDevices": "Are they able to communicate clearly and efficiently using two-way radios, phones, or other communication devices?",
        "meetings": "Are there regular meetings or debriefings to discuss security issues, share information, and coordinate activities?",
        "compliance": "Do security guards comply with relevant regulations, laws, and industry standards governing security operations?",
        "regulatoryRequirements": "Are there specific requirements or guidelines for security guards outlined by regulatory authorities or industry associations that need to be met?",
        "audits": "Are security guard services subject to audits, inspections, or certifications to verify compliance with applicable standards?",
        "performanceEvaluation": "Is there a process for evaluating the performance of security guards, providing feedback, and addressing any areas for improvement?",
        "incentives": "Are security guard contracts or agreements structured to incentivize high performance and accountability?",
        "feedback": "Are there mechanisms for receiving feedback from students, staff, and visitors regarding the effectiveness and professionalism of security guards?",
        "trainingComment": "Comments",
        "certifiedComment": "Comments",
        "ongoingTrainingComment": "Comments",
        "professionalismComment": "Comments",
        "uniformedComment": "Comments",
        "codesOfConductComment": "Comments",
        "vigilantComment": "Comments",
        "patrolsComment": "Comments",
        "incidentReportsComment": "Comments",
        "emergencyResponseComment": "Comments",
        "lockdownProceduresComment": "Comments",
        "communicationProtocolsComment": "Comments",
        "accessControlComment": "Comments",
        "visitorManagementComment": "Comments",
        "confrontationalSituationsComment": "Comments",
        "collaborationComment": "Comments",
        "communicationDevicesComment": "Comments",
        "meetingsComment": "Comments",
        "complianceComment": "Comments",
        "regulatoryRequirementsComment": "Comments",
        "auditsComment": "Comments",
        "performanceEvaluationComment": "Comments",
        "incentivesComment": "Comments",
        "feedbackComment": "Comments",
        //StrangerDangerAwareness.js
        "strangerDangerEducation": "How are students educated about the concept of stranger danger, and what specific examples or scenarios are used to illustrate potential risks associated with interacting with unfamiliar individuals?",
        "strangerDangerCurriculum": "Can you describe the curriculum or instructional materials used to teach students about stranger danger, including any age-appropriate resources or activities designed to engage students in understanding and recognizing potential threats from strangers?",
        "engageInRolePlayingScenarios": "Are there opportunities for students to engage in discussions or role-playing exercises that simulate real-world scenarios involving encounters with strangers, allowing them to apply their knowledge and critical thinking skills to assess and respond to different situations?",
        "strategiesForIdentifyingSafeVsUnsafe": "What strategies are incorporated into the curriculum to help students differentiate between safe and unsafe situations when interacting with strangers, and how are these concepts reinforced through ongoing discussions, activities, or practical exercises?",
        "encouragingRiskAssessment": "How are students encouraged to assess the context and circumstances of encounters with strangers, and what specific criteria or indicators are emphasized to help them evaluate the level of risk and determine appropriate actions to ensure their safety?",
        "assertPersonalBoundariesExamples": "Can you provide examples of how students are empowered to assert their personal boundaries and make informed decisions about how to respond to offers, requests, or invitations from strangers that may pose potential risks to their safety or well-being?",
        "assertiveCommunicationStrategies": "What strategies or techniques are taught to students to help them assertively communicate their boundaries and preferences when interacting with strangers, and how are these skills reinforced through role-playing activities, peer discussions, or real-world scenarios?",
        "supportingConfidenceInDecliningAdvances": "How do educators and school staff support students in developing confidence and self-assurance to assertively decline unwanted advances or requests from strangers, and what resources or support systems are available to students who may require additional assistance or guidance in navigating challenging situations?",
        "advocatingForSafetyAndWellBeing": "Can you describe how students are encouraged to advocate for their own safety and well-being by asserting control over their personal space, choices, and interactions with strangers, and how these principles are integrated into broader discussions about respect, consent, and healthy relationships?",
        "effectiveCommunicationWithAdults": "What strategies are implemented to help students effectively communicate with trusted adults or authority figures about encounters with strangers, and how are these communication skills reinforced through practice, feedback, and reflection?",
        "educationOnReportingSuspiciousEncounters": "How are students educated about the importance of reporting suspicious or concerning encounters with strangers to school staff or other trusted individuals, and what procedures are in place to ensure that such reports are taken seriously and addressed promptly?",
        "encouragingOpenExpressionAndSupport": "Can you provide examples of how students are encouraged to express their concerns or discomfort openly and honestly when discussing encounters with strangers, and how school staff respond to ensure that students feel supported, validated, and empowered to take appropriate action to protect themselves?",
        "engageInRolePlayingScenariosComment": "Comments",
        //StrangerDangerAwareness2.js
        "strangerDangerPrograms": "What programs or materials are used to teach students about stranger danger?",
        "strangerDangerFrequency": "How often are stranger danger awareness lessons incorporated into the curriculum?",
        "rolePlayingExercises": "Are there any role-playing exercises or simulations included in the training for real-life scenarios?",
        "strangerDangerAssessment": "How do teachers assess student understanding of stranger danger concepts after the training?",
        "parentResources": "What resources are provided to parents to reinforce stranger danger awareness at home?",
        //StrongPasswordGuidelines.js
        "strongPasswordCriteria": "What criteria define a strong password (e.g., length, special characters, case sensitivity)?",
        "reusingPasswordRisks": "How are employees educated on the risks of reusing passwords across multiple platforms?",
        "usersPassphrases": "Are users encouraged to use passphrases, and how do they differ from traditional passwords?",
        "recommendedTools": "What tools or services (e.g., password managers) are recommended for securely storing passwords?",
        "updatingPasswords": "How often are employees required to update their passwords, and what strategies ensure compliance?",
        //StudentDataPrivacyPolicies.js
        







    }

    // ----- VERIFY AND COMPLETE THIS MAPPING OBJECT -----
// Place this where getFormRoute can access it (e.g., AssessmentDetails.js or a utils file)

const formRouteMap = {
    // === Cybersecurity ===
    "Access Control Lists": "/access-control-lists-form", // Specific suffix used in route
    "Antivirus Software": "/antivirus-software",
    "Device Encryption": "/device-encryption",
    "Firewall Policies": "/firewall-policies",
    "Incident Response Patch Management": "/incident-response-patch-management",
    "Malware Removal Tools": "/malware-removal-tools",
    "Network Anomaly Detection": "/network-anomaly-detection",
    "Patch Management": "/patch-management",
    "Security Information and Event Management": "/security-information-and-event-management",
    "Firewall Configuration": "/firewall-configuration", // Added based on routes
    "Intrusion Detection Systems": "/intrusiondetectionsystems", // Route uses no hyphen? CHECK App.js
    "Antivirus and Malware Protection": "/antivirus-and-malware-protection", // Added based on routes
    "File Encryption": "/file-encryption",
    "Email Encryption": "/email-encryption",
    "Backup Solutions": "/backupsolutions", // Route uses no hyphen? CHECK App.js
    "Disaster Recovery Planning": "/disaster-recovery-planning",
    "Phishing Simulation Training": "/phishing-simulation-training",
    "Password Policies": "/password-policies",
    "Multi-Factor Authentication": "/multi-factor-authentication",
    "Event Logging and Monitoring": "/event-logging", // Route might just be /event-logging? CHECK App.js
    "User Activity Monitoring": "/user-activity-monitoring",
    "Response Team Formation": "/responseteamformation", // Route uses no hyphen? CHECK App.js
    "Containment and Mitigation": "/containment-and-mitigation",
    "Password Security": "/password-security",
    "Security Policies and Procedures": "/security-policies-and-procedures",
    "Incident Response Training": "/incident-response-training",
    "Network Security": "/network-security", // Added based on routes
    "Data Protection": "/data-protection", // Added based on routes
    "User Awareness and Training": "/user-awareness", // Route uses /user-awareness? CHECK App.js
    "Firewalls and Intrusion Detection": "/firewalls", // Route uses /firewalls? CHECK App.js
    "Endpoint Security": "/endpoint-security",
    "Data Backup and Recovery": "/databackupandrecovery", // Route uses no hyphen? CHECK App.js
    "Phishing Awareness": "/phishing-awareness",
    "Password Management": "/password-management",
    "Incident Identification": "/incident-identification",
    "Incident Response Planning": "/incident-response-planning",
    "Full Disk Encryption": "/fulldiskencryption", // Added based on routes
    "Secure Email Gateways": "/secureemailgateways", // Added based on routes
    "File Level Encryption": "/filelevelencryption", // Path in App.js is "FileLevelEncryption"? Check case/hyphens
    "End To End Encryption": "/endtoendencryption", // Path in App.js is "EndToEndEncryption"? Check case/hyphens
    "Regular Backup Schedules": "/regularbackschedules", // Added based on routes
    "Off-Site Backup Storage": "/offsitebackupstorage", // Added based on routes
    "Backup Testing": "/backuptesting", // Added based on routes
    "Continuity Of Operations": "/continuityofoperations", // Added based on routes
    "Simulated Phishing Campaigns": "/simulatedphishingcampaigns", // Added based on routes
    "Phishing Awareness Training": "/phishingawarenesstraining", // Added based on routes
    "Incident Reporting": "/incidentreporting", // Added based on routes
    "Contact Information": "/contactinformation", // Added based on routes
    "Password Complexity Requirements": "/passwordcomplexityrequirements", // Added based on routes
    "Password Expiration Policies": "/passwordexpirationpolicies", // Added based on routes
    "Two Factor Authentication": "/twofactorauthentication", // Added based on routes
    "Biometric Authentication": "/biometricauthentication", // Added based on routes
    "Intrusion Detection Systems 2": "/intrusiondetectionsystems2", // Added based on routes (assuming name mapping)
    "User Behavior Analytics": "/userbehavioranalytics", // Added based on routes
    "Incident Response Team Roles And Responsibilities": "/incidentresponseteamrolesandresponsibilities", // Added based on routes
    "Communication Channels And Protocols": "/communicationchannelsandprotocols", // Added based on routes
    "Isolation Procedures": "/isolationprocedures", // Added based on routes
    "Data Protection Impact Assessments": "/dataprotectionimpact", // Route uses /dataprotectionimpact? CHECK App.js
    "Consent Management": "/consentmanagement", // Added based on routes
    "Student Data Privacy Policies": "/studentdataprivacypolicies", // Added based on routes
    "Data Breach Notification Procedures": "/databreachnotificationprocedures", // Added based on routes
    "Signature Based Detection": "/signaturebaseddetection", // Added based on routes

    // === Emergency Preparedness ===
    "Classroom Lockdownm Protocols": "/classroom-lockdown-protocols", // Potential typo in key ("Lockdownm") - FIX in subCategories and map key if needed. Route assumed correct.
    "Conflict Resolution": "/conflict-resolution",
    "Disaster Drills": "/disaster-drills",
    "Drill Scenerios": "/drill-scenarios", // Potential typo in key ("Scenerios") - FIX in subCategories and map key if needed. Route assumed correct.
    "Earthquake Drills": "/earthquake-drills",
    "Emergency Communication": "/emergency-communication", // Ensure this maps correctly if used elsewhere
    "Evacuation Procedures": "/evacuation-procedures",
    "Fire Alarm Systems": "/fire-alarm-systems",
    "Fire Drill": "/fire-drill",
    "Fire Extinguisher Locations": "/fire-extinguisher-locations", // Check path case/hyphens
    "First Aid Response": "/first-aid-response",
    "Law Enforcement Coordination": "/law-enforcement-coordination",
    "Lockdown Communication Protocols": "/lockdown-communication-protocols",
    "Severe Weather Monitoring": "/severe-weather-monitoring",
    "Tornado Drills": "/tornado-drills",
    "Tornado Shelter Locations": "/tornado-shelter-locations",
    "Emergency Response Plan": "/emergency-response-plan", // Added based on routes
    "Drills and Training": "/drills-and-training", // Added based on routes
    "Communication Systems": "/communication-systems", // Added based on routes
    "Alert Systems": "/alert-systems", // Added based on routes
    "Communication Protocols": "/communication-protocols", // Added based on routes
    "Fire Emergency Plans": "/fire-emergency-plan", // Route uses singular? CHECK App.js
    "Lockdown Procedures": "/lockdown-procedures", // Added based on routes
    "Natural Disaster Plans": "/natural-disaster-plans", // Added based on routes
    "Natural Disaster Drills": "/natural-disaster-drills", // Added based on routes
    "Lockdown Drills": "/lockdown-drills", // Added based on routes
    "Public Address System": "/publicaddresssystem", // Route has no hyphens? CHECK App.js
    "Text Email Alerts": "/textemailalerts", // Route has no hyphens? CHECK App.js
    "Staff Communication": "/staff-communication", // Added based on routes
    "Parent Communication": "/parent-communication", // Added based on routes
    "Threat Recognition": "/threat-recognition", // Added based on routes
    "Lockdown Signal Recognition": "/lockdown-signal-recognition", // Added based on routes
    "Staff Roles And Responsibilities": "/staff-roles-and-responsibilities", // Added based on routes
    "Debriefing And Feedback": "/debriefing-and-feedback", // Added based on routes
    "Evacuation Routes Review": "/evacuation-routes-review", // Added based on routes
    "Drill Frequency": "/drill-frequency", // Added based on routes
    "Speaker Locations": "/speaker-locations", // Added based on routes
    "Emergency Announcement Protocols": "/emergency-announcement-protocols", // Added based on routes
    "Backup Power Systems": "/backup-power-systems", // Added based on routes
    "Contact Information Database": "/contact-information-database", // Added based on routes
    "Alert Activation Procedures": "/alert-activation-procedures", // Added based on routes
    "Integration With Parent Communication": "/integration-with-parent-communication", // Route uses /intergration-...? CHECK App.js typo
    "Two Way Radios": "/two-way-radios", // Added based on routes
    "Emergency Communication Training": "/emergency-communication-training", // Added based on routes
    "Communication Platforms": "/communication-platforms", // Added based on routes
    "Parent Notification Procedures": "/parent-notification-procedures", // Added based on routes
    "Communication Language": "/communication-language", // Added based on routes
    "Emergency Response Training": "/emergency-response-training", // Added based on routes
    "Emergency Procedures": "/emergency-procedures", // Added based on routes
    "Fire Drills 2": "/fire-drills2", // Added based on routes (assuming name mapping)
    "Lockdown Drills 3": "/lockdown-drills3", // Added based on routes (assuming name mapping)
    "Emergency Preparedness Planning": "/emergency-preparedness-planning", // Added based on routes
    "Emergency Response Plan Development": "/emergency-response-plan-development", // Added based on routes
    "Incident Command Structure": "/incident-command-structure", // Route uses Strucutre? CHECK App.js typo
    "Scenario Based Planning": "/scenario-based-planning", // Added based on routes
    "Crisis Management Procedures": "/crisis-management-procedures", // Added based on routes
    "Crisis Communication Plan": "/crisis-communication-plan", // Added based on routes
    "Continuity Of Operations Plan": "/continuity-of-operations-plan", // Added based on routes
    "Emergency Response Drills For Students": "/emergency-response-drills-for-students", // Added based on routes
    "Communication Protocols 2": "/communication-protocols2", // Added based on routes
    "Tabletop Exercises": "/tabletop-exercises", // Added based on routes
    "Simulated Emergency Drills": "/simulated-emergency-drills", // Added based on routes
    "Internal Communication Protocols": "/internal-communication-protocols", // Added based on routes
    "External Communication Protocols": "/external-communication-protocols", // Added based on routes
    "Critical Function Identification": "/critical-function-identification", // Added based on routes
    "Backup Systems And Redundancies": "/backup-systems-and-redundancies", // Added based on routes

    // === Personnel Training and Awareness ===
    // Note: Many items here seem like sub-sub-categories based on PastAssessments.js structure.
    // Assuming these map directly to routes for now - VERIFY THIS LOGIC.
    "Acceptable Use Policy Training": "/acceptable-use-policy-training", // Route is /accpetable-...? CHECK App.js typo
    "Active Shooter Response": "/active-shooter-response", // Route might be /active-shooter-reponse? CHECK App.js typo
    "Anonymous Reporting Systems": "/anonymous-reporting-systems",
    "Basic First Aid Techniques": "/basic-first-aid-techniques",
    "CPR Certification": "/cpr-certification", // Route might be /CPR-certification? CHECK App.js case
    "Curriculum Integration": "/curriculum-integration",
    "Cyber Bullying": "/cyber-bullying", // Route might be /cyber-bullying? CHECK App.js case/hyphen
    "Data Handling Guidelines": "/data-handling-guidelines",
    "Data Protection": "/data-protection2", // Assuming this maps to the route with '2' - CHECK App.js
    // "Emergency Communication": "/emergency-communication", // Already mapped? Need unique keys or context if route differs
    "Emergency Contacts": "/emergency-contacts",
    "Emergency Evacuation Procedures": "/emergency-evacuation-procedures", // Route might be /evacuation-procedures2? CHECK App.js
    "Emergency Response Protocols": "/emergency-response-protocols", // Route might be /response-protocols2? CHECK App.js
    "Emergency Shelters": "/emergency-shelters",
    "Fire Department Collaboration": "/fire-department-collaboration",
    "Fire Drills": "/fire-drills", // Route might be /fire-drills2? CHECK App.js
    "First Aid CPR Training": "/first-aid", // Route uses /first-aid? CHECK App.js
    "Healthcare Provider Engagement": "/healthcare-provider-engagement",
    "Identifying Suspicious Behavior": "/identifying-suspicious-behavior", // Route might be /identifying-suspicious-behavior2? CHECK App.js
    "Incident Reporting Procedures": "/incident-reporting-procedures",
    "Internet Safety": "/internet-safety",
    "Law Enforcement Partnerships": "/law-enforcement-partnerships", // Route might be /law-enforcement-partnership? CHECK App.js singular
    "Lockdown Drills": "/lockdown-drills2", // Assuming this maps to the route with '2' - CHECK App.js
    "Medical Facilities": "/medical-facilities",
    "Parent Advisory Committees": "/parent-advisory-committees",
    "Parent Involvement": "/parent-involvement", // Route might be /parent-involvement2? CHECK App.js
    "Parent Volunteer Programs": "/parent-volunteer-programs",
    "Parent-Teacher Associations": "/parent-teacher-associations", // Route might be /parent-teacher-associations2? CHECK App.js
    "Password Security": "/password-security2", // Assuming this maps to the route with '2' - CHECK App.js
    "Peer Support Networks": "/peer-support-networks",
    "Phishing Awareness": "/phishing-awareness2", // Assuming this maps to the route with '2' - CHECK App.js
    "Physical Bullying": "/physical-bullying",
    "Post-Incident Support": "/post-incident-support",
    "Recertification Schedule": "/recertification-schedule",
    "Recognizing Security Breaches": "/recognizing-security-breaches",
    "Recognizing Security Incidents": "/recognizing-security-incidents",
    "Response Protocols": "/response-protocols2", // Assuming this maps to the route with '2' - CHECK App.js
    "Role-PLaying Scenarios": "/role-playing-scenarios", // Potential typo in key ("PLaying") - FIX in subCategories and map key if needed.
    "Safety Demonstrations": "/safety-demonstrations",
    "Safety Workshop": "/safety-workshops", // Route uses plural? CHECK App.js
    "Severe Weather Preparedness": "/severe-weather-preparedness",
    "Stranger Danger Awareness": "/stranger-danger-awareness", // Route might be /stranger-danger-awareness2? CHECK App.js
    "Student Handbook": "/student-handbooks", // Route uses plural? CHECK App.js
    "Student Leadership": "/student-leadership",
    "Training Materials": "/training-materials",
    "Training Providers": "/training-providers",
    "Trusted Adults": "/trusted-adults",
    "Verbal Bullying": "/verbal-bullying",
    "AED Training": "/aed-training", // Route might be /AED-training? CHECK App.js case
    "Cybersecurity Training": "/cybersecurity-training", // Added based on routes
    "First Aid Response": "/first-aid-response", // Added based on routes
    "First Aid CPR Training 2": "/first-aid-cpr-training2", // Added based on routes (assuming name mapping)
    "Safety And Security Training": "/safetyandsecuritytraining", // Added based on routes
    "Fire Safety Training": "/firesafetytraining", // Added based on routes
    "Evacuation Procedures Training": "/evacuationprocedurestraining", // Added based on routes
    "Identifying Suspicious Behavior 2": "/identifyingsuspiciousbehavior2", // Added based on routes (assuming name mapping)
    "Response To Security Threats": "/responsetosecuritythreats", // Added based on routes
    "Stranger Danger Awareness 2": "/strangerdangerawareness2", // Added based on routes (assuming name mapping)
    "Staff Training Programs": "/staff-training-programs", // Added based on routes
    "Safety Procedures Training": "/safety-procedures-training", // Added based on routes
    "Security Awareness Training 2": "/security-awareness-training2", // Added based on routes
    "Student Safety Education": "/student-safety-education", // Added based on routes
    "Personal Safety Education": "/personal-safety-education", // Added based on routes
    "Strong Password Guidelines": "/strong-password-guidelines", // Added based on routes
    "Multi Factor Authentication Awareness": "/multi-factor-authentication-awareness", // Added based on routes
    "School Resource Officers": "/school-resource-officers", // Added based on routes
    "Sro Roles And Responsibilities": "/sro-roles-and-responsibilities", // Added based on routes
    "Sro Training And Certification": "/sro-training-and-certification", // Added based on routes
    "Fire Prevention Programs": "/fire-prevention-programs", // Added based on routes
    "Emergency Response Coordination": "/emergency-response-coordination", // Added based on routes
    "Joint Training Exercises": "/joint-training-exercises", // Added based on routes
    "Active Shooter Drills With Police": "/active-shooter-drills-with-police", // Added based on routes
    "Emergency Response Training 2": "/emergency-response-training2", // Added based on routes
    "Crisis Intervention Workshops": "/crisis-intervention-workshops", // Added based on routes
    "Fire Safety Education For Students": "/fire-safety-education-for-students", // Added based on routes
    "Fire Drills And Evacuation Planning": "/fire-drills-and-evacuation-planning", // Added based on routes
    "Fire Department Access To School Facilities": "/fire-department-access-to-school-facilities", // Added based on routes
    "Mutual Aid Agreements": "/mutual-aid-agreements", // Added based on routes
    "Firefighter Training Sessions": "/firefighter-training-sessions", // Added based on routes

    // === Physical Security ===
    "Access Control Keypads": "/access-control-keypads",
    "Access Control Software": "/access-control-software",
    "Access Control Systems": "/access-control-systems",
    "Biometric Scanners": "/biometric-scanners",
    "Bullet Cameras": "/bullet-cameras",
    "Card Readers": "/card-readers",
    "Dome Cameras": "/dome-cameras",
    "Door Alarms": "/door-alarms",
    "Door Locks": "/door-locks",
    "Fence Sensors": "/fence-sensors",
    "Floodlights": "/floodlights",
    "Front Desk Security": "/frontdesksecurity", // Route has no hyphens? CHECK App.js
    "Gate Alarms": "/gate-alarms",
    "Glass Break Sensors": "/glassbreaksensors", // Route has no hyphens? CHECK App.js
    "Infrared Cameras": "/infrared-cameras",
    "Motion Activated Lights": "/motionactivatedlights", // Route has no hyphens? CHECK App.js
    "Motion Sensors": "/motionsensors", // Route has no hyphens? CHECK App.js
    "PTZ Cameras": "/ptzcameras", // Route has no hyphens? CHECK App.js case
    "Perimeter Fencing": "/perimeter-fencing",
    "Razor Wire": "/razor-wire", // Route might be /RazorWire? CHECK App.js case
    "Roving Patrols": "/roving-patrols", // Route might be /RovingPatrols? CHECK App.js case
    "Security Gates": "/security-gates", // Route might be /SecurityGates? CHECK App.js case
    "Stationed Guards": "/stationed-guards", // Route might be /StationedGuards? CHECK App.js case
    "Turnstiles": "/turnstiles", // Route might be /Turnstiles? CHECK App.js case
    "Vehicle Barrier": "/vehicle-barriers", // Route uses plural? CHECK App.js
    "Visitor Check-In": "/visitor-checkin", // Route uses hyphen? CHECK App.js
    "WeatherProof Cameras": "/weatherproof-cameras", // Route uses hyphen? Case? CHECK App.js
    "Window Locks": "/window-locks", // Route might be /WindowLocks? CHECK App.js case
    "Surveillance Systems": "/surveillance", // Route uses /Surveillance? CHECK App.js
    "Security Personnel": "/security-personnel", // Added based on routes
    "Access Points": "/accessp", // Route uses /AccessP? CHECK App.js case
    "Building Security": "/buildings", // Route uses /BuildingS? CHECK App.js case
    "Perimeter Security": "/perimeters", // Route uses /PerimeterS? CHECK App.js case
    "CCTV Cameras": "/cctv", // Route uses /CCTV? CHECK App.js case
    "Alarm Systems": "/alarms", // Route uses /AlarmS? CHECK App.js case
    "On Site Security": "/onsite", // Route uses /OnSite? CHECK App.js case
    "Main Entrance": "/maine", // Route uses /MainE? CHECK App.js case
    "Secondary Entrances": "/secondaryentrances", // Added based on routes
    "Fencing And Barriers": "/fencingandbarriers", // Added based on routes
    "Locking Mechanisms": "/lockingmechanisms", // Added based on routes
    "Lighting": "/lighting", // Added based on routes
    "Indoor Cameras": "/indoorcameras", // Added based on routes
    "Outdoor Cameras": "/outdoorcameras", // Added based on routes
    "Intrusion Alarms": "/intrusionalarms", // Added based on routes
    "Perimeter Alarms": "/perimeteralarms", // Added based on routes
    "Security Guards": "/securityguards", // Added based on routes
    "Reception Staff": "/receptionstaff", // Added based on routes
    "On Site Guards": "/onsiteguards", // Added based on routes
    "Keycard Access Systems": "/keycardaccesssystems", // Added based on routes
    "Biometric Access Control Systems": "/biometricaccesscontrolsystems", // Added based on routes
    "CCTV Camera Installation": "/cctvcamerainstallation", // Added based on routes
    "Intrusion Detection Systems 3": "/intrusiondetectionsystems3", // Added based on routes (assuming name mapping)
    "Perimeter Security Fencing": "/perimetersecurityfencing", // Added based on routes
    "Physical Security Measures": "/physical-security-measures", // Added based on routes
    "Access Control Systems 2": "/access-control-systems2", // Added based on routes (assuming name mapping)
    "Surveillance Systems 2": "/surveillance-systems2", // Added based on routes (assuming name mapping)
    "Physical Hazards Assessment": "/physical-hazards-assessment", // Added based on routes
    "Environmental Hazards Assessment": "/enviromental-hazards-assessment", // Route uses enviromental? CHECK App.js typo
    "Perimeter Security Evaluation": "/perimeter-security-evaluation", // Added based on routes
    "Access Control Systems Assessment": "/access-control-systems-assessment", // Added based on routes

    // === Policy and Compliance ===
    "Access Restrictions": "/access-restrictions",
    "Data Classification": "/data-classification",
    "Data Minimization": "/dataminimization", // Route has no hyphens? CHECK App.js
    "Data Retention Periods": "/dataretentionperiods", // Route has no hyphens? CHECK App.js
    "Data Sharing Policies": "/data-sharing-policies",
    "Personal Device Usage": "/personaldeviceusage", // Route has no hyphens? CHECK App.js
    "Student Privacy Rights": "/studentprivacyrights", // Route has no hyphens? CHECK App.js
    "Acceptable Use Policy": "/acceptable-use-policy", // Added based on routes
    "Data Privacy Policy": "/data-privacy-policy", // Added based on routes
    "Regulatory Compliance": "/regulatory-compliance", // Route uses /regulatory-comlpiance? CHECK App.js typo
    "Periodic Reviews": "/periodic-reviews", // Added based on routes
    "Revision Procedures": "/revision-procedures", // Added based on routes
    "Internet Usage": "/internet-usage", // Added based on routes
    "Data Handling": "/data-handling", // Added based on routes
    "Data Collection And Retention": "/data-collection-and-retention", // Added based on routes
    "Data Protection Measures": "/data-protection-measures", // Added based on routes
    "FERPA Compliance": "/ferpa-compliance", // Route uses /FERPA-compliance? CHECK App.js case
    "GDPR Compliance": "/gdpr-compliance", // Route uses /GDPR-compliance? CHECK App.js case
    "Policy Evaluation Criteria": "/policy-evaluation-criteria", // Added based on routes
    "Stakeholder Feedback": "/stakeholder-feedback", // Added based on routes
    "Change Management Process": "/change-management-process", // Added based on routes
    "Data Handling Guidelines": "/data-handling-guidelines", // Added based on routes
    "Encryption Requirements": "/encryptionrequirements", // Added based on routes
    "Data Access Controls": "/dataaccesscontrols", // Added based on routes
    "Data Security Requirements": "/datasecurityrequirements", // Added based on routes
    "Compliance With Regulations": "/compliancewithregulations", // Added based on routes
    "Effectiveness In Addressing Security Risks": "/effectivenessinaddressingsecurityrisks", // Added based on routes
    "Staff Input On Policy Impact": "/staffinputonpolicyimpact", // Added based on routes
    "Policy Revision Approval Workflow": "/policyrevisionapprovalworkflow", // Added based on routes
    "Documentation Of Policy Changes": "/documentationofpolicychanges", // Added based on routes

    // === Community Partnership ===
    // Note: This category had an empty subCategories array in PastAssessments.js
    // Add mappings here if subcategories/routes exist. Example:
    // "Some Community Subcategory": "/some-community-route",
    "Parent Education Events": "/parent-education-events", // Added based on routes
    "Parent Comm": "/parent-comm", // Added based on routes
    "Collaboration With Local Agencies": "/collaboration-with-local-agencies", // Route uses /collaboration-with-local-agenices? CHECK App.js typo
    "Access To Community Resources": "/access-to-community-resources", // Added based on routes
    "Joint Community Events": "/joint-community-events", // Added based on routes
    "Parent And Community Involvement": "/parent-and-community-involvement", // Added based on routes
    "Parent Teacher Associations 2": "/parent-teacher-associations2", // Added based on routes (assuming name mapping)
    "Family Engagement Events": "/family-engagement-events", // Added based on routes
    "Volunteer Programs": "/volunteer-programs", // Added based on routes
    "Community Outreach Programs": "/community-outreach-programs", // Added based on routes
    "Community Engagement Surveys": "/community-engagement-surveys", // Added based on routes
    "Back To School Nights": "/back-to-school-nights", // Added based on routes
    "Parent Workshops On Student Safety": "/parent-workshops-on-student-safety", // Added based on routes
    "Parent Teacher Conferences": "/parent-teacher-conferences", // Added based on routes
    "Classroom Helpers": "/classroom-helpers", // Added based on routes
    "Parent Chaperones For Field Trips": "/parent-chaperones-for-field-trips", // Added based on routes
    "Fundraising Events": "/fundraising-events", // Added based on routes
    "Feedback Collection From Community": "/feedback-collection-from-community", // Added based on routes
    "Assessing Community Needs And Priorities": "/assessing-community-needs-and-priorities", // Added based on routes
    "Planning Community Outreach Strategies": "/planning-community-outreach-strategies", // Added based on routes
    "Communication Channels": "/communicationchannels", // Added based on routes

    // === Continuous Improvement - Safety and Security ===
    "Biometric Access Control Systems": "/biometric-access-control-systems", // Added based on routes
    "Firewall Implementation": "/firewall-implementation", // Added based on routes
    "Intrusion Prevention Systems": "/intrusion-prevention-systems", // Added based on routes
    "Data Encryption Protocols": "/data-encryption-protocols", // Added based on routes
    "Regular Data Backups": "/regular-data-backups", // Added based on routes
    "Endpoint Security Solutions": "/endpoint-security-solutions", // Added based on routes
    "Risk Assessment And Mitigation": "/risk-assessment-and-mitigation", // Added based on routes
    "Safety Risk Assessment": "/safety-risk-assessment", // Added based on routes
    "Hazard Identification": "/hazard-identification", // Added based on routes
    "Risk Analysis": "/risk-analysis", // Added based on routes
    "Security Threat Assessment": "/security-threat-assessment", // Added based on routes
    "Threat Identification": "/threat-identification", // Added based on routes
    "Security Vulnerability Assessment": "/security-vulnerability-assessment", // Added based on routes
    "Security Infrastructure Enhancement": "/security-infrastructure-enhancement", // Added based on routes
    "Cybersecurity Infrastructure": "/cybersecurity-infrastructure", // Added based on routes
    "Network Security Measures": "/network-security-measures", // Added based on routes
    "Data Protection Measures 2": "/data-protection-measures2", // Added based on routes (assuming name mapping)
    "Vulnerability Assessment": "/vulnerability-assessment", // Added based on routes
    "External Threats": "/external-threats", // Added based on routes
    "Internal Threats": "/internal-threats", // Added based on routes
    "Cybersecurity Vulnerability Assessment": "/cybersecurity-vulnerability-assessment", // Added based on routes

     // === Other Routes Mentioned (might not be subcategories) ===
     // These likely won't be used by getFormRoute unless they ARE subcategories
     "Bullying Prevention": "/bullying-prevention", // Add if it's a subcategory
     "Recognizing Bullying Behavior": "/recognizing-bullying-behavior", // Add if it's a subcategory
     "Reporting Procedures": "/reporting-procedures", // Add if it's a subcategory
     "Reporting Procedures 2": "/reporting-procedures2", // Add if it's a subcategory
     "Crisis Intervention": "/crisis-intervention", // Add if it's a subcategory
     "Phishing Simulation Exercises": "/phishingsimulationexercises", // Route uses /PhishingSimulationExercises? CHECK App.js case
     "Privacy And Security": "/privacy&security", // Route uses /privacy&security? CHECK App.js special char


};

// ----- END OF MAPPING OBJECT -----

// Make sure the getFormRoute function uses this map as shown previously:
/*
const getFormRoute = (category1, category2) => {
    console.log(`getFormRoute called with: category1='${category1}', category2='${category2}'`);
    const route = formRouteMap[category2]; // Lookup using subcategory name

    if (route) {
        console.log(`Route found for '${category2}': ${route}`);
        return route;
    } else {
        console.warn(`No route found for category2: '${category2}'. Defaulting to '/'`);
        return '/'; // Default fallback
    }
};
*/

    useEffect(() => {
        const fetchAssessmentAndBuilding = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!category1 || !category2 || !assessmentId) {
                    setError('Missing required information.');
                    return;
                }

                const docRef = doc(db, `forms/${category1}/${category2}`, assessmentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const assessmentData = docSnap.data();
                    const buildingRef = assessmentData.formData.building;
                    const buildingSnap = await getDoc(buildingRef);
                    const buildingName = buildingSnap.data().buildingName;

                    setAssessment({ ...assessmentData, buildingName });
                } else {
                    setError("Assessment not found");
                }
            } catch (err) {
                console.error("Error fetching assessment or building:", err);
                setError("Failed to fetch assessment or building");
            } finally {
                setLoading(false);
            }
        };

        fetchAssessmentAndBuilding();
    }, [assessmentId, db, category1, category2]);

    if (loading) {
        return <p>Loading assessment details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!assessment) {
        return <p>Assessment not found.</p>;
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const generateCSV = (assessment) => {
        if (!assessment || !assessment.formData) {
            return null;
        }

        let csvContent = "Question,Answer,Comment\n";
        csvContent += `Building Name,"${assessment.buildingName || "N/A"}",\n`;
        csvContent += `Category,"${category1 || "N/A"}",\n`;
        csvContent += `Subcategory,"${category2 || "N/A"}",\n`;

        Object.entries(assessment.formData).forEach(([key, value]) => {
            if (key.endsWith('Comment')) {
                return;
            }

            const question = questions[key] || key;
            let displayValue = String(value).replace(/,/g, ';').replace(/\n/g, '<br>');
            let comment = String(assessment.formData[key + 'Comment'] || '').replace(/,/g, ';').replace(/\n/g, '<br>');

            csvContent += `"${question}","${displayValue}","${comment}"\n`;
        });

        return csvContent;
    };

    const downloadCSV = (csv, filename) => {
        const csvFile = new Blob([csv], { type: "text/csv" });
        const downloadLink = document.createElement("a");

        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleExportCSV = () => {
        const csv = generateCSV(assessment);
        if (csv) {
            downloadCSV(csv, `assessment_${assessmentId}.csv`);
        } else {
            alert("No data to export.");
        }
    };

    const handleExportPdf = () => {
        const pdf = generatePdfDocument(assessment, questions, category1, category2);
        pdf.save(`assessment_${assessmentId}.pdf`);
    };

    const generatePdfDocument = (assessment, questions, category1, category2) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        let y = 20;
        const lineHeight = 7;
        const margin = 15;
        const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const sectionTitleFontSize = 16;
        const titleFontSize = 20;
        const questionFontSize = 12;
        const answerFontSize = 11;
        const commentFontSize = 10;

        const addText = (text, x, currentY, options = {}) => {
            const { fontSize = 12, maxWidth = pageWidth, isBold = false } = options;
            pdf.setFontSize(fontSize);
            let lines = pdf.splitTextToSize(text, maxWidth);

            lines.forEach(line => {
                if (isBold) {
                    pdf.text(line, x, currentY);
                    pdf.text(line, x + 0.1, currentY + 0.1);
                } else {
                    pdf.text(line, x, currentY);
                }
                currentY += lineHeight;
            });
            return currentY;
        };

        const drawLine = (currentY) => {
            pdf.setLineWidth(0.5);
            pdf.line(margin, currentY, pdf.internal.pageSize.getWidth() - margin, currentY);
        };

        pdf.setFontSize(titleFontSize);
        pdf.setTextColor(40, 82, 134);
        pdf.text(`Assessment Details`, margin, y);
        pdf.setTextColor(0, 0, 0);
        y += 2 * lineHeight;

        pdf.setFontSize(sectionTitleFontSize);
        pdf.text(`Assessment Information`, margin, y);
        y += lineHeight;

        pdf.setFontSize(questionFontSize);
        y = addText(`Building: ${assessment.buildingName || 'N/A'}`, margin, y);
        y = addText(`Category: ${category1 || 'N/A'}`, margin, y);
        y = addText(`Subcategory: ${category2 || 'N/A'}`, margin, y);
        y += lineHeight;

        drawLine(y);
        y += lineHeight;

        pdf.setFontSize(sectionTitleFontSize);
        pdf.text(`Form Data`, margin, y);
        y += lineHeight;

        Object.entries(assessment.formData).forEach(([key, value]) => {
            if (key.endsWith('Comment')) return;

            const question = questions[key] || key;
            const comment = assessment.formData[key + 'Comment'] || '';

            pdf.setFontSize(questionFontSize);
            y = addText(`Question: ${question}`, margin, y, { isBold: true });

            pdf.setFontSize(answerFontSize);
            y = addText(`Answer: ${value}`, margin + 5, y);

            if (comment) {
                pdf.setFontSize(commentFontSize);
                y = addText(`Comment: ${comment}`, margin + 10, y);
            }
            y += lineHeight;

            if (y > pdf.internal.pageSize.getHeight() - margin) {
                pdf.addPage();
                y = margin;
            }
        });

        return pdf;
    };

    const renderFormData = () => {
        if (!assessment?.formData) return <p>No form data available.</p>;
        console.log("assessment.formData:", assessment.formData);

        return Object.entries(assessment.formData).map(([key, value]) => {
            console.log("Key:", key);
            const question = questions[key] || "Question not available";
            console.log("Question:", question);

            if (key === 'imageUrl') {
                return (
                    <div key={key} className="question-answer-container">
                        <p><strong>Uploaded Image:</strong></p>
                        <img src={value} alt="Uploaded" style={{ maxWidth: '300px' }} />
                    </div>
                );
            }

            if (key.endsWith('Comment')) {
                return null;
            }

            if (key === 'building') {
                // Extract and display the building ID or name
                const buildingId = value?.id; // Assuming value is the DocumentReference
                return (
                    <div key={key} className="question-answer-container">
                        <p><strong>Building ID:</strong> {buildingId || 'Building ID not available'}</p>
                    </div>
                );
            }

            let displayValue = value;
            let comment;
            if (assessment.formData[key + 'Comment']) {
                comment = assessment.formData[key + 'Comment'];
            }

            return (
                <div key={key} className="question-answer-container">
                    <p><strong>{question}</strong></p>
                    <p><strong>Answer:</strong>{displayValue}</p>
                    {comment && <p><strong>Comment:</strong>{comment}</p>}
                </div>
            );
        });
    };

    const getFormRoute = (category1, category2) => {
        // Log inputs for debugging
        console.log(`getFormRoute called with: category1='${category1}', category2='${category2}'`);
    
        // Use the category2 (subcategory name) as the key to look up the route
        // Ensure the key lookup uses the EXACT string used in the formRouteMap keys
        const route = formRouteMap[category2];
    
        if (route) {
            console.log(`Route found for '${category2}': ${route}`);
            return route; // Return the found route
        } else {
            // Handle cases where the subcategory doesn't have a mapped route
            console.warn(`No route found for category2: '${category2}'. Defaulting to '/'`);
            // You might want a specific "not found" route or error handling instead of '/'
            return '/'; // Default fallback route
        }
    };

    const handleEditClick = () => {
        const formRoute = getFormRoute(category1, category2);
        navigate(`${formRoute}?buildingId=${assessment?.formData?.building.id}&assessmentId=${assessmentId}`);
    };
    console.log("Questions object:", questions);

    return (
        <div className="assessment-details-container">
            <div className="header-info">
                <button className="back-button" onClick={handleBackClick}>Back</button>
                <h1>{assessment?.buildingName || 'Building Name Not Found'}</h1>
                <h2>{`${category1} - ${category2}`}</h2>
            </div>
            <h2>Assessment Details</h2>
            <button className="export-csv-button" onClick={handleExportCSV}>Export to CSV</button>
            <button className="export-pdf-button" onClick={handleExportPdf}>Export to PDF</button>
            <button className="edit-button" onClick={handleEditClick}>Edit Assessment</button>
            {assessment && renderFormData()}
        </div>
    );
}

export default AssessmentDetails;