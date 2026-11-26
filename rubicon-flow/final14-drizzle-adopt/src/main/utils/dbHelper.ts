import { drizzle } from 'drizzle-orm/libsql';
import { app } from 'electron';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const databasePath = join(app.getPath('userData'), 'db');
mkdirSync(databasePath, { recursive: true });

export const db = drizzle(pathToFileURL(join(databasePath, 'message.db')).href);
