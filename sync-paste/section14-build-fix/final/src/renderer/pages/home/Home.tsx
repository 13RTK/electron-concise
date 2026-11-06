import ClipboardHistoryListItem from '@/renderer/pages/home/ClipboardHistoryListItem';
import RootLayout from '@/renderer/ui/RootLayout';
import { ClipboardAction } from '@/types/ClipboardAction';
import { ClipboardHistory } from '@/types/ClipboardHistory';
import { useEffect, useState } from 'react';

function Home() {
  const [clipboardHistoryList, setClipboardHistoryList] = useState<
    ClipboardHistory[]
  >([]);

  const { clipboardAction, onUpdateClipboard } = window.electronAPI;

  async function loadClipboardHistory() {
    const clipboardHistoryList = await clipboardAction(
      ClipboardAction.GET_HISTORIES,
    );

    if (Array.isArray(clipboardHistoryList)) {
      setClipboardHistoryList(clipboardHistoryList);
    }
  }

  async function deleteClipboardHistory(id: number) {
    const result = await clipboardAction(ClipboardAction.DELETE_HISTORY, id);

    if (result) {
      loadClipboardHistory();
    }
  }

  useEffect(() => {
    loadClipboardHistory();
  }, []);

  onUpdateClipboard(() => {
    loadClipboardHistory();
  });

  async function pasteClipboardHistory(id: number) {
    const success = await clipboardAction(ClipboardAction.PASTE_HISTORY, id);

    if (success === false) {
      alert('Please open Accessibility in your settings!');
    }
  }

  return (
    <RootLayout>
      <ul className='list bg-base-100 rounded-box shadow-md'>
        {clipboardHistoryList.map((clipboardHistory) => (
          <ClipboardHistoryListItem
            key={clipboardHistory.id}
            clipboardHistory={clipboardHistory}
            onDelete={deleteClipboardHistory}
            onPaste={pasteClipboardHistory}
          />
        ))}
      </ul>
    </RootLayout>
  );
}

export default Home;
