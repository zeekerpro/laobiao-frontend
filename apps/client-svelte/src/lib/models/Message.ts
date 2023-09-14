import httpClient from "$apis/httpClient";
import { instanceToPlain, plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";
import type Chat from "./Chat";
import lodash from "lodash";
const { mapKeys, camelCase }  = lodash ;

import { db } from "$db";

export default class Message extends BaseModel {

  content     :string
  chatId     :number
  role      :string

  // messages 同步探测
  static async syncDetect(chat :Chat) {

    const localMessages = await db.messages.where({chatId: chat.id}).toArray()
    const localIds = localMessages.map((msg) => msg.id)

    const ret = await httpClient.post(`/chats/${chat.id}/messages/sync_detect`, { ids: localIds });

    if(!ret.isSuccess){return}
    const {unstored_message_ids, uncached_message_ids} = ret.data

    // 本地存在，但是未同步到服务器, 上传
    if(unstored_message_ids.length > 0){
      const messages = await db.messages.bulkGet(unstored_message_ids)
      const messageToStore = messages.map((msg) => instanceToPlain(msg))
      await httpClient.post(`/chats/${chat.id}/messages/bulk_create`, { messages: messageToStore});
    }

    // 本地未缓存的messages，需要先存储到本地
    if(uncached_message_ids.length > 0){
      const ret = await httpClient.get(`/chats/${chat.id}/messages`, { ids: uncached_message_ids });
      if(!ret.isSuccess){ return }
      const messagesToCache = ret.data.map((msg) => mapKeys(msg, (value, key) => camelCase(key)))
      await db.messages.bulkPut(messagesToCache)
    }
  }


}

