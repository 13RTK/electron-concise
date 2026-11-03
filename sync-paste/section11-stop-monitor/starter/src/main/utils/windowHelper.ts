import { BrowserWindow, dialog, IpcMainEvent } from 'electron';
import { WindowAction } from '@/types/WindowAction';

export function handleWindowAction(event: IpcMainEvent, action: WindowAction) {
  // Get window from event sender
  const window = BrowserWindow.fromWebContents(event.sender);

  if (!window) {
    dialog.showErrorBox('Error', 'Window not found');
    return;
  }

  if (action === WindowAction.MAXIMIZE) {
    window.maximize();
    return;
  }

  if (action === WindowAction.MINIMIZE) {
    window.minimize();
    return;
  }

  window.close();
}

export function handleChangeWindowTitle(event: IpcMainEvent, title: string) {
  // Get window from event sender
  const window = BrowserWindow.fromWebContents(event.sender);

  if (!window) {
    dialog.showErrorBox('Error', 'Window not found');
    return;
  }

  window.setTitle(title);
}
