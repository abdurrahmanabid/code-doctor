import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";

const CodeEditor1 = ({ messages, setMessages }) => {
  return (
    <div className="flex gap-2 w-full relative">
      <CodeEditor
        value={messages}
        language="javascript"
        onChange={(evn) => setMessages(evn.target.value)}
        placeholder="Ask me anything..."
        padding={15}
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          borderRadius: 50,
          backgroundColor: "#303030",
          flex: 1,
          minHeight: "50px",
          maxHeight: "150px",
          overflowY: "auto",
          resize: "vertical",
        }}
        className="custom-scrollbar"
        autoFocus
      />
    </div>
  );
};

export default CodeEditor1;