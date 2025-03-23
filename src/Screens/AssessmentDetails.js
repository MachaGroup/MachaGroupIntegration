import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './AssessmentDetails.css';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    };

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
                    const buildingRef = assessmentData.building;
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

        const data = [
            Object.entries(assessment.formData).map(([key, value]) => {
                const question = questions[key] || key;
                return { question, value };
            }),
        ];

        const csv = Papa.unparse({
            fields: ["question", "value"],
            data: data[0],
        });

        return csv;
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
        const capture = document.querySelector(".assessment-details-container");
        if (!capture) {
            console.error("Target element not found");
            return;
        }

        const backButton = document.querySelector(".back-button");
        const csvButton = document.querySelector(".export-csv-button");
        const pdfButton = document.querySelector(".export-pdf-button");

        backButton.classList.add("hide-for-pdf");
        csvButton.classList.add("hide-for-pdf");
        pdfButton.classList.add("hide-for-pdf");

        html2canvas(capture, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save(`assessment_${assessmentId}.pdf`);

                backButton.classList.remove("hide-for-pdf");
                csvButton.classList.remove("hide-for-pdf");
                pdfButton.classList.remove("hide-for-pdf");
            })
            .catch((error) => {
                console.error('Error capturing the component:', error);
                setError('Failed to generate PDF.');
                backButton.classList.remove("hide-for-pdf");
                csvButton.classList.remove("hide-for-pdf");
                pdfButton.classList.remove("hide-for-pdf");
            });
    };

    const renderFormData = () => {
        if (!assessment.formData) return <p>No form data available.</p>;

        return Object.entries(assessment.formData).map(([key, value]) => {
            const question = questions[key] || "Question not available";

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
        }).filter(item => item);
    };

    const getFormRoute = (category1, category2) => {
        if (category1 === "Cybersecurity" && category2 === "Access Control Lists") {
            return `/access-control-lists-form`;
        } else if (category1 === "AnotherCategory" && category2 === "AnotherSubcategory") {
            return `/another-form`;
        }
        return '/';
    };

    const handleEditClick = () => {
        const formRoute = getFormRoute(category1, category2);
        navigate(`${formRoute}?buildingId=${assessment?.building.id}&assessmentId=${assessmentId}`);
    };

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
            {renderFormData()}
        </div>
    );
}

export default AssessmentDetails;
