import { useState, useRef, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lightbulb, Trash2 } from "lucide-react";

export default function CareerCoach() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatHistory,setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const bottomRef =useRef(null);

  useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    },[messages]);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try{
            const res = await axiosInstance.get("/career-coach");

            setChatHistory(res.data);

        } catch (error) {
            console.error(error);
        }
    }

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

    const updatedMessages = [...messages, userMessage];
    
    const historyForAI = updatedMessages.map((msg) => ({
        sender: msg.sender,
        text:msg.text,
    }));

    setMessages(updatedMessages);

    try {
        setLoading(true);

        const res = await axiosInstance.post("/career-coach/ask",{
            question,
            history: historyForAI,
            chatId,
        });

        const aiMessage={
            sender: "ai",
            text: res.data.response,
            time: new Date(),
        };

        if(!chatId) {
            setChatId(res.data.chatId);
        }

        setMessages ((prev)=> [...prev, aiMessage]);
        fetchChats();
        setQuestion("");

    } catch (error) {
      console.error(error);
      alert("Failed to get response.");
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chat) => {

    setSelectedChat(chat);

    setChatId(chat._id);

    const formattedMessages = chat.messages.map((msg) => ({
        sender: msg.sender,
        text: msg.text,
        time: msg.time || msg.createdAt,
    }))
    setMessages(formattedMessages);

    setQuestion("");
  };

  const deleteChat = async (id) => {
    try{
        await axiosInstance.delete(`/career-coach/${id}`);

        fetchChats();

        if(chatId === id) {
            setMessages([]);

            setChatId(null);

            setSelectedChat(null);

        }
    } catch (error) {
        console.error(error);
    }
  };

  return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    24/7 AI Career Mentor
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-slate-900">
                    AI Career Coach 
                </h1>
                <p className="text-tealk-700  text-sm md:text-base mt-2 font-medium">
                    Get personalized guidance for resumes, interviews, career transitions, projects, and professional growth.
                </p>
            </div>
            {/* CHAT CONTAINER LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* SIDEBAR: CHAT HISTORY */}
                <div className="col-span-1 md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-5 shadow-lg border border-teal-100 flex flex-col h-[680px]">
                    <button
                        onClick={() => {
                            setMessages([]);
                            setChatId(null);
                            setSelectedChat(null);
                            setQuestion("");
                        }}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-3 px-4 rounded-2xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-2 mb-4 text-sm"
                    >
                        + New Chat
                    </button>
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                        <h2 className="text-xs font-bold text-teal-600 uppercase tracking-wider px-2">
                            Recent Conversations
                        </h2>
                        {chatHistory.length === 0 ? (
                            <p className="text-xs text-teal-500 text-center py-8">No previous chats yet.</p>
                        ) : (
                            chatHistory.map((chat) => (
                                <div
                                    key={chat._id}
                                    className={`p-3.5 rounded-2xl border transition duration-150 flex justify-between items-start gap-2 ${
                                        selectedChat?._id === chat._id
                                            ? "bg-teal-130 border-teal-100 shadow-sm"
                                            : "bg-teal-150 border-teal-700 hover:border-teal-300"
                                    }`}
                                >
                                    <div onClick={() => openChat(chat)} className="flex-1 cursor-pointer min-w-0">
                                        <h3 className="font-bold text-sm text-slate-50 truncate">
                                            {chat.title || "Untitled Chat"}
                                        </h3>
                                        <p className="text-xs text-teal-500 mt-1">
                                            {new Date(chat.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => deleteChat(chat._id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-bold p-1 rounded hover:bg-red-50 transition"
                                        title="Delete Conversation"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* MAIN CHAT AREA */}
                <div className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col h-[680px]">
                    
                    {/* CHAT MESSAGES DISPLAY */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-teal-100 flex-1 overflow-y-auto mb-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                                <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-md">
                                    < Lightbulb size={30} strokeWidth={2}/>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-teal-600">
                                        Welcome to AI Career Coach
                                    </h3>
                                    <p className="text-xs text-teal-100 max-w-md mt-1">
                                        Ask me anything about Resume Review, Interview Tips, Project Ideas, or Salary Negotiations.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-3 ${
                                        msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                                >
                                    {/* AVATAR ICON */}
                                    <div
                                        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 shadow ${
                                            msg.sender === "user"
                                                ? "bg-teal-600 text-white"
                                                : "bg-emerald-600 text-white"
                                        }`}
                                    >
                                        {msg.sender === "user" ? "You" : "AI"}
                                    </div>
                                    {/* MESSAGE BUBBLE */}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                                            msg.sender === "user"
                                                ? "bg-teal-600 text-white rounded-tr-none shadow-md"
                                                : "bg-emerald-50 border border-emerald-200 text-slate-900 rounded-tl-none shadow-sm"
                                        }`}
                                    >
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>

                                        {msg.time && (
                                            <p className="text-[10px] opacity-60 mt-1.5 text-right font-medium">
                                                {new Date(msg.time).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="flex justify-start items-center gap-3">
                                <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow">
                                    AI
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3">
                                    <span className="animate-pulse text-xs font-bold text-emerald-700 flex items-center gap-2">
                                        AI is thinking...
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                    {/* INPUT & QUICK PROMPT PILLS */}
                    <div className="bg-white rounded-3xl p-4 shadow-lg border border-teal-100 space-y-3">
                        
                        {/* QUICK PROMPT PILL BADGES */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setQuestion("Review my resume and suggest improvements.")}
                                className="text-xs bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 font-bold px-3 py-1.5 rounded-full transition"
                            >
                                Resume Review
                            </button>
                            <button
                                onClick={() => setQuestion("Give me top technical interview preparation tips.")}
                                className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-full transition"
                            >
                                Interview Tips
                            </button>
                            <button
                                onClick={() => setQuestion("Suggest impressive portfolio projects for a Full Stack Developer.")}
                                className="text-xs bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 font-bold px-3 py-1.5 rounded-full transition"
                            >
                                Project Ideas
                            </button>
                        </div>
                        {/* TEXTAREA INPUT */}
                        <div className="flex gap-2 items-center">
                            <textarea
                                rows="2"
                                className="flex-1 border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none [&::placeholder]:opacity-30"
                                placeholder="Ask anything about your career... (Press Enter to send)"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey && !loading) {
                                        e.preventDefault();
                                        askAI();
                                    }
                                }}
                            />
                            <button
                                onClick={askAI}
                                disabled={loading || !question.trim()}
                                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold px-6 py-4 rounded-2xl shadow-md transition transform active:scale-95 text-sm shrink-0"
                            >
                                Send 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}