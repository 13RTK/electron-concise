import { handleMessageAction } from '@/main/utils/messageHelper';
import { MESSAGE_ACTION_CHANNEL } from '@/types/channels/message';

import { ipcMain } from 'electron';

export function initMessageIpc() {
  ipcMain.handle(MESSAGE_ACTION_CHANNEL, handleMessageAction);
}
