import { handleModelConfig } from '@/main/utils/modelConfigHelper';

import { MODEL_CONFIG_CHANNEL } from '@/types/channels/model';
import { ipcMain } from 'electron';

export function initModelIpc() {
  ipcMain.handle(MODEL_CONFIG_CHANNEL, handleModelConfig);
}
