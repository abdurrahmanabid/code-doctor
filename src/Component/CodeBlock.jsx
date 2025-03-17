import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};

const CodeEditor = () => {
  // State to manage the input code
  const [code, setCode] = useState(
    `function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));`
  );

  // State to manage the selected language
  const [language, setLanguage] = useState('javascript');

  // Handle changes in the textarea
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  // Handle changes in the language dropdown
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Code Editor</h1>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="language">Select Language: </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          style={{ padding: '5px', borderRadius: '4px' }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="java">Java</option>
        </select>
      </div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        style={{
          width: '100%',
          height: '150px',
          padding: '10px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '10px',
        }}
        placeholder="Enter your code here..."
      />
      <h2>Preview:</h2>
      <CodeBlock code={code} language={language} />
    </div>
  );
};

export default CodeEditor;