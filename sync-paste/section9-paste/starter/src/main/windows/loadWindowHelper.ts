import { BrowserWindow } from "electron";
import path from 'node:path'

export function loadWindow(window: BrowserWindow, hash: 'home' | 'setting') {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#${hash}`);
  } else {
    window.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      {
        hash,
      }
    );
  }
}