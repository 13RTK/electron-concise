import { createSettingWindow } from '@/main/windows/settingWindow';
import { nativeImage } from 'electron/common';
import { app, Menu, Tray } from 'electron/main';

export function initTray() {
  const trayLogo = nativeImage.createFromPath(
    `${app.isPackaged ? process.resourcesPath : app.getAppPath()}/assets/tray.png`,
  );
  if (process.platform === 'darwin') {
    trayLogo.setTemplateImage(true);
  }

  const tray = new Tray(trayLogo);
  const contextMenu = Menu.buildFromTemplate([{ role: 'quit' }, {role: 'about'}, {
    label: 'settings',
    icon: nativeImage.createMenuSymbol('gear'),
    click: () => {
      const settingWindow = createSettingWindow()
      if (settingWindow.isVisible()) {
        settingWindow.show()
      }
    }
  }]);


  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  })
}
