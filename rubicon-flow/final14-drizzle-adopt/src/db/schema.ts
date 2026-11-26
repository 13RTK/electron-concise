import { sql } from 'drizzle-orm';
import { check, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as z from 'zod';
import { createSelectSchema } from 'drizzle-orm/zod';

export const messagesTable = sqliteTable(
  'messages',
  {
    id: int().primaryKey(),
    role: text({ enum: ['user', 'assistant'] }).notNull(),
    content: text().notNull(),
  },

  (table) => [check('role_check', sql`${table.role} in ('user', 'assistant')`)],
);

const messageSchema = createSelectSchema(messagesTable);

export type ChatMessage = z.infer<typeof messageSchema>;
