import React, { useState } from "react";
import { Send } from "lucide-react";

const ObjectionHandler = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI Assistant. Ask me about customer objections or negotiation strategies." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response (later integrate FastAPI or OpenAI API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `AI Suggestion: Try addressing their concern about "${input}" by emphasizing long-term ROI.` },
      ]);
    }, 800);

    setInput("");
  };

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-semibold text-[#002133] mb-6">AI Objection Handler</h1>
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-2xl max-w-[75%] ${
                m.from === "user" ? "bg-orange-red text-white" : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-red text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
};

export default ObjectionHandler;
