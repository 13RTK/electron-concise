import {
  app,
  BaseWindow,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  shell,
} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { WINDOW_ACTION_CHANNEL } from './types/channels/window';
import { WindowAction } from './types/WindowAction';
import { handleWindowAction } from './utils/windowHelper';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const isMac = process.platform === 'darwin';

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  const alwaysOnTopMenuItem: MenuItemConstructorOptions = {
    label: 'Always on top',
    type: 'checkbox',
    click: (menuItem, window) => {
      window?.setAlwaysOnTop(menuItem.checked);
    },
    icon: isMac
      ? nativeImage.createMenuSymbol('pin')
      : nativeImage.createFromPath(`${app.getAppPath()}/assets/pin.png`),
  };

  const appMenu =
    Menu.getApplicationMenu()?.items.map((item: MenuItem) => {
      if (item.role?.toLowerCase() === 'windowmenu') {
        return new MenuItem({
          role: 'windowMenu',
          submenu: Menu.buildFromTemplate([
            alwaysOnTopMenuItem,
            ...(item.submenu?.items ?? []),
          ]),
        });
      }

      return item;
    }) ?? [];

  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      role: 'help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://space.bilibili.com/337242418');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate([...appMenu, ...menuTemplate]);
  Menu.setApplicationMenu(menu);

  ipcMain.on(WINDOW_ACTION_CHANNEL, handleWindowAction);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
