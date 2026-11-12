/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="vite/client" />

import { ClipboardHistory } from '@/types/ClipboardHistory';
import type { File } from '@/types/File';
import { SettingKey, SettingValue } from '@/types/Setting';
import { WindowAction } from '@/types/WindowAction';

export interface IElectronAPI {
  onOpenFile: (callback: (file: File) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
