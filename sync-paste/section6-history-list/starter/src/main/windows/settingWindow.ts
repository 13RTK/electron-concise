import { loadWindow } from '@/main/windows/loadWindowHelper';
import { BrowserWindow } from 'electron';
import path from 'node:path';

let settingWindow: BrowserWindow;

export function createSettingWindow() {
  if (settingWindow) {
    return settingWindow;
  }

  // Create the browser window.
  settingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  loadWindow(settingWindow, 'setting'); 

  settingWindow.once('ready-to-show', () => {
    settingWindow.show();
  });

  return settingWindow
}
