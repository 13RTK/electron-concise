import { loadWindow } from '@/main/windows/loadWindowHelper';
import { BrowserWindow } from 'electron';
import path from 'node:path';

let settingWindow: BrowserWindow | null;

export function createSettingWindow(settingTab: 'general' | 'about') {
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
    title: settingTab,
  });

  loadWindow(settingWindow, `setting/${settingTab}`);

  settingWindow.once('ready-to-show', () => {
    settingWindow?.show();
  });

  settingWindow.once('close', () => {
    settingWindow = null;
  });

  return settingWindow;
}
