import { handleSystemAction } from '@/main/utils/systemHelper';
import { SYSTEM_INFO_CHANNEL } from '@/types/channels/system';
import { ipcMain } from 'electron';

export function systemIpcInit() {
  ipcMain.handle(SYSTEM_INFO_CHANNEL, handleSystemAction);
}
