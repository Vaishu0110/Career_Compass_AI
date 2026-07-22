import { useState, useRef, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CareerCoach() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef =useRef(null);

  useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    },[messages]);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    const userMessage = {
        sender: "user",
        text: question,
        time: new Date(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);

    try {
        setLoading(true);

        const res = await axiosInstance.post("/career-coach/ask",{
            question,
            history: updatedHistory,
        });

        const aiMessage={
            sender: "ai",
            text: res.data.response,
            time: new Date(),
        };

        setMessages ((prev)=> [...prev, aiMessage]);
        setQuestion("");

    } catch (error) {
      console.error(error);
      alert("Failed to get response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        AI Career Coach
      </h1>

      <div className="flex justify-end mb-4">
        <button onClick={() => {
            if (windows.confirm("Clear Chat?")) {
                setMessages([]);
            }
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" >
            Clear Chat
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">

        <div className="flex flex-wrap gap-2 mb-5">

            <button onClick={() => 
                setQuestion("Resume my resume")
            } className="px-4 py-2 roundeed nb-gray-200">
                Resume Review
            </button>

            <button onClick={() => setQuestion("Give me interview tips")} className="px-4 py-2 rounded bg-gray-200">
                Interview Tips
            </button>

            <button onClick={() => setQuestion("Suggest Projects")} className="px-4 py-2 rounded bg-gray-200">
                Projects
            </button>

        </div>

        <textarea
          rows="5"
          className="w-full border rounded-lg p-4"
          placeholder="Ask anything about your career..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e)=> {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askAI();
                }
            }}
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Thinking..." : "Ask Career Coach"}
        </button>

      </div>
      <div className="bg-white shadow-lg rounded-xl p-6 mt-8 h-[500px] overflow-y-auto">
        {messages.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
                Hi,

                Ask me anything about:

                • Resume Improvement

                • Interview Preparation

                • Learning Roadmaps

                • Career Planning

                • Projects

                • Salary Advice
            </p>
        ) : (
            messages.map((msg, index) => (
                <div key={index} className= {`mb-5 flex items-end gap-2 ${msg.sender === "user" ?
                    "justify-end" : "justify-start"
                }`}>

                    {msg.sender === "ai" && (
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                            AI
                        </div>
                    )}
                    <div className={`max-w-[75%] rounded-xl px-5 py-3 whitespace-pre-wrap ${
                        msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                    }`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                        </ReactMarkdown>
                        {msg.time && (
                            <p className="text-xs opacity-60 mt-2">
                                {new Date(msg.time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        )}
                    </div>

                    {msg.sender === "user" && (
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            You
                        </div>
                    )}
                </div>
            ))
        )}

        {loading && (
            <div className="flex justify-start mb-5">
                <div className="bg-gray-200 rounded-xl px-5 py-3">
                    <span className="animate-pulse">
                        AI is thinking...
                    </span>
                </div>
            </div>
        )}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}