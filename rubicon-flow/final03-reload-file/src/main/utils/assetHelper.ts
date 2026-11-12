import { app } from 'electron';

export function getAssetPath(filename: string) {
  return `${app.isPackaged ? process.resourcesPath : app.getAppPath()}/assets/${filename}`;
}
