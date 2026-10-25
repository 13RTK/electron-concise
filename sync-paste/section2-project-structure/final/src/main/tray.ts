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
  const contextMenu = Menu.buildFromTemplate([{ role: 'quit' }]);
  tray.setContextMenu(contextMenu);
}
