import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function generateQuestions(role, difficulty){
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        max_tokens: 800,
        temperature: 0.4,
        messages:[
            {
                role : "system",
                content : `
                Return ONLY valid JSON
                {
                    "questions":[
                        {
                            "question": ""
                        }
                    ]
                }`
            },
            {
                role:"user",
                content:`Generate 15 interview questions for ${role}

                Difficulty: ${difficulty}
                
                Question should include:
                
                - 10 ${role} questions
                - 5 HR/Behavioral question
                
                Return ONLY valid JSON.
                Do not include answers.
                Do not include maekdown.`
            }
        ]
    });
    const result = completion.choices[0].message.content;

    const cleaned = result.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleaned);
}
