// src/Screens/ExecutiveSummary.js
// (Make sure the path matches where you save this file and where your CSS is)

import React, { useState } from 'react'; // useRef is not needed for this PDF method
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
// html2canvas is not needed for this PDF method
import './ExecutiveSummary.css'; // Make sure this path is correct

function ExecutiveSummary() {
    const navigate = useNavigate(); // Hook for navigation

    // State to hold all form data
    const [formData, setFormData] = useState({
        reportedBy: '',
        fileName: 'ExecutiveSummary', // Default filename for PDF
        dateOfReport: new Date().toISOString().slice(0, 10), // Default to today, YYYY-MM-DD format
        reportLead: '',
        assessors: [''], // Start with one assessor input field
        purpose: '',
        background: '',
        focusAreas: '',
        sitesAssessed: '',
        sitesNotAssessed: '',
        leaderAreasOfInterest: '',
        observationsHigh: 0,
        observationsSignificant: 0,
        observationsModerate: 0,
        observationsLow: 0,
        pointsOfContact: '',
    });

    // Generic handler for most input changes
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Use valueAsNumber for number inputs if supported, otherwise parse manually
        const val = type === 'number' ? (e.target.valueAsNumber || parseInt(value, 10) || 0) : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: val,
        }));
    };

    // Handler for changes in assessor name inputs
    const handleAssessorChange = (index, value) => {
        const updatedAssessors = [...formData.assessors];
        updatedAssessors[index] = value;
        setFormData(prevData => ({
            ...prevData,
            assessors: updatedAssessors,
        }));
    };

    // Adds a new empty assessor input field
    const addAssessor = () => {
        setFormData(prevData => ({
            ...prevData,
            assessors: [...prevData.assessors, ''],
        }));
    };

    // Removes an assessor input field by its index
    const removeAssessor = (index) => {
        if (formData.assessors.length <= 1) return; // Prevent removing the last one
        const updatedAssessors = formData.assessors.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            assessors: updatedAssessors,
        }));
    };

    // --- *** UPDATED generatePdf function - v2 *** ---
    const generatePdf = () => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 page, portrait, millimeters
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();

        // --- Layout Constants (Adjust these for styling) ---
        const leftMargin = 15;
        const topMargin = 20;
        const bottomMargin = 20;
        const usableWidth = pageWidth - 2 * leftMargin;
        const valueIndent = 50; // How far from left margin the value text starts
        const valueMaxWidth = usableWidth - valueIndent; // Max width for value text before wrapping
        const baseFontSize = 11;
        const titleFontSize = 18;
        const headingFontSize = 14;
        const lineHeight = 6; // Adjust based on font size for spacing (mm)
        const sectionSpacing = lineHeight * 1.5; // Extra space between sections/fields
        const headerSpacing = lineHeight * 0.8; // Space after header text before line/content
        // --- End Layout Constants ---

        let yPos = topMargin; // Tracks the current vertical drawing position

        // --- Helper Functions ---

        const checkPageBreak = (heightNeeded) => {
            if (yPos + heightNeeded >= pageHeight - bottomMargin) {
                pdf.addPage();
                yPos = topMargin;
            }
        };

        const addWrappedText = (text, x, maxWidth, options = {}) => {
            if (!text) text = '-';
            const lines = pdf.splitTextToSize(String(text), maxWidth);
            const blockHeight = lines.length * lineHeight;
            checkPageBreak(blockHeight);
            const originalSize = pdf.getFontSize();
            const originalStyle = pdf.getFont().fontStyle;
            pdf.setFontSize(options.fontSize || baseFontSize);
            pdf.setFont(undefined, options.fontStyle || 'normal');
            if (options.color) pdf.setTextColor(options.color);
            pdf.text(lines, x, yPos);
            yPos += blockHeight;
            pdf.setFontSize(originalSize);
            pdf.setFont(undefined, originalStyle);
            pdf.setTextColor(0, 0, 0);
        };

        const addField = (label, value) => {
            const labelText = `${label}:`;
            const labelWidth = pdf.getTextWidth(labelText); // Use bold font for width calc
            const valueX = leftMargin + Math.max(valueIndent, labelWidth + 2);
            const dynamicValueMaxWidth = pageWidth - valueX - leftMargin; // Calculate actual max width based on valueX

            checkPageBreak(lineHeight);
            const currentFieldY = yPos;
            pdf.setFontSize(baseFontSize); // Ensure base font size
            pdf.setFont(undefined, 'bold');
            pdf.text(labelText, leftMargin, currentFieldY);
            pdf.setFont(undefined, 'normal');
            // Draw Value starting at the same Y
            addWrappedText(value, valueX, dynamicValueMaxWidth); // Use calculated max width
            // Ensure yPos moves down by at least one line height after the entire field
            yPos = Math.max(yPos, currentFieldY + lineHeight);
            yPos += sectionSpacing * 0.5; // Add consistent spacing after the field
        };

        const addSectionHeader = (title) => {
            checkPageBreak(headingFontSize * 0.5 + headerSpacing + sectionSpacing);
            pdf.setFontSize(headingFontSize);
            pdf.setFont(undefined, 'bold');
            pdf.text(title, leftMargin, yPos);
            yPos += headerSpacing;
            pdf.setLineWidth(0.3);
            pdf.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
            yPos += sectionSpacing;
        };

        // --- Build the PDF Document ---
        checkPageBreak(titleFontSize * 0.5);
        pdf.setFontSize(titleFontSize);
        pdf.setFont(undefined, 'bold');
        pdf.text('Executive Summary Report', pageWidth / 2, yPos, { align: 'center' });
        yPos += titleFontSize * 0.5 + sectionSpacing;

        addSectionHeader('Report Details');
        pdf.setFontSize(baseFontSize);
        pdf.setFont(undefined, 'normal');
        addField('Reported By', formData.reportedBy);
        addField('File Name', formData.fileName);
        addField('Date of Report', formData.dateOfReport);
        addField('Report Lead', formData.reportLead);

        addSectionHeader('Team Composition');
        pdf.setFontSize(baseFontSize);
        pdf.setFont(undefined, 'normal');
        const validAssessors = formData.assessors ? formData.assessors.filter(a => a && a.trim() !== '') : [];
        if (validAssessors.length > 0) {
             validAssessors.forEach((assessor) => {
                addWrappedText(`- ${assessor}`, leftMargin + 5, usableWidth - 5); // Indent list items
             });
             yPos += sectionSpacing * 0.5;
        } else {
            addWrappedText('- None listed', leftMargin + 5, usableWidth - 5);
            yPos += sectionSpacing * 0.5;
        }

        addSectionHeader('Executive Summary');
        pdf.setFontSize(baseFontSize);
        pdf.setFont(undefined, 'normal');
        addField('1) Purpose', formData.purpose);
        addField('2) Background', formData.background);
        addField('3) Focus Areas', formData.focusAreas);
        addField('4) Sites Assessed', formData.sitesAssessed);
        addField('5) Sites Not Assessed', formData.sitesNotAssessed);
        addField("6) Leader's areas of interest", formData.leaderAreasOfInterest);

        checkPageBreak(lineHeight * 1.5); // Space for Observations label + line
        const obsLabelY = yPos;
        pdf.setFontSize(baseFontSize); // Ensure correct size
        pdf.setFont(undefined, 'bold');
        pdf.text('7) Observations (Findings):', leftMargin, obsLabelY);
        pdf.setFont(undefined, 'normal');
        yPos += lineHeight; // Move below label for the value line
        const obsText = `High: ${formData.observationsHigh}, Significant: ${formData.observationsSignificant}, Moderate: ${formData.observationsModerate}, Low: ${formData.observationsLow}`;
        addWrappedText(obsText, leftMargin + 5, usableWidth - 5); // Indent value line(s)
        yPos = Math.max(yPos, obsLabelY + lineHeight); // Ensure yPos below label
        yPos += sectionSpacing * 0.5;

        addField('8) Points of Contact', formData.pointsOfContact);

        // --- End PDF Content ---
        pdf.save(`${formData.fileName || 'ExecutiveSummary'}.pdf`);
    };
    // --- End of UPDATED generatePdf function ---


    // Function to handle navigating back
    const handleGoBack = () => {
        navigate(-1); // Go back one step in browser history
    };

    // JSX for the component rendering
    return (
        <div className="executive-summary-container">
             {/* --- Back Button --- */}
             <button onClick={handleGoBack} className="back-button">
                &larr; Back
            </button>

            <h1>Executive Summary Report</h1>

            {/* This div contains the form elements for user input */}
            {/* The class name can match your CSS, ref is not needed for manual PDF */ }
            <div className="report-content-form-only">
                 <h2>Report Details</h2>
                 <div className="form-grid">
                     <label>
                         Reported By:
                         <input type="text" name="reportedBy" value={formData.reportedBy} onChange={handleChange} />
                     </label>
                     <label>
                         File Name (for PDF):
                         <input type="text" name="fileName" value={formData.fileName} onChange={handleChange} />
                     </label>
                     <label>
                         Date of Report:
                         <input type="date" name="dateOfReport" value={formData.dateOfReport} onChange={handleChange} />
                     </label>
                     <label>
                         Report Lead:
                         <input type="text" name="reportLead" value={formData.reportLead} onChange={handleChange} />
                     </label>
                 </div>

                 <h2>Team Composition</h2>
                 <div className="assessors-section">
                     {formData.assessors.map((assessor, index) => (
                         <div key={index} className="assessor-item">
                             <label>
                                 Assessor Name {index + 1}:
                                 <input
                                     type="text"
                                     value={assessor}
                                     onChange={(e) => handleAssessorChange(index, e.target.value)}
                                     placeholder="Enter assessor name"
                                 />
                             </label>
                             {formData.assessors.length > 1 && (
                                 <button type="button" onClick={() => removeAssessor(index)} className="remove-btn">
                                     Remove
                                 </button>
                             )}
                         </div>
                     ))}
                     <button type="button" onClick={addAssessor} className="add-btn">
                         Add Assessor
                     </button>
                 </div>


                 <h2>Executive Summary</h2>
                 <label>
                     1) Purpose:
                     <textarea name="purpose" value={formData.purpose} onChange={handleChange} rows="4" />
                 </label>
                 <label>
                     2) Background:
                     <textarea name="background" value={formData.background} onChange={handleChange} rows="4" />
                 </label>
                 <label>
                     3) Focus Areas:
                     <textarea name="focusAreas" value={formData.focusAreas} onChange={handleChange} rows="4" />
                 </label>
                 <label>
                     4) Sites Assessed:
                     <textarea name="sitesAssessed" value={formData.sitesAssessed} onChange={handleChange} rows="4" />
                 </label>
                 <label>
                     5) Sites Not Assessed:
                     <textarea name="sitesNotAssessed" value={formData.sitesNotAssessed} onChange={handleChange} rows="4" />
                 </label>
                 <label>
                     6) Leader's areas of interest:
                     <textarea name="leaderAreasOfInterest" value={formData.leaderAreasOfInterest} onChange={handleChange} rows="4" />
                 </label>

                 <fieldset>
                     <legend>7) Observations (Number of findings)</legend>
                     <div className="observations-grid">
                         <label>
                             High:
                             <input type="number" name="observationsHigh" min="0" value={formData.observationsHigh} onChange={handleChange} />
                         </label>
                         <label>
                             Significant:
                             <input type="number" name="observationsSignificant" min="0" value={formData.observationsSignificant} onChange={handleChange} />
                         </label>
                         <label>
                             Moderate:
                             <input type="number" name="observationsModerate" min="0" value={formData.observationsModerate} onChange={handleChange} />
                         </label>
                         <label>
                             Low:
                             <input type="number" name="observationsLow" min="0" value={formData.observationsLow} onChange={handleChange} />
                         </label>
                     </div>
                 </fieldset>

                 <label>
                     8) Points of Contact:
                     <textarea name="pointsOfContact" value={formData.pointsOfContact} onChange={handleChange} rows="4" />
                 </label>
             </div> {/* End of report-content-form-only div */}

             {/* --- Export Button --- */}
             <button onClick={generatePdf} className="export-button">
                 Export to PDF
             </button>
         </div> // End of executive-summary-container div
     );
}

export default ExecutiveSummary;