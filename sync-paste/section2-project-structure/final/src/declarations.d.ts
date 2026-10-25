/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="vite/client" />

import { WindowAction } from './types/WindowAction';

export interface IElectronAPI {
  windowAction: (action: WindowAction) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
