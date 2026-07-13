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
    };

    setMessages((prev) => [...prev, userMessage]);
    try {
        setLoading(true);

        const res = await axiosInstance.post("/career-coach/ask",{
            question,
            history: messages,
        });

        const aiMessage={
            sender: "ai",
            text: res.data.response,
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
        <button onClick={()=> setMessages([])}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" >
            Clear Chat
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">

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
                Start chatting with your AI Career Coach
            </p>
        ) : (
            messages.map((msg, index) => (
                <div key={index} className= {`mb-5 flex ${msg.sender === "user" ?
                    "justify-end" : "justify-start"
                }`}>
                    <div className={`max-w-[75%] rounded-xl px-5 py-3 whitespace-pre-wrap ${
                        msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                    }`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                        </ReactMarkdown>
                    </div>
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