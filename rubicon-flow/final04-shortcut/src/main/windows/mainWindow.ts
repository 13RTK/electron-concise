import { loadWindow } from '@/main/windows/loadWindowHelper';
import { BrowserWindow } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null;

export function createMainWindow() {
  if (mainWindow) {
    return mainWindow;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  loadWindow(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.maximize();
  });

  mainWindow.once('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}
