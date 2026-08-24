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
                2. NEVER invent information.
                3. Preserve the user's personal information exactly:
                - fullName
                - email
                - phone
                - linkedin
                - github
                - portfolio
                - education 
                - targetRole
                4. Improve only the wording of:
                - summary
                - skills
                - projects
                - experience
                - achievements
                5. Use ONLY information provided by the user.
                6. Generate professional ATS-friendly content.
                7. Fix grammar mistakes.
                8. Rewrite projects professionally.
                9. Return ONLY valid JSON.
                Return exactly:
                {
                "fullName": "",
                "email": "",
                "phone": "",
                "linkedin": "",
                "github": "",
                "portfolio": "",
                "education": "",
                "summary": "",
                "skills": "",
                "projects": [],
                "experience": [],
                "achievements": []
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

            IMPORTANT:
            Return the user's personal/contact information exactly as provided.

            Improve the professional wording of the summary, skills, projects, experience, and achievements.

            Do not invent missing information.
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
    try{
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Resume AI JSON Parse Error:", error);
        console.error("AI Response:", cleaned);
        
        throw new Error("AI returned invalid resume data.");
    }
}