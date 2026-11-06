import { ClipboardHistory } from '@/types/ClipboardHistory';
import { ClipboardTextIcon, TrashIcon } from '@phosphor-icons/react';

function ClipboardHistoryListItem({
  clipboardHistory,
  onDelete,
  onPaste,
}: {
  clipboardHistory: ClipboardHistory;
  onDelete: (id: number) => Promise<void>;
  onPaste: (id: number) => Promise<void>;
}) {
  const content =
    clipboardHistory.content.length > 50
      ? clipboardHistory.content.slice(0, 50) + '...'
      : clipboardHistory.content;

  return (
    <li className='list-row'>
      <div>
        {/* <img
              className='size-10 rounded-box'
              alt='Tailwind CSS list item'
              src='https://img.daisyui.com/images/profile/demo/1@94.webp'
            /> */}
      </div>
      <div>
        {/* content */}
        <div>{content}</div>

        {/* created at */}
        <div className='text-xs uppercase font-semibold opacity-60'>
          {new Date(clipboardHistory.created_at).toLocaleTimeString()}
        </div>
      </div>
      {/* Paste */}
      <button
        className='btn btn-square btn-ghost'
        onClick={() => onPaste(clipboardHistory.id)}
      >
        <ClipboardTextIcon size={24} weight='thin' />
      </button>

      {/* Delete */}
      <button
        className='btn btn-square btn-ghost hover:bg-red-500'
        onClick={() => onDelete(clipboardHistory.id)}
      >
        <TrashIcon size={24} weight='thin' />
      </button>
    </li>
  );
}

export default ClipboardHistoryListItem;
