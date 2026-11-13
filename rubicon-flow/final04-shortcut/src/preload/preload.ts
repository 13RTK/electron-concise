import { contextBridge, ipcRenderer } from 'electron';
import {
  FILE_GET_CURRENT_CHANNEL,
  FILE_OPEN_CHANNEL,
} from '@/types/channels/file';
import { File } from '@/types/File';

const apiKey = 'electronAPI';

const api = {
  onOpenFile: (callback) =>
    ipcRenderer.on(FILE_OPEN_CHANNEL, (_event, result: File) =>
      callback(result),
    ),

  getCurrentFile: () => ipcRenderer.invoke(FILE_GET_CURRENT_CHANNEL),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
