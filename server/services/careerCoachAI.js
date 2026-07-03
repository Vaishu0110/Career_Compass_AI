import OpenAI from "openai";

const client = new OpenAI ({
    apiKey: process.env.OPEN_ROUTER_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function askCareerCoach(question, history = []) {
    const completion = await client.chat.completions.create({
        model:"google/gemini-2.5-flash",
        temperature: 0.6,
        max_tokens: 500,

        messages: [{
            role: "system",
            content: `
            You are Career Compass AI.
            You are an expert career mentor for students, graduates, and software engineers.
            Help with:
            • Career guidance
            • Resume improvement
            • Interview preparation
            • Skill Development
            • Learning Roadmaps
            • Projects
            • Certifications
            • Salary guidance
            • Technology choices
            
            Rules:

            - Give practical advice.
            - Keep answers under 300 words.
            - Use bullet points wherever possible.
            - Never return JSON.
            -Never  return Markdown cade blocks.
            Be concise and professional.
            `,
        },

        ...history.slice(-10).map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
        })),
        {
            role:"user",
            content: question,
        },
    ],
    });
    
    return completion.choices[0].message.content;
}