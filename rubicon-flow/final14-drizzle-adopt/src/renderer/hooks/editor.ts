import { inferLanguage } from '@/renderer/utils/languageHelper';
import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { File } from '@/types/File';

const { onOpenFile, getCurrentFile } = window.electronAPI;

export function useEditor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState('');

  // Store the file content at the last load
  const [lastLoadedFileContent, setLastLoadedFileContent] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!monacoEl.current) {
      return;
    }

    const editor = monaco.editor.create(monacoEl.current!, {
      fontSize: 18,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    const changeListener = editor.onDidChangeModelContent(() => {
      setEditorContent(editor.getValue());
    });

    function applyFile(file: File) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, inferLanguage(file.filename));
      }

      editor.setValue(file.content);
      setLastLoadedFileContent(file.content);
    }

    const removeOpenFileListener = onOpenFile(applyFile);

    editorRef.current = editor;

    getCurrentFile()
      .then((file) => {
        if (!file) {
          return;
        }

        applyFile(file);
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

  return {
    editorContent,
    lastLoadedFileContent,
    editorRef,
    setLastLoadedFileContent,
    monacoEl,
  };
}
