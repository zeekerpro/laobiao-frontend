import type { Message } from "ai";
import Dexie, { type Table } from "dexie";

export interface DbMessage extends Partial<Omit<Message, 'id'>> {
  id?: number;
  chatId: number;
}

export interface DbChat {
  id?: number;
  name: string;
}

export class LaobiaoDB extends Dexie {

  chats!: Table<DbChat, number>;
  messages: Table<DbMessage, number>;

  constructor() {
    super("laobiao");
    this.version(1).stores({
      chats:"++id, name",
      messages: "++id, chatId, createdAt, content, role"
    });
  }

}

export const db = new LaobiaoDB();
