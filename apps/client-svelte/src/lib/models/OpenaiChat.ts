import httpClient from "$apis/httpClient";
import { plainToInstance } from "class-transformer";
import BaseModel from "./BaseModel";

export default class OpenaiChat extends BaseModel {

  name: string
  prompt: string
  model: string

  static async create(account: OpenaiChat){
    const ret = await httpClient.post(`/openai/chats`, { account });
    if(ret.isSuccess){ ret.data = plainToInstance(OpenaiChat, ret.data); }
    return ret;
  }

  static async index(){
    const ret = await httpClient.get(`/openai/chats`);
    if(ret.isSuccess){ ret.data = plainToInstance(OpenaiChat, ret.data); }
    return ret;
  }

}

