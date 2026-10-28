import { ClipboardHistory } from '@/types/ClipboardHistory';
import { startWatch, getText } from '@crosscopy/clipboard';
import { app } from 'electron';
import { DatabaseSync } from 'node:sqlite';

const userDataDir = app.getPath('userData');
const database = new DatabaseSync(`${userDataDir}/clipboard_history.db`);

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

export function startMonitor() {
  const watcher = startWatch(async () => {
    const text = await getText();

    insertClipboardHistory.run(text);

    const clipboardHistory = queryClipboardHistory.all() as ClipboardHistory[];

    console.log(clipboardHistory);
  });

  return watcher;
}
