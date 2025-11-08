import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import translate from "google-translate-api-browser";
import { FaCommentAlt, FaWindowClose } from "react-icons/fa";

export default function ChatWindow() {
  const { i18n, t } = useTranslation();
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Helper to translate text
  const translateText = async (text, targetLang) => {
    try {
      const res = await translate(text, { to: targetLang });
      return res.text;
    } catch (err) {
      console.error("Translation failed:", err);
      return text; // fallback
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Convert Telugu input to English before sending to AI
    const userTextInEnglish =
      i18n.language === "te" ? await translateText(input, "en") : input;

    // --- Simulated AI Call (replace with your backend/AI API) ---
    const aiResponseInEnglish = `You said: ${userTextInEnglish}`;
    // ------------------------------------------------------------

    // If app language is Telugu, translate AI response back
    const aiResponseTranslated =
      i18n.language === "te"
        ? await translateText(aiResponseInEnglish, "te")
        : aiResponseInEnglish;

    setMessages((prev) => [
      ...prev,
      { from: "ai", text: aiResponseTranslated },
    ]);

    setLoading(false);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Handle "Enter" key to send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Icon - Toggle chat window visibility */}
      {!isChatOpen && (
        <div
          className="fixed bottom-6 right-6 bg-orange-500 p-3 rounded-full cursor-pointer shadow-lg hover:bg-orange-600"
          onClick={handleToggleChat}
        >
          <FaCommentAlt size={24} color="white" />
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 w-full sm:w-[350px] h-full sm:h-[450px] bg-white border border-gray-200 rounded-t-lg shadow-md overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-orange-red text-white p-3 font-semibold flex justify-between items-center">
              {t("Chat with AI")}
              <button
                onClick={handleCloseChat}
                className="text-white p-2"
              >
                <FaWindowClose size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.from === "user"
                      ? "ml-auto bg-orange-100 text-right text-[#002133]"
                      : "bg-gray-100 text-left text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-gray-500 text-sm italic">{t("Thinking...")}</div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("Type your message...")}
                onKeyDown={handleKeyDown} // Handle "Enter" key
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
                } text-white px-4 py-2 rounded-lg text-sm font-semibold transition`}
              >
                {t("Send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
