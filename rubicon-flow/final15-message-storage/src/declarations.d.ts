/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="vite/client" />

import { ChatMessage } from '@/db/schema';
import { ClipboardHistory } from '@/types/ClipboardHistory';
import type { File } from '@/types/File';
import { ModelConfig } from '@/types/Model';
import { SettingKey, SettingValue } from '@/types/Setting';
import { WindowAction } from '@/types/WindowAction';

type Unsubscribe = () => void;

export interface IElectronAPI {
  onOpenFile: (callback: (file: File) => void) => Unsubscribe;

  // From main to renderer
  onSaveFile: (callback) => Unsubscribe;

  // From renderer to main
  updateFile: (newContent: string) => void;

  getCurrentFile: () => Promise<File | null>;

  updateTitle: (isDirty: boolean) => void;

  getModelConfig: () => Promise<ModelConfig[]>;
  saveModelConfig: (modelConfig: ModelConfig) => Promise<boolean>;

  getMessages: () => Promise<ChatMessage[]>;
  saveMessage: (newMessage: ChatMessage) => Promise<ChatMessage>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
