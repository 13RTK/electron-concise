import { contextBridge, ipcRenderer } from 'electron';
import { FILE_OPEN_CHANNEL } from '@/types/channels/file';

const apiKey = 'electronAPI';

const api = {
  onOpenFile: (callback) =>
    ipcRenderer.on(FILE_OPEN_CHANNEL, (_event, result: File) =>
      callback(result),
    ),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
