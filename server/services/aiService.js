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
                You are an ATS Resume Analyzer.

                Return ONLY raw JSON.

                Rules:
                - atsScore must be an integer between 0 and 100.
                - Calculate ATS score realistically.
                - Skills must contain detected skills from the resume.
                - MissingSkills must contain important missing skills.
                - RecommendedRoles must contain suitable career roles.
                - Roadmap must be a learning roadmap.

                Return only JSON.

                {
                "atsScore": number,
                "skills": []
                "missingSkills": []
                "recommendedRoles": []
                "roadmap": []
                }
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