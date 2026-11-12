import { openFile } from '@/main/utils/fileHelper';
import { FILE_OPEN_CHANNEL } from '@/types/channels/file';
import {
  MenuItemConstructorOptions,
  Menu,
  MenuItem,
  shell,
  BrowserWindow,
} from 'electron';

let mainWindow: BrowserWindow | null;

const fileOpenMenuItem: MenuItemConstructorOptions = {
  label: 'Open...',
  click: async () => {
    const result = await openFile();

    if (result && mainWindow) {
      mainWindow.webContents.send(FILE_OPEN_CHANNEL, result);
    }
  },
};

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

export function initAppMenu(window: BrowserWindow) {
  mainWindow = window;

  const appMenu =
    Menu.getApplicationMenu()?.items.map((item: MenuItem) => {
      if (item.role?.toLowerCase() === 'filemenu') {
        return new MenuItem({
          role: 'fileMenu',
          submenu: Menu.buildFromTemplate([
            fileOpenMenuItem,
            ...(item.submenu?.items ?? []),
          ]),
        });
      }

      return item;
    }) ?? [];

  const menu = Menu.buildFromTemplate([...appMenu, ...menuTemplate]);
  Menu.setApplicationMenu(menu);
}
