import axios from "axios";
import "highlight.js/styles/github-dark.css"; // Dark theme for code highlighting
import { Send } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import CodeEditor1 from "../Component/CodeEditor";

const Chat = () => {
  const [messages, setMessages] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!messages.trim()) return;

    setChatHistory((prev) => [...prev, { text: messages, sender: "user" }]);
    setMessages("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://backend-beta-olive.vercel.app/ai/get-review",
        { code: messages }
      );
      console.log("🚀 ~ sendMessage ~ data:", data?.review);
      setChatHistory((prev) => [...prev, { text: data?.review, sender: "ai" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        { text: "Error: Unable to get a response.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  if (chatHistory.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 p-4 md:w-[70%] mx-auto md:mt-[20%] mt-[70%]">
          
          <CodeEditor1 messages={messages} setMessages={setMessages} />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send size={20} />
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-center p-4">Code Chat</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:w-[60%] mx-auto space-y-20 max-h-[70%]">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded shadow-sm mb-10 ${
              msg.sender === "user"
                ? "self-end ml-auto bg-gray-600 border border-gray-800 text-white rounded-lg max-w-[60%]"
                : "self-start font-mono"
            }`}
          >
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 p-4 border-t fixed bottom-0 min-w-full">
        <CodeEditor1 messages={messages} setMessages={setMessages} />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Send size={20} />
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
