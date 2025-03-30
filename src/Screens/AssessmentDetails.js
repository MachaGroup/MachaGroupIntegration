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
        if (category1 === "Cybersecurity" && category2 === "Access Control Lists") {
            return `/access-control-lists-form`;
        } else if (category1 === "AnotherCategory" && category2 === "AnotherSubcategory") {
            return `/another-form`;
        }
        return '/';
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