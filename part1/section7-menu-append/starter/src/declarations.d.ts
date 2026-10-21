/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

import { WindowAction } from './types/WindowAction';

declare module '*.css';

export interface IElectronAPI {
  windowAction: (action: WindowAction) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
