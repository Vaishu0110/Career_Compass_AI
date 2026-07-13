import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function generateJobRecommendations(profile, resumeAnalysis) {
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        temperature:0.3,
        max_tokens:1200,
        messages: [
            {
                role: "system",
                content:`
                Return ONLY valid JSON.
                {
                    "jobs":[
                        {
                            "title":"",
                            "company":"",
                            "location":"",
                            "salary":"",
                            "matchScore":"",
                            "skillsMatched":"",
                            "missingSkills":"",
                            "reason":""
                        }
                    ]
                }
                `
            },
            {
                role: "user",
                content: `
                Profile:${JSON.stringify(profile)}
                Resume:${JSON.stringify(resumeAnalysis)}
                Recommend the best jobs.
                `
            }
        ]
    });

    const raw = completion.choices[0].message.content;

    const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleaned);

}