import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import styles from './Editor.module.css';

export function Editor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);

  // Store the file content at the last load
  const [lastLoadedFileContent, setLastLoadedFileContent] = useState<
    string | null
  >(null);

  const [editorContent, setEditorContent] = useState('');

  const { onOpenFile, getCurrentFile, onSaveFile, updateFile, updateTitle } =
    window.electronAPI;

  const isDirty = lastLoadedFileContent !== editorContent;

  // Init editor
  useEffect(() => {
    if (!monacoEl.current) {
      return;
    }

    const editor = monaco.editor.create(monacoEl.current!, {
      language: 'typescript',
      fontSize: 18,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    const changeListener = editor.onDidChangeModelContent(() => {
      setEditorContent(editor.getValue());
    });

    const removeOpenFileListener = onOpenFile((file) => {
      editorRef.current?.setValue(file.content);
      setLastLoadedFileContent(file.content);
    });

    editorRef.current = editor;

    getCurrentFile()
      .then((file) => {
        if (!file) {
          return;
        }

        editor.setValue(file.content);
        setLastLoadedFileContent(file.content);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      editor?.dispose();
      editorRef.current = null;
      changeListener.dispose();
      removeOpenFileListener();
    };
  }, []);

  useEffect(() => {
    const removeSaveFileListener = onSaveFile(() => {
      if (!editorRef.current || lastLoadedFileContent === null) {
        return;
      }

      if (!isDirty) {
        return;
      }

      const editorValue = editorRef.current.getValue();
      updateFile(editorValue);
      setLastLoadedFileContent(editorValue);
    });

    return () => {
      removeSaveFileListener();
    };
  }, [lastLoadedFileContent, isDirty]);

  useEffect(() => {
    updateTitle(isDirty);
  }, [isDirty]);

  return <div className={styles.Editor} ref={monacoEl}></div>;
}
