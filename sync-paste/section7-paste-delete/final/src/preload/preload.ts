import { contextBridge, ipcRenderer } from 'electron';
import { WindowAction } from '@/types/WindowAction';
import { WINDOW_ACTION_CHANNEL } from '@/types/channels/window';
import { ClipboardAction } from '@/types/ClipboardAction';
import { CLIPBOARD_ACTION_CHANNEL } from '@/types/channels/clipboard';

const apiKey = 'electronAPI';

const api = {
  windowAction: (action: WindowAction) =>
    ipcRenderer.send(WINDOW_ACTION_CHANNEL, action),

  clipboardAction: (action: ClipboardAction) =>
    ipcRenderer.invoke(CLIPBOARD_ACTION_CHANNEL, action),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
