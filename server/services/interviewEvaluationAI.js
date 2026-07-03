import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function evaluateInterview(role, qa) {
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        temperature: 0.3,
        max_tokens: 450,
        messages: [
            {
                role: "system",
                content: `
                    You are an Interview Evaluator. Return ONLY JSON.
                    {
                        "score":0,
                        "strengths":[],
                        "weaknesses":[],
                        "suggestions":[],
                    }
                `
            },
            {
                role: "user",
                content: `
                    Role: ${role}
                    Interview: ${qa}    
                `
            }
        ]
    });

    const result = completion.choices[0].message.content;

    const cleaned = result.replace(/```json/g, "").trim();

    return JSON.parse(cleaned);
}