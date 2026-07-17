import{ useState }from "react";
import axiosInstance from "../api/axiosInstance";

export default function InterviewSimulator(){
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);
    const[role,setRole]=useState("");
    const[questions,setQuestions]=useState([]);
    const[loading,setLoading]=useState(false);
    const [difficulty, setDifficulty] = useState("Intermediate");

    const generateQuestions = async () => {
        if(!role.trim()){
            alert("Please enter a role");
            return;
        }

        try {
            setLoading(true);

            const res = await axiosInstance.post(
                "/interview/questions",
                {role,
                    difficulty,
                }
            );

            const qs = res.data.result.questions;
            setQuestions(qs);
            setAnswers(new Array(qs.length).fill(""));
           }catch (error) {
            console.error(error);
            alert("Failed to generate questions");
           }finally {
            setLoading(false);
           }
    };

    const submitInterview = async() => {
        try{
            const qa=questions.map(
                (q,i)=> `Question: ${q} Answer: ${answers[i]}`
            ).join("\n");

            const res=await axiosInstance.post("/interview/evaluate",
                {role, difficulty, qa,}
            );
        
        setEvaluation(
            res.data.result
        );
        }
        catch(error) {
            console.error(error);
        }
    };

    return(
    <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">
            AI Interview Simulator    
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
            {/* INPUT SECTION */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Interview Setup
                </h2>
                <input type="text" placeholder="Enter Role (e.g. MERN Developer)"
                value={role} onChange={(e)=> setRole(e.target.value)} className="w-full border p-3 rounded mb-4"/>

                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full border p-3 rounded mb-4">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
                <button onClick={generateQuestions} disabled={loading} className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 ${ loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-7000"}`}>
                    {loading? `Generating ${difficulty} Questions...` : "Generate Questions"}
                </button>
            </div>
            {/*QUESTIONS SECTION */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Interview Question
                </h2>
                {questions.length === 0 ? (
                    <p className="text-gray-500">
                        Questions will appear here.
                    </p>
                ):( 
                    <div className="space-y-6">
                        {questions.map((question, index)=> (
                            <div key={index} className="border rounded p-4">
                                <div className="flex justify-between mb-2">
                                    <h3 className="font-semibold mb-2">
                                        Question {index + 1}
                                    </h3>

                                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 riunded">
                                        {difficulty}
                                    </span>
                                </div>
                                <p>{question}</p>
                                <textarea
                                    className="w-full border mt-3 p-3 rounded"
                                    rows={4}
                                    placeholder="Type your answer..."
                                    value={answers[index]}
                                    onChange={(e)=>{
                                        const copy=[...answers]
                                        copy[index]=e.target.value;
                                        setAnswers(copy);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {questions.length > 0 && (
                <button onClick={submitInterview} className="w-full mt-6 bg-green-600 text-white py-3 rounded">
                    Submit Interview
                </button>
            )}
            {evaluation && (
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-bold">
                        Interview Feedback
                    </h2>
                    <div className="text-5xl text-green-600 font-bold my-4">
                        {evaluation.overallScore}/100
                    </div>
                    <h3 className = "font-bold">
                        Strengths
                    </h3>
                    <ul className="list-disc pl-5">
                        {evaluation.strengths?.map(
                            (item, index)=>
                                <li key={index}>{item}</li>
                        )}
                    </ul>
                    <h3 className="font-bold mt-5">
                        Weaknesses
                    </h3>
                    <ul className="list-disc pl-5">
                        {evaluation.weaknesses?.map(
                            (item, index)=>
                                <li key={index}>
                                    {item}
                                </li>
                        )}
                    </ul>
                    <h3 className="font-bold mt-5">
                        Suggestions
                    </h3>
                    <ul className="list-disc pl-5">
                        {evaluation.suggestions?.map(
                            (item, index)=>
                                <li key={index}>{item}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    </div>
    );
}
