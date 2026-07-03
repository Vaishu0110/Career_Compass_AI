import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function analyzeSkillGap(skills, targetRole) {
    const completion = await client.chat.completions.create({
        model:"google/gemini-2.5-flash",
        temperature: 0.4,
        max_tokens: 300,
        messages:[
            {
                role:"system",
                content: `
                You are a Skill Gap Analyzer.
                Return ONLY valid JSON.
                {
                "missingSkills": [],
                "roadmap": [],
                "estimatedTime": ""
                }
                Rules:
                - Maximum 10 missing skills
                - Maximum 8 roadmap steps
                - Keep responses concise
                `,
            },
            {
                role:"user",
                content:`
                Current Skills:${skills}
                Target Role:${targetRole}
                Find:
                1.Missing Skills
                2.6-step learning roadmap
                `,
            }
        ],
    });
    const result = completion.choices[0].message.content;
    const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();
    try 
    {
        return JSON.parse(cleaned);
    } catch (err) 
    {
        console.error("JSON Parse Error:", cleaned);

        return {
            missingSkills: [],
            roadmap: [],
            estimatedTime: "Unknown"
        };
    }
}