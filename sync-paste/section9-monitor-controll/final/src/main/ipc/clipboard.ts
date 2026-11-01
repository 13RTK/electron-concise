import { handleClipboardAction } from '@/main/utils/clipboardHistoryHelper';
import { CLIPBOARD_ACTION_CHANNEL } from '@/types/channels/clipboard';
import { ipcMain } from 'electron';

export function clipboardIpcInit() {
  ipcMain.handle(CLIPBOARD_ACTION_CHANNEL, handleClipboardAction);
}
