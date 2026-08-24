import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function generateQuestions(role, difficulty="Medium"){
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        max_tokens: 1200,
        temperature: 0.4,
        messages:[
            {
                role : "system",
                content : `
                Return ONLY valid JSON.

                The JSON must follow exactly this structure:
                {
                    "questions":[
                        {
                            "question": ""
                        }
                    ]
                }
                Rules:
                - Generate exactly 15 questions.
                - Generate 10 role-specfic technical questions.
                - Generate 5 HR/behavioral questions.
                - Do not provide answers.
                - Do not provide explanations.
                - Do not use markdown.
                - Do not include any text outside the JSON.
                `,
            },
            {
                role:"user",
                content:`Generate an interview for:
                
                Role: ${role}
                Difficulty: ${difficulty}
                
                Question should include:
                
                Return exactly 15 questions.
                `,
            },
        ],
    });

    const result = completion.choices[0].message.content;

    const cleaned = result.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleaned);
}
