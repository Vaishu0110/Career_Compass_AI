import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function evaluateInterview(role, qa) {
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        temperature: 0.3,
        max_tokens: 2500,

        messages: [
            {
                role: "system",
                content: `
                    You are an expert Interview Evaluator. 
                    Return ONLY valid JSON.

                    {
                        "overallScore": 0,

                        "questions": [
                            {
                                "question": "",
                                "answer": "",
                                "feedback": "",
                                "score": 0
                            }
                        ],

                        "strengths": [],
                        "weaknesses": [],
                        "suggestions": []
                    }
                    
                    Rules:

                    1. Evaluate EVERY question and answer provided.
                    2. Preserve the original question.
                    3. Preserve the candidate's original answer.
                    4. Give useful feedback for EVERY answer.
                    5. Give each answer a score from 0 to 100.
                    6. Calculate overallScore using the individual answer scores.
                    7. If an answer is empty, give it a score of 0 and explain that no answer was provided.
                    8. Evaluate answers according to the requested role.
                    9. Identify the candidate's strengths.
                    10. Identify weaknesses.
                    11. Give practical suggestions for improvement.
                    12. overallScore must be a number between 0 and 100.
                    13. Every individual score must be a number between 0 and 100.
                    14. Do not return markdown.
                    15. Do not return code blocks.
                    16. Do not include any text outside the JSON.
                `
            },
            {
                role: "user",
                content: `
                    Role: ${role}
                    
                    Interview Questions and Answers:
                    ${JSON.stringify(qa, null, 2)}

                    Evaluate this interview.
                `
            }
        ]
    });

    const result = completion.choices[0].message.content;
    const cleaned = result.replace(/```json/gi, "").replace(/```/g, "").trim();

    try {
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Evaluation Parse Error:", cleaned);
        return {
            overallScore: 50,
            questions: Array.isArray(qa) ? qa : [],
            strengths: ["Completed the interview session"],
            weaknesses: ["AI response parsing error"],
            suggestions: ["Retry the interview evaluation"]
        };
    }
}