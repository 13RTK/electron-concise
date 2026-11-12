import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import styles from './Editor.module.css';

export function Editor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);

  const { onOpenFile } = window.electronAPI;

  useEffect(() => {
    if (!editorRef) {
      return;
    }

    const editor = monaco.editor.create(monacoEl.current!, {
      language: 'typescript',
      fontSize: 18,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    editorRef.current = editor;

    return () => {
      editor?.dispose();
      editorRef.current = null;
    };
  }, [editorRef.current]);

  onOpenFile((file) => {
    editorRef.current?.setValue(file.content);
  });

  return <div className={styles.Editor} ref={monacoEl}></div>;
}
