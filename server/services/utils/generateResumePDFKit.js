import PDFDocument from "pdfkit";

export async function generateResumePDFKit(res, analysis, user) {
    const doc = new PDFDocument({
        margin: 50,
        size :"A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Resume-Analysis.pdf");

    doc.pipe(res);

    doc.fontSize(26).fillColor("#2563EB").text("Carrer Compass AI" ,{
        align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(12).text(`Candidate: ${user?.name || "Unknown"}`);

    doc.text(`Target Role: ${user?.targetRole || "Not Specified"}`);

    doc.moveDown();

    doc.fontSize(14).fillColor("#16A34A").text(`Resume Score: ${analysis.resumeScore}`);

    doc.fontSize("#2563EB").text(`ATS Score: ${analysis.atsScore}`);

    doc.moveDown();

    doc.fillColor("black").fontSize(16).text("Strengths");

    (analysis.strengths || []).forEach(item => {
        doc.fontSize(12).text(`• ${item}`);
    });

    doc.moveDown();

    doc.fontSize(16).fillColor("#DC2626").text("Weaknesses");

    (analysis.strengths || []).forEach(item => {
        doc.fontSize(12).text(`• ${item}`);
    });

    doc.moveDown();

    doc.fontSize(16).fillColor("#2563EB").text("Suggestions");

    (analysis.suggestions || []).forEach(item => {
        doc.fontSize(12).text(`• ${item}`);
    });

    doc.moveDown(2);

    doc.fontSize(10).fillColor("gray").text(`Generated on ${new Date().toLocaleString()}`,{
        align: "center",
    });

    doc.end();
    
}