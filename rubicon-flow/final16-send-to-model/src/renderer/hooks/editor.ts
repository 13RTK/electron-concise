import { inferLanguage } from '@/renderer/utils/languageHelper';
import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { File } from '@/types/File';
import { useSetAtom } from 'jotai';
import { addToChatAtom } from '@/renderer/atoms/message';

const { onOpenFile, getCurrentFile } = window.electronAPI;

export function useEditor() {
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const monacoEl = useRef<null | HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState('');

  const addToChat = useSetAtom(addToChatAtom);

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

    const addToChatAction = editor.addAction({
      id: 'add-to-chat',
      label: 'Add to chat',
      contextMenuGroupId: 'navigation',

      run(activeEditor) {
        const selections = activeEditor.getSelections();
        const model = activeEditor.getModel();

        if (!selections || !model) {
          return;
        }

        const selectedText = selections
          .filter((selection) => !selection.isEmpty())
          .map((selection) => model.getValueInRange(selection))
          .join('\n');

        if (selectedText) {
          addToChat(selectedText);
        }
      },
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
      addToChatAction.dispose();
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
