import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function analyzeResumeWithAI(resumeText) 
{
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        max_tokens: 1000,
        temperature: 0.3,
        messages:
        [
            {
                role: "system",
                content : `
                You are an expert Resume Reviewer, ATS Expert and Career Coach.

                Analyze the resume carefully.

                Return ONLY valid JSON.
                {
                    "resumeScore": 0,
                    "atsScore": 0,
                    skills": [],
                    "missingSkills": [],
                    "strengths": [],
                    "weaknesses": [],
                    "recommendedRoles": [],
                    "roadmap": [],
                    "improvements": [],
                    "sumary": [],
                }

                Rules:

                - resumeScores must be betwenn 0 and 100.
                -atsScore must be between 0 and 100.
                -strengths should contain at least 3 points.
                -weaknesses should contain at least 3 points.
                -improvement should contain actionable resume improvements.
                -skills should contain all detected technical and soft skills.
                -missingSkills should contain important missing skills.
                -recommendedRoles should contain suitable job roles.
                -roadmap should contain learning steps in order.
                -summary should be a short paragraph explaining the overall quality.

                Return ONLY JSON.

                Do NOT wrap the response inside markdown.
                `,
            },
            {
                role: "user",
                content: resumeText,
            },
        ],
    });

    return completion.choices[0].message.content;
    
}