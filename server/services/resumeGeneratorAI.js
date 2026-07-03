import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENROUTER_API_KEY,
    baseURL:"https://openrouter.ai/api/v1",
});

export async function generateResumeWithAI(data)
{
    const completion = await client.chat.completions.create({
        model:"google/gemini-2.5-flash", temperature:0.4, max_tokens:2000,
        messages: [{
            role:"system",
            content: `
                You are an expert ATS Resume Writer.
                IMPORTANT RULES:
                1. NEVER use placeholders.
                2. NEVER write:
                [mention technologies]
                Project Title 1
                Company Name
                Month Year
                yourusername
                3. Use ONLY information provided by the user.
                4. If information is missing, intelligently improve existing content.
                5. Generate professional ATS-friendly content.
                6. Fix grammar mistakes.
                7. Generate strong achievement bullets.
                8. Rewrite projects professionally.
                9. Return ONLY valid JSON.
                Return exactly:
                {
                "summary":"",
                "skills":[],
                "projects":[],
                "experience":[],
                "achievements":[],
                "linkedin":"",
                "github":"",
                "portfolio":""
                }
                `
        },
        {
            role:"user",
            content:`
            Name:${data.fullName}
            Email:${data.email}
            Phone:${data.phone}
            Target Role:${data.targetRole}
            Education:${data.education}
            Skills:${data.skills}
            Projects:${data.projects}
            Experience:${data.experience}
            LinkedIn:${data.linkedin}
            GitHub:${data.github}
            Portfolio:${data.portfolio}
            Template:${data.template}
            `,
        },
    ],
    });

    const result=completion.choices[0].message.content;
    console.log("AI RESPONSE:");
    console.log(result);
    const cleaned = result.replace(/```json/g,"").replace(/```/g,"").trim();
    console.log("CLEANED RESPONSE:");
    console.log(cleaned);
    
    return JSON.parse(cleaned);
}