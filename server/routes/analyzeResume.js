import express from "express";
import fs from "fs";
import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");


const router = express.Router();

const storage= multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+ file.originalname);
    },
});

const upload = multer({storage});

router.post(
    "/analyze", upload.single("resume"), async(req,res)=>{
        try{
            const dataBuffer = fs.readFileSync(req.file.path);
            const pdfData = await pdf(dataBuffer);
            const text = pdfData.text;
            const skills=["javascript","react","node","mongodb","python","java","sql","machine learning",];
            const foundSkills = skills.filter(
              (skill) => text.toLowerCase().includes(skill)
                );
            res.json({
                extractedText: text.substring(0,1000),skills:foundSkills,
            });
        } catch (error){
            res.status(500).json({message:error.message,});
        }
    }
);

export default router;