/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="vite/client" />

import { ClipboardHistory } from '@/types/ClipboardHistory';
import { WindowAction } from '@/types/WindowAction';

export interface IElectronAPI {
  windowAction: (action: WindowAction) => void;
  clipboardAction: (
    action: ClipboardAction,
  ) => Promise<void | ClipboardHistory[]>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
