import { handleSettingAction } from '@/main/utils/settingHelper';
import { SETTING_ACTION_CHANNEL } from '@/types/channels/setting';
import { ipcMain } from 'electron';

export function settingIpcInit() {
  ipcMain.handle(SETTING_ACTION_CHANNEL, handleSettingAction);
}
