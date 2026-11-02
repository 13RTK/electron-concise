import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';
import { initTray } from '@/main/tray';
import { initAppMenu } from '@/main/menus/appMenu';
import { windowIpcInit } from '@/main/ipc/window';
import { createMainWindow } from '@/main/windows/mainWindow';
import { ClipboardWatcherJs } from '@crosscopy/clipboard';
import { startMonitor } from '@/main/utils/clipboardHistoryHelper';
import { clipboardIpcInit } from '@/main/ipc/clipboard';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const isMac = process.platform === 'darwin';
let watcher: ClipboardWatcherJs;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createMainWindow();

  initTray();
  initAppMenu();
  windowIpcInit();
  clipboardIpcInit();

  watcher = startMonitor(mainWindow);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    watcher.stop();
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
