import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = () => {
  // State to manage the input code
  const [code, setCode] = useState("");

  // State to manage the selected language
  const [language, setLanguage] = useState("javascript");

  // Handle changes in the textarea
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="p-5 font-sans">
      <div className="relative">
        {/* Textarea for Code Input */}
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-48 p-3 rounded border border-gray-300 text-transparent caret-black resize-none"
          placeholder="Enter your code here..."
          spellCheck="false"
        />

        {/* Syntax-Highlighted Code Preview */}
        <div className="absolute inset-0 p-3 pointer-events-none overflow-auto">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            className="!m-0 !p-0"
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <button onClick={()=>console.log(code)}>Click</button>
      </div>
    </div>
  );
};

export default CodeEditor;
