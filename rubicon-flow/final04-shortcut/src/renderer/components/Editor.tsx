import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import styles from './Editor.module.css';

export function Editor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);

  // Store the file content at the first time
  const [loadedFileContent, setLoadedFileContent] = useState<string | null>(
    null,
  );

  const { onOpenFile, getCurrentFile, onSaveFile } = window.electronAPI;

  useEffect(() => {
    if (!monacoEl) {
      return;
    }

    const editor = monaco.editor.create(monacoEl.current!, {
      language: 'typescript',
      fontSize: 18,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    editorRef.current = editor;

    getCurrentFile()
      .then((file) => {
        if (!file) {
          return;
        }

        editor.setValue(file.content);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      editor?.dispose();
      editorRef.current = null;
    };
  }, []);

  onOpenFile((file) => {
    editorRef.current?.setValue(file.content);
    setLoadedFileContent(file.content);
  });

  onSaveFile(() => {
    if (!editorRef || !editorRef.current || !loadedFileContent) {
      return;
    }

    if (editorRef.current.getValue() === loadedFileContent) {
      return console.log('not change detected');
    }

    console.log('try to save');
    setLoadedFileContent(editorRef.current.getValue());
  });

  return <div className={styles.Editor} ref={monacoEl}></div>;
}
