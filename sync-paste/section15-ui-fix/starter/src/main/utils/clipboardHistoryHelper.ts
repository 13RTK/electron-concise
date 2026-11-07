import { IS_MAC } from '@/main/utils/platform';
import { CLIPBOARD_UPDATE_CHANNEL } from '@/types/channels/clipboard';
import { ClipboardAction } from '@/types/ClipboardAction';
import { ClipboardHistory } from '@/types/ClipboardHistory';
import { startWatch, getText, ClipboardWatcherJs } from '@crosscopy/clipboard';
import {
  app,
  BrowserWindow,
  clipboard,
  IpcMainInvokeEvent,
  systemPreferences,
} from 'electron';
import { DatabaseSync } from 'node:sqlite';
import robot from 'robotjs';

const userDataDir = app.getPath('userData');
const database = new DatabaseSync(`${userDataDir}/clipboard_history.db`);

let watcher: ClipboardWatcherJs | null = null;
let mainWindow: BrowserWindow | null = null;
let ignoredClipboardText: string | null = null;

export function registerMainWindow(window: BrowserWindow) {
  mainWindow = window;

  window.on('closed', () => {
    mainWindow = null;
  });
}

database.exec(`
  CREATE TABLE IF NOT EXISTS clipboard_history (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertClipboardHistory = database.prepare(
  'INSERT INTO clipboard_history (content) VALUES (?)',
);

const queryClipboardHistory = database.prepare(
  'SELECT * FROM clipboard_history ORDER BY created_at DESC',
);

const queryClipboardHistoryById = database.prepare(
  'SELECT content FROM clipboard_history WHERE id = ?',
);

const deleteClipboardHistory = database.prepare(
  'DELETE FROM clipboard_history WHERE id = ?',
);

export function startMonitor() {
  if (watcher) {
    return watcher;
  }

  watcher = startWatch(async () => {
    const text = await getText();

    if (ignoredClipboardText) {
      const ignoredText = ignoredClipboardText;
      ignoredClipboardText = null;

      if (ignoredText === text) {
        return;
      }
    }

    insertClipboardHistory.run(text);

    if (mainWindow) {
      mainWindow.webContents.send(CLIPBOARD_UPDATE_CHANNEL);
    }
  });

  return watcher;
}

export function handleClipboardAction(
  _event: IpcMainInvokeEvent,
  action: ClipboardAction,
  historyId?: number,
) {
  if (action === ClipboardAction.GET_HISTORIES) {
    const clipboardHistory = queryClipboardHistory.all() as ClipboardHistory[];
    return clipboardHistory;
  }

  if (action === ClipboardAction.STOP_MONITOR) {
    watcher?.stop();
    watcher = null;
  }

  if (action === ClipboardAction.DELETE_HISTORY && historyId) {
    const result = deleteClipboardHistory.run(historyId);

    return result.changes > 0;
  }

  if (action === ClipboardAction.START_MONITOR) {
    startMonitor();
  }

  if (action === ClipboardAction.PASTE_HISTORY && historyId !== undefined) {
    return pasteHistory(historyId);
  }

  // TODO: query history
}

async function pasteHistory(id: number) {
  // Check accessibility permission
  if (IS_MAC && !systemPreferences.isTrustedAccessibilityClient(true)) {
    return false;
  }

  // Query clipboard history
  const clipboardHistory = queryClipboardHistoryById.get(id) as
    | {
        content: string;
      }
    | undefined;

  if (!clipboardHistory) {
    return false;
  }

  // Write into as ignored text to avoid re-copy
  ignoredClipboardText = clipboardHistory.content;

  try {
    await clipboard.writeText(clipboardHistory.content);
  } catch (error) {
    console.log(error);
    ignoredClipboardText = null;
  }

  if (IS_MAC) {
    app.hide();
  } else {
    mainWindow?.minimize();
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  robot.keyTap('v', IS_MAC ? 'command' : 'control');

  return true;
}
