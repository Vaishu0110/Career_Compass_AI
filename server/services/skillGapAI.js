import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function analyzeSkillGap(skills, targetRole) {
    const completion = await client.chat.completions.create({
        model:"google/gemini-2.5-flash",
        temperature: 0.4,
        max_tokens: 600,
        messages:[
            {
                role:"system",
                content: `
                You are a Skill Gap Analyzer.

                Analyze the user's current skill against their target job role.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use code fences.
                Do not add explanations outside the JSON.

                The response MUST have exactly this structure:

                {
                    "missingSkills": [],
                    "roadmap": [],
                    "estimatedTime": ""
                }

                Rules:

                - missingSkills must contain a maximum of 10 skills.
                - roadmap must contain exactly 6 concise learning steps.
                - estimatedTime should be a realistic estimate such as "3-4 months".
                - Keep all values concise.
                `,
            },
            {
                role:"user",
                content:`
                Current Skills:${skills}
                Target Role:${targetRole}
                Find:
                1. Missing Skills
                2. Exactly 6 learning roadmap steps
                3. Estimated learning time
                `,
            }
        ],
    });
    const result = completion.choices[0].message.content;
    const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();
    try 
    {
        const parsed =  JSON.parse(cleaned);

        return {
            missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
            roadmap: Array.isArray(parsed.roadmap) ? parsed.roadmap : [],
            estimatedTime: typeof parsed.estimatedTime === "string" ? parsed.estimatedTime : "Unknown",
        };
        
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