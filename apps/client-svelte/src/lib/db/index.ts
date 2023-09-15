import Dexie, { type Table } from "dexie";
import type Message from "$lib/models/Message";

export interface DbMessage extends Partial<Omit<Message, 'id'>> {
  id?: number;
  chatId: number;
}

export interface DbChat {
  id?: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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
