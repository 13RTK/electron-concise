import { getAssetPath } from '@/main/utils/assetHelper';
import { IS_MAC } from '@/main/utils/platform';
import {
  MenuItemConstructorOptions,
  nativeImage,
  Menu,
  MenuItem,
  shell,
} from 'electron';

const alwaysOnTopMenuItem: MenuItemConstructorOptions = {
  label: 'Always on top',
  type: 'checkbox',
  click: (menuItem, window) => {
    window?.setAlwaysOnTop(menuItem.checked);
  },
  icon: IS_MAC
    ? nativeImage.createMenuSymbol('pin')
    : nativeImage.createFromPath(getAssetPath('pin.png')),
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

  const menu = Menu.buildFromTemplate([...appMenu, ...menuTemplate]);
  Menu.setApplicationMenu(menu);
}
