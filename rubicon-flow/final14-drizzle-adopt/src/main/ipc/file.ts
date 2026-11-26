import {
  getCurrentFileContent,
  updateFile,
  updateTitle,
} from '@/main/utils/fileHelper';
import {
  FILE_GET_CURRENT_CHANNEL,
  FILE_UPDATE_CHANNEL,
  WINDOW_TITLE_UPDATE_CHANNEL,
} from '@/types/channels/file';
import { ipcMain } from 'electron';

export function initFileIpc() {
  ipcMain.handle(FILE_GET_CURRENT_CHANNEL, getCurrentFileContent);

  ipcMain.on(FILE_UPDATE_CHANNEL, updateFile);

  ipcMain.on(WINDOW_TITLE_UPDATE_CHANNEL, updateTitle);
}
