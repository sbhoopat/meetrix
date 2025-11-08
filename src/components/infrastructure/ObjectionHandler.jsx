import React, { useState } from "react";
import { Send } from "lucide-react";

const ObjectionHandler = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your AI Assistant 🤖. Ask me about customer objections, negotiation strategies, or sales improvement ideas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiResponse =
        data?.response || "Sorry, I couldn’t generate a response. Please try again.";

      setMessages((prev) => [...prev, { from: "bot", text: aiResponse }]);
    } catch (error) {
      console.error("AI Request Error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error connecting to AI server. Please check backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">
        AI Objection Handler
      </h1>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-50 mb-4 max-h-[60vh] sm:max-h-[70vh]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[75%] whitespace-pre-line ${
                m.from === "user"
                  ? "bg-[#FF4500] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-2">
            <div className="p-3 rounded-2xl bg-gray-200 text-gray-600 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <textarea
          className="flex-1 border p-2 rounded-md resize-none h-12 focus:outline-none w-full"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-[#FF4500] hover:bg-[#e03e00]"
          } text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-all`}
        >
          <Send size={18} /> {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ObjectionHandler;
