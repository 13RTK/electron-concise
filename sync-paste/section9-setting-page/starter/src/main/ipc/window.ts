import { handleWindowAction } from '@/main/utils/windowHelper';
import { WINDOW_ACTION_CHANNEL } from '@/types/channels/window';
import { ipcMain } from 'electron';

export function windowIpcInit() {
  ipcMain.on(WINDOW_ACTION_CHANNEL, handleWindowAction);
}
