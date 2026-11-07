import { IS_MAC } from '@/main/utils/platform';
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
    width: 800,
    height: 600,
    show: false,
    frame: IS_MAC ? false : true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  loadWindow(mainWindow, 'home');

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.once('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}
