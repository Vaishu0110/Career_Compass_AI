import{ useState, useEffect, useRef }from "react";
import axiosInstance from "../api/axiosInstance";

export default function InterviewSimulator(){
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);
    const[role,setRole]=useState("");
    const[questions,setQuestions]=useState([]);
    const[loading,setLoading]=useState(false);
    const [difficulty, setDifficulty] = useState("Intermediate");
    const [timeLeft, setTimeLeft] = useState(1800);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

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
            setCurrentQuestion(0);
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

    useEffect(() => {
        if(question.length === 0 ) return;

        if(timeLeft <= 0) {
            submitInterview();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterview(timer);
    }, [question, timeLeft]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if(!SpeechRecognition) return;

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let transcript = "";

            for(let i=event.resultIndex; i< event.results.length; i++) {
                transcript += event.result[i][0].transcript;
            }

            const copy= [...answers];
            copy[currentQuestion] = transcript;
            setAnswer(copy);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
    }, [currentQuestion, answer]);

    const startListening = () => {
        if(!recognitionRef.current) {
            alert("Speech Recognition is not supported.");
            return;
        }

        recognitionRef.current.start();
        setListening(true);
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    }

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
                        <div>
                            <div className="flex justfy-between mb-2">
                                <span className="font-semibold">
                                    Question {currentQuestion + 1} of {question.length}
                                </span>

                                <span>
                                    {Math.round(((currentQuestion + 1)/question.length) * 100)}%
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div>
                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${((currentQuestion + 1)/question.length) * 100}%`,}} />
                                </div>
                            </div>

                            <div className="border rounded p-4">

                                <div className="flex justify-between mb-2">
                                    <h3 className="font-semibold">
                                        Question {currentQuestion + 1}
                                    </h3>

                                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                        {difficulty}
                                    </span>
                                </div>

                                <div className="mb-4 text-center">
                                    <span className="text-xl font-bold text-red-600">
                                        Time Left:
                                    </span>

                                    <p className="text-3xl font-bold">
                                        {Math.floor(timeLeft/60)} : {(timeLeft / 60) .toString().padStart(2, "0")}
                                    </p>
                                </div>

                                <p className="mb-4">
                                    {question[currentQuestion]}
                                </p>

                                <textarea className="w-full border mt-3 p-3 rounded" rows={4} placeholder="Type your answer..." value={answer[cuurrentQuestion]} onChange={(e) => {
                                    const copy = [...answers];
                                    copy[currentQuestion] = e.target.value;
                                    setAnswers(copy);
                                }} />

                                <div className="flex-gap-3 mt-3">

                                    {!listening ? (
                                        <button onClick={startListening} className="bg-purple-600 text-white px-4 py-2 rounded">
                                            Start Recording
                                        </button>
                                    ) : (
                                        <button onClick={stopListening} className="bg-red-600 text-white px-4 py-2 rounded">
                                            Stop Recording
                                        </button>
                                    )}
                                    
                                </div>

                                <div className="flex justify-between mt-6">

                                    <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                                        className="bg-gray-500 text-white px-6 py-2 rounded disabled:opacity-50">
                                        Previous
                                    </button>

                                    {currentQuestion < questions.length - 1 ?(
                                        <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="bg-blue-600 text-white px-6 py-2 rounded">
                                            Next
                                        </button>
                                    ):(
                                        <button onClick={submitInterview} className="bg-green-600 text-white px-6 py-2 rounded">
                                            Finish Interview
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    
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
                )}
            </div>
        </div>
    </div>
    );
}
