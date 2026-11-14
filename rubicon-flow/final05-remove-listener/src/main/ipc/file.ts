import { getCurrentFileContent } from '@/main/utils/fileHelper';
import { FILE_GET_CURRENT_CHANNEL } from '@/types/channels/file';
import { ipcMain } from 'electron';

export function initFileIpc() {
  ipcMain.handle(FILE_GET_CURRENT_CHANNEL, getCurrentFileContent);
}
