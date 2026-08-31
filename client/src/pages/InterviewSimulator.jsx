import{ useState, useEffect, useRef }from "react";
import axiosInstance from "../api/axiosInstance";
import { Mic, MessageCircle, ChevronLeft, ChevronRight, Clock} from "lucide-react";

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
    const [submitted, setSubmitted] = useState(false);

    const generateQuestions = async () => {
        if(!role.trim()){
            alert("Please enter a role");
            return;
        }

        try {
            setLoading(true);

            if(recognitionRef.current) {
                recognitionRef.current.stop();
            }

            setListening(false);

            const res = await axiosInstance.post(
                "/interview/questions",
                {
                    role: role.trim(),
                    difficulty,
                }
            );

            const qs = res.data?.questions || [];

            if(qs.length === 0) {
                alert("No interview question were generated.");
                return;
            }

            setQuestions(qs);
            setAnswers(new Array(qs.length).fill(""));
            setCurrentQuestion(0);
            setTimeLeft(1800);
            setEvaluation(null);
            setSubmitted(false);
           }catch (error) {
            console.error(error);
            alert("Failed to generate questions");
           }finally {
            setLoading(false);
           }
    };

    const submitInterview = async() => {
        if (submitted || loading) return;

        try{
            setLoading(true);

            const qa = questions.map((q, i)=> ({question: q.question, answer: answers[i] || ""}));

            console.log("Submitting interview:",{role, difficulty, qa,});

            const res=await axiosInstance.post("/interview/evaluate",
                {role: role.trim(), difficulty, qa,}
            );

            console.log("Evaluation response:", res.data);
        
            if(res.data.success){
                setEvaluation(res.data.result);
                setSubmitted(true);
                setTimeLeft(0);
            } else {
                alert(res.data.message || "Evaluation Failed.");
            }
        } catch(error) {
            console.error("Interview Evaluation Failed:", error.response?.data || error);
            alert(error.response?.data?.message || "Failed to evaluate interview.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(questions.length === 0 || submitted) return;

        if(timeLeft <= 0) {
            submitInterview();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [questions.length, timeLeft, submitted]);

    const listeningRef = useRef(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if(!SpeechRecognition) return;

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let transcript = "";

            for(let i=0; i< event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            setAnswers((prev) => {
                const copy= [...answers];
                copy[currentQuestion] = transcript;
                return copy;
            });
        };

        recognition.onerror = (event) => {
            console.warn("Speech recognition error:", event.error);
            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                alert("Microphone permission denied. Please allow microphone access.");
                listeningRef.current = false;
                setListening(false);
            }
        };

        recognition.onend = () => {
            if(listeningRef.current) {
                try{
                    recognition.start();
                } catch (e) {
                    listeningRef.current = false;
                    setListening(false);
                }
            } else {
                setListening(false);
            }
        };

        recognitionRef.current = recognition;

        return () => {
            listeningRef.current = false;
            recognition.stop();
        };
    }, [currentQuestion]);

    const startListening = () => {
        if(!recognitionRef.current) {
            alert("Speech Recognition is not supported in this browser.Please use Chrome or Edge..");
            return;
        }

        listeningRef.current = true;
        setListening(true);
        try{
            recognitionRef.current.start();
        } catch (err) {
            console.error(err);
        }
    };

    const stopListening = () => {
        listeningRef.current = false;
        setListening(false);
        recognitionRef.current?.stop();
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-bolck bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Voice & Technical Practice Engine
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-slate-900">
                    AI Interview Simulator
                </h1>
                <p className="text-teal-700 text-sm md:text-base mt-2 font-medium">
                    Simulate realistic technical and behavioral interviews with real-time speech recognition and AI evaluation feedback.
                </p>
            </div>
            {/* INPUT & QUESTION GRID */}
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* INTERVIEW SETUP SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-100">
                            Interview Session Setup
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1.5">
                                    Target Position or Role *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Role (e.g., MERN Developer, Frontend Architect)"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full border border-teal-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1.5">
                                    Question Difficulty Level
                                </label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="w-full border border-teal-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                                >
                                    <option value="Beginner">Beginner Level</option>
                                    <option value="Intermediate">Intermediate Level</option>
                                    <option value="Advanced">Advanced Level</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={generateQuestions}
                        disabled={loading || !role.trim()}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base flex items-center justify-center gap-2"
                    >
                        {loading ? `Generating ${difficulty} Questions...` : "Start Mock Interview"}
                    </button>
                </div>
                {/* ACTIVE QUESTION & EVALUATION REPORT SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100  flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-100 ">
                            Active Interview Session
                        </h2>
                        {questions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[380px] text-center p-6 space-y-3 border-2 border-dashed border-teal-100 rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-md">
                                    <MessageCircle size={30} />
                                </div>
                                <p className="text-teal-600 text-sm font-medium">
                                    Configure your position on the left to start answering AI mock interview questions.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                
                                {/* PROGRESS BAR & COUNTDOWN TIMER */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold text-teal-600">
                                        <span>Question {currentQuestion + 1} of{" "}{questions.length}</span>
                                        <span className="text-teal-600  font-extrabold">
                                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Completed
                                        </span>
                                    </div>
                                    <div className="w-full bg-teal-100 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                {/* QUESTION CARD */}
                                <div className="bg-white p-5 rounded-2xl border border-teal-200 space-y-4">
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full">
                                            {difficulty} Level
                                        </span>
                                        {/* COUNTDOWN TIMER BADGE */}
                                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                                            <Clock size={13} />
                                            <span>
                                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-base font-semibold text-teal-200 leading-snug">
                                        {questions[currentQuestion]?.question}
                                    </p>
                                    {/* ANSWER TEXTAREA */}
                                    <textarea
                                        rows="4"
                                        className="w-full border border-teal-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed [&::placeholder]:opacity-20"
                                        placeholder="Type or speak your answer here..."
                                        value={answers[currentQuestion] || ""}
                                        onChange={(e) => {
                                            const copy = [...answers];
                                            copy[currentQuestion] = e.target.value;
                                            setAnswers(copy);
                                        }}
                                    />
                                    {/* VOICE RECORDING BUTTON */}
                                    <div className="flex gap-3">
                                        {!listening ? (
                                            <button
                                                onClick={startListening}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-1.5"
                                            >
                                                <Mic size={15} />
                                                Start Recording Voice
                                            </button>
                                        ) : (
                                            <button
                                                onClick={stopListening}
                                                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow animate-pulse flex items-center gap-1.5"
                                            >
                                                <Mic size={15} />
                                                Stop Recording (Listening...)
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {/* STEPPER NAVIGATION BUTTONS */}
                                <div className="flex justify-between items-center pt-2">
                                    <button
                                        disabled={currentQuestion === 0}
                                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                        className="bg-teal-100 text-teal-800 font-bold px-5 py-2.5 rounded-xl disabled:opacity-40 text-sm transition flex items-center gap-1.5"
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </button>
                                    {currentQuestion < questions.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                            className="bg-teal-100 text-teal-800 font-bold px-5 py-2.5 rounded-xl disabled:opacity-40 text-sm transition flex items-center gap-1.5"
                                        >
                                            <ChevronRight size={16} />
                                            Next Question
                                        </button>
                                    ) : (
                                        <button
                                            onClick={submitInterview}
                                            disabled={loading}
                                            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition transform active:scale-95 flex itens-center gap-1.5"
                                        >
                                            {loading ? "Evaluating Session..." : "Finish & Submit Interview"}
                                        </button>
                                    )}
                                </div>
                                {/* EVALUATION FEEDBACK REPORT */}
                                {evaluation && (
                                    <div className="mt-8 border-t border-teal-100 pt-6 space-y-4">
                                        
                                        <div className="bg-gradient-to-br from-teal-700 to-emerald-800 text-white rounded-2xl p-6 text-center shadow-xl">
                                            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200">
                                                Mock Interview Overall Rating
                                            </span>
                                            <p className="text-5xl font-black mt-2 text-emerald-300">
                                                {evaluation.overallScore ?? evaluation.score ?? 0}<span className="text-xl font-normal text-teal-200">/100</span>
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-emerald-50/80 p-4 rounded-2xl border-l-4 border-emerald-500">
                                                <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider mb-2">
                                                    Strengths
                                                </h4>
                                                <ul className="space-y-1 text-xs text-emerald-900 font-medium">
                                                    {evaluation.strengths?.map((item, idx) => (
                                                        <li key={idx}>• {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-emerald-50/80 p-4 rounded-2xl border-l-4 border-emerald-500">
                                                <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider mb-2">
                                                    Weaknesses
                                                </h4>
                                                <ul className="space-y-1 text-xs text-emerald-900 font-medium">
                                                    {evaluation.weaknesses?.map((item, idx) => (
                                                        <li key={idx}>• {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}