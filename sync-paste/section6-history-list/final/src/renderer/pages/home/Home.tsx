import ClipboardHistoryListItem from '@/renderer/pages/home/ClipboardHistoryListItem';
import RootLayout from '@/renderer/ui/RootLayout';
import { ClipboardAction } from '@/types/ClipboardAction';
import { ClipboardHistory } from '@/types/ClipboardHistory';
import { useEffect, useState } from 'react';

function Home() {
  const [clipboardHistoryList, setClipboardHistoryList] = useState<
    ClipboardHistory[]
  >([]);

  async function loadClipboardHistory() {
    const clipboardHistoryList = await window.electronAPI.clipboardAction(
      ClipboardAction.GET_HISTORIES,
    );

    if (clipboardHistoryList) {
      setClipboardHistoryList(clipboardHistoryList);
    }
  }

  useEffect(() => {
    loadClipboardHistory();
  }, []);

  return (
    <RootLayout>
      <ul className='list bg-base-100 rounded-box shadow-md'>
        {clipboardHistoryList.map((clipboardHistory) => (
          <ClipboardHistoryListItem
            key={clipboardHistory.id}
            clipboardHistory={clipboardHistory}
          />
        ))}
      </ul>
    </RootLayout>
  );
}

export default Home;
