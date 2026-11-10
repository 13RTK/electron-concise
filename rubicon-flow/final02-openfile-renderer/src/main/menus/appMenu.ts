import { openFile } from '@/main/utils/fileHelper';
import { MenuItemConstructorOptions, Menu, MenuItem, shell } from 'electron';

const fileOpenMenuItem: MenuItemConstructorOptions = {
  label: 'Open...',
  click: async () => {
    const result = await openFile();

    if (result) {
      // TODO: Send file content from main to renderer
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

export function initAppMenu() {
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
