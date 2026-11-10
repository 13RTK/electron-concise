import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import styles from './Editor.module.css';

export function Editor() {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          language: 'typescript',
          fontSize: 18,
          theme: 'vs-dark',
          automaticLayout: true,
        });
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <div className={styles.Editor} ref={monacoEl}></div>;
}
