import { contextBridge, ipcRenderer } from 'electron';
import { WindowAction } from '@/types/WindowAction';
import { WINDOW_ACTION_CHANNEL } from '@/types/channels/window';
import { ClipboardAction } from '@/types/ClipboardAction';
import {
  CLIPBOARD_ACTION_CHANNEL,
  CLIPBOARD_UPDATE_CHANNEL,
} from '@/types/channels/clipboard';

const apiKey = 'electronAPI';

const api = {
  windowAction: (action: WindowAction) =>
    ipcRenderer.send(WINDOW_ACTION_CHANNEL, action),

  clipboardAction: (action: ClipboardAction, historyId?: number) =>
    ipcRenderer.invoke(CLIPBOARD_ACTION_CHANNEL, action, historyId),

  onUpdateClipboard: (callback) =>
    ipcRenderer.on(CLIPBOARD_UPDATE_CHANNEL, (_event) => callback()),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
