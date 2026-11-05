import { getAssetPath } from '@/main/utils/assetHelper';
import { createSettingWindow } from '@/main/windows/settingWindow';
import { app, BrowserWindow } from 'electron';
import { nativeImage } from 'electron/common';
import { Menu, Tray } from 'electron/main';

const isMac = process.platform === 'darwin';
const gearIcon = isMac
  ? nativeImage.createMenuSymbol('gear')
  : nativeImage.createFromPath(getAssetPath('gear.png'));
const infoIcon = isMac
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

export function initTray(mainWindow: BrowserWindow) {
  const trayLogo = nativeImage.createFromPath(getAssetPath('tray.png'));
  if (process.platform === 'darwin') {
    trayLogo.setTemplateImage(true);
  }

  const tray = new Tray(trayLogo);

  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });

  tray.on('click', () => {
    if (mainWindow.isDestroyed()) {
      return;
    }

    if (isMac) {
      return app.show();
    }

    if (mainWindow.isMinimized()) {
      return mainWindow.restore();
    }

    mainWindow.show();
  });
}
