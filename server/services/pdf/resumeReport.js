import { Document, Packer, Paragraph, HeadingLevel, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from "docx";
import { ImageRun } from "docx";
import fs from "fs";
import path from "path";

export async function generateResumePDF(res, analysis, user) {

    const doc =new Document({

        sections: [
             {
                properties: {
                    page: {
                        margin: {
                            top: 720,
                            right: 720,
                            bottom: 720,
                            left: 720, 
                        },
                    },
                },

                children: [

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: fs.existsSync(path.join(process.cwd(), "assets/logo.png")) ? [
                            new ImageRum({
                                data: fs.readFileSync(path.join(process.cwd(), "assets/logo.png")),
                                transformation: {width: 90, height: 90},
                            }),
                        ] : [],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 150,
                        },

                        children: [
                            new TextRun({
                                text:"Career Compass AI",
                                bold: true,
                                size: 42,
                                color: "2563EB",
                                allCaps: true,
                            }),
                        ],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 350,
                        },
                        children: [
                            new TextRun({
                                text: "AI Resume Analysis Report",
                                bold: true,
                                italics: true,
                                size: 30,
                                color: "6B7280"
                            }),
                        ],
                    }),

                    new Paragraph({
                        spacing: {
                            after: 120,
                        },
                        children: [
                            new TextRun({
                                text: "Candidate Name: ",
                                bold: true,
                            }),
                            new TextRun({
                                text: user?.name || "Unknown",
                            }),
                        ],
                    }),

                    new Paragraph({
                        spacing: {
                            after: 250,
                        },
                        children: [
                            new TextRun({
                                text: "Target Role: ",
                                bold: true,
                            }),
                            new TextRun({
                                text: user?.targetRole || "Not Specified",
                            }),
                        ],
                    }),

                    new Paragraph({
                        spacing: {
                            after: 300,
                        },
                    }),

                    new Table({

                        width: {
                            size:100,
                            type: WidthType.PERCENTAGE,
                        },

                        rows: [
                            new TableRow({
                                children: [
                                    
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "Resume Score",
                                                        bold: true,
                                                    })
                                                ],
                                            }),
                                        ],
                                    }),

                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: String(analysis.resumeScore ?? "-"),
                                                        bold: true,
                                                        size: 48,
                                                        color: "16A34A",
                                                    }),
                                                ],
                                            })
                                        ]
                                    }),

                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "ATS Score",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),

                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: String(analysis.atsScore ?? "-"),
                                                        bold: true,
                                                        size: 48,
                                                        color: "2563EB",
                                                    }),
                                                ],
                                            })
                                        ]
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        spacing: {
                            after: 300,
                        },
                    }),

                    new Paragraph({
                        border: {
                            top: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "D1D5DB",
                            },
                        },
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Strengths",
                                bold: true,
                                size: 34,
                                color: "16A34A"
                            }),
                        ],
                        spacing: {
                            before: 300,
                            after: 150,
                        },
                    }),

                    ...(analysis.strengths || []).map(item => 
                        new Paragraph({
                            bullet: {
                                level: 0,
                            },
                            children: [
                                new TextRun(item),
                            ],
                        })
                    ),

                    new Paragraph({
                        border: {
                            top: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "D1D5DB",
                            },
                        },
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Weaknesses",
                                bold: true,
                                size: 34,
                                color: "DC2626",
                            }),
                        ],
                        spacing: {
                            before: 300,
                            after: 150,
                        },
                    }),

                    ...(analysis.weaknesses || []).map(item => 
                        new Paragraph({
                            bullet: {
                                level: 0,
                            },
                            children: [
                                new TextRun(item),
                            ],
                        })
                    ),

                    new Paragraph({
                        border: {
                            top: {
                                style: BorderStyle.SINGLE,
                                size: 12,
                                color: "D1D5DB",
                            },
                        },
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Suggestions",
                                bold: true,
                                size: 34,
                                color: "2563EB",
                            }),
                        ],
                        spacing: {
                            before: 300,
                            after: 150,
                        },
                    }),

                    ...(analysis.suggestions || []).map(item => 
                        new Paragraph({
                            bullet: {
                                level: 0,
                            },
                            children: [
                                new TextRun(item),
                            ],
                        })
                    ),

                    new Paragraph({
                        spacing: {
                            before: 500,
                        },
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            before: 400,
                        },
                        children: [
                            new TextRun({
                                text: "Generated On: ",
                                bold: true,
                            }),
                            new TextRun(new Date().toLocaleString()),
                        ],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            before: 500,
                        },
                        children: [
                            new TextRun({
                                text: "Generated by Career Compass AI",
                                bold: true,
                                color: "2563EB",
                            }),
                            new TextRun({
                                text: "Empowering Your Career Journey",
                                italics: true,
                                color: "6B7280",
                            }),
                        ],
                    }),
                ],
             },
        ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=Resume-Analysis.docx"
    );

    res.send(buffer);

}