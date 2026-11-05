import { loadWindow } from '@/main/windows/loadWindowHelper';
import { BrowserWindow } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow;
const isMac = process.platform === 'darwin';

export function createMainWindow() {
  if (mainWindow) {
    return mainWindow;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: isMac ? false : true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  loadWindow(mainWindow, 'home');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}
