import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENROUTER_API_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function generateRoadmap(targetRole) {
    const compilation = await client.chat.completions.create({
        model:"google/gemini-2.5-flash",
        temperature:0.3,
        max_tokens: 400,
        messages:[
            {
            role: "system",
            content: `
            Return ONLY valid JSON.
            {
            "months":[
            {
            "month":"",
            topics:[]
            }
            ]
            }`
        },
        {
            role:"user",
            content: `Create alearning roadmap for ${targetRole}`
        }
    ]
    });
    const result=completion.choices[0].message.content;
    const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();
    
    return JSON.parse(cleaned);
}