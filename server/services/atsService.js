import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client= new OpenAI({apiKey:process.env.OPENROUTER_API_KEY,baseURL:"https://openrouter.ai/api/v1",});

export async function analyzeATS(resumeText, jobDescription){const completion = await client.chat.completions.create({model:"google/gemini-2.5-flash",temperature:0.3,
    max_tokens: 1500,
    messages:[
        {
            role:"system",
            content:`
            You are an ATS Resume Analyzer.

            Analyze the resume against the job description.

            {
            "score":0,
            "missingKeywords":[],
            "strengths":[],
            "weaknesses":[],
            "suggestions":[]
            }

            Rules:
            -Return Maximum 15 Missing Keyword according to importance
            -Return maximum 5 Strengths
            -Return maximum 5 Weaknesses
            -Return maximum 5 suggestions
            -Return ONLY valid JSON
            `,
        },
        {
            role:"user",
            content:`
            Resume:
            ${resumeText}
            Job Description:
            ${jobDescription}
            Compare ONLY against the job description.
            Identify the most important missing keywords.
            Do NOT generate generic keywords.
            Do NOT invent requirements.
            Return only the top 10-15 missing keywords.
            Return ONLY valid JSON.
            `,
        },
    ],
});
const result = completion.choices[0].message.content;
console.log("ATS RESPONSE:");
console.log(result);

const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();
try {
    return JSON.parse(cleaned);
} catch (error) {
    console.log("JSON Parse Error");
    console.log(cleaned);
    return {
        score: 0,
        missingKeywords:[],
        strengths:[],
        weaknesses:[],
        suggestions:["AI returned invalid JSON."]
    };

}
}