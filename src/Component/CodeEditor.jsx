import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";

const CodeEditor1 = ({messages, setMessages}) => {

  return (
    <div className="flex gap-2 w-full bg-gray-900">
      <CodeEditor
        value={messages}
        language="javascript"
        onChange={(evn) => setMessages(evn.target.value)}
        placeholder="Type your code here..."
        padding={15}
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          borderRadius: 50,
          backgroundColor: "#303030",
          flex: 1,
        }}
      />
    </div>
  );
};
export default CodeEditor1;