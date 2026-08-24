import fs from "fs";
import { createRequire } from "module";


const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");

export const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const uint8Data = new Uint8Array(dataBuffer);


  if(typeof pdfModule === "function") {
    const pdfData = await pdfModule(dataBuffer);
    return pdfData.text;
  }

  else if (pdfModule.default && typeof pdfModule.default === "function") {
    const pdfData = await pdfModule.default(dataBuffer);
    return pdfData.text;
  }

  else if (pdfModule.PDFParse) {
    const parser = new pdfModule.PDFParse(uint8Data);
    const parsed = await parser.getText();
    return parsed.text || parsed;
  }
  else {
    throw new Error("Unsupported pdf-parse version");
  }
};