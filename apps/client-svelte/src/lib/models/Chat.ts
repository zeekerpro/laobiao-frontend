import httpClient from "$apis/httpClient";
import { instanceToPlain, plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";
import lodash from "lodash";
const { mapKeys, camelCase }  = lodash ;

import { db } from "$db";

export default class Chat extends BaseModel {

  name        :string
  user_id?    :number

  static async syncDetect() {
    const chats = await db.chats.toArray()
    const ids = chats.map((chat) => chat.id)

    const ret = await httpClient.post("/chats/sync_detect", { ids });
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
  //
  // async signup() {
  //   const userParams = mapKeys(instanceToPlain(this), (value, key) => snakeCase(key))
  //   const ret = await httpClient.post("/signup", {user: userParams});
  //   if(ret.isSuccess){ ret.data = plainToInstance(User, ret.data); }
  //   return ret;
  // }
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

