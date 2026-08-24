import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function generateJobRecommendations(profile, resumeAnalysis) {
    try {
    const completion = await client.chat.completions.create({
        model: "google/gemini-2.5-flash",
        temperature:0.2,
        max_tokens: 3000,
        messages: [
            {
                role: "system",
                content:`
                You are the AI Job Recommendation engine for Career Compass AI.
                Your job is to recommend realistic career opportunities based ONLY in the candidate's provided profile and resume analysis.

                IMPORTANT:
                - These are AI-generated career recommendations.
                - They are NOT confirmed job openings.
                - Never claim that a company is currently hiring.
                - Never invent a specfic job posting, job ID, application URL, recruiter, or hiring status.
                - Companies may be suggested as examples of organizations that commonly hire for the recommended role.
                - Do not recommend role that are clearly unrelated to the candidate's target role or experience.

                Return ONLY valid JSON.

                Required format:
                {
                    "jobs":[
                        {
                            "title":"",
                            "company":"",
                            "location":"",
                            "salary":"",
                            "matchScore":0,
                            "skillsMatched":[],
                            "missingSkills":[],
                            "reason":""
                        }
                    ]
                }

                RULES FOR MATCH SCORE:

                Calculate the score logically using:

                - Target role relevance: 40%
                - Skill Match: 30%
                -Resume/ATS strength: 15%

                The score must be between 0 and 100.

                RULES FOR SKILLS:

                skillsMatched:
                - Skills the candidate already has that are useful for the role.

                missingSkills:
                - Important skills the candidate appears to lack based on the provided profile and resume analysis.

                Do not put the same skill in both arrays.

                RULES FOR RECOMMENDATIONS:

                - Recommend exactly 5 jobs when enough information is available.
                - Priortize the candidate's current skills.
                - Consider the candidate's current skills.
                - Consider education.
                - Consider experience.
                - Consider resume analysis.
                - Consoder ATS weaknesses when available.
                - Recommend entry-level roles for student/fresh graduates when appropriate.
                - Aviod recommending highly senior roles to inexperienced candidates.
                - Salary must be presented as an approximate range and should not be presented as guranteed.
                - Keep reasons concise and personalized.

                If some information is missing, do not invent it.
                `
            },
            {
                role: "user",
                content: `

                CANDIDATE PROFILE:
                
                ${JSON.stringify(profile, null, 2)}


                RESUME ANALYSIS:
                
                ${JSON.stringify(resumeAnalysis || {}, null, 2)}
                
                Using ONLY this information, generate the candidate's 8 best AI-powered career/job recommendations.

                Return ONLY valid JSON.
                `
            }
        ]
    });

    const raw = completion.choices?.[0].message?.content;

    if(!raw){
        return {
            jobs:[],
        };
    }

    let cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

    try {

        const parsed = JSON.parse(cleaned);

        if (!parsed.jobs || !Array.isArray(parsed.jobs)) {

            console.error("Invalid AI response structure:", parsed);

            return { jobs: [] };

        }

    return { jobs: parsed.jobs.slice(0, 8) };

    } catch (parseError) {

            console.error("Failed to parse AI JSON.");

            console.error("Cleaned AI response:");

            console.error(cleaned);

            console.error("JSON Parse Error:", parseError.message);

            return {

                jobs: []

            };

        }

    } catch (error) {
        console.error("Job Recommendation AI Error", error);
        throw error;
    };

}