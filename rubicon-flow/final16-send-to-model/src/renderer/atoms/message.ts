import { showPanelAtom } from '@/renderer/atoms/showPanel';
import { atom } from 'jotai';

export const messageContentAtom = atom('');

export const addToChatAtom = atom(null, (get, set, selectedText: string) => {
  const currentMessageContent = get(messageContentAtom);

  set(showPanelAtom, true);
  set(
    messageContentAtom,
    currentMessageContent
      ? `${currentMessageContent}\n\n${selectedText}`
      : selectedText,
  );
});
