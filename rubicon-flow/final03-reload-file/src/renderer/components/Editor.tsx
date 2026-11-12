import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import styles from './Editor.module.css';

export function Editor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);

  const { onOpenFile, getCurrentFile } = window.electronAPI;

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
  });

  return <div className={styles.Editor} ref={monacoEl}></div>;
}
