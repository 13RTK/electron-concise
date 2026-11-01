import {
  handleChangeWindowTitle,
  handleWindowAction,
} from '@/main/utils/windowHelper';
import {
  CHANGE_TITLE_CHANNEL,
  WINDOW_ACTION_CHANNEL,
} from '@/types/channels/window';
import { ipcMain } from 'electron';

export function windowIpcInit() {
  ipcMain.on(WINDOW_ACTION_CHANNEL, handleWindowAction);

  ipcMain.on(CHANGE_TITLE_CHANNEL, handleChangeWindowTitle);
}
