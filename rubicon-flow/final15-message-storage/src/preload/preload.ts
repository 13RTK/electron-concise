import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  FILE_GET_CURRENT_CHANNEL,
  FILE_OPEN_CHANNEL,
  FILE_SAVE_CHANNEL,
  FILE_UPDATE_CHANNEL,
  WINDOW_TITLE_UPDATE_CHANNEL,
} from '@/types/channels/file';
import { File } from '@/types/File';
import { MODEL_CONFIG_CHANNEL } from '@/types/channels/model';
import { ModelConfig, ModelConfigAction } from '@/types/Model';
import { MESSAGE_ACTION_CHANNEL } from '@/types/channels/message';
import { MessageAction } from '@/types/Message';
import { ChatMessage } from '@/db/schema';

const apiKey = 'electronAPI';

const api = {
  onOpenFile: (callback) => {
    const listener = (_event: IpcRendererEvent, result: File) =>
      callback(result);

    ipcRenderer.on(FILE_OPEN_CHANNEL, listener);

    return () => ipcRenderer.removeListener(FILE_OPEN_CHANNEL, listener);
  },

  // Main to renderer
  onSaveFile: (callback) => {
    const listener = () => callback();

    ipcRenderer.on(FILE_SAVE_CHANNEL, listener);

    return () => ipcRenderer.removeListener(FILE_SAVE_CHANNEL, listener);
  },

  // Renderer to main
  updateFile: (newContent: string) =>
    ipcRenderer.send(FILE_UPDATE_CHANNEL, newContent),

  getCurrentFile: () => ipcRenderer.invoke(FILE_GET_CURRENT_CHANNEL),

  updateTitle: (isDirty: boolean) =>
    ipcRenderer.send(WINDOW_TITLE_UPDATE_CHANNEL, isDirty),

  getModelConfig: () =>
    ipcRenderer.invoke(MODEL_CONFIG_CHANNEL, ModelConfigAction.GET_CONFIG),
  saveModelConfig: (modelConfig: ModelConfig) =>
    ipcRenderer.invoke(
      MODEL_CONFIG_CHANNEL,
      ModelConfigAction.SAVE_CONFIG,
      modelConfig,
    ),

  getMessages: () =>
    ipcRenderer.invoke(MESSAGE_ACTION_CHANNEL, MessageAction.GET_MESSAGES),
  saveMessage: (newMessage: ChatMessage) =>
    ipcRenderer.invoke(
      MESSAGE_ACTION_CHANNEL,
      MessageAction.SAVE_MESSAGE,
      newMessage,
    ),
} satisfies Window[typeof apiKey];

contextBridge.exposeInMainWorld(apiKey, api);
