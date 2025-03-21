import axios from "axios";
import "highlight.js/styles/github-dark.css"; // Dark theme for code highlighting
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import CodeEditor1 from "../Component/CodeEditor";

const Chat = () => {
  const [messages, setMessages] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fullResponseRef = useRef("");
  const typeSpeedRef = useRef(0.1); // milliseconds per character
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
   const getRand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // Effect for typing animation
  useEffect(() => {
    if (isTyping && displayedText.length < fullResponseRef.current.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullResponseRef.current.substring(0, displayedText.length + getRand(1, 50)));
      }, typeSpeedRef.current);
      
      return () => clearTimeout(timer);
    } else if (isTyping && displayedText.length === fullResponseRef.current.length) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping]);

  // Effect for scrolling
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, displayedText]);

  const sendMessage = async () => {
    if (!messages.trim()) return;

    setChatHistory((prev) => [...prev, { text: messages, sender: "user" }]);
    setMessages("");
    setLoading(true);
    
    // Add the "thinking..." message immediately
    setChatHistory((prev) => [...prev, { text: "Thinking...", sender: "ai", isThinking: true }]);

    try {
      const { data } = await axios.post(
        "https://backend-beta-olive.vercel.app/ai/get-review",
        { code: messages }
      );
      console.log("🚀 ~ sendMessage ~ data:", data?.review);
      
      // Remove the thinking message
      setChatHistory((prev) => prev.filter(msg => !msg.isThinking));
      
      // Start typing animation
      fullResponseRef.current = data?.review || "";
      setDisplayedText("");
      setIsTyping(true);
      
      // Add the message with empty text initially (will be filled by the animation)
      setChatHistory((prev) => [...prev, { text: "", sender: "ai", isAnimating: true }]);
      
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Remove thinking message and add error message
      setChatHistory((prev) => {
        const filteredHistory = prev.filter(msg => !msg.isThinking);
        return [
          ...filteredHistory,
          { text: "Error: Unable to get a response.", sender: "ai" },
        ];
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Update the last message when typing animation is active
  useEffect(() => {
    if (isTyping) {
      setChatHistory((prev) => {
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[newHistory.length - 1].isAnimating) {
          newHistory[newHistory.length - 1] = {
            ...newHistory[newHistory.length - 1],
            text: displayedText,
          };
        }
        return newHistory;
      });
    }
  }, [displayedText, isTyping]);
  
  if (chatHistory.length === 0) {
    return (
      <div className="md:mt-[20%] mt-[70%]">
        <h1 className="text-center text-2xl">What can I help with?</h1>
        <div className=" flex items-center gap-2 p-4 md:w-[70%] mx-auto rounded-lg">
          <CodeEditor1 messages={messages} setMessages={setMessages} />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 ${
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
    <div className="w-full flex flex-col max-h-[80vh]">
      <h2 className="text-lg font-semibold mb-2 text-center p-4">Code Chat</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:w-[60%] mx-auto space-y-20 max-h-[70%] hide-scrollbar">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded shadow-sm mb-10 ${
              msg.sender === "user"
                ? "self-end ml-auto bg-gray-600 border border-gray-800 text-white rounded-lg max-w-[60%]"
                : msg.isThinking
                ? "self-start font-mono text-gray-500 italic"
                : "self-start font-mono"
            }`}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
            {msg.isAnimating && isTyping && <span className="animate-pulse">▋</span>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 p-4 min-w-full md:min-w-[70%] mx-auto">
        <CodeEditor1 messages={messages} setMessages={setMessages} />
        <button
          onClick={sendMessage}
          disabled={loading || isTyping}
          className={`bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 ${
            (loading || isTyping) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Send size={20} />
          {loading ? "Loading..." : isTyping ? "Typing..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;