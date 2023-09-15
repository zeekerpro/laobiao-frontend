import httpClient from "$apis/httpClient";
import { instanceToPlain, plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";
import lodash from "lodash";
const { mapKeys, camelCase, snakeCase }  = lodash ;

import { db } from "$db";

export default class Chat extends BaseModel {

  name        :string
  userId?     :number

  static async syncDetect() {
    const localChats = await db.chats.toArray()
    const localIds = localChats.map((chat) => chat.id)

    const ret = await httpClient.post("/chats/sync_detect", { ids: localIds });
    if(!ret.isSuccess){return}
    const {unstored_chat_ids, uncached_chat_ids} = ret.data

    // 本地存在，但是未同步到服务器, 上传
    if(unstored_chat_ids.length > 0){
      const chats = await db.chats.bulkGet(unstored_chat_ids)
      const chatsToStore = chats.map((chat) => instanceToPlain(chat))
      await httpClient.post("/chats/bulk_create", { chats: chatsToStore });
    }

    // 本地未缓存的chat，需要先存储到本地
    if(uncached_chat_ids.length > 0){
      const ret = await httpClient.get("/chats", { ids: uncached_chat_ids });
      if(!ret.isSuccess){ return }
      const chatToCache = ret.data.map((chat) => mapKeys(chat, (value, key) => camelCase(key)))
      await db.chats.bulkPut(chatToCache)
    }
  }

  static async create(chat: any) {
    const chatParams = mapKeys(chat, (value, key) => snakeCase(key))
    const ret = await httpClient.post("/chats", {chat: chatParams});
    if(ret.isSuccess){ ret.data = plainToInstance(Chat, ret.data); }
    return ret;
  }
  //
  // async signout() {
  //   const { appStorage } = await import("$utils/client/storage");
  //   appStorage.remove("token");
  //   const { db } = await import("$db");
  //   db.delete()
  // }
  //
  //  async update(user: any) {
  //   return httpClient.put(`/user/${user.id}`, {user: instanceToPlain(user)});
  // }
  //
  // static async me(){
  //   const ret = await httpClient.get(`/me`);
  //   if(ret.isSuccess){ret.data = plainToInstance(User, ret.data); }
  //   return ret;
  // }

}

