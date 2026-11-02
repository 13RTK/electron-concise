/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="vite/client" />

import { ClipboardHistory } from '@/types/ClipboardHistory';
import { SettingKey, SettingValue } from '@/types/Setting';
import { WindowAction } from '@/types/WindowAction';

export interface IElectronAPI {
  windowAction: (action: WindowAction) => void;
  clipboardAction: (
    action: ClipboardAction,
    historyId?: number,
  ) => Promise<void | ClipboardHistory[] | boolean>;

  onUpdateClipboard: (callback) => void;

  changeWindowTitle: (title: string) => void;

  settingAction: (
    action: SettingAction,
    settingKey: SettingKey,
    settingValue?: SettingValue,
  ) => Promise<void | SettingValue>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
