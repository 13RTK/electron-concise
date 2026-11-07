import { getAssetPath } from '@/main/utils/assetHelper';
import { IS_MAC } from '@/main/utils/platform';
import { createMainWindow } from '@/main/windows/mainWindow';
import { createSettingWindow } from '@/main/windows/settingWindow';
import { nativeImage } from 'electron/common';
import { Menu, Tray } from 'electron/main';

const gearIcon = IS_MAC
  ? nativeImage.createMenuSymbol('gear')
  : nativeImage.createFromPath(getAssetPath('gear.png'));
const infoIcon = IS_MAC
  ? nativeImage.createMenuSymbol('info')
  : nativeImage.createFromPath(getAssetPath('info.png'));

const contextMenu = Menu.buildFromTemplate([
  { role: 'quit' },
  {
    label: 'about',
    icon: infoIcon,
    click: () => {
      const settingWindow = createSettingWindow('about');
      if (!settingWindow.isVisible()) {
        settingWindow.show();
      }
    },
  },
  {
    label: 'settings',
    icon: gearIcon,
    click: () => {
      const settingWindow = createSettingWindow('general');
      if (!settingWindow.isVisible()) {
        settingWindow.show();
      }
    },
  },
]);

export function initTray() {
  const trayLogo = nativeImage.createFromPath(getAssetPath('tray.png'));
  if (process.platform === 'darwin') {
    trayLogo.setTemplateImage(true);
  }

  const tray = new Tray(trayLogo);

  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });

  tray.on('click', () => {
    const mainWindow = createMainWindow();

    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }
  });
}
