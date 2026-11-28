import { db } from '@/main/utils/dbHelper';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { app } from 'electron';
import { join } from 'node:path';

export async function migrateToLatest() {
  return await migrate(db, {
    migrationsFolder: join(app.getAppPath(), 'drizzle'),
  });
}
