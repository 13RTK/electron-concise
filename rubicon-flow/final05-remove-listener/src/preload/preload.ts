import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  FILE_GET_CURRENT_CHANNEL,
  FILE_OPEN_CHANNEL,
  FILE_SAVE_CHANNEL,
} from '@/types/channels/file';
import { File } from '@/types/File';

const apiKey = 'electronAPI';

const api = {
  onOpenFile: (callback) => {
    const listener = (_event: IpcRendererEvent, result: File) =>
      callback(result);

    ipcRenderer.on(FILE_OPEN_CHANNEL, listener);

    return () => ipcRenderer.removeListener(FILE_OPEN_CHANNEL, listener);
  },

  onSaveFile: (callback) => {
    const listener = () => callback();

    ipcRenderer.on(FILE_SAVE_CHANNEL, listener);

    return () => ipcRenderer.removeListener(FILE_SAVE_CHANNEL, listener);
  },

  getCurrentFile: () => ipcRenderer.invoke(FILE_GET_CURRENT_CHANNEL),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
