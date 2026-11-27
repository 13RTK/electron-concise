import { ChatMessage, messagesTable } from '@/db/schema';
import { db } from '@/main/utils/dbHelper';
import { MessageAction } from '@/types/Message';
import { IpcMainInvokeEvent } from 'electron';

async function saveMessage(newMessage: ChatMessage) {
  const [insertedMessage] = await db
    .insert(messagesTable)
    .values(newMessage)
    .returning();

  if (!insertedMessage) {
    throw new Error('insert failed');
  }

  return insertedMessage;
}

async function getMessages() {
  const messages = await db.select().from(messagesTable);

  return messages;
}

export async function handleMessageAction(
  _event: IpcMainInvokeEvent,
  action: MessageAction,
  newMessage?: ChatMessage,
) {
  if (action === MessageAction.GET_MESSAGES) {
    return await getMessages();
  }

  if (action === MessageAction.SAVE_MESSAGE && newMessage) {
    return await saveMessage(newMessage);
  }
}
