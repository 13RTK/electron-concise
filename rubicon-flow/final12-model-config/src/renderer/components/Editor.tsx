import { useEffect } from 'react';

import { useEditor } from '@/renderer/hooks/editor';

export function Editor() {
  const {
    lastLoadedFileContent,
    editorContent,
    editorRef,
    setLastLoadedFileContent,
    monacoEl,
  } = useEditor();

  const { onSaveFile, updateFile, updateTitle } = window.electronAPI;

  const isDirty = lastLoadedFileContent !== editorContent;

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

  return <div className="h-full w-full" ref={monacoEl}></div>;
}
