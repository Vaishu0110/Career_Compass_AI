import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENROUTER_API_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function generateRoadmap(targetRole, missingSkills = []) {
    const completion = await client.chat.completions.create({
        model:"google/gemini-2.5-flash",
        temperature:0.4,
        max_tokens: 1500,
        messages:[
            {
            role: "system",
            content: `
            You are an expert career learning roadmap generator.

            Return ONLY valid JSON.

            Format:
            {
                "roadmap": [
                        {
                            "title": "Step title",
                            "description": "Short explanation",
                            "duration": "1-2 weeks"
                        }
                    ],
                "estimatedTime": ""
            }

            Rules:
            - Generate exactly 6 learning steps.
            - The roadmap must be specific to the target role.
            - Prioritize the missing skills.
            - Steps should progress from beginner/fundamentals to advanced/project preparation.
            - Keep description concise.
            - Do not include markdown.
            `
        },
        {
            role:"user",
            content: `
            Create a learning roadmap for:
            
            Target Role: ${targetRole}
            Missing Skills to Focus On: ${Array.isArray(missingSkills) ? missingSkills.join(", ") : missingSkills}

            Generate exactly 6 logical learning steps.
            `,
        },
    ],
    });

    const result=completion.choices[0].message.content;

    const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();

    try{
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Roadmap JSON Parse Error:", error.message);

        return {
            roadmap: [],
            estimatedTime: "Unknown",
        };
    }
}