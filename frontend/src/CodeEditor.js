import React, { useEffect, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import draculaTheme from './draculaTheme';
import lightTheme from './lightTheme';

function CodeEditor() {
  const [theme, setTheme] = useState('dracula');

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('dracula', draculaTheme);
      monaco.editor.defineTheme('lightTheme', lightTheme);
    });
  }, []);

  const switchTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dracula' ? 'lightTheme' : 'dracula'));
  };

  return (
    <div>
      <button onClick={switchTheme}>Switch Theme</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme={theme}
      />
    </div>
  );
}

export default CodeEditor;
